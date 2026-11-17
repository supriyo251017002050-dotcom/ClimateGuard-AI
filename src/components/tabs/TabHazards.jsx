import React from 'react';
import { AlertOctagon, ArrowRight, CloudLightning, Activity, AlertTriangle, Wind, Waves } from 'lucide-react';

export default function TabHazards({ location }) {
  const { hazards } = location;

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full stagger-in">
      {/* Header */}
      <div className="bg-[var(--bg-elevated)] border border-[var(--border-color)] p-5 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div>
          <h3 className="text-xl font-bold text-[var(--text-bright)] flex items-center gap-2 tracking-tight">
            <CloudLightning className="text-[var(--danger)] w-5 h-5" />
            Geological & Meteorological Hazards
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mt-1 max-w-2xl">
            Real-time tracking of active and developing threat vectors in the region.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded border border-[var(--danger-soft)] bg-[var(--danger-soft)] text-[var(--danger)]">
          <AlertOctagon className="w-4 h-4 animate-pulse" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider">Active Threats Detected</span>
        </div>
      </div>

      {/* Timeline Formation Flow */}
      <div className="bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg p-5 shadow-sm">
        <h4 className="font-mono text-[11px] font-bold text-[var(--text-secondary)] mb-4 uppercase tracking-wider">Threat Progression Flow</h4>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
          {['Depression', 'Cyclonic Storm', 'Severe Cyclone'].map((stage, i) => (
            <React.Fragment key={i}>
              <div className={`flex-1 border rounded p-4 text-center relative ${i === 2 ? 'bg-[var(--danger-soft)] border-[var(--danger)] text-[var(--danger)]' : 'bg-[var(--bg-surface)] border-[var(--border-color)] text-[var(--text-bright)]'}`}>
                {i === 2 && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[var(--danger)] text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase">Current Stage</span>
                )}
                <span className="font-bold text-sm block">{stage}</span>
                <span className="font-mono text-[10px] opacity-70 mt-1 block">T-{72 - (i * 24)}H</span>
              </div>
              {i < 2 && <ArrowRight className="w-5 h-5 text-[var(--text-muted)] shrink-0 hidden md:block" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Grid of Hazards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hazards.map((hazard, idx) => {
          let severityColor = 'var(--border-color)';
          let bgColor = 'var(--bg-surface)';
          let textColor = 'var(--text-primary)';
          let icon = <Activity className="w-5 h-5" />;

          if (hazard.severity === 'Extreme' || hazard.severity === 'Severe') {
            severityColor = 'var(--danger)';
            bgColor = 'var(--danger-soft)';
            textColor = 'var(--danger)';
            icon = <Wind className="w-5 h-5 text-[var(--danger)]" />;
          } else if (hazard.severity === 'High') {
            severityColor = 'var(--warning)';
            bgColor = 'var(--warning-soft)';
            textColor = 'var(--warning)';
            icon = <AlertTriangle className="w-5 h-5 text-[var(--warning)]" />;
          } else {
            severityColor = 'var(--brand-accent)';
            bgColor = 'var(--brand-accent-soft)';
            textColor = 'var(--brand-accent)';
            icon = <Waves className="w-5 h-5 text-[var(--brand-accent)]" />;
          }

          return (
            <div key={idx} className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg overflow-hidden flex flex-col hover:border-[var(--border-hover)] transition-colors shadow-sm group">
              <div className="h-2 w-full" style={{ backgroundColor: severityColor }}></div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 rounded bg-[var(--bg-elevated)] group-hover:bg-[var(--bg-hover)] transition-colors border border-[var(--border-color)]">
                    {icon}
                  </div>
                  <span className="font-mono text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider" style={{ backgroundColor: bgColor, color: textColor, border: `1px solid ${severityColor}` }}>
                    {hazard.severity}
                  </span>
                </div>
                <h4 className="text-base font-bold text-[var(--text-bright)] mb-2">{hazard.type}</h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed flex-1">
                  {hazard.details}
                </p>
                
                <div className="mt-4 pt-3 border-t border-[var(--border-color)] flex justify-between items-center">
                  <span className="font-mono text-[10px] text-[var(--text-muted)]">STATUS: ACTIVE</span>
                  <button className="text-[11px] font-semibold text-[var(--brand-accent)] hover:underline flex items-center gap-1">
                    Details <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
