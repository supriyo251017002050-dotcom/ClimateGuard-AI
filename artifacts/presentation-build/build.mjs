import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {Presentation,PresentationFile} from '@oai/artifact-tool';
const root='C:/Users/treet/Downloads/Disaster_management';
const build=root+'/artifacts/presentation-build';
const out=root+'/artifacts/presentation';
const skill='C:/Users/treet/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations';
const runtime='C:/Users/treet/.cache/codex-runtimes/codex-primary-runtime/dependencies';
process.env.RUNTIME_NODE_MODULES=runtime+'/node/node_modules';
const {finalizePresentation,applyPresentationChartFont}=await import(pathToFileURL(skill+'/container_tools/artifact_tool_utils.mjs').href);
await fs.mkdir(out,{recursive:true});
const P=Presentation.create({slideSize:{width:1280,height:720}});
const C={bg:'#F5F2EA',ink:'#152D39',green:'#3E705F',sage:'#DDE7DF',coral:'#BA634C',muted:'#596A70',line:'#C8CFC9',white:'#FFFFFF'};
const figma='https://www.figma.com/board/4XSE3ihyhkTNFJNg2Ty6BW';
const canva='https://canva.link/cbyvxudo1ymblax';
const heat='https://www.ceew.in/publications/mapping-climate-risks-and-impacts-of-extreme-heatwave-disaster-in-indian-districts';
function txt(s,t,x,y,w,h,size=26,bold=false,color=C.ink){const a=s.shapes.add({geometry:'textbox',position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});a.text=t;a.text.style={fontSize:size,typeface:'Arial',bold,color,autoFit:'none',wrap:'square',insets:0,verticalAlignment:'top'};return a;}
function slide(title,n,notes='',dark=false){const s=P.slides.add();s.background.fill=dark?C.ink:C.bg;if(title)txt(s,title,64,48,1150,80,44,true,dark?C.bg:C.ink);txt(s,'ClimateGuard AI   /   Team EUREKA',64,675,700,24,15,false,dark?'#B4C7BD':C.muted);txt(s,String(n).padStart(2,'0'),1175,670,50,30,18,true,dark?C.bg:C.ink);s.speakerNotes.text=notes;return s;}
function block(s,title,body,x,y,w=520){txt(s,title,x,y,w,38,26,true,C.green);txt(s,body,x,y+48,w,105,25);}
function node(s,t,x,y,w,h,fill=C.sage){const a=s.shapes.add({geometry:'roundRect',position:{left:x,top:y,width:w,height:h},fill,line:{fill:C.green,width:1.5}});a.text=t;a.text.style={fontSize:23,typeface:'Arial',bold:true,color:C.ink,alignment:'center',verticalAlignment:'middle',wrap:'square',insets:14};return a;}
function conn(s,a,b,from='right',to='left'){s.shapes.connect(a,b,{kind:'straight',fromSide:from,toSide:to,line:{fill:C.green,width:2},tail:{type:'triangle',width:'med',length:'med'}});}
function link(s,label,url,x,y,w=1000,size=18){const a=txt(s,label,x,y,w,30,size,false,C.green);a.text.get(label).link={uri:url,isExternal:true};return a;}
function chartFont(c){applyPresentationChartFont(c,{fontFamily:'Arial'});}
const source='Source: supplied ClimateGuard_AI_Resilience_Blueprint.pptx, slides 14–18. These slides describe a concept, not proof of validated operational performance.';

