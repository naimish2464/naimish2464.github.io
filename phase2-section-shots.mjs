import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
const sections = ['projects', 'contact'];
const widths = [768, 375];

for (const w of widths) {
  await page.setViewportSize({ width: w, height: 800 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 60000 });
  for (const id of sections) {
    await page.locator(`#${id}`).first().screenshot({ path: `phase2-after-${id}-${w}.png` });
  }
  await page.locator('footer').first().screenshot({ path: `phase2-after-footer-${w}.png` });
}

await browser.close();
console.log('section after shots done');
