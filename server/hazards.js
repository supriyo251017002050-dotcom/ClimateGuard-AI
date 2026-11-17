import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { REGIONS, boundaryStateId } from '../src/data/locationSelection.js';

const INDIA_BOUNDS = { west: 65, south: 4, east: 101, north: 39 };
const DEFAULT_CAP_FEED = 'https://cap-sources.s3.amazonaws.com/in-imd-en/rss.xml';
const USGS_FEED = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
const OPEN_METEO = 'https://api.open-meteo.com/v1/forecast';
const MAX_RESPONSE_BYTES = 6 * 1024 * 1024;

let stateBoundaries = [];
try {
  const geojson = JSON.parse(readFileSync(new URL('../public/india-states.geojson', import.meta.url), 'utf8'));
  stateBoundaries = geojson.features.map(feature => ({
    id: boundaryStateId(feature.properties.shapeName),
    geometry: feature.geometry,
  }));
} catch {
  // The API remains usable without state matching if the local boundary file is unavailable.
}

const nowIso = now => new Date(now()).toISOString();
const hashId = value => createHash('sha256').update(String(value)).digest('hex').slice(0, 20);
const inIndiaWindow = (lng, lat) => lng >= INDIA_BOUNDS.west && lng <= INDIA_BOUNDS.east && lat >= INDIA_BOUNDS.south && lat <= INDIA_BOUNDS.north;

function pointInRing(lng, lat, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j];
    const intersects = ((yi > lat) !== (yj > lat)) &&
      (lng < ((xj - xi) * (lat - yi)) / ((yj - yi) || Number.EPSILON) + xi);
    if (intersects) inside = !inside;
  }
  return inside;
}

function pointInGeometry(lng, lat, geometry) {
  const polygons = geometry?.type === 'Polygon' ? [geometry.coordinates] : geometry?.type === 'MultiPolygon' ? geometry.coordinates : [];
  return polygons.some(polygon => pointInRing(lng, lat, polygon[0]) && !polygon.slice(1).some(ring => pointInRing(lng, lat, ring)));
}

export function stateForPoint(lng, lat) {
  return stateBoundaries.find(item => pointInGeometry(lng, lat, item.geometry))?.id || null;
}

function stateFromText(text = '') {
  const value = text.toLowerCase();
  return REGIONS.find(region => value.includes(region.name.toLowerCase()))?.id || null;
}

function decodeXml(value = '') {
  return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, ' ').trim();
}

function xmlValue(block, tag) {
  const match = block.match(new RegExp(`<(?:(?:\\w+):)?${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/(?:(?:\\w+):)?${tag}>`, 'i'));
  return match ? decodeXml(match[1]) : '';
}

function safeTime(value) {
  const time = value ? Date.parse(value) : NaN;
  return Number.isFinite(time) ? new Date(time).toISOString() : null;
}

function normalizeSeverity(value = '') {
  const severity = value.toLowerCase();
  return ['info', 'minor', 'moderate', 'severe', 'extreme'].includes(severity) ? severity : 'unknown';
}

function coordinatesFromCap(block) {
  const polygon = xmlValue(block, 'polygon');
  const points = polygon.split(/\s+/).map(pair => pair.split(',').map(Number))
    .filter(([lat, lng]) => Number.isFinite(lat) && Number.isFinite(lng));
  if (points.length) {
    const total = points.reduce((sum, [lat, lng]) => ({ lat: sum.lat + lat, lng: sum.lng + lng }), { lat: 0, lng: 0 });
    return { lat: total.lat / points.length, lng: total.lng / points.length };
  }
  const circle = xmlValue(block, 'circle').split(/\s+/)[0]?.split(',').map(Number);
  return circle?.length === 2 && circle.every(Number.isFinite) ? { lat: circle[0], lng: circle[1] } : null;
}

