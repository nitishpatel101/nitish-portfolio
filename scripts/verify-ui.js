const puppeteer = require('../../whatsapp-ai-agent/node_modules/puppeteer');
const path = require('path');

async function main() {
  console.log('Launching browser to test portfolio...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // 1. Desktop Check (1440x900)
  console.log('\n--- 1. Testing Desktop Viewport (1440x900) ---');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  const desktopScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const desktopInnerWidth = await page.evaluate(() => window.innerWidth);
  const desktopNoOverflow = desktopScrollWidth === desktopInnerWidth;

  console.log(`Desktop scrollWidth: ${desktopScrollWidth}, innerWidth: ${desktopInnerWidth}`);
  console.log(`Zero horizontal overflow: ${desktopNoOverflow ? 'PASS ✓' : 'FAIL ✗'}`);

  await page.screenshot({
    path: path.join(__dirname, '../public/screenshot-desktop-1440.png'),
    fullPage: false
  });
  console.log('Saved screenshot-desktop-1440.png');

  // 2. Mobile Check (390x844)
  console.log('\n--- 2. Testing Mobile Viewport (390x844) ---');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  const mobileScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const mobileInnerWidth = await page.evaluate(() => window.innerWidth);
  const mobileNoOverflow = mobileScrollWidth === mobileInnerWidth;

  console.log(`Mobile scrollWidth: ${mobileScrollWidth}, innerWidth: ${mobileInnerWidth}`);
  console.log(`Zero horizontal overflow: ${mobileNoOverflow ? 'PASS ✓' : 'FAIL ✗'}`);

  await page.screenshot({
    path: path.join(__dirname, '../public/screenshot-mobile-390.png'),
    fullPage: false
  });
  console.log('Saved screenshot-mobile-390.png');

  // 3. Section checks
  console.log('\n--- 3. Verifying Section IDs & Key Elements ---');
  const sections = await page.evaluate(() => {
    const ids = ['hero', 'about', 'skills', 'work', 'certifications', 'experience', 'achievements', 'contact'];
    return ids.map(id => ({
      id,
      exists: !!document.getElementById(id),
      height: document.getElementById(id)?.offsetHeight || 0
    }));
  });
  console.table(sections);

  console.log(`\nRuntime Console Errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error('Console errors found:', consoleErrors);
  } else {
    console.log('Zero runtime console errors! PASS ✓');
  }

  await browser.close();

  if (!desktopNoOverflow || !mobileNoOverflow || consoleErrors.length > 0) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
