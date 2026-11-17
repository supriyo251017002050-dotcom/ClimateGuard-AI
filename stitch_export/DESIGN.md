---
name: Climate Intelligence Precision
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#414753'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#727784'
  outline-variant: '#c1c6d5'
  surface-tint: '#005cba'
  primary: '#004e9f'
  on-primary: '#ffffff'
  primary-container: '#0066cc'
  on-primary-container: '#dfe8ff'
  inverse-primary: '#aac7ff'
  secondary: '#006a61'
  on-secondary: '#ffffff'
  secondary-container: '#86f2e4'
  on-secondary-container: '#006f66'
  tertiary: '#005582'
  on-tertiary: '#ffffff'
  tertiary-container: '#006ea7'
  on-tertiary-container: '#d8ebff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e3ff'
  primary-fixed-dim: '#aac7ff'
  on-primary-fixed: '#001b3e'
  on-primary-fixed-variant: '#00458e'
  secondary-fixed: '#89f5e7'
  secondary-fixed-dim: '#6bd8cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#cce5ff'
  tertiary-fixed-dim: '#93ccff'
  on-tertiary-fixed: '#001d31'
  on-tertiary-fixed-variant: '#004b73'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display:
    fontFamily: Geist
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  telemetry-data:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: -0.01em
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Geist
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  badge-mono:
    fontFamily: Geist
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  space-2xs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-base: 1rem
  space-lg: 1.25rem
  space-xl: 1.5rem
  space-2xl: 2rem
  space-3xl: 3rem
  gutter-grid: 1rem
  sidebar-width: 16.25rem
  telemetry-panel-width: 22rem
---

## Brand & Style
This design system is engineered for enterprise risk managers, climatologists, ESG directors, and municipal resilience planners. It projects scientific authority, high-fidelity precision, and calm clarity amid environmental volatility. The emotional tone avoids climate fatalism in favor of actionable, analytical command.

The aesthetic fuses modern high-density SaaS with atmospheric glassmorphism. Crisp ocean blues and deep polar depths meet ultra-clean slate and alabaster backdrop planes. Translucent frosted overlays simulate atmospheric radar layers, while razor-sharp borders and monospaced telemetry tokens convey computational rigor. High-clarity risk indicators (emerald for resilience, amber for heightened exposure, and rose for acute climate anomalies) provide immediate perceptual hierarchy over large geographic, temporal, and tabular datasets.

## Colors
The palette centers on clean, high-luminance light backgrounds accented by deep oceanic and atmospheric tones:

- **Primary (`#0066CC` - Ocean Cobalt):** Primary actions, geo-spatial active states, map layer selections, and focal navigational vectors.
- **Secondary (`#0D9488` - Atmospheric Teal):** Environmental metrics, carbon mitigation analytics, and baseline telemetry indicators.
- **Tertiary (`#0284C7` - Stratosphere Azure):** Interactive hover states, subtle data visualizations, and contextual secondary buttons.
- **Neutral (`#64748B` - Slate Core):** Governs structural borders, microcopy, and auxiliary metrics. Neutral surface tiers scale from crisp alabaster (`#F8FAFC`) to layered surface cards (`#FFFFFF`) and slate dividers (`#E2E8F0`).

### Semantic Risk Telemetry
- **Nominal / Resilient:** Emerald (`#059669`)
- **Moderate / Watch:** Amber (`#D97706`)
- **Severe / Critical Alert:** Rose (`#E11D48`)
- **Atmospheric Neutral:** Slate Blue (`#475569`)

## Typography
Typography balances scientific density and immediate legibility:

- **Geist** powers display, headers, metric data points, and metadata tags. Its geometric proportions and compact numerals ensure dense numerical grids, coordinates, and telemetry readings maintain vertical alignment and clear legibility.
- **Inter** handles continuous narrative prose, scenario descriptions, disaster dossiers, and alert descriptions.
- **Micro-labels and status tokens** use strict uppercase tracking (`letter-spacing: 0.04em` to `0.06em`) to anchor dashboards with command-center clarity.

## Layout & Spacing
The layout follows a modular cockpit architecture:

