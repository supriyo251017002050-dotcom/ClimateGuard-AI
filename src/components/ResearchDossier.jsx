import React from 'react';

export default function ResearchDossier() {
  return (
    <div className="h-full overflow-y-auto w-full bg-surface pb-space-3xl">
      {/* Top Document Header Bar */}
<header className="w-full bg-surface-container-low/70 backdrop-blur-md px-space-xl py-space-xl lg:px-space-3xl lg:py-space-2xl">
<div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
<div className="flex flex-wrap items-center justify-between gap-space-md">
<div className="flex flex-wrap items-center gap-space-xs">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-highest text-primary font-badge-mono text-badge-mono uppercase">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            Peer-Reviewed Synthesis
          </span>
<span className="inline-flex items-center px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant font-badge-mono text-badge-mono">
            V4.2 RELEASE
          </span>
<span className="inline-flex items-center px-2 py-0.5 rounded-md bg-secondary-container/50 text-on-secondary-container font-badge-mono text-badge-mono">
            UPDATED 2024 FEED
          </span>
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-container text-outline font-badge-mono text-badge-mono">
<span className="material-symbols-outlined text-[12px]">verified</span>
            DOI: 10.1038/CG-2024-089X
          </span>
</div>
<div className="flex items-center gap-space-sm">
<button className="inline-flex items-center gap-space-xs px-space-md py-2 rounded-lg bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container transition-all font-label-md text-label-md">
<span className="material-symbols-outlined text-[16px] text-tertiary">share</span>
<span>Cite / BibTeX</span>
</button>
<button className="inline-flex items-center gap-space-xs px-space-md py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary shadow-sm transition-all font-label-md text-label-md">
<span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
<span>Download Full PDF (38 MB)</span>
</button>
</div>
</div>
<div className="space-y-space-xs">
<div className="text-primary font-label-sm text-label-sm uppercase tracking-widest font-semibold flex items-center gap-2">
<span>Climatic Risk Intelligence</span>
<span className="text-outline-variant">/</span>
<span>Technical Whitepaper Series 2024</span>
</div>
<h1 className="font-display text-display text-on-surface tracking-tight max-w-4xl">
          Research: Multi-Hazard Climate Risk Methodology &amp; Literature Review
        </h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
          Synthesizing peer-reviewed climate models, empirical disaster telemetry, and high-resolution Earth Observation datasets across 8 authoritative scientific institutions.
        </p>
</div>
{/* Quick Metrics Ribbon */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-space-md pt-space-xs">
<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant">Validated Empirical Events</span>
<span className="font-display text-headline-lg text-primary mt-1">1,240+</span>
<span className="font-body-sm text-body-sm text-secondary flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-[14px]">history_edu</span>
            1970–2024 Archive
          </span>
</div>
<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant">Model Confidence Index</span>
<span className="font-display text-headline-lg text-on-surface mt-1">99.4%</span>
<span className="font-body-sm text-body-sm text-primary flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-[14px]">psychology</span>
            Ensemble Bayesian CMIP6
          </span>
</div>
<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant">Spatial Resolution</span>
<span className="font-display text-headline-lg text-tertiary mt-1">1.2 km²</span>
<span className="font-body-sm text-body-sm text-outline flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-[14px]">grid_4x4</span>
            ISRO Sentinel-Downscaled
          </span>
</div>
<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant">Academic Review Consensus</span>
<span className="font-display text-headline-lg text-secondary mt-1">8 / 8</span>
<span className="font-body-sm text-body-sm text-secondary flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-[14px]">verified_user</span>
            Cross-Standard Approved
          </span>
</div>
</div>
</div>
</header>
{/* Main Grid Layout: Interactive TOC Sidebar + Content Body */}
<div className="max-w-7xl mx-auto w-full px-space-base lg:px-space-3xl py-space-2xl grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-start">
{/* Table of Contents Sticky Rail */}
<aside className="hidden lg:flex lg:col-span-3 flex-col sticky top-24 gap-space-lg">
<div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-space-sm">
<div className="flex items-center gap-space-xs text-primary pb-space-2xs">
<span className="material-symbols-outlined text-[18px]">account_tree</span>
<span className="font-label-md text-label-md uppercase tracking-wider font-bold">Contents</span>
</div>
<nav className="flex flex-col gap-1 text-on-surface-variant">
<a className="flex items-center justify-between px-space-sm py-1.5 rounded-lg text-primary font-label-md text-label-md bg-surface-container-highest transition-colors" href="#exec-summary">
<span>1. Executive Synthesis</span>
<span className="font-badge-mono text-badge-mono opacity-70">p. 03</span>
</a>
<a className="flex items-center justify-between px-space-sm py-1.5 rounded-lg hover:bg-surface-container hover:text-on-surface font-label-md text-label-md transition-colors" href="#hazard-formula">
<span>2. Quantitative Engine</span>
<span className="font-badge-mono text-badge-mono opacity-70">p. 09</span>
</a>
<a className="flex items-center justify-between px-space-sm py-1.5 rounded-lg hover:bg-surface-container hover:text-on-surface font-label-md text-label-md transition-colors" href="#weight-distribution">
<span>3. Parameter Weightings</span>
<span className="font-badge-mono text-badge-mono opacity-70">p. 15</span>
</a>
<a className="flex items-center justify-between px-space-sm py-1.5 rounded-lg hover:bg-surface-container hover:text-on-surface font-label-md text-label-md transition-colors" href="#literature-corpus">
<span>4. Authoritative Corpus</span>
<span className="font-badge-mono text-badge-mono opacity-70">p. 22</span>
</a>
<a className="flex items-center justify-between px-space-sm py-1.5 rounded-lg hover:bg-surface-container hover:text-on-surface font-label-md text-label-md transition-colors" href="#case-studies">
<span>5. Disaster Benchmarks</span>
<span className="font-badge-mono text-badge-mono opacity-70">p. 31</span>
</a>
</nav>
</div>
{/* Lead Authors Card */}
<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-sm">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Methodology Working Group</span>
<div className="flex flex-col gap-space-sm">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-headline-sm text-headline-sm">
              R
            </div>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface">Dr. Radhika Sen</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Lead Climatologist, IPCC AR6 WG2 Contributor</span>
</div>
</div>
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-headline-sm text-headline-sm">
              V
            </div>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface">Prof. Vikram Rao</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Director of GIS Geospatial Analytics, CEEW</span>
</div>
</div>
</div>
</div>
{/* Scientific Disclaimer Notice */}
<div className="p-space-md rounded-xl bg-surface-container-high/60 flex items-start gap-space-sm">
<span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">info</span>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
          Data inputs undergo double-blind bias correction utilizing NASA GPM and ESA Copernicus SAR telemetry feeds.
        </p>
</div>
</aside>
{/* Dossier Content Body */}
<main className="lg:col-span-9 flex flex-col gap-space-3xl">
{/* Section 1: Executive Literature Review */}
<section className="flex flex-col gap-space-base scroll-mt-24" id="exec-summary">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-badge-mono text-badge-mono">01 / OVERVIEW</span>
<span className="text-outline-variant">•</span>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Analytical Framework</span>
</div>
<span className="font-badge-mono text-badge-mono text-outline">READ TIME: 8 MIN</span>
</div>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          Executive Literature Review &amp; Synthesis Framework
        </h2>
<p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          Climate risk modeling for the South Asian subcontinent has historically suffered from systemic fragmentation: atmospheric dynamics models operate at low resolution (25–50 km²), while vulnerability frameworks deployed by humanitarian agencies operate qualitatively at district or sub-district levels without synchronizing real-time satellite telemetry.
        </p>
{/* Quote Callout Card */}
<blockquote className="p-space-lg rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-space-sm relative overflow-hidden">
<div className="absolute -right-4 -bottom-6 text-primary/10 select-none pointer-events-none">
<span className="material-symbols-outlined text-[130px]">format_quote</span>
</div>
<p className="font-headline-sm text-headline-sm text-on-surface italic relative z-10 leading-snug">
            “The intersection of thermodynamic sea-surface warming in the North Indian Ocean and intensification of continental heat domes creates compound cascade events that render single-variable hazard analysis dangerously obsolete.”
          </p>
<div className="flex items-center gap-space-sm relative z-10 pt-space-xs">
<span className="w-2 h-2 rounded-full bg-primary"></span>
<span className="font-label-sm text-label-sm text-primary font-bold">IPCC Working Group II Assessment Report (AR6), Chapter 10: Asia</span>
</div>
</blockquote>
<p className="font-body-md text-body-md text-on-surface leading-relaxed">
          The ClimateGuard AI framework bridges this operational disconnect by synthesizing three foundational pillars:
        </p>
{/* 3 Pillars Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-md">
<div className="flex flex-col gap-space-xs">
<div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">air</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Thermodynamic Models</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                Coupled Model Intercomparison Project Phase 6 (CMIP6) downscaled dynamically via regional atmospheric models (WRF).
              </p>
</div>
<span className="font-badge-mono text-badge-mono text-tertiary">IMD &amp; ECMWF Reanalysis</span>
</div>
<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-md">
<div className="flex flex-col gap-space-xs">
<div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[20px]">radar</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Spatial Satellite Radar</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                Synthetic Aperture Radar (SAR) microwave backscatter telemetry tracking soil saturation, inundation footprints, and vegetative stress.
              </p>
</div>
<span className="font-badge-mono text-badge-mono text-secondary">ISRO Bhuvan &amp; Sentinel-1</span>
</div>
<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-md">
<div className="flex flex-col gap-space-xs">
<div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined text-[20px]">apartment</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Socio-Economic Exposure</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                Gram Panchayat and ward-level census metrics incorporating housing stock resilience, electrical grid stability, and road egress viability.
              </p>
</div>
<span className="font-badge-mono text-badge-mono text-primary">NDMA &amp; CEEW Data Bank</span>
</div>
</div>
</section>
{/* Section 2: Quantitative Hazard Profiling &amp; Mathematical Engine */}
<section className="flex flex-col gap-space-base scroll-mt-24" id="hazard-formula">
<div className="flex items-center gap-space-xs">
<span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-badge-mono text-badge-mono">02 / MATHEMATICAL ARCHITECTURE</span>
<span className="text-outline-variant">•</span>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Composite Risk Index</span>
</div>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          Algorithmic Formulation of Compound Vulnerability
        </h2>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Standardized under the Sendai Framework for Disaster Risk Reduction and adapted for multi-temporal satellite feeds, the climate risk coefficient ($\mathcal&#123;R&#125;_&#123;it&#125;$) for geographic cell $i$ at time interval $t$ is formulated as an exponential interaction tensor:
        </p>
{/* Math Block Card */}
<div className="p-space-lg rounded-xl bg-surface-container shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-lg">
<div className="flex flex-col gap-space-xs w-full">
<span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">Governing Formulation</span>
<div className="p-space-md rounded-lg bg-surface-container-lowest shadow-sm overflow-x-auto">
<code className="font-telemetry-data text-headline-sm text-on-surface tracking-wide select-all block py-1 font-semibold">
                Risk_&#123;i,t&#125; = \left[ \frac&#123;\mathcal&#123;H&#125;_&#123;i,t&#125; \times \mathcal&#123;E&#125;_&#123;i&#125; \times \mathcal&#123;S&#125;_&#123;i&#125;&#125;&#123;\mathcal&#123;A&#125;_&#123;i&#125;&#125; \right]^&#123;\gamma&#125; \cdot \prod_&#123;k=1&#125;^&#123;n&#125; (1 + \omega_k \cdot \Delta_&#123;k,i,t&#125;)
              </code>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Where $\mathcal&#123;H&#125;$ represents Hazard Magnitude, $\mathcal&#123;E&#125;$ is Asset Exposure, $\mathcal&#123;S&#125;$ is Physical Sensitivity, and $\mathcal&#123;A&#125;$ is Localized Adaptive Capacity. $\omega_k$ measures non-linear tipping-point thresholds.
            </p>
</div>
</div>
{/* Section 3: Parameter Weights Distribution */}
<div className="flex flex-col gap-space-md pt-space-md" id="weight-distribution">
<div className="flex items-center justify-between">
<h3 className="font-headline-md text-headline-md text-on-surface">Parameter Weighting &amp; Contribution Vectors</h3>
<span className="font-badge-mono text-badge-mono text-on-surface-variant">Normal Distribution ($\sum w_i = 100\%$)</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-base">
{/* Parameter 1: Precipitation Variance */}
<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-[20px]">rainy</span>
<span className="font-headline-sm text-headline-sm text-on-surface">Precipitation Variance</span>
</div>
<span className="font-headline-md text-headline-md text-primary font-bold">30%</span>
</div>
<div className="w-full h-2 rounded-full bg-surface-container">
<div className="h-full rounded-full bg-primary" style={{ width: '30%' }}></div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                Departure from 50-year IMD monsoon baseline, 24-hour peak volume intensity ($P_&#123;99&#125;$), and antecedent soil saturation triggers.
              </p>
<div className="flex items-center justify-between font-badge-mono text-badge-mono text-outline pt-space-2xs">
<span>SENSOR: GPM IMERG 0.1°</span>
<span>LATENCY: 4h UPDATE</span>
</div>
</div>
{/* Parameter 2: Thermal Anomaly */}
<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-error text-[20px]">thermostat</span>
<span className="font-headline-sm text-headline-sm text-on-surface">Thermal Anomaly ($T_&#123;anomaly&#125;$)</span>
</div>
<span className="font-headline-md text-headline-md text-error font-bold">25%</span>
</div>
<div className="w-full h-2 rounded-full bg-surface-container">
<div className="h-full rounded-full bg-error" style={{ width: '25%' }}></div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                Wet-bulb globe temperature ($TW$) exceeding physiological thresholds (&gt;32°C), continuous heatwave streak length, and urban heat island (UHI) amplification.
              </p>
<div className="flex items-center justify-between font-badge-mono text-badge-mono text-outline pt-space-2xs">
<span>SENSOR: MODIS LST &amp; ERA5</span>
<span>LATENCY: 1h UPDATE</span>
</div>
</div>
{/* Parameter 3: Infrastructure Density */}
<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-tertiary text-[20px]">hub</span>
<span className="font-headline-sm text-headline-sm text-on-surface">Infrastructure Vulnerability</span>
</div>
<span className="font-headline-md text-headline-md text-tertiary font-bold">25%</span>
</div>
<div className="w-full h-2 rounded-full bg-surface-container">
<div className="h-full rounded-full bg-tertiary" style={{ width: '25%' }}></div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                Spatial concentration of critical civic assets, power transmission sub-stations within 100-year flood plains, and primary arterial road inundation vulnerability.
              </p>
<div className="flex items-center justify-between font-badge-mono text-badge-mono text-outline pt-space-2xs">
<span>SOURCE: OpenStreetMap &amp; GIS-NIC</span>
<span>LATENCY: 24h SYNC</span>
</div>
</div>
{/* Parameter 4: Soil Moisture Deficit */}
<div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-[20px]">water_bottle</span>
<span className="font-headline-sm text-headline-sm text-on-surface">Soil Moisture Deficit</span>
</div>
<span className="font-headline-md text-headline-md text-secondary font-bold">20%</span>
</div>
<div className="w-full h-2 rounded-full bg-surface-container">
<div className="h-full rounded-full bg-secondary" style={{ width: '20%' }}></div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                Root-zone moisture content (SMAP L4) below the 10th percentile for agricultural vegetative growth, tracking progressive meteorological-to-agricultural drought transition.
              </p>
<div className="flex items-center justify-between font-badge-mono text-badge-mono text-outline pt-space-2xs">
<span>SENSOR: NASA SMAP 9km</span>
<span>LATENCY: 12h UPDATE</span>
</div>
</div>
</div>
</div>
</section>
{/* Section 4: 8-Source Academic References Corpus */}
<section className="flex flex-col gap-space-base scroll-mt-24" id="literature-corpus">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-badge-mono text-badge-mono">03 / EVIDENCE BASE</span>
<span className="text-outline-variant">•</span>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Peer-Reviewed Literature</span>
</div>
<div className="flex items-center gap-2">
<button className="px-2.5 py-1 rounded bg-primary text-on-primary font-badge-mono text-badge-mono" id="filter-all">ALL (8)</button>
<button className="px-2.5 py-1 rounded bg-surface-container text-on-surface-variant hover:text-on-surface font-badge-mono text-badge-mono" id="filter-clim">CLIMATOLOGY</button>
<button className="px-2.5 py-1 rounded bg-surface-container text-on-surface-variant hover:text-on-surface font-badge-mono text-badge-mono" id="filter-pol">GOV / POLICY</button>
</div>
</div>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          Authoritative Literature Corpus &amp; Integration Index
        </h2>
<div className="flex flex-col gap-space-sm" id="citation-list">
{/* Source 1: IPCC AR6 */}
<article className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col gap-space-xs group" data-category="clim">
<div className="flex flex-wrap items-center justify-between gap-space-xs">
<div className="flex items-center gap-space-xs">
<span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary font-badge-mono text-badge-mono">[REF-01]</span>
<span className="font-label-md text-label-md text-on-surface font-semibold">Intergovernmental Panel on Climate Change (IPCC)</span>
<span className="w-1 h-1 rounded-full bg-outline-variant"></span>
<span className="font-body-sm text-body-sm text-on-surface-variant">2023 Synthesis Report</span>
</div>
<span className="inline-flex items-center gap-1 font-badge-mono text-badge-mono text-secondary">
<span className="material-symbols-outlined text-[14px]">check_circle</span> ACTIVE MODEL FEED
              </span>
</div>
<h4 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
              AR6 Climate Change 2023: Synthesis Report. Contribution of Working Groups I, II and III to the Sixth Assessment Report
            </h4>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Provides the global Shared Socioeconomic Pathways (SSP2-4.5 and SSP5-8.5) carbon trajectory constraints utilized in ClimateGuard’s forward looking 2030–2050 localized projections.
            </p>
<div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-2xs">
<div className="flex items-center gap-space-xs font-badge-mono text-badge-mono text-outline">
<span>IMPACT FACTOR: 18.2</span>
<span>•</span>
<span>CITATIONS: 4,120</span>
<span>•</span>
<span>PEER REVIEW: BLIND</span>
</div>
<a className="inline-flex items-center gap-1 text-primary font-label-sm text-label-sm hover:underline" href="#">
<span>View DOI metadata</span>
<span className="material-symbols-outlined text-[14px]">open_in_new</span>
</a>
</div>
</article>
{/* Source 2: IMD Monsoon Monograph */}
<article className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col gap-space-xs group" data-category="gov">
<div className="flex flex-wrap items-center justify-between gap-space-xs">
<div className="flex items-center gap-space-xs">
<span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary font-badge-mono text-badge-mono">[REF-02]</span>
<span className="font-label-md text-label-md text-on-surface font-semibold">India Meteorological Department (IMD)</span>
<span className="w-1 h-1 rounded-full bg-outline-variant"></span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Monsoon Monograph No. 28</span>
</div>
<span className="inline-flex items-center gap-1 font-badge-mono text-badge-mono text-secondary">
<span className="material-symbols-outlined text-[14px]">check_circle</span> HISTORICAL RADAR BASELINE
              </span>
</div>
<h4 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
              Decadal Shifts in High-Intensity Short-Duration Monsoonal Cloudbursts Across Central India (1901–2022)
            </h4>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Provides the multi-decadal historical rainfall baseline for calibrating flood frequency curves and identifying urban pluvial exceedance levels.
            </p>
<div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-2xs">
<div className="flex items-center gap-space-xs font-badge-mono text-badge-mono text-outline">
<span>TYPE: STATISTICAL REPORT</span>
<span>•</span>
<span>STATIONS: 3,450 GAUGES</span>
<span>•</span>
<span>STATUS: BENCHMARKED</span>
</div>
<a className="inline-flex items-center gap-1 text-primary font-label-sm text-label-sm hover:underline" href="#">
<span>IMD Technical Archive</span>
<span className="material-symbols-outlined text-[14px]">open_in_new</span>
</a>
</div>
</article>
{/* Source 3: Nature Climate Change 2023 */}
<article className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col gap-space-xs group" data-category="clim">
<div className="flex flex-wrap items-center justify-between gap-space-xs">
<div className="flex items-center gap-space-xs">
<span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary font-badge-mono text-badge-mono">[REF-03]</span>
<span className="font-label-md text-label-md text-on-surface font-semibold">Nature Climate Change</span>
<span className="w-1 h-1 rounded-full bg-outline-variant"></span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Vol 13, Issue 7 (2023)</span>
</div>
<span className="inline-flex items-center gap-1 font-badge-mono text-badge-mono text-secondary">
<span className="material-symbols-outlined text-[14px]">check_circle</span> ANOMALY LOGIC
              </span>
</div>
<h4 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
              South Asian Monsoonal Circulation Shifts Under Arabian Sea Rapid Thermal Expansion
            </h4>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Identifies that marine heatwaves in the Arabian Sea are fueling a 52% increase in post-monsoon cyclonic intensity and rapid landfall acceleration along the Gujarat-Maharashtra shoreline.
            </p>
<div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-2xs">
<div className="flex items-center gap-space-xs font-badge-mono text-badge-mono text-outline">
<span>IMPACT FACTOR: 30.7</span>
<span>•</span>
<span>STATUS: SYNTHESIZED</span>
<span>•</span>
<span>DOI: 10.1038/s41558-023-01684-w</span>
</div>
<a className="inline-flex items-center gap-1 text-primary font-label-sm text-label-sm hover:underline" href="#">
<span>Read Full Article</span>
<span className="material-symbols-outlined text-[14px]">open_in_new</span>
</a>
</div>
</article>
{/* Source 4: NDMA Flood Guidelines */}
<article className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col gap-space-xs group" data-category="gov">
<div className="flex flex-wrap items-center justify-between gap-space-xs">
<div className="flex items-center gap-space-xs">
<span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary font-badge-mono text-badge-mono">[REF-04]</span>
<span className="font-label-md text-label-md text-on-surface font-semibold">National Disaster Management Authority (NDMA)</span>
<span className="w-1 h-1 rounded-full bg-outline-variant"></span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Operational Directives</span>
</div>
<span className="inline-flex items-center gap-1 font-badge-mono text-badge-mono text-primary">
<span className="material-symbols-outlined text-[14px]">checklist</span> PROTOCOL COMPLIANT
              </span>
</div>
<h4 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
              National Guidelines for the Management of Urban Flooding and Flash Flood Early Warning Integrations
            </h4>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Defines standard municipal evacuation zoning, reservoir discharge alert thresholds, and critical health infrastructure protection mandates.
            </p>
<div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-2xs">
<div className="flex items-center gap-space-xs font-badge-mono text-badge-mono text-outline">
<span>TYPE: REGULATORY FRAMEWORK</span>
<span>•</span>
<span>APPLICABILITY: NATIONWIDE</span>
</div>
<a className="inline-flex items-center gap-1 text-primary font-label-sm text-label-sm hover:underline" href="#">
<span>NDMA Circular PDF</span>
<span className="material-symbols-outlined text-[14px]">open_in_new</span>
</a>
</div>
</article>
{/* Source 5: CEEW Climate Vulnerability Index */}
<article className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col gap-space-xs group" data-category="pol">
<div className="flex flex-wrap items-center justify-between gap-space-xs">
<div className="flex items-center gap-space-xs">
<span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary font-badge-mono text-badge-mono">[REF-05]</span>
<span className="font-label-md text-label-md text-on-surface font-semibold">Council on Energy, Environment and Water (CEEW)</span>
<span className="w-1 h-1 rounded-full bg-outline-variant"></span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Special Report</span>
</div>
<span className="inline-flex items-center gap-1 font-badge-mono text-badge-mono text-secondary">
<span className="material-symbols-outlined text-[14px]">check_circle</span> WEIGHT VECTOR ANCHOR
              </span>
</div>
<h4 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
              Mapping India's Climate Vulnerability: A District-Level Climate Vulnerability Assessment
            </h4>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Provides the empirical basis for sensitivity weighting ($\mathcal&#123;S&#125;$), proving that over 75% of Indian districts are extreme climate event hotspots.
            </p>
<div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-2xs">
<div className="flex items-center gap-space-xs font-badge-mono text-badge-mono text-outline">
<span>640 DISTRICTS ANALYZED</span>
<span>•</span>
<span>CVI INDEX 2021</span>
</div>
<a className="inline-flex items-center gap-1 text-primary font-label-sm text-label-sm hover:underline" href="#">
<span>CEEW Report Portal</span>
<span className="material-symbols-outlined text-[14px]">open_in_new</span>
</a>
</div>
</article>
{/* Source 6: ISRO Bhuvan Services */}
<article className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col gap-space-xs group" data-category="clim">
<div className="flex flex-wrap items-center justify-between gap-space-xs">
<div className="flex items-center gap-space-xs">
<span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary font-badge-mono text-badge-mono">[REF-06]</span>
<span className="font-label-md text-label-md text-on-surface font-semibold">ISRO National Remote Sensing Centre (NRSC)</span>
<span className="w-1 h-1 rounded-full bg-outline-variant"></span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Bhuvan Platform</span>
</div>
<span className="inline-flex items-center gap-1 font-badge-mono text-badge-mono text-secondary">
<span className="material-symbols-outlined text-[14px]">sensors</span> LIVE RASTER FEED
              </span>
</div>
<h4 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
              Multi-Mission Earth Observation Disaster Support System: Real-Time Inundation &amp; Landslide Scar Ingestion
            </h4>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Direct telemetry interface feeding Cartosat DEMs and RISAT-1A SAR spatial vectors into the high-resolution topographic exposure layers.
            </p>
<div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-2xs">
<div className="flex items-center gap-space-xs font-badge-mono text-badge-mono text-outline">
<span>TELEMETRY: CARTOSAT + RISAT</span>
<span>•</span>
<span>REFRESH: SUB-DAILY</span>
</div>
<a className="inline-flex items-center gap-1 text-primary font-label-sm text-label-sm hover:underline" href="#">
<span>Bhuvan Geospatial API</span>
<span className="material-symbols-outlined text-[14px]">open_in_new</span>
</a>
</div>
</article>
{/* Source 7: WMO State of Global Climate */}
<article className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col gap-space-xs group" data-category="clim">
<div className="flex flex-wrap items-center justify-between gap-space-xs">
<div className="flex items-center gap-space-xs">
<span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary font-badge-mono text-badge-mono">[REF-07]</span>
<span className="font-label-md text-label-md text-on-surface font-semibold">World Meteorological Organization (WMO)</span>
<span className="w-1 h-1 rounded-full bg-outline-variant"></span>
<span className="font-body-sm text-body-sm text-on-surface-variant">WMO-No. 1316</span>
</div>
<span className="inline-flex items-center gap-1 font-badge-mono text-badge-mono text-outline">
                GLOBAL REFERENCE
              </span>
</div>
<h4 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
              State of the Global Climate 2023: South Asian Regional Weather Extrema &amp; Cryosphere Recession
            </h4>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Tracks the accelerated retreat of Himalayan glacier volume and the subsequent downstream outburst flood (GLOF) hazard amplification vectors.
            </p>
<div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-2xs">
<div className="flex items-center gap-space-xs font-badge-mono text-badge-mono text-outline">
<span>HIMALAYAN GLOF RISKS</span>
<span>•</span>
<span>WMO TECHNICAL PAPERS</span>
</div>
<a className="inline-flex items-center gap-1 text-primary font-label-sm text-label-sm hover:underline" href="#">
<span>WMO Publication Repository</span>
<span className="material-symbols-outlined text-[14px]">open_in_new</span>
</a>
</div>
</article>
{/* Source 8: Reserve Bank of India Climate Stress */}
<article className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col gap-space-xs group" data-category="gov">
<div className="flex flex-wrap items-center justify-between gap-space-xs">
<div className="flex items-center gap-space-xs">
<span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-primary font-badge-mono text-badge-mono">[REF-08]</span>
<span className="font-label-md text-label-md text-on-surface font-semibold">Reserve Bank of India (RBI)</span>
<span className="w-1 h-1 rounded-full bg-outline-variant"></span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Report on Currency and Finance (RCF)</span>
</div>
<span className="inline-flex items-center gap-1 font-badge-mono text-badge-mono text-primary">
                FINANCIAL BENCHMARK
              </span>
</div>
<h4 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
              Towards a Greener Future: Macroeconomic Stress Testing of Climate Change Physical Risks on Indian Banking Assets
            </h4>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Provides the quantitative conversion formulas translating environmental risk indices ($\mathcal&#123;R&#125;_&#123;it&#125;$) into anticipated physical damage loss ratios and credit default probabilities.
            </p>
<div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-2xs">
<div className="flex items-center gap-space-xs font-badge-mono text-badge-mono text-outline">
<span>SECTOR: MACROPRUDENTIAL</span>
<span>•</span>
<span>FISCAL HORIZON: 2030-2050</span>
</div>
<a className="inline-flex items-center gap-1 text-primary font-label-sm text-label-sm hover:underline" href="#">
<span>RBI Bulletin Reference</span>
<span className="material-symbols-outlined text-[14px]">open_in_new</span>
</a>
</div>
</article>
</div>
</section>
{/* Section 5: Interactive Disaster Profiles with Case Studies */}
<section className="flex flex-col gap-space-base scroll-mt-24" id="case-studies">
<div className="flex items-center gap-space-xs">
<span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-badge-mono text-badge-mono">04 / EMPIRICAL BENCHMARKS</span>
<span className="text-outline-variant">•</span>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Historical Case Studies</span>
</div>
<h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          Retrospective Model Validation on Major Disasters
        </h2>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          ClimateGuard AI backtests its predictive algorithms against ground-truth observational telemetry from significant historical events to verify precision, lead-time efficacy, and spatial accuracy.
        </p>
{/* Case Studies Tabs / Selector Cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
{/* Case 1: 2018 Kerala Floods */}
<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-base hover:shadow-md transition-shadow">
<div className="flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<span className="px-2 py-0.5 rounded bg-primary-container text-on-primary font-badge-mono text-badge-mono">HYDROLOGICAL</span>
<span className="font-badge-mono text-badge-mono text-outline">AUG 2018</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mt-1">2018 Kerala Deluge &amp; Dam Spill Cascades</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                164% above normal rainfall over 18 days leading to synchronous release across 35 major dams in the Periyar and Pamba river basins.
              </p>
</div>
{/* Mini Data Visual Graphic */}
<div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-space-2xs">
<div className="flex items-center justify-between text-body-sm font-label-sm">
<span className="text-on-surface-variant">Peak 48-hr Deficit Anomaly</span>
<span className="text-primary font-bold font-telemetry-data">+414 mm</span>
</div>
<div className="w-full h-1.5 rounded-full bg-surface-container">
<div className="h-full rounded-full bg-primary" style={{ width: '88%' }}></div>
</div>
<div className="flex items-center justify-between font-badge-mono text-badge-mono text-outline pt-1">
<span>MODEL LEAD TIME: 72h ADVANCE</span>
<span className="text-secondary font-bold">96.8% ACCURACY</span>
</div>
</div>
<div className="pt-space-2xs">
<div className="text-primary font-label-md text-label-md flex items-center gap-1 cursor-pointer hover:underline">
<span>Review Inundation Reconstruction</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</div>
</div>
</div>
{/* Case 2: 2023 Cyclone Biparjoy */}
<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-base hover:shadow-md transition-shadow">
<div className="flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<span className="px-2 py-0.5 rounded bg-secondary text-on-secondary font-badge-mono text-badge-mono">CYCLONIC / SURGE</span>
<span className="font-badge-mono text-badge-mono text-outline">JUN 2023</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mt-1">2023 Cyclone Biparjoy (Arabian Sea)</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                Longest-lived cyclone in the Arabian Sea (13 days), displaying anomalous rapid intensification fueled by 31°C sea surface temperatures.
              </p>
</div>
{/* Mini Data Visual Graphic */}
<div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-space-2xs">
<div className="flex items-center justify-between text-body-sm font-label-sm">
<span className="text-on-surface-variant">Sustained Wind Peak</span>
<span className="text-secondary font-bold font-telemetry-data">165 km/h (Cat 3)</span>
</div>
<div className="w-full h-1.5 rounded-full bg-surface-container">
<div className="h-full rounded-full bg-secondary" style={{ width: '79%' }}></div>
</div>
<div className="flex items-center justify-between font-badge-mono text-badge-mono text-outline pt-1">
<span>LANDFALL DEV: &lt;14 KM</span>
<span className="text-secondary font-bold">ZERO CASUALTY NDMA</span>
</div>
</div>
<div className="pt-space-2xs">
<div className="text-primary font-label-md text-label-md flex items-center gap-1 cursor-pointer hover:underline">
<span>Review Trajectory Simulation</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</div>
</div>
</div>
{/* Case 3: 2024 North India Heatwave */}
<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-base hover:shadow-md transition-shadow">
<div className="flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<span className="px-2 py-0.5 rounded bg-error text-on-error font-badge-mono text-badge-mono">THERMAL EXTREME</span>
<span className="font-badge-mono text-badge-mono text-outline">MAY–JUN 2024</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mt-1">2024 North India Multi-Week Heat Dome</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                Historic daytime peaks touching 50.5°C across Delhi-NCR and Rajasthan, compounded by night-time heat indices exceeding critical human survival thresholds.
              </p>
</div>
{/* Mini Data Visual Graphic */}
<div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-space-2xs">
<div className="flex items-center justify-between text-body-sm font-label-sm">
<span className="text-on-surface-variant">Peak Wet-Bulb Exceedance</span>
<span className="text-error font-bold font-telemetry-data">33.8°C TW</span>
</div>
<div className="w-full h-1.5 rounded-full bg-surface-container">
<div className="h-full rounded-full bg-error" style={{ width: '95%' }}></div>
</div>
<div className="flex items-center justify-between font-badge-mono text-badge-mono text-outline pt-1">
<span>HEAT DURATION: 28 DAYS</span>
<span className="text-primary font-bold">GRID STRESS +34%</span>
</div>
</div>
<div className="pt-space-2xs">
<div className="text-primary font-label-md text-label-md flex items-center gap-1 cursor-pointer hover:underline">
<span>Inspect Urban Heat Island Map</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</div>
</div>
</div>
</div>
{/* Deep Dive Card: Kerala Floods Detailed Inundation Profile */}
<div className="mt-space-md p-space-xl rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-space-lg">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-lg bg-primary text-on-primary flex items-center justify-center">
<span className="material-symbols-outlined text-[24px]">analytics</span>
</div>
<div>
<h3 className="font-headline-md text-headline-md text-on-surface">Case Deep Dive: Spatial Water Balance Simulation</h3>
<span className="font-body-sm text-body-sm text-on-surface-variant">Reconstructed using ClimateGuard Hydro-Engine v4.2 vs. On-Site Gauge Telemetry</span>
</div>
</div>
<span className="font-badge-mono text-badge-mono text-primary bg-surface-container-highest px-3 py-1 rounded-full uppercase">
              CONFIDENCE INTERVAL: 95%
            </span>
</div>
{/* Comparative Data Table */}
<div className="overflow-x-auto">
<table className="w-full text-left font-body-sm text-body-sm text-on-surface">
<thead>
<tr className="bg-surface-container-high/50 font-label-sm text-label-sm text-on-surface-variant">
<th className="py-2.5 px-space-md">HYDROLOGICAL BASIN</th>
<th className="py-2.5 px-space-md">OBSERVED INFLOW (CUMECS)</th>
<th className="py-2.5 px-space-md">MODEL PREDICTED</th>
<th className="py-2.5 px-space-md">VARIANCE ($\delta$)</th>
<th className="py-2.5 px-space-md">INUNDATION CLASSIFICATION</th>
<th className="py-2.5 px-space-md text-right">PEAK RISK RATING</th>
</tr>
</thead>
<tbody className="divide-y-0">
<tr className="hover:bg-surface-container transition-colors">
<td className="py-3 px-space-md font-semibold">Idukki Catchment</td>
<td className="py-3 px-space-md font-telemetry-data">1,520 m³/s</td>
<td className="py-3 px-space-md font-telemetry-data">1,488 m³/s</td>
<td className="py-3 px-space-md font-telemetry-data text-secondary">-2.1%</td>
<td className="py-3 px-space-md">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-error-container text-on-error-container font-badge-mono text-badge-mono font-semibold">CATASTROPHIC</span>
</td>
<td className="py-3 px-space-md text-right font-headline-sm text-headline-sm text-error">9.8 / 10</td>
</tr>
<tr className="hover:bg-surface-container transition-colors">
<td className="py-3 px-space-md font-semibold">Periyar Downstream</td>
<td className="py-3 px-space-md font-telemetry-data">2,140 m³/s</td>
<td className="py-3 px-space-md font-telemetry-data">2,205 m³/s</td>
<td className="py-3 px-space-md font-telemetry-data text-primary">+3.0%</td>
<td className="py-3 px-space-md">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-error-container text-on-error-container font-badge-mono text-badge-mono font-semibold">SEVERE OVERTOPPING</span>
</td>
<td className="py-3 px-space-md text-right font-headline-sm text-headline-sm text-error">9.4 / 10</td>
</tr>
<tr className="hover:bg-surface-container transition-colors">
<td className="py-3 px-space-md font-semibold">Pamba Estuary</td>
<td className="py-3 px-space-md font-telemetry-data">940 m³/s</td>
<td className="py-3 px-space-md font-telemetry-data">915 m³/s</td>
<td className="py-3 px-space-md font-telemetry-data text-secondary">-2.6%</td>
<td className="py-3 px-space-md">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-highest text-primary font-badge-mono text-badge-mono font-semibold">ELEVATED FLUSH</span>
</td>
<td className="py-3 px-space-md text-right font-headline-sm text-headline-sm text-tertiary">7.9 / 10</td>
</tr>
</tbody>
</table>
</div>
{/* Bottom Summary Strip inside Case Study */}
<div className="flex flex-col md:flex-row items-center justify-between gap-space-sm pt-space-xs">
<div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[18px] text-secondary">verified</span>
<span>Model demonstrated a 3.4-hour warning horizon advantage over traditional stream gauges.</span>
</div>
<button className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-lg bg-surface-container-lowest text-primary hover:bg-surface-container transition-all font-label-md text-label-md">
<span className="material-symbols-outlined text-[16px]">file_download</span>
<span>Export Raw Hydrograph CSV</span>
</button>
</div>
</div>
</section>
{/* Section 6: Document Audit &amp; Citation Footer Banner */}
<footer className="p-space-xl rounded-xl bg-surface-container-lowest shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-lg">
<div className="flex flex-col gap-space-xs max-w-xl">
<div className="flex items-center gap-space-xs text-primary font-label-sm text-label-sm font-bold uppercase tracking-wider">
<span className="material-symbols-outlined text-[18px]">security_update_good</span>
<span>Continuous Peer Verification Engine</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            This technical report is automatically validated on a bi-monthly cycle against newly indexed publications in Scopus, Nature Publishing Group, and the IMD Science Bulletin.
          </p>
<span className="font-badge-mono text-badge-mono text-outline">
            HASH: 8f2a1b94c307e5e1a • VERIFIED BY CLIMATEGURARD AI RESEARCH CONSORTIUM
          </span>
</div>
<div className="flex items-center gap-space-sm shrink-0">
<button className="px-space-lg py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors">
            Request Methodology Briefing
          </button>
<button className="px-space-lg py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md shadow-sm transition-colors flex items-center gap-1.5">
<span className="material-symbols-outlined text-[18px]">download</span>
<span>Download All 8 Papers</span>
</button>
</div>
</footer>
</main>
</div>
    </div>
  );
}
