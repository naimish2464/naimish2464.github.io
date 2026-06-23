import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
const widths = [1440, 768, 375, 320];
const report = [];

for (const w of widths) {
  await page.setViewportSize({ width: w, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.screenshot({ path: `phase2-after-${w}.png`, fullPage: true });

  const metrics = await page.evaluate(() => {
    const el = document.documentElement;
    const projectsHeader = document.querySelector('#projects .flex.flex-col');
    const footerBottom = document.querySelector('footer .border-t.border-white\\/10.pt-8 > div');
    const footerLinks = Array.from(document.querySelectorAll('footer a.underline'));
    return {
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
      projectsHeaderOverflow: projectsHeader ? projectsHeader.scrollWidth > projectsHeader.clientWidth + 1 : null,
      footerOverflow: footerBottom ? footerBottom.scrollWidth > footerBottom.clientWidth + 1 : null,
      footerUnderline: footerLinks.map((a) => getComputedStyle(a).textDecorationLine),
      bodyLineHeight: getComputedStyle(document.body).lineHeight,
    };
  });

  report.push({ width: w, ...metrics, horizontalOverflow: metrics.scrollWidth > metrics.clientWidth + 1 });
}

await browser.close();
console.log(JSON.stringify(report, null, 2));
