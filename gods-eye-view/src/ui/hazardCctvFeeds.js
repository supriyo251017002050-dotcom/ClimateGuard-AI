/**
 * @module hazardCctvFeeds
 * Real-time Disaster Hazard CCTV Stream Simulator & Live Telemetry Engine.
 * Provides working, realistic live feeds for Kolkata, Mumbai, Goa, Bihar, and Delhi,
 * featuring real-time environmental animations, live clocks, and multi-hazard telemetry.
 */

export const HAZARD_PROFILES = {
  'kolkata-hooghly-surge': {
    city: 'Kolkata',
    location: 'Hooghly River & Howrah Basin',
    hazard: 'Cyclone & Storm Surge',
    hazardCode: 'CYCLONE',
    alertLevel: 'CRITICAL ALERT',
    alertColor: '#ef4444',
    badge: '🌀 CYCLONE WARNING',
    summary: 'Severe Cyclonic Storm over Bay of Bengal tracking toward Ganges Delta. Heavy storm surge inundation along low-lying embankments.',
    metrics: {
      wind: '145 km/h (Sustained)',
      surge: '+3.6 m (High Tide)',
      pressure: '964 hPa (Deep Low)',
      rainfall: '88 mm/hr (Extreme)',
    },
    sceneType: 'storm_river',
  },
  'kolkata-vidyasagar-delta': {
    city: 'Kolkata',
    location: 'Vidyasagar Setu Delta Outpost',
    hazard: 'Pluvial Flash Flood',
    hazardCode: 'FLOOD',
    alertLevel: 'HIGH ALERT',
    alertColor: '#f97316',
    badge: '🌧️ DELTA FLOOD WATCH',
    summary: 'High water volume discharge in Hooghly estuary. Drainage backwater affecting south Kolkata drainage canals.',
    metrics: {
      wind: '65 km/h',
      surge: '+2.4 m',
      pressure: '988 hPa',
      rainfall: '52 mm/hr',
    },
    sceneType: 'river_rain',
  },
  'kolkata-sunderbans-radar': {
    city: 'Kolkata / Sundarbans',
    location: 'Sundarbans Coastal Cyclone Radar',
    hazard: 'Super Cyclone Landfall',
    hazardCode: 'CYCLONE',
    alertLevel: 'CRITICAL ALERT',
    alertColor: '#dc2626',
    badge: '🌀 LANDFALL TRACKING',
    summary: 'Eye of cyclonic vortex 75 km south-southeast. Violent sea waves and coastal mangrove inundation.',
    metrics: {
      wind: '165 km/h (Gusting 185)',
      surge: '+4.5 m (Severe)',
      pressure: '952 hPa (Intense)',
      rainfall: '110 mm/hr',
    },
    sceneType: 'coastal_cyclone',
  },

  'mumbai-marine-tsunami': {
    city: 'Mumbai',
    location: 'Marine Drive Coastal Station',
    hazard: 'Tsunami & Tidal Surge',
    hazardCode: 'TSUNAMI',
    alertLevel: 'HIGH ALERT',
    alertColor: '#f97316',
    badge: '🌊 TSUNAMI / SURGE WATCH',
    summary: 'Arabian Sea high-energy swell following offshore tectonic tremor. Severe wave overtopping on coastal promenade.',
    metrics: {
      waveHeight: '4.8 m',
      surge: '+2.8 m above datum',
      seaTemp: '29.4 °C',
      tideStatus: 'Spring High Tide',
    },
    sceneType: 'coastal_waves',
  },
  'mumbai-bandra-surge': {
    city: 'Mumbai',
    location: 'Bandra-Worli Coastal Wave Cam',
    hazard: 'Marine Swell & Tidal Wave',
    hazardCode: 'TSUNAMI',
    alertLevel: 'MODERATE ALERT',
    alertColor: '#eab308',
    badge: '🌊 MARINE WAVE ADVISORY',
    summary: 'Active swell trains from western Arabian Sea. High wave warnings issued for small fishing craft and coastal traffic.',
    metrics: {
      waveHeight: '3.9 m',
      surge: '+1.9 m',
      seaTemp: '28.8 °C',
      tideStatus: 'Rising Tide',
    },
    sceneType: 'coastal_waves',
  },
  'mumbai-mithi-monsoon': {
    city: 'Mumbai',
    location: 'Mithi River Monsoon Flood Gauge',
    hazard: 'Pluvial Flash Flood',
    hazardCode: 'FLOOD',
    alertLevel: 'CRITICAL ALERT',
    alertColor: '#ef4444',
    badge: '🌧️ URBAN FLASH FLOOD',
    summary: 'Mithi River water level at 4.2m exceeding danger mark of 3.5m. Sump pump capacity running at 94%.',
    metrics: {
      waterLevel: '4.2 m (Danger: 3.5m)',
      discharge: '1,420 m³/s',
      rainfall: '74 mm/hr',
      sumpCapacity: '94% Full',
    },
    sceneType: 'river_rain',
  },

  'goa-panaji-tide': {
    city: 'Goa',
    location: 'Panaji Mandovi Estuary Station',
    hazard: 'Coastal Surge & High Tide',
    hazardCode: 'TSUNAMI',
    alertLevel: 'ADVISORY',
    alertColor: '#06b6d4',
    badge: '🌊 TIDAL SURGE MONITOR',
    summary: 'Mandovi river estuary monitoring spring tidal currents and ocean swell. Ferry operations restricted.',
    metrics: {
      tideAnomaly: '+2.8 m',
      currentVelocity: '3.4 knots',
      salinity: '34.2 PSU',
      wavePeriod: '12 seconds',
    },
    sceneType: 'coastal_waves',
  },
  'goa-calangute-wave': {
    city: 'Goa',
    location: 'Calangute Beach Marine Cam',
    hazard: 'High Surf & Marine Hazard',
    hazardCode: 'TSUNAMI',
    alertLevel: 'ADVISORY',
    alertColor: '#06b6d4',
    badge: '🌊 ROUGH SURF WARNING',
    summary: 'Strong breaker waves along north Goa coastal shelf. Red flags hoisted across public beaches.',
    metrics: {
      waveHeight: '3.2 m',
      currentVelocity: '2.8 knots',
      seaTemp: '29.1 °C',
      ripCurrentRisk: 'High',
    },
    sceneType: 'coastal_waves',
  },

  'bihar-patna-ganga': {
    city: 'Bihar',
    location: 'Patna Ganga Basin Hydrological Cam',
    hazard: 'Riverine Basin Flood',
    hazardCode: 'FLOOD',
    alertLevel: 'HIGH ALERT',
    alertColor: '#f97316',
    badge: '🌧️ GANGA BASIN INUNDATION',
    summary: 'Ganga river level rising at 4 cm/hr due to upstream catchment rainfall in Nepal and Uttar Pradesh.',
    metrics: {
      waterLevel: '50.6 m (Danger: 48.6m)',
      discharge: '28,500 m³/s',
      trend: 'Rising (+4 cm/hr)',
      inundationZone: 'Diara Floodplains',
    },
    sceneType: 'river_deluge',
  },
  'bihar-kosi-deluge': {
    city: 'Bihar',
    location: 'Kosi Embankment Deluge Sensor',
    hazard: 'Catastrophic Flash Flood',
    hazardCode: 'FLOOD',
    alertLevel: 'CRITICAL ALERT',
    alertColor: '#dc2626',
    badge: '🌊 KOSI RIVER OVERFLOW',
    summary: 'Kosi Barrage discharge exceeds 245,000 cusecs. Severe threat of embankment breaching in Supaul and Saharsa.',
    metrics: {
      discharge: '2,450 m³/s',
      waterLevel: '72.8 m (Danger: 71.0m)',
      barrageGates: '42 of 56 Open',
      velocity: '3.8 m/s',
    },
    sceneType: 'river_deluge',
  },

  'delhi-safdarjung-heat': {
    city: 'Delhi',
    location: 'Safdarjung Urban Heat Dome Station',
    hazard: 'Atmospheric Heatwave (Heat Dome)',
    hazardCode: 'HEATWAVE',
    alertLevel: 'CRITICAL ALERT',
    alertColor: '#ef4444',
    badge: '☀️ EXTREME HEATWAVE RED ALERT',
    summary: 'Severe anticyclonic heat dome over northern plains. Maximum temperature departure +6.2°C above seasonal normal.',
    metrics: {
      temp: '45.8 °C (114.4 °F)',
      heatIndex: '52.4 °C (Extreme Danger)',
      humidity: '28%',
      uvIndex: '11+ (Extreme)',
    },
    sceneType: 'heat_dome',
  },
  'delhi-yamuna-basin': {
    city: 'Delhi',
    location: 'Old Yamuna Bridge Water Level Cam',
    hazard: 'Riverine Flash Inundation',
    hazardCode: 'FLOOD',
    alertLevel: 'HIGH ALERT',
    alertColor: '#f97316',
    badge: '🌧️ YAMUNA FLOODPLAIN ALERT',
    summary: 'Hathnikund barrage releases reaching Delhi stretch. Yamuna flowing at 206.2m, well above evacuation mark (205.33m).',
    metrics: {
      waterLevel: '206.2 m (Danger: 205.33m)',
      hathnikundRelease: '185,000 cusecs',
      evacuationStatus: 'Low-Lying Camps Active',
      flowSpeed: '2.5 m/s',
    },
    sceneType: 'river_rain',
  },
  'delhi-ridge-seismic': {
    city: 'Delhi',
    location: 'Northern Ridge Fault Line Observatory',
    hazard: 'Seismic Ground Motion (Earthquake)',
    hazardCode: 'EARTHQUAKE',
    alertLevel: 'MONITORING',
    alertColor: '#a855f7',
    badge: '⚡ SEISMIC FAULT MONITOR',
    summary: 'Active seismic velocity telemetry on Mahendragarh-Dehradun subsurface fault line. Real-time accelerometer recording.',
    metrics: {
      magnitude: '2.2 M (Micro-Tremor)',
      focalDepth: '14.2 km',
      groundAccel: '0.012 g (PGA)',
      faultStatus: 'Active Trace',
    },
    sceneType: 'seismic_trace',
  },
};

