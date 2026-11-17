import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Activity,
  Building2,
  Check,
  CheckCircle2,
  Clock3,
  Compass,
  Copy,
  Crosshair,
  ExternalLink,
  Flame,
  Globe2,
  LocateFixed,
  Map,
  MapPin,
  Maximize2,
  Navigation,
  Radio,
  RefreshCw,
  RotateCcw,
  ShieldAlert,
  Users,
  Zap,
} from 'lucide-react';
import IndiaGlobe from './IndiaGlobe';
import './LiveOperations.css';

const CITIES = [
  {
    id: 'orbit',
    name: 'India Orbit',
    sector: 'Subcontinent Overview',
    lat: 22.5,
    lng: 82.0,
    alt: 2800000,
    pitch: -85,
    heading: 0,
    icon: Globe2,
    locationId: null,
    stateId: null,
    badge: 'Orbit',
    tag: 'Pan-India',
    color: '#818cf8',
    glowColor: 'rgba(129, 140, 248, 0.4)',
    resolution: '15m GSD Synth',
  },
  {
    id: 'delhi',
    name: 'Delhi NCR',
    sector: 'Northern Capital',
    lat: 28.6139,
    lng: 77.2090,
    alt: 25000,
    pitch: -55,
    heading: 15,
    icon: Building2,
    locationId: 'delhi',
    stateId: 'delhi',
    badge: 'North',
    tag: 'Heat & Yamuna',
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    resolution: '0.3m HD Nadir',
  },
  {
    id: 'kolkata',
    name: 'Kolkata',
    sector: 'Eastern Delta',
    lat: 22.5726,
    lng: 88.3639,
    alt: 22000,
    pitch: -50,
    heading: 350,
    icon: MapPin,
    locationId: 'kolkata',
    stateId: 'west-bengal',
    badge: 'East',
    tag: 'Delta & Surge',
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    resolution: '0.3m HD Nadir',
  },
  {
    id: 'bihar',
    name: 'Bihar',
    sector: 'Gangetic Plain',
    lat: 25.5941,
    lng: 85.1376,
    alt: 35000,
    pitch: -60,
    heading: 5,
    icon: Compass,
    locationId: 'bihar',
    stateId: 'bihar',
    badge: 'Plain',
    tag: 'River Floods',
    color: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    resolution: '0.5m HD Nadir',
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    sector: 'Western Seaboard',
    lat: 19.0760,
    lng: 72.8777,
    alt: 25000,
    pitch: -52,
    heading: 335,
    icon: Building2,
    locationId: 'mumbai',
    stateId: 'maharashtra',
    badge: 'West',
    tag: 'Monsoon Coast',
    color: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    resolution: '0.3m HD Nadir',
  },
  {
    id: 'goa',
    name: 'Goa',
    sector: 'Coastal Konkan',
    lat: 15.2993,
    lng: 74.1240,
    alt: 28000,
    pitch: -48,
    heading: 340,
    icon: Navigation,
    locationId: 'goa',
    stateId: 'goa',
    badge: 'Coast',
    tag: 'Tidal Surges',
    color: '#14b8a6',
    glowColor: 'rgba(20, 184, 166, 0.4)',
    resolution: '0.4m HD Nadir',
  },
];

const CAMERA_PRESETS = [
  { id: 'orbit', label: 'Planetary Orbit', pitch: -85, altMultiplier: 8, icon: Globe2 },
  { id: 'tactical', label: 'Tactical 45°', pitch: -45, altMultiplier: 1.2, icon: Crosshair },
  { id: 'nadir', label: 'High-Res Nadir', pitch: -90, altMultiplier: 0.6, icon: LocateFixed },
];

const LAYERS = [
  { id: 'alerts', label: 'Official CAP Alerts', icon: ShieldAlert, source: 'NDMA / IMD CAP', tag: 'CAP', color: '#ef4444' },
  { id: 'earthquakes', label: 'Seismic Hazards', icon: Activity, source: 'USGS', tag: 'USGS', color: '#a855f7' },
  { id: 'fires', label: 'Thermal Hotspots', icon: Flame, source: 'NASA FIRMS', tag: 'FIRMS', color: '#f97316' },
  { id: 'weather', label: 'Atmospheric Radar', icon: Radio, source: 'Open-Meteo', tag: 'RADAR', color: '#06b6d4' },
];

const severityRank = { unknown: 0, info: 1, minor: 2, moderate: 3, severe: 4, extreme: 5 };
const statusLabel = value => value ? value.replaceAll('_', ' ') : 'unknown';
const prettyTime = value => value ? new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : 'Not supplied';

function getFormattedClocks() {
  const now = new Date();
  const utc = now.toISOString().slice(11, 19) + 'Z';
  const ist = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(now);
  return { utc, ist };
}

async function api(path, options) {
  const response = await fetch(path, options);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Request failed.');
  return data;
}

