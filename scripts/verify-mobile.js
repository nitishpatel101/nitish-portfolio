const path = require('path');
const puppeteer = require('c:/Users/DELL/Downloads/claude/whatsapp-ai-agent/node_modules/puppeteer');

async function testMobile() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Set viewport to mobile 390x844 (iPhone 14)
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });

  // Check horizontal overflow
  const overflow = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
    };
  });

  console.log('Mobile Viewport (390px):', overflow);

  // Capture screenshot of Hero and top area
  await page.screenshot({ path: path.join(__dirname, '../public/mobile-hero-check.png') });

  // Scroll down to About / ID card
  await page.evaluate(() => window.scrollTo(0, 900));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, '../public/mobile-about-check.png') });

  // Scroll to Skills
  await page.evaluate(() => window.scrollTo(0, 1800));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, '../public/mobile-skills-check.png') });

  // Scroll to Work
  await page.evaluate(() => window.scrollTo(0, 3200));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, '../public/mobile-work-check.png') });

  // Scroll to Contact & WhatsApp button
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, '../public/mobile-contact-check.png') });

  console.log('Screenshots captured successfully.');
  await browser.close();
}

testMobile().catch(err => {
  console.error('Error running mobile test:', err);
  process.exit(1);
});