export function normalizeCapXml(xml, now = Date.now) {
  const alertBlocks = [...xml.matchAll(/<(?:\w+:)?alert(?:\s[^>]*)?>([\s\S]*?)<\/(?:\w+:)?alert>/gi)].map(match => match[0]);
  const itemBlocks = alertBlocks.length ? alertBlocks : [...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)].map(match => match[0]);
  const seen = new Set();
  return itemBlocks.map(block => {
    const sourceEventId = xmlValue(block, 'identifier') || xmlValue(block, 'guid') || xmlValue(block, 'link') || hashId(block);
    if (seen.has(sourceEventId)) return null;
    seen.add(sourceEventId);
    const expiresAt = safeTime(xmlValue(block, 'expires'));
    if (expiresAt && Date.parse(expiresAt) < now()) return null;
    const coordinates = coordinatesFromCap(block);
    const area = xmlValue(block, 'areaDesc');
    const title = xmlValue(block, 'headline') || xmlValue(block, 'title') || xmlValue(block, 'event') || 'Official hazard alert';
    const summary = xmlValue(block, 'description') || xmlValue(block, 'instruction') || area || 'Open the official source for details.';
    const sourceUrl = xmlValue(block, 'web') || xmlValue(block, 'link') || 'https://sachet.ndma.gov.in/';
    return {
      id: `alert-${hashId(sourceEventId)}`, source: 'NDMA / IMD CAP', sourceEventId,
      type: 'official_alert', severity: normalizeSeverity(xmlValue(block, 'severity')),
      title, summary, area, coordinates,
      stateId: coordinates ? stateForPoint(coordinates.lng, coordinates.lat) : stateFromText(area),
      observedAt: safeTime(xmlValue(block, 'sent') || xmlValue(block, 'pubDate')),
      effectiveAt: safeTime(xmlValue(block, 'effective')),
      expiresAt, updatedAt: safeTime(xmlValue(block, 'sent') || xmlValue(block, 'pubDate')) || nowIso(now),
      sourceUrl, verification: 'official',
    };
  }).filter(Boolean);
}

export function normalizeUsgs(data) {
  if (!data || !Array.isArray(data.features)) throw new Error('Invalid USGS response');
  return data.features.map(feature => {
    const [lng, lat, depth] = feature.geometry?.coordinates || [];
    if (![lng, lat].every(Number.isFinite) || !inIndiaWindow(lng, lat)) return null;
    const magnitude = Number(feature.properties?.mag);
    return {
      id: `earthquake-${hashId(feature.id)}`, source: 'USGS', sourceEventId: String(feature.id),
      type: 'earthquake', severity: magnitude >= 7 ? 'extreme' : magnitude >= 6 ? 'severe' : magnitude >= 5 ? 'moderate' : magnitude >= 3 ? 'minor' : 'info',
      title: `M${Number.isFinite(magnitude) ? magnitude.toFixed(1) : '?'} earthquake`,
      summary: feature.properties?.place || 'Location pending review.', area: feature.properties?.place || '',
      coordinates: { lng, lat, depth: Number.isFinite(depth) ? depth : null }, stateId: stateForPoint(lng, lat),
      observedAt: safeTime(feature.properties?.time), effectiveAt: null, expiresAt: null,
      updatedAt: safeTime(feature.properties?.updated), sourceUrl: feature.properties?.url || 'https://earthquake.usgs.gov/',
      verification: 'observed', magnitude: Number.isFinite(magnitude) ? magnitude : null,
    };
  }).filter(Boolean);
}

function parseCsv(text) {
  const rows = [];
  let row = [], field = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"' && quoted && text[i + 1] === '"') { field += '"'; i++; }
    else if (char === '"') quoted = !quoted;
    else if (char === ',' && !quoted) { row.push(field); field = ''; }
    else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && text[i + 1] === '\n') i++;
      row.push(field); if (row.some(Boolean)) rows.push(row); row = []; field = '';
    } else field += char;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}

