import {chromium} from 'playwright';
import fs from 'node:fs/promises';
const out='C:/Users/treet/Downloads/Disaster_management/artifacts/crowd-build';
const browser=await chromium.launch({headless:true,channel:'msedge'});
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
await page.route(/openrouter\.ai|api\.anthropic\.com/,r=>r.abort());
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:8091',{waitUntil:'networkidle'});
await page.locator('#auth-email').fill('demo@example.com');
await page.locator('#auth-password').fill('Demo12345');
await page.locator('#auth-submit-btn').click();
await page.locator('#page-home.active').waitFor();
for(const tab of ['crowd','ops']){
 await page.locator(`[data-page="${tab}"]`).focus();
 await page.keyboard.press('Enter');
 await page.locator(`#page-${tab}.active`).waitFor();
 await page.waitForTimeout(3500);
 await page.screenshot({path:out+'/'+tab+'.png'});
}
await fs.writeFile(out+'/browser-check.json',JSON.stringify({tested:['demo sign-in','crowd page','ops page'],errors,llmRequestsBlocked:true,cameraEnabled:false},null,2));
await browser.close();
console.log('Screenshots and browser-check.json saved.');
