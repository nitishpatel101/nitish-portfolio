const puppeteer = require('../../whatsapp-ai-agent/node_modules/puppeteer');
const fs = require('fs');
const path = require('path');

async function test() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  const sections = ['hero', 'about', 'skills', 'work', 'certifications', 'experience', 'achievements', 'contact'];
  for (const id of sections) {
    const el = await page.$(`#${id}`);
    if (el) {
      await page.evaluate((element) => {
        element.scrollIntoView();
      }, el);
      await new Promise(r => setTimeout(r, 400));
      await page.screenshot({ path: path.join(__dirname, `../public/mobile-${id}.png`) });
    }
  }

  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const innerWidth = await page.evaluate(() => window.innerWidth);
  console.log(`Mobile 375px: scrollWidth = ${scrollWidth}, innerWidth = ${innerWidth}`);
  console.log(`Overflow: ${scrollWidth > innerWidth ? 'FAIL' : 'PASS'}`);

  await browser.close();
}

test().catch(err => {
  console.error(err);
  process.exit(1);
});
