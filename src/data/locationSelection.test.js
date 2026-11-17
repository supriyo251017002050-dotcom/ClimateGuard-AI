import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { REGIONS, boundaryStateId, geometryBounds, selectState, selectLocation } from './locationSelection.js';

test('every bundled boundary matches exactly one of the 36 regions', () => {
  const data = JSON.parse(readFileSync(new URL('../../public/india-states.geojson', import.meta.url), 'utf8'));
  assert.equal(REGIONS.length, 36);
  const ids = data.features.map(feature => boundaryStateId(feature.properties.shapeName));
  assert.equal(new Set(ids).size, 36);
  assert.deepEqual([...ids].sort(), REGIONS.map(state => state.id).sort());
  for (const feature of data.features) {
    const bounds = geometryBounds(feature.geometry);
    assert.ok(bounds.every(Number.isFinite));
    assert.ok(bounds[0] < bounds[2] && bounds[1] < bounds[3]);
  }
});

test('state selection never retains a previous city profile', () => {
  const city = selectLocation('kolkata');
  for (const state of REGIONS) {
    const selection = selectState(state.id, city.revision);
    assert.equal(selection.stateId, state.id);
    assert.equal(selection.locationId, null);
    assert.equal(selection.revision, 2);
  }
});

test('all prototype selections set the correct parent and allow repeat focus', () => {
  for (const state of REGIONS.filter(state => state.prototypeLocationId)) {
    const selection = selectLocation(state.prototypeLocationId);
    assert.equal(selection.stateId, state.id);
    assert.equal(selection.locationId, state.prototypeLocationId);
    assert.equal(selectLocation(selection.locationId, selection.revision).revision, 2);
  }
  assert.throws(() => selectState('unknown'));
  assert.throws(() => selectLocation('unknown'));
});
