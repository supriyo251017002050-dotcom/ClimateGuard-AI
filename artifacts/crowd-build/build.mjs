import fs from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {Presentation,PresentationFile} from '@oai/artifact-tool';
const root='C:/Users/treet/Downloads/Disaster_management';
const build=root+'/artifacts/crowd-build';
const out=root+'/artifacts/presentation';
const skill='C:/Users/treet/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations';
const runtime='C:/Users/treet/.cache/codex-runtimes/codex-primary-runtime/dependencies';
process.env.RUNTIME_NODE_MODULES=runtime+'/node/node_modules';
const {finalizePresentation,applyPresentationChartFont}=await import(pathToFileURL(skill+'/container_tools/artifact_tool_utils.mjs').href);
const P=Presentation.create({slideSize:{width:1280,height:720}});
const C={bg:'#F2F5F3',ink:'#102C33',muted:'#53686D',teal:'#007E75',pale:'#DEEEEA',orange:'#D57A31',dark:'#0B1922',white:'#FFFFFF',soft:'#BFD1D4'};
const repo='https://github.com/supriyo251017002050-dotcom/Manage-crowd';
const commit=repo+'/tree/36aec542e26d093d8240370d9e34a4fc471015ed';
const figma='https://www.figma.com/board/4u78ZyewHQ8uSzfQRxZKww';
const canva='https://canva.link/jnevunh96yjpopn';
const hse='https://www.hse.gov.uk/event-safety/crowd-management-monitoring.htm';
const stadium='https://www.metlifestadium.com/stadium/about-metlife-stadium';
const coco='https://github.com/tensorflow/tfjs-models/blob/master/coco-ssd/README.md';
const live='https://crowd-manage.vercel.app';
function txt(s,t,x,y,w,h,size=26,bold=false,color=C.ink){const a=s.shapes.add({geometry:'textbox',position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});a.text=t;a.text.style={fontSize:size,typeface:'Arial',bold,color,autoFit:'none',wrap:'square',insets:0,verticalAlignment:'top'};return a;}
function slide(title,n,notes,dark=false){const s=P.slides.add();s.background.fill=dark?C.dark:C.bg;txt(s,title,60,46,1160,68,44,true,dark?C.white:C.ink);txt(s,'PULSE   /   Team EUREKA   /   Student prototype',60,674,1020,24,15,false,dark?C.soft:C.muted);txt(s,String(n).padStart(2,'0'),1174,671,50,28,18,true,dark?C.white:C.ink);s.speakerNotes.text=notes;return s;}
function node(s,t,x,y,w,h){const a=s.shapes.add({geometry:'roundRect',position:{left:x,top:y,width:w,height:h},fill:C.pale,line:{fill:C.teal,width:1.5}});a.text=t;a.text.style={fontSize:24,typeface:'Arial',bold:true,color:C.ink,alignment:'center',verticalAlignment:'middle',wrap:'square',insets:12};return a;}
function conn(s,a,b,from='right',to='left'){s.shapes.connect(a,b,{kind:'straight',fromSide:from,toSide:to,line:{fill:C.teal,width:2},tail:{type:'triangle',width:'med',length:'med'}});}
function link(s,label,url,x,y,w=1050,size=23){const a=txt(s,label,x,y,w,38,size,false,C.teal);a.text.get(label).link={uri:url,isExternal:true};return a;}
function section(s,head,body,x,y,w=525){txt(s,head,x,y,w,38,27,true,C.teal);txt(s,body,x,y+48,w,114,25);}
const basis=`Implementation source: ${commit}. Code reviewed at commit 36aec54. Core files: app.js, ai-engine.js, data.js and index.html. The app is a student prototype using a FIFA 2026 stadium scenario, without evidence of official FIFA affiliation or operational deployment.`;

