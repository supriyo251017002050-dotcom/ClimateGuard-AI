import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { COUNTRIES_DATA } from '../data/countryGeoData';

// High-resolution Earth texture URLs for realism
const EARTH_TEXTURE_URL = 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg';
const BUMP_MAP_URL = 'https://unpkg.com/three-globe/example/img/earth-topology.png';
const SPECULAR_MAP_URL = 'https://unpkg.com/three-globe/example/img/earth-water.png';


export default function EarthGlobe3D({ onSelectCountry, selectedCountry = 'india', isDarkMode = true }) {
  const containerRef = useRef(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const globeRef = useRef(null);
  const cloudsRef = useRef(null);
  const markersGroupRef = useRef(null);
  const animationFrameId = useRef(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  // Convert lat/long to 3D Cartesian coordinates on sphere
  const latLongToVector3 = (lat, lon, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0, 26);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting — controlled, consistent direction
    const ambientLight = new THREE.AmbientLight(0xd8e3f9, 0.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x4a9eda, 1.8);
    mainLight.position.set(18, 12, 18);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x2a9d6e, 0.3);
    fillLight.position.set(-15, -8, -15);
    scene.add(fillLight);

    // Earth Sphere
    const globeRadius = 10;
    const earthGeometry = new THREE.SphereGeometry(globeRadius, 64, 64);
    
    // Load high-resolution realistic textures
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(EARTH_TEXTURE_URL);
    const bumpTexture = textureLoader.load(BUMP_MAP_URL);
    const specularMap = textureLoader.load(SPECULAR_MAP_URL);
    
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.15,
      specularMap: specularMap,
      specular: new THREE.Color(0x333333),
      shininess: 15,
    });
    
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earthMesh);
    globeRef.current = earthMesh;

    // Cloud layer — semi-transparent rotating shell
    const cloudGeometry = new THREE.SphereGeometry(globeRadius * 1.015, 48, 48);
    const cloudCanvas = document.createElement('canvas');
    cloudCanvas.width = 1024;
    cloudCanvas.height = 512;
    const cloudCtx = cloudCanvas.getContext('2d');
    cloudCtx.fillStyle = 'rgba(0,0,0,0)';
    cloudCtx.fillRect(0, 0, 1024, 512);
    // Procedural cloud wisps
    cloudCtx.fillStyle = 'rgba(200, 220, 255, 0.08)';
    for (let i = 0; i < 120; i++) {
      const cx = Math.random() * 1024;
      const cy = 128 + Math.random() * 256;
      const rx = 20 + Math.random() * 80;
      const ry = 4 + Math.random() * 12;
      cloudCtx.beginPath();
      cloudCtx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      cloudCtx.fill();
    }
    const cloudTexture = new THREE.CanvasTexture(cloudCanvas);
    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });
    const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(cloudMesh);
    cloudsRef.current = cloudMesh;

    // Atmosphere outer glow — dual color
    const atmosphereGeo = new THREE.SphereGeometry(globeRadius * 1.06, 48, 48);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.58 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 blue = vec3(0.18, 0.46, 0.71);
          vec3 teal = vec3(0.16, 0.62, 0.43);
          vec3 color = mix(blue, teal, intensity * 0.6);
          gl_FragColor = vec4(color, 1.0) * intensity * 1.2;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    scene.add(atmosphereMesh);

    // Country markers
    const markersGroup = new THREE.Group();
    scene.add(markersGroup);
    markersGroupRef.current = markersGroup;

    COUNTRIES_DATA.forEach((country) => {
      const pos = latLongToVector3(country.lat, country.lng, globeRadius);

      // Marker sphere
      const markerSize = country.isPrototypeTarget ? 0.32 : 0.18;
      const markerGeo = new THREE.SphereGeometry(markerSize, 16, 16);
      const markerColor = country.isPrototypeTarget ? 0x2e75b6 : 0x4a9eda;
      const markerMat = new THREE.MeshBasicMaterial({
        color: markerColor,
        transparent: true,
        opacity: 0.9,
      });
      const markerMesh = new THREE.Mesh(markerGeo, markerMat);
      markerMesh.position.copy(pos);
      markerMesh.userData = country;
      markersGroup.add(markerMesh);

      // Pulsing ring for India (prototype target)
      if (country.isPrototypeTarget) {
        const ringGeo = new THREE.RingGeometry(0.5, 0.7, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x2e75b6,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.5,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.position.copy(pos.clone().multiplyScalar(1.02));
        ringMesh.lookAt(new THREE.Vector3(0, 0, 0));
        markersGroup.add(ringMesh);

        // Pin stem
        const lineMat = new THREE.LineBasicMaterial({ color: 0x2e75b6, linewidth: 2 });
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          pos,
          pos.clone().multiplyScalar(1.12),
        ]);
        const line = new THREE.Line(lineGeo, lineMat);
        markersGroup.add(line);
      }
    });

    // Initial orientation: face India
    const targetLon = 78.96;
    const targetLat = 20.59;
    earthMesh.rotation.y = -(targetLon * Math.PI) / 180 + Math.PI / 2;
    earthMesh.rotation.x = (targetLat * Math.PI) / 180 * 0.4;
    markersGroup.rotation.y = earthMesh.rotation.y;
    markersGroup.rotation.x = earthMesh.rotation.x;
    cloudMesh.rotation.y = earthMesh.rotation.y;
    cloudMesh.rotation.x = earthMesh.rotation.x;

    // Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (isAutoRotating && !isDraggingRef.current) {
        earthMesh.rotation.y += 0.0012;
        markersGroup.rotation.y += 0.0012;
        // Clouds rotate slightly faster for parallax
        cloudMesh.rotation.y += 0.0016;
      } else {
        cloudMesh.rotation.y = earthMesh.rotation.y + 0.02;
      }
      cloudMesh.rotation.x = earthMesh.rotation.x;

      renderer.render(scene, camera);
    };
    animate();

    // Mouse / Touch Controls
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredRef = null;

    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDraggingRef.current) {
        const deltaX = e.clientX - previousMousePositionRef.current.x;
        const deltaY = e.clientY - previousMousePositionRef.current.y;
        earthMesh.rotation.y += deltaX * 0.005;
        earthMesh.rotation.x += deltaY * 0.005;
        earthMesh.rotation.x = Math.max(-1.2, Math.min(1.2, earthMesh.rotation.x));
        markersGroup.rotation.y = earthMesh.rotation.y;
        markersGroup.rotation.x = earthMesh.rotation.x;
        previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
      }

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(markersGroup.children);
      const hit = intersects.find((i) => i.object.userData && i.object.userData.name);

      if (hit) {
        hoveredRef = hit.object.userData;
        setHoveredCountry(hit.object.userData);
        setTooltipPos({ x: e.clientX, y: e.clientY });
        renderer.domElement.style.cursor = 'pointer';
      } else {
        hoveredRef = null;
        setHoveredCountry(null);
        renderer.domElement.style.cursor = isDraggingRef.current ? 'grabbing' : 'grab';
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleClick = () => {
      if (hoveredRef) {
        if (hoveredRef.id === 'india' || hoveredRef.isPrototypeTarget) {
          onSelectCountry('india');
        }
      }
    };

    // Scroll zoom
    const handleWheel = (e) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      const zoomSpeed = 0.8;
      const newZ = cameraRef.current.position.z + (e.deltaY > 0 ? zoomSpeed : -zoomSpeed);
      if (newZ >= 16 && newZ <= 42) {
        cameraRef.current.position.z = newZ;
      }
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    dom.addEventListener('click', handleClick);
    dom.addEventListener('wheel', handleWheel, { passive: false });

    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(containerRef.current);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      resizeObserver.disconnect();
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      dom.removeEventListener('click', handleClick);
      dom.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isDarkMode]);

  // Zoom controls
  const handleZoom = (direction) => {
    if (!cameraRef.current) return;
    const newZ = cameraRef.current.position.z + (direction === 'in' ? -2.5 : 2.5);
    if (newZ >= 16 && newZ <= 42) {
      cameraRef.current.position.z = newZ;
    }
  };

  // Reset focus to India
  const handleFocusIndia = () => {
    if (!globeRef.current || !markersGroupRef.current || !cameraRef.current) return;
    const targetLon = 78.96;
    const targetLat = 20.59;
    globeRef.current.rotation.y = -(targetLon * Math.PI) / 180 + Math.PI / 2;
    globeRef.current.rotation.x = (targetLat * Math.PI) / 180 * 0.4;
    markersGroupRef.current.rotation.y = globeRef.current.rotation.y;
    markersGroupRef.current.rotation.x = globeRef.current.rotation.x;
    cameraRef.current.position.set(0, 0, 23);
    onSelectCountry('india');
  };

  return (
    <div className="flex flex-col w-full h-full relative overflow-hidden select-none bg-surface">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-auto">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface-container-low/40 to-surface pointer-events-none z-[1]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full bg-primary-fixed/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -top-32 right-12 w-96 h-96 rounded-full bg-secondary-fixed/25 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-16 w-80 h-80 rounded-full bg-error-container/30 blur-3xl pointer-events-none"></div>
        
        <div className="absolute inset-0 w-full h-full bg-transparent">
          <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
        </div>
        
        <div className="absolute inset-0 pointer-events-none z-[2] opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-surface-container-highest/20 to-surface-dim/40"></div>
      </div>

      <div className="relative z-10 w-full h-full p-space-base flex flex-col justify-between pointer-events-none gap-space-lg">
        {/* Top Section */}
        <div className="w-full flex items-start justify-between gap-space-base">
          <div className="pointer-events-auto flex flex-col gap-space-xs max-w-sm">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-lowest/85 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
              <span className="w-2 h-2 -ml-3.5 rounded-full bg-secondary"></span>
              <span className="font-badge-mono text-badge-mono text-on-surface uppercase tracking-wider">Planetary GIS Core · EPSG:4326</span>
              <span className="font-badge-mono text-badge-mono px-1.5 py-0.5 rounded bg-surface-container text-primary font-semibold">SYNCHRONIZED</span>
            </div>
            <div className="p-space-md rounded-xl bg-surface-container-lowest/90 backdrop-blur-xl shadow-md flex flex-col gap-space-xs mt-2">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase text-on-surface-variant tracking-wider">Spatial Risk Telemetry</span>
                <span className="material-symbols-outlined text-[18px] text-primary">sensors</span>
              </div>
              <p className="font-headline-sm text-headline-sm text-on-surface leading-tight">Geospatial Environmental Risk Engine</p>
              <div className="flex items-center gap-space-sm mt-1">
                <span className="font-badge-mono text-badge-mono text-on-surface-variant">LOD 4.2 HIGH-RES</span>
                <span className="text-outline-variant">•</span>
                <span className="font-badge-mono text-badge-mono text-secondary">0.05° RESOLUTION</span>
              </div>
            </div>
          </div>
          
          <div className="pointer-events-auto hidden 2xl:flex flex-col gap-space-sm w-telemetry-panel-width">
            {/* Some of the telemetry info can be shown here if room permits */}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full flex items-end justify-between gap-space-base pb-4">
          <div className="pointer-events-auto hidden xl:flex flex-col gap-space-sm max-w-sm w-full">
            {/* Real-time anomaly hotspots (hidden on smaller screens to not clutter) */}
          </div>

          <div className="pointer-events-auto flex flex-col items-center gap-space-sm mx-auto max-w-2xl w-full">
            <div className="px-space-md py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md shadow-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-primary">travel_explore</span>
              <span className="font-badge-mono text-badge-mono uppercase text-on-surface tracking-wider font-semibold">3D Earth · Drag to Rotate · Scroll to Zoom</span>
            </div>
            <div className="w-full p-space-sm rounded-xl bg-surface-container-lowest/90 backdrop-blur-xl shadow-lg border border-outline-variant/20 flex flex-wrap items-center justify-between gap-space-sm">
              <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg">
                <button
                  onClick={handleFocusIndia}
                  className="px-space-md py-1.5 rounded-md bg-primary text-on-primary font-label-md text-label-md shadow-sm transition-all hover:bg-primary-container flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">filter_center_focus</span>
                  <span>India Focus</span>
                </button>
                <button
                  onClick={() => setIsAutoRotating(!isAutoRotating)}
                  className="px-space-md py-1.5 rounded-md text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-md text-label-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">{isAutoRotating ? 'pause' : 'play_arrow'}</span>
                  <span>{isAutoRotating ? 'Pause' : 'Resume'}</span>
                </button>
              </div>

              <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg">
                <button className="px-3 py-1.5 rounded-md bg-surface-container-lowest shadow-sm text-error font-label-sm text-label-sm font-semibold transition-all flex items-center gap-1 cursor-pointer border-l-2 border-l-error">
                  <span>Heat Stress</span>
                </button>
                <button className="px-3 py-1.5 rounded-md text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm font-semibold transition-all flex items-center gap-1 cursor-pointer border-l-2 border-l-transparent hover:border-l-primary">
                  <span>Flood Inundation</span>
                </button>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleZoom('in')}
                  className="w-8 h-8 rounded-md bg-surface-container-low hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
                <button
                  onClick={() => handleZoom('out')}
                  className="w-8 h-8 rounded-md bg-surface-container-low hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">remove</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="pointer-events-auto hidden lg:flex flex-col gap-space-xs p-space-md rounded-xl bg-surface-container-lowest/90 backdrop-blur-xl shadow-md min-w-[220px]">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-on-surface">Projection Grid</span>
              <span className="font-badge-mono text-badge-mono text-secondary font-bold">WGS 84</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Centroid Lat</span>
              <span className="font-telemetry-data text-telemetry-data text-on-surface font-bold">20.5937° N</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Centroid Long</span>
              <span className="font-telemetry-data text-telemetry-data text-on-surface font-bold">78.9629° E</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Atmospheric Press</span>
              <span className="font-telemetry-data text-telemetry-data text-on-surface font-bold">1009.2 hPa</span>
            </div>
            <div className="mt-1 pt-2 bg-surface-container-highest/40 -mx-space-md px-space-md flex items-center justify-between">
              <span className="font-badge-mono text-badge-mono text-on-surface-variant">REFRESH RATE</span>
              <span className="font-badge-mono text-badge-mono text-primary font-bold">60 FPS · WEBL-2</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tooltip Overlay */}
      {hoveredCountry && (
        <div
          className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-full px-space-md py-space-sm shadow-xl backdrop-blur-md rounded-xl border border-outline-variant/30 min-w-[200px]"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y - 14}px`,
            backgroundColor: 'var(--color-surface-container-lowest)',
          }}
        >
          <div className="flex items-center gap-space-sm">
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: hoveredCountry.color || 'var(--color-primary)' }}
            />
            <div>
              <div className="font-label-md text-label-md tracking-tight text-on-surface flex items-center gap-2">
                {hoveredCountry.name}
                {hoveredCountry.isPrototypeTarget && (
                  <span className="px-1.5 py-0.5 rounded-sm bg-primary-container text-on-primary-container font-badge-mono text-badge-mono">Active</span>
                )}
              </div>
              <div className="font-badge-mono text-badge-mono text-on-surface-variant mt-0.5">
                {hoveredCountry.climateIndicator}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
