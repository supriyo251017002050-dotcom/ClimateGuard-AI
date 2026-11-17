# Design System: Live View

## 1. Visual Theme & Atmosphere

Live View is a polished planetary operations atlas: cinematic enough for a presentation, calm enough for situational awareness. Density is cockpit-balanced (7/10), variance is controlled and asymmetric (6/10), and motion is fluid but restrained (7/10). The globe remains the visual hero; controls frame the data instead of competing with it.

## 2. Color Palette & Roles

- **Deep Atlas** (`#07131C`) — application canvas and fallback behind the globe.
- **Night Surface** (`#0C1D28`) — primary translucent panel surface.
- **Raised Surface** (`#132A36`) — hover, selection, and nested control surface.
- **Cloud White** (`#F2F7F5`) — primary text and high-priority values.
- **Mist Gray** (`#9AB0B8`) — secondary labels, helper text, and metadata.
- **Warm Signal** (`#EFA35C`) — the single brand accent for active controls, focus rings, and progress.
- **Structural Line** (`rgba(171, 205, 211, 0.18)`) — panel boundaries and separators.
- Semantic green, amber, and coral are reserved for live, delayed, and critical data states.

No pure black, purple gradients, electric neon glow, or cold/warm gray mixing.

## 3. Typography Rules

- **Display and body:** Outfit, weights 400–700. Headings use tight tracking and sentence case.
- **Telemetry:** JetBrains Mono, tabular figures, short uppercase labels only.
- **Body copy:** relaxed `1.5` line height and a maximum readable measure of `65ch`.
- Inter and generic serif fonts are not used.

## 4. Component Styling

- **Buttons:** compact rounded rectangles with a quiet raised surface. Hover lifts by one pixel; press scales to `0.975`. Active state uses Warm Signal as a solid or inset edge, never an outer neon glow.
- **Panels:** deep translucent atlas glass with a subtle top highlight and navy-tinted shadow. Corners range from 10px for controls to 18px for primary surfaces.
- **Mission choices:** a responsive two-column grid with strong icon anchors, descriptive copy, and staggered entrance.
- **Inputs:** label above, dark raised surface, Warm Signal focus ring, inline errors.
- **Loading:** branded orbital rings and a horizontal progress sweep; no generic spinner.
- **Empty/error states:** direct language and a specific recovery action.

## 5. Layout Principles

- The globe always occupies the full canvas.
- Identity anchors upper-left; current-view status anchors upper-right.
- Operational panels form two edge rails and one centered command dock.
- Use CSS Grid for mission selection and structured content.
- Below 768px, multi-column controls collapse to one column and touch targets remain at least 44px.
- Required provider attribution always remains visible.

## 6. Motion & Interaction

- Use `cubic-bezier(.2,.8,.2,1)` with 180–320ms durations.
- Animate only `transform` and `opacity` for disclosure, button feedback, staggered mission rows, and loading choreography.
- Active status dots breathe gently; loading rings rotate on compositor layers.
- Lists reveal in a short 35ms cascade with total delay below 250ms.
- Respect `prefers-reduced-motion` by removing transforms, looping effects, and smooth scrolling.

## 7. Anti-Patterns

- No emojis, custom cursor, pure black, purple/neon gradients, excessive glow, or gradient text.
- No Inter or generic serif fonts.
- No overlapping readable content or hidden attribution.
- No three-equal-card marketing layout.
- No generic filler, surveillance-fantasy copy, or claims that imagery is live video.
- No animation of layout dimensions or positional offsets during interaction.
