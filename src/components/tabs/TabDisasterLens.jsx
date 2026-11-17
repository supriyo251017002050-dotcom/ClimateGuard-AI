import React, { useState } from 'react';
import { History, Activity, AlertTriangle, CheckCircle2, ChevronRight, BarChart2 } from 'lucide-react';

export default function TabDisasterLens({ location }) {
  const [filter, setFilter] = useState('major');
  
  // Dummy historical data for demonstration
  const historicalEvents = [
    { year: 2020, type: 'Super Cyclone', name: 'Amphan', impact: 'Catastrophic', details: 'Widespread infrastructure damage, sustained winds up to 260 km/h.' },
    { year: 2015, type: 'Severe Floods', name: 'November Deluge', impact: 'Severe', details: 'Unprecedented rainfall leading to urban paralysis.' },
    { year: 2009, type: 'Cyclone', name: 'Aila', impact: 'Severe', details: 'Massive storm surges destroying coastal embankments.' },
    { year: 1999, type: 'Super Cyclone', name: '05B', impact: 'Catastrophic', details: 'One of the most intense tropical cyclones in recorded history.' }
  ];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full stagger-in">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[var(--bg-elevated)] border border-[var(--border-color)] p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-[var(--text-bright)] flex items-center gap-2 tracking-tight">
          <History className="text-[var(--brand-accent)] w-5 h-5" />
          Historical Disaster Lens
        </h2>
        
        <div className="flex p-1 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded flex-shrink-0">
          <button 
            onClick={() => setFilter('major')}
            className={`px-4 py-1.5 text-xs font-bold font-mono tracking-wide rounded transition-colors ${filter === 'major' ? 'bg-[var(--brand-accent)] text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
          >
            MAJOR EVENTS
          </button>
          <button 
            onClick={() => setFilter('chronic')}
            className={`px-4 py-1.5 text-xs font-bold font-mono tracking-wide rounded transition-colors ${filter === 'chronic' ? 'bg-[var(--brand-accent)] text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
          >
            CHRONIC ISSUES
          </button>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        
        {/* Left Column: Timeline */}
        <div className="lg:col-span-5 bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg p-5 shadow-sm">
          <h3 className="font-mono text-[11px] font-bold text-[var(--text-secondary)] mb-6 uppercase tracking-wider flex items-center justify-between">
            Timeline Record
            <BarChart2 className="w-4 h-4 text-[var(--text-muted)]" />
          </h3>
          
          <div className="relative border-l-2 border-[var(--border-hover)] ml-3 space-y-6">
            {historicalEvents.map((event, idx) => (
              <div key={idx} className="relative pl-6 group cursor-pointer">
                {/* Timeline Node */}
                <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-[3px] border-[var(--bg-elevated)] z-10 transition-colors ${idx === 0 ? 'bg-[var(--danger)]' : 'bg-[var(--border-hover)] group-hover:bg-[var(--brand-accent)]'}`}></div>
                
                {/* Content Card */}
                <div className={`p-4 rounded border transition-all ${idx === 0 ? 'bg-[var(--danger-soft)] border-[var(--danger)]' : 'bg-[var(--bg-surface)] border-[var(--border-color)] group-hover:border-[var(--brand-accent)]'}`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className={`font-mono text-xs font-bold ${idx === 0 ? 'text-[var(--danger)]' : 'text-[var(--brand-accent)]'}`}>
                      {event.year}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">{event.type}</span>
                  </div>
                  <h4 className="text-sm font-bold text-[var(--text-bright)] mb-1">{event.name}</h4>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2">{event.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Detailed Impact Report */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg p-6 shadow-sm flex-1">
            
            <div className="flex justify-between items-start border-b border-[var(--border-color)] pb-4 mb-6">
              <div>
                <span className="font-mono text-[10px] text-[var(--danger)] bg-[var(--danger-soft)] px-2 py-1 rounded border border-[var(--danger)] mb-3 inline-block font-bold tracking-wider">
                  SELECTED RECORD: 2020
                </span>
                <h3 className="text-2xl font-bold text-[var(--text-bright)] tracking-tight">Super Cyclone Amphan</h3>
                <p className="text-sm text-[var(--text-secondary)] mt-1">May 16 - May 21, 2020</p>
              </div>
              <Activity className="w-8 h-8 text-[var(--text-muted)] opacity-50" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-[var(--bg-surface)] p-4 rounded border border-[var(--border-color)]">
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider block mb-1">Economic Damage</span>
                <span className="text-xl font-bold text-[var(--danger)]">~$13.2 Billion</span>
              </div>
              <div className="bg-[var(--bg-surface)] p-4 rounded border border-[var(--border-color)]">
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider block mb-1">Population Affected</span>
                <span className="text-xl font-bold text-[var(--warning)]">4.4 Million</span>
              </div>
            </div>

            <div>
              <h4 className="font-mono text-[11px] font-bold text-[var(--text-secondary)] mb-3 uppercase tracking-wider">Lessons Learned & Action Items</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 bg-[var(--bg-surface)] p-3 rounded border border-[var(--border-color)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--success)] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[var(--text-bright)] block mb-0.5">Evacuation Protocols</span>
                    <span className="text-xs text-[var(--text-secondary)]">Early warning systems were highly effective, saving thousands of lives compared to 1999.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-[var(--bg-surface)] p-3 rounded border border-[var(--border-color)]">
                  <AlertTriangle className="w-4 h-4 text-[var(--warning)] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[var(--text-bright)] block mb-0.5">Power Grid Resilience</span>
                    <span className="text-xs text-[var(--text-secondary)]">Above-ground wiring suffered massive failure; urgent need for subterranean cabling in core sectors.</span>
                  </div>
                </li>
              </ul>
            </div>

            <button className="mt-8 w-full bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] text-[var(--text-primary)] font-mono text-xs font-bold py-3 rounded flex justify-center items-center gap-2 transition-colors">
              VIEW FULL INCIDENT REPORT <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
