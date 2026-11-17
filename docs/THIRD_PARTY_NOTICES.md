# Live Operations data and code notices

ClimateGuard's Live Operations design is informed by the modular-layer, caching, provenance and fail-soft patterns documented by [God's Eye View](https://github.com/bilawalsidhu/gods-eye-view). The locally cloned, presentation-adapted application is exposed to users as **Live View** and runs as a separate local Vite service.

God's Eye View source code is MIT licensed, while its third-party datasets and services retain separate terms. The integrated source is pinned to commit `b5e546daf1810422b9035ee272bfe01f25a74e8b`; its original MIT copyright/license notice is preserved in `gods-eye-view/LICENSE`. Never assume its datasets are covered by MIT.

Runtime sources used here:

- NDMA Sachet / IMD Common Alerting Protocol material: retain the government source and original alert link.
- USGS earthquake feeds: identify USGS on every event and link to its event page.
- NASA FIRMS: retain NASA FIRMS attribution and describe points as satellite active-fire detections.
- Open-Meteo: retain the linked Open-Meteo attribution beside weather data.
- Esri World Imagery: keep Cesium/Esri-rendered credits visible on the globe.
- geoBoundaries / DataMeet state boundaries: retain the existing on-map attribution.

Provider access, terms, quotas and availability can change. Review each source before commercial or public deployment.
