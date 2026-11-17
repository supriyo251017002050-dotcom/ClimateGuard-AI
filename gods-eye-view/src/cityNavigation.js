import * as Cesium from 'cesium';

export const CITY_LOCATIONS = {
  delhi: { name: 'Delhi', lat: 28.6139, lon: 77.2090, alt: 25000, pitch: -45, heading: 0 },
  kolkata: { name: 'Kolkata', lat: 22.5726, lon: 88.3639, alt: 22000, pitch: -45, heading: 0 },
  bihar: { name: 'Bihar', lat: 25.5941, lon: 85.1376, alt: 35000, pitch: -50, heading: 0 },
  mumbai: { name: 'Mumbai', lat: 19.0760, lon: 72.8777, alt: 22000, pitch: -45, heading: 0 },
  goa: { name: 'Goa', lat: 15.2993, lon: 74.1240, alt: 25000, pitch: -45, heading: 0 },
  india: { name: 'Global India', lat: 22.5, lon: 82.0, alt: 18000000, pitch: -90, heading: 0 },
};

/**
 * Smoothly fly camera to given coordinates.
 */
export function flyToCoordinates(
  viewer,
  { lat, lon, alt = 25000, pitch = -45, heading = 0 },
  duration = 2.0,
) {
  if (!viewer || viewer.isDestroyed?.()) return;
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(Number(lon), Number(lat), Number(alt)),
    orientation: {
      heading: Cesium.Math.toRadians(Number(heading || 0)),
      pitch: Cesium.Math.toRadians(Number(pitch != null ? pitch : -45)),
      roll: 0.0,
    },
    duration: Number(duration) || 2.0,
    easingFunction: Cesium.EasingFunction.CUBIC_IN_OUT,
  });
}

/**
 * Smoothly fly camera to a predefined city or location.
 */
export function flyToCity(viewer, city, duration = 2.0) {
  if (!viewer || viewer.isDestroyed?.()) return false;
  const rawKey = String(city || '').trim().toLowerCase();
  const normalizedKey =
    rawKey === 'global india' || rawKey === 'global-india' || rawKey === 'globalindia'
      ? 'india'
      : rawKey;
  const target = CITY_LOCATIONS[normalizedKey];
  if (!target) {
    console.warn(`[CityNavigation] Unknown city: ${city}`);
    return false;
  }
  flyToCoordinates(viewer, target, duration);
  return true;
}

/**
 * Initialize postMessage listener and wire up interactive city navigation HUD buttons.
 */
export function initCityNavigation(
  viewer,
  { targetWindow = typeof window !== 'undefined' ? window : null, doc = globalThis.document } = {},
) {
  if (!viewer) return () => {};

  const onMessage = (event) => {
    const data = event?.data;
    if (!data || typeof data !== 'object') return;
    if (data.type === 'fly-to-city') {
      flyToCity(viewer, data.city, data.duration || 2.0);
    } else if (data.type === 'fly-to-coordinates') {
      flyToCoordinates(
        viewer,
        {
          lat: data.lat,
          lon: data.lon,
          alt: data.alt,
          pitch: data.pitch,
          heading: data.heading,
        },
        data.duration || 2.0,
      );
    }
  };

  targetWindow?.addEventListener?.('message', onMessage);

  const CITY_CAMERA_MAP = {
    delhi: 'delhi-safdarjung-heat',
    kolkata: 'kolkata-hooghly-surge',
    bihar: 'bihar-patna-ganga',
    mumbai: 'mumbai-marine-tsunami',
    goa: 'goa-panaji-tide',
  };

  function selectCctvForCity(cityKey) {
    const targetCamId = CITY_CAMERA_MAP[cityKey];
    if (!targetCamId || !doc) return;
    const cctvSelect = doc.getElementById('cctv-camera-select');
    const cctvEnableBtn = doc.getElementById('cctv-enable-btn');
    const cctvPanel = doc.getElementById('cctv-panel');

    if (cctvEnableBtn && !cctvEnableBtn.classList.contains('active')) {
      cctvEnableBtn.click();
    }
    if (cctvSelect) {
      cctvSelect.value = targetCamId;
      cctvSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }
    if (cctvPanel && cctvPanel.classList.contains('collapsed')) {
      cctvPanel.classList.remove('collapsed');
    }
  }

  function toggleCctvPanel() {
    if (!doc) return;
    const cctvPanel = doc.getElementById('cctv-panel');
    const cctvEnableBtn = doc.getElementById('cctv-enable-btn');
    if (!cctvPanel) return;
    const isCollapsed = cctvPanel.classList.contains('collapsed');
    if (isCollapsed) {
      cctvPanel.classList.remove('collapsed');
      if (cctvEnableBtn && !cctvEnableBtn.classList.contains('active')) {
        cctvEnableBtn.click();
      }
    } else {
      cctvPanel.classList.add('collapsed');
    }
  }

  // Create or attach interactive city buttons in the HUD
  const cleanups = [];
  if (doc && typeof doc.querySelectorAll === 'function') {
    // If #city-nav-hud doesn't exist, create it and mount into the document
    let hud = doc.getElementById('city-nav-hud');
    if (!hud) {
      hud = doc.createElement('nav');
      hud.id = 'city-nav-hud';
      hud.className = 'city-nav-hud';
      hud.setAttribute('aria-label', 'City Navigation');

      const cities = [
        { id: 'delhi', label: 'DELHI' },
        { id: 'kolkata', label: 'KOLKATA' },
        { id: 'bihar', label: 'BIHAR' },
        { id: 'mumbai', label: 'MUMBAI' },
        { id: 'goa', label: 'GOA' },
        { id: 'india', label: 'GLOBAL INDIA' },
      ];

      cities.forEach(({ id, label }) => {
        const btn = doc.createElement('button');
        btn.type = 'button';
        btn.className = 'city-nav-btn';
        btn.dataset.city = id;
        btn.textContent = label;
        hud.appendChild(btn);
      });

      // Add prominent CCTV button
      const cctvBtn = doc.createElement('button');
      cctvBtn.type = 'button';
      cctvBtn.id = 'city-nav-cctv-btn';
      cctvBtn.className = 'city-nav-btn city-nav-cctv-btn';
      cctvBtn.textContent = '📹 LIVE CCTV & HAZARDS';
      cctvBtn.title = 'Open/close Live CCTV & Hazard Feeds';
      hud.appendChild(cctvBtn);

      // Insert into body or command dock
      doc.body?.appendChild(hud);
      cleanups.push(() => hud.remove());
    }

    const buttons = [...doc.querySelectorAll('.city-nav-btn[data-city]')];
    buttons.forEach((btn) => {
      const city = btn.dataset.city;
      if (!city) return;
      const clickHandler = (e) => {
        e.preventDefault();
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        flyToCity(viewer, city, 2.0);
        selectCctvForCity(city);
      };
      btn.addEventListener('click', clickHandler);
      cleanups.push(() => btn.removeEventListener('click', clickHandler));
    });

    const cctvToggleBtn = doc.getElementById('city-nav-cctv-btn');
    if (cctvToggleBtn) {
      const cctvClickHandler = (e) => {
        e.preventDefault();
        toggleCctvPanel();
      };
      cctvToggleBtn.addEventListener('click', cctvClickHandler);
      cleanups.push(() => cctvToggleBtn.removeEventListener('click', cctvClickHandler));
    }
  }

  return () => {
    targetWindow?.removeEventListener?.('message', onMessage);
    cleanups.forEach((fn) => fn());
  };
}
