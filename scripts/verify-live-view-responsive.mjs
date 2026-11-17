import puppeteer from '../gods-eye-view/node_modules/puppeteer/lib/puppeteer/puppeteer.js';
import { fileURLToPath } from 'node:url';

async function openLiveView(page) {
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 60_000 });
  await page.evaluate(() => {
    [...document.querySelectorAll('button')]
      .find((node) => node.textContent.trim() === 'Live operations')
      ?.click();
  });
  await page.waitForFunction(
    () => [...document.querySelectorAll('button')].some((node) => node.textContent.includes('Live View')),
    { timeout: 60_000 },
  );
  await page.evaluate(() => {
    [...document.querySelectorAll('button')]
      .find((node) => node.textContent.includes('Live View'))
      ?.click();
  });
  const frameElement = await page.waitForSelector(
    'iframe[title="Live View planetary operations globe"]',
    { timeout: 30_000 },
  );
  const frame = await frameElement.contentFrame();
  if (!frame) throw new Error('Live View frame was not accessible.');
  await frame.waitForSelector('#loading-screen.hidden', { timeout: 60_000 });
  await frame.waitForSelector('#first-run-launcher:not([hidden])', { timeout: 60_000 });
  return frame;
}

const browser = await puppeteer.launch({ headless: true });
try {
  const reducedPage = await browser.newPage();
  await reducedPage.setViewport({ width: 1280, height: 800 });
  await reducedPage.emulateMediaFeatures([
    { name: 'prefers-reduced-motion', value: 'reduce' },
  ]);
  const reducedFrame = await openLiveView(reducedPage);
  const reducedMotion = await reducedFrame.evaluate(() => ({
    choices: [...document.querySelectorAll('.first-run-choices button')].map((button) => ({
      opacity: getComputedStyle(button).opacity,
      animation: getComputedStyle(button).animationName,
    })),
    launcherVisible: !document.getElementById('first-run-launcher')?.hidden,
  }));

  const desktopPage = await browser.newPage();
  await desktopPage.setViewport({ width: 1440, height: 900 });
  await desktopPage.emulateMediaFeatures([
    { name: 'prefers-reduced-motion', value: 'no-preference' },
  ]);
  const desktopFrame = await openLiveView(desktopPage);
  await desktopFrame.click('[data-first-run-choice="explore"]');
  const collapseButton = '#data-panel .panel-collapse-btn[data-collapse-target="data-panel"]';
  const openingResult = await desktopFrame.evaluate((selector) => {
    const panel = document.getElementById('data-panel');
    const before = panel?.classList.contains('collapsed');
    document.querySelector(selector)?.click();
    return {
      before,
      after: panel?.classList.contains('collapsed'),
      reduce: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      animationIds: panel?.getAnimations().map((animation) => animation.id) || [],
    };
  }, collapseButton);
  await new Promise((resolve) => setTimeout(resolve, 300));
  const closingResult = await desktopFrame.evaluate((selector) => {
    const panel = document.getElementById('data-panel');
    const before = panel?.classList.contains('collapsed');
    document.querySelector(selector)?.click();
    return {
      before,
      after: panel?.classList.contains('collapsed'),
      reduce: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      animationIds: panel?.getAnimations().map((animation) => animation.id) || [],
    };
  }, collapseButton);
  const openingAnimation = openingResult.animationIds.includes('live-view-panel-disclosure');
  const closingAnimation = closingResult.animationIds.includes('live-view-panel-disclosure');

  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await mobilePage.emulateMediaFeatures([
    { name: 'prefers-reduced-motion', value: 'no-preference' },
  ]);
  const mobileFrame = await openLiveView(mobilePage);
  const mobile = await mobilePage.evaluate(() => ({
    viewportWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    switchHeights: [...document.querySelectorAll('.map-workspace-switch button')]
      .map((button) => Math.round(button.getBoundingClientRect().height)),
  }));
  const mobileScreenshot = fileURLToPath(
    new URL('../artifacts/live-view-mobile.png', import.meta.url),
  );
  await mobilePage.screenshot({ path: mobileScreenshot, fullPage: true });

  const result = {
    reducedMotion,
    panelAnimations: { openingAnimation, closingAnimation, openingResult, closingResult },
    mobile,
    mobileScreenshot,
  };
  console.log(JSON.stringify(result, null, 2));
  const reducedChoicesVisible = reducedMotion.choices.length === 4
    && reducedMotion.choices.every((choice) => choice.opacity === '1' && choice.animation === 'none');
  const mobileFits = mobile.scrollWidth <= mobile.viewportWidth + 1
    && mobile.switchHeights.every((height) => height >= 44);
  if (!reducedMotion.launcherVisible || !reducedChoicesVisible || !openingAnimation || !closingAnimation || !mobileFits) {
    process.exitCode = 1;
  }
} finally {
  await browser.close();
}
