# ClimateGuard AI

ClimateGuard AI is an India-focused climate-hazard education, live situational-awareness, and simulated disaster-response prototype. It combines static risk profiles with a Cesium globe, source-backed hazard feeds, preparedness guidance, and a clearly separated demonstration incident workflow.

## Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173` and choose **Live operations** for the near-real-time console.

Optional provider settings are documented in `.env.example`. Keep private keys server-side and never commit `.env.local`.

## Verify

```bash
npm test
npm run lint
npm run build
```

## Documentation

- [Live Operations setup and limitations](docs/LIVE_OPERATIONS.md)
- [Cesium setup](docs/CESIUM_SETUP.md)
- [AI chatbot setup](docs/CHATBOT_SETUP.md)
- [Data and code notices](docs/THIRD_PARTY_NOTICES.md)

This is a local demonstration. It is not connected to emergency services and must not be used as the sole source for safety decisions.