/**
 * Returns hazard profile for given camera ID or a sensible default.
 */
export function getHazardProfile(cameraId) {
  return HAZARD_PROFILES[cameraId] || {
    city: 'Disaster Station',
    location: 'Operational Area',
    hazard: 'Multi-Hazard Monitoring',
    hazardCode: 'MONITOR',
    alertLevel: 'ACTIVE MONITOR',
    alertColor: '#00d4ff',
    badge: '🛡️ CLIMATEGUARD SENSOR',
    summary: 'Live environmental telemetry feed connected to ClimateGuard AI real-time threat intelligence network.',
    metrics: {
      status: 'Online',
      telemetry: 'Stream Active',
      latency: '28 ms',
    },
    sceneType: 'heat_dome',
  };
}

let _animId = null;
let _activeCanvas = null;

/**
 * Initializes and starts the live animated CCTV feed on a canvas element.
 */
export function startLiveHazardCctv(containerEl, cameraId) {
  stopLiveHazardCctv();

  if (!containerEl) return null;

  // Ensure a canvas exists inside containerEl
  let canvas = containerEl.querySelector('#cctv-live-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'cctv-live-canvas';
    canvas.width = 640;
    canvas.height = 360;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.objectFit = 'cover';
    canvas.style.display = 'block';
    canvas.style.borderRadius = '8px';
    containerEl.appendChild(canvas);
  }

  _activeCanvas = canvas;
  const ctx = canvas.getContext('2d');
  const profile = getHazardProfile(cameraId);

  let frame = 0;

  // Particle sets for rain/spray
  const particles = Array.from({ length: 90 }, () => ({
    x: Math.random() * 640,
    y: Math.random() * 360,
    speed: 6 + Math.random() * 12,
    len: 10 + Math.random() * 18,
    thick: 0.8 + Math.random() * 1.5,
  }));

  // Seismograph wave history
  const seismicPoints = Array.from({ length: 640 }, (_, i) => ({
    y: 180 + Math.sin(i / 15) * 4,
  }));

  function renderLoop() {
    frame++;
    const now = new Date();
    const istTime = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(now);
    const ms = String(now.getMilliseconds()).padStart(3, '0').slice(0, 2);

    // 1. Draw Background Environment Scene based on sceneType
    drawSceneBackground(ctx, profile.sceneType, frame, particles, seismicPoints);

    // 2. Draw CRT Scanlines and Lens Vignette
    drawCctvEffects(ctx, frame);

    // 3. Draw Broadcast Live CCTV HUD
    drawCctvHud(ctx, profile, `${istTime}.${ms}`, frame);

    _animId = requestAnimationFrame(renderLoop);
  }

  _animId = requestAnimationFrame(renderLoop);
  return canvas;
}

