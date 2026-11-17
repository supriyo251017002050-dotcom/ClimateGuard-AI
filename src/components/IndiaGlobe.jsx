import { useEffect, useRef, useState } from 'react';
import {
  Viewer, Ion, ImageryLayer, UrlTemplateImageryProvider, Cartesian3,
  Cartographic, Color, Math as CesiumMath, HeightReference,
  ScreenSpaceEventHandler, ScreenSpaceEventType, Cartesian2, CameraEventType, KeyboardEventModifier,
  createWorldTerrainAsync, createOsmBuildingsAsync, GeoJsonDataSource, CustomDataSource, Rectangle, Credit,
  createGooglePhotorealistic3DTileset, IonGeocodeProviderType, BoundingSphere, HeadingPitchRange,
} from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import './IndiaGlobe.css';
import { LOCATIONS_DATA } from '../data/locationsData';
import { REGIONS, boundaryStateId, geometryBounds } from '../data/locationSelection';

const places = Object.values(LOCATIONS_DATA);
// A destination is the camera position, not its look-at target. Looking straight
// down centers the requested coordinates at every altitude; -65 points away.
const centeredOrientation = { heading: 0, pitch: -Math.PI / 2, roll: 0 };
const hazardColor = event => {
  if (event.type === 'active_fire') return Color.ORANGERED;
  if (event.type === 'earthquake') return Color.fromCssColorString('#b794f4');
  if (event.type === 'weather') return Color.CYAN;
  return ({ extreme: Color.RED, severe: Color.ORANGERED, moderate: Color.ORANGE, minor: Color.YELLOW, info: Color.CYAN }[event.severity] || Color.LIGHTGRAY);
};

