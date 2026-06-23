import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
const sections = ['home', 'services', 'projects', 'contact'];
const widths = [1440, 768, 375, 320];

for (const w of widths) {
  await page.setViewportSize({ width: w, height: 800 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 60000 });

  for (const id of sections) {
    const el = await page.locator(`#${id}`).first();
    if (await el.count()) {
      await el.screenshot({ path: `audit-${id}-${w}.png` });
    }
  }

  const footer = page.locator('footer').first();
  if (await footer.count()) {
    await footer.screenshot({ path: `audit-footer-${w}.png` });
  }
}

await browser.close();
console.log('section shots done');