export function normalizeFirmsCsv(text) {
  const rows = parseCsv(text.trim());
  const headers = rows.shift()?.map(value => value.trim().toLowerCase()) || [];
  const at = (row, name) => row[headers.indexOf(name)];
  return rows.map(row => {
    const lat = Number(at(row, 'latitude')), lng = Number(at(row, 'longitude'));
    if (![lat, lng].every(Number.isFinite) || !inIndiaWindow(lng, lat)) return null;
    const date = at(row, 'acq_date'), time = String(at(row, 'acq_time') || '').padStart(4, '0');
    const observedAt = safeTime(date ? `${date}T${time.slice(0, 2)}:${time.slice(2)}:00Z` : '');
    const confidence = at(row, 'confidence') || 'unknown';
    const sourceEventId = [at(row, 'satellite'), date, time, lat, lng].join(':');
    return {
      id: `fire-${hashId(sourceEventId)}`, source: 'NASA FIRMS', sourceEventId,
      type: 'active_fire', severity: String(confidence).toLowerCase() === 'high' || Number(confidence) >= 80 ? 'severe' : 'moderate',
      title: 'Satellite active-fire detection', summary: `VIIRS detection with ${confidence} confidence. This is a heat detection, not a confirmed incident report.`,
      area: '', coordinates: { lat, lng }, stateId: stateForPoint(lng, lat), observedAt,
      effectiveAt: observedAt, expiresAt: null, updatedAt: observedAt,
      sourceUrl: 'https://firms.modaps.eosdis.nasa.gov/', verification: 'observed', confidence,
      brightness: Number(at(row, 'bright_ti4')) || null,
    };
  }).filter(Boolean);
}

export function normalizeWeather(data, lat, lng, now = Date.now) {
  const current = data?.current;
  if (!current || !Number.isFinite(Number(current.temperature_2m))) throw new Error('Invalid weather response');
  const stateId = stateForPoint(lng, lat);
  return {
    id: `weather-${lat.toFixed(3)}-${lng.toFixed(3)}`, source: 'Open-Meteo', sourceEventId: `${lat},${lng}`,
    type: 'weather', severity: 'info', title: 'Current observed conditions',
    summary: `${current.temperature_2m}°C · wind ${current.wind_speed_10m ?? '—'} km/h · precipitation ${current.precipitation ?? '—'} mm`,
    area: stateId ? REGIONS.find(region => region.id === stateId)?.name || '' : '', coordinates: { lat, lng }, stateId,
    observedAt: safeTime(current.time), effectiveAt: safeTime(current.time), expiresAt: null,
    updatedAt: safeTime(current.time) || nowIso(now), sourceUrl: 'https://open-meteo.com/', verification: 'observed',
    weather: current,
  };
}

async function readTextLimited(response, limit = MAX_RESPONSE_BYTES) {
  const declared = Number(response.headers?.get?.('content-length'));
  if (Number.isFinite(declared) && declared > limit) throw new Error('Upstream response too large');
  if (!response.body?.getReader) {
    const text = await response.text();
    if (Buffer.byteLength(text) > limit) throw new Error('Upstream response too large');
    return text;
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let size = 0, output = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > limit) { await reader.cancel(); throw new Error('Upstream response too large'); }
    output += decoder.decode(value, { stream: true });
  }
  return output + decoder.decode();
}

async function upstreamText(fetchImpl, url, { headers = {}, timeoutMs = 12000 } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(url, { headers, signal: controller.signal, redirect: 'error' });
    if (response.status === 304) return { unchanged: true, etag: response.headers.get('etag') };
    if (!response.ok) throw new Error(`Upstream returned ${response.status}`);
    return { text: await readTextLimited(response), etag: response.headers.get('etag') };
  } finally { clearTimeout(timer); }
}

function createFeed(id, source, ttlMs, loader, now) {
  let data = null, fetchedAt = null, attemptedAt = null, error = null, etag = null, inFlight = null;
  const snapshot = () => {
    if (!data) return { id, source, status: 'unavailable', fetchedAt, attemptedAt, error: error || 'Not loaded yet' };
    const age = now() - Date.parse(fetchedAt);
    return { id, source, status: error ? (age <= ttlMs * 4 ? 'delayed' : 'stale') : 'live', fetchedAt, attemptedAt, error };
  };
  return {
    snapshot,
    async get(params = {}) {
      if (data && now() - Date.parse(fetchedAt) < ttlMs) return { events: data, feed: snapshot() };
      if (!inFlight) inFlight = (async () => {
        attemptedAt = nowIso(now);
        try {
          const result = await loader({ ...params, etag });
          if (!result.unchanged) data = result.events;
          if (!data) data = [];
          etag = result.etag || etag;
          fetchedAt = nowIso(now); error = null;
        } catch (cause) { error = cause.name === 'AbortError' ? 'Provider timed out' : 'Provider unavailable'; }
        return { events: data || [], feed: snapshot() };
      })().finally(() => { inFlight = null; });
      return inFlight;
    },
  };
}

