import React, { useState } from 'react';
import { REGIONS } from '../data/locationSelection';

export default function StatesListPanel({
  selectedStateId,
  onSelectState,
  selectedLocationId,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredStates = REGIONS.filter((state) => {
    const matchesSearch =
      state.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      state.capital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      state.primaryHazards.some((h) =>
        h.toLowerCase().includes(searchQuery.toLowerCase())
      );
    if (!matchesSearch) return false;
    if (filterType === 'deep') return state.hasDeepData;
    if (filterType === 'high') return state.riskScore >= 80;
    return true;
  });

  const getRiskColorClass = (score) => {
    if (score >= 80) return 'text-error bg-error-container';
    if (score >= 70) return 'text-secondary bg-secondary-container';
    return 'text-primary bg-primary-container';
  };
  const getRiskDotClass = (score) => {
    if (score >= 80) return 'bg-error';
    if (score >= 70) return 'bg-secondary';
    return 'bg-primary';
  };

  return (
    <div className="w-80 md:w-[22rem] shrink-0 flex flex-col h-full select-none overflow-hidden bg-surface border-r border-outline-variant/30 relative z-10">
      {/* Header */}
      <div className="p-space-md border-b border-outline-variant/30 bg-surface-container-low flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
            <span className="font-badge-mono text-badge-mono uppercase text-secondary font-bold tracking-wider">
              Sub-National Index
            </span>
          </div>
          <span className="font-badge-mono text-badge-mono px-1.5 py-0.5 rounded bg-surface-container-highest text-primary font-semibold">
            {filteredStates.length} REGIONS
          </span>
        </div>

        <div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface">
            India Territories
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            28 States / 8 Union Territories
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-1.5 rounded-lg shadow-sm border border-outline-variant/20 mt-1">
          <span className="material-symbols-outlined text-[18px] text-outline">search</span>
          <input
            type="text"
            placeholder="Search state, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent font-body-sm text-body-sm text-on-surface focus:outline-none placeholder:text-outline-variant"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1 mt-1">
          {[
            { key: 'all', label: 'All', icon: 'public' },
            { key: 'deep', label: 'Focus', icon: 'visibility' },
            { key: 'high', label: 'Critical', icon: 'warning' },
          ].map((f) => {
            const isActive = filterType === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilterType(f.key)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md font-label-sm text-label-sm font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-primary-fixed text-on-primary-fixed shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">
                  {f.icon}
                </span>
                <span>{f.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* States List */}
      <div className="flex-1 overflow-y-auto p-space-sm space-y-1 bg-surface">
        {filteredStates.map((state, idx) => {
          const isSelected =
            selectedStateId === state.id ||
            (state.prototypeLocationId && selectedLocationId === state.prototypeLocationId);

          return (
            <button
              type="button"
              aria-pressed={isSelected}
              key={state.id}
              onClick={() => onSelectState(state)}
              className={`group w-full text-left flex items-center justify-between p-space-sm rounded-xl cursor-pointer transition-all ${
                isSelected
                  ? 'bg-surface-container-highest shadow-sm'
                  : 'hover:bg-surface-container'
              }`}
            >
              <div className="flex items-center gap-space-sm min-w-0">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-badge-mono text-badge-mono shrink-0 shadow-sm ${
                    isSelected ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/30 group-hover:text-primary'
                  }`}
                >
                  {(idx + 1).toString().padStart(2, '0')}
                </div>

                <div className="min-w-0 flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`font-label-md text-label-md truncate ${
                        isSelected ? 'text-on-surface font-bold' : 'text-on-surface'
                      }`}
                    >
                      {state.name}
                    </span>
                    {state.hasDeepData && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider font-bold bg-secondary-container text-on-secondary-container">
                        Focus
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="font-badge-mono text-badge-mono text-on-surface-variant truncate">
                      {state.capital}
                    </span>
                    <span className="text-outline-variant text-[10px]">/</span>
                    <div className="flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${getRiskDotClass(state.riskScore)}`} />
                      <span className="font-badge-mono text-badge-mono font-bold text-on-surface">
                        {state.riskScore ?? '—'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <span
                className={`material-symbols-outlined text-[18px] transition-transform ${
                  isSelected
                    ? 'text-primary translate-x-0.5'
                    : 'text-outline-variant group-hover:text-on-surface group-hover:translate-x-0.5'
                }`}
              >
                chevron_right
              </span>
            </button>
          );
        })}

        {filteredStates.length === 0 && (
          <div className="p-space-xl text-center flex flex-col items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-[32px] text-outline-variant">search_off</span>
            <span className="font-body-sm text-body-sm">No matching regions found.</span>
          </div>
        )}
      </div>
    </div>
  );
}
