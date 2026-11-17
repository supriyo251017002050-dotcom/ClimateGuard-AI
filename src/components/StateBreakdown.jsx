import React, { useState, useMemo } from 'react';
import { INDIA_STATES_DATA } from '../data/statesList';
import { LOCATIONS_DATA } from '../data/locationsData';
import CesiumMapViewer from './CesiumMapViewer';

const STATE_COORDINATES = {
  'west-bengal': { lat: 22.9868, lng: 87.8550 },
  'maharashtra': { lat: 19.7515, lng: 75.7139 },
  'bihar': { lat: 25.0961, lng: 85.3131 },
  'delhi': { lat: 28.7041, lng: 77.1025 },
  'goa': { lat: 15.2993, lng: 74.1240 },
  'andhra-pradesh': { lat: 15.9129, lng: 79.7400 },
  'arunachal-pradesh': { lat: 28.2180, lng: 94.7278 },
  'assam': { lat: 26.2006, lng: 92.9376 },
  'chhattisgarh': { lat: 21.2787, lng: 81.8661 },
  'gujarat': { lat: 22.2587, lng: 71.1924 },
  'haryana': { lat: 29.0588, lng: 76.0856 },
  'himachal-pradesh': { lat: 31.1048, lng: 77.1665 },
  'jharkhand': { lat: 23.6102, lng: 85.2799 },
  'karnataka': { lat: 15.3173, lng: 75.7139 },
  'kerala': { lat: 10.8505, lng: 76.2711 },
  'madhya-pradesh': { lat: 22.9734, lng: 78.6569 },
  'manipur': { lat: 24.6637, lng: 93.9063 },
  'meghalaya': { lat: 25.4670, lng: 91.3662 },
  'mizoram': { lat: 23.1645, lng: 92.9376 },
  'nagaland': { lat: 26.1584, lng: 94.5624 },
  'odisha': { lat: 20.9517, lng: 85.0985 },
  'punjab': { lat: 31.1471, lng: 75.3412 },
  'rajasthan': { lat: 27.0238, lng: 74.2179 },
  'sikkim': { lat: 27.5330, lng: 88.5122 },
  'tamil-nadu': { lat: 11.1271, lng: 78.6569 },
  'telangana': { lat: 18.1124, lng: 79.0193 },
  'tripura': { lat: 23.9408, lng: 91.9882 },
  'uttar-pradesh': { lat: 26.8467, lng: 80.9462 },
  'uttarakhand': { lat: 30.0668, lng: 79.0193 },
  'jammu-kashmir': { lat: 33.7782, lng: 76.5762 },
  'ladakh': { lat: 34.1526, lng: 77.5771 }
};

