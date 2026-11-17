import fs from 'node:fs/promises';
import {PresentationFile,FileBlob} from '@oai/artifact-tool';
const root='C:/Users/treet/Downloads/Disaster_management/artifacts';
const p=await PresentationFile.importPptx(await FileBlob.load(root+'/presentation/ClimateGuard_AI_Industry_Presentation.pptx'));
for(let i=0;i<p.slides.items.length;i++){
const img=await p.export({slide:p.slides.items[i],format:'png',scale:1});
await fs.writeFile(root+`/presentation-build/final-${i+1}.png`,new Uint8Array(await img.arrayBuffer()));
}
console.log('Rendered final exported file: '+p.slides.items.length+' slides.');
