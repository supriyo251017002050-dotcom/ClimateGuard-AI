import { LOCATIONS_DATA } from '../data/locationsData';

export default function StateDashboard({ state, onSelectLocationId }) {
  const profile = LOCATIONS_DATA[state.prototypeLocationId];
  return <section className="intel-panel flex-1 min-w-0 overflow-y-auto p-6" aria-label="Selected state details" aria-live="polite">
    <p className="text-primary text-sm">India / State or union territory</p>
    <h1 className="text-3xl font-bold mt-2">{state.name}</h1>
    <p className="mt-2 text-on-surface-variant">{state.region}{state.capital ? ` · Capital: ${state.capital}` : ''}</p>
    <div className="mt-6 p-5 rounded-xl bg-surface-container-low border border-outline-variant/30">
      <h2 className="font-bold text-xl">Detailed state data unavailable</h2>
      <p className="mt-2">Live state-wide alerts and a verified state-wide risk assessment have not been connected. This does not indicate that the region is safe.</p>
      {profile && <div className="mt-5">
        <p>A separate, static prototype profile is available for {profile.name}. It is not a live assessment of the whole state.</p>
        <button className="mt-3 px-4 py-2 rounded-lg bg-primary text-on-primary cursor-pointer" onClick={() => onSelectLocationId(profile.id)}>Open {profile.name} prototype</button>
      </div>}
    </div>
    <p className="mt-5 text-sm text-on-surface-variant">Select another state on the globe or in the list. Both views share this selection.</p>
  </section>;
}