export default function StateBreakdown({ selectedStateId, onSelectStateId }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeHazard, setActiveHazard] = useState('all');
  const [activeTier, setActiveTier] = useState('all');

  const filteredStates = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return INDIA_STATES_DATA.filter((state) => {
      const stateName = state.name.toLowerCase();
      const stateDesc = (state.region + ' ' + state.capital).toLowerCase();
      const threatText = state.primaryHazards.join(' ').toLowerCase();

      // For hazards filter, just a simple string match against primary hazards for now
      // Let's assume some basic mapping or just checking if hazard is included in primaryHazards text
      let rowHazard = 'all';
      if (threatText.includes('cyclone')) rowHazard = 'cyclone';
      else if (threatText.includes('flood')) rowHazard = 'flood';
      else if (threatText.includes('heat')) rowHazard = 'heat';
      else if (threatText.includes('drought')) rowHazard = 'drought';
      
      let rowTier = 'moderate';
      if (state.riskScore >= 80) rowTier = 'critical';
      else if (state.riskScore >= 70) rowTier = 'heightened';

      const matchesSearch = !query || stateName.includes(query) || stateDesc.includes(query) || threatText.includes(query);
      const matchesHazard = activeHazard === 'all' || rowHazard === activeHazard;
      const matchesTier = activeTier === 'all' || rowTier === activeTier;

      return matchesSearch && matchesHazard && matchesTier;
    });
  }, [searchQuery, activeHazard, activeTier]);

  const selectedState = INDIA_STATES_DATA.find(s => s.id === selectedStateId) || INDIA_STATES_DATA[0];

  const handleHazardClick = (hazard) => {
    setActiveHazard(hazard);
  };

  const getTierColor = (score) => {
    if (score >= 80) return 'error';
    if (score >= 70) return 'tertiary';
    return 'primary';
  };

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto">
      <div className="px-space-base py-space-md lg:px-space-xl lg:py-space-lg flex flex-col gap-space-lg">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
          <div className="flex flex-col gap-space-2xs min-w-0">
            <div className="flex items-center gap-space-xs">
              <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-badge-mono text-badge-mono uppercase">Geospatial Telemetry</span>
              <span className="text-outline-variant font-badge-mono text-badge-mono">·</span>
              <span className="font-badge-mono text-badge-mono text-on-surface-variant uppercase">Sub-National Assessment Model</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">State Vulnerability Matrix &amp; Territorial Risk Mapping</h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">High-resolution risk indexes for Indian states and Union Territories synthesized across 24 years of extreme climate telemetry, hydrologic surge records, and municipal adaptation posture.</p>
          </div>
          <div className="flex items-center gap-space-sm shrink-0">
            <button className="flex items-center gap-space-xs px-space-md py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-colors shadow-sm" type="button">
              <span className="material-symbols-outlined text-[18px]">sim_card_download</span>
              <span>GeoJSON Export</span>
            </button>
            <button className="flex items-center gap-space-xs px-space-md py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md transition-all shadow-sm" type="button">
              <span className="material-symbols-outlined text-[18px]">publish</span>
              <span>NDMA Dossier PDF</span>
            </button>
          </div>
        </div>

        {/* 4 Top Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
          <div className="flex flex-col bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">National Avg Risk Score</span>
            <div className="flex items-baseline gap-space-xs mt-1">
              <span className="font-display text-display font-headline-lg text-primary tracking-tight">67.4</span>
              <span className="font-badge-mono text-badge-mono text-error font-semibold">+2.8% YoY</span>
            </div>
            <div className="w-full bg-surface-container-highest h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '67.4%' }}></div>
            </div>
          </div>
          <div className="flex flex-col bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Critical Exposure Tier</span>
            <div className="flex items-baseline gap-space-xs mt-1">
              <span className="font-display text-display font-headline-lg text-error tracking-tight">{INDIA_STATES_DATA.filter(s => s.riskScore >= 75).length}</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">States &gt; 75.0</span>
            </div>
            <div className="w-full bg-surface-container-highest h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-error h-full rounded-full" style={{ width: `${(INDIA_STATES_DATA.filter(s => s.riskScore >= 75).length / INDIA_STATES_DATA.length) * 100}%` }}></div>
            </div>
          </div>
          <div className="flex flex-col bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Early Warning Density</span>
            <div className="flex items-baseline gap-space-xs mt-1">
              <span className="font-display text-display font-headline-lg text-secondary tracking-tight">1,420</span>
              <span className="font-body-sm text-body-sm text-secondary font-medium">99.4% Online</span>
            </div>
            <div className="w-full bg-surface-container-highest h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-secondary h-full rounded-full" style={{ width: '99.4%' }}></div>
            </div>
          </div>
          <div className="flex flex-col bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Adaptation Fiscal Ratio</span>
            <div className="flex items-baseline gap-space-xs mt-1">
              <span className="font-display text-display font-headline-lg text-on-surface tracking-tight">₹48.2k</span>
              <span className="font-badge-mono text-badge-mono text-tertiary">Cr. Allocated</span>
            </div>
            <div className="w-full bg-surface-container-highest h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-tertiary h-full rounded-full" style={{ width: '62%' }}></div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-sm bg-surface-container-low p-space-sm rounded-xl">
          <div className="flex-1 flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-2 rounded-lg shadow-sm">
            <span className="material-symbols-outlined text-[20px] text-outline">search</span>
            <input
              className="w-full bg-transparent font-body-sm text-body-sm text-on-surface focus:outline-none placeholder:text-outline"
              placeholder="Filter territory or coastal district (e.g., Odisha, Bihar)..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="font-badge-mono text-badge-mono text-outline-variant bg-surface-container-high px-1.5 py-0.5 rounded">⌘K</span>
          </div>
          <div className="flex flex-wrap items-center gap-space-xs">
            <div className="flex items-center gap-1 bg-surface-container-lowest p-1 rounded-lg shadow-sm">
              <button
                className={`px-3 py-1 rounded-md font-label-sm text-label-sm ${activeHazard === 'all' ? 'text-primary bg-primary-fixed' : 'text-on-surface-variant hover:text-on-surface'}`}
                onClick={() => handleHazardClick('all')}
              >All Hazards</button>
              <button
                className={`px-3 py-1 rounded-md font-label-sm text-label-sm ${activeHazard === 'cyclone' ? 'text-primary bg-primary-fixed' : 'text-on-surface-variant hover:text-on-surface'}`}
                onClick={() => handleHazardClick('cyclone')}
              >Cyclone</button>
              <button
                className={`px-3 py-1 rounded-md font-label-sm text-label-sm ${activeHazard === 'flood' ? 'text-primary bg-primary-fixed' : 'text-on-surface-variant hover:text-on-surface'}`}
                onClick={() => handleHazardClick('flood')}
              >Flood</button>
              <button
                className={`px-3 py-1 rounded-md font-label-sm text-label-sm ${activeHazard === 'heat' ? 'text-primary bg-primary-fixed' : 'text-on-surface-variant hover:text-on-surface'}`}
                onClick={() => handleHazardClick('heat')}
              >Heatwave</button>
              <button
                className={`px-3 py-1 rounded-md font-label-sm text-label-sm ${activeHazard === 'drought' ? 'text-primary bg-primary-fixed' : 'text-on-surface-variant hover:text-on-surface'}`}
                onClick={() => handleHazardClick('drought')}
              >Drought</button>
            </div>
            <div className="flex items-center gap-space-xs bg-surface-container-lowest px-3 py-2 rounded-lg shadow-sm">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Tier:</span>
              <select
                className="bg-transparent font-label-sm text-label-sm text-on-surface focus:outline-none cursor-pointer"
                value={activeTier}
                onChange={(e) => setActiveTier(e.target.value)}
              >
                <option value="all">All Risk Levels</option>
                <option value="critical">Critical (&gt;80)</option>
                <option value="heightened">Heightened (70-80)</option>
                <option value="moderate">Moderate (&lt;70)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
          
          <div className="xl:col-span-8 flex flex-col gap-space-base">
            {/* Map Block */}
            <div className="relative w-full rounded-xl overflow-hidden shadow-sm bg-surface-container-lowest">
              <div className="w-full h-72 relative">
                <CesiumMapViewer 
                  lat={STATE_COORDINATES[selectedState.id]?.lat || 22.0} 
                  lng={STATE_COORDINATES[selectedState.id]?.lng || 80.0} 
                  name={selectedState.name}
                  height={800000}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-inverse-surface/30 to-transparent flex flex-col justify-end p-space-lg pointer-events-none">
                <div className="flex flex-wrap items-center justify-between gap-space-base">
                  <div className="flex flex-col text-inverse-on-surface">
                    <div className="flex items-center gap-space-xs">
                      <span className="w-2.5 h-2.5 rounded-full bg-error animate-pulse"></span>
                      <span className="font-badge-mono text-badge-mono tracking-wider uppercase text-error-container font-bold">High Surge Surveillance Zone</span>
                    </div>
                    <span className="font-headline-md text-headline-md font-semibold text-inverse-on-surface">{selectedState.name} Risk Vector</span>
                    <p className="font-body-sm text-body-sm text-inverse-on-surface/80 max-w-xl">Supercomputing ensemble indicates early genesis near {selectedState.capital} region. Multi-satellite altimetry feeding autonomous telemetry nodes.</p>
                  </div>
                  <div className="flex items-center gap-space-sm">
                    <div className="px-space-md py-2 rounded-lg bg-surface-container-lowest/20 backdrop-blur-md text-inverse-on-surface flex flex-col items-center">
                      <span className="font-badge-mono text-badge-mono text-on-primary-container">STATE READINESS</span>
                      <span className="font-headline-sm text-headline-sm font-bold">Tier 1 Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* State Matrix Table */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
              <div className="px-space-lg py-space-md bg-surface-container-lowest flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[20px] text-primary">analytics</span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">Sub-National Vulnerability Hierarchy</h2>
                </div>
                <span className="font-badge-mono text-badge-mono text-on-surface-variant">{filteredStates.length} JURISDICTIONS VISIBLE</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
                      <th className="py-3 px-space-base">Rank &amp; Jurisdiction</th>
                      <th className="py-3 px-space-base">Vulnerability Score</th>
                      <th className="py-3 px-space-base">Primary Hazard &amp; Velocity</th>
                      <th className="py-3 px-space-base">Institutional Prep</th>
                      <th className="py-3 px-space-base text-right">Surge Protocol</th>
                    </tr>
                  </thead>
                  <tbody className="font-body-md text-body-md divide-y-0">
                    {filteredStates.map((state, idx) => {
                      const tierColor = getTierColor(state.riskScore);
                      const isSelected = selectedStateId === state.id;
                      return (
                        <tr 
                          key={state.id}
                          onClick={() => onSelectStateId(state.id)}
                          className={`hover:bg-surface-container-low transition-colors cursor-pointer ${selectedStateId === state.id ? 'bg-surface-container-low/50' : ''}`}
                        >
                          <td className="py-3.5 px-space-base">
                            <div className="flex items-center gap-space-sm">
                              <span className={`w-6 h-6 rounded-md ${isSelected ? 'bg-primary-container text-on-primary' : 'bg-surface-container-highest text-on-surface'} flex items-center justify-center font-badge-mono text-badge-mono`}>{(idx + 1).toString().padStart(2, '0')}</span>
                              <div className="flex flex-col">
                                <span className={`font-headline-sm text-headline-sm ${isSelected ? 'text-primary font-bold' : 'text-on-surface'} leading-tight`}>{state.name}</span>
                                <span className="font-label-sm text-label-sm text-on-surface-variant">{state.region} · {state.capital}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-space-base">
                            <div className="flex items-center gap-space-sm">
                              <span className={`font-headline-sm text-headline-sm text-${tierColor} font-bold font-telemetry-data`}>{state.riskScore || 'N/A'}</span>
                              <div className="w-20 bg-surface-container-high h-2 rounded-full overflow-hidden">
                                <div className={`bg-${tierColor} h-full rounded-full`} style={{ width: `${state.riskScore || 0}%` }}></div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-space-base">
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1.5">
                                <span className={`w-2 h-2 rounded-full bg-${tierColor}`}></span>
                                <span className="font-label-md text-label-md text-on-surface">{state.primaryHazards[0] || 'Unknown'} &amp; more</span>
                              </div>
                              <span className="font-body-sm text-body-sm text-on-surface-variant">{state.primaryHazards.slice(1).join(', ')}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-space-base">
                            <div className="flex items-center gap-space-xs">
                              <div className="w-16 bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                                <div className="bg-secondary h-full rounded-full" style={{ width: `${Math.max(40, (state.riskScore || 50) - 10)}%` }}></div>
                              </div>
                              <span className="font-badge-mono text-badge-mono text-secondary font-bold">{Math.max(40, (state.riskScore || 50) - 10)}%</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-space-base text-right">
                            <button className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-primary font-label-sm text-label-sm transition-colors">
                              <span>Inspect</span>
                              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="px-space-base py-space-sm bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-xs">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Updated hourly from IMD, INCOIS, and Copernicus Sentinel constellation feeds.</span>
                <div className="flex items-center gap-space-xs">
                  <span className="font-badge-mono text-badge-mono text-on-surface-variant">PAGE 1 OF 1</span>
                  <button className="w-7 h-7 rounded bg-surface-container-lowest text-on-surface flex items-center justify-center shadow-sm hover:bg-surface-container"><span className="material-symbols-outlined text-[16px]">chevron_left</span></button>
                  <button className="w-7 h-7 rounded bg-surface-container-lowest text-on-surface flex items-center justify-center shadow-sm hover:bg-surface-container"><span className="material-symbols-outlined text-[16px]">chevron_right</span></button>
                </div>
              </div>
            </div>

            {/* Extra Blocks bottom left */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Adaptive Resilience Benchmark</span>
                  <span className="font-badge-mono text-badge-mono text-primary bg-primary-fixed px-1.5 py-0.5 rounded">Composite Index</span>
                </div>
                <div className="flex items-center gap-space-base my-1">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-surface-container-highest" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
                      <path className="text-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="78, 100" strokeLinecap="round" strokeWidth="3.5"></path>
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="font-headline-sm text-headline-sm font-bold text-on-surface">78%</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="font-headline-sm text-headline-sm text-on-surface">Early Warning Coverage</span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">92% of vulnerable populations in top 5 states are within a 30-minute siren &amp; SMS cell broadcast reach.</p>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Critical Hazard Composition</span>
                  <span className="font-badge-mono text-badge-mono text-secondary bg-secondary-container px-1.5 py-0.5 rounded">Frequency 2024</span>
                </div>
                <div className="flex items-end gap-2 h-20 pt-2">
                  <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <span className="font-badge-mono text-badge-mono text-on-surface-variant">42%</span>
                    <div className="w-full bg-error rounded-t" style={{ height: '84%' }}></div>
                    <span className="font-badge-mono text-badge-mono text-on-surface-variant uppercase">Cycl</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <span className="font-badge-mono text-badge-mono text-on-surface-variant">28%</span>
                    <div className="w-full bg-primary rounded-t" style={{ height: '56%' }}></div>
                    <span className="font-badge-mono text-badge-mono text-on-surface-variant uppercase">Flod</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <span className="font-badge-mono text-badge-mono text-on-surface-variant">18%</span>
                    <div className="w-full bg-secondary rounded-t" style={{ height: '36%' }}></div>
                    <span className="font-badge-mono text-badge-mono text-on-surface-variant uppercase">Heat</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <span className="font-badge-mono text-badge-mono text-on-surface-variant">12%</span>
                    <div className="w-full bg-tertiary rounded-t" style={{ height: '24%' }}></div>
                    <span className="font-badge-mono text-badge-mono text-on-surface-variant uppercase">Drgt</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Deep Dive Panel */}
          <div className="xl:col-span-4 flex flex-col gap-space-base">
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between pb-space-xs">
                <div className="flex items-center gap-space-xs">
                  <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
                  <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">Territorial Deep Dive</span>
                </div>
                <span className={`px-2 py-0.5 rounded bg-${getTierColor(selectedState.riskScore)}-container text-on-${getTierColor(selectedState.riskScore)}-container font-badge-mono text-badge-mono font-bold`}>STATE SCORE: {selectedState.riskScore}</span>
              </div>
              <div className="flex flex-col gap-space-2xs">
                <h3 className="font-headline-lg text-headline-lg text-on-surface">{selectedState.name} Risk Profile</h3>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Zone: {selectedState.region} Flank</span>
              </div>
              <div className="w-full h-40 rounded-xl overflow-hidden shadow-sm relative bg-surface-container-highest">
                <div className="absolute bottom-2 left-2 bg-surface-container-lowest/80 backdrop-blur-sm px-2 py-1 rounded text-on-surface font-badge-mono text-badge-mono">
                  RADAR: C-BAND INSAT-3DR
                </div>
              </div>
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Historical Disaster Incidence (2000–2024)</span>
                  <span className="font-badge-mono text-badge-mono text-on-surface-variant">38 Major Catastrophes</span>
                </div>
                <div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col gap-2">
                  <div className="flex items-center justify-between text-on-surface font-body-sm text-body-sm">
                    <span>Severe Cyclones (Cat 3+)</span>
                    <span className="font-badge-mono text-badge-mono font-bold text-error">19 Events</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                    <div className="bg-error h-full rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  <div className="flex items-center justify-between text-on-surface font-body-sm text-body-sm">
                    <span>Storm Surge Inundations</span>
                    <span className="font-badge-mono text-badge-mono font-bold text-primary">12 Events</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: '48%' }}></div>
                  </div>
                  <div className="flex items-center justify-between text-on-surface font-body-sm text-body-sm">
                    <span>Flash Flooding &amp; River Breach</span>
                    <span className="font-badge-mono text-badge-mono font-bold text-secondary">7 Events</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full rounded-full" style={{ width: '28%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">District-Level Vulnerability Heat</span>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
                    <div className="flex items-center gap-space-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">{selectedState.capital} Urban Body</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">Littoral Exposure: Very High</span>
                      </div>
                    </div>
                    <span className="font-badge-mono text-badge-mono font-bold text-error bg-error-container/60 px-2 py-0.5 rounded">93.4 RISK</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
                    <div className="flex items-center gap-space-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">Rural Belt</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">Estuarine Surge Sensitivity</span>
                      </div>
                    </div>
                    <span className="font-badge-mono text-badge-mono font-bold text-error bg-error-container/60 px-2 py-0.5 rounded">91.8 RISK</span>
                  </div>
                </div>
              </div>
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">EWS Sensor Network</span>
                  <span className="font-badge-mono text-badge-mono text-secondary font-bold">99.4% UPTIME</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="p-2 rounded bg-surface-container-lowest flex flex-col">
                    <span className="font-badge-mono text-badge-mono text-outline">Doppler Radars</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">3 / 3 Active</span>
                  </div>
                  <div className="p-2 rounded bg-surface-container-lowest flex flex-col">
                    <span className="font-badge-mono text-badge-mono text-outline">Ocean Buoys</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">14 / 14 Sync</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-space-sm pt-space-xs">
                <button className="flex-1 py-2.5 px-space-md rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md transition-colors flex items-center justify-center gap-1.5 shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">broadcast_on_personal</span>
                  <span>Trigger Siren Drill</span>
                </button>
                <button className="p-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface transition-colors shadow-sm" title="Print District Summary">
                  <span className="material-symbols-outlined text-[18px]">print</span>
                </button>
              </div>
            </div>
            
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center gap-space-md">
              <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[24px]">verified_user</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-headline-sm text-headline-sm text-on-surface">{selectedState.name} Disaster Rapid Action Force</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">20 Battalions deployed with autonomous satellite transceiver links.</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
