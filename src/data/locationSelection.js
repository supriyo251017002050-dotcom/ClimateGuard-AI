import { INDIA_STATES_DATA } from './statesList.js';
import { LOCATIONS_DATA } from './locationsData.js';

const extraTerritories = [
  ['andaman-and-nicobar-islands', 'Andaman and Nicobar Islands'],
  ['chandigarh', 'Chandigarh'],
  ['dadra-and-nagar-haveli-and-daman-and-diu', 'Dadra and Nagar Haveli and Daman and Diu'],
  ['lakshadweep', 'Lakshadweep'],
  ['puducherry', 'Puducherry'],
];
export const REGIONS = [
  ...INDIA_STATES_DATA,
  ...extraTerritories.filter(([id]) => !INDIA_STATES_DATA.some(state => state.id === id))
    .map(([id, name]) => ({ id, name, capital: '', region: 'Union Territory', hasDeepData: false, primaryHazards: [], riskScore: null })),
];
export function boundaryStateId(name) {
  const normalized = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return normalized === 'jammu-and-kashmir' ? 'jammu-kashmir' : normalized;
}
export function selectState(stateId, revision = 0) {
  if (!REGIONS.some(state => state.id === stateId)) throw new Error('Unknown state');
  return { stateId, locationId: null, revision: revision + 1 };
}
export function selectLocation(locationId, revision = 0) {
  const state = REGIONS.find(item => item.prototypeLocationId === locationId);
  if (!state || !LOCATIONS_DATA[locationId]) throw new Error('Unknown location');
  return { stateId: state.id, locationId, revision: revision + 1 };
}
export function geometryBounds(geometry) {
  let west = Infinity, south = Infinity, east = -Infinity, north = -Infinity;
  const visit = coordinates => {
    if (typeof coordinates[0] === 'number') {
      west = Math.min(west, coordinates[0]); east = Math.max(east, coordinates[0]);
      south = Math.min(south, coordinates[1]); north = Math.max(north, coordinates[1]);
    } else coordinates.forEach(visit);
  };
  visit(geometry.coordinates);
  const padX = Math.max((east - west) * .12, .04);
  const padY = Math.max((north - south) * .12, .04);
  return [west - padX, south - padY, east + padX, north + padY];
}
