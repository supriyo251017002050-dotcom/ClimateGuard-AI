# ClimateGuard Live Operations prototype

Live Operations is an India-first situational-awareness and workflow demonstration. It combines source-backed hazard observations with a separate simulated incident queue. It is not an emergency dispatch system and does not establish that an area is safe.

## Run locally

1. Copy the relevant empty settings from `.env.example` into `.env.local`.
2. Add a restricted `VITE_CESIUM_ION_TOKEN` for Cesium terrain/buildings if desired.
3. Add a free server-only `FIRMS_MAP_KEY` to enable NASA active-fire detections.
4. Run `npm run dev` and open `http://localhost:5173`.
5. Choose **Live operations** in the sidebar.

Without a FIRMS key, the fire feed reports **Unavailable** rather than displaying an empty result. The globe continues with the configured Esri basemap when optional Cesium providers fail.

## Live sources

| Layer | Source | Refresh/cache | Meaning |
| --- | --- | --- | --- |
| Official alerts | IMD CAP aggregation / NDMA Sachet context | 2 minutes, ETag revalidation | Government-origin warning content where supplied by the feed |
| Earthquakes | USGS GeoJSON | 1 minute | Instrumental earthquake reports inside the India monitoring window |
| Active fires | NASA FIRMS VIIRS | 15 minutes | Satellite heat detections, not confirmed incident reports |
| Weather | Open-Meteo | 5 minutes | Current conditions for a selected prototype location |

Each response uses the shared `HazardEvent` shape and includes an independent feed state. A provider failure never becomes a false zero-event or safe state; cached data becomes delayed/stale and a cold failure becomes unavailable.

## Simulated response workflow

Public Demo accepts an observation type, time, coordinate and short description. It explicitly asks for no personal details. Operator Demo can triage, verify or reject, assign one of three seeded teams, start a response and resolve it. All incidents, tasks and audit records live only in server memory and reset when Vite restarts or **Reset demo** is selected.

Operator notes are appended through `POST /api/incidents/:id/notes`; they cannot rewrite earlier audit entries.

This workflow has no authentication, database, notifications, agency integration, emergency contact, or dispatch capability. It must not be exposed as a real operational service.

## Security and deployment notes

- `FIRMS_MAP_KEY` and `OPENAI_API_KEY` remain server-side. Never prefix them with `VITE_`.
- The Cesium token is intentionally browser-visible and must be restricted at Cesium ion.
- Upstream URLs are fixed by server configuration; responses have deadlines and size limits.
- Before any public pilot, add real identity, role-based authorization, durable storage, abuse controls, audit retention, privacy review, monitoring and an agency-approved incident process.

## Verification

Run `npm test`, `npm run lint`, and `npm run build`. Provider tests use fixtures/mocks and do not consume external API quota.
