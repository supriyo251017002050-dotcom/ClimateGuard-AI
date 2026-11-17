import fs from 'node:fs/promises';
import {PresentationFile,FileBlob} from '@oai/artifact-tool';
const root='C:/Users/treet/Downloads/Disaster_management/artifacts';
const p=await PresentationFile.importPptx(await FileBlob.load(root+'/presentation/PULSE_Crowd_Management_Industry_Presentation.pptx'));
for(const i of [2,7]){
 const b=await p.export({slide:p.slides.items[i],format:'png',scale:1});
 await fs.writeFile(root+`/crowd-build/final-slide-${i+1}.png`,new Uint8Array(await b.arrayBuffer()));
}
console.log('Final export imported: '+p.slides.items.length+' slides; chart and screenshot rendered.');
