import React, { useState, useEffect, lazy, Suspense } from 'react';
import Sidebar from './components/Sidebar';
import StatesListPanel from './components/StatesListPanel';
import LocationDashboard from './components/LocationDashboard';
import ResearchDossier from './components/ResearchDossier';
import { LOCATIONS_DATA } from './data/locationsData';
import { REGIONS, selectState, selectLocation } from './data/locationSelection';
import StateDashboard from './components/StateDashboard';
import StateBreakdown from './components/StateBreakdown';
import ClimateChat from './components/ClimateChat';
const IndiaGlobe = lazy(() => import('./components/IndiaGlobe'));
const LiveOperations = lazy(() => import('./components/LiveOperations'));

export default function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [selection, setSelection] = useState({ stateId: 'west-bengal', locationId: null, revision: 0 });
  const { stateId: selectedStateId, locationId: selectedLocationId } = selection;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeViewMode, setActiveViewMode] = useState('split');
  const [isMobileViewport, setIsMobileViewport] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(() =>
    typeof window === 'undefined' || !window.matchMedia('(max-width: 767px)').matches
  );
  const [selectedHazard, setSelectedHazard] = useState(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const updateViewport = event => setIsMobileViewport(event.matches);
    media.addEventListener('change', updateViewport);
    return () => media.removeEventListener('change', updateViewport);
  }, []);

  const handleSelectState = (state) => {
    setSelection(previous => selectState(state.id, previous.revision));
  };

  const handleSelectLocationId = (locId) => {
    setSelection(previous => selectLocation(locId, previous.revision));
  };

  const currentLocation = LOCATIONS_DATA[selectedLocationId];
  const currentState = REGIONS.find(state => state.id === selectedStateId);

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased h-screen w-screen overflow-hidden">
      <ClimateChat state={currentState} location={currentLocation} hazardEvent={selectedHazard} />
      <Sidebar
        activeNav={activeNav}
        setActiveNav={(nav) => {
          setActiveNav(nav);
          if (nav === 'global') setActiveViewMode('globeFocus');
          if (nav === 'dashboard') setActiveViewMode('dashFocus');
          if (nav === 'operations') setActiveViewMode('operationsFocus');
          if (nav === 'home' || nav === 'india') setActiveViewMode('split');
          if (nav === 'states') setActiveViewMode('statesFocus');
          if (nav === 'literature') setActiveViewMode('dossierFocus');
          if (isMobileViewport) setIsSidebarOpen(false);
        }}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        onResetView={() => {
          setSelection(previous => selectState('west-bengal', previous.revision));
          setActiveNav('home');
          setActiveViewMode('split');
        }}
      />

      {isMobileViewport && isSidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-[45] bg-slate-950/35 backdrop-blur-[1px]"
          aria-label="Close navigation"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className={`h-full flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen && !isMobileViewport ? 'pl-sidebar-width' : 'pl-0'}`}>
        <header className={`fixed top-0 right-0 h-16 z-40 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-all duration-300 ease-in-out ${isSidebarOpen && !isMobileViewport ? 'left-sidebar-width' : 'left-0'}`}>
          <div className="h-16 w-full px-space-base flex items-center justify-between">
            <div className="flex items-center gap-space-base min-w-0">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-surface-container text-on-surface transition-colors cursor-pointer"
                title="Toggle Sidebar"
                aria-label="Toggle navigation"
                aria-expanded={isSidebarOpen}
              >
                <span className="material-symbols-outlined">{isSidebarOpen ? 'menu_open' : 'menu'}</span>
              </button>
              <div className="flex items-center gap-space-xs font-badge-mono text-badge-mono tracking-wider truncate text-on-surface-variant">
                <span className="hover:text-on-surface cursor-pointer text-primary font-bold">CLIMATEGUARD AI</span>
                <span className="text-outline-variant hidden sm:inline">/</span>
                <span className="hover:text-primary-container cursor-pointer font-bold hidden sm:inline">INDIA</span>
                <span className="text-outline-variant hidden md:inline">/</span>
                <span className="hover:text-on-surface cursor-pointer hidden md:inline">RISK CONSOLE</span>
                <span className="text-outline-variant hidden lg:inline">/</span>
                <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary font-bold hidden lg:inline">PROTOTYPE</span>
              </div>
            </div>

            <div className="flex items-center gap-space-base shrink-0">
              <nav
                className="hidden xl:flex items-center gap-1 bg-surface-container-low p-1 rounded-lg border border-outline-variant/30"
              >
                <button
                  onClick={() => setActiveViewMode('split')}
                  className={`px-space-md py-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeViewMode === 'split'
                      ? 'bg-surface-container-highest text-primary font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-md text-label-md'
                  }`}
                >
                  Integrated
                </button>
                <button
                  onClick={() => setActiveViewMode('globeFocus')}
                  className={`px-space-md py-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeViewMode === 'globeFocus'
                      ? 'bg-surface-container-highest text-primary font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-md text-label-md'
                  }`}
                >
                  3D Globe
                </button>
                <button
                  onClick={() => setActiveViewMode('dashFocus')}
                  className={`px-space-md py-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeViewMode === 'dashFocus'
                      ? 'bg-surface-container-highest text-primary font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-md text-label-md'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => { setActiveNav('operations'); setActiveViewMode('operationsFocus'); }}
                  className={`px-space-md py-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeViewMode === 'operationsFocus'
                      ? 'bg-surface-container-highest text-primary font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-md text-label-md'
                  }`}
                >
                  Live operations
                </button>
              </nav>
              <button
                onClick={() => {
                  setActiveNav('literature');
                  setActiveViewMode('dossierFocus');
                }}
                className="hidden sm:inline-flex items-center justify-center px-space-md py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md shadow-sm transition-colors cursor-pointer"
              >
                Research
              </button>
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
              </div>
            </div>
          </div>
        </header>

        <main className="relative w-full pt-16 bg-surface h-full flex flex-col overflow-hidden">
          <div className="flex-1 flex min-h-0 overflow-hidden relative bg-surface w-full">
            {(activeViewMode === 'split' || activeViewMode === 'globeFocus') && (
              <div
                className={`relative transition-all duration-300 flex flex-col bg-surface-container-low border-r border-outline-variant/30 ${
                  activeViewMode === 'globeFocus'
                    ? 'w-full'
                    : 'hidden xl:flex xl:w-2/5'
                }`}
              >
                <Suspense fallback={<div className="p-5" role="status">Loading map engine…</div>}><IndiaGlobe
                  selection={selection}
                  onSelectState={handleSelectState}
                  selectedLocationId={selectedLocationId}
                  onSelectLocationId={handleSelectLocationId}
                /></Suspense>
              </div>
            )}

            {(activeViewMode === 'split' || activeViewMode === 'dashFocus') && (
              <StatesListPanel
                selectedStateId={selectedStateId}
                onSelectState={handleSelectState}
                selectedLocationId={selectedLocationId}
              />
            )}

            {(activeViewMode === 'split' || activeViewMode === 'dashFocus') && (
              currentLocation ? <LocationDashboard
                key={selectedLocationId}
                location={currentLocation}
                onSelectLocationId={handleSelectLocationId}
                allLocations={LOCATIONS_DATA}
              /> : <StateDashboard state={currentState} onSelectLocationId={handleSelectLocationId} />
            )}

            {activeViewMode === 'dossierFocus' && (
              <ResearchDossier />
            )}

            {activeViewMode === 'statesFocus' && (
              <StateBreakdown 
                selectedStateId={selectedStateId} 
                onSelectStateId={(id) => handleSelectState({ id })} 
              />
            )}

            {activeViewMode === 'operationsFocus' && (
              <Suspense fallback={<div className="p-5" role="status">Loading live operations…</div>}><LiveOperations
                selection={selection}
                currentLocation={currentLocation}
                onSelectState={handleSelectState}
                onSelectLocationId={handleSelectLocationId}
                onContextEvent={setSelectedHazard}
              /></Suspense>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
