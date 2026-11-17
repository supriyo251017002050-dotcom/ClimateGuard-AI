import * as Cesium from 'cesium';

/** Create the standard globe viewer in caller-owned, visible containers. */
export function createApplicationViewer({ container, creditContainer }) {
  if (!container || !creditContainer)
    throw new TypeError('Viewer and credit containers are required');
  const viewer = new Cesium.Viewer(container, {
    timeline: false,
    animation: false,
    baseLayerPicker: false,
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    navigationHelpButton: false,
    fullscreenButton: false,
    vrButton: false,
    selectionIndicator: false,
    infoBox: false,
    baseLayer: false,
    creditContainer,
    msaaSamples: 1, // shortcut: 1x MSAA prevents GPU fill rate bottleneck on laptops, upgrade to 2 on dedicated GPUs
    contextOptions: { webgl: { preserveDrawingBuffer: true, powerPreference: 'high-performance' } },
  });
  try {
    viewer.targetFrameRate = 60;
    viewer.resolutionScale = Math.min(window.devicePixelRatio || 1, 1.0);
    viewer.scene.globe.maximumScreenSpaceError = 3.5;
    viewer.scene.globe.tileCacheSize = 120;
    viewer.scene.globe.show = true;
    viewer.scene.globe.baseColor = Cesium.Color.fromCssColorString('#0b1d3a');
    viewer.scene.skyAtmosphere.show = true;
    viewer.scene.skyAtmosphere.atmosphereLightIntensity = 18;
    viewer.scene.skyAtmosphere.saturationShift = -0.12;
    viewer.scene.skyAtmosphere.brightnessShift = -0.08;
    return viewer;
  } catch (error) {
    viewer.destroy();
    throw error;
  }
}