- **Navigation & Rail:** A fixed 260px (`sidebar-width`) collapsed/expanded navigation pane on the left, grounding top-level views and environmental domains.
- **GIS Canvas & Core Stage:** A fluid central viewport designed for 3D geospatial views, GIS contour maps, and interactive risk models.
- **Contextual Telemetry Panel:** A 352px (`telemetry-panel-width`) right-anchored floating or docked inspector for drill-down risk analytics.
- **Grid Structure:** Inside cards and analytical dossiers, a 12-column fluid grid uses 16px (`gutter-grid`) gutters and 16px/24px container margins.
- **Responsive Adaptations:**
  - *Desktop (>1280px):* Full 3-pane layout with persistent 3D globe and telemetry inspection.
  - *Tablet (768px - 1279px):* Left rail collapses to a 64px icon bar; telemetry slides into a docked bottom drawer or layered overlay.
  - *Mobile (<768px):* Single-column flow. The map viewport is maintained at 45vh with bottom touch-sheet drawer controls; spacing compresses to 8px-12px base paddings.

## Elevation & Depth
Elevation mimics precision scientific optical instrumentation through subtle translucency and low-contrast perimeter lines:

- **Base Layer (Level 0):** Background canvas rendered in `#F8FAFC` or live WebGL viewport.
- **Subtle Glass Float (Level 1):** Floating controls, search bars, and HUD overlays use frosted glass:
  - `background: rgba(255, 255, 255, 0.82)`
  - `backdrop-filter: blur(12px) saturate(180%)`
  - `border: 1px solid rgba(226, 232, 240, 0.8)`
  - `box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04), 0 6px 16px -4px rgba(15, 23, 42, 0.06)`
- **Interactive Flyout / Modal (Level 2):** Drill-down dossiers and popovers:
  - `background: #FFFFFF`
  - `border: 1px solid #E2E8F0`
  - `box-shadow: 0 12px 24px -6px rgba(15, 23, 42, 0.08), 0 4px 8px -2px rgba(15, 23, 42, 0.04)`
- **Atmospheric Glow:** Focused interactive pins and severe risk badges apply colored halo shadows (e.g., `box-shadow: 0 0 12px rgba(225, 29, 72, 0.25)`).

## Shapes
A disciplined, soft-geometric radius profile (`roundedness: 1`) reflects precision technical instrumentation:
- **Base UI Elements (Buttons, Inputs, Metric Badges):** 4px (`0.25rem`) radius for sharp, crisp data presentation.
- **Standard Cards & Modular Panels:** 8px (`0.5rem`) radius.
- **HUD Overlays & Modals:** 12px (`0.75rem`) radius.
- **Pill Badges & Status Indicators:** Fully rounded (`9999px`) reserved strictly for status chips, telemetry tags, and pill toggles.

## Components

### Buttons
- **Primary:** Filled with Ocean Cobalt (`#0066CC`), white text, `4px` radius, subtle top-edge highlight inset. On hover, shifts to `#0052A3` with a 2px elevation lift.
- **Secondary / Glass HUD:** Frosted backdrop `rgba(255, 255, 255, 0.85)`, slate border `#CBD5E1`, text `#0F172A`. Hover shifts to solid `#FFFFFF` with primary border accent.
- **Ghost:** Borderless slate hover states for map navigation controls (zoom, reset orientation, projection switch).

### Status Badges & Telemetry Chips
- Compact height (`22px` - `24px`), font family `Geist`, `badge-mono` tracking.
- Composed of a translucent tinted background (e.g., `rgba(5, 150, 105, 0.1)`), solid tinted border (`rgba(5, 150, 105, 0.3)`), high-contrast text, and an active pulse indicator dot (`6px`).

### Cards & Telemetry Containers
- Flat white or 85% frosted backdrop with a 1px `#E2E8F0` border.
- Divided into clear visual hierarchy: metadata header (icon, uppercase label, status badge), high-density data body (large metric + trend sparkline), and sub-level footer.

### Form Inputs & Selectors
- Background `#FFFFFF`, border `1px solid #CBD5E1`, inset shadow `0 1px 2px rgba(15, 23, 42, 0.04)`.
- Focused state features a crisp 2px Ocean Cobalt focus ring (`rgba(0, 102, 204, 0.2)`).
- Search fields integrate monospaced keyboard shortcut badges (`Cmd+K`).

### Selection Controls (Checkboxes & Radios)
- Geometric 4px rounded checkboxes; circular 16px radios.
- Inactive state: `1.5px solid #94A3B8`.
- Checked state: Primary cobalt fill with crisp white vector marks.

### Data Dossiers & Tables
- Dense 36px row heights with horizontal hairline borders `#F1F5F9`.
- Monospaced numerical columns right-aligned with Geist font metrics to guarantee tabular digit alignment.