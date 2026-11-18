import fs from 'node:fs';
import path from 'node:path';

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const item of fs.readdirSync(src)) {
    const s = path.join(src, item);
    const d = path.join(dest, item);
    if (fs.statSync(s).isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

const gevDist = 'gods-eye-view/dist';
const target = 'dist/gods-eye-view';

if (fs.existsSync(gevDist)) {
  if (!fs.existsSync(target)) fs.mkdirSync(target, { recursive: true });
  for (const f of fs.readdirSync(gevDist)) {
    const full = path.join(gevDist, f);
    if (f === 'gods-eye-view') {
      copyDir(full, target);
    } else if (fs.statSync(full).isDirectory()) {
      copyDir(full, path.join(target, f));
    } else {
      fs.copyFileSync(full, path.join(target, f));
    }
  }
  if (fs.existsSync('gods-eye-view/dist/gods-eye-view/cesium/Cesium.js')) {
    fs.copyFileSync('gods-eye-view/dist/gods-eye-view/cesium/Cesium.js', 'dist/cesium/Cesium.js');
  }
  console.log('✓ Embedded gods-eye-view and Cesium.js copied to dist/');
}