export default function LiveOperations({ selection, currentLocation, onSelectState, onSelectLocationId, onContextEvent }) {
  const [feeds, setFeeds] = useState({});
  const [enabled, setEnabled] = useState({ alerts: true, earthquakes: true, fires: true, weather: true });
  const [coverage, setCoverage] = useState('state');
  const [minimumSeverity, setMinimumSeverity] = useState('info');
  const [timeWindow, setTimeWindow] = useState('24');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(null);
  const [role, setRole] = useState('public');
  const [workflowTab, setWorkflowTab] = useState('signals');
  const [incidents, setIncidents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedIncidentId, setSelectedIncidentId] = useState(null);
  const [audit, setAudit] = useState([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [mapWorkspace, setMapWorkspace] = useState('disaster');
  const [liveViewStatus, setLiveViewStatus] = useState('idle');
  const [liveViewAttempt, setLiveViewAttempt] = useState(0);
  const [liveViewFullscreen, setLiveViewFullscreen] = useState(false);
  const [copiedCoords, setCopiedCoords] = useState(false);
  const liveViewContainerRef = useRef(null);
  const iframeRef = useRef(null);
  const liveViewUrl = typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
    ? '/gods-eye-view/'
    : 'http://localhost:4173/';
  const [referenceTime, setReferenceTime] = useState(0);

  // Active City and Camera Presets
  const [activeCityId, setActiveCityId] = useState(() => {
    if (selection?.locationId) {
      const found = CITIES.find(c => c.locationId === selection.locationId);
      if (found) return found.id;
    }
    if (selection?.stateId) {
      const found = CITIES.find(c => c.stateId === selection.stateId);
      if (found) return found.id;
    }
    return 'orbit';
  });

  const [activePreset, setActivePreset] = useState('tactical');
  const [clock, setClock] = useState(getFormattedClocks);

  const initialCity = useMemo(() => {
    return CITIES.find(c => c.id === activeCityId) || CITIES[0];
  }, [activeCityId]);

  const [telemetry, setTelemetry] = useState(() => ({
    lat: initialCity.lat,
    lng: initialCity.lng,
    altKm: Math.round(initialCity.alt / 1000),
    resolution: initialCity.resolution,
    city: initialCity.name,
    sector: initialCity.sector,
    preset: 'tactical',
  }));

  const [report, setReport] = useState(() => ({
    type: 'flood',
    severity: 'moderate',
    description: '',
    lat: currentLocation?.coordinates.lat ?? initialCity.lat,
    lng: currentLocation?.coordinates.lng ?? initialCity.lng,
    observedAt: new Date().toISOString().slice(0, 16),
  }));

  // Synchronize clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setClock(getFormattedClocks());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Synchronize active city when external selection changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (selection?.locationId) {
        const found = CITIES.find(c => c.locationId === selection.locationId);
        if (found) {
          setActiveCityId(found.id);
          setTelemetry(prev => ({
            ...prev,
            lat: found.lat,
            lng: found.lng,
            altKm: Math.round(found.alt / 1000),
            resolution: found.resolution,
            city: found.name,
            sector: found.sector,
          }));
        }
      } else if (selection?.stateId) {
        const found = CITIES.find(c => c.stateId === selection.stateId);
        if (found) {
          setActiveCityId(found.id);
          setTelemetry(prev => ({
            ...prev,
            lat: found.lat,
            lng: found.lng,
            altKm: Math.round(found.alt / 1000),
            resolution: found.resolution,
            city: found.name,
            sector: found.sector,
          }));
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [selection?.locationId, selection?.stateId]);

  const loadFeed = useCallback(async (id) => {
    try {
      const data = await api(`/api/hazards/${id}`);
      setFeeds(previous => ({ ...previous, [id]: data }));
      setReferenceTime(Date.now());
    } catch (error) {
      setFeeds(previous => ({
        ...previous,
        [id]: {
          events: previous[id]?.events || [],
          feed: {
            id,
            source: LAYERS.find(layer => layer.id === id)?.source,
            status: previous[id]?.events?.length ? 'stale' : 'unavailable',
            error: error.message,
          },
        },
      }));
    }
  }, []);

  const loadWeather = useCallback(async () => {
    if (!currentLocation) {
      setFeeds(previous => ({
        ...previous,
        weather: {
          events: [],
          feed: {
            id: 'weather',
            source: 'Open-Meteo',
            status: 'unavailable',
            error: 'Choose a focus location to load weather.',
          },
        },
      }));
      return;
    }
    try {
      const data = await api(`/api/weather?lat=${currentLocation.coordinates.lat}&lng=${currentLocation.coordinates.lng}`);
      setFeeds(previous => ({ ...previous, weather: data }));
    } catch (error) {
      setFeeds(previous => ({
        ...previous,
        weather: {
          events: previous.weather?.events || [],
          feed: {
            id: 'weather',
            source: 'Open-Meteo',
            status: previous.weather?.events?.length ? 'stale' : 'unavailable',
            error: error.message,
          },
        },
      }));
    }
  }, [currentLocation]);

  const loadIncidents = useCallback(async () => {
    try {
      const data = await api('/api/incidents');
      setIncidents(data.incidents);
      setTasks(data.tasks);
      setTeams(data.teams);
    } catch (error) {
      setMessage(error.message);
    }
  }, []);

  const refreshAll = async () => {
    setBusy(true);
    setMessage('');
    await Promise.all([loadFeed('alerts'), loadFeed('earthquakes'), loadFeed('fires'), loadWeather(), loadIncidents()]);
    setBusy(false);
  };

  useEffect(() => {
    let disposed = false;
    const poll = () => {
      if (!disposed) Promise.all([loadFeed('alerts'), loadFeed('earthquakes'), loadFeed('fires')]);
    };
    const kickoff = setTimeout(() => {
      poll();
      loadIncidents();
    }, 0);
    const interval = setInterval(poll, 60_000);
    return () => {
      disposed = true;
      clearTimeout(kickoff);
      clearInterval(interval);
    };
  }, [loadFeed, loadIncidents]);

  useEffect(() => {
    const timer = setTimeout(loadWeather, 0);
    return () => clearTimeout(timer);
  }, [loadWeather]);

  useEffect(() => {
    const receiveLiveViewStatus = (event) => {
      if (
        event.origin !== 'http://localhost:4173' &&
        event.origin !== 'http://127.0.0.1:4173' &&
        event.origin !== window.location.origin
      ) return;
      if (event.data?.type === 'live-view:ready') setLiveViewStatus('ready');
      if (event.data?.type === 'live-view:error') setLiveViewStatus('error');
      if (event.data?.type === 'camera-moved' || event.data?.type === 'telemetry-update') {
        const { lat, lng, alt } = event.data;
        if (lat != null && lng != null) {
          setTelemetry(prev => ({
            ...prev,
            lat: Number(lat),
            lng: Number(lng),
            altKm: alt != null ? Math.round(Number(alt) / 1000) : prev.altKm,
          }));
        }
      }
    };
    const receiveFullscreen = () => setLiveViewFullscreen(document.fullscreenElement === liveViewContainerRef.current);
    window.addEventListener('message', receiveLiveViewStatus);
    document.addEventListener('fullscreenchange', receiveFullscreen);
    return () => {
      window.removeEventListener('message', receiveLiveViewStatus);
      document.removeEventListener('fullscreenchange', receiveFullscreen);
    };
  }, []);

  useEffect(() => {
    if (mapWorkspace !== 'gods-eye') return;
    const kickoff = setTimeout(() => {
      setLiveViewStatus('loading');
    }, 0);
    const timer = setTimeout(() => setLiveViewStatus(status => status === 'ready' ? status : 'error'), 12_000);
    return () => {
      clearTimeout(kickoff);
      clearTimeout(timer);
    };
  }, [mapWorkspace, liveViewAttempt]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentLocation) {
        setReport(previous => ({ ...previous, lat: currentLocation.coordinates.lat, lng: currentLocation.coordinates.lng }));
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [currentLocation]);

  const allEvents = useMemo(() => LAYERS.flatMap(layer => enabled[layer.id] ? feeds[layer.id]?.events || [] : []), [feeds, enabled]);
  const visibleEvents = useMemo(() => {
    const cutoff = timeWindow === 'all' || !referenceTime ? 0 : referenceTime - Number(timeWindow) * 3_600_000;
    return allEvents.filter(event => {
      if (coverage === 'state' && event.stateId !== selection.stateId && event.type !== 'weather') return false;
      if ((severityRank[event.severity] || 0) < severityRank[minimumSeverity]) return false;
      const time = Date.parse(event.observedAt || event.effectiveAt || event.updatedAt || 0);
      return !cutoff || !Number.isFinite(time) || time >= cutoff;
    }).sort((a, b) => Date.parse(b.observedAt || b.updatedAt || 0) - Date.parse(a.observedAt || a.updatedAt || 0));
  }, [allEvents, coverage, minimumSeverity, timeWindow, selection.stateId, referenceTime]);

  const categoryCounts = useMemo(() => ({
    all: visibleEvents.length,
    alerts: visibleEvents.filter(e => e.type === 'official_alert').length,
    earthquakes: visibleEvents.filter(e => e.type === 'earthquake').length,
    fires: visibleEvents.filter(e => e.type === 'active_fire').length,
    weather: visibleEvents.filter(e => e.type === 'weather').length,
  }), [visibleEvents]);

  const filteredVisibleEvents = useMemo(() => {
    if (categoryFilter === 'all') return visibleEvents;
    if (categoryFilter === 'alerts') return visibleEvents.filter(e => e.type === 'official_alert');
    if (categoryFilter === 'earthquakes') return visibleEvents.filter(e => e.type === 'earthquake');
    if (categoryFilter === 'fires') return visibleEvents.filter(e => e.type === 'active_fire');
    if (categoryFilter === 'weather') return visibleEvents.filter(e => e.type === 'weather');
    return visibleEvents;
  }, [visibleEvents, categoryFilter]);

  const selectedEvent = visibleEvents.find(event => event.id === selectedId) || null;
  const filteredIncidents = coverage === 'india' ? incidents : incidents.filter(incident => incident.stateId === selection.stateId);
  const selectedIncident = filteredIncidents.find(incident => incident.id === selectedIncidentId) || filteredIncidents[0] || null;
  const activeIncidentId = selectedIncident?.id;

  useEffect(() => {
    onContextEvent?.(selectedEvent);
  }, [selectedEvent, onContextEvent]);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      setAudit([]);
      if (!activeIncidentId) return;
      api(`/api/incidents/${encodeURIComponent(activeIncidentId)}/audit`, { signal: controller.signal })
        .then(data => {
          if (!controller.signal.aborted) setAudit(data.audit);
        })
        .catch(() => {
          if (!controller.signal.aborted) setAudit([]);
        });
    }, 0);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [activeIncidentId, incidents]);

  const mapSelect = (id) => {
    if (id.startsWith('incident:')) {
      setSelectedIncidentId(id.slice(9));
      setWorkflowTab('response');
    } else {
      setSelectedId(id);
      setWorkflowTab('signals');
    }
  };

  const submitReport = async (event) => {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      const data = await api('/api/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: report.type,
          severity: report.severity,
          description: report.description,
          coordinates: { lat: Number(report.lat), lng: Number(report.lng) },
          stateId: selection.stateId,
          observedAt: new Date(report.observedAt).toISOString(),
        }),
      });
      setReport(previous => ({ ...previous, description: '' }));
      await loadIncidents();
      setSelectedIncidentId(data.incident.id);
      setMessage(`${data.incident.id} registered in simulation triage.`);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  };

  const changeIncident = async (path, body) => {
    setBusy(true);
    setMessage('');
    try {
      await api(path, {
        method: path.endsWith('/tasks') || path.endsWith('/notes') ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await loadIncidents();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  };

  const resetDemo = async () => {
    setBusy(true);
    try {
      await api('/api/demo/reset', { method: 'POST' });
      setSelectedIncidentId(null);
      await loadIncidents();
      setMessage('Incident triage database restored to baseline simulation.');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  };

  const mapIncidents = role === 'operator' ? filteredIncidents : [];

  const retryLiveView = () => {
    setLiveViewStatus('loading');
    setLiveViewAttempt(attempt => attempt + 1);
  };

  const toggleLiveViewFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await liveViewContainerRef.current?.requestFullscreen();
    } catch {
      setMessage('Fullscreen mode could not be entered. Open in a standalone tab instead.');
    }
  };

  // Quick navigation to fixed cities & overview orbit
  const flyToCity = useCallback((city) => {
    setActiveCityId(city.id);
    setActivePreset('tactical');
    const altKm = Math.round(city.alt / 1000);
    setTelemetry(prev => ({
      ...prev,
      lat: city.lat,
      lng: city.lng,
      altKm,
      resolution: city.resolution,
      city: city.name,
      sector: city.sector,
      preset: 'tactical',
    }));

    // Dispatch message to iframe
    if (iframeRef.current?.contentWindow) {
      const payload = {
        type: 'fly-to-city',
        city: city.id,
        lat: city.lat,
        lng: city.lng,
        alt: city.alt,
        heading: city.heading,
        pitch: city.pitch,
      };
      iframeRef.current.contentWindow.postMessage(payload, '*');
      try {
        iframeRef.current.contentWindow.postMessage(payload, 'http://localhost:4173');
      } catch {
        // Ignored
      }
    }

    // Keep disaster workspace in sync
    if (city.locationId) {
      onSelectLocationId?.(city.locationId);
    } else if (city.stateId) {
      onSelectState?.({ id: city.stateId });
    }

    setReport(prev => ({ ...prev, lat: city.lat, lng: city.lng }));
  }, [onSelectLocationId, onSelectState]);

  // Direct camera fly to coordinates (for events, incidents)
  const flyToCoordinates = useCallback((coords, label) => {
    if (!coords || coords.lat == null || coords.lng == null) return;
    const lat = Number(coords.lat);
    const lng = Number(coords.lng);
    setTelemetry(prev => ({
      ...prev,
      lat,
      lng,
      altKm: 32,
      city: label || 'Tactical Target',
      sector: 'Incident Coordinates',
    }));

    if (iframeRef.current?.contentWindow) {
      const payload = {
        type: 'fly-to-city',
        lat,
        lng,
        alt: 32000,
        pitch: -52,
        heading: 0,
      };
      iframeRef.current.contentWindow.postMessage(payload, '*');
      try {
        iframeRef.current.contentWindow.postMessage(payload, 'http://localhost:4173');
      } catch {
        // Ignored
      }
    }

    setReport(prev => ({ ...prev, lat, lng }));
  }, []);

  const copyCoordinates = useCallback((coords) => {
    if (!coords || coords.lat == null || coords.lng == null) return;
    const text = `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`;
    navigator.clipboard?.writeText(text).then(() => {
      setCopiedCoords(true);
      setTimeout(() => setCopiedCoords(false), 2000);
    }).catch(() => {});
  }, []);

  // Camera presets selector
  const selectCameraPreset = useCallback((preset) => {
    setActivePreset(preset.id);
    const currentCity = CITIES.find(c => c.id === activeCityId) || CITIES[0];
    const targetAlt = Math.round(currentCity.alt * preset.altMultiplier);
    const targetAltKm = Math.round(targetAlt / 1000);

    setTelemetry(prev => ({
      ...prev,
      altKm: targetAltKm,
      preset: preset.id,
    }));

    if (iframeRef.current?.contentWindow) {
      const payload = {
        type: 'set-camera-mode',
        mode: preset.id,
        pitch: preset.pitch,
        alt: targetAlt,
        lat: currentCity.lat,
        lng: currentCity.lng,
        heading: currentCity.heading || 0,
      };
      iframeRef.current.contentWindow.postMessage(payload, '*');
    }
  }, [activeCityId]);

  // Sync iframe on initial ready
  useEffect(() => {
    if (liveViewStatus === 'ready' && activeCityId) {
      const currentCity = CITIES.find(c => c.id === activeCityId);
      if (currentCity && iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage({
          type: 'fly-to-city',
          city: currentCity.id,
          lat: currentCity.lat,
          lng: currentCity.lng,
          alt: currentCity.alt,
          heading: currentCity.heading,
          pitch: currentCity.pitch,
        }, '*');
      }
    }
  }, [liveViewStatus, activeCityId]);

  const activeCity = useMemo(() => CITIES.find(c => c.id === activeCityId) || CITIES[0], [activeCityId]);

  return (
    <section className="live-ops" aria-label="Live disaster operations prototype">
      {/* MAP VIEWPORT & COMMAND HUD */}
      <div className="live-ops-map">
        {/* Sleek City Quick-Navigation Command Bar */}
        <header className="ops-command-bar" aria-label="Target sector quick navigation and view controls">
          {/* City Quick-Navigation Track */}
          <div className="city-nav-track" role="toolbar" aria-label="Fixed city sectors quick navigation">
            <div className="city-nav-label">
              <Crosshair size={12} className="text-cyan animate-pulse" />
              <span>SECTORS</span>
            </div>
            <div className="city-nav-buttons">
              {CITIES.map((city) => {
                const Icon = city.icon;
                const isActive = activeCityId === city.id;
                return (
                  <button
                    type="button"
                    key={city.id}
                    className={`city-nav-btn city-theme-${city.id} ${isActive ? 'active' : ''}`}
                    onClick={() => flyToCity(city)}
                    title={`Focus satellite telemetry on ${city.name} (${city.sector})`}
                    style={{
                      '--city-color': city.color,
                      '--city-glow': city.glowColor,
                    }}
                  >
                    <span className="city-nav-icon"><Icon size={13} style={{ color: city.color }} /></span>
                    <span className="city-nav-info">
                      <span className="city-nav-name">{city.name}</span>
                      <span className="city-nav-subtag">{city.tag}</span>
                    </span>
                    <span className="city-nav-badge" style={{ borderColor: `${city.color}44`, color: city.color }}>
                      {city.badge}
                    </span>
                    {isActive && (
                      <span
                        className="city-nav-pulse"
                        style={{ background: city.color, boxShadow: `0 0 10px ${city.color}` }}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="command-bar-divider" />

          {/* Map Workspace Switcher */}
          <div className="map-workspace-switch" role="group" aria-label="Map view mode">
            <button
              type="button"
              className={mapWorkspace === 'disaster' ? 'active' : ''}
              onClick={() => setMapWorkspace('disaster')}
            >
              <Map size={13} />
              <span>Tactical Map</span>
            </button>
            <button
              type="button"
              className={mapWorkspace === 'gods-eye' ? 'active' : ''}
              onClick={() => setMapWorkspace('gods-eye')}
            >
              <Globe2 size={13} />
              <span>Live Satellite</span>
            </button>
          </div>

          <div className="command-bar-divider" />

          {/* Camera View Presets */}
          <div className="camera-presets-track" role="group" aria-label="Camera angles">
            {CAMERA_PRESETS.map((preset) => {
              const Icon = preset.icon;
              const isActive = activePreset === preset.id;
              return (
                <button
                  type="button"
                  key={preset.id}
                  className={`camera-preset-btn ${isActive ? 'active' : ''}`}
                  onClick={() => selectCameraPreset(preset)}
                  title={preset.label}
                >
                  <Icon size={12} />
                  <span>{preset.label}</span>
                </button>
              );
            })}
          </div>

          {/* Action Controls */}
          <div className="command-bar-actions">
            <button
              type="button"
              className="cmd-icon-btn"
              onClick={mapWorkspace === 'gods-eye' ? retryLiveView : refreshAll}
              disabled={busy}
              title="Reload imagery and telemetry feeds"
              aria-label="Reload feed"
            >
              <RefreshCw size={13} className={busy ? 'spin' : ''} />
            </button>
            {mapWorkspace === 'gods-eye' && (
              <>
                <button
                  type="button"
                  className={`cmd-icon-btn ${liveViewFullscreen ? 'active' : ''}`}
                  onClick={toggleLiveViewFullscreen}
                  title={liveViewFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                  aria-label="Toggle fullscreen"
                >
                  <Maximize2 size={13} />
                </button>
                <a
                  href={liveViewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="cmd-icon-btn"
                  title="Open Live View in standalone window"
                  aria-label="Open in new window"
                >
                  <ExternalLink size={13} />
                </a>
              </>
            )}
          </div>
        </header>

        {/* Map Workspace Content */}
        {mapWorkspace === 'disaster' ? (
          <div className="map-workspace-content map-workspace-disaster">
            <IndiaGlobe
              selection={selection}
              onSelectState={onSelectState}
              selectedLocationId={selection.locationId}
              onSelectLocationId={onSelectLocationId}
              mode="operations"
              hazardEvents={visibleEvents}
              incidents={mapIncidents}
              selectedHazardId={selectedId}
              onSelectHazard={mapSelect}
              onCoordinatePick={({ lat, lng }) => setReport(previous => ({ ...previous, lat, lng }))}
            />
            <div className="live-ops-legend" aria-label="Map legend">
              <span><i className="alert" /> CAP Alert</span>
              <span><i className="quake" /> USGS Quake</span>
              <span><i className="fire" /> FIRMS Hotspot</span>
              {role === 'operator' && <span><i className="report" /> Demo Report</span>}
            </div>
          </div>
        ) : (
          <div className="gods-eye-embed map-workspace-content" ref={liveViewContainerRef}>
            {liveViewStatus !== 'ready' && (
              <div className={`gods-eye-loading ${liveViewStatus}`} role={liveViewStatus === 'error' ? 'alert' : 'status'}>
                <div className="live-view-loader-mark">
                  <Globe2 size={36} />
                  <i />
                </div>
                <strong>{liveViewStatus === 'error' ? 'LIVE VIEW SERVICE DISCONNECTED' : 'INITIALIZING SATELLITE FEED'}</strong>
                <span>
                  {liveViewStatus === 'error'
                    ? 'Port 4173 service unavailable. Confirm local Live View server is running.'
                    : 'Streaming high-resolution ArcGIS imagery & planetary coordinates'}
                </span>
                {liveViewStatus === 'error' && (
                  <button type="button" onClick={retryLiveView} className="retry-btn">
                    <RotateCcw size={13} /> Reconnect Feed
                  </button>
                )}
              </div>
            )}
            <iframe
              ref={iframeRef}
              key={liveViewAttempt}
              src={liveViewUrl}
              title="Live View planetary operations globe"
              allow="geolocation; microphone"
              loading="eager"
              referrerPolicy="strict-origin"
              onLoad={() => setLiveViewStatus('ready')}
            />
          </div>
        )}

        {/* Professional Glassmorphic Telemetry Overlay */}
        <div className="ops-telemetry-hud" aria-label="Real-time telemetry and imagery provider status">
          <div className="telemetry-cell telemetry-sector">
            <div className="telemetry-label"><MapPin size={10} /> TARGET SECTOR</div>
            <div className="telemetry-value highlight" style={{ color: activeCity.color }}>{activeCity.name}</div>
            <div className="telemetry-meta">{activeCity.sector}</div>
          </div>

          <div className="telemetry-sep" />

          <div
            className="telemetry-cell telemetry-coordinates clickable"
            onClick={() => copyCoordinates({ lat: telemetry.lat, lng: telemetry.lng })}
            title="Click to copy coordinates to clipboard"
          >
            <div className="telemetry-label">
              <LocateFixed size={10} /> POSITION & ALTITUDE
              {copiedCoords ? (
                <span className="hud-copy-badge copied"><Check size={8} /> COPIED</span>
              ) : (
                <span className="hud-copy-badge"><Copy size={8} /> COPY</span>
              )}
            </div>
            <div className="telemetry-value tabular">
              {telemetry.lat.toFixed(4)}°N · {telemetry.lng.toFixed(4)}°E
            </div>
            <div className="telemetry-meta tabular">
              ALT {telemetry.altKm >= 1000 ? `${(telemetry.altKm / 1000).toFixed(1)}k` : `${telemetry.altKm}`} KM MSL · {activePreset.toUpperCase()}
            </div>
          </div>

          <div className="telemetry-sep" />

          <div className="telemetry-cell telemetry-sensor">
            <div className="telemetry-label"><Radio size={10} /> SATELLITE PROVIDER</div>
            <div className="telemetry-value sensor-badge">
              <span className="live-pulse-dot" /> ArcGIS World Imagery
            </div>
            <div className="telemetry-meta">{telemetry.resolution}</div>
          </div>

          <div className="telemetry-sep" />

          <div className="telemetry-cell telemetry-time">
            <div className="telemetry-label"><Clock3 size={10} /> MISSION CLOCKS</div>
            <div className="telemetry-value tabular">
              {clock.ist} <span className="time-tz">IST</span>
            </div>
            <div className="telemetry-meta tabular">
              {clock.utc} <span className="time-tz">UTC</span>
            </div>
          </div>

          <div className="telemetry-sep" />

          <div className="telemetry-cell telemetry-layers">
            <div className="telemetry-label"><Activity size={10} /> SENSORS (CLICK TO TOGGLE)</div>
            <div className="telemetry-layer-tags">
              <button
                type="button"
                className={`telemetry-tag tag-cap ${enabled.alerts ? 'active' : ''}`}
                onClick={() => setEnabled(p => ({ ...p, alerts: !p.alerts }))}
                title="Toggle Official CAP alerts"
              >
                <i className="tag-dot" /> CAP
              </button>
              <button
                type="button"
                className={`telemetry-tag tag-firms ${enabled.fires ? 'active' : ''}`}
                onClick={() => setEnabled(p => ({ ...p, fires: !p.fires }))}
                title="Toggle NASA FIRMS thermal hotspots"
              >
                <i className="tag-dot" /> FIRMS
              </button>
              <button
                type="button"
                className={`telemetry-tag tag-usgs ${enabled.earthquakes ? 'active' : ''}`}
                onClick={() => setEnabled(p => ({ ...p, earthquakes: !p.earthquakes }))}
                title="Toggle USGS earthquakes"
              >
                <i className="tag-dot" /> USGS
              </button>
              <button
                type="button"
                className={`telemetry-tag tag-radar ${enabled.weather ? 'active' : ''}`}
                onClick={() => setEnabled(p => ({ ...p, weather: !p.weather }))}
                title="Toggle Open-Meteo weather radar"
              >
                <i className="tag-dot" /> RADAR
              </button>
            </div>
            <div className="telemetry-meta flex items-center gap-2">
              <span className="telemetry-spectrum" aria-hidden="true">
                <i /><i /><i /><i />
              </span>
              <span>{visibleEvents.length} active detections</span>
            </div>
          </div>
        </div>
      </div>

      {/* OPERATIONS CONTROL CONSOLE */}
      <aside className="ops-console">
        <div className="ops-system-banner">
          <span className="banner-pulse" />
          <span className="banner-title">CRISIS OPERATIONS DESK</span>
          <span className="banner-badge"><Zap size={9} /> LIVE STREAM</span>
        </div>

        <header className="ops-header">
          <div>
            <span className="ops-kicker">Multi-Agency Telemetry</span>
            <h1>Operational Picture</h1>
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={refreshAll}
            disabled={busy}
            aria-label="Refresh all feeds"
            title="Refresh all real-time feeds"
          >
            <RefreshCw size={16} className={busy ? 'spin' : ''} />
          </button>
        </header>

        <div className="role-switch" role="group" aria-label="Demo role">
          <button
            type="button"
            className={role === 'public' ? 'active' : ''}
            onClick={() => setRole('public')}
          >
            Public Observation
          </button>
          <button
            type="button"
            className={role === 'operator' ? 'active' : ''}
            onClick={() => {
              setRole('operator');
              setWorkflowTab('response');
            }}
          >
            Incident Commander
          </button>
        </div>

        <nav className="ops-tabs" aria-label="Operations sections">
          <button
            type="button"
            className={workflowTab === 'signals' ? 'active' : ''}
            onClick={() => setWorkflowTab('signals')}
          >
            Live Signals <span className="tab-badge">{visibleEvents.length}</span>
          </button>
          <button
            type="button"
            className={workflowTab === 'response' ? 'active' : ''}
            onClick={() => setWorkflowTab('response')}
          >
            {role === 'public' ? 'Report Incident' : 'Incident Queue'}{' '}
            <span className="tab-badge">{filteredIncidents.length}</span>
          </button>
        </nav>

        {message && <div className="ops-message" role="status">{message}</div>}

        {/* WORKFLOW TAB: LIVE SIGNALS */}
        {workflowTab === 'signals' && (
          <div className="ops-scroll">
            {/* Interactive Layer Switches */}
            <div className="signal-rail">
              {LAYERS.map(({ id, label, icon: Icon, source, tag, color }) => {
                const feed = feeds[id]?.feed || { status: 'unavailable', source };
                const count = feeds[id]?.events?.length ?? 0;
                return (
                  <label className={`signal-row ${feed.status}`} key={id} style={{ '--layer-color': color }}>
                    <input
                      type="checkbox"
                      checked={enabled[id]}
                      onChange={event => setEnabled(previous => ({ ...previous, [id]: event.target.checked }))}
                    />
                    <span className="signal-icon-box" style={{ background: `${color}18`, color }}>
                      <Icon size={15} />
                    </span>
                    <span className="signal-content">
                      <span className="signal-label-row">
                        <strong>{label}</strong>
                        <span className="signal-source-badge" style={{ borderColor: `${color}40`, color }}>{tag}</span>
                      </span>
                      <small className="signal-meta">
                        {feed.source || source} · {statusLabel(feed.status)}
                      </small>
                      {feed.fetchedAt && (
                        <small className="feed-time">Updated {prettyTime(feed.fetchedAt)}</small>
                      )}
                      {feed.error && <small className="feed-error">{feed.error}</small>}
                    </span>
                    <b className="signal-count" style={{ color: count > 0 ? color : undefined }}>
                      {feed.status === 'unavailable' ? '—' : count}
                    </b>
                  </label>
                );
              })}
            </div>

            {/* Quick Filter Chips */}
            <div className="filter-chips-rail" role="toolbar" aria-label="Hazard category quick filters">
              <button
                type="button"
                className={`filter-chip chip-all ${categoryFilter === 'all' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('all')}
              >
                All <span className="chip-count">{categoryCounts.all}</span>
              </button>
              <button
                type="button"
                className={`filter-chip chip-alerts ${categoryFilter === 'alerts' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('alerts')}
              >
                <ShieldAlert size={11} /> Alerts <span className="chip-count">{categoryCounts.alerts}</span>
              </button>
              <button
                type="button"
                className={`filter-chip chip-fires ${categoryFilter === 'fires' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('fires')}
              >
                <Flame size={11} /> Hotspots <span className="chip-count">{categoryCounts.fires}</span>
              </button>
              <button
                type="button"
                className={`filter-chip chip-quakes ${categoryFilter === 'earthquakes' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('earthquakes')}
              >
                <Activity size={11} /> Seismic <span className="chip-count">{categoryCounts.earthquakes}</span>
              </button>
              <button
                type="button"
                className={`filter-chip chip-weather ${categoryFilter === 'weather' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('weather')}
              >
                <Radio size={11} /> Radar <span className="chip-count">{categoryCounts.weather}</span>
              </button>
            </div>

            {/* Advanced Filters */}
            <div className="ops-filters">
              <label>
                Coverage
                <select value={coverage} onChange={event => setCoverage(event.target.value)}>
                  <option value="state">Selected State ({selection.stateId})</option>
                  <option value="india">All India</option>
                </select>
              </label>
              <label>
                Severity Filter
                <select value={minimumSeverity} onChange={event => setMinimumSeverity(event.target.value)}>
                  <option value="info">All Signals (Info+)</option>
                  <option value="moderate">Moderate & Critical</option>
                  <option value="severe">Severe / Extreme Only</option>
                </select>
              </label>
              <label>
                Time Window
                <select value={timeWindow} onChange={event => setTimeWindow(event.target.value)}>
                  <option value="24">Past 24 Hours</option>
                  <option value="72">Past 72 Hours</option>
                  <option value="all">All Available</option>
                </select>
              </label>
            </div>

            <div className="event-heading">
              <span>ACTIVE DETECTIONS</span>
              <b>{filteredVisibleEvents.length} OF {visibleEvents.length} SIGNALS</b>
            </div>

            {!filteredVisibleEvents.length && (
              <div className="ops-empty">
                <Radio size={24} />
                <strong>No Active Signals</strong>
                <p>No matching hazards in the current category or filter criteria. Adjust filters above to inspect more signals.</p>
              </div>
            )}

            <div className="event-list">
              {filteredVisibleEvents.map(event => (
                <div
                  key={event.id}
                  className={`event-card-wrapper event-type-${event.type} ${selectedId === event.id ? 'selected' : ''}`}
                >
                  <button
                    type="button"
                    className="event-card-main"
                    onClick={() => setSelectedId(event.id)}
                  >
                    <span className={`event-type-icon event-${event.type}`}>
                      {event.type === 'active_fire' ? <Flame size={13} /> :
                       event.type === 'earthquake' ? <Activity size={13} /> :
                       event.type === 'weather' ? <Radio size={13} /> :
                       <ShieldAlert size={13} />}
                    </span>
                    <span className="event-body">
                      <strong className="event-title">{event.title}</strong>
                      <small className="event-area">{event.area || event.summary}</small>
                      <span className="event-footer">
                        <em>{event.source}</em>
                        <span className="event-dot-sep">·</span>
                        <time className="tabular">{prettyTime(event.observedAt || event.updatedAt)}</time>
                      </span>
                    </span>
                    <b className={`severity ${event.severity}`}>{event.severity}</b>
                  </button>

                  {event.coordinates?.lat && event.coordinates?.lng && (
                    <button
                      type="button"
                      className="event-locate-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedId(event.id);
                        flyToCoordinates(event.coordinates, event.title);
                      }}
                      title="Fly camera to this hazard"
                      aria-label="Fly camera to coordinates"
                    >
                      <Crosshair size={13} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {selectedEvent && (
              <article className={`event-detail event-detail-${selectedEvent.type}`}>
                <div className="event-detail-title">
                  <div>
                    <span className="detail-tag">{selectedEvent.verification || 'VERIFIED INCIDENT'}</span>
                    <h2>{selectedEvent.title}</h2>
                  </div>
                  <b className={`severity ${selectedEvent.severity}`}>{selectedEvent.severity}</b>
                </div>
                <p className="detail-summary">{selectedEvent.summary}</p>
                <dl className="detail-meta-grid">
                  <div>
                    <dt>Source Authority</dt>
                    <dd>{selectedEvent.source}</dd>
                  </div>
                  <div>
                    <dt>Detection Time</dt>
                    <dd className="tabular">{prettyTime(selectedEvent.observedAt)}</dd>
                  </div>
                  <div>
                    <dt>System Updated</dt>
                    <dd className="tabular">{prettyTime(selectedEvent.updatedAt)}</dd>
                  </div>
                  <div>
                    <dt>Region / Sector</dt>
                    <dd>{selectedEvent.stateId || 'National Subcontinent'}</dd>
                  </div>
                </dl>
                <div className="detail-actions">
                  {selectedEvent.coordinates?.lat && selectedEvent.coordinates?.lng && (
                    <>
                      <button
                        type="button"
                        className="btn-detail-action"
                        onClick={() => flyToCoordinates(selectedEvent.coordinates, selectedEvent.title)}
                      >
                        <Crosshair size={13} /> Fly Camera to Coordinates
                      </button>
                      <button
                        type="button"
                        className="btn-detail-secondary"
                        onClick={() => copyCoordinates(selectedEvent.coordinates)}
                      >
                        {copiedCoords ? <><Check size={13} /> Coords Copied</> : <><Copy size={13} /> Copy Coords</>}
                      </button>
                    </>
                  )}
                  {selectedEvent.sourceUrl && (
                    <a href={selectedEvent.sourceUrl} target="_blank" rel="noreferrer" className="detail-link">
                      Official Bulletin <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </article>
            )}
          </div>
        )}

        {/* WORKFLOW TAB: PUBLIC REPORT */}
        {workflowTab === 'response' && role === 'public' && (
          <div className="ops-scroll report-pane">
            <div className="safety-note">
              <ShieldAlert size={20} />
              <div>
                <strong>Simulation Sandbox Mode</strong>
                <p>This report is processed in a simulated dispatch queue for testing. Emergency services are not contacted.</p>
              </div>
            </div>

            <form onSubmit={submitReport} className="report-form">
              <div className="form-grid">
                <label>
                  Hazard Category
                  <select value={report.type} onChange={event => setReport({ ...report, type: event.target.value })}>
                    <option value="flood">Flood / Inundation</option>
                    <option value="cyclone">Cyclone / Storm</option>
                    <option value="fire">Wildfire / Hotspot</option>
                    <option value="earthquake">Earthquake</option>
                    <option value="landslide">Landslide</option>
                    <option value="heatwave">Extreme Heatwave</option>
                    <option value="storm">Severe Thunderstorm</option>
                    <option value="other">Other Incident</option>
                  </select>
                </label>
                <label>
                  Observed Severity
                  <select value={report.severity} onChange={event => setReport({ ...report, severity: event.target.value })}>
                    <option value="minor">Minor Incident</option>
                    <option value="moderate">Moderate Warning</option>
                    <option value="severe">Severe Emergency</option>
                  </select>
                </label>
              </div>

              <label>
                Observation Timestamp
                <input
                  type="datetime-local"
                  value={report.observedAt}
                  onChange={event => setReport({ ...report, observedAt: event.target.value })}
                  required
                />
              </label>

              <div className="form-grid">
                <label>
                  Latitude
                  <input
                    type="number"
                    step="any"
                    min="-90"
                    max="90"
                    value={report.lat}
                    onChange={event => setReport({ ...report, lat: event.target.value })}
                    required
                  />
                </label>
                <label>
                  Longitude
                  <input
                    type="number"
                    step="any"
                    min="-180"
                    max="180"
                    value={report.lng}
                    onChange={event => setReport({ ...report, lng: event.target.value })}
                    required
                  />
                </label>
              </div>

              <label>
                Eyewitness Description
                <textarea
                  maxLength="800"
                  rows="4"
                  value={report.description}
                  onChange={event => setReport({ ...report, description: event.target.value })}
                  placeholder="Describe observable hazard conditions, water levels, road blocks, or damage..."
                  required
                />
              </label>

              <button className="primary-action" disabled={busy}>
                Submit to Dispatch Queue
              </button>
            </form>
          </div>
        )}

        {/* WORKFLOW TAB: OPERATOR RESPONSE QUEUE */}
        {workflowTab === 'response' && role === 'operator' && (
          <div className="ops-scroll response-pane">
            <div className="queue-header">
              <div>
                <Users size={16} />
                <strong>Dispatch & Triage Queue</strong>
              </div>
              <button type="button" onClick={resetDemo} disabled={busy} className="reset-btn">
                Reset Demo
              </button>
            </div>
            <p className="queue-guide">
              Select an incident to triage, dispatch response teams, and log progress to the immutable audit trail.
            </p>

            <label className="queue-coverage-label">
              Queue Coverage
              <select value={coverage} onChange={event => setCoverage(event.target.value)}>
                <option value="state">Selected State ({selection.stateId})</option>
                <option value="india">All India</option>
              </select>
            </label>

            <div className="incident-list">
              {filteredIncidents.map(incident => (
                <button
                  type="button"
                  key={incident.id}
                  aria-pressed={activeIncidentId === incident.id}
                  className={`incident-item ${activeIncidentId === incident.id ? 'selected' : ''}`}
                  onClick={() => setSelectedIncidentId(incident.id)}
                >
                  <span className="incident-text">
                    <strong>{incident.id}</strong>
                    <small>{incident.type} · {incident.description}</small>
                  </span>
                  <b className={`incident-status ${incident.status}`}>{statusLabel(incident.status)}</b>
                </button>
              ))}
            </div>

            {!filteredIncidents.length && (
              <div className="ops-empty">
                <CheckCircle2 size={24} />
                <strong>Queue Clear</strong>
                <p>No open incidents requiring triage for this regional coverage.</p>
              </div>
            )}

            {selectedIncident && (
              <IncidentWorkbench
                key={selectedIncident.id}
                incident={selectedIncident}
                teams={teams}
                tasks={tasks.filter(task => task.incidentId === selectedIncident.id)}
                audit={audit}
                busy={busy}
                onChange={changeIncident}
                onLocate={flyToCoordinates}
              />
            )}
          </div>
        )}
      </aside>
    </section>
  );
}

function IncidentWorkbench({ incident, teams, tasks, audit, busy, onChange, onLocate }) {
  const [note, setNote] = useState('');
  const [teamId, setTeamId] = useState('team-alpha');
  const act = async (path, status) => {
    await onChange(path, { status, note });
    setNote('');
  };
  const task = tasks[0];

  return (
    <article className="incident-workbench">
      <header>
        <div>
          <span className="workbench-tag">
            {['submitted', 'triaged'].includes(incident.status)
              ? 'Unverified Incident Report'
              : incident.status === 'rejected'
              ? 'Rejected Report'
              : 'Verified Emergency Response'}
          </span>
          <h2>{incident.id}</h2>
        </div>
        <b className={`incident-status ${incident.status}`}>{statusLabel(incident.status)}</b>
      </header>

      {/* Interactive Lifecycle Pipeline */}
      <div className="incident-pipeline" aria-label="Incident response stage">
        <div className={`pipeline-step ${['submitted', 'triaged', 'verified', 'assigned', 'in_progress', 'completed'].includes(incident.status) ? 'active' : ''}`}>
          <span className="step-node" />
          <span className="step-label">Reported</span>
        </div>
        <div className="pipeline-line" />
        <div className={`pipeline-step ${['triaged', 'verified', 'assigned', 'in_progress', 'completed'].includes(incident.status) ? 'active' : ''}`}>
          <span className="step-node" />
          <span className="step-label">Triaged</span>
        </div>
        <div className="pipeline-line" />
        <div className={`pipeline-step ${['verified', 'assigned', 'in_progress', 'completed'].includes(incident.status) ? 'active' : ''}`}>
          <span className="step-node" />
          <span className="step-label">Verified</span>
        </div>
        <div className="pipeline-line" />
        <div className={`pipeline-step ${['assigned', 'in_progress', 'completed'].includes(incident.status) ? 'active' : ''}`}>
          <span className="step-node" />
          <span className="step-label">Dispatched</span>
        </div>
        <div className="pipeline-line" />
        <div className={`pipeline-step ${['completed', 'resolved'].includes(incident.status) ? 'active' : ''}`}>
          <span className="step-node" />
          <span className="step-label">Resolved</span>
        </div>
      </div>

      <p className="workbench-desc">{incident.description}</p>

      <div className="incident-coords-bar">
        <div className="incident-coords">
          <MapPin size={13} className="text-cyan" />
          <span className="tabular">{incident.coordinates.lat.toFixed(4)}°N, {incident.coordinates.lng.toFixed(4)}°E</span>
          <span className="sep">·</span>
          <span className="tabular">{prettyTime(incident.observedAt)}</span>
        </div>
        {onLocate && (
          <button
            type="button"
            className="btn-locate-incident"
            onClick={() => onLocate(incident.coordinates, incident.id)}
            title="Fly camera to incident location"
          >
            <Crosshair size={12} /> Focus Map
          </button>
        )}
      </div>

      <label className="note-label">
        Operator Dispatch Note
        <textarea
          rows="2"
          maxLength="400"
          value={note}
          onChange={event => setNote(event.target.value)}
          placeholder="Enter operational log note..."
        />
      </label>

      <div className="workflow-actions">
        <button
          type="button"
          disabled={busy || !note.trim()}
          onClick={() => onChange(`/api/incidents/${incident.id}/notes`, { note }).then(() => setNote(''))}
          className="btn-note"
        >
          Add Log Note
        </button>
        {incident.status === 'submitted' && (
          <>
            <button type="button" disabled={busy} onClick={() => act(`/api/incidents/${incident.id}`, 'triaged')} className="btn-action">
              Begin Triage
            </button>
            <button type="button" className="btn-danger" disabled={busy} onClick={() => act(`/api/incidents/${incident.id}`, 'rejected')}>
              Reject
            </button>
          </>
        )}
        {incident.status === 'triaged' && (
          <>
            <button type="button" disabled={busy} onClick={() => act(`/api/incidents/${incident.id}`, 'verified')} className="btn-action">
              Verify Incident
            </button>
            <button type="button" className="btn-danger" disabled={busy} onClick={() => act(`/api/incidents/${incident.id}`, 'rejected')}>
              Reject
            </button>
          </>
        )}
        {incident.status === 'verified' && (
          <>
            <select value={teamId} onChange={event => setTeamId(event.target.value)} className="select-team">
              {teams.map(team => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </select>
            <button type="button" disabled={busy} onClick={() => onChange(`/api/incidents/${incident.id}/tasks`, { teamId, note })} className="btn-action btn-dispatch">
              Dispatch Team
            </button>
          </>
        )}
        {incident.status === 'assigned' && task && (
          <button type="button" disabled={busy} onClick={() => act(`/api/tasks/${task.id}`, 'in_progress')} className="btn-action btn-field-start">
            Initiate Field Response
          </button>
        )}
        {incident.status === 'in_progress' && task && (
          <button type="button" disabled={busy} onClick={() => act(`/api/tasks/${task.id}`, 'completed')} className="btn-success">
            Mark Incident Resolved
          </button>
        )}
      </div>

      <div className="audit-log">
        <strong><Clock3 size={13} /> Mission Log & Audit Trail</strong>
        <div className="audit-list">
          {audit.map(item => (
            <div key={item.id} className="audit-item">
              <i className="audit-dot" />
              <div className="audit-content">
                <b className="audit-action">{statusLabel(item.action)}</b>
                <small className="audit-meta">
                  {item.actor} · <time className="tabular">{prettyTime(item.at)}</time>
                  {item.note ? ` · ${item.note}` : ''}
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
