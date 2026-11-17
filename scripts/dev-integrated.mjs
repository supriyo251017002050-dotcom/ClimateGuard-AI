import { spawn } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseEnv } from 'node:util';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const godsEyeRoot = join(root, 'gods-eye-view');
const envFile = join(root, '.env.local');

if (!existsSync(join(godsEyeRoot, 'package.json'))) {
  console.error('[ClimateGuard] gods-eye-view/package.json is missing. Restore the cloned repository inside this project.');
  process.exit(1);
}

let localEnv = {};
try {
  localEnv = parseEnv(readFileSync(envFile, 'utf8'));
} catch (error) {
  if (error?.code !== 'ENOENT') throw error;
}

const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const common = {
  stdio: 'inherit',
  shell: process.platform === 'win32',
};

const climateGuard = spawn(command, ['run', 'dev:app', '--', '--host', '0.0.0.0'], {
  ...common,
  cwd: root,
  env: process.env,
});

const godsEye = spawn(command, ['run', 'dev', '--', '--host', '0.0.0.0'], {
  ...common,
  cwd: godsEyeRoot,
  env: {
    ...process.env,
    PORT: '4173',
    HOST: '0.0.0.0',
    ...(process.env.CESIUM_ION_TOKEN || localEnv.VITE_CESIUM_ION_TOKEN ? { CESIUM_ION_TOKEN: process.env.CESIUM_ION_TOKEN || localEnv.VITE_CESIUM_ION_TOKEN } : {}),
    ...(process.env.FIRMS_MAP_KEY || localEnv.FIRMS_MAP_KEY ? { FIRMS_MAP_KEY: process.env.FIRMS_MAP_KEY || localEnv.FIRMS_MAP_KEY } : {}),
  },
});

const children = [climateGuard, godsEye];
let stopping = false;
const stop = (signal = 'SIGTERM') => {
  if (stopping) return;
  stopping = true;
  for (const child of children) {
    if (!child.killed) child.kill(signal);
  }
};

for (const [name, child] of [['ClimateGuard', climateGuard], ['Live View', godsEye]]) {
  child.on('error', error => {
    console.error(`[${name}] could not start: ${error.message}`);
    stop();
    process.exitCode = 1;
  });
  child.on('exit', code => {
    if (!stopping && code !== 0) {
      console.error(`[${name}] stopped with exit code ${code}.`);
      stop();
      process.exitCode = code || 1;
    }
  });
}

process.on('SIGINT', () => stop('SIGINT'));
process.on('SIGTERM', () => stop('SIGTERM'));

console.log('[ClimateGuard] Main app: http://localhost:5173/');
console.log('[ClimateGuard] Live View service: http://localhost:4173/');
