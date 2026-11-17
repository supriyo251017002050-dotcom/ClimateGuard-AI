import React from 'react';

export default function Sidebar({
  activeNav,
  setActiveNav,
  isDarkMode,
  setIsDarkMode,
  isOpen,
  setIsOpen,
  onOpenReport,
  onResetView,
}) {
  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'global', label: 'Global view', icon: 'public' },
    { id: 'india', label: 'India / Regional', icon: 'pin_drop' },
    { id: 'states', label: 'States', icon: 'layers' },
    { id: 'dashboard', label: 'Dashboard', icon: 'query_stats' },
    { id: 'operations', label: 'Live operations', icon: 'emergency_share' },
    { id: 'literature', label: 'Research', icon: 'menu_book' },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-full w-sidebar-width bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between select-none transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex flex-col">
        <div
          className="h-16 px-space-base flex items-center gap-space-sm bg-surface-container-low cursor-pointer"
          onClick={onResetView}
        >
          <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-on-primary shadow-sm">
            <span className="material-symbols-outlined text-[20px]">shield_with_heart</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface leading-none tracking-tight">
              ClimateGuard AI
            </span>
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest mt-0.5">
              Risk intelligence
            </span>
          </div>
        </div>
        
        <div className="px-space-base py-space-xs">
          <div className="flex items-center justify-between px-space-sm py-space-2xs rounded-lg bg-surface-container-highest/60">
            <div className="flex items-center gap-space-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
              <span className="font-badge-mono text-badge-mono uppercase text-secondary font-bold tracking-wider">
                Operational Feed
              </span>
            </div>
            <span className="font-badge-mono text-badge-mono text-on-surface-variant">v4.8</span>
          </div>
        </div>

        <nav className="px-space-sm pt-space-xs flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveNav(item.id);
                }}
                className={`flex items-center gap-space-md px-space-md py-2.5 rounded-lg transition-colors cursor-pointer w-full text-left ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-semibold'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span className="font-label-md text-label-md">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-space-base flex flex-col gap-space-base bg-surface-container-low">
        <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex flex-col gap-space-sm">
          <div className="flex items-center gap-space-xs text-primary">
            <span className="material-symbols-outlined text-[16px]">auto_read_play</span>
            <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider">
              Synthesis Review
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
            Full report: 8-source literature review, methodology, and disaster profiles.
          </p>
          <button
            onClick={() => setActiveNav('literature')}
            className="w-full flex items-center justify-center gap-space-xs py-1.5 px-space-sm rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            <span>Open research</span>
          </button>
        </div>

        <div className="flex items-center justify-between px-space-xs pt-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[18px] text-secondary">
              {isDarkMode ? 'dark_mode' : 'light_mode'}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Mode: {isDarkMode ? 'Dark' : 'Light'}
            </span>
          </div>
          <div className="flex items-center p-0.5 rounded-md bg-surface-container">
            <button
              aria-label="Active Light Mode"
              onClick={() => setIsDarkMode(false)}
              className={`px-2 py-0.5 rounded-sm font-badge-mono text-badge-mono cursor-pointer transition-colors ${
                !isDarkMode
                  ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                  : 'text-outline hover:text-on-surface'
              }`}
              type="button"
            >
              LIGHT
            </button>
            <button
              aria-label="Dark Mode Inactive"
              onClick={() => setIsDarkMode(true)}
              className={`px-2 py-0.5 rounded-sm font-badge-mono text-badge-mono cursor-pointer transition-colors ${
                isDarkMode
                  ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                  : 'text-outline hover:text-on-surface'
              }`}
              type="button"
            >
              DARK
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
