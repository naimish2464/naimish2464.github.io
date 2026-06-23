import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

for (const w of [1440, 768, 375, 320]) {
  await page.setViewportSize({ width: w, height: 900 });
  await page.goto('http://localhost:5173/#services', { waitUntil: 'networkidle', timeout: 60000 });
  await page.evaluate(() => {
    const skills = Array.from(document.querySelectorAll('h2')).find((el) => el.textContent?.includes('Technology Stack'));
    skills?.scrollIntoView({ block: 'start' });
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `techstack-${w}.png` });
}

await browser.close();
console.log('tech stack screenshots done');