// 1: Title and team.
{
 const s=slide('',1,`Good morning. We are Team EUREKA: Supriyo Hara, Astha Singh and Tushar Mondal. Our project is PULSE, a web-based application for crowd monitoring and incident review. We created it to help an operator identify local crowd bottlenecks and inspect relevant incidents in a common interface. We demonstrate the workflow with synthetic stadium data. Our current work is a prototype, and we are not claiming proven crowd-safety outcomes. ${basis}`,true);
 txt(s,'PULSE',60,139,1160,130,108,true,C.white);
 txt(s,'Crowd Management & Incident Awareness',65,298,1150,68,38,true,'#66DAC3');
 txt(s,'A web-based application for stadium safety workflows',65,388,1130,56,28,false,C.soft);
 txt(s,'TEAM EUREKA',65,528,1080,36,25,true,C.white);
 txt(s,'Supriyo Hara   •   Astha Singh   •   Tushar Mondal',65,584,1120,43,29,false,C.white);
}
// 2: A specific, defendable problem statement.
{
 const s=slide('Problem understanding',2,`The exact problem is local crowd congestion: one gate or corridor can become overloaded even while other parts of a venue have spare space. Staff need to identify the hotspot and connect it with incident information quickly. Existing measures include stewards, CCTV and radio communication. Our design hypothesis is that bringing the information into one browser view can reduce the effort of switching between separate views. We have not surveyed operators or proved a gap in all commercial systems. Without a shared view, an operator must still reconcile the information manually. MetLife's official stadium description gives a capacity of 82,500, illustrating the scale of the setting, not the number of PULSE users. HSE guidance calls for monitoring both total numbers and the distribution of people. Sources: ${stadium}; ${hse}. ${basis}`);
 txt(s,'Local bottlenecks can be missed\nin a large crowd',60,146,755,103,39,true);
 txt(s,'Staff must connect crowded locations with incident reports quickly enough to decide where help is needed.',60,281,740,116,29);
 txt(s,'82,500',895,158,330,100,71,true,C.teal);
 txt(s,'MetLife Stadium\ncapacity',898,267,300,81,27,true);
 txt(s,'Illustrates venue scale,\nnot PULSE adoption.',898,368,310,69,22,false,C.muted);
 section(s,'People affected','Control-room staff and stewards.\nFans in queues, including people\nwho need accessible routes.',60,447,525);
 section(s,'Existing approach and gap','CCTV, stewards and radio already help.\nPULSE explores a shared view of\ncrowd zones and related incidents.',650,447,565);
 txt(s,'Sources: MetLife Stadium, About the Stadium; HSE, Monitor the crowd.',60,643,1150,22,16,false,C.muted);
}
// 3: Solution plus synthetic scenario chart and concept flow.
{
 const s=slide('Proposed solution',3,`PULSE brings crowd-zone indicators and incident details together so an operator can review where attention is needed. Consider the seeded demonstration values: Gate A is 92%, Gate B 61%, Gate C 34%, Gate D 22%. These are normalized synthetic crowd scores in data.js. They are not sensor measurements or calibrated physical occupancy. Gate D is labelled a VIP entry, so a lower score alone does not mean staff may redirect everyone there. A real decision also requires access permissions, route capacity and staff verification. The concept flow ends in an operator choosing a response; it does not mean the prototype contacts emergency services. Routing uses prewritten options. FigJam concept: ${figma}. Canva chart design: ${canva}. The chart is reproduced as an editable PowerPoint chart with exact source values. ${basis}`);
 txt(s,'One browser view to identify hotspots\nand review related incidents',60,145,590,93,32,true);
 txt(s,'A common view reduces the need to\ncompare separate screens manually.\nThat benefit still needs user testing.',60,268,570,115,27);
 txt(s,'EXAMPLE GATE SCORES',730,143,460,34,21,true,C.teal);
 const c=s.charts.add('bar',{position:{left:703,top:191,width:509,height:238},categories:['Gate A','Gate B','Gate C','Gate D'],series:[{name:'Synthetic crowd score',values:[92,61,34,22],fill:C.teal}],barOptions:{direction:'bar',grouping:'clustered',gapWidth:60},hasLegend:false,xAxis:{visible:true,textStyle:{fontSize:20,fill:C.ink}},yAxis:{visible:true,min:0,max:100,majorUnit:25,numberFormatCode:'0"%"',textStyle:{fontSize:18,fill:C.ink}},dataLabels:{showValue:true,position:'outEnd',numberFormatCode:'0"%"',textStyle:{fontSize:22,bold:true,fill:C.ink}},chartFill:C.bg,plotAreaFill:C.bg});applyPresentationChartFont(c,{fontFamily:'Arial'});
 txt(s,'Synthetic data. Not measured occupancy.',730,438,475,27,18,false,C.muted);
 const labels=['Inspect demo\ncrowd zones','Review risk\nlabels','Inspect incident\ndetails','Operator chooses\nresponse'];
 const nodes=labels.map((t,i)=>node(s,t,60+i*301,512,253,104));nodes.slice(1).forEach((n,i)=>conn(s,nodes[i],n));
 txt(s,'Current scope: decision-support demonstration with simulated crowd and response data.',60,642,1160,24,18,false,C.muted);
}
// 4: Actual architecture, no invented backend.
{
 const s=slide('Technical architecture',4,`The application is plain HTML, CSS and JavaScript, with Three.js for visual effects. It runs in the browser and is hosted as static content. Seeded data.js values feed rule-based risk labels, heuristic triage and prewritten routes. Webcam frames can be analysed by the pre-trained TensorFlow.js COCO-SSD detector, returning object classes, confidence values and bounding boxes. This is the real computer-vision component; the code does not load YOLOv8. Open-Meteo supplies temperature and humidity for fixed MetLife coordinates. An external LLM can provide chat and advice through OpenRouter or an alternate Anthropic path. The weather request and LLM calls require internet. State is held in JavaScript and some data in localStorage. No shared database, secure backend, real authentication or validated multi-user dispatch is implemented. Browser-side API keys must move to a server for a future deployment. ${basis} Model documentation: ${coco}. Weather API: https://open-meteo.com/en/docs.`);
 const a=node(s,'Seeded crowd data\nand incident reports',60,168,322,116);
 const b=node(s,'JavaScript rules\nRisk labels and triage',480,168,322,116);
 const c=node(s,'Browser interface\nCrowd and Ops views',900,168,320,116);conn(s,a,b);conn(s,b,c);
 const d=node(s,'Webcam frames',60,358,322,104);
 const e=node(s,'TensorFlow.js\nCOCO-SSD detection',480,358,322,104);
 const f=node(s,'Object overlays\nand demo alert log',900,358,320,104);conn(s,d,e);conn(s,e,f);
 txt(s,'EXTERNAL SERVICES',60,517,340,33,22,true,C.teal);
 txt(s,'Open-Meteo weather\nOptional LLM chat / advice',60,563,360,76,24);
 txt(s,'FRONTEND',480,517,330,33,22,true,C.teal);
 txt(s,'HTML, CSS, JavaScript\nThree.js visual effects',480,563,350,76,24);
 txt(s,'STORAGE',900,517,320,33,22,true,C.teal);
 txt(s,'Memory + localStorage\nNo shared backend database',900,563,320,76,24);
}
// 5: Novelty and basic understanding of AI.
{
 const s=slide('Innovation and novelty',5,`Our contribution is an integrated demonstration workflow: crowd indicators, object-detection experiments and incident review in one browser application. Compared with viewing CCTV alone, the interface adds location context and a structured incident view. This is an integration contribution, not a claim that no commercial product does this or that we invented a new AI algorithm. COCO-SSD is a pre-trained neural object detector. It detects people and common objects. Crowd labels and incident urgency are deterministic rules. The 30-minute crowd forecast uses a multiplier based on match time, not a trained predictive model. Routes are selected from prewritten options, not calculated with a live graph algorithm. Current camera code maps phones and other ordinary objects to weapon labels, uses random locations and derives age/gender display values from bounding-box coordinates. Those are demo artifacts, not valid recognition results. Do not demonstrate these labels as accurate security or demographic inference. ${basis}; ${coco}.`);
 txt(s,'Our contribution: a combined operator workflow',60,150,1155,53,34,true);
 txt(s,'Crowd context, incident review and browser-based vision\nexperiments sit inside the same web application.',60,218,1150,89,29);
 section(s,'Pre-trained AI','COCO-SSD detects common objects\nand people in camera frames.\nNo custom model training is shown.',60,354,545);
 section(s,'Rules and demonstration logic','Crowd risk uses thresholds.\nTriage uses severity and type weights.\nRoutes are prewritten choices.',668,354,550);
 txt(s,'Contribution is integration. No new AI algorithm or proven market-first claim.',60,554,1150,43,25,true);
 txt(s,'Camera weapon labels are proxies. Age/gender labels and alert locations are synthetic.',60,619,1155,45,21,false,C.muted);
}
// 6: Feasibility and readiness.
{
 const s=slide('Feasibility and viability',6,`A student demonstration can run on a laptop with a modern browser, static hosting and, optionally, a webcam. TensorFlow.js and the pre-trained detector are open-source tools. External API usage remains subject to provider terms and limits; there is no evidence of a completely cost-free production service. The static interface can be distributed to more users, but sessions do not share live incident state and detection performance depends on the client device. For operational scaling, add a secure backend, role-based access, a shared database, real sensor ingestion, calibrated crowd estimates and human-approved response procedures. During this review, demo sign-in and Ops rendering were exercised locally. The crowd canvas raised a malformed colour error and needs a fix before a live demonstration. Three repository tests passed, but they test duplicated helper examples rather than executing the app. Evidence supports an early laboratory prototype. A formal TRL-4 claim needs documented component validation in a laboratory, which the repository does not establish. ${basis}`);
 section(s,'Resources for a demonstration','Laptop and modern browser.\nStatic hosting and optional webcam.\nTensorFlow.js + COCO-SSD.',60,161,548);
 section(s,'Current technical limits','Demo sign-in and local browser state.\nAPI/model downloads need internet.\nNo synchronized multi-user operations.',665,161,550);
 section(s,'Path to more users','Secure backend and shared database.\nVerified venue data and sensor feeds.\nDevice performance and load testing.',60,389,548);
 section(s,'Validation before a pilot','Fix crowd-map rendering.\nReplace misleading camera labels.\nTest counts, alerts and staff usability.',665,389,550);
 txt(s,'Readiness: laboratory prototype. Formal TRL-4 validation has not been established.',60,616,1160,42,23,true);
}
// 7: Benefits with measurable evidence boundaries.
{
 const s=slide('Impact and benefits',7,`The intended benefit for staff is less time spent finding a congested zone and reviewing related incidents. Fans could benefit indirectly from clearer guidance after staff verification, while accessible route options support consideration of mobility needs. We have no field evidence of reduced injuries, shorter queues or lower cost. The quantitative evidence on this slide is prototype scope: eight seeded crowd zones, three prewritten route options and emergency phrase data in twelve languages. These figures are not operational outcomes. A pilot should compare operators using a manual scenario table against operators using PULSE on equivalent synthetic incidents. Measure median time to identify the highest-risk zone, time to select an appropriate response, missed incidents and false alarms. Later test camera counts against annotated ground truth. Only after collecting the baseline and app results should we calculate percentage improvement. ${basis} Source of counts: data.js crowdZones, navRoutes and emergencyPhrases.`);
 const cols=[{x:60,n:'8',t:'demo crowd zones'},{x:475,n:'3',t:'prewritten route options'},{x:890,n:'12',t:'phrasebook languages'}];
 for(const k of cols){txt(s,k.n,k.x,146,335,105,83,true,C.teal);txt(s,k.t,k.x,265,332,67,26,true);}
 txt(s,'Intended benefit',60,381,350,40,28,true);
 txt(s,'Staff identify hotspots with less effort. Fans receive clearer\nguidance after staff verify the situation.',60,437,1135,85,29);
 txt(s,'Measure in a pilot',60,553,330,39,27,true,C.teal);
 txt(s,'Hotspot-identification time, response-selection time and missed alerts.',60,598,1155,39,24);
 txt(s,'Outcome improvements have not yet been measured.',60,643,1150,24,18,false,C.muted);
}
// 8: Actual screenshot, honest demo script.
{
 const s=slide('Prototype and demonstration',8,`This screenshot was captured from the reviewed repository running locally. The Ops screen shows seeded incidents, deterministic urgency scores and a sample assignment board. Its displayed volunteer counts, AI-action totals and resolution statistics are sample content, not real achievements. Demonstrate: enter the demo sign-in, open Ops Intelligence, inspect the Gate A incident and explain how severity and incident type drive its score. Then show the three route choices if time allows. Treat all dispatch and route recommendations as demonstration content. Do not claim that the shown assignments actually contact teams. The repository lists ${live} as its deployed demo. Internet access and deployment parity were not validated in this review; retain the screenshot as a fallback. The crowd-map screen currently hits a colour parsing error, so avoid relying on it before repair. Navigation tabs may overlap at narrower desktop widths; keyboard focus and Enter worked during capture. The local screenshot used blocked LLM endpoints and did not enable a camera. ${basis}`);
 const b=await fs.readFile(build+'/ops.png');s.images.add({blob:b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength),contentType:'image/png',alt:'PULSE Ops Intelligence prototype showing synthetic incidents and assignment data',fit:'contain',position:{left:60,top:144,width:823,height:493}});
 txt(s,'Demo story',929,160,282,43,30,true,C.teal);
 txt(s,'1  Enter demo sign-in\n\n2  Open Ops Intelligence\n\n3  Inspect Gate A incident\n\n4  Explain its urgency score',929,227,279,274,24);
 txt(s,'Synthetic incidents\nand dispatch data',929,537,285,73,24,true);
 link(s,'crowd-manage.vercel.app',live,60,635,680,21);
 txt(s,'Repository-listed demo link',929,625,290,29,17,false,C.muted);
}
// 9: Clickable sources.
{
 const s=slide('References',9,`Implementation was assessed from the GitHub repository at commit 36aec542e26d093d8240370d9e34a4fc471015ed. Where the README and code disagree, the deck follows the code. In particular, the detector is COCO-SSD, not YOLOv8. MetLife capacity and HSE monitoring guidance are external context. They do not validate PULSE's effectiveness. All gate chart values come from seeded data.js values. The Figma diagram and Canva chart design are linked below and reproduced as editable native slide objects. ${basis}`);
 const refs=[['01   Project source and reviewed commit',commit],['02   MetLife Stadium: capacity and venue context',stadium],['03   HSE: monitoring crowd numbers and distribution',hse],['04   TensorFlow.js COCO-SSD: model documentation',coco],['05   Open-Meteo: weather API documentation','https://open-meteo.com/en/docs']];
 refs.forEach((r,i)=>link(s,r[0],r[1],60,157+i*77,1150,27));
 txt(s,'Source code: app.js, ai-engine.js, data.js and index.html\nReviewed commit: 36aec54',60,563,1130,71,24);
 link(s,'Figma concept diagram',figma,60,636,470,20);link(s,'Canva chart design',canva,665,636,510,20);
}
await fs.writeFile(build+'/deck.json',JSON.stringify(P.toProto()));
for(let i=0;i<P.slides.items.length;i++){const png=await P.export({slide:P.slides.items[i],format:'png',scale:1});await fs.writeFile(build+`/slide-${i+1}.png`,new Uint8Array(await png.arrayBuffer()));console.log('Rendered',i+1);}
const candidate=build+'/candidate.pptx';await(await PresentationFile.exportPptx(P)).save(candidate);
const final=out+'/PULSE_Crowd_Management_Industry_Presentation.pptx';
const result=await finalizePresentation({workspaceDir:root,candidatePath:candidate,finalPath:final,pythonExecutable:runtime+'/python/python.exe',integrityValidatorPath:skill+'/container_tools/inspect_presentation_package_integrity.py',layoutValidatorPath:skill+'/container_tools/inspect_presentation_layout_geometry.py',layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-bullet-geometry','--validate-heading-fit'],explicitTotalSlideCount:9,requiredNativeChartOwnerSlides:[3],materializeLiteralChartWorkbooks:true,fontPolicy:{basis:'design',families:['Arial']},verifyArtifactToolImport:true,receiptPath:build+'/validation.json'});
console.log(JSON.stringify(result));
