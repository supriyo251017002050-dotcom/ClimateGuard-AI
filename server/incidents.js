const HAZARD_TYPES = new Set(['flood', 'cyclone', 'fire', 'earthquake', 'landslide', 'heatwave', 'storm', 'other']);
const INCIDENT_TRANSITIONS = {
  submitted: new Set(['triaged', 'rejected']),
  triaged: new Set(['verified', 'rejected']),
  verified: new Set(['assigned', 'rejected']),
  assigned: new Set(['in_progress', 'resolved']),
  in_progress: new Set(['resolved']),
  rejected: new Set(), resolved: new Set(),
};
const TASK_TRANSITIONS = { assigned: new Set(['in_progress']), in_progress: new Set(['completed']), completed: new Set() };
export const DEMO_TEAMS = [
  { id: 'team-alpha', name: 'Rapid Assessment Alpha', capability: 'Field assessment' },
  { id: 'team-bravo', name: 'Relief Support Bravo', capability: 'Relief coordination' },
  { id: 'team-charlie', name: 'Medical Support Charlie', capability: 'First-aid support' },
];

function seed(now) {
  const createdAt = new Date(now()).toISOString();
  return {
    incidents: [{
      id: 'INC-DEMO-001', type: 'flood', severity: 'moderate', description: 'Demo report: waterlogging near a low-lying road. No real incident is represented.',
      coordinates: { lat: 22.5726, lng: 88.3639 }, stateId: 'west-bengal', observedAt: createdAt,
      status: 'submitted', createdAt, updatedAt: createdAt, source: 'public_demo', assignedTeamId: null,
    }],
    tasks: [],
    audit: [{ id: 'AUD-DEMO-001', incidentId: 'INC-DEMO-001', action: 'report_submitted', note: 'Seeded demonstration report.', at: createdAt, actor: 'Public Demo' }],
    counter: 2,
  };
}

async function readJson(req) {
  let raw = '', size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 16_384) throw new Error('Request too large');
    raw += chunk;
  }
  return JSON.parse(raw || '{}');
}

function text(value, max) {
  return typeof value === 'string' && value.trim() && value.trim().length <= max ? value.trim() : null;
}

function isoTime(value) {
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? new Date(parsed).toISOString() : null;
}