function validCoordinate(value, min, max) {
  const number = Number(value);
  return Number.isFinite(number) && number >= min && number <= max ? number : null;
}

export function createHazardMiddleware({ fetchImpl = fetch, firmsKey = '', capFeedUrl = DEFAULT_CAP_FEED, now = Date.now } = {}) {
  const cap = createFeed('alerts', 'NDMA / IMD CAP', 2 * 60_000, async ({ etag }) => {
    const result = await upstreamText(fetchImpl, capFeedUrl, { headers: etag ? { 'If-None-Match': etag } : {} });
    return result.unchanged ? result : { events: normalizeCapXml(result.text, now), etag: result.etag };
  }, now);
  const earthquakes = createFeed('earthquakes', 'USGS', 60_000, async () => {
    const result = await upstreamText(fetchImpl, USGS_FEED);
    return { events: normalizeUsgs(JSON.parse(result.text)), etag: result.etag };
  }, now);
  const fires = createFeed('fires', 'NASA FIRMS', 15 * 60_000, async () => {
    if (!firmsKey) throw new Error('FIRMS key missing');
    const url = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${encodeURIComponent(firmsKey)}/VIIRS_SNPP_NRT/68,6,98,38/1`;
    const result = await upstreamText(fetchImpl, url);
    return { events: normalizeFirmsCsv(result.text), etag: result.etag };
  }, now);
  const weatherCaches = new Map();
  const feedMap = { alerts: cap, earthquakes, fires };
  let requestCount = 0, windowStarted = now();

  return async (req, res, next) => {
    const url = new URL(req.url, 'http://localhost');
    if (!url.pathname.startsWith('/api/hazards') && url.pathname !== '/api/weather') return next();
    const reply = (status, body) => { res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(body)); };
    if (req.method !== 'GET') return reply(405, { error: 'Use GET.' });
    if (now() - windowStarted >= 60_000) { requestCount = 0; windowStarted = now(); }
    if (++requestCount > 180) return reply(429, { error: 'Local hazard API request limit reached.' });
    try {
      if (url.pathname === '/api/hazards/status') {
        const weatherStates = [...weatherCaches.values()].map(feed => feed.snapshot());
        return reply(200, { feeds: [...Object.values(feedMap).map(feed => feed.snapshot()), weatherStates.at(-1) || { id: 'weather', source: 'Open-Meteo', status: 'unavailable', fetchedAt: null, attemptedAt: null, error: 'Choose a focus location to load weather.' }] });
      }
      if (url.pathname === '/api/weather') {
        const lat = validCoordinate(url.searchParams.get('lat'), -90, 90), lng = validCoordinate(url.searchParams.get('lng'), -180, 180);
        if (lat === null || lng === null) return reply(400, { error: 'Valid latitude and longitude are required.' });
        const key = `${lat.toFixed(2)},${lng.toFixed(2)}`;
        let weather = weatherCaches.get(key);
        if (!weather) {
          weather = createFeed(`weather-${key}`, 'Open-Meteo', 5 * 60_000, async () => {
            const query = new URL(OPEN_METEO);
            query.searchParams.set('latitude', lat); query.searchParams.set('longitude', lng);
            query.searchParams.set('current', 'temperature_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m');
            query.searchParams.set('timezone', 'UTC');
            const result = await upstreamText(fetchImpl, query.href);
            return { events: [normalizeWeather(JSON.parse(result.text), lat, lng, now)] };
          }, now);
          weatherCaches.set(key, weather);
        }
        return reply(200, await weather.get());
      }
      const feed = feedMap[url.pathname.slice('/api/hazards/'.length)];
      if (!feed) return reply(404, { error: 'Unknown hazard feed.' });
      return reply(200, await feed.get());
    } catch { return reply(502, { error: 'Hazard feed request failed.' }); }
  };
}
