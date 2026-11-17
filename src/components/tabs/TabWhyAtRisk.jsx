import React from 'react';
import { Target, Users, Shield, Plus, X, Divide, Equal, Info } from 'lucide-react';

export default function TabWhyAtRisk({ location }) {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full stagger-in">
      {/* Header */}
      <div className="flex justify-between items-center bg-[var(--bg-elevated)] border border-[var(--border-color)] p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-[var(--text-bright)] flex items-center gap-2 tracking-tight">
          <Target className="text-[var(--danger)] w-5 h-5" />
          Risk Factor Analysis
        </h2>
        <span className="font-mono text-xs font-bold px-2 py-1 bg-[var(--danger-soft)] text-[var(--danger)] rounded uppercase tracking-wider border border-[var(--danger)]">
          Vulnerability Critical
        </span>
      </div>

      {/* Equation Block (Sendai Framework Concept) */}
      <div className="bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-lg p-6 shadow-sm flex flex-col justify-center overflow-x-auto">
        <h4 className="font-mono text-[10px] text-[var(--text-secondary)] mb-4 uppercase tracking-widest flex items-center gap-2">
          <Info className="w-3 h-3" /> Systemic Risk Equation
        </h4>
        <div className="flex items-center gap-3 md:gap-6 min-w-max pb-2">
          
          <div className="flex flex-col items-center">
            <div className="h-16 w-32 bg-[var(--danger-soft)] border border-[var(--danger)] rounded flex items-center justify-center font-bold text-lg text-[var(--danger)] shadow-sm">
              RISK
            </div>
          </div>
          
          <Equal className="w-6 h-6 text-[var(--text-muted)] shrink-0" />
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="h-12 w-32 bg-[var(--warning-soft)] border border-[var(--warning)] rounded flex items-center justify-center font-bold text-sm text-[var(--warning)] shadow-sm">
                HAZARD
              </div>
              <X className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
              <div className="h-12 w-32 bg-[var(--brand-accent-soft)] border border-[var(--brand-accent)] rounded flex items-center justify-center font-bold text-sm text-[var(--brand-accent)] shadow-sm text-center px-2 leading-tight">
                VULNERABILITY
              </div>
            </div>
            
            <div className="w-full h-px bg-[var(--border-hover)] my-1 relative">
              <Divide className="w-4 h-4 text-[var(--text-muted)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--bg-elevated)] p-0.5" />
            </div>
            
            <div className="h-12 w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded flex items-center justify-center font-bold text-sm text-[var(--success)] shadow-sm">
              CAPACITY
            </div>
          </div>

        </div>
      </div>

      {/* Content Grid (3 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1: Hazard Profile */}
        <div className="flex flex-col gap-4">
          <h3 className="font-mono text-sm font-bold text-[var(--warning)] border-b border-[var(--border-color)] pb-2 uppercase tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--warning)]"></span>
            Hazard Profile
          </h3>
          
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg p-4 shadow-sm hover:border-[var(--border-hover)] transition-colors group">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-[var(--text-bright)] text-sm">Geological Proximity</h4>
              <span className="font-mono text-[10px] text-[var(--warning)] bg-[var(--warning-soft)] px-1.5 py-0.5 rounded">HIGH</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Located within 50km of active tectonic fault lines. High probability of seismic activity exceeding 6.0 Richter scale.
            </p>
          </div>
          
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg p-4 shadow-sm hover:border-[var(--border-hover)] transition-colors group">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-[var(--text-bright)] text-sm">Climatic Extremes</h4>
              <span className="font-mono text-[10px] text-[var(--danger)] bg-[var(--danger-soft)] px-1.5 py-0.5 rounded">CRITICAL</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Coastal positioning exposes the area to intense cyclonic storms, storm surges, and rapidly escalating sea levels.
            </p>
          </div>
        </div>

        {/* Column 2: Exposure & Vulnerability */}
        <div className="flex flex-col gap-4">
          <h3 className="font-mono text-sm font-bold text-[var(--brand-accent)] border-b border-[var(--border-color)] pb-2 uppercase tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--brand-accent)]"></span>
            Exposure & Vulnerability
          </h3>
          
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg p-4 shadow-sm hover:border-[var(--border-hover)] transition-colors group">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-[var(--text-bright)] text-sm">Population Density</h4>
              <Users className="w-4 h-4 text-[var(--text-muted)]" />
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
              Hyper-dense urban planning complicates mass evacuation and stretches emergency resources thin.
            </p>
            <div className="w-full bg-[var(--bg-elevated)] rounded-full h-1.5 border border-[var(--border-color)]">
              <div className="bg-[var(--danger)] h-1.5 rounded-full" style={{ width: '90%' }}></div>
            </div>
          </div>
          
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg p-4 shadow-sm hover:border-[var(--border-hover)] transition-colors group">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-[var(--text-bright)] text-sm">Aging Infrastructure</h4>
              <span className="font-mono text-[10px] text-[var(--danger)] bg-[var(--danger-soft)] px-1.5 py-0.5 rounded">CRITICAL</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Drainage systems and power grids date back over 40 years, lacking resilience against modern extreme weather events.
            </p>
          </div>
        </div>

        {/* Column 3: Capacity (Deficits) */}
        <div className="flex flex-col gap-4">
          <h3 className="font-mono text-sm font-bold text-[var(--success)] border-b border-[var(--border-color)] pb-2 uppercase tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--success)]"></span>
            Capacity Deficits
          </h3>
          
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg p-4 shadow-sm hover:border-[var(--border-hover)] transition-colors group">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-[var(--text-bright)] text-sm">Early Warning Reach</h4>
              <Shield className="w-4 h-4 text-[var(--text-muted)]" />
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
              Last-mile communication to vulnerable coastal communities remains unreliable during power outages.
            </p>
            <div className="w-full bg-[var(--bg-elevated)] rounded-full h-1.5 border border-[var(--border-color)]">
              <div className="bg-[var(--success)] h-1.5 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
          
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg p-4 shadow-sm hover:border-[var(--border-hover)] transition-colors group">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-[var(--text-bright)] text-sm">Shelter Capacity</h4>
              <span className="font-mono text-[10px] text-[var(--warning)] bg-[var(--warning-soft)] px-1.5 py-0.5 rounded">LOW</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Current cyclone shelters can only accommodate 60% of the projected displaced population in a worst-case scenario.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
