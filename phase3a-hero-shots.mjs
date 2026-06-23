import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
const widths = [1440, 768, 375, 320];

for (const w of widths) {
  await page.setViewportSize({ width: w, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.locator('#home').first().screenshot({ path: `phase3a-hero-${w}.png` });
}

await browser.close();
console.log('phase3a hero screenshots done');
