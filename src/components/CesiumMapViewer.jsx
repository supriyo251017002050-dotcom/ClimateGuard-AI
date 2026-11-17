import React, { useEffect, useRef, useState } from 'react';
import { Viewer, Cartesian3, Ion, Color, HeightReference, ImageryLayer, ArcGisMapServerImageryProvider } from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';

export default function CesiumMapViewer({ lat, lng, name, height = 300000 }) {
  const container = useRef(null);
  const viewerRef = useRef(null);
  const [viewerReady, setViewerReady] = useState(false);

  useEffect(() => {
    if (!container.current) return;
    
    Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_TOKEN || '';

    let viewer;
    let isMounted = true;

    async function initCesium() {
      try {
        const imagery = await ArcGisMapServerImageryProvider.fromUrl(
          'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
          {
            enablePickFeatures: false
          }
        );

        if (!isMounted) return;

        viewer = new Viewer(container.current, {
          baseLayer: false,
          animation: false,
          timeline: false,
          baseLayerPicker: false,
          fullscreenButton: false,
          geocoder: false,
          homeButton: false,
          infoBox: false,
          sceneModePicker: false,
          selectionIndicator: false,
          navigationHelpButton: false
        });
        
        viewer.imageryLayers.add(new ImageryLayer(imagery));
        
        viewerRef.current = viewer;
        setViewerReady(true);
        viewer.scene.requestRender();
        
        if (viewer.cesiumWidget && viewer.cesiumWidget.creditContainer) {
           viewer.cesiumWidget.creditContainer.style.display = 'none';
        }
      } catch (err) {
        console.error('Failed to initialize Cesium Viewer:', err);
      }
    }

    initCesium();

    return () => {
      isMounted = false;
      if (viewer && !viewer.isDestroyed()) {
        viewer.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewerReady || !viewer || viewer.isDestroyed() || !lat || !lng) return;

    // Remove existing pins
    viewer.entities.removeAll();

    // Add pin
    viewer.entities.add({
      position: Cartesian3.fromDegrees(lng, lat),
      point: {
        pixelSize: 15,
        color: Color.RED,
        outlineColor: Color.WHITE,
        outlineWidth: 2,
        heightReference: HeightReference.NONE,
      }
    });

    // Fly to location
    viewer.camera.cancelFlight();
    viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(lng, lat, height),
      duration: 1.0,
    });
    
    viewer.scene.requestRender();
  }, [lat, lng, height, viewerReady]);

  return (
    <div ref={container} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />
  );
}
