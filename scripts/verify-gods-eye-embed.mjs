import puppeteer from '../gods-eye-view/node_modules/puppeteer/lib/puppeteer/puppeteer.js';
import { fileURLToPath } from 'node:url';

const browser = await puppeteer.launch({ headless: true });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 60_000 });

  const openedOperations = await page.evaluate(() => {
    const button = [...document.querySelectorAll('button')].find(node => node.textContent.trim() === 'Live operations');
    button?.click();
    return Boolean(button);
  });
  if (!openedOperations) throw new Error('Live Operations navigation was not rendered.');

  await page.waitForFunction(() => [...document.querySelectorAll('button')].some(node => node.textContent.includes('Live View')), { timeout: 60_000 });
  await page.evaluate(() => {
    const button = [...document.querySelectorAll('button')].find(node => node.textContent.includes('Live View'));
    button?.click();
  });

  const frameElement = await page.waitForSelector('iframe[title="Live View planetary operations globe"]', { timeout: 30_000 });
  const frame = await frameElement.contentFrame();
  if (!frame) throw new Error('Live View frame was not accessible.');
  await frame.waitForFunction(() => document.body?.innerText?.length > 100, { timeout: 60_000 });
  await page.waitForSelector('.live-view-frame-actions span.ready', { timeout: 60_000 });
  await frame.waitForSelector('#loading-screen.hidden', { timeout: 60_000 });
  await new Promise(resolve => setTimeout(resolve, 1000));
  const screenshotPath = fileURLToPath(new URL('../artifacts/live-view-redesign.png', import.meta.url));
  await page.screenshot({ path: screenshotPath, fullPage: true });

  const result = {
    climateGuardTitle: await page.title(),
    liveViewTitle: await frame.title(),
    frameUrl: frame.url(),
    switchActive: await page.evaluate(() => [...document.querySelectorAll('.map-workspace-switch button')]
      .some(node => node.classList.contains('active') && node.textContent.includes('Live View'))),
    renderedText: (await frame.evaluate(() => document.body.innerText)).slice(0, 80).replaceAll('\n', ' '),
    startupComplete: await frame.evaluate(() => document.getElementById('loading-screen')?.classList.contains('hidden')),
    screenshotPath,
  };
  console.log(JSON.stringify(result, null, 2));
  if (!result.switchActive || !result.startupComplete || !result.frameUrl.startsWith('http://localhost:4173/')) process.exitCode = 1;
} finally {
  await browser.close();
}
