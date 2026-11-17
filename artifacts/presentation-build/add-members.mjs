import fs from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import {PresentationFile,FileBlob} from '@oai/artifact-tool';
const root='C:/Users/treet/Downloads/Disaster_management';
const build=root+'/artifacts/presentation-build';
const skill='C:/Users/treet/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations';
const runtime='C:/Users/treet/.cache/codex-runtimes/codex-primary-runtime/dependencies';
process.env.RUNTIME_NODE_MODULES=runtime+'/node/node_modules';
const {finalizePresentation}=await import(pathToFileURL(skill+'/container_tools/artifact_tool_utils.mjs').href);
const p=await PresentationFile.importPptx(await FileBlob.load(root+'/artifacts/presentation/ClimateGuard_AI_Industry_Presentation.pptx'));
const s=p.slides.items[0];
const course=s.shapes.items.find(a=>Math.abs(a.position.top-591)<1);
if(!course)throw new Error('Expected course text not found');
course.position={...course.position,top:632,height:30};
course.text.fontSize=21;
const names=s.shapes.add({geometry:'textbox',position:{left:68,top:590,width:1120,height:38},fill:'none',line:{fill:'none',width:0}});
names.text='Supriyo Hara, Astha Singh, Tushar Mondal';
names.text.style={fontSize:27,typeface:'Arial',color:'#DDE7DF',insets:0,autoFit:'none',wrap:'none'};
const candidate=build+'/members-candidate.pptx';
await(await PresentationFile.exportPptx(p)).save(candidate);
// Keep every untouched OOXML part byte-for-byte, including chart workbooks.
execFileSync(runtime+'/python/python.exe',['-c',`import zipfile,os,sys
original,edited=sys.argv[1:]
with zipfile.ZipFile(edited) as z: title=z.read('ppt/slides/slide1.xml')
with zipfile.ZipFile(original) as src, zipfile.ZipFile(edited+'.preserved','w',zipfile.ZIP_DEFLATED) as dst:
 for item in src.infolist(): dst.writestr(item,title if item.filename=='ppt/slides/slide1.xml' else src.read(item.filename))
os.replace(edited+'.preserved',edited)
`,root+'/artifacts/presentation/ClimateGuard_AI_Industry_Presentation.pptx',candidate]);
const final=root+'/artifacts/presentation/ClimateGuard_AI_Industry_Presentation_Updated.pptx';
await finalizePresentation({workspaceDir:root,candidatePath:candidate,finalPath:final,pythonExecutable:runtime+'/python/python.exe',integrityValidatorPath:skill+'/container_tools/inspect_presentation_package_integrity.py',layoutValidatorPath:skill+'/container_tools/inspect_presentation_layout_geometry.py',layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit'],explicitTotalSlideCount:9,requiredNativeChartOwnerSlides:[2,6],fontPolicy:{basis:'design',families:['Arial']},verifyArtifactToolImport:true,receiptPath:build+'/members-validation.json'});
const q=await PresentationFile.importPptx(await FileBlob.load(final));
for(let i=0;i<q.slides.items.length;i++){
 const img=await q.export({slide:q.slides.items[i],format:'png',scale:1});
 await fs.writeFile(build+`/members-${i+1}.png`,new Uint8Array(await img.arrayBuffer()));
}
console.log('Updated presentation saved: '+final);