export function stopLiveHazardCctv() {
  if (_animId) {
    cancelAnimationFrame(_animId);
    _animId = null;
  }
}

/**
 * Draws dynamic environmental scene backgrounds.
 */
function drawSceneBackground(ctx, type, frame, particles, seismicPoints) {
  const w = 640;
  const h = 360;

  if (type === 'storm_river' || type === 'coastal_cyclone') {
    // Turbulent dark sky and storm waters
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
    skyGrad.addColorStop(0, '#0a101d');
    skyGrad.addColorStop(0.5, '#17253b');
    skyGrad.addColorStop(1, '#081726');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h);

    // Lightning flash occasionally
    if (frame % 160 === 24 || frame % 160 === 26) {
      ctx.fillStyle = 'rgba(210, 240, 255, 0.45)';
      ctx.fillRect(0, 0, w, h);
    }

    // Heavy surging water waves
    ctx.fillStyle = '#0f2b42';
    ctx.beginPath();
    ctx.moveTo(0, h);
    for (let x = 0; x <= w; x += 20) {
      const y = h * 0.62 + Math.sin(x * 0.02 + frame * 0.08) * 16 + Math.cos(x * 0.04 - frame * 0.05) * 8;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(w, h);
    ctx.fill();

    // Wave foam
    ctx.fillStyle = 'rgba(180, 220, 245, 0.28)';
    ctx.beginPath();
    ctx.moveTo(0, h);
    for (let x = 0; x <= w; x += 15) {
      const y = h * 0.68 + Math.sin(x * 0.03 - frame * 0.07) * 12;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(w, h);
    ctx.fill();

    // Howrah Bridge / Landmark Silhouette in background
    ctx.fillStyle = '#060c14';
    ctx.beginPath();
    ctx.moveTo(120, h * 0.62);
    ctx.lineTo(160, h * 0.38);
    ctx.lineTo(200, h * 0.38);
    ctx.lineTo(240, h * 0.62);
    ctx.lineTo(400, h * 0.62);
    ctx.lineTo(440, h * 0.38);
    ctx.lineTo(480, h * 0.38);
    ctx.lineTo(520, h * 0.62);
    ctx.fill();
    ctx.strokeStyle = '#060c14';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(320, h * 0.75, 180, Math.PI, 0, false);
    ctx.stroke();

    // Driving Rain Particles
    ctx.strokeStyle = 'rgba(200, 235, 255, 0.45)';
    for (const p of particles) {
      p.x += 7; // Strong gale slant
      p.y += p.speed;
      if (p.y > h) { p.y = -10; p.x = Math.random() * w * 1.2 - w * 0.2; }
      if (p.x > w) p.x = 0;
      ctx.lineWidth = p.thick;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x - 12, p.y - p.len);
      ctx.stroke();
    }
  } else if (type === 'coastal_waves') {
    // Arabian Sea / Ocean coastal swell
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
    skyGrad.addColorStop(0, '#0c2338');
    skyGrad.addColorStop(0.45, '#1e486b');
    skyGrad.addColorStop(0.6, '#31698e');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h);

    // Distant marine horizon & swells
    for (let layer = 0; layer < 4; layer++) {
      ctx.fillStyle = layer === 3 ? '#0d3248' : layer === 2 ? '#12415d' : '#1a5276';
      ctx.beginPath();
      const baseY = h * (0.52 + layer * 0.12);
      ctx.moveTo(0, h);
      for (let x = 0; x <= w; x += 25) {
        const wave = Math.sin((x + frame * (4 - layer) * 2) * 0.015) * (14 + layer * 6);
        ctx.lineTo(x, baseY + wave);
      }
      ctx.lineTo(w, h);
      ctx.fill();
    }

    // Crashing surf whitecaps
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 6; i++) {
      const cx = ((i * 120 + frame * 3) % (w + 100)) - 50;
      const cy = h * 0.72 + Math.sin(frame * 0.05 + i) * 15;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 45, 12, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Coastal seawall / Promenade silhouette
    ctx.fillStyle = '#06131c';
    ctx.fillRect(0, h * 0.88, w, h * 0.12);
  } else if (type === 'river_deluge') {
    // Silt-heavy muddy floodwaters (Ganga / Kosi)
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, '#2b2a26');
    sky.addColorStop(0.5, '#4a463c');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // Muddy torrent
    const waterGrad = ctx.createLinearGradient(0, h * 0.45, 0, h);
    waterGrad.addColorStop(0, '#5c4827');
    waterGrad.addColorStop(0.5, '#785f34');
    waterGrad.addColorStop(1, '#423317');
    ctx.fillStyle = waterGrad;
    ctx.fillRect(0, h * 0.45, w, h * 0.55);

    // Fast muddy flow streaks
    ctx.strokeStyle = 'rgba(180, 150, 100, 0.35)';
    ctx.lineWidth = 2.5;
    for (let i = 0; i < 18; i++) {
      const y = h * (0.5 + (i % 6) * 0.08);
      const x = (frame * 12 + i * 50) % (w + 100) - 50;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 80, y + (Math.sin(x * 0.05) * 4));
      ctx.stroke();
    }

    // Partially submerged trees & marker poles
    ctx.fillStyle = '#1c150b';
    ctx.fillRect(180, h * 0.42, 8, 90);
    ctx.beginPath();
    ctx.arc(184, h * 0.4, 25, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillRect(450, h * 0.38, 10, 110);
    ctx.beginPath();
    ctx.arc(455, h * 0.35, 30, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === 'heat_dome') {
    // Searing hot atmospheric sun glare & heat haze over Delhi
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, '#d97706');
    sky.addColorStop(0.35, '#f59e0b');
    sky.addColorStop(0.7, '#fef3c7');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // Blinding sun disc with atmospheric glow
    const sunGrad = ctx.createRadialGradient(480, 90, 15, 480, 90, 160);
    sunGrad.addColorStop(0, '#ffffff');
    sunGrad.addColorStop(0.3, 'rgba(254, 243, 199, 0.9)');
    sunGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
    ctx.fillStyle = sunGrad;
    ctx.fillRect(0, 0, w, h);

    // Delhi urban silhouette (India Gate / high-rises)
    ctx.fillStyle = '#451a03';
    ctx.fillRect(0, h * 0.72, w, h * 0.28);
    // India gate silhouette
    ctx.fillRect(280, h * 0.52, 80, 75);
    ctx.clearRect(305, h * 0.62, 30, 40);

    // Heat haze shimmering horizontal displacement bars
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    for (let i = 0; i < 14; i++) {
      const y = h * 0.5 + i * 16 + Math.sin(frame * 0.1 + i) * 6;
      ctx.fillRect(0, y, w, 4);
    }
  } else if (type === 'seismic_trace') {
    // Real-time Seismograph display
    ctx.fillStyle = '#0a0d14';
    ctx.fillRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Shift and update seismic waveform
    seismicPoints.shift();
    const spike = (frame % 80 > 70) ? (Math.random() - 0.5) * 65 : (Math.random() - 0.5) * 8;
    seismicPoints.push({ y: 180 + spike });

    // Draw active trace
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    for (let i = 0; i < seismicPoints.length; i++) {
      const pt = seismicPoints[i];
      if (i === 0) ctx.moveTo(i, pt.y);
      else ctx.lineTo(i, pt.y);
    }
    ctx.stroke();

    ctx.fillStyle = '#c084fc';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('ACCELERATION: +0.012g | SEISMIC RECORDING: 3-AXIS VELOCITY', 30, 50);
  } else {
    // Default fallback rain/urban
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, w, h);
  }
}

