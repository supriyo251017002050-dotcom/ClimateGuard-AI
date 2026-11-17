# Live View integration

ClimateGuard embeds a presentation-adapted build of the locally cloned God's Eye View application inside the Live Operations map workspace. **Live View** is the user-facing ClimateGuard name; the upstream project name remains in source, license, and provenance records. The two applications remain separate Vite runtimes:

- ClimateGuard: `http://localhost:5173/`
- Live View (adapted God's Eye View runtime): `http://localhost:4173/`

Run both with `npm run dev` from the ClimateGuard project root. The launcher passes the existing browser-visible Cesium token and server-side FIRMS key to the child process without copying or printing their values.

In Live Operations, use the **Disaster map / Live View** switch above the map. The Disaster map displays ClimateGuard's normalized official-alert, earthquake, fire, weather, and demo-incident data. Live View provides the exploratory 3D public-data globe; choose **Disaster signals** on its first-run mission screen for disaster-relevant sources.

The adaptation changes presentation copy, visual design, loading feedback, responsive behavior, and embed lifecycle messaging. Internal identifiers are intentionally unchanged to reduce divergence from upstream and preserve compatibility with the original tests.

The integration intentionally does not merge aircraft, military, vessel, radio, satellite, or CCTV data into ClimateGuard's normalized hazard contract. Those sources keep their upstream terms and are not treated as disaster reports.

## Source and license

- Upstream: `https://github.com/bilawalsidhu/gods-eye-view`
- Integrated commit: `b5e546daf1810422b9035ee272bfe01f25a74e8b`
- Source-code license: MIT, Copyright (c) 2026 Bilawal Sidhu
- Full upstream license: `gods-eye-view/LICENSE`
- Third-party data terms: `gods-eye-view/DATA_SOURCES.md`

The local clone's Vite document policy permits framing only from ClimateGuard's local development origins. The credential-management API continues to return `X-Frame-Options: DENY` and `frame-ancestors 'none'`.
