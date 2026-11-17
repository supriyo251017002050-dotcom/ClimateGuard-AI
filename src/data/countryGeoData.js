// Coordinates and climate risk highlights for 3D Globe countries
// Used for raycasting, tooltips, and camera focus

export const COUNTRIES_DATA = [
  {
    id: 'india',
    name: 'India',
    flag: '🇮🇳',
    lat: 20.5937,
    lng: 78.9629,
    climateIndicator: 'Extreme Monsoons, Cyclones & Heatwaves',
    riskLevel: 'High Risk (Tropical & Subtropical)',
    isPrototypeTarget: true,
    statesCount: 28,
    utCount: 8,
    color: '#38bdf8'
  },
  {
    id: 'japan',
    name: 'Japan',
    flag: '🇯🇵',
    lat: 36.2048,
    lng: 138.2529,
    climateIndicator: 'Pacific Typhoons, Tsunamis & Seismicity',
    riskLevel: 'High Geohazard Risk',
    color: '#f43f5e'
  },
  {
    id: 'usa',
    name: 'United States',
    flag: '🇺🇸',
    lat: 37.0902,
    lng: -95.7129,
    climateIndicator: 'Hurricanes, Wildfires, Tornado Alley & Heatwaves',
    riskLevel: 'Varied Multi-Hazard',
    color: '#3b82f6'
  },
  {
    id: 'brazil',
    name: 'Brazil',
    flag: '🇧🇷',
    lat: -14.2350,
    lng: -51.9253,
    climateIndicator: 'Amazonian Drought, Flash Floods & Landslides',
    riskLevel: 'Medium-High',
    color: '#10b981'
  },
  {
    id: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    lat: -25.2744,
    lng: 133.7751,
    climateIndicator: 'Bushfires, Coral Bleaching & Severe Cyclones',
    riskLevel: 'High Climate Vulnerability',
    color: '#f59e0b'
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    lat: 55.3781,
    lng: -3.4360,
    climateIndicator: 'Atlantic Storm Depressions & Riverine Floods',
    riskLevel: 'Moderate',
    color: '#8b5cf6'
  },
  {
    id: 'egypt',
    name: 'Egypt',
    flag: '🇪🇬',
    lat: 26.8206,
    lng: 30.8025,
    climateIndicator: 'Nile Delta Subsidence, Desertification & Heat',
    riskLevel: 'High Vulnerability',
    color: '#d97706'
  },
  {
    id: 'indonesia',
    name: 'Indonesia',
    flag: '🇮🇩',
    lat: -0.7893,
    lng: 113.9213,
    climateIndicator: 'Volcanic Eruptions, Tsunamis, Equatorial Floods',
    riskLevel: 'Extreme Multi-Hazard',
    color: '#06b6d4'
  },
  {
    id: 'germany',
    name: 'Germany',
    flag: '🇩🇪',
    lat: 51.1657,
    lng: 10.4515,
    climateIndicator: 'Rhine Valley Floods & European Summer Heatwaves',
    riskLevel: 'Moderate',
    color: '#6366f1'
  },
  {
    id: 'south-africa',
    name: 'South Africa',
    flag: '🇿🇦',
    lat: -30.5595,
    lng: 22.9375,
    climateIndicator: 'Durban Flash Floods & Western Cape Droughts',
    riskLevel: 'Medium-High',
    color: '#84cc16'
  }
];