// 1 — title
{
const s=slide('',1,`Good morning. We are Team EUREKA. ClimateGuard AI is an India-focused web-based application for climate-risk awareness, geographic hazard exploration and preparedness learning. We also demonstrate source-backed monitoring and a simulated response workflow. ${source}`,true);
txt(s,'ClimateGuard AI',64,130,1120,100,76,true,C.bg);
txt(s,'A web-based application for\ndisaster awareness and preparedness',68,258,1100,130,38,false,'#DDE7DF');
txt(s,'Know the risk. Learn from the past. Prepare for the future.',68,436,1110,50,28,false,'#DDE7DF');
txt(s,'TEAM EUREKA',68,547,700,34,25,true,C.bg);
txt(s,'BCA — Data Science & Artificial Intelligence',68,591,1000,38,24,false,'#B4C7BD');
}
// 2 — problem
{
const s=slide('Problem understanding',2,`The problem is connecting a hazard warning to local context: what affects this location, why it is vulnerable, and how to prepare. Intended early users are students, educators, residents and community volunteers. Official warning services already exist; SACHET provides geo-targeted alerts. Our integration and learning gap is a design hypothesis, not a measured market gap. CEEW's 2025 study assessed 734 districts: about 57% were high or very high heat risk and those districts housed 76% of India's population. These are different denominators and are not counts of our users. 43% is the rounded complement. Sources: ${heat}; https://sachet.ndma.gov.in/ . Canva chart design: ${canva}. The native PowerPoint chart preserves exact rounded data and proportional scaling.`);
txt(s,'A warning needs local context',64,151,560,52,32,true);
txt(s,'Users need to understand which hazards affect a location, why it is vulnerable, and how to prepare.',64,218,550,140,28);
block(s,'Who is affected','Students, educators, residents\nand community volunteers',64,402,540);
txt(s,'HEAT RISK IN INDIA · CEEW 2025',700,157,510,34,20,true,C.green);
const c=s.charts.add('bar',{position:{left:690,top:222,width:520,height:210},categories:['Districts'],series:[{name:'High / very high',values:[0.57],fill:C.coral},{name:'Other categories',values:[0.43],fill:C.sage}],barOptions:{direction:'bar',grouping:'stacked',overlap:100,gapWidth:45},hasLegend:true,legend:{position:'bottom',textStyle:{fontSize:18,fill:C.ink}},xAxis:{visible:false,min:0,max:1},yAxis:{visible:false},dataLabels:{showValue:true,position:'center',numberFormatCode:'0%',textStyle:{fontSize:26,bold:true,fill:C.ink}},chartFill:C.bg,plotAreaFill:C.bg});chartFont(c);
txt(s,'76%',704,443,180,76,62,true,C.green);txt(s,'of India’s population lives\nin the high-risk districts',892,454,330,75,24);
txt(s,'Official alerts already exist. We explore the connection to local understanding and training.',64,584,1150,58,24,true);
txt(s,'Source: CEEW (20 May 2025). District share and population share use different denominators.',64,644,1140,25,15,false,C.muted);
}
// 3 — solution & Figma
{
const s=slide('Proposed solution',3,`ClimateGuard AI brings location-based climate education, source-labelled hazard information and preparedness guidance into one application. The concept flow is adapted from the supplied slides 14–18. Some educational screens still contain demonstration content. The benefit of better understanding is intended and must be validated with users. Diagram authored in FigJam: ${figma}; recreated here as editable native nodes and connectors. ${source}`);
txt(s,'One place to explore local hazards and learn how to prepare',64,155,1130,100,34,true);
const labels=['Select a\nlocation','Explore local\nhazards','Understand\nvulnerability and\npast events','Review\npreparedness\nguidance','Better risk\nunderstanding'];
const nodes=labels.map((t,i)=>node(s,t,64+i*238,306,200,154));nodes.slice(1).forEach((v,i)=>conn(s,nodes[i],v));
txt(s,'Combines geographic context, educational profiles and visible data sources.',64,509,1120,58,27);
txt(s,'Prototype scope: five detailed profiles; demonstration scores; no disaster prediction.',64,584,1130,47,23,false,C.muted);
link(s,'Editable concept diagram in Figma',figma,64,638,900,16);
}
// 4 — architecture
{
const s=slide('Technical architecture',4,`Input: selected location, static profiles, external hazard responses, and demo incident reports. Processing: Node.js middleware inside the Vite development server normalizes XML/GeoJSON/CSV, caches feeds and assigns coordinates to states with point-in-polygon logic. A finite-state workflow constrains incident actions. Output: React screens and Cesium map markers. Static profiles are bundled with the frontend. Incidents and audit entries are in memory; there is no persistent database. The optional chatbot uses a configured external LLM API; no disaster-prediction model is trained. The AI does not dispatch teams or independently verify current hazards. Source: vite.config.js; server/hazards.js; server/incidents.js; server/chat.js; src/components/IndiaGlobe.jsx. Main active map engine is CesiumJS.`);
const input=node(s,'External hazard feeds\nIMD CAP · USGS\nFIRMS · Open-Meteo',64,184,330,125);
const api=node(s,'Node.js / Vite middleware\nNormalize · cache\nGeographic matching',474,184,330,125);
const ui=node(s,'React + CesiumJS\nSource-labelled events\nInteractive location view',884,184,330,125);
conn(s,input,api);conn(s,api,ui);
const profiles=node(s,'Static profiles\nFive focus locations',884,393,330,105);
conn(s,profiles,ui,'top','bottom');
const incident=node(s,'Demo incidents\nState transitions + audit\nIn-memory storage',474,393,330,105);
conn(s,api,incident,'bottom','top');
const llm=node(s,'Optional external LLM\nGeneral explanations',64,393,330,105);
s.shapes.connect(api,llm,{kind:'elbow',fromSide:'left',toSide:'right',line:{fill:C.green,width:2},tail:{type:'triangle',width:'med',length:'med'}});
txt(s,'Frontend: React 19 · Tailwind CSS 4 · CesiumJS',64,548,1135,42,25,true);
txt(s,'Backend: Node.js + Vite 8 middleware · No persistent database',64,593,1140,43,24);
txt(s,'Input: location + feeds + reports     Process: normalization + rules     Output: map + learning + demo status',64,641,1145,27,16,false,C.muted);
}
// 5 — novelty
{
const s=slide('Innovation and novelty',5,`The contribution is an integrated educational workflow, rather than a claim that disaster platforms did not previously exist. SACHET already aggregates official warnings. Our prototype combines local learning, map exploration, source freshness and simulated report handling. We have not established global novelty, validated scoring, superior alert accuracy, or measured improvement over existing services. All dashboard risk scores must be described as demonstration values. Source: supplied slides 14–18; README.md; docs/LIVE_OPERATIONS.md; https://sachet.ndma.gov.in/ .`);
txt(s,'Contribution: local learning with transparent data and workflow practice',64,157,1130,94,34,true);
block(s,'Location-centred understanding','Connect a selected place to hazards, vulnerability context and preparedness.',64,303,535);
block(s,'Visible data quality','Keep source and timestamp visible. Distinguish unavailable data from no events.',696,303,510);
block(s,'Incident-handling practice','Demonstrate review, verification, assignment and resolution with activity history.',64,476,535);
block(s,'Position alongside official tools','Supports awareness and training. Official warnings and emergency decisions stay with authorities.',696,476,510);
}
// 6 — feasibility chart
{
const s=slide('Feasibility and viability',6,`A classroom demonstration runs on a laptop with Node.js, browser and internet. React, Vite and CesiumJS provide the application foundation. Public data services may have terms, quotas or key requirements; FIRMS requires a key and chatbot use may incur provider charges. Free or low-cost access does not imply unlimited production usage. Cache intervals reduce repeat requests: USGS 1 min, official alerts 2 min, Open-Meteo 5 min, FIRMS 15 min. They are not end-to-end warning latency guarantees. Public scaling requires a separate production backend, authentication, persistent storage, quotas and monitoring. No load testing is claimed. Source: package.json; server/hazards.js; docs/LIVE_OPERATIONS.md; docs/CHATBOT_SETUP.md. Canva chart design: ${canva}; native chart recreated for exact proportional data.`);
block(s,'Resources for a local demo','Laptop, browser, Node.js and internet.\nOpen-source application libraries.',64,161,520);
block(s,'Provider access','Public hazard services; keys where required. Optional LLM calls may incur charges.',64,340,520);
block(s,'Path to more users','Production backend, authentication, durable storage and load testing.',64,520,520);
txt(s,'Configured cache intervals',672,163,530,45,29,true);
const c=s.charts.add('bar',{position:{left:648,top:233,width:568,height:329},categories:['USGS','IMD CAP','Open-Meteo','NASA FIRMS'],series:[{name:'Minutes',values:[1,2,5,15],fill:C.green}],barOptions:{direction:'bar',grouping:'clustered',gapWidth:70},hasLegend:false,xAxis:{visible:true,min:0,max:15,majorUnit:5,numberFormatCode:'0',textStyle:{fontSize:19,fill:C.ink}},yAxis:{visible:true,min:0,max:16,majorUnit:5,textStyle:{fontSize:20,fill:C.ink}},dataLabels:{showValue:true,position:'outEnd',textStyle:{fontSize:22,bold:true,fill:C.ink}},chartFill:C.bg,plotAreaFill:C.bg});chartFont(c);
txt(s,'Minutes · shorter bars refresh the cache sooner',690,574,514,45,18,false,C.muted);
txt(s,'Implementation settings, not guaranteed warning latency.',672,624,540,38,17,false,C.muted);
}
// 7 — impact
{
const s=slide('Impact and benefits',7,`Expected benefits: clearer local risk understanding for students and residents; structured practice for community volunteers; a basis for feedback from educators and domain reviewers. These benefits have not been measured in a field study. Current software evidence: five bundled location profiles, four integrated hazard/feed families and 19 passing automated tests reported in the repository review on 8 October 2026, with mocked providers and simulated incidents. Tests do not establish scientific accuracy or real-world safety. Proposed pilot: compare time to locate a relevant source, a short before/after knowledge quiz, and completion of a simulated incident lifecycle. Collect baseline values before estimating improvements. ${source} Source: locationsData.js; hazards.js; npm test results from project review.`);
const cols=[{x:64,n:'5',label:'prototype location\nprofiles'},{x:480,n:'4',label:'hazard / weather\nfeed families'},{x:896,n:'19',label:'automated tests passed'}];
for(const c of cols){txt(s,c.n,c.x,162,320,110,86,true,C.green);txt(s,c.label,c.x,284,318,74,25,true);}
txt(s,'Intended benefits',64,409,480,39,28,true);
txt(s,'Students and residents: clearer risk understanding.\nVolunteers: structured incident-handling practice.',64,463,1100,88,27);
txt(s,'Pilot measures: source-finding time, knowledge gain and workflow completion.',64,574,1130,58,25,true);
txt(s,'Impact is not yet measured. No claims of lives saved, cost reduction or prediction accuracy.',64,642,1130,26,16,false,C.muted);
}
// 8 — prototype
{
const s=slide('Prototype and demonstration',8,`Demonstrate the application locally with npm run dev at http://localhost:5173. The launcher also starts the adapted God's Eye View runtime on localhost:4173. Follow one story: select Kolkata, inspect source and timestamp, create a clearly labelled demo report, review it, assign a demo team, resolve it and inspect the activity history. Do not claim this is deployed publicly. The image is an existing repository verification screenshot dated 14 September 2026, not today's live feed. It shows the embedded Live View integration and simulation banner. Source image: artifacts/live-view-redesign.png, described in artifacts/README.md. Upstream attribution: https://github.com/bilawalsidhu/gods-eye-view (MIT). Educational screens still have placeholders; current scope is a local lab prototype, not validated operational deployment.`);
const b=await fs.readFile(root+'/artifacts/live-view-redesign.png');s.images.add({blob:b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength),contentType:'image/png',alt:'Archived ClimateGuard Live Operations screenshot from September 2026',fit:'contain',position:{left:64,top:160,width:752,height:470}});
txt(s,'Demo story',907,166,300,40,30,true,C.green);
txt(s,'1  Select Kolkata\n\n2  Inspect a source\n\n3  Submit a demo report\n\n4  Review and assign\n\n5  Resolve and inspect history',907,226,295,320,24);
txt(s,'Local demo only',907,567,290,35,24,true);
link(s,'localhost:5173','http://localhost:5173',907,608,300,21);
txt(s,'Archived prototype screenshot · 14 September 2026 · response actions are simulated',64,644,790,24,15,false,C.muted);
}
// 9 — refs
{
const s=slide('References',9,`Concept source: supplied ClimateGuard_AI_Resilience_Blueprint.pptx, slides 14–18 (awareness, vulnerability, history, preparedness and intended users). Research and provider URLs are linked on this slide. Implementation evidence: README.md; package.json; server/hazards.js; server/incidents.js; server/chat.js; src/data/locationsData.js; docs/LIVE_OPERATIONS.md; docs/GODS_EYE_INTEGRATION.md. Figma diagram: ${figma}. Canva chart design: ${canva}. Charts and diagram are reproduced as editable native PowerPoint objects. Research data and demo data are labelled separately. This presentation does not validate the original deck's scientific details or certify a technology readiness level.`);
const refs=[['CEEW (2025) — District-level heat risk in India',heat],['NDMA SACHET — Official disaster alerts','https://sachet.ndma.gov.in/'],['USGS — Earthquake GeoJSON feeds','https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php'],['NASA FIRMS — Active-fire data','https://firms.modaps.eosdis.nasa.gov/'],['Open-Meteo — Weather API','https://open-meteo.com/'],["God’s Eye View — Open-source Live View integration",'https://github.com/bilawalsidhu/gods-eye-view']];
refs.forEach((r,i)=>link(s,`${String(i+1).padStart(2,'0')}   ${r[0]}`,r[1],64,157+i*62,1140,25));
txt(s,'Concept: supplied ClimateGuard blueprint, slides 14–18.\nImplementation: local source code and project documentation.',64,545,1140,70,23);
link(s,'Figma diagram',figma,64,632,350,18);link(s,'Canva chart source',canva,440,632,550,18);
}
await fs.writeFile(build+'/deck.json',JSON.stringify(P.toProto()));
for(let i=0;i<P.slides.items.length;i++){const png=await P.export({slide:P.slides.items[i],format:'png',scale:1});await fs.writeFile(build+`/slide-${i+1}.png`,new Uint8Array(await png.arrayBuffer()));console.log('Rendered',i+1);}
const candidate=build+'/candidate.pptx';await(await PresentationFile.exportPptx(P)).save(candidate);
const final=out+'/ClimateGuard_AI_Industry_Presentation.pptx';
const result=await finalizePresentation({workspaceDir:root,candidatePath:candidate,finalPath:final,pythonExecutable:runtime+'/python/python.exe',integrityValidatorPath:skill+'/container_tools/inspect_presentation_package_integrity.py',layoutValidatorPath:skill+'/container_tools/inspect_presentation_layout_geometry.py',layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-bullet-geometry','--validate-heading-fit'],explicitTotalSlideCount:9,requiredNativeChartOwnerSlides:[2,6],materializeLiteralChartWorkbooks:true,fontPolicy:{basis:'design',families:['Arial']},verifyArtifactToolImport:true,receiptPath:build+'/validation.json'});
console.log(JSON.stringify(result));

