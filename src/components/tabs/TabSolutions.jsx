import React from 'react';
import { LifeBuoy, CheckSquare, PhoneCall, HeartPulse, HardHat, Building, AlertTriangle } from 'lucide-react';

export default function TabSolutions() {
  const individualChecklist = [
    { text: "Prepare an emergency 'Go-Bag' with 72-hours of supplies.", checked: true },
    { text: "Identify the highest point in your home for flood scenarios.", checked: true },
    { text: "Memorize evacuation routes to the nearest designated shelter.", checked: false },
    { text: "Secure heavy furniture and fixtures against seismic activity.", checked: false },
    { text: "Maintain hard copies of essential identification and insurance documents.", checked: false }
  ];

  const completionPercent = (individualChecklist.filter(item => item.checked).length / individualChecklist.length) * 100;

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full stagger-in">
      {/* Header */}
      <div className="flex justify-between items-center bg-[var(--bg-elevated)] border border-[var(--border-color)] p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-[var(--text-bright)] flex items-center gap-2 tracking-tight">
          <LifeBuoy className="text-[var(--success)] w-5 h-5" />
          Actionable Preparedness & Mitigation
        </h2>
        <div className="flex items-center gap-2 bg-[var(--danger)] text-white px-3 py-1.5 rounded text-xs font-bold font-mono shadow-sm">
          <PhoneCall className="w-3 h-3" /> DIAL 112 FOR EMERGENCY
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Individual Level (Checklist) */}
        <div className="lg:col-span-7 bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg p-6 shadow-sm flex flex-col">
          <h3 className="font-mono text-xs font-bold text-[var(--text-secondary)] mb-6 uppercase tracking-wider flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
            <HeartPulse className="w-4 h-4 text-[var(--success)]" /> Household / Individual Level
          </h3>
          
          <div className="mb-6">
            <div className="flex justify-between items-end mb-2">
              <span className="font-bold text-sm text-[var(--text-bright)]">Readiness Status</span>
              <span className="font-mono text-xl font-bold text-[var(--success)] leading-none">{completionPercent}%</span>
            </div>
            <div className="w-full h-2 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[var(--success)] transition-all duration-1000 ease-out"
                style={{ width: `${completionPercent}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-3 flex-1">
            {individualChecklist.map((item, idx) => (
              <label key={idx} className="flex items-start gap-3 p-3 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded cursor-pointer hover:border-[var(--brand-accent)] transition-colors group">
                <div className="mt-0.5 relative shrink-0">
                  <input type="checkbox" className="sr-only" defaultChecked={item.checked} />
                  <div className={`w-5 h-5 rounded border ${item.checked ? 'bg-[var(--success)] border-[var(--success)]' : 'bg-[var(--bg-elevated)] border-[var(--border-color)] group-hover:border-[var(--brand-accent)]'} flex items-center justify-center transition-colors`}>
                    {item.checked && <CheckSquare className="w-3.5 h-3.5 text-white" />}
                  </div>
                </div>
                <span className={`text-sm ${item.checked ? 'text-[var(--text-muted)] line-through' : 'text-[var(--text-primary)]'}`}>
                  {item.text}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Right Column: Community & Municipal */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Community Block */}
          <div className="bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg p-5 shadow-sm">
            <h3 className="font-mono text-[11px] font-bold text-[var(--text-secondary)] mb-4 uppercase tracking-wider flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
              <HardHat className="w-4 h-4 text-[var(--warning)]" /> Community Initiatives
            </h3>
            <div className="space-y-4">
              <div className="relative pl-4 border-l-2 border-[var(--warning)]">
                <h4 className="text-sm font-bold text-[var(--text-bright)] mb-1">Local Response Teams</h4>
                <p className="text-xs text-[var(--text-secondary)]">Form neighborhood watch units trained in basic first aid and search-and-rescue protocols.</p>
              </div>
              <div className="relative pl-4 border-l-2 border-[var(--warning)]">
                <h4 className="text-sm font-bold text-[var(--text-bright)] mb-1">Resource Pooling</h4>
                <p className="text-xs text-[var(--text-secondary)]">Establish localized stockpiles of water, non-perishables, and medical supplies.</p>
              </div>
            </div>
          </div>

          {/* Municipal Block */}
          <div className="bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg p-5 shadow-sm flex-1">
            <h3 className="font-mono text-[11px] font-bold text-[var(--text-secondary)] mb-4 uppercase tracking-wider flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
              <Building className="w-4 h-4 text-[var(--brand-accent)]" /> Municipal Directives
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-[var(--bg-surface)] p-3 rounded border border-[var(--border-color)]">
                <AlertTriangle className="w-4 h-4 text-[var(--danger)] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-bright)] mb-1">Infrastructure Hardening</h4>
                  <p className="text-xs text-[var(--text-secondary)]">Retrofit critical public buildings (hospitals, schools) for seismic resistance.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[var(--bg-surface)] p-3 rounded border border-[var(--border-color)]">
                <AlertTriangle className="w-4 h-4 text-[var(--brand-accent)] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-bright)] mb-1">Drainage Overhaul</h4>
                  <p className="text-xs text-[var(--text-secondary)]">Implement smart-grid pumping stations to mitigate urban flooding in low-lying sectors.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
