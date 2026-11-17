import React, { useState } from 'react';
import { BookOpen, ExternalLink, ShieldCheck, Newspaper, GraduationCap, Building2 } from 'lucide-react';

export default function TabClimateSourceHub() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  
  const sources = [
    { title: 'IPCC AR6 Synthesis Report', org: 'Intergovernmental Panel on Climate Change', year: '2023', category: 'SCIENTIFIC', icon: <GraduationCap className="w-4 h-4" /> },
    { title: 'National Disaster Management Guidelines', org: 'NDMA India', year: '2022', category: 'OFFICIAL', icon: <ShieldCheck className="w-4 h-4" /> },
    { title: 'Urban Flood Mitigation Strategies', org: 'Ministry of Housing and Urban Affairs', year: '2021', category: 'OFFICIAL', icon: <ShieldCheck className="w-4 h-4" /> },
    { title: 'Bay of Bengal Cyclonic Trends', org: 'Indian Meteorological Department', year: '2023', category: 'SCIENTIFIC', icon: <GraduationCap className="w-4 h-4" /> },
    { title: 'Community Evacuation Standard Operating Procedure', org: 'State Disaster Management Authority', year: '2024', category: 'PREPAREDNESS', icon: <Building2 className="w-4 h-4" /> },
    { title: 'Global Climate Risk Index', org: 'Germanwatch', year: '2021', category: 'NEWS', icon: <Newspaper className="w-4 h-4" /> }
  ];

  const filteredSources = activeFilter === 'ALL' ? sources : sources.filter(s => s.category === activeFilter);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full stagger-in">
      {/* Header */}
      <div className="bg-[var(--bg-elevated)] border border-[var(--border-color)] p-5 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div>
          <h3 className="text-xl font-bold text-[var(--text-bright)] flex items-center gap-2 tracking-tight">
            <BookOpen className="text-[var(--brand-accent)] w-5 h-5" />
            Trusted Knowledge Gateway
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mt-1 max-w-2xl">
            Verified intelligence hub. Central repository for authoritative research, government protocols, and scientific literature.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded border border-[var(--brand-accent-soft)] bg-[var(--brand-accent-soft)] text-[var(--brand-accent)]">
          <ShieldCheck className="w-4 h-4" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider">Source Verified</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {['ALL', 'OFFICIAL', 'SCIENTIFIC', 'PREPAREDNESS', 'NEWS'].map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 text-xs font-bold font-mono tracking-wider rounded border transition-colors ${
              activeFilter === filter 
                ? 'bg-[var(--brand-accent)] border-[var(--brand-accent)] text-white' 
                : 'bg-[var(--bg-surface)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--brand-accent)]'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid of Reference Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSources.map((source, idx) => {
          
          let tagColor = 'var(--text-muted)';
          if (source.category === 'OFFICIAL') tagColor = 'var(--brand-accent)';
          if (source.category === 'SCIENTIFIC') tagColor = 'var(--warning)';
          if (source.category === 'PREPAREDNESS') tagColor = 'var(--success)';

          return (
            <div key={idx} className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-lg p-5 flex flex-col hover:border-[var(--brand-accent)] hover:shadow-md transition-all group shadow-sm">
              <div className="flex justify-between items-start mb-4 border-b border-[var(--border-color)] pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-[var(--bg-elevated)] border border-[var(--border-color)] text-[var(--text-secondary)] group-hover:text-[var(--brand-accent)] group-hover:border-[var(--brand-accent)] transition-colors">
                    {source.icon}
                  </div>
                  <span className="font-mono text-[10px] font-bold tracking-wider px-2 py-0.5 rounded border border-[var(--border-color)]" style={{ color: tagColor, backgroundColor: `color-mix(in srgb, ${tagColor} 10%, transparent)` }}>
                    {source.category}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[var(--text-muted)] bg-[var(--bg-elevated)] px-2 py-1 rounded">{source.year}</span>
              </div>
              
              <h4 className="text-base font-bold text-[var(--text-bright)] mb-2 leading-tight group-hover:text-[var(--brand-accent)] transition-colors">{source.title}</h4>
              <p className="text-xs text-[var(--text-secondary)] mb-6 mt-auto">{source.org}</p>
              
              <button className="w-full py-2 bg-[var(--bg-elevated)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] text-[var(--text-primary)] rounded font-mono text-[11px] font-bold flex items-center justify-center gap-2 transition-colors group-hover:border-[var(--brand-accent)] group-hover:text-[var(--brand-accent)]">
                ACCESS DOCUMENT <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
