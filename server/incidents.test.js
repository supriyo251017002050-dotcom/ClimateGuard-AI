import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer, request } from 'node:http';
import { createIncidentMiddleware } from './incidents.js';

async function fixture(t) {
  const middleware = createIncidentMiddleware({ now: () => Date.parse('2030-01-02T10:00:00Z') });
  const server = createServer((req, res) => middleware(req, res, () => { res.writeHead(404); res.end('{}'); }));
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  return async (method, path, body) => new Promise((resolve, reject) => {
    const req = request(`http://127.0.0.1:${server.address().port}${path}`, { method, headers: body ? { 'content-type': 'application/json' } : {} }, res => {
      let raw = ''; res.on('data', chunk => { raw += chunk; }); res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(raw) }));
    });
    req.on('error', reject); req.end(body ? JSON.stringify(body) : undefined);
  });
}

test('public report completes the simulated response lifecycle with an audit trail', async t => {
  const call = await fixture(t);
  const created = await call('POST', '/api/incidents', { type: 'flood', severity: 'moderate', description: 'Road covered by water in this demonstration.', coordinates: { lat: 22.57, lng: 88.36 }, stateId: 'west-bengal', observedAt: '2030-01-02T09:30:00Z' });
  assert.equal(created.status, 201); const id = created.body.incident.id;
  assert.equal((await call('PATCH', `/api/incidents/${id}`, { status: 'verified' })).status, 409);
  assert.equal((await call('PATCH', `/api/incidents/${id}`, { status: 'triaged' })).status, 200);
  assert.equal((await call('PATCH', `/api/incidents/${id}`, { status: 'verified' })).status, 200);
  const assigned = await call('POST', `/api/incidents/${id}/tasks`, { teamId: 'team-alpha', note: 'Demo assignment' });
  assert.equal(assigned.status, 201); const taskId = assigned.body.task.id;
  assert.equal((await call('POST', `/api/incidents/${id}/notes`, { note: 'Water level checked.' })).status, 201);
  assert.equal((await call('PATCH', `/api/tasks/${taskId}`, { status: 'in_progress' })).body.incident.status, 'in_progress');
  assert.equal((await call('PATCH', `/api/tasks/${taskId}`, { status: 'completed' })).body.incident.status, 'resolved');
  const audit = await call('GET', `/api/incidents/${id}/audit`);
  assert.deepEqual(audit.body.audit.map(item => item.action), ['report_submitted', 'status_triaged', 'status_verified', 'team_assigned', 'operator_note', 'status_in_progress', 'status_resolved']);
});

test('rejects invalid reports, unknown teams and modification of missing records', async t => {
  const call = await fixture(t);
  assert.equal((await call('POST', '/api/incidents', { type: 'fake', description: 'x', coordinates: { lat: 999, lng: 88 }, observedAt: 'bad' })).status, 400);
  assert.equal((await call('PATCH', '/api/incidents/official-alert-1', { status: 'triaged' })).status, 404);
  assert.equal((await call('POST', '/api/incidents/INC-DEMO-001/tasks', { teamId: 'unknown' })).status, 409);
});

test('demo reset restores deterministic seeded state', async t => {
  const call = await fixture(t);
  await call('PATCH', '/api/incidents/INC-DEMO-001', { status: 'triaged' });
  const reset = await call('POST', '/api/demo/reset');
  assert.equal(reset.body.incidents.length, 1); assert.equal(reset.body.incidents[0].status, 'submitted');
});
