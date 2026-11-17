// Comprehensive pre-fed dataset for ClimateGuard AI's 5 Prototype Locations
// Kolkata, Mumbai, Bihar, Delhi, Goa
// Incorporating 8-Reference System, DisasterLens Timeline, Formation Flows, and Risk Engine

export const LOCATIONS_DATA = {
  kolkata: {
    id: 'kolkata',
    name: 'Kolkata',
    state: 'West Bengal',
    region: 'Eastern India',
    coordinates: { lat: 22.5726, lng: 88.3639 },
    heroImage: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80',
    summary: 'A low-lying deltaic megacity situated on the east bank of the Hooghly River. Highly exposed to cyclonic storm surges, extreme monsoon waterlogging, and projected 21st-century sea-level rise.',
    stats: {
      elevation: '1.5 – 9 meters above MSL',
      population: '14.9 Million (Metropolitan)',
      density: '24,000 people / km²',
      avgMonsoonRainfall: '1,582 mm / year',
      climateType: 'Tropical Wet & Dry (Aw)'
    },
    riskEngine: {
      overallScore: 84,
      riskLevel: 'High',
      components: [
        { name: 'Hazard Intensity', weight: '30%', score: 88, desc: 'High frequency of severe Bay of Bengal cyclonic storms and intense monsoon cloudbursts.' },
        { name: 'Exposure', weight: '25%', score: 86, desc: 'Densely built deltaic floodplains, slums, and heritage colonial drainage corridors.' },
        { name: 'Vulnerability', weight: '25%', score: 82, desc: 'High percentage of economically marginalized population residing in low-elevation settlements.' },
        { name: 'Infrastructure Deficit', weight: '10%', score: 80, desc: 'Aging British-era combined brick sewer network struggling with high-tide lockouts.' },
        { name: 'Preparedness Capacity', weight: '10%', score: 72, desc: 'Active Kolkata Municipal Corp pumping stations, but evacuation strain during super cyclones.' }
      ]
    },
    hazards: [
      {
        id: 'cyclone',
        name: 'Tropical Cyclone & Storm Surge',
        severity: 'Extreme',
        color: 'rose',
        frequency: '1-2 Major Storms / Year',
        shortDesc: 'Rapidly intensifying low-pressure systems originating in the warm Bay of Bengal.',
        formationFlow: [
          { step: '1', title: 'Warm Ocean Waters', desc: 'Bay of Bengal sea surface temperatures exceed 28-30°C, fueling thermal energy.' },
          { step: '2', title: 'Intense Evaporation', desc: 'Warm moist maritime air rises rapidly, creating a severe low-pressure depression.' },
          { step: '3', title: 'Coriolis Spiral', desc: 'Earth rotation causes inflowing air to spiral violently around a central eye.' },
          { step: '4', title: 'Rapid Intensification', desc: 'Low vertical wind shear causes latent heat release and explosive storm development.' },
          { step: '5', title: 'Landfall & Surge', desc: 'Violent winds drive massive wall of ocean water into Sundarbans and Hooghly Estuary.' }
        ]
      },
      {
        id: 'urban_flood',
        name: 'Urban Waterlogging & Tidal Flooding',
        severity: 'High',
        color: 'blue',
        frequency: 'Multiple Days Every Monsoon',
        shortDesc: 'Severe water stagnation caused by intense monsoon rain coinciding with Hooghly high tides.',
        formationFlow: [
          { step: '1', title: 'Monsoon Cloudburst', desc: 'Intense localized downpours exceed 60-100 mm in a few hours.' },
          { step: '2', title: 'Topographical Bowl', desc: 'Kolkata slopes eastwards away from the Hooghly River, trapping stormwater.' },
          { step: '3', title: 'High Tide Lockout', desc: 'Sluice gates must be closed during high tide to prevent river backflow, halting drainage.' },
          { step: '4', title: 'Canal Congestion', desc: 'East Kolkata canal networks (Circular, Adi Ganga) suffer siltation and reduced capacity.' },
          { step: '5', title: 'Prolonged Stagnation', desc: 'Streets transform into waterways for 24-48 hours, halting transit and commerce.' }
        ]
      },
      {
        id: 'sea_level',
        name: 'Long-term Sea Level Rise',
        severity: 'High',
        color: 'amber',
        frequency: 'Chronic 2030–2100',
        shortDesc: 'Slow-onset deltaic subsidence combined with global oceanic thermal expansion.',
        formationFlow: [
          { step: '1', title: 'Thermal Expansion', desc: 'Global atmospheric warming raises Bay of Bengal sea surface elevation.' },
          { step: '2', title: 'Deltaic Subsidence', desc: 'Natural compaction of Ganges-Brahmaputra silt plus ground water extraction.' },
          { step: '3', title: 'Saline Intrusion', desc: 'Saltwater advances inland into Hooghly and aquifers, threatening drinking water.' },
          { step: '4', title: 'Permanent Inundation Risk', desc: 'High tide levels encroach into low-lying southern metropolitan fringes.' }
        ]
      },
      {
        id: 'heatwave',
        name: 'Humid Heat Extremes',
        severity: 'Medium-High',
        color: 'orange',
        frequency: 'April – June Annually',
        shortDesc: 'Dangerous wet-bulb temperatures driven by extreme relative humidity and concrete thermal mass.',
        formationFlow: [
          { step: '1', title: 'Pre-Monsoon Solar Radiance', desc: 'Intense insolation heats land surface with minimal cloud cover.' },
          { step: '2', title: 'Bay Moisture Inflow', desc: 'Maritime southeasterly winds pump 80%+ humidity into the city air mass.' },
          { step: '3', title: 'Urban Heat Island', desc: 'Dense concrete and lack of green canopies prevent nocturnal radiative cooling.' },
          { step: '4', title: 'Wet-Bulb Stress', desc: 'Human perspiration fails to evaporate, triggering severe heat exhaustion.' }
        ]
      }
    ],
    whyAtRisk: {
      summary: 'Kolkata is at extreme risk because of its precarious geographic deltaic cradle, tidal locking mechanics, historical colonial drainage limits, and immense population density.',
      factors: [
        {
          title: 'Bowl Topography & Natural Slope Dilemma',
          category: 'Geography',
          detail: 'Unlike most riverine cities that drain toward their river, Kolkata\'s natural levee along the Hooghly is higher than the interior city. The land slopes toward the East Kolkata Wetlands, meaning gravity drainage is counter-intuitive and requires complex pumping.'
        },
        {
          title: 'Bay of Bengal Cyclonic Superhighway',
          category: 'Climate',
          detail: 'The funnel-shaped Northern Bay of Bengal acts as an amphitheater for tropical cyclones. Storm surges are magnified by shallow bathymetry and funnel directly into the Sundarbans mangrove buffer and up the Hooghly estuary.'
        },
        {
          title: 'High Tide Lockout Effect',
          category: 'Hydrology',
          detail: 'During monsoon spring tides, the Hooghly River water level rises above the city\'s drainage outlets. Automatic or manual sluice gates must be locked shut to prevent the river from flooding the city, trapping all urban rainwater inside.'
        },
        {
          title: 'Centuries-Old Drainage Infrastructure',
          category: 'Infrastructure',
          detail: 'Kolkata\'s core drainage was laid down in the late 19th century designed for rainfall intensities of 6 mm/hr. Modern storm events regularly deposit 40-70 mm/hr, overwhelming underground brick conduits.'
        },
        {
          title: 'Extreme Population & Wetland Encroachment',
          category: 'Socio-Economic',
          detail: 'Encroachment upon the Ramsar-designated East Kolkata Wetlands has diminished the city\'s natural sponge ecosystem, reducing natural flood detention basins.'
        }
      ]
    },
    disasterLens: {
      timeline: [
        {
          year: '2020',
          name: 'Super Cyclone Amphan',
          type: 'Tropical Cyclone (Category 5 eq.)',
          severity: 'Catastrophic',
          date: 'May 20, 2020',
          whatHappened: 'A massive Category 5 tropical cyclone made landfall in the Sundarbans with wind gusts up to 185 km/h, sweeping directly across Kolkata.',
          scientificCause: 'Record-breaking sea surface temperatures in the central Bay of Bengal (32-34°C) triggered explosive rapid intensification in less than 24 hours.',
          impact: 'Millions left without power for up to 10 days; over 5,000 heritage trees uprooted; transformer stations submerged; $13.5 Billion estimated regional damage.',
          lessonsLearned: 'Power distribution cables must be moved underground; early warning radars enabled 2.5 million coastal evacuations, saving thousands of lives.'
        },
        {
          year: '2021',
          name: 'Cyclone Yaas',
          type: 'Very Severe Cyclonic Storm',
          severity: 'Severe',
          date: 'May 26, 2021',
          whatHappened: 'Made landfall near Dhamra, Odisha, but huge storm surge coincided with Perigean spring tides, causing massive saline inundation across Bengal delta.',
          scientificCause: 'Tidal synchronization with astronomical spring tides elevated river levels by 2-3 meters above normal.',
          impact: 'Embankment breaches in coastal 24 Parganas; waterlogged southern Kolkata neighborhoods for 36 hours; agricultural soil salinity.',
          lessonsLearned: 'Engineered earthen dykes are insufficient; multi-layered mangrove bio-shields and concrete revetments are required.'
        },
        {
          year: '2015',
          name: 'Monsoon Flash Floods (Cyclone Komen)',
          type: 'Extreme Precipitation & Flooding',
          severity: 'High',
          date: 'July – August 2015',
          whatHappened: 'Continuous monsoon depression dumped over 400 mm of rain within 48 hours, paralyzing roads, metro stations, and railway tracks.',
          scientificCause: 'Depression lingering over the Gangetic plain locked moisture delivery continuously for 4 consecutive days.',
          impact: 'All major roads flooded up to 3-4 feet; power supply disconnected to prevent electrocution; hospitals forced to cancel elective surgeries.',
          lessonsLearned: 'Installed heavy-duty automated submersible pumping stations at Palmer Bridge, Ballygunge, and Dhapa outfalls.'
        },
        {
          year: '2007',
          name: 'September Cloudburst Floods',
          type: 'Urban Waterlogging',
          severity: 'Moderate-High',
          date: 'September 2007',
          whatHappened: 'Over 170 mm of torrential rain struck during morning rush hour, submerging Central Avenue and Park Circus under waist-deep waters.',
          scientificCause: 'Mesoscale convective cluster trapped against coastal wind boundary over Kolkata metropolitan area.',
          impact: 'Complete paralysis of city transit for 48 hours; severe economic loss to small commercial markets.',
          lessonsLearned: 'Initiated World Bank funded Kolkata Environmental Improvement Investment Program (KEIIP).'
        }
      ],
      thenVsNow: {
        title: 'Kolkata Risk Evolution (2000 vs 2026)',
        then: {
          period: 'Early 2000s',
          drainage: 'Manual sluice gates, heavily silted colonial canals, 48+ hr stagnation after 50 mm rain.',
          warning: 'Generic 24-hr regional weather bulletins without spatial neighborhood granularity.',
          resilience: 'Overhead power cables, zero underground storm surge barriers, minimal mangrove tracking.'
        },
        now: {
          period: 'Present Day (2026)',
          drainage: 'Over 400 modern high-volume automated pumps, KEIIP upgraded trunk drains, real-time flood sensors.',
          warning: 'IMD Doppler Weather Radar alerts with SMS broadcast & GIS flood-inundation mapping.',
          resilience: 'Subterranean power conduits in heritage districts, disaster shelters across Sunderban buffer.'
        }
      },
      patternAnalysis: [
        { hazard: 'Urban Waterlogging', level: 92, label: 'Very High', color: 'bg-blue-500' },
        { hazard: 'Tropical Cyclones', level: 88, label: 'High', color: 'bg-rose-500' },
        { hazard: 'Storm Surge Inundation', level: 82, label: 'High', color: 'bg-cyan-500' },
        { hazard: 'Humid Heatwaves', level: 68, label: 'Medium-High', color: 'bg-amber-500' },
        { hazard: 'Riverbank Erosion', level: 55, label: 'Moderate', color: 'bg-emerald-500' }
      ]
    },
    references: [
      {
        id: 'ref-1',
        title: 'Vulnerability of Kolkata Metropolitan Area to Increased Precipitation in a Changing Climate',
        organization: 'World Bank Group',
        type: 'Official Report',
        category: 'official',
        year: '2011',
        url: 'https://documents.worldbank.org/en/publication/documents-reports/documentdetail/834561468041134833',
        relevance: 'Comprehensive hydrological, hydraulic, and storm-drainage modeling examining vulnerability to 1-in-50-year rainfall extremes and climate adaptation strategies.'
      },
      {
        id: 'ref-2',
        title: 'World Bank Kolkata Technical Report & Drainage Master Plan',
        organization: 'World Bank Knowledge Repository',
        type: 'Official Technical Report',
        category: 'official',
        year: '2011',
        url: 'https://documents1.worldbank.org/curated/en/834561468041134833/pdf/532820ESW0IN0P000Official0Use0Only0.pdf',
        relevance: 'In-depth engineering analysis of Kolkata’s 5 drainage basins, canal siltation rates, and pumping requirements for future extreme precipitation.'
      },
      {
        id: 'ref-3',
        title: 'Sea-Level Rise and Future Coastal Flooding in Major Indian Coastal Cities',
        organization: 'Nature - Scientific Reports',
        type: 'Peer-Reviewed Research',
        category: 'scientific',
        year: '2025',
        url: 'https://www.nature.com/articles/s41598-025-13394-5',
        relevance: 'Identifies Kolkata and Mumbai as the two most vulnerable Indian coastal megacities for projected compound sea-level-rise and extreme rainfall flooding by 2050.'
      },
      {
        id: 'ref-4',
        title: 'Flooded Future: Global Vulnerability to Sea Level Rise Worse Than Previously Understood',
        organization: 'Climate Central',
        type: 'Scientific Climate Report',
        category: 'scientific',
        year: '2019',
        url: 'https://www.climatecentral.org/report/report-flooded-future-global-vulnerability-to-sea-level-rise-worse-than-previously-understood',
        relevance: 'Using CoastalDEM elevation modeling, highlights that millions in Kolkata’s low-elevation southern sprawl live below projected annual high-tide flood lines.'
      },
      {
        id: 'ref-5',
        title: 'IPCC AR6 WGII Chapter 10: Asia Climate Risk Assessment',
        organization: 'Intergovernmental Panel on Climate Change (IPCC)',
        type: 'International Assessment',
        category: 'official',
        year: '2022',
        url: 'https://www.ipcc.ch/report/ar6/wg2/chapter/chapter-10/',
        relevance: 'Global consensus report documenting escalating cyclonic intensity, compound flood events, and human vulnerability hotspots across South Asian coastal deltas.'
      },
      {
        id: 'ref-6',
        title: 'Rapid Intensification of Super Cyclone Amphan in the Bay of Bengal',
        organization: 'Atmospheric Research / Springer Nature',
        type: 'Peer-Reviewed Study',
        category: 'scientific',
        year: '2021',
        url: 'https://www.nature.com/articles/s41612-021-00176-x',
        relevance: 'Investigates ocean heat content anomalies (>32°C) and anomalous upper-tropospheric divergence that caused Amphan’s explosive Category 5 intensification.'
      },
      {
        id: 'ref-7',
        title: 'West Bengal Disaster Management & Civil Defence Authority Protocol',
        organization: 'Department of Disaster Management, Govt. of West Bengal',
        type: 'Government Operational Document',
        category: 'official',
        year: '2024',
        url: 'https://wbdmd.gov.in/',
        relevance: 'Official standard operating procedures for coastal cyclone alert levels, evacuation routes, multipurpose cyclone shelters, and emergency rations.'
      },
      {
        id: 'ref-8',
        title: 'Verified Reporting: Sundarbans & Kolkata Coastal Inundation Realities',
        organization: 'The Indian Express / Environmental Reporting',
        type: 'Verified News & Field Investigation',
        category: 'news',
        year: '2024',
        url: 'https://indianexpress.com/about/cyclone-amphan/',
        relevance: 'Investigative journalism documenting ongoing post-cyclone rehabilitation, saline aquifer recovery, and urban climate adaptation challenges in Kolkata.'
      }
    ],
    solutions: {
      individual: [
        'Maintain emergency go-bag with copies of ID, battery bank, torch, water purification tablets, and 72-hr non-perishable food.',
        'Elevate ground-floor electrical sockets and switchboards at least 1.2 meters above recorded waterlogging levels.',
        'Subscribe to Kolkata Municipal Corporation (KMC) SMS weather alerts and IMD Mausam app notifications.',
        'Clear rooftop terrace drain outlets before the onset of pre-monsoon squalls to prevent structural roof ponding.'
      ],
      community: [
        'Establish neighborhood storm warden committees in vulnerable wards (Behala, Topsia, Jadavpur, Thanthania).',
        'Protect local waterbodies (pukurs) from illegal garbage disposal to maintain natural stormwater retention capacity.',
        'Coordinate neighborhood pre-cyclone tree pruning with municipal forest and power utility squads.'
      ],
      municipal: [
        'Complete continuous desiltation of the 5 primary canal corridors (Circular, Adi Ganga, Bagjola, Keorapukur, Monikhali).',
        'Construct tidal detention underground reservoirs to buffer stormwater when river sluice gates are locked at high tide.',
        'Transition power distribution networks to waterproof underground GIS cabling across low-lying flood zones.',
        'Restore and legally demarcate the 12,500-hectare East Kolkata Wetlands as non-negotiable flood retention infrastructure.'
      ]
    }
  },

  mumbai: {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    region: 'Western India',
    coordinates: { lat: 18.9220, lng: 72.8347 },
    heroImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
    summary: 'India’s financial capital, built upon reclaimed islands between the Arabian Sea and the Western Ghats. Highly vulnerable to extreme monsoon downpours, high-tide compound flooding, and coastal storms.',
    stats: {
      elevation: '8 – 14 meters above MSL',
      population: '21.3 Million (MMR)',
      density: '31,000 people / km²',
      avgMonsoonRainfall: '2,422 mm / year',
      climateType: 'Tropical Wet & Dry (Monsoon Am)'
    },
    riskEngine: {
      overallScore: 82,
      riskLevel: 'High',
      components: [
        { name: 'Hazard Intensity', weight: '30%', score: 86, desc: 'Frequent 200+ mm/day atmospheric river bursts from the Arabian Sea monsoon trough.' },
        { name: 'Exposure', weight: '25%', score: 88, desc: 'Vast low-lying reclaimed areas (Hindmata, Kurla, Milan Subway) home to millions.' },
        { name: 'Vulnerability', weight: '25%', score: 80, desc: 'Heavy reliance on suburban rail arteries that run along historical estuarine mudflats.' },
        { name: 'Infrastructure Deficit', weight: '10%', score: 76, desc: 'Mithi River encroachment and constrained BRIMSTOWAD storm-water outfalls.' },
        { name: 'Preparedness Capacity', weight: '10%', score: 78, desc: 'Advanced BMC Disaster Management Cell, 6 Doppler radars, and 480 pumping units.' }
      ]
    },
    hazards: [
      {
        id: 'extreme_rain',
        name: 'Extreme Cloudbursts & Urban Floods',
        severity: 'Extreme',
        color: 'rose',
        frequency: '3-5 Incidents Per Monsoon',
        shortDesc: 'Intense orographic moisture streams slamming into the coastal peninsula.',
        formationFlow: [
          { step: '1', title: 'Arabian Sea Moisture Surge', desc: 'Strong southwest monsoon winds carry saturated air masses off the tropical ocean.' },
          { step: '2', title: 'Coastal Convergence', desc: 'Moist winds converge against the Western Ghats barrier, producing heavy cloudburst cells.' },
          { step: '3', title: 'High Tide Coincidence', desc: 'When rainfall exceeds 50 mm/hr during 4.5m+ astronomical high tides, gravity flow ceases.' },
          { step: '4', title: 'Mithi River Chokepoints', desc: 'Narrow bridges, plastic debris, and industrial effluents obstruct river discharge into Mahim Bay.' },
          { step: '5', title: 'Mass Transit Lockdown', desc: 'Central and Western Railway tracks submerge, halting mobility for millions.' }
        ]
      },
      {
        id: 'cyclone_arabian',
        name: 'Arabian Sea Cyclones',
        severity: 'High',
        color: 'blue',
        frequency: 'Increasing (Nisarga, Tauktae)',
        shortDesc: 'A rapidly warming Arabian Sea has led to a 52% increase in cyclonic storms since 2000.',
        formationFlow: [
          { step: '1', title: 'Abnormal Sea Warming', desc: 'Arabian Sea temperatures regularly hit 30-31°C due to accelerated regional warming.' },
          { step: '2', title: 'Cyclogenesis', desc: 'Tropical depressions form off Lakshadweep and track northwards along the Konkan coast.' },
          { step: '3', title: 'Gale Winds & Surge', desc: 'Sustained winds of 100-140 km/h drive ocean surges into Marine Drive and Colaba.' },
          { step: '4', title: 'Tree & Hoarding Collapses', desc: 'Shallow urban root systems lead to thousands of uprooted trees and power disruptions.' }
        ]
      },
      {
        id: 'sea_level_mumbai',
        name: 'Permanent Inundation & Coastal Erosion',
        severity: 'High',
        color: 'cyan',
        frequency: 'Long-term Chronic',
        shortDesc: 'Projections show substantial parts of South Mumbai and suburbs vulnerable to high-tide submergence.',
        formationFlow: [
          { step: '1', title: 'Oceanic Expansion', desc: 'Global sea levels rising at 3.7 mm/year in the northern Indian Ocean basin.' },
          { step: '2', title: 'Reclaimed Land Compaction', desc: 'The 7 original islands of Mumbai were joined via reclamation, leaving low sub-surface elevation.' },
          { step: '3', title: 'Mangrove Depletion', desc: 'Historical loss of coastal mangrove forests removed the natural wave-attenuation sponge.' }
        ]
      },
      {
        id: 'landslide_mumbai',
        name: 'Hill Slope Landslides',
        severity: 'Medium-High',
        color: 'amber',
        frequency: 'Every Intense Monsoon Spell',
        shortDesc: 'Informal settlements on quarry hill slopes (Chembur, Vikhroli, Ghatkopar) facing soil slippage.',
        formationFlow: [
          { step: '1', title: 'Unregulated Cutting', desc: 'Hill bases are excavated for informal dwelling terraces, destabilizing basalt talus.' },
          { step: '2', title: 'Continuous Saturation', desc: '400+ mm rain over 48 hours supersaturates topsoil layer.' },
          { step: '3', title: 'Debris Flow', desc: 'Sudden collapse of retaining structures crushes downhill settlements.' }
        ]
      }
    ],
    whyAtRisk: {
      summary: 'Mumbai’s vulnerability is engineered into its geography: a reclaimed city surrounded by the sea, naturally draining through a constrained river, facing rising monsoon cloudbursts.',
      factors: [
        {
          title: 'Seven Islands Reclaimed Topography',
          category: 'Geography',
          detail: 'Historic Mumbai was an archipelago of 7 rocky islands. The low-lying depressions between them were filled with soil and debris to create land, creating natural drainage "sinks" like Hindmata, Parel, and Grant Road.'
        },
        {
          title: 'Tidal Fluctuation & 4.5m Spring Tides',
          category: 'Hydrology',
          detail: 'Mumbai experiences twice-daily tidal swings up to 5 meters. Outfall floodgates must be shut during high tides to avoid Arabian Sea water inundating South Mumbai streets.'
        },
        {
          title: 'Degraded Mithi River & Estuarine Mudflats',
          category: 'Ecology',
          detail: 'The Mithi River, the city’s primary natural drain, has been encroached, channelized into concrete walls, and choked with industrial sludge and urban waste.'
        },
        {
          title: 'Hyper-Density & Concretization (Runoff Coefficient 0.9)',
          category: 'Urbanization',
          detail: 'Over 90% of Mumbai’s surface is paved with concrete or asphalt, meaning rain cannot soak into soil and immediately becomes torrential surface runoff.'
        }
      ]
    },
    disasterLens: {
      timeline: [
        {
          year: '2005',
          name: 'The Great Mumbai Deluge',
          type: 'Catastrophic Cloudburst & Flooding',
          severity: 'Catastrophic',
          date: 'July 26, 2005',
          whatHappened: 'A staggering 944 mm of rainfall was recorded in 24 hours at Santacruz, overwhelming all systems and submerging two-thirds of the city.',
          scientificCause: 'An intense stationary mesoscale offshore convective vortex combined with exceptional moisture inflow from the Arabian Sea.',
          impact: 'Over 1,000 lives lost; entire airport and railway shut for 3 days; 10,000 cattle dead; financial losses exceeding $1.5 Billion.',
          lessonsLearned: 'Catalyzed the creation of National Disaster Management Authority (NDMA) and the BRIMSTOWAD master drainage project.'
        },
        {
          year: '2020',
          name: 'Cyclone Nisarga',
          type: 'Severe Cyclonic Storm',
          severity: 'High',
          date: 'June 3, 2020',
          whatHappened: 'First cyclonic storm to threaten Mumbai directly in over 70 years, making landfall just south near Alibag with 110 km/h winds.',
          scientificCause: 'Warm ocean heat content in the east-central Arabian Sea supported cyclone survival close to the Maharashtra coastline.',
          impact: 'Widespread power outages in Raigad and coastal MMR; damage to fishing craft; extensive roof and tree destruction.',
          lessonsLearned: 'Validated coastal storm warning radars and reinforced necessity of micro-level cyclone readiness in Maharashtra.'
        },
        {
          year: '2021',
          name: 'Cyclone Tauktae',
          type: 'Extremely Severe Cyclonic Storm',
          severity: 'Extreme',
          date: 'May 17, 2021',
          whatHappened: 'Battered Mumbai coast with 114 km/h record gusts and dumped 230 mm rain before making landfall in Gujarat; barge P305 disaster.',
          scientificCause: 'Long sea travel across 31°C Arabian Sea waters provided sustained thermodynamic energy.',
          impact: 'Tragic sinking of offshore oil accommodation barge P305 with 86 casualties; urban flooding and Marine Drive storm surge splashing.',
          lessonsLearned: 'Mandatory maritime weather protocols for offshore energy rigs and coastal construction barges.'
        },
        {
          year: '2023',
          name: 'Konkan Landslide Disaster (Irshalwadi)',
          type: 'Monsoon Triggered Landslide',
          severity: 'High',
          date: 'July 19, 2023',
          whatHappened: 'Continuous torrential rains of over 499 mm destabilized the mountain ridge above Irshalwadi village near Mumbai MMR.',
          scientificCause: 'Complete pore-water pressure saturation of weathered basalt slope during continuous heavy monsoon spell.',
          impact: 'Massive debris flow buried 48 homes; over 80 lives tragically lost; difficult rescue access.',
          lessonsLearned: 'Urgent need for automated slope-stability tilt-meters and satellite radar interferometry monitoring in Western Ghats.'
        }
      ],
      thenVsNow: {
        title: 'Mumbai Resilience Evolution (2005 vs 2026)',
        then: {
          period: 'July 26, 2005',
          drainage: 'Drainage designed for 25 mm/hr rainfall; no telemetry flood gauges; Mithi River heavily constricted.',
          warning: 'Paper faxes and TV bulletins; citizens had zero real-time information on flooded train tracks.',
          resilience: 'No automated floodgates; emergency control room lacked digital GIS mapping screens.'
        },
        now: {
          period: 'Present Day (2026)',
          drainage: 'BRIMSTOWAD pumps at Britannia, Cleveland, and Haji Ali; drainage target raised to 50 mm/hr; holding tanks at Hindmata.',
          warning: 'BMC Disaster Management App; WhatsApp rainfall alerts; 6 Doppler radars; 60 automated rain gauges across MMR.',
          resilience: 'Elevated railway track points; dedicated NDRF battalions stationed in Kurla and Andheri during red alerts.'
        }
      },
      patternAnalysis: [
        { hazard: 'Urban Cloudburst Flooding', level: 95, label: 'Extreme', color: 'bg-rose-600' },
        { hazard: 'High-Tide Sea Inundation', level: 85, label: 'High', color: 'bg-blue-500' },
        { hazard: 'Arabian Sea Cyclones', level: 75, label: 'High', color: 'bg-indigo-500' },
        { hazard: 'Hill Slope Landslides', level: 70, label: 'Medium-High', color: 'bg-amber-500' },
        { hazard: 'Humid Heat Stress', level: 60, label: 'Moderate', color: 'bg-orange-400' }
      ]
    },
    references: [
      {
        id: 'mum-ref-1',
        title: 'Sea-Level Rise and Future Coastal Flooding in Major Indian Cities',
        organization: 'Scientific Reports (Nature Portfolio)',
        type: 'Peer-Reviewed Research',
        category: 'scientific',
        year: '2025',
        url: 'https://www.nature.com/articles/s41598-025-13394-5',
        relevance: 'Designates Mumbai as experiencing the highest economic asset and population exposure to coastal flood hazards in peninsular India under SSP2-4.5 and SSP5-8.5 scenarios.'
      },
      {
        id: 'mum-ref-2',
        title: 'Urban Floods Case Study of Mumbai: July 2005 Deluge Analysis',
        organization: 'National Institute of Disaster Management (NIDM)',
        type: 'Official Academic Case Study',
        category: 'official',
        year: '2009',
        url: 'https://nidm.gov.in/journal/J_Apr2009b.asp',
        relevance: 'Authoritative government post-mortem of the 944 mm deluge, evaluating urban drainage bottlenecking, Mithi River hydrology, and institutional coordination deficits.'
      },
      {
        id: 'mum-ref-3',
        title: 'Mumbai Climate Action Plan (MCAP): Pathways to Net Zero & Climate Resilience',
        organization: 'Brihanmumbai Municipal Corporation (BMC)',
        type: 'Official Municipal Strategy',
        category: 'official',
        year: '2022',
        url: 'https://www.mcap.mcgm.gov.in/',
        relevance: 'City’s official evidence-backed roadmap detailing flood risk mitigation, urban greening, coastal biodiversity protection, and heat action planning.'
      },
      {
        id: 'mum-ref-4',
        title: 'Flooded Future: Global Vulnerability to Sea Level Rise Worse Than Previously Understood',
        organization: 'Climate Central',
        type: 'Scientific Climate Report',
        category: 'scientific',
        year: '2019',
        url: 'https://www.climatecentral.org/report/report-flooded-future-global-vulnerability-to-sea-level-rise-worse-than-previously-understood',
        relevance: 'Identifies south and central Mumbai low-lying reclaimed areas as vulnerable to regular high-tide submergence by mid-century without engineered coastal defense walls.'
      },
      {
        id: 'mum-ref-5',
        title: 'IPCC AR6 WGII Chapter 10: Asia (Urban Infrastructure Vulnerability)',
        organization: 'IPCC',
        type: 'International Assessment',
        category: 'official',
        year: '2022',
        url: 'https://www.ipcc.ch/report/ar6/wg2/chapter/chapter-10/',
        relevance: 'Documents rapid urban infrastructure climate risks in Mumbai, highlighting compound flooding (simultaneous cloudburst + high tide + storm surge).'
      },
      {
        id: 'mum-ref-6',
        title: 'Verified Reporting: UN Flags Mumbai at Risk of Permanent Inundation',
        organization: 'The Indian Express',
        type: 'Verified News Analysis',
        category: 'news',
        year: '2024',
        url: 'https://indianexpress.com/article/cities/mumbai/mumbai-heading-underwater-un-flags-city-at-risk-of-permanent-inundation-10862334/',
        relevance: 'Details latest UN and IPCC assessments on accelerating Arabian Sea warming, sea-level anomalies, and Mumbai’s urban adaptation urgency.'
      },
      {
        id: 'mum-ref-7',
        title: 'Maharashtra State Disaster Management Plan: Urban Flood & Coastal Guidelines',
        organization: 'Maharashtra State Disaster Management Authority (MSDMA)',
        type: 'Government Operational Document',
        category: 'official',
        year: '2023',
        url: 'https://rfd.maharashtra.gov.in/',
        relevance: 'State-wide disaster protocols for cyclone landfall warnings, NDRF deployment matrices, coastal community shelters, and emergency public sirens.'
      },
      {
        id: 'mum-ref-8',
        title: 'Citizen Preparedness Guide: Monsoon Safety & High-Tide Caution',
        organization: 'BMC Disaster Management Department',
        type: 'Preparedness Guideline',
        category: 'preparedness',
        year: '2024',
        url: 'https://dm.mcgm.gov.in/',
        relevance: 'Direct citizen instructions for avoiding flooded subway underpasses, timing commutes around high-tide schedules, and drinking water sanitization.'
      }
    ],
    solutions: {
      individual: [
        'Check daily high-tide calendar and BMC monsoon alerts before scheduling travel through low-lying corridors (Hindmata, Kurla, Gandhi Market).',
        'Avoid driving or walking through waterlogged underpasses (Milan, Khar, Andheri subways) during red alerts.',
        'Install backflow check valves on ground-floor sewage and stormwater pipes to prevent back-surging during high tide.',
        'Keep emergency supplies and battery backups charged in anticipation of localized feeder shutdowns.'
      ],
      community: [
        'Organize housing society basement waterproofing and install automatic submersible de-watering pumps with backup diesel generators.',
        'Prohibit plastic and solid waste dumping into municipal open gutters and storm gullies.',
        'Form volunteer teams to assist elderly and disabled residents during elevator power outages.'
      ],
      municipal: [
        'Accelerate the BRIMSTOWAD project completion and upgrade Mahjim / Love Grove pumping stations.',
        'Rejuvenate and widen the Mithi River channel, restoring natural riverbed vegetation and removing industrial encroachments.',
        'Construct subterranean holding ponds (such as the Pramod Mahajan Park underground tanks) to buffer peak cloudburst runoff.',
        'Implement strict coastal mangrove preservation zoning under Coastal Regulation Zone (CRZ-I) enforcement.'
      ]
    }
  },

  bihar: {
    id: 'bihar',
    name: 'Bihar',
    state: 'Bihar',
    region: 'Eastern Gangetic Plain',
    coordinates: { lat: 25.0961, lng: 85.3131 },
    heroImage: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80',
    summary: 'A multi-hazard agrarian state located in the flat Gangetic plains. Characterized by recurring Himalayan river floods (Kosi, Gandak, Bagmati), severe pre-monsoon heatwaves, and dangerous lightning strikes.',
    stats: {
      elevation: '35 – 53 meters above MSL',
      population: '130.7 Million',
      density: '1,106 people / km²',
      floodProneArea: '73.63% of Total Geographical Area',
      climateType: 'Humid Subtropical (Cwa)'
    },
    riskEngine: {
      overallScore: 86,
      riskLevel: 'High',
      components: [
        { name: 'Hazard Intensity', weight: '30%', score: 90, desc: 'Enormous transboundary river discharge from Nepal Himalayas plus severe summer heatwaves.' },
        { name: 'Exposure', weight: '25%', score: 88, desc: 'Over 16.5 million people reside directly inside embanked river floodplains.' },
        { name: 'Vulnerability', weight: '25%', score: 87, desc: 'High rural poverty, dependence on rain-fed agriculture, and kutchha housing structures.' },
        { name: 'Infrastructure Deficit', weight: '10%', score: 82, desc: 'Aging earthen river embankments vulnerable to siltation, scouring, and catastrophic breaches.' },
        { name: 'Preparedness Capacity', weight: '10%', score: 70, desc: 'Active BSDMA Roadmap, Community Early Warning systems, and SDRF boat rescue teams.' }
      ]
    },
    hazards: [
      {
        id: 'river_floods',
        name: 'Transboundary River Floods (Kosi, Gandak, Bagmati)',
        severity: 'Extreme',
        color: 'rose',
        frequency: 'Annual Monsoon Phenomenon',
        shortDesc: 'Excess Himalayan precipitation draining through North Bihar into the Ganga River.',
        formationFlow: [
          { step: '1', title: 'Himalayan Cloudbursts', desc: 'Heavy monsoon downpours strike the steep upper catchments in Nepal and Tibet.' },
          { step: '2', title: 'High Velocity Silt Discharge', desc: 'Rivers like the Kosi carry enormous coarse silt sediment loads into the flat plains of Bihar.' },
          { step: '3', title: 'Riverbed Aggradation', desc: 'Silt deposits elevate the riverbed above the surrounding agricultural countryside.' },
          { step: '4', title: 'Embankment Breaches', desc: 'Swollen floodwaters breach earthen bunds, inundating hundreds of villages within hours.' },
          { step: '5', title: 'Prolonged Waterlogging', desc: 'Water remains trapped between embankments and roads for weeks, destroying crops.' }
        ]
      },
      {
        id: 'heatwave_bihar',
        name: 'Severe Heatwaves & Loo Winds',
        severity: 'High',
        color: 'orange',
        frequency: 'April – June Annually',
        shortDesc: 'Scorching northwesterly dry winds pushing temperatures past 44-46°C.',
        formationFlow: [
          { step: '1', title: 'Dry Continental Winds', desc: 'Hot air advection sweeps from the Thar desert across northern plains.' },
          { step: '2', title: 'Clear Skies & Strong Sun', desc: 'Lack of pre-monsoon moisture causes intense ground heating and high thermal stress.' },
          { step: '3', title: 'Health Emergency', desc: 'Rural farmers and outdoor laborers suffer acute heat stroke and dehydration.' }
        ]
      },
      {
        id: 'lightning_bihar',
        name: 'Deadly Thunderstorms & Lightning Strikes',
        severity: 'High',
        color: 'amber',
        frequency: 'Peak Pre-Monsoon & Monsoon',
        shortDesc: 'Bihar experiences one of the highest lightning fatality rates in India due to intense convective cells.',
        formationFlow: [
          { step: '1', title: 'Instability & Moisture Inflow', desc: 'Warm humid air from Bay of Bengal clashes with dry continental air over Bihar.' },
          { step: '2', title: 'Cumulonimbus Supercells', desc: 'Rapid updrafts create towering thunderclouds with intense electrical charge separation.' },
          { step: '3', title: 'Ground Discharges', desc: 'Severe cloud-to-ground lightning strikes open agricultural fields where farmers work.' }
        ]
      }
    ],
    whyAtRisk: {
      summary: 'Bihar’s unique geographical position makes it a natural drainage basin for seven major Himalayan rivers converging into the Ganga, creating recurring flood inundations alongside climate-induced extreme heat.',
      factors: [
        {
          title: 'Saucer-Shaped Gangetic Basin Topography',
          category: 'Geography',
          detail: 'North Bihar is a low-gradient floodplain. When rivers flow down from steep Nepal Himalayan slopes into Bihar’s near-flat terrain, water velocity drops abruptly, shedding massive silt and spreading across vast agricultural lands.'
        },
        {
          title: 'Transboundary Upstream Catchments',
          category: 'Hydrology',
          detail: 'Over 65% of the catchment area of Bihar’s flood-causing rivers lies outside the state (in Nepal and Tibet). Heavy rain occurring hundreds of kilometers away causes catastrophic floods in Bihar without local rain.'
        },
        {
          title: 'The Embankment Paradox',
          category: 'Engineering & Infrastructure',
          detail: 'Over 3,700 km of earthen embankments have been built along Bihar’s rivers. While designed to contain floods, they prevent silt from spreading naturally, causing riverbeds to rise higher than the villages outside, turning any breach into a devastating torrent.'
        },
        {
          title: 'High Rural Population Density & Agriculture Dependency',
          category: 'Socio-Economic',
          detail: 'With over 88% of Bihar’s population living in rural areas dependent on Kharif crops, monsoon floods directly wipe out livelihoods, food security, and mud homes annually.'
        }
      ]
    },
    disasterLens: {
      timeline: [
        {
          year: '2008',
          name: 'The Catastrophic Kosi River Avulsion',
          type: 'River Embankment Breach & Flood',
          severity: 'Catastrophic',
          date: 'August 18, 2008',
          whatHappened: 'The Kosi River breached its eastern afflux bund at Kusaha (Nepal), shifting its main course 120 km eastward across densely populated North Bihar.',
          scientificCause: 'Massive sediment deposition choked the old channel, while poor maintenance of upstream spur structures allowed high discharge to cut through the earthen bund.',
          impact: 'Over 500 dead; 3.3 million displaced; 300,000 homes destroyed; 840,000 acres of fertile farmland covered in uncultivable coarse sand.',
          lessonsLearned: 'Proved that continuous embankment construction without upstream watershed silt management creates catastrophic risk.'
        },
        {
          year: '2019',
          name: 'Bihar Acute Encephalitis & Severe Heatwave',
          type: 'Compound Climate & Health Disaster',
          severity: 'Severe',
          date: 'June 2019',
          whatHappened: 'Prolonged heatwave with temperatures exceeding 45°C coupled with malnutrition and dehydration caused widespread casualties in Gaya and Muzaffarpur.',
          scientificCause: 'Persistent anticyclonic circulation blocked monsoon onset, locking scorching dry winds over the state for over 3 weeks.',
          impact: 'Over 180 deaths due to heatstroke and AES; Section 144 imposed prohibiting outdoor work during peak daytime hours in Gaya.',
          lessonsLearned: 'BSDMA introduced district-level Heat Action Plans and emergency water tank deliveries.'
        },
        {
          year: '2020',
          name: 'Massive Lightning Outbreak',
          type: 'Severe Thunderstorms & Lightning',
          severity: 'High',
          date: 'June 25, 2020',
          whatHappened: 'Over 90 people were killed in a single 24-hour period by intense cloud-to-ground lightning across 17 districts during monsoon sowing.',
          scientificCause: 'Extreme atmospheric convective available potential energy (CAPE) coupled with farmers working in open, waterlogged paddy fields.',
          impact: 'Tragic loss of primary breadwinners in rural farming communities.',
          lessonsLearned: 'BSDMA launched the "Indravajra" mobile early warning app and installed siren towers in rural blocks.'
        },
        {
          year: '2024',
          name: 'Ganga & Gandak Spate Inundation',
          type: 'River Spate & Waterlogging',
          severity: 'High',
          date: 'August 2024',
          whatHappened: 'The Ganga, Gandak, and Ghaghra flowed 1-2 meters above danger level, submerging 12 districts including Patna lowlands.',
          scientificCause: 'Simultaneous heavy rainfall in upstream Madhya Pradesh (Yamuna/Chambal basin) and Nepal catchments synchronized peak discharges.',
          impact: 'Over 1.5 million affected; deployment of 33 SDRF/NDRF rescue teams and 700 rescue boats.',
          lessonsLearned: 'Demonstrated importance of Central Water Commission real-time telemetry river level stations for 48-hr evacuation warnings.'
        }
      ],
      thenVsNow: {
        title: 'Bihar Disaster Management Evolution (2008 vs 2026)',
        then: {
          period: '2008 (Kosi Deluge)',
          warning: 'Relied on postal telegrams and manual river staff patrols; zero automated telemetry.',
          evacuation: 'Delayed state rescue by several days; relying on private wooden boats (nauka).',
          policy: 'Post-disaster relief and temporary grain distribution focus.'
        },
        now: {
          period: 'Present Day (2026)',
          warning: 'BSDMA Indravajra App with 30-min lightning alerts; CWC digital river radar telemetry.',
          evacuation: 'Dedicated State Disaster Response Force (SDRF) bases with mechanized rescue power boats.',
          policy: 'Comprehensive Bihar DRR Roadmap (2015-2030) aligned with the Sendai Framework.'
        }
      },
      patternAnalysis: [
        { hazard: 'Transboundary River Floods', level: 94, label: 'Extreme', color: 'bg-blue-600' },
        { hazard: 'Severe Heatwaves', level: 82, label: 'High', color: 'bg-orange-500' },
        { hazard: 'Fatal Lightning Strikes', level: 85, label: 'High', color: 'bg-amber-500' },
        { hazard: 'Agricultural Drought', level: 65, label: 'Medium-High', color: 'bg-yellow-500' },
        { hazard: 'Earthquake Vulnerability', level: 60, label: 'Moderate (Zone IV/V)', color: 'bg-purple-500' }
      ]
    },
    references: [
      {
        id: 'bih-ref-1',
        title: 'Bihar State Disaster Management Authority (BSDMA) Introduction & Hazard Profile',
        organization: 'BSDMA, Government of Bihar',
        type: 'Official Authority Portal',
        category: 'official',
        year: '2024',
        url: 'https://bsdma.bihar.gov.in/en/introduction',
        relevance: 'Official classification of Bihar’s multi-hazard vulnerabilities covering 73.6% flood-prone geography, extreme heatwave corridors, and lightning disaster patterns.'
      },
      {
        id: 'bih-ref-2',
        title: 'Disaster Risk Reduction (DRR) Roadmap 2015–2030 for Bihar',
        organization: 'BSDMA',
        type: 'Official Strategic Framework',
        category: 'official',
        year: '2016',
        url: 'https://bsdma.bihar.gov.in/en/drr',
        relevance: 'India’s first state-level Sendai-aligned roadmap setting resilient housing targets, river basin water management, and community school safety programs.'
      },
      {
        id: 'bih-ref-3',
        title: 'Disaster Mitigation & Long-term Resilience Programs',
        organization: 'BSDMA',
        type: 'Official Policy Document',
        category: 'official',
        year: '2023',
        url: 'https://bsdma.bihar.gov.in/en/disaster-mitigation',
        relevance: 'Details flood shelter construction, emergency rescue boat logistics, lightning arrester installations in schools, and early warning siren networks.'
      },
      {
        id: 'bih-ref-4',
        title: 'Bihar Flood Disaster Management Publications & Technical Studies',
        organization: 'Government of Bihar Disaster Management Department',
        type: 'Government Publications',
        category: 'official',
        year: '2022',
        url: 'https://state.bihar.gov.in/cache/7/publications.htm',
        relevance: 'Technical river discharge documentation, Kosi afflux bund maintenance manuals, and standard operating procedures for annual flood relief operations.'
      },
      {
        id: 'bih-ref-5',
        title: 'Government of Bihar Disaster Management Portal & Relief Operations',
        organization: 'Government of Bihar',
        type: 'Official Portal',
        category: 'official',
        year: '2024',
        url: 'https://betastate.bihar.gov.in/disastermgmt/',
        relevance: 'Real-time relief deployment dashboard, community kitchen (Samudaik Rasoi) tracking during floods, and direct benefit transfer for flood victims.'
      },
      {
        id: 'bih-ref-6',
        title: 'Central Water Commission Annual Report: Himalayan River Basin Hydrology',
        organization: 'Central Water Commission (CWC), Ministry of Jal Shakti',
        type: 'National Scientific Report',
        category: 'official',
        year: '2024',
        url: 'https://www.cwc.gov.in/sites/default/files/approved-annual-report-cwc-2023-24.pdf',
        relevance: 'Authoritative data on flood forecasting networks across the Ganga, Kosi, Gandak, and Son basins with transboundary telemetry from Nepal.'
      },
      {
        id: 'bih-ref-7',
        title: 'IPCC AR6 WGII Chapter 10: Asia (Gangetic Plain Climate Vulnerability)',
        organization: 'IPCC',
        type: 'International Assessment',
        category: 'scientific',
        year: '2022',
        url: 'https://www.ipcc.ch/report/ar6/wg2/chapter/chapter-10/',
        relevance: 'Synthesizes climate projections for the Indo-Gangetic plains, highlighting increased monsoon variability, sudden glacio-lacustrine floods upstream, and humid heatwaves.'
      },
      {
        id: 'bih-ref-8',
        title: 'Verified Reporting: Ganga Above Danger Mark in Bihar; 33 Rescue Teams Deployed',
        organization: 'The Indian Express',
        type: 'Verified News Coverage',
        category: 'news',
        year: '2024',
        url: 'https://indianexpress.com/article/cities/patna/ganga-above-danger-mark-in-bihar-33-rescue-teams-700-boats-deployed-10863868/',
        relevance: 'Ground-level reporting documenting emergency relief deployments, NDRF boat rescues, and the impact of simultaneous upstream water discharges.'
      }
    ],
    solutions: {
      individual: [
        'Download and enable location permissions on the BSDMA "Indravajra" app for 30-minute advance lightning warnings.',
        'During thunderstorms, immediately seek shelter in a permanent pucca structure; avoid standing under isolated trees or near metal wire fences.',
        'Store dry food grains, animal fodder, and medicine on elevated machan platforms before July monsoon onset.',
        'Boil all floodwater or treat with chlorine tablets to prevent acute waterborne gastroenteritis outbreaks.'
      ],
      community: [
        'Form village Aapda Mitra rescue teams trained in basic life support, boat rowing, and temporary embankment reinforcement.',
        'Designate high-elevation village school buildings or multi-purpose flood shelters as community assembly zones.',
        'Establish grain banks (Annapurna Bhandar) to protect seed stocks from flood submergence.'
      ],
      municipal: [
        'Conduct pre-monsoon drone inspections and laser-guided topographical profiling of critical river embankments.',
        'Construct community lightning arresters atop rural panchayat bhawans and government schools.',
        'Implement the Bihar DRR Roadmap target to transition vulnerable rural thatch homes to flood-resilient raised plinth housing.',
        'Deepen bilateral hydro-meteorological data exchange mechanisms with Nepal for earlier flash flood warnings.'
      ]
    }
  },

  delhi: {
    id: 'delhi',
    name: 'Delhi NCR',
    state: 'Delhi (UT)',
    region: 'Northern India',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
    summary: 'India’s National Capital Territory, characterized by extreme continental temperature swings, severe urban heat island (UHI) amplification, Yamuna floodplain flooding, and winter smog inversions.',
    stats: {
      elevation: '213 – 305 meters above MSL',
      population: '33.8 Million (NCR)',
      density: '11,320 people / km²',
      peakSummerTemp: '46 – 49.9°C Recorded',
      climateType: 'Semi-Arid / Subtropical (BSh/Cwa)'
    },
    riskEngine: {
      overallScore: 79,
      riskLevel: 'Medium-High',
      components: [
        { name: 'Hazard Intensity', weight: '30%', score: 84, desc: 'Severe heatwave spikes exceeding 47°C and upstream Yamuna flood releases from Hathnikund.' },
        { name: 'Exposure', weight: '25%', score: 86, desc: 'Massive population of outdoor daily-wage laborers, gig workers, and Yamuna khadar settlements.' },
        { name: 'Vulnerability', weight: '25%', score: 76, desc: 'Significant water supply deficit during peak heat; dense informal unauthorized colonies.' },
        { name: 'Infrastructure Deficit', weight: '10%', score: 72, desc: 'Najafgarh and Barapullah drain siltation; Yamuna regulator gate malfunctions.' },
        { name: 'Preparedness Capacity', weight: '10%', score: 78, desc: 'DDMA Heat Action Plan, green canopy initiatives, and Delhi Jal Board tanker logistics.' }
      ]
    },
    hazards: [
      {
        id: 'delhi_heatwave',
        name: 'Severe Heatwave & Urban Heat Island (UHI)',
        severity: 'Extreme',
        color: 'rose',
        frequency: 'April – June Annually',
        shortDesc: 'Deadly summer heat spikes where concrete sprawl locks temperatures 4-8°C hotter than surrounding rural plains.',
        formationFlow: [
          { step: '1', title: 'Advection of Thar Desert Air', desc: 'Searing northwesterly "Loo" winds transport hot, bone-dry air across Haryana into Delhi.' },
          { step: '2', title: 'High Solar Insolation', desc: 'Clear summer skies allow direct, uninterrupted solar radiation heating the asphalt and concrete.' },
          { step: '3', title: 'Thermal Mass Absorption', desc: 'Glass facades, concrete buildings, and asphalt roads absorb heat and radiate it slowly at night.' },
          { step: '4', title: 'Anthropogenic Heat Rejection', desc: 'Millions of air-conditioner external compressors and vehicle exhaust amplify ambient temperatures.' },
          { step: '5', title: 'Nighttime Heat Trap', desc: 'Nocturnal minimums fail to drop below 32°C, depriving the human body of thermal recovery.' }
        ]
      },
      {
        id: 'yamuna_flood',
        name: 'Yamuna River Floodplain Inundation',
        severity: 'High',
        color: 'blue',
        frequency: 'Monsoon Cloudburst Events (e.g. 2023)',
        shortDesc: 'Upstream barrage discharges from Haryana combined with heavy local cloudbursts.',
        formationFlow: [
          { step: '1', title: 'Himachal & Uttarakhand Downpours', desc: 'Extreme cloudbursts in upper Yamuna catchments cause rapid river surges.' },
          { step: '2', title: 'Hathnikund Barrage Discharge', desc: 'Excess water discharged down the river corridor reaches Delhi in 48-72 hours.' },
          { step: '3', title: 'Floodplain Encroachment', desc: 'Constricted Yamuna khadar causes water to rise rapidly, breaching ring roads and heritage monuments.' },
          { step: '4', title: 'Regulator Backflow', desc: 'Silt-jammed sluice gates allow river water to back-surge into ITO and Civil Lines.' }
        ]
      },
      {
        id: 'urban_waterlogging_delhi',
        name: 'Flash Urban Waterlogging',
        severity: 'Medium-High',
        color: 'amber',
        frequency: 'Monsoon Cloudburst Spells',
        shortDesc: 'Severe street flooding at underpasses (Minto Bridge, Pul Prahladpur) during sudden intense showers.',
        formationFlow: [
          { step: '1', title: 'Intense Rain Spell', desc: 'Short-duration cloudburst drops 80 mm in under 2 hours.' },
          { step: '2', title: 'Drain Choking', desc: 'Najafgarh and Barapullah storm channels blocked by untreated silt and construction debris.' },
          { step: '3', title: 'Underpass Submergence', desc: 'Topographical low spots fill rapidly with water, stranding buses and shutting arterials.' }
        ]
      }
    ],
    whyAtRisk: {
      summary: 'Delhi’s risk stems from extreme continental weather, severe urban heat island effect driven by concretization, and vulnerability to upstream river surges along the Yamuna.',
      factors: [
        {
          title: 'Extreme Continental Semi-Arid Geography',
          category: 'Geography',
          detail: 'Far from any moderating maritime influence, Delhi experiences extreme temperature contrasts—from near-freezing winter lows to scorching summer peaks exceeding 48°C.'
        },
        {
          title: 'Urban Heat Island (UHI) & Massive Concretization',
          category: 'Urban Climate',
          detail: 'Satellite thermal sensors reveal dense urban clusters like Connaught Place, Karol Bagh, and Anand Vihar radiate up to 8°C higher surface temperatures than the green Central Ridge, creating localized micro-heat domes.'
        },
        {
          title: 'Vulnerability to Upstream Hathnikund Discharges',
          category: 'Hydrology',
          detail: 'Delhi’s river flood risk is determined by decisions made 200 km upstream at the Hathnikund Barrage in Haryana. When massive water releases occur during monsoon spells, the narrow 22-km Delhi stretch of the Yamuna cannot accommodate the volume.'
        },
        {
          title: 'Massive Outdoor Workforce & Housing Disparities',
          category: 'Socio-Economic',
          detail: 'Over 5 million daily-wage construction laborers, street vendors, and delivery gig-workers have no access to air conditioning and face direct life-threatening heat stress during peak afternoon hours.'
        }
      ]
    },
    disasterLens: {
      timeline: [
        {
          year: '2024',
          name: 'The Record-Breaking 50°C Heatwave',
          type: 'Extreme Heatwave Emergency',
          severity: 'Extreme',
          date: 'May – June 2024',
          whatHappened: 'Delhi experienced an unprecedented streak of days above 45°C, with Mungeshpur weather station recording a historic peak of 49.9°C.',
          scientificCause: 'Persistent high-pressure ridge over northwestern India blocked western disturbances, allowing dry desert winds to heat uninterrupted.',
          impact: 'Peak electricity demand breached 8,650 MW, causing localized grid failures; severe water tanker shortages; numerous heat-stroke hospitalizations.',
          lessonsLearned: 'Mandated paid afternoon rest breaks for construction workers and deployment of water-sprinkling mist guns.'
        },
        {
          year: '2023',
          name: 'The Historic Yamuna Flood (208.66m)',
          type: 'River Flood & Urban Inundation',
          severity: 'High',
          date: 'July 13, 2023',
          whatHappened: 'The Yamuna River smashed its 45-year-old all-time high water level record, inundating the Ring Road, Red Fort precincts, and ITO intersection.',
          scientificCause: 'Consecutive cloudbursts in Himachal Pradesh led to 359,000 cusecs water discharge from Hathnikund, meeting a silted Delhi riverbed.',
          impact: 'Over 27,000 people evacuated from floodplains; Wazirabad and Chandrawal water treatment plants submerged, cutting drinking water to 25% of the city.',
          lessonsLearned: 'Exposed failure of mechanical regulator gates (Gate No. 12 at ITO) requiring modern automated hydraulic gate systems.'
        },
        {
          year: '2021',
          name: 'Record September Cloudburst',
          type: 'Flash Urban Flooding',
          severity: 'Moderate-High',
          date: 'September 11, 2021',
          whatHappened: 'Delhi received 117 mm of rain in 3 hours, causing aircraft runways at IGI Airport to submerge under 1-2 feet of water.',
          scientificCause: 'Unseasonal late monsoon depression interacting with mid-latitude westerly trough right over the capital.',
          impact: 'Flight operations disrupted; massive traffic jams lasting 6 hours across arterial expressways.',
          lessonsLearned: 'Modernized airport stormwater pumping and desiltation of the primary Palam drain.'
        }
      ],
      thenVsNow: {
        title: 'Delhi Climate Adaptation Evolution (2010 vs 2026)',
        then: {
          period: '2010 (Commonwealth Games Era)',
          heat: 'No Heat Action Plan; no labor shift regulations; heat treated as normal weather rather than a disaster.',
          drainage: 'Uncoordinated drainage management divided across 11 different civic agencies (MCD, PWD, DDA, I&FC).',
          floods: 'Yamuna flood warnings relied on manual river markers and phone calls from Haryana.'
        },
        now: {
          period: 'Present Day (2026)',
          heat: 'Formal DDMA Heat Action Plan with color-coded warnings (Yellow/Orange/Red), cool roofs, and shaded bus shelters.',
          drainage: 'Unified Drainage Master Plan commissioned with IIT Delhi; automated CCTV monitoring of critical underpasses.',
          floods: 'Telemetry hydrographs synced with Central Water Commission and digital hydraulic regulator monitoring.'
        }
      },
      patternAnalysis: [
        { hazard: 'Extreme Summer Heatwaves', level: 96, label: 'Extreme', color: 'bg-red-600' },
        { hazard: 'Urban Heat Island Amplification', level: 90, label: 'Very High', color: 'bg-orange-500' },
        { hazard: 'Yamuna Floodplain Spate', level: 75, label: 'High', color: 'bg-blue-500' },
        { hazard: 'Underpass Flash Waterlogging', level: 80, label: 'High', color: 'bg-cyan-500' },
        { hazard: 'Winter Smog Inversion', level: 95, label: 'Extreme (Air Quality)', color: 'bg-slate-600' }
      ]
    },
    references: [
      {
        id: 'del-ref-1',
        title: 'Delhi Heat Wave Action Plan 2024–2025',
        organization: 'Delhi Disaster Management Authority (DDMA)',
        type: 'Official Action Plan',
        category: 'official',
        year: '2024',
        url: 'https://ddma.delhi.gov.in/ddma/ddma-plan-home',
        relevance: 'Official multi-agency framework delineating heat alert triggers, hospital burn/heatstroke ward preparedness, cool roof programs, and water distribution tanker routes.'
      },
      {
        id: 'del-ref-2',
        title: 'IPCC AR6 WGII Chapter 10: Asia (Urban Heat and Megacity Stress)',
        organization: 'IPCC',
        type: 'International Assessment',
        category: 'official',
        year: '2022',
        url: 'https://www.ipcc.ch/report/ar6/wg2/chapter/chapter-10/',
        relevance: 'Comprehensive evaluation of rising wet-bulb temperature thresholds in Northern India and catastrophic heat stress implications for megacities.'
      },
      {
        id: 'del-ref-3',
        title: 'Mitigating the Urban Heat Island Effect in Indian Megacities',
        organization: 'Ministry of Housing and Urban Affairs (PIB Release)',
        type: 'Government Technical Release',
        category: 'official',
        year: '2023',
        url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2286772&lang=1&reg=48',
        relevance: 'National policy guidelines recommending high-albedo cool paints, permeable pavements, and urban green lung preservation in dense metropolitan zones like Delhi.'
      },
      {
        id: 'del-ref-4',
        title: 'NDMA National Guidelines for Preparation of Action Plan - Prevention and Management of Heat Wave',
        organization: 'National Disaster Management Authority (NDMA)',
        type: 'National Policy Guidelines',
        category: 'preparedness',
        year: '2019',
        url: 'https://upsdma.up.nic.in/ndma_guidline.htm',
        relevance: 'Standard national methodology for determining heatwave thresholds, inter-departmental responsibilities, and emergency ORS medical stations.'
      },
      {
        id: 'del-ref-5',
        title: 'Delhi Disaster Management Authority Official Plans and Resources',
        organization: 'DDMA, Government of NCT of Delhi',
        type: 'Official Portal',
        category: 'official',
        year: '2024',
        url: 'https://ddma.delhi.gov.in/ddma/ddma-plan-home',
        relevance: 'Repository of official district disaster management plans, flood emergency SOPs, and earthquake seismic Zone IV mitigation checklists.'
      },
      {
        id: 'del-ref-6',
        title: 'Satellite Assessment of Urban Heat Island Dynamics over Delhi NCR',
        organization: 'Atmospheric Environment / Elsevier',
        type: 'Peer-Reviewed Scientific Study',
        category: 'scientific',
        year: '2023',
        url: 'https://www.sciencedirect.com/journal/atmospheric-environment',
        relevance: 'Quantifies day and night surface urban heat island intensity (SUHII) using MODIS thermal data, proving a 5-8°C differential between concrete cores and the Ridge.'
      },
      {
        id: 'del-ref-7',
        title: 'Yamuna Flood 2023: Hydraulic Modeling and Regulator Gate Diagnostic',
        organization: 'Central Water Commission (CWC) Technical Review',
        type: 'Official Technical Study',
        category: 'scientific',
        year: '2023',
        url: 'https://www.cwc.gov.in/',
        relevance: 'Technical analysis of the 208.66m flood level, evaluating Hathnikund peak release rates, riverbed sedimentation, and barrage operations.'
      },
      {
        id: 'del-ref-8',
        title: 'Verified Reporting: Delhi Records Unprecedented 49.9°C; Power Grid Peaks',
        organization: 'The Indian Express / NDTV',
        type: 'Verified News Coverage',
        category: 'news',
        year: '2024',
        url: 'https://indianexpress.com/article/cities/delhi/delhi-temperature-record-heatwave-mungeshpur-9359146/',
        relevance: 'Verified journalistic coverage of the record-shattering 2024 summer heat, water scarcity protests, and emergency labor protection orders.'
      }
    ],
    solutions: {
      individual: [
        'Reschedule heavy outdoor exertion and manual chores away from the peak danger window (12:00 PM – 4:00 PM).',
        'Drink plenty of oral rehydration solutions (ORS), lemon water, or buttermilk, even when not actively feeling thirsty.',
        'Apply white reflective solar coating (cool roof paint) to rooftop slabs to reduce indoor ambient temperatures by 3-5°C.',
        'Never leave infants, children, or pets unattended in parked vehicles, where temperatures can turn fatal within 10 minutes.'
      ],
      community: [
        'Set up "Pyaau" public drinking water stations and shaded transit waiting shelters at local neighborhood markets.',
        'Enforce mandatory paid rest pauses with cool water access for construction workers and domestic delivery staff.',
        'Protect and increase neighborhood tree canopy density using native neem, jamun, and peepal trees.'
      ],
      municipal: [
        'Implement an integrated unified drainage master plan across MCD, PWD, and DDA to eliminate jurisdictional delays.',
        'Restore the natural ecological buffer and flood retention wetland capacity of the Yamuna riverbed (khadar).',
        'Install automated ultrasonic water level sensors and heavy-duty backup de-watering pumps at all 28 critical underpasses.',
        'Expand urban cool corridors with high-albedo road surfaces and mandatory green roofing norms in building bylaws.'
      ]
    }
  },

  goa: {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    region: 'South-Western Coastal Belt',
    coordinates: { lat: 15.2993, lng: 74.1240 },
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    summary: 'A biodiversity-rich coastal state flanked by the Arabian Sea and the Western Ghats (Sahyadris). Highly exposed to extreme monsoon precipitation spikes, coastal storm surges, beach erosion, and steep-slope landslides.',
    stats: {
      elevation: '0 – 1,022 meters (Western Ghats)',
      population: '1.58 Million',
      density: '394 people / km²',
      coastlineLength: '105 km Coastline',
      avgMonsoonRainfall: '3,000 – 4,200 mm / year',
      climateType: 'Tropical Monsoon (Am)'
    },
    riskEngine: {
      overallScore: 74,
      riskLevel: 'Medium-High',
      components: [
        { name: 'Hazard Intensity', weight: '30%', score: 78, desc: 'Immense annual monsoon volume (over 3,500 mm) with intense orographic cloudbursts.' },
        { name: 'Exposure', weight: '25%', score: 75, desc: 'High concentration of tourism infrastructure, heritage villages, and fishing communities along the coastline.' },
        { name: 'Vulnerability', weight: '25%', score: 72, desc: 'Vulnerable Western Ghats ghat roads and low-lying Khazan estuarine agro-ecosystems.' },
        { name: 'Infrastructure Deficit', weight: '10%', score: 70, desc: 'Constrained river channels and silted tidal creeks (Mandovi, Zuari, Chapora).' },
        { name: 'Preparedness Capacity', weight: '10%', score: 74, desc: 'Goa SDMP 2024, coastal lifeguard surveillance networks (Drishti Marine), and IMD Panaji radar.' }
      ]
    },
    hazards: [
      {
        id: 'coastal_flood_goa',
        name: 'Coastal Flooding & Tidal Surge',
        severity: 'High',
        color: 'rose',
        frequency: 'Every Monsoon High-Tide Spell',
        shortDesc: 'Arabian Sea storm surges pushing into low-lying tidal rivers (Mandovi and Zuari) and Khazan lands.',
        formationFlow: [
          { step: '1', title: 'Southwest Monsoon Gush', desc: 'Moist winds blow unabated against the Konkan coast, driving heavy ocean swells.' },
          { step: '2', title: 'High Spring Tide Inundation', desc: 'Astronomical spring tides elevate Arabian Sea levels by over 2.5 meters.' },
          { step: '3', title: 'Khazan Embankment Overtopping', desc: 'Centuries-old saline protective bunds overtop or breach, submerging coastal agricultural fields.' },
          { step: '4', title: 'Estuarine Backup', desc: 'Mandovi and Zuari rivers cannot discharge rainfall runoff, flooding Panaji and coastal towns.' }
        ]
      },
      {
        id: 'landslide_goa',
        name: 'Western Ghats Slope Landslides & Rockfalls',
        severity: 'High',
        color: 'amber',
        frequency: 'Peak Monsoon (July – August)',
        shortDesc: 'Steep road cuts and deforested slopes along Chorla Ghat and Anmod Ghat collapsing under heavy rain.',
        formationFlow: [
          { step: '1', title: 'Prolonged Rainfall', desc: 'Orographic precipitation on the Western Ghats exceeds 150-250 mm/day for multiple days.' },
          { step: '2', title: 'Soil Saturation & Pore Pressure', desc: 'Lateritic clay topsoils become fully saturated, reducing shear strength along bedrock joints.' },
          { step: '3', title: 'Slope Failure', desc: 'Massive mud and boulder slides crash onto interstate ghat highways, cutting connectivity.' }
        ]
      },
      {
        id: 'beach_erosion',
        name: 'Severe Beach & Dune Erosion',
        severity: 'Medium-High',
        color: 'blue',
        frequency: 'Seasonal & Long-Term',
        shortDesc: 'Energetic monsoon wave action scouring coastal sandy stretches (Candolim, Morjim, Colva).',
        formationFlow: [
          { step: '1', title: 'Monsoon High Wave Energy', desc: 'Significant wave heights exceed 3.5 to 5 meters during offshore depressions.' },
          { step: '2', title: 'Destruction of Sand Dunes', desc: 'Unregulated beachfront construction removes natural stabilizing sand dune flora.' },
          { step: '3', title: 'Permanent Land Loss', desc: 'Coastal shacks, coconut groves, and roads face direct undermining and erosion.' }
        ]
      }
    ],
    whyAtRisk: {
      summary: 'Goa’s vulnerability stems from its narrow coastal geography squeezed between a high-energy sea and the steep Western Ghats, where extreme monsoon rains collide with vulnerable estuarine lowlands.',
      factors: [
        {
          title: 'Narrow Geography Squeezed Between Sea and Sahyadri',
          category: 'Geography',
          detail: 'Goa spans only 60 km from the Arabian Sea coast to the 1,000-meter ridges of the Western Ghats. Rivers have short, steep courses that rapidly flush mountain floodwaters directly into the tidal coastal plain.'
        },
        {
          title: 'Vulnerability of the Ancient Khazan Lands',
          category: 'Ecological Heritage',
          detail: 'Over 18,000 hectares of coastal Goa consist of Khazans—low-lying reclaimed estuarine wetlands protected by earthen dykes and flap-valves. Sea-level rise and lack of bund maintenance threaten to turn these lands permanently saline.'
        },
        {
          title: 'Western Ghats Orographic Rainfall Funnel',
          category: 'Climate',
          detail: 'The Sahyadri mountain wall forces moisture-laden Arabian Sea monsoon winds to rise rapidly, condensing into intense downpours that frequently exceed 4,000 mm in Valpoi and Sanguem.'
        },
        {
          title: 'Coastal Tourism Infrastructure Pressure',
          category: 'Development',
          detail: 'Heavy tourism development along fragile sand dunes and coastal dunes reduces the coast’s natural shock-absorption against cyclones and tidal surges.'
        }
      ]
    },
    disasterLens: {
      timeline: [
        {
          year: '2021',
          name: 'The July 2021 Goa Deluge & Landslides',
          type: 'Extreme Flood & Multiple Landslides',
          severity: 'Severe',
          date: 'July 22 – 24, 2021',
          whatHappened: 'Worst flooding in Goa in 40 years as over 400 mm of rain fell in 48 hours; rivers Mhadei/Mandovi and Chapora submerged Sattari and Bicholim.',
          scientificCause: 'An offshore trough combined with intense low-pressure vortex over the Konkan coast funneled non-stop torrential downpours.',
          impact: 'Over 1,000 houses damaged; hundreds evacuated; key bridges submerged; 7 major landslides along Chorla Ghat and Dudhsagar railway line.',
          lessonsLearned: 'Highlighted the critical need for real-time upstream rain gauges in the Mhadei basin and reinforced slope stabilization.'
        },
        {
          year: '2021',
          name: 'Cyclone Tauktae Coastal Destruction',
          type: 'Extremely Severe Cyclonic Storm',
          severity: 'High',
          date: 'May 16, 2021',
          whatHappened: 'Passed within 100 km of the Goa coast with sustained 100 km/h winds, knocking out the entire state electricity grid.',
          scientificCause: 'High sea-surface temperature (31°C) allowed the cyclone to maintain extreme intensity as it skirted the Goa coast.',
          impact: 'Entire state plunged into blackout for 4 days; severe destruction of coastal shacks, fishing boats, and over 1,500 trees uprooted.',
          lessonsLearned: 'Fast-tracked conversion of coastal tourism electrical lines from overhead poles to underground cables.'
        },
        {
          year: '2023',
          name: 'Ghat Highway Slope Collapses',
          type: 'Monsoon Highway Landslide',
          severity: 'Moderate-High',
          date: 'July 2023',
          whatHappened: 'Massive landslide blocked the vital Anmod Ghat connecting Goa to Belagavi, cutting cargo traffic for over 10 days.',
          scientificCause: 'Unstabilized steep hill-cutting during highway widening combined with 300 mm continuous rain caused circular slope shear failure.',
          impact: 'Severe disruption of essential vegetable and milk supply chains from Karnataka.',
          lessonsLearned: 'Mandated geo-textile reinforced soil walls and soil nailing for all Western Ghats road widening.'
        }
      ],
      thenVsNow: {
        title: 'Goa Disaster Preparedness Evolution (2015 vs 2026)',
        then: {
          period: '2015',
          warning: 'Generic coastal state warnings without taluka-level rain and river level monitoring.',
          rescue: 'Local fire and emergency services with limited inflatable boat fleets and scuba capabilities.',
          policy: 'Fragmented coastal zone management without specific climate and health action plans.'
        },
        now: {
          period: 'Present Day (2026)',
          warning: 'Goa SDMP 2024 implementation; IMD Panaji C-band Doppler Weather Radar with color-coded alerts.',
          rescue: 'Trained coastal lifeguard force (Drishti Marine) integrated into disaster evacuation; NDRF pre-positioning.',
          policy: 'State Action Plan on Climate Change and Human Health (SAPCCHH) focusing on vector-borne disease and heat.'
        }
      },
      patternAnalysis: [
        { hazard: 'Extreme Monsoon Downpours', level: 92, label: 'Very High', color: 'bg-blue-600' },
        { hazard: 'Western Ghats Landslides', level: 82, label: 'High', color: 'bg-amber-500' },
        { hazard: 'Coastal Storm Surge & Inundation', level: 80, label: 'High', color: 'bg-cyan-500' },
        { hazard: 'Beach & Dune Erosion', level: 78, label: 'High', color: 'bg-yellow-500' },
        { hazard: 'Arabian Sea Cyclones', level: 70, label: 'Medium-High', color: 'bg-rose-500' }
      ]
    },
    references: [
      {
        id: 'goa-ref-1',
        title: 'Goa State Disaster Management Plan (SDMP) 2024',
        organization: 'Goa State Disaster Management Authority (SDMA)',
        type: 'Official Master Plan',
        category: 'official',
        year: '2024',
        url: 'https://www.sdma.goa.gov.in/sites/default/files/2024-07/State%20Disaster%20Management%20Plan%202024_0.pdf',
        relevance: 'Authoritative state master plan identifying flood-prone talukas, Western Ghats landslide hotspots, coastal erosion zones, and multi-agency response protocols.'
      },
      {
        id: 'goa-ref-2',
        title: 'Goa District Disaster Management Plans (North & South Goa)',
        organization: 'Goa SDMA',
        type: 'District Operational Plans',
        category: 'official',
        year: '2024',
        url: 'https://www.sdma.goa.gov.in/district-disaster-management-plans',
        relevance: 'Micro-level resource mapping, vulnerable village registries, shelter locations, and evacuation command chains for North and South Goa districts.'
      },
      {
        id: 'goa-ref-3',
        title: 'Goa State Action Plan on Climate Change and Human Health (SAPCCHH)',
        organization: 'National Centre for Disease Control (NCDC) & Dept. of Health, Goa',
        type: 'Official Climate & Health Plan',
        category: 'official',
        year: '2024',
        url: 'https://ncdc.mohfw.gov.in/wp-content/uploads/2024/05/6.SAPCCHH-VERSION-1-Goa.pdf',
        relevance: 'Documents increasing peak rainfall spikes, flood incidents, coastal vector-borne disease risks (dengue/malaria), and heat stress mitigation.'
      },
      {
        id: 'goa-ref-4',
        title: 'Assessment of Coastal Erosion and Shoreline Change along the Goa Coast',
        organization: 'National Institute of Oceanography (CSIR-NIO, Goa)',
        type: 'Scientific Research Study',
        category: 'scientific',
        year: '2022',
        url: 'https://www.nio.res.in/',
        relevance: 'Scientific monitoring of sand dune loss, sediment transport dynamics, and the impact of severe monsoon wave attack on tourist beaches.'
      },
      {
        id: 'goa-ref-5',
        title: 'IPCC AR6 WGII Chapter 10: Asia (Small Coastal States & Tourism Infrastructure)',
        organization: 'IPCC',
        type: 'International Assessment',
        category: 'official',
        year: '2022',
        url: 'https://www.ipcc.ch/report/ar6/wg2/chapter/chapter-10/',
        relevance: 'Highlights coastal tourism asset vulnerability, sea-level rise economic risks, and ecosystem-based adaptation for small coastal regions.'
      },
      {
        id: 'goa-ref-6',
        title: 'Landslide Hazard Zonation and Slope Stability in the Western Ghats of Goa',
        organization: 'Geological Survey of India (GSI)',
        type: 'National Scientific Technical Study',
        category: 'scientific',
        year: '2023',
        url: 'https://www.gsi.gov.in/',
        relevance: 'Detailed landslide susceptibility mapping of Chorla, Anmod, and Karmal ghat sections based on lithology, slope angle, and monsoon saturation.'
      },
      {
        id: 'goa-ref-7',
        title: 'Verified Reporting: Floods and Landslides Ravage Sattari and Bicholim in Goa',
        organization: 'The Indian Express / Herald Goa',
        type: 'Verified News Coverage',
        category: 'news',
        year: '2021',
        url: 'https://indianexpress.com/article/india/goa-floods-heavy-rain-landslide-7418295/',
        relevance: 'On-the-ground reporting detailing unprecedented 2021 monsoon inundations, damage to village bridges, and community rescue operations.'
      },
      {
        id: 'goa-ref-8',
        title: 'Monsoon Sea-Safety and Cyclone Preparedness Advisories',
        organization: 'Goa Coastal Police & Drishti Marine Lifesaving',
        type: 'Preparedness Guideline',
        category: 'preparedness',
        year: '2024',
        url: 'https://www.drishtimarine.com/',
        relevance: 'Official public guidelines on red-flag beach closures, prohibition of swimming during rough seas, and fishing vessel harbour return protocols.'
      }
    ],
    solutions: {
      individual: [
        'Heed red-flag beach advisories and refrain from swimming or water sports in the Arabian Sea during rough monsoon conditions.',
        'Avoid driving through vulnerable Western Ghats ghat roads (Chorla, Anmod) during heavy downpour red alerts.',
        'Regularly inspect and clear private roof gutter drainage and compound outlets before the late-May pre-monsoon showers.',
        'Maintain emergency supplies including rechargeable torches and battery banks for widespread power disruptions during coastal squalls.'
      ],
      community: [
        'Revitalize traditional Communidade management of traditional Khazan bunds and sluice gates (Manos) to prevent saltwater breaches.',
        'Protect and conserve sand dune vegetation (Spinifex, Ipomoea) along beaches to maintain natural wave barriers.',
        'Form village disaster committees trained in chainsaw clearance of fallen trees and basic first-aid.'
      ],
      municipal: [
        'Enforce strict adherence to CRZ norms prohibiting construction within 200m of high-tide lines on fragile sand dunes.',
        'Implement bio-engineering techniques (vetiver grass and geo-textiles) alongside rock bolting for Western Ghats highway cuttings.',
        'Transition vulnerable overhead coastal electrical distribution networks to underground armored cable trenches.',
        'Install automated telemetry water level stations on the Mhadei, Valvanti, and Chapora rivers for 6-hour advance village flood alerts.'
      ]
    }
  }
};