export default function IndiaGlobe({
  selection,
  onSelectState,
  selectedLocationId,
  onSelectLocationId,
  hazardEvents = [],
  incidents = [],
  selectedHazardId = null,
  onSelectHazard = () => {},
  mode = 'explorer',
  onCoordinatePick = () => {},
}) {
  const isOperations = mode === 'operations';
  const container = useRef(null);
  const viewerRef = useRef(null);
  const selectRef = useRef(onSelectLocationId);
  const [status, setStatus] = useState('Loading globe…');
  const [notice, setNotice] = useState('');
  const [pin, setPin] = useState(null);
  const [coordinates, setCoordinates] = useState('');
  const [ready, setReady] = useState(false);
  const [controlsHidden, setControlsHidden] = useState(false);
  const [mapStyle, setMapStyle] = useState(() => isOperations ? 'satellite' : 'street');
  const [imageryStatus, setImageryStatus] = useState(() => isOperations ? 'Loading satellite imagery…' : 'Street map');
  const [imageryError, setImageryError] = useState('');
  const [buildingsEnabled, setBuildingsEnabled] = useState(true);
  const [zoomSensitivity, setZoomSensitivity] = useState(8);
  const buildingsEnabledRef = useRef(true);
  const buildingsRef = useRef(null);
  const photorealActiveRef = useRef(false);
  const [photoStatus, setPhotoStatus] = useState('');
  const [coordinateError, setCoordinateError] = useState('');
  const stateSelectRef = useRef(onSelectState);
  const boundariesRef = useRef(null);
  const hazardSourceRef = useRef(null);
  const fireSourceRef = useRef(null);
  const incidentSourceRef = useRef(null);
  const hazardSelectRef = useRef(onSelectHazard);
  const [boundaryVersion, setBoundaryVersion] = useState(0);
  const [boundaryNotice, setBoundaryNotice] = useState('Loading state boundaries…');
  const [pinMode, setPinMode] = useState(false);
  const pinModeRef = useRef(false);
  const boundsRef = useRef(new Map());
  const lastHighlightRef = useRef({ source: null, stateId: null });
  const [performanceStats, setPerformanceStats] = useState(null);
  const [cameraTelemetry, setCameraTelemetry] = useState({ lat: 23, lng: 80, altitude: 6500000 });
  const coordinatePickRef = useRef(onCoordinatePick);
  const [showPerformance] = useState(() => new URLSearchParams(window.location.search).get('perf') === '1');
  useEffect(() => { stateSelectRef.current = onSelectState; }, [onSelectState]);
  useEffect(() => { hazardSelectRef.current = onSelectHazard; }, [onSelectHazard]);
  useEffect(() => { coordinatePickRef.current = onCoordinatePick; }, [onCoordinatePick]);
  useEffect(() => { pinModeRef.current = pinMode; }, [pinMode]);

  useEffect(() => { selectRef.current = onSelectLocationId; }, [onSelectLocationId]);

  const fly = (lng, lat, height = 18000) => {
    const viewer = viewerRef.current;
    if (!viewer || viewer.isDestroyed()) return;
    viewer.camera.cancelFlight();
    viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(lng, lat, height),
      orientation: centeredOrientation,
      duration: 1.6,
    });
  };

  useEffect(() => {
    let disposed = false;
    let viewer;
    let handler;
    let resize;
    let renderFailed = false;
    let removeRenderError;
    let removeWheelListener;
    let removeDetailListener;
    let removePerformanceListener;
    let removeCameraListener;
    const startedAt = performance.now();
    const timings = { firstFrame: null, boundaries: null, wheelToFrame: null };
    let wheelAt = null;
    const boundaryAbort = new AbortController();
    const fail = (message) => { if (!disposed) setNotice(message); };
    try {
      Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_TOKEN || '';
      const imagery = new UrlTemplateImageryProvider({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
        credit: 'Tiles © Esri',
        maximumLevel: 19,
      });
      imagery.errorEvent.addEventListener(() => fail('Street-map tiles unavailable. Check your connection.'));
      viewer = new Viewer(container.current, {
        baseLayer: new ImageryLayer(imagery), baseLayerPicker: false,
        geocoder: IonGeocodeProviderType.GOOGLE, animation: false, timeline: false, homeButton: false,
        sceneModePicker: false, navigationHelpButton: false, fullscreenButton: false,
        selectionIndicator: false, infoBox: false, requestRenderMode: true,
        maximumRenderTimeChange: Infinity,
      });
      viewerRef.current = viewer;
      hazardSourceRef.current = new CustomDataSource('climateguard-hazards');
      fireSourceRef.current = new CustomDataSource('climateguard-fires');
      incidentSourceRef.current = new CustomDataSource('climateguard-demo-incidents');
      fireSourceRef.current.clustering.enabled = true;
      fireSourceRef.current.clustering.pixelRange = 42;
      fireSourceRef.current.clustering.minimumClusterSize = 3;
      viewer.dataSources.add(hazardSourceRef.current);
      viewer.dataSources.add(fireSourceRef.current);
      viewer.dataSources.add(incidentSourceRef.current);
      if (showPerformance) {
        // Cesium's FPS counter measures rendered frames; on-demand idle is not lag.
        viewer.scene.debugShowFramesPerSecond = true;
        let publishedAt = 0;
        removePerformanceListener = viewer.scene.postRender.addEventListener(() => {
          const now = performance.now();
          timings.firstFrame ??= now - startedAt;
          if (wheelAt !== null) { timings.wheelToFrame = now - wheelAt; wheelAt = null; }
          if (now - publishedAt > 1000) {
            publishedAt = now;
            setPerformanceStats({ ...timings });
          }
        });
      }
      viewer.creditDisplay.addStaticCredit(new Credit('<a href="https://www.geoboundaries.org/">Boundaries: geoBoundaries / DataMeet (CC BY 2.5 IN)</a>', true));
      fetch('/india-states.geojson', { signal: boundaryAbort.signal })
        .then(response => { if (!response.ok) throw new Error('Boundary request failed'); return response.json(); })
        .then(async data => {
          if (disposed) return;
          const knownIds = new Set(REGIONS.map(state => state.id));
          const bounds = new Map();
          for (const feature of data.features) {
            const stateId = boundaryStateId(feature.properties.shapeName);
            if (!knownIds.has(stateId)) throw new Error('Unmapped state');
            feature.properties.stateId = stateId;
            bounds.set(stateId, geometryBounds(feature.geometry));
          }
          const source = await GeoJsonDataSource.load(data, {
            clampToGround: true, fill: Color.CORNFLOWERBLUE.withAlpha(.13),
            stroke: Color.CYAN, strokeWidth: 2,
          });
          if (disposed) return;
          await viewer.dataSources.add(source);
          if (disposed) return;
          boundariesRef.current = source;
          source.show = viewer.camera.positionCartographic.height > 40000;
          boundsRef.current = bounds;
          setBoundaryNotice(`${bounds.size} state/UT boundaries · reference map`);
          setBoundaryVersion(version => version + 1);
          timings.boundaries = performance.now() - startedAt;
          viewer.scene.requestRender();
        }).catch(error => {
          if (!disposed && error.name !== 'AbortError') setBoundaryNotice('State boundaries unavailable. Reload to retry; the state list still works.');
        });
      removeRenderError = viewer.scene.renderError.addEventListener(() => {
        if (disposed) return;
        renderFailed = true;
        setReady(false);
        setStatus('Rendering stopped');
        setNotice('The globe could not render. Restart the local app and reload. If this persists, check the browser console and Cesium asset requests.');
      });
      // shortcut: 0.9 scale drops ~20% pixel fill with zero visual loss, upgrade to 1.0 on 4K desktop
      viewer.resolutionScale = 0.9;
      viewer.scene.globe.maximumScreenSpaceError = 4;
      viewer.scene.globe.tileCacheSize = 100;
      viewer.scene.globe.loadingDescendantLimit = 20;
      viewer.scene.postProcessStages.fxaa.enabled = true;
      const controller = viewer.scene.screenSpaceCameraController;
      controller.zoomEventTypes = [
        CameraEventType.WHEEL,
        { eventType: CameraEventType.WHEEL, modifier: KeyboardEventModifier.CTRL },
        CameraEventType.PINCH,
        CameraEventType.RIGHT_DRAG,
      ];
      controller.zoomFactor = 8;
      controller.inertiaZoom = 0.85;
      const updateDetailVisibility = () => {
        const height = viewer.camera.positionCartographic.height;
        if (boundariesRef.current) boundariesRef.current.show = height > 40000;
        if (buildingsRef.current) buildingsRef.current.show = !photorealActiveRef.current && buildingsEnabledRef.current && height < 200000;
      };
      removeDetailListener = viewer.scene.preUpdate.addEventListener(updateDetailVisibility);
      const canvas = viewer.scene.canvas;
      const handleTrackpad = event => {
        if (disposed || renderFailed || event.deltaY === 0 || event.altKey || event.metaKey || event.shiftKey) return;
        // Leave delivery to Cesium's native wheel handler: no duplicate zoom.
        event.preventDefault();
        if (showPerformance && wheelAt === null) wheelAt = performance.now();
        viewer.camera.cancelFlight();
        viewer.scene.requestRender();
      };
      canvas.addEventListener('wheel', handleTrackpad, { passive: false, capture: true });
      removeWheelListener = () => canvas.removeEventListener('wheel', handleTrackpad, true);
      viewer.scene.screenSpaceCameraController.minimumZoomDistance = 30;
      viewer.scene.screenSpaceCameraController.maximumZoomDistance = 30000000;
      viewer.scene.globe.maximumScreenSpaceError = 3;
      viewer.camera.setView({
        destination: Cartesian3.fromDegrees(80, 23, 6500000),
        orientation: centeredOrientation,
      });
      const publishCameraTelemetry = () => {
        if (disposed || viewer.isDestroyed()) return;
        const position = viewer.camera.positionCartographic;
        setCameraTelemetry({
          lat: CesiumMath.toDegrees(position.latitude),
          lng: CesiumMath.toDegrees(position.longitude),
          altitude: Math.max(0, position.height),
        });
      };
      removeCameraListener = viewer.camera.moveEnd.addEventListener(publishCameraTelemetry);
      publishCameraTelemetry();
      for (const place of places) {
        viewer.entities.add({
          id: `place-${place.id}`, name: place.name,
          position: Cartesian3.fromDegrees(place.coordinates.lng, place.coordinates.lat),
          point: { pixelSize: 10, color: Color.CYAN, outlineColor: Color.BLACK,
            outlineWidth: 2, heightReference: HeightReference.CLAMP_TO_GROUND,
            disableDepthTestDistance: Infinity },
          label: { text: place.name, font: '14px sans-serif', showBackground: true,
            pixelOffset: new Cartesian2(0, -24),
            heightReference: HeightReference.CLAMP_TO_GROUND,
            disableDepthTestDistance: Infinity },
        });
      }
      handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
      handler.setInputAction((event) => {
        const hits = viewer.scene.drillPick(event.position);
        const hazardHit = hits.find(hit => hit.id?.hazardId);
        if (hazardHit) {
          hazardSelectRef.current(hazardHit.id.hazardId);
          return;
        }
        const picked = hits.find(hit => typeof hit.id?.id === 'string' && hit.id.id.startsWith('place-')) || hits[0];
        const id = picked?.id?.id;
        if (!pinModeRef.current && typeof id === 'string' && id.startsWith('place-')) {
          const place = LOCATIONS_DATA[id.slice(6)];
          selectRef.current(place.id);
          return;
        }
        const stateHit = hits.find(hit => hit.id?.properties?.stateId);
        if (!pinModeRef.current && stateHit) {
          const stateId = stateHit.id.properties.stateId.getValue(viewer.clock.currentTime);
          const state = REGIONS.find(item => item.id === stateId);
          if (state) stateSelectRef.current(state);
          return;
        }
        const ray = viewer.camera.getPickRay(event.position);
        const point = (photorealActiveRef.current && viewer.scene.pickPositionSupported && viewer.scene.pickPosition(event.position)) || (ray && viewer.scene.globe.pick(ray, viewer.scene));
        if (!point) return;
        const cartographic = Cartographic.fromCartesian(point);
        const nextPin = { lat: CesiumMath.toDegrees(cartographic.latitude), lng: CesiumMath.toDegrees(cartographic.longitude) };
        viewer.entities.removeById('selected-pin');
        viewer.entities.add({ id: 'selected-pin', position: point,
          point: { pixelSize: 13, color: Color.ORANGE, outlineColor: Color.WHITE,
            outlineWidth: 2, disableDepthTestDistance: Infinity } });
        setPin(nextPin);
        coordinatePickRef.current(nextPin);
        viewer.scene.requestRender();
      }, ScreenSpaceEventType.LEFT_CLICK);
      resize = new ResizeObserver(() => {
        if (!disposed) { viewer.resize(); viewer.scene.requestRender(); }
      });
      resize.observe(container.current);
      setReady(true);
      if (!Ion.defaultAccessToken) {
        setStatus('Street-map provider configured');
        fail('Add VITE_CESIUM_ION_TOKEN to .env.local and restart to enable terrain and buildings.');
      } else {
        setStatus('Loading terrain and buildings…');
        Promise.allSettled([
          createWorldTerrainAsync().then(terrain => {
            if (disposed) return;
            viewer.terrainProvider = terrain;
            terrain.errorEvent.addEventListener(() => fail('Some terrain tiles could not load.'));
            viewer.scene.requestRender();
          }),
        createOsmBuildingsAsync().then(buildings => {
            if (disposed) { buildings.destroy(); return; }
            buildingsRef.current = viewer.scene.primitives.add(buildings);
            buildings.maximumScreenSpaceError = 32;
            buildings.cacheBytes = 128 * 1024 * 1024;
            buildings.maximumCacheOverflowBytes = 64 * 1024 * 1024;
            buildings.show = buildingsEnabledRef.current && viewer.camera.positionCartographic.height < 200000;
            viewer.scene.requestRender();
          }),
        ]).then(results => {
          if (disposed || renderFailed) return;
          const missing = results.flatMap((result, index) => result.status === 'rejected' ? [index === 0 ? 'terrain' : 'buildings'] : []);
          setStatus(missing.length ? 'Some 3D providers unavailable' : '3D providers connected · tiles load as you explore');
          if (missing.length) fail(`Could not load ${missing.join(' and ')}. Check token access and the allowed URL http://localhost:5173/.`);
        });
      }
    } catch {
      setStatus('Globe unavailable');
      fail('The 3D viewer could not start. Enable browser hardware acceleration and reload.');
    }
    return () => {
      disposed = true;
      boundaryAbort.abort();
      resize?.disconnect();
      removeRenderError?.();
      removeWheelListener?.();
      removeDetailListener?.();
      removePerformanceListener?.();
      removeCameraListener?.();
      handler?.destroy();
      if (viewer && !viewer.isDestroyed()) viewer.destroy();
      viewerRef.current = null;
      buildingsRef.current = null;
      boundariesRef.current = null;
      hazardSourceRef.current = null;
      fireSourceRef.current = null;
      incidentSourceRef.current = null;
      boundsRef.current = new Map();
      lastHighlightRef.current = { source: null, stateId: null };
    };
  }, [showPerformance]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!ready || !viewer || viewer.isDestroyed()) return;
    const source = boundariesRef.current;
    const lastHighlight = lastHighlightRef.current;
    if (source && (lastHighlight.source !== source || lastHighlight.stateId !== selection.stateId)) {
      for (const entity of source.entities.values) {
        if (!entity.polygon) continue;
        const stateId = entity.properties.stateId.getValue(viewer.clock.currentTime);
        if (lastHighlight.source === source && stateId !== lastHighlight.stateId && stateId !== selection.stateId) continue;
        entity.polygon.material = stateId === selection.stateId
          ? Color.GOLD.withAlpha(.38) : Color.CORNFLOWERBLUE.withAlpha(.13);
      }
      lastHighlightRef.current = { source, stateId: selection.stateId };
    }
    const place = LOCATIONS_DATA[selection.locationId];
    if (place) fly(place.coordinates.lng, place.coordinates.lat);
    else {
      const bounds = boundsRef.current.get(selection.stateId);
      if (bounds) {
        viewer.camera.cancelFlight();
        viewer.camera.flyTo({ destination: Rectangle.fromDegrees(...bounds), orientation: centeredOrientation, duration: 1.6 });
      }
    }
    viewer.scene.requestRender();
  }, [selection, ready, boundaryVersion]);

  useEffect(() => {
    const viewer = viewerRef.current;
    const hazardSource = hazardSourceRef.current;
    const fireSource = fireSourceRef.current;
    if (!ready || !viewer || viewer.isDestroyed() || !hazardSource || !fireSource) return;
    for (const source of [hazardSource, fireSource]) {
      source.entities.suspendEvents();
      source.entities.removeAll();
    }
    for (const event of hazardEvents) {
      const { lat, lng } = event.coordinates || {};
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;
      const selected = event.id === selectedHazardId;
      const source = event.type === 'active_fire' ? fireSource : hazardSource;
      const entity = source.entities.add({
        id: `hazard-${event.id}`,
        name: event.title,
        position: Cartesian3.fromDegrees(lng, lat),
        point: {
          pixelSize: selected ? 17 : event.type === 'earthquake' ? Math.max(9, (event.magnitude || 2) * 2) : 11,
          color: hazardColor(event), outlineColor: selected ? Color.WHITE : Color.BLACK,
          outlineWidth: selected ? 4 : 2, heightReference: HeightReference.CLAMP_TO_GROUND,
          disableDepthTestDistance: Infinity,
        },
        label: selected ? {
          text: event.title, font: '600 13px sans-serif', showBackground: true,
          backgroundColor: Color.fromCssColorString('#081b2b').withAlpha(.88),
          pixelOffset: new Cartesian2(0, -28), disableDepthTestDistance: Infinity,
        } : undefined,
      });
      entity.hazardId = event.id;
    }
    hazardSource.entities.resumeEvents();
    fireSource.entities.resumeEvents();
    viewer.scene.requestRender();
  }, [hazardEvents, selectedHazardId, ready]);

  useEffect(() => {
    const viewer = viewerRef.current;
    const source = incidentSourceRef.current;
    if (!ready || !viewer || viewer.isDestroyed() || !source) return;
    source.entities.suspendEvents();
    source.entities.removeAll();
    for (const incident of incidents) {
      const { lat, lng } = incident.coordinates || {};
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;
      const entity = source.entities.add({
        id: `incident-${incident.id}`, name: incident.id,
        position: Cartesian3.fromDegrees(lng, lat),
        point: { pixelSize: 13, color: Color.YELLOW, outlineColor: Color.fromCssColorString('#4b2e00'), outlineWidth: 3, heightReference: HeightReference.CLAMP_TO_GROUND, disableDepthTestDistance: Infinity },
      });
      entity.hazardId = `incident:${incident.id}`;
    }
    source.entities.resumeEvents();
    viewer.scene.requestRender();
  }, [incidents, ready]);

  useEffect(() => {
    const event = hazardEvents.find(item => item.id === selectedHazardId);
    if (event?.coordinates) fly(event.coordinates.lng, event.coordinates.lat, event.type === 'weather' ? 120000 : 350000);
  }, [selectedHazardId, hazardEvents]);

  useEffect(() => {
    buildingsEnabledRef.current = buildingsEnabled;
    if (buildingsRef.current) {
      buildingsRef.current.show = !photorealActiveRef.current && buildingsEnabled && viewerRef.current.camera.positionCartographic.height < 200000;
      viewerRef.current?.scene.requestRender();
    }
  }, [buildingsEnabled, status]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (viewer && !viewer.isDestroyed()) viewer.scene.screenSpaceCameraController.zoomFactor = zoomSensitivity;
  }, [zoomSensitivity, ready]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!ready || !viewer || viewer.isDestroyed()) return;
    const streetLayer = viewer.imageryLayers.get(0);
    let cancelled = false;
    let satelliteLayer;
    let removeErrorListener;
    streetLayer.show = true;
    if (mapStyle !== 'satellite') {
      setImageryStatus('Street map');
      viewer.scene.requestRender();
      return;
    }
    setImageryError('');
    setImageryStatus('Loading satellite imagery…');
    const fallback = () => {
      if (cancelled || viewer.isDestroyed()) return;
      streetLayer.show = true;
      setImageryError('Satellite imagery unavailable. Check your connection. Select Satellite to retry.');
      setMapStyle('street');
      viewer.scene.requestRender();
    };
    Promise.resolve(new UrlTemplateImageryProvider({
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      credit: 'Tiles © Esri',
      maximumLevel: 19,
    })).then(provider => {
      if (cancelled || viewer.isDestroyed()) return;
      removeErrorListener = provider.errorEvent.addEventListener(fallback);
      satelliteLayer = viewer.imageryLayers.addImageryProvider(provider);
      // Retain the imagery provider attribution.
      streetLayer.show = false;
      setImageryStatus('Esri satellite · imagery is not live');
      viewer.scene.requestRender();
    }).catch(fallback);
    return () => {
      cancelled = true;
      removeErrorListener?.();
      if (!viewer.isDestroyed()) {
        if (satelliteLayer) viewer.imageryLayers.remove(satelliteLayer, true);
        streetLayer.show = true;
        viewer.scene.requestRender();
      }
    };
  }, [mapStyle, ready]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!ready || !viewer || viewer.isDestroyed() || mapStyle !== 'photorealistic') return;
    let cancelled = false;
    let tileset;
    let removeFailure;
    setPhotoStatus('Loading photorealistic 3D…');
    createGooglePhotorealistic3DTileset({ onlyUsingWithGoogleGeocoder: true }, {
      cacheBytes: 256 * 1024 * 1024,
      maximumCacheOverflowBytes: 128 * 1024 * 1024,
      maximumScreenSpaceError: 16,
      enableCollision: true,
      showCreditsOnScreen: true,
    }).then(result => {
      if (cancelled || viewer.isDestroyed()) { result.destroy(); return; }
      tileset = viewer.scene.primitives.add(result);
      photorealActiveRef.current = true;
      viewer.scene.globe.show = false;
      if (buildingsRef.current) buildingsRef.current.show = false;
      setPhotoStatus('3D enabled. Go to a major city (e.g. Mumbai), zoom in close to the ground, and click "Tilt 3D" to see 3D buildings.');
      removeFailure = tileset.tileFailed.addEventListener(() => {
        if (!cancelled) setPhotoStatus('Some 3D tiles could not load. Try another place or switch to Satellite.');
      });
      viewer.scene.requestRender();
    }).catch(() => {
      if (cancelled || viewer.isDestroyed()) return;
      setPhotoStatus('3D unavailable. Check ion asset 2275207 access and this site’s allowed URL. Satellite fallback is active.');
      setMapStyle('satellite');
    });
    return () => {
      cancelled = true;
      removeFailure?.();
      photorealActiveRef.current = false;
      if (!viewer.isDestroyed()) {
        if (tileset) viewer.scene.primitives.remove(tileset);
        viewer.scene.globe.show = true;
        if (buildingsRef.current) buildingsRef.current.show = buildingsEnabledRef.current && viewer.camera.positionCartographic.height < 200000;
        viewer.scene.requestRender();
      }
    };
  }, [mapStyle, ready]);

  const tiltView = () => {
    const viewer = viewerRef.current;
    if (!viewer || viewer.isDestroyed()) return;
    const center = new Cartesian2(viewer.canvas.clientWidth / 2, viewer.canvas.clientHeight / 2);
    const ray = viewer.camera.getPickRay(center);
    const target = (viewer.scene.pickPositionSupported && viewer.scene.pickPosition(center)) || viewer.scene.globe.pick(ray, viewer.scene);
    if (!target) { setPhotoStatus('Search a city and zoom closer before tilting.'); return; }
    const range = Math.max(300, Cartesian3.distance(viewer.camera.positionWC, target));
    viewer.camera.flyToBoundingSphere(new BoundingSphere(target, 1), {
      offset: new HeadingPitchRange(viewer.camera.heading, -Math.PI / 4, range), duration: 1.2,
    });
  };

  const goToCoordinates = (event) => {
    event.preventDefault();
    const parts = coordinates.split(',').map(value => value.trim());
    const [lat, lng] = parts.map(Number);
    if (parts.length !== 2 || parts.some(value => !value) || !Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
      setCoordinateError('Enter latitude, longitude—for example 22.5726, 88.3639');
      return;
    }
    setCoordinateError('');
    fly(lng, lat, 1500);
  };

  const quickTargets = places.filter(place => ['Kolkata', 'Mumbai', 'Delhi NCR', 'Chennai'].includes(place.name));
  const altitudeLabel = cameraTelemetry.altitude >= 1000
    ? `${(cameraTelemetry.altitude / 1000).toFixed(cameraTelemetry.altitude >= 100000 ? 0 : 1)} km`
    : `${cameraTelemetry.altitude.toFixed(0)} m`;

  return <section className={`india-globe${isOperations ? ' india-globe--operations' : ''}`} aria-label={isOperations ? 'Live View disaster operations map' : 'Interactive India globe'}>
    <div ref={container} className="india-globe-canvas" />
    <div className={`india-globe-controls${controlsHidden ? ' is-collapsed' : ''}`}>
      <div className="india-globe-controls-header">
        <div className="india-globe-control-title">
          {isOperations && <span><i /> LIVE VIEW</span>}
          <strong>{isOperations ? 'Hazard monitoring' : 'India explorer'}</strong>
        </div>
        <button type="button" className="india-globe-toggle" aria-expanded={!controlsHidden} aria-controls="india-explorer-content" onClick={() => setControlsHidden(hidden => !hidden)}>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 14 6-6 6 6" /></svg>
          {controlsHidden ? 'Show' : 'Hide'}
        </button>
      </div>
      <div id="india-explorer-content" className="india-globe-controls-reveal" inert={controlsHidden} aria-hidden={controlsHidden}>
      <div className="india-globe-controls-scroll">
      <div className="india-globe-buttons" role="group" aria-label="Map style">
        <button type="button" disabled={!ready} aria-pressed={mapStyle === 'street'} onClick={() => setMapStyle('street')}>{isOperations ? 'Situation' : 'Street'}</button>
        <button type="button" disabled={!ready} aria-pressed={mapStyle === 'satellite'} onClick={() => setMapStyle('satellite')}>Satellite</button>
        <button type="button" disabled={!ready} aria-pressed={mapStyle === 'photorealistic'} onClick={() => { setImageryError(''); setMapStyle('photorealistic'); }}>{isOperations ? '3D city' : 'Photorealistic 3D'}</button>
      </div>
      <small>{isOperations ? 'Near-real-time hazard markers are overlaid on reference imagery. Satellite and 3D tiles are not live video.' : 'Search places with the magnifying glass at the top right. Global exploration does not change the India dashboard selection.'}</small>
      {isOperations && <div className="ops-map-telemetry" aria-label="Camera telemetry">
        <span><b>LAT</b>{cameraTelemetry.lat.toFixed(3)}</span>
        <span><b>LNG</b>{cameraTelemetry.lng.toFixed(3)}</span>
        <span><b>ALT</b>{altitudeLabel}</span>
      </div>}
      {photoStatus && <p role="status">{photoStatus}</p>}
      {imageryError && <p role="alert">{imageryError}</p>}
      <p>Dashboard: India / {REGIONS.find(state => state.id === selection.stateId)?.name}{selectedLocationId ? ` / ${LOCATIONS_DATA[selectedLocationId].name}` : ''}</p>
      <div className="india-globe-buttons">
        <button disabled={!ready} onClick={() => fly(80, 23, 22000000)}>Earth</button>
        <button disabled={!ready} onClick={() => fly(80, 23, 6500000)}>India</button>
        <button disabled={!ready} onClick={tiltView}>Tilt 3D</button>
        <label><input type="checkbox" disabled={mapStyle === 'photorealistic'} checked={buildingsEnabled} onChange={e => setBuildingsEnabled(e.target.checked)} /> OSM buildings (Street / Satellite)</label>
      </div>
      {isOperations && <div className="ops-quick-targets" aria-label="Quick targets">
        <span>Quick locations</span>
        <div>{quickTargets.map(place => <button type="button" key={place.id} disabled={!ready} onClick={() => fly(place.coordinates.lng, place.coordinates.lat, 18000)}>{place.name.replace(' NCR', '')}</button>)}</div>
      </div>}
      <label>Zoom sensitivity: {zoomSensitivity}
        <input aria-label="Zoom sensitivity" type="range" min="3" max="15" step="1" value={zoomSensitivity} onChange={event => setZoomSensitivity(Number(event.target.value))} />
      </label>
      <label>State / union territory
        <select value={selection.stateId} onChange={e => onSelectState(REGIONS.find(state => state.id === e.target.value))}>
          {REGIONS.map(state => <option key={state.id} value={state.id}>{state.name}</option>)}
        </select>
      </label>
      <label>Focus location
        <select disabled={!ready} value={selectedLocationId || ''} onChange={e => {
          const place = LOCATIONS_DATA[e.target.value];
          onSelectLocationId(place.id);
        }}>
          <option value="" disabled>Select a prototype location</option>
          {places.map(place => <option key={place.id} value={place.id}>{place.name}</option>)}
        </select>
      </label>
      <label><input type="checkbox" checked={pinMode} onChange={e => setPinMode(e.target.checked)} /> {isOperations ? 'Select a report location on the map' : 'Place a coordinate pin (instead of selecting states)'}</label>
      <form onSubmit={goToCoordinates}>
        <label htmlFor="globe-coordinates">Go to coordinates</label>
        <div className="india-globe-buttons"><input id="globe-coordinates" value={coordinates} onChange={e => setCoordinates(e.target.value)} placeholder="Latitude, longitude" /><button disabled={!ready}>Go</button></div>
      </form>
      {coordinateError && <p role="alert">{coordinateError}</p>}
      <small>Scroll to zoom · Drag to pan · Ctrl + drag to tilt · {isOperations ? 'Select a signal marker for details' : 'Click ground to pin'}</small>
      </div>
      </div>
    </div>
    <div className="india-globe-status" aria-live="polite">
      <span>{status}</span>
      {showPerformance && <div aria-label="Map performance measurements">
        <strong>Performance diagnostics</strong>
        <div>First rendered frame: {performanceStats?.firstFrame?.toFixed(0) ?? '…'} ms · Boundary setup: {performanceStats?.boundaries?.toFixed(0) ?? '…'} ms</div>
        <div>Last wheel event → rendered frame: {performanceStats?.wheelToFrame?.toFixed(0) ?? '…'} ms</div>
        <small>Times start at viewer initialization, not page navigation. FPS appears on the map; judge it while moving, not idle. First frame does not mean all tiles are loaded.</small>
      </div>}
      <p>{boundaryNotice}</p>
      <small>State outlines appear above city level; buildings appear when closer. Use the state selector at any zoom.</small>
      {notice && <p>{notice}</p>}
      {pin && <div>Pin: {pin.lat.toFixed(5)}, {pin.lng.toFixed(5)} <button onClick={() => fly(pin.lng, pin.lat, 1000)}>Zoom to pin</button></div>}
      <p aria-live="polite">{imageryStatus}</p>
      {imageryError && <p role="alert">{imageryError}</p>}
      <small>Building coverage varies. Pins are not disaster reports.</small>
    </div>
  </section>;
}
