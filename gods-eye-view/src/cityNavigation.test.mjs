import test from 'node:test';
import assert from 'node:assert/strict';
import * as Cesium from 'cesium';
import {
  CITY_LOCATIONS,
  flyToCity,
  flyToCoordinates,
  initCityNavigation,
} from './cityNavigation.js';

function createMockViewer() {
  const flights = [];
  return {
    isDestroyed: () => false,
    camera: {
      flyTo(options) {
        flights.push(options);
      },
    },
    flights,
  };
}

test('CITY_LOCATIONS defines Delhi, Kolkata, Bihar, Mumbai, Goa, and Global India', () => {
  assert.ok(CITY_LOCATIONS.delhi);
  assert.equal(CITY_LOCATIONS.delhi.lat, 28.6139);
  assert.equal(CITY_LOCATIONS.delhi.lon, 77.2090);
  assert.equal(CITY_LOCATIONS.delhi.alt, 25000);

  assert.ok(CITY_LOCATIONS.kolkata);
  assert.equal(CITY_LOCATIONS.kolkata.lat, 22.5726);
  assert.equal(CITY_LOCATIONS.kolkata.lon, 88.3639);
  assert.equal(CITY_LOCATIONS.kolkata.alt, 22000);

  assert.ok(CITY_LOCATIONS.bihar);
  assert.equal(CITY_LOCATIONS.bihar.lat, 25.5941);
  assert.equal(CITY_LOCATIONS.bihar.lon, 85.1376);
  assert.equal(CITY_LOCATIONS.bihar.alt, 35000);

  assert.ok(CITY_LOCATIONS.mumbai);
  assert.equal(CITY_LOCATIONS.mumbai.lat, 19.0760);
  assert.equal(CITY_LOCATIONS.mumbai.lon, 72.8777);
  assert.equal(CITY_LOCATIONS.mumbai.alt, 22000);

  assert.ok(CITY_LOCATIONS.goa);
  assert.equal(CITY_LOCATIONS.goa.lat, 15.2993);
  assert.equal(CITY_LOCATIONS.goa.lon, 74.1240);
  assert.equal(CITY_LOCATIONS.goa.alt, 25000);

  assert.ok(CITY_LOCATIONS.india);
  assert.equal(CITY_LOCATIONS.india.lat, 22.5);
  assert.equal(CITY_LOCATIONS.india.lon, 82.0);
  assert.equal(CITY_LOCATIONS.india.alt, 18000000);
});

test('flyToCity invokes viewer.camera.flyTo with 2.0s duration and correct coordinates', () => {
  const viewer = createMockViewer();
  const ok = flyToCity(viewer, 'Delhi');
  assert.equal(ok, true);
  assert.equal(viewer.flights.length, 1);
  assert.equal(viewer.flights[0].duration, 2.0);

  const carto = Cesium.Cartographic.fromCartesian(viewer.flights[0].destination);
  assert.ok(Math.abs(Cesium.Math.toDegrees(carto.latitude) - 28.6139) < 0.001);
  assert.ok(Math.abs(Cesium.Math.toDegrees(carto.longitude) - 77.2090) < 0.001);
});

test('flyToCoordinates invokes viewer.camera.flyTo with custom coordinates', () => {
  const viewer = createMockViewer();
  flyToCoordinates(viewer, { lat: 25.5, lon: 85.5, alt: 30000, pitch: -50, heading: 10 }, 3.5);
  assert.equal(viewer.flights.length, 1);
  assert.equal(viewer.flights[0].duration, 3.5);
});

test('initCityNavigation processes postMessage events', () => {
  const viewer = createMockViewer();
  const listeners = [];
  const mockWindow = {
    addEventListener(event, fn) {
      listeners.push({ event, fn });
    },
    removeEventListener(event, fn) {
      const idx = listeners.findIndex(l => l.event === event && l.fn === fn);
      if (idx !== -1) listeners.splice(idx, 1);
    },
    dispatch(data) {
      listeners.filter(l => l.event === 'message').forEach(l => l.fn({ data }));
    },
  };

  const cleanup = initCityNavigation(viewer, { targetWindow: mockWindow });

  // Send fly-to-city message
  mockWindow.dispatch({ type: 'fly-to-city', city: 'mumbai' });
  assert.equal(viewer.flights.length, 1);

  // Send fly-to-coordinates message
  mockWindow.dispatch({ type: 'fly-to-coordinates', lat: 15.2993, lon: 74.1240, alt: 25000 });
  assert.equal(viewer.flights.length, 2);

  cleanup();
  assert.equal(listeners.length, 0);
});
