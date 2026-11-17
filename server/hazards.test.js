import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer, request } from 'node:http';
import { createHazardMiddleware, normalizeCapXml, normalizeFirmsCsv, normalizeUsgs, normalizeWeather, stateForPoint } from './hazards.js';

const get = (server, path) => new Promise((resolve, reject) => {
  const req = request(`http://127.0.0.1:${server.address().port}${path}`, { method: 'GET' }, res => {
    let raw = ''; res.on('data', chunk => { raw += chunk; });
    res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(raw) }));
  });
  req.on('error', reject); req.end();
});

async function fixture(t, options) {
  const middleware = createHazardMiddleware(options);
  const server = createServer((req, res) => middleware(req, res, () => { res.writeHead(404); res.end('{}'); }));
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  return server;
}

test('normalizes CAP alerts, removes duplicates and expired alerts', () => {
  const xml = `<rss><item><guid>A-1</guid><title>Flood warning</title><description>River levels rising</description><cap:severity>Severe</cap:severity><cap:areaDesc>West Bengal</cap:areaDesc><cap:polygon>22.5,88.3 22.6,88.3 22.6,88.4</cap:polygon><pubDate>2030-01-01T00:00:00Z</pubDate><cap:expires>2030-01-03T00:00:00Z</cap:expires><link>https://example.test/a</link></item><item><guid>A-1</guid><title>Duplicate</title></item><item><guid>OLD</guid><title>Expired</title><cap:expires>2020-01-01T00:00:00Z</cap:expires></item></rss>`;
  const events = normalizeCapXml(xml, () => Date.parse('2030-01-02T00:00:00Z'));
  assert.equal(events.length, 1); assert.equal(events[0].severity, 'severe'); assert.equal(events[0].stateId, 'west-bengal');
});

test('normalizes and geographically filters USGS and FIRMS events', () => {
  const usgs = normalizeUsgs({ features: [
    { id: 'in', geometry: { coordinates: [88.36, 22.57, 10] }, properties: { mag: 5.2, place: 'Kolkata test', time: 1_800_000_000_000, updated: 1_800_000_001_000, url: 'https://earthquake.usgs.gov/test' } },
    { id: 'out', geometry: { coordinates: [-120, 40, 4] }, properties: { mag: 7 } },
  ] });
  assert.equal(usgs.length, 1); assert.equal(usgs[0].severity, 'moderate'); assert.equal(usgs[0].stateId, 'west-bengal');
  const csv = 'latitude,longitude,bright_ti4,satellite,acq_date,acq_time,confidence\n22.57,88.36,330,N,2030-01-02,0930,high\n40,-120,300,N,2030-01-02,0930,low';
  const fires = normalizeFirmsCsv(csv);
  assert.equal(fires.length, 1); assert.equal(fires[0].severity, 'severe'); assert.match(fires[0].summary, /not a confirmed incident/);
});

test('normalizes weather and rejects malformed provider data', () => {
  const event = normalizeWeather({ current: { time: '2030-01-02T10:00:00Z', temperature_2m: 31, precipitation: 2, wind_speed_10m: 18 } }, 22.57, 88.36);
  assert.equal(event.type, 'weather'); assert.equal(event.stateId, 'west-bengal');
  assert.throws(() => normalizeWeather({}, 22, 88));
  assert.equal(stateForPoint(88.36, 22.57), 'west-bengal');
});

test('CAP middleware revalidates with ETag and preserves data on 304', async t => {
  let time = Date.parse('2030-01-01T00:00:00Z'), calls = 0;
  const server = await fixture(t, { now: () => time, capFeedUrl: 'https://example.test/cap', fetchImpl: async (_url, options) => {
    calls++;
    if (calls === 2) { assert.equal(options.headers['If-None-Match'], 'v1'); return new Response(null, { status: 304, headers: { etag: 'v1' } }); }
    return new Response('<rss><item><guid>1</guid><title>Test alert</title><cap:severity>Moderate</cap:severity><cap:areaDesc>Goa</cap:areaDesc></item></rss>', { headers: { etag: 'v1' } });
  } });
  assert.equal((await get(server, '/api/hazards/alerts')).body.events.length, 1);
  time += 121_000;
  const second = await get(server, '/api/hazards/alerts');
  assert.equal(second.body.events.length, 1); assert.equal(second.body.feed.status, 'live'); assert.equal(calls, 2);
});

test('missing FIRMS key and invalid weather coordinates are honest failures', async t => {
  const server = await fixture(t, { fetchImpl: async () => { throw new Error('must not fetch'); } });
  const fires = await get(server, '/api/hazards/fires');
  assert.equal(fires.status, 200); assert.equal(fires.body.feed.status, 'unavailable'); assert.equal(fires.body.events.length, 0);
  assert.equal((await get(server, '/api/weather?lat=999&lng=88')).status, 400);
});