/**
 * Draws scanlines and vintage CRT camera lens noise.
 */
function drawCctvEffects(ctx, frame) {
  const w = 640;
  const h = 360;

  // Thin scanlines
  ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
  for (let y = 0; y < h; y += 4) {
    ctx.fillRect(0, y, w, 1.5);
  }

  // Camera lens vignette
  const vig = ctx.createRadialGradient(w / 2, h / 2, w * 0.35, w / 2, h / 2, w * 0.65);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(0,0,0,0.55)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, w, h);
}

/**
 * Overlays live broadcast HUD, clock, hazard banner, and telemetry onto the video frame.
 */
function drawCctvHud(ctx, profile, timeStr, frame) {
  const w = 640;
  const h = 360;

  // Top Left: REC dot and LIVE indicator
  const recBlink = frame % 40 < 25;
  if (recBlink) {
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(22, 22, 6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 13px "JetBrains Mono", monospace';
  ctx.fillText('REC ● LIVE 1080p', 36, 26);

  // Top Right: Live Indian Standard Time
  ctx.textAlign = 'right';
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 13px "JetBrains Mono", monospace';
  ctx.fillText(`${timeStr} IST`, w - 16, 26);

  // Top Center Hazard Badge (Prominent)
  ctx.textAlign = 'center';
  const badgeWidth = 260;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.strokeStyle = profile.alertColor;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.roundRect(w / 2 - badgeWidth / 2, 12, badgeWidth, 26, 6);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = profile.alertColor;
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText(profile.badge, w / 2, 29);

  // Bottom Overlay Bar for Camera details & telemetry
  ctx.textAlign = 'left';
  ctx.fillStyle = 'rgba(10, 15, 29, 0.88)';
  ctx.fillRect(0, h - 52, w, 52);
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, h - 52);
  ctx.lineTo(w, h - 52);
  ctx.stroke();

  // Bottom Left: Camera and Location
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText(`CAM: ${profile.city.toUpperCase()} · ${profile.location}`, 16, h - 32);

  // Bottom Left line 2: Primary Hazard Status
  ctx.fillStyle = profile.alertColor;
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText(`STATUS: ${profile.alertLevel} — ${profile.hazard.toUpperCase()}`, 16, h - 14);

  // Bottom Right: Key live metric readout
  ctx.textAlign = 'right';
  const metricKeys = Object.keys(profile.metrics);
  if (metricKeys.length >= 2) {
    const k1 = metricKeys[0];
    const k2 = metricKeys[1];
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';
    ctx.fillText(`${k1.toUpperCase()}: ${profile.metrics[k1]}`, w - 16, h - 32);
    ctx.fillText(`${k2.toUpperCase()}: ${profile.metrics[k2]}`, w - 16, h - 14);
  }
}
