import { chromium } from 'playwright';
import { execSync } from 'child_process';

const FFMPEG = 'C:\\ffmpeg\\ffmpeg-8.1.1-essentials_build\\bin\\ffmpeg.exe';
const URL = 'http://localhost:3000';
const OUTPUT_WEBM = 'walkthrough-raw.webm';
const OUTPUT_MP4 = 'walkthrough.mp4';

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function smoothScroll(page, targetY, duration = 1800) {
  await page.evaluate(async ({ targetY, duration }) => {
    const startY = window.scrollY;
    const diff = targetY - startY;
    const startTime = performance.now();
    return new Promise(resolve => {
      function step(t) {
        const p = Math.min((t - startTime) / duration, 1);
        const ease = p < 0.5 ? 4*p*p*p : 1 - Math.pow(-2*p+2, 3)/2;
        window.scrollTo(0, startY + diff * ease);
        p < 1 ? requestAnimationFrame(step) : resolve();
      }
      requestAnimationFrame(step);
    });
  }, { targetY, duration });
}

async function scrollToSection(page, selector, offset = 50, duration = 1800) {
  const el = await page.$(selector);
  if (!el) return;
  const box = await el.boundingBox();
  if (!box) return;
  const currentScroll = await page.evaluate(() => window.scrollY);
  await smoothScroll(page, currentScroll + box.y - offset, duration);
}

async function hoverElement(page, selector, duration = 1200) {
  const el = await page.$(selector);
  if (!el) return;
  const box = await el.boundingBox();
  if (!box) return;
  // Move mouse slowly to center of element
  await page.mouse.move(box.x + box.width/2, box.y + box.height/2, { steps: 30 });
  await sleep(duration);
}

(async () => {
  console.log('🎬 Recording interactive walkthrough...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: { dir: '.', size: { width: 1920, height: 1080 } },
    locale: 'cs-CZ',
    timezoneId: 'Europe/Prague',
  });
  const page = await context.newPage();

  // ── Load page ──
  console.log('📍 Loading...');
  await page.goto(URL, { waitUntil: 'networkidle' });
  await sleep(2500);

  // ── 1. HERO — enjoy for 5-6 sec ──
  console.log('🏠 Hero section...');
  await sleep(3000);
  // Hover over the CTA buttons
  await hoverElement(page, 'a[href="#cenik"]', 800);
  await hoverElement(page, 'a[href="tel:+420770114540"]', 800);
  await sleep(1000);

  // ── 2. NAVBAR — showcase hover animations ──
  console.log('🧭 Navbar hover showcase...');
  // Hover each nav item to show hover effect
  const navLinks = await page.$$('nav a[href^="#"]');
  for (const link of navLinks) {
    const box = await link.boundingBox();
    if (box && box.y < 100) { // Only top navbar links
      await page.mouse.move(box.x + box.width/2, box.y + box.height/2, { steps: 15 });
      await sleep(500);
    }
  }
  await page.mouse.move(960, 400, { steps: 10 }); // Move away
  await sleep(500);

  // ── 3. Scroll to ABOUT ──
  console.log('📖 About section...');
  await scrollToSection(page, '#o-nas', 80);
  await sleep(2500);

  // ── 4. GALLERY — hover + lightbox showcase ──
  console.log('🖼️ Gallery section...');
  await scrollToSection(page, '#galerie', 80);
  await sleep(1500);

  // Hover over first gallery image to show hover effect
  const galleryImages = await page.$$('#galerie .grid > div');
  if (galleryImages.length > 0) {
    console.log('   ↳ Hovering gallery image...');
    const firstImg = galleryImages[0];
    const imgBox = await firstImg.boundingBox();
    if (imgBox) {
      // Slowly approach the image
      await page.mouse.move(imgBox.x + imgBox.width/2, imgBox.y + imgBox.height/2, { steps: 40 });
      await sleep(1500); // Let hover animation play

      // Click to open lightbox
      console.log('   ↳ Opening lightbox...');
      await firstImg.click();
      await sleep(2000);

      // Navigate through a couple of images
      console.log('   ↳ Browsing lightbox...');
      const nextBtn = await page.$('button[aria-label="Další"]');
      if (nextBtn) {
        await nextBtn.click();
        await sleep(1200);
        await nextBtn.click();
        await sleep(1200);
        await nextBtn.click();
        await sleep(1000);
      }

      // Close lightbox
      console.log('   ↳ Closing lightbox...');
      const closeBtn = await page.$('button[aria-label="Zavřít"]');
      if (closeBtn) {
        await closeBtn.click();
        await sleep(1000);
      }
    }
  }

  // ── 5. PRICING — tab switch showcase ──
  console.log('💰 Pricing section...');
  await scrollToSection(page, '#cenik', 80);
  await sleep(1500);

  // Click through pricing tabs
  const pricingTabs = await page.$$('#cenik button');
  for (let i = 0; i < Math.min(pricingTabs.length, 3); i++) {
    const tab = pricingTabs[i];
    const tabBox = await tab.boundingBox();
    if (tabBox && tabBox.y > 200) {
      await page.mouse.move(tabBox.x + tabBox.width/2, tabBox.y + tabBox.height/2, { steps: 15 });
      await sleep(400);
      await tab.click();
      await sleep(1200);
    }
  }

  // ── 6. REVIEWS — let marquee scroll ──
  console.log('⭐ Reviews section...');
  await scrollToSection(page, '#recenze', 80);
  await sleep(3000); // Let marquee animate

  // ── 7. BOOKING — step through wizard ──
  console.log('📅 Booking section...');
  await scrollToSection(page, '#rezervace', 80);
  await sleep(1500);

  // Click first service
  const serviceBtn = await page.$('#rezervace button');
  if (serviceBtn) {
    await serviceBtn.click();
    await sleep(800);
    // Click "Pokračovat"
    const continueBtn = await page.$('#rezervace button:has-text("Pokračovat")');
    if (continueBtn) {
      await continueBtn.click();
      await sleep(1200);
    }
  }

  // ── 8. CONTACT — show map and hint ──
  console.log('📍 Contact section...');
  await scrollToSection(page, '#kontakt', 40);
  await sleep(2500);

  // ── 9. Scroll back to top ──
  console.log('⬆️ Back to top...');
  await smoothScroll(page, 0, 2500);
  await sleep(1500);

  // ── Save ──
  await context.close();
  await browser.close();

  // Find and rename the recorded file
  const { readdirSync, renameSync, existsSync, unlinkSync } = await import('fs');
  const files = readdirSync('.').filter(f => f.endsWith('.webm') && f !== OUTPUT_WEBM);
  const recorded = files.sort().pop();

  if (recorded) {
    if (existsSync(OUTPUT_WEBM)) unlinkSync(OUTPUT_WEBM);
    renameSync(recorded, OUTPUT_WEBM);

    if (existsSync(OUTPUT_MP4)) unlinkSync(OUTPUT_MP4);
    console.log('\n🔄 Converting to MP4...');
    try {
      execSync(`"${FFMPEG}" -i "${OUTPUT_WEBM}" -c:v libx264 -crf 20 -preset medium -pix_fmt yuv420p -movflags +faststart "${OUTPUT_MP4}" -y`, { stdio: 'pipe' });
      const { statSync } = await import('fs');
      const s = statSync(OUTPUT_MP4);
      console.log(`✅ Saved: walkthrough.mp4 (${(s.size/1024/1024).toFixed(1)} MB)`);
    } catch (e) {
      console.log(`⚠️ FFmpeg error. Raw: ${OUTPUT_WEBM}`);
    }
  } else {
    console.log('❌ No recording found.');
  }
})();
