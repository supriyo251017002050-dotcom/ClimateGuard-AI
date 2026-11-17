# Cesium globe

The app uses CesiumJS 1.145 for the interactive globe. The current prototype has
three map modes in the **India explorer** panel:

- **Street**: Esri street basemap with optional Cesium OSM buildings.
- **Satellite**: Esri World Imagery. This is imagery, not a live camera feed.
- **Photorealistic 3D**: Google Photorealistic 3D Tiles through Cesium ion asset
  `2275207`, using the restricted public `VITE_CESIUM_ION_TOKEN`.

## Run locally

Put the restricted public read token in `.env.local` as:

```bash
VITE_CESIUM_ION_TOKEN=your-token
```

Restart `npm run dev` after changing it. Open `http://localhost:5173/` to match
the token's allowed URL. Do not use `127.0.0.1` or a LAN address unless it is
also authorized in Cesium ion.

## How to use it

1. Open `http://localhost:5173/`.
2. Choose **3D Globe** for the full map, or **Live operations** for the disaster
   operations console.
3. In **India explorer**, choose **Photorealistic 3D**.
4. Use the Cesium search button in the top-right map toolbar, or enter
   coordinates such as `19.0760, 72.8777` for Mumbai.
5. Zoom close to the ground and select **Tilt 3D** to see buildings and terrain
   from an angled view.

Global exploration is separate from the India risk-dashboard selection. Searching
Paris, Tokyo, or New York moves the globe, but it does not change the selected
Indian state profile.

## Data and limitations

- Satellite and photorealistic layers are map/imagery datasets. They are not
  live CCTV, drone, aircraft, military, or emergency-service feeds.
- Google Photorealistic 3D must be used with Google's geocoder under Cesium's
  terms. If place search reports "not found", use coordinates while checking the
  Cesium ion token's Google geocoder access.
- State/UT polygon selection is implemented for all 36 regions.
- District selection and a complete city directory are not implemented.
- The five prototype profiles remain static disaster-risk information.
- Pins are temporary map coordinates, not saved incident reports.
- Building and photorealistic tile coverage varies by location.

## Deployment

`npm run build` copies Cesium's Workers, Assets, ThirdParty, and Widgets into
`dist/cesium`. The current configuration expects hosting at the domain root.
For subpath hosting, adjust both Vite's base and `CESIUM_BASE_URL` together.

Add the production origin to the token's allowed URLs. `VITE_` variables are
public in browser bundles, so use only restricted public Cesium scopes there.
Keep administrative keys and provider secrets out of frontend environment
variables.

## Verification

Run:

```bash
npm test
npm run lint
npm run build
```

Browser interaction verification still needs a connected browser. Existing lint
warnings remain, including external Cesium object updates flagged by React rules.
