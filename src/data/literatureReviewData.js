// Literature Review, Research Sources, and Study Objectives
// Faithful representation of Slide 6 and Slide 7 from the project framework

export const LITERATURE_REVIEW_DATA = {
  title: 'Literature Review & Scientific Grounding',
  subtitle: 'Authoritative Sources Guiding the ClimateGuard AI Framework',
  slides: {
    slide6: {
      slideNumber: 6,
      title: 'Literature Review: Sources Used for Our Research',
      question: 'Where did you get your information from?',
      sources: [
        {
          id: 1,
          name: 'IPCC – Intergovernmental Panel on Climate Change',
          type: 'International scientific report (AR6 WGII)',
          usedFor: 'Climate change science, rising temperatures, extreme weather, climate vulnerability, risk and adaptation across Asia (Chapter 10).',
          badge: 'International Consensus',
          badgeColor: 'blue'
        },
        {
          id: 2,
          name: 'World Bank Report on Kolkata',
          type: 'Official Technical & Hydrological Report',
          usedFor: 'Kolkata flooding, increased precipitation, drainage vulnerability, climate adaptation, hydrological and storm-drainage modelling.',
          badge: 'Official Report',
          badgeColor: 'emerald'
        },
        {
          id: 3,
          name: 'Scientific Reports – 2025 (Nature Portfolio)',
          type: 'Peer-reviewed research article',
          usedFor: 'Sea-level rise and future coastal flooding in major Indian cities. Kolkata and Mumbai identified as high risk with extensive water submersion under higher-emission scenarios.',
          badge: 'Peer-Reviewed',
          badgeColor: 'purple'
        },
        {
          id: 4,
          name: 'Cyclone Amphan & Bay of Bengal Research',
          type: 'Scientific articles & Atmospheric journals',
          usedFor: 'Amphan’s rapid intensification linked to warm sea-surface temperatures, high ocean heat content, and low wind shear.',
          badge: 'Atmospheric Physics',
          badgeColor: 'rose'
        },
        {
          id: 5,
          name: 'Nepal Flood & Glacier Evidence (Nature/Reuters)',
          type: 'Scientific news / field investigative reporting',
          usedFor: 'Glacier collapse and landslide/flash-flood cascades. Warming increases high-altitude cryosphere instability in transboundary basins.',
          badge: 'Verified News & Evidence',
          badgeColor: 'amber'
        }
      ],
      summaryTable: [
        { source: 'IPCC', type: 'International scientific report', usedFor: 'Climate change and vulnerability' },
        { source: 'World Bank', type: 'Official report', usedFor: 'Kolkata flood vulnerability' },
        { source: 'Scientific Reports (2025)', type: 'Peer-reviewed article', usedFor: 'Sea-level rise and future flooding' },
        { source: 'Cyclone research journals', type: 'Scientific articles', usedFor: 'Amphan intensification' },
        { source: 'Nature / Reuters', type: 'Recent verified scientific news', usedFor: 'Transboundary flood and glacier disaster cascade' }
      ]
    },
    slide7: {
      slideNumber: 7,
      title: 'Objectives of the Study',
      mainObjectives: [
        {
          step: 1,
          icon: 'thermometer',
          title: 'Understand Climate Change and Disaster Risk',
          description: 'To study how climate change can influence extreme weather and environmental hazards.'
        },
        {
          step: 2,
          icon: 'cpu',
          title: 'Analyse Different Disaster Mechanisms',
          description: 'To understand the scientific causes behind: Heatwaves • Cyclones • Flash floods • Coastal surges.'
        },
        {
          step: 3,
          icon: 'search',
          title: 'Compare Major Case Studies',
          description: 'To compare real-world disaster events: Heatwaves (Delhi/Bihar) • Cyclone Amphan (Kolkata) • Mumbai 2005 Deluge • Goa Coastal Landslides.'
        },
        {
          step: 4,
          icon: 'map-pin',
          title: 'Study Location Vulnerability',
          description: 'To understand why specific locations face increasing risks from: Extreme rainfall • Urban flooding • Sea-level rise • Coastal flooding.'
        },
        {
          step: 5,
          icon: 'code',
          title: 'Develop a Smart Risk Assessment Prototype',
          description: 'To design a software model that can: Analyse hazard information • Assess vulnerability • Generate a transparent demonstration risk score • Provide preparedness recommendations.'
        }
      ],
      processFlow: [
        { key: 'UNDERSTAND', label: '1. Understand', color: 'bg-sky-500' },
        { key: 'ANALYSE', label: '2. Analyse', color: 'bg-indigo-600' },
        { key: 'COMPARE', label: '3. Compare', color: 'bg-amber-500' },
        { key: 'ASSESS', label: '4. Assess', color: 'bg-emerald-600' },
        { key: 'PREPARE', label: '5. Prepare', color: 'bg-teal-700' }
      ]
    }
  }
};
