import React, { useState } from 'react';
import TabOverview from './tabs/TabOverview';
import TabHazards from './tabs/TabHazards';
import TabWhyAtRisk from './tabs/TabWhyAtRisk';
import TabDisasterLens from './tabs/TabDisasterLens';
import TabClimateSourceHub from './tabs/TabClimateSourceHub';
import TabSolutions from './tabs/TabSolutions';
import {
  BarChart2,
  AlertTriangle,
  HelpCircle,
  History,
  BookMarked,
  ShieldCheck,
  MapPin,
} from 'lucide-react';

// Hazard type icons — replacing emojis with colored dots
const LOCATION_INDICATORS = {
  kolkata: { color: '#2e75b6', label: 'Flood zone' },
  mumbai: { color: '#4a9eda', label: 'Monsoon belt' },
  bihar: { color: '#c4880d', label: 'Lightning corridor' },
  delhi: { color: '#dc4a4a', label: 'Heat island' },
  goa: { color: '#2a9d6e', label: 'Coastal risk' },
};

export default function LocationDashboard({
  location,
  onSelectLocationId,
  allLocations,
}) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'hazards', label: 'Climate hazards', icon: AlertTriangle },
    { id: 'why', label: 'Why at risk', icon: HelpCircle },
    { id: 'disasterLens', label: 'Past events', icon: History },
    { id: 'climateSource', label: 'Research', icon: BookMarked },
    { id: 'solutions', label: 'Solutions', icon: ShieldCheck },
  ];

  return (
    <div className="intel-panel flex-1 flex flex-col h-full overflow-y-auto select-text">
      <div className="p-4 md:p-5 pb-0 space-y-4">
        {/* Location Quick-Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-space-sm p-space-sm rounded-xl bg-surface border border-outline-variant/30 shadow-sm">
          <div className="flex items-center gap-space-xs font-badge-mono text-badge-mono text-on-surface-variant pl-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="hidden sm:inline font-bold tracking-wider">5 FOCUS PROTOTYPES:</span>
          </div>

          <div className="flex flex-wrap items-center gap-space-xs">
            {Object.values(allLocations).map((loc) => {
              const isCurrent = loc.id === location.id;
              const indicator = LOCATION_INDICATORS[loc.id] || { color: '#2e75b6' };
              return (
                <button
                  key={loc.id}
                  onClick={() => onSelectLocationId(loc.id)}
                  className={`px-3 py-1.5 rounded-lg font-label-md text-label-md cursor-pointer flex items-center gap-space-xs transition-all ${
                    isCurrent
                      ? 'bg-primary text-on-primary border-transparent shadow-sm'
                      : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/20 hover:bg-surface-container hover:text-on-surface'
                  } border`}
                  style={{
                    transform: isCurrent ? 'scale(1.02)' : 'scale(1)',
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: isCurrent ? '#fff' : indicator.color }}
                  />
                  <span>{loc.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Location Hero Card */}
        <div className="relative rounded-xl overflow-hidden border border-outline-variant/30 shadow-sm bg-surface-container-lowest">
          {/* Hero Image */}
          <div className="h-44 md:h-52 w-full relative">
            <img
              src={location.heroImage}
              alt={location.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface via-inverse-surface/80 to-transparent" />
          </div>

          {/* Foreground */}
          <div className="absolute bottom-space-md left-space-md right-space-md md:bottom-space-lg md:left-space-lg md:right-space-lg flex flex-col sm:flex-row sm:items-end justify-between gap-space-md">
            <div>
              <div className="flex items-center gap-space-xs font-badge-mono text-badge-mono text-primary-fixed font-bold tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span className="uppercase">
                  {location.region} / {location.state}
                </span>
                <span className="text-inverse-on-surface/50">/</span>
                <span className="text-inverse-on-surface/80">
                  {location.stats.elevation}
                </span>
              </div>
              <h1 className="font-display text-display text-inverse-on-surface mt-1 tracking-tight leading-none text-4xl">
                {location.name}
              </h1>
              <p className="font-body-sm text-body-sm text-inverse-on-surface/80 mt-2 max-w-2xl line-clamp-2 leading-relaxed">
                {location.summary}
              </p>
            </div>

            {/* Score Badge */}
            <div className="shrink-0 flex items-center gap-space-md px-space-md py-space-sm rounded-lg bg-surface-container-lowest border-y border-r border-outline-variant/30 border-l-[3px] border-l-error shadow-sm">
              <div>
                <span className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant block">
                  Risk score
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-headline-lg text-headline-lg font-bold text-error tracking-tight">
                    {location.riskEngine.overallScore}
                  </span>
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    / 100
                  </span>
                </div>
              </div>
              <div className="px-2 py-1 rounded-md bg-error-container text-on-error-container font-badge-mono text-badge-mono font-bold tracking-widest uppercase">
                {location.riskEngine.riskLevel}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-space-xs overflow-x-auto pb-px select-none border-b border-outline-variant/30">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-space-xs px-space-md py-3 font-label-md text-label-md cursor-pointer shrink-0 transition-all relative ${
                  isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-outline'}`} />
                <span>{tab.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-t-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-stage p-4 md:p-5 flex-1" key={activeTab}>
        {activeTab === 'overview' && (
          <TabOverview location={location} onSelectTab={setActiveTab} />
        )}
        {activeTab === 'hazards' && <TabHazards location={location} />}
        {activeTab === 'why' && <TabWhyAtRisk location={location} />}
        {activeTab === 'disasterLens' && (
          <TabDisasterLens location={location} />
        )}
        {activeTab === 'climateSource' && (
          <TabClimateSourceHub location={location} />
        )}
        {activeTab === 'solutions' && <TabSolutions location={location} />}
      </div>
    </div>
  );
}