export function createIncidentMiddleware({ now = Date.now } = {}) {
  let store = seed(now);
  const teamIds = new Set(DEMO_TEAMS.map(team => team.id));
  const audit = (incidentId, action, note = '', actor = 'Operator Demo') => {
    store.audit.push({ id: `AUD-${String(store.audit.length + 1).padStart(4, '0')}`, incidentId, action, note, actor, at: new Date(now()).toISOString() });
  };
  return async (req, res, next) => {
    const url = new URL(req.url, 'http://localhost');
    if (!url.pathname.startsWith('/api/incidents') && !url.pathname.startsWith('/api/tasks') && url.pathname !== '/api/demo/reset') return next();
    const reply = (status, body) => { res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(body)); };
    try {
      if (url.pathname === '/api/incidents' && req.method === 'GET') return reply(200, { incidents: store.incidents, tasks: store.tasks, teams: DEMO_TEAMS });
      if (url.pathname === '/api/incidents' && req.method === 'POST') {
        if (!req.headers['content-type']?.startsWith('application/json')) return reply(415, { error: 'Send JSON.' });
        const body = await readJson(req);
        const description = text(body.description, 800), type = text(body.type, 30);
        const lat = Number(body.coordinates?.lat), lng = Number(body.coordinates?.lng);
        const observedAt = isoTime(body.observedAt);
        if (!description || !HAZARD_TYPES.has(type) || !Number.isFinite(lat) || Math.abs(lat) > 90 || !Number.isFinite(lng) || Math.abs(lng) > 180 || !observedAt) {
          return reply(400, { error: 'Provide a valid hazard type, description, coordinates and observation time.' });
        }
        const timestamp = new Date(now()).toISOString();
        const incident = {
          id: `INC-DEMO-${String(store.counter++).padStart(3, '0')}`, type, severity: ['minor', 'moderate', 'severe'].includes(body.severity) ? body.severity : 'minor',
          description, coordinates: { lat, lng }, stateId: text(body.stateId, 80), observedAt,
          status: 'submitted', createdAt: timestamp, updatedAt: timestamp, source: 'public_demo', assignedTeamId: null,
        };
        store.incidents.unshift(incident); audit(incident.id, 'report_submitted', 'Unverified public demonstration report.', 'Public Demo');
        return reply(201, { incident });
      }
      const auditMatch = url.pathname.match(/^\/api\/incidents\/([^/]+)\/audit$/);
      if (auditMatch && req.method === 'GET') {
        const incident = store.incidents.find(item => item.id === decodeURIComponent(auditMatch[1]));
        return incident ? reply(200, { audit: store.audit.filter(item => item.incidentId === incident.id) }) : reply(404, { error: 'Incident not found.' });
      }
      const taskCreateMatch = url.pathname.match(/^\/api\/incidents\/([^/]+)\/tasks$/);
      if (taskCreateMatch && req.method === 'POST') {
        const incident = store.incidents.find(item => item.id === decodeURIComponent(taskCreateMatch[1]));
        const body = await readJson(req), teamId = text(body.teamId, 80), note = text(body.note, 400) || '';
        if (!incident) return reply(404, { error: 'Incident not found.' });
        if (incident.status !== 'verified') return reply(409, { error: 'Only verified incidents can be assigned.' });
        if (!teamIds.has(teamId)) return reply(400, { error: 'Choose a valid demo team.' });
        const timestamp = new Date(now()).toISOString();
        const task = { id: `TASK-${String(store.tasks.length + 1).padStart(4, '0')}`, incidentId: incident.id, teamId, note, status: 'assigned', createdAt: timestamp, updatedAt: timestamp };
        store.tasks.push(task); incident.status = 'assigned'; incident.assignedTeamId = teamId; incident.updatedAt = timestamp;
        audit(incident.id, 'team_assigned', `${DEMO_TEAMS.find(team => team.id === teamId).name}${note ? `: ${note}` : ''}`);
        return reply(201, { task, incident });
      }
      const noteMatch = url.pathname.match(/^\/api\/incidents\/([^/]+)\/notes$/);
      if (noteMatch && req.method === 'POST') {
        const incident = store.incidents.find(item => item.id === decodeURIComponent(noteMatch[1]));
        if (!incident) return reply(404, { error: 'Incident not found.' });
        const body = await readJson(req), note = text(body.note, 400);
        if (!note) return reply(400, { error: 'Enter an operator note.' });
        incident.updatedAt = new Date(now()).toISOString(); audit(incident.id, 'operator_note', note);
        return reply(201, { incident });
      }
      const incidentMatch = url.pathname.match(/^\/api\/incidents\/([^/]+)$/);
      if (incidentMatch && req.method === 'PATCH') {
        const incident = store.incidents.find(item => item.id === decodeURIComponent(incidentMatch[1]));
        if (!incident) return reply(404, { error: 'Incident not found.' });
        const body = await readJson(req), nextStatus = text(body.status, 40), note = text(body.note, 400) || '';
        if (!nextStatus || !INCIDENT_TRANSITIONS[incident.status]?.has(nextStatus)) return reply(409, { error: `Cannot move ${incident.status} to ${nextStatus || 'that status'}.` });
        incident.status = nextStatus; incident.updatedAt = new Date(now()).toISOString();
        audit(incident.id, `status_${nextStatus}`, note);
        return reply(200, { incident });
      }
      const taskMatch = url.pathname.match(/^\/api\/tasks\/([^/]+)$/);
      if (taskMatch && req.method === 'PATCH') {
        const task = store.tasks.find(item => item.id === decodeURIComponent(taskMatch[1]));
        if (!task) return reply(404, { error: 'Task not found.' });
        const body = await readJson(req), nextStatus = text(body.status, 40), note = text(body.note, 400) || '';
        if (!nextStatus || !TASK_TRANSITIONS[task.status]?.has(nextStatus)) return reply(409, { error: `Cannot move task to ${nextStatus || 'that status'}.` });
        task.status = nextStatus; task.updatedAt = new Date(now()).toISOString();
        const incident = store.incidents.find(item => item.id === task.incidentId);
        if (incident) {
          incident.status = nextStatus === 'completed' ? 'resolved' : 'in_progress'; incident.updatedAt = task.updatedAt;
          audit(incident.id, nextStatus === 'completed' ? 'status_resolved' : 'status_in_progress', note);
        }
        return reply(200, { task, incident });
      }
      if (url.pathname === '/api/demo/reset' && req.method === 'POST') { store = seed(now); return reply(200, { incidents: store.incidents, tasks: store.tasks, teams: DEMO_TEAMS }); }
      return reply(405, { error: 'Unsupported demo API operation.' });
    } catch { return reply(400, { error: 'Invalid demo workflow request.' }); }
  };
}
