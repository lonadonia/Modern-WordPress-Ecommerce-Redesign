import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:4173';
const screenshotDir = path.resolve('preview/screenshots');
await mkdir(screenshotDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const issues = [];
const checks = [];

const attachDiagnostics = (page, viewport) => {
  page.on('console', (message) => {
    if (message.type() === 'error') issues.push({ type: 'console', viewport, url: page.url(), message: message.text() });
  });
  page.on('pageerror', (error) => issues.push({ type: 'pageerror', viewport, url: page.url(), message: error.message }));
  page.on('requestfailed', (request) => {
    const message = request.failure()?.errorText || 'failed';
    if (message !== 'net::ERR_ABORTED') issues.push({ type: 'requestfailed', viewport, url: request.url(), message });
  });
  page.on('response', (response) => { if (response.status() === 404) issues.push({ type: '404', viewport, url: response.url(), message: 'HTTP 404' }); });
};

const inspect = async (page, label, viewportWidth) => {
  await page.waitForLoadState('networkidle');
  const result = await page.evaluate(() => ({
    h1Count: document.querySelectorAll('main h1').length,
    title: document.title,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    images: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src),
    emptyInternalLinks: [...document.querySelectorAll('a[href]')].filter((anchor) => anchor.getAttribute('href') === '#').map((anchor) => anchor.textContent.trim()),
    unlabeledFields: [...document.querySelectorAll('input, select, textarea')].filter((field) => field.type !== 'hidden' && field.offsetParent !== null && !field.labels?.length && !field.getAttribute('aria-label') && !field.getAttribute('aria-labelledby')).map((field) => field.name || field.id || field.type),
    unnamedButtons: [...document.querySelectorAll('button')].filter((button) => button.offsetParent !== null && !button.textContent.trim() && !button.getAttribute('aria-label') && !button.getAttribute('aria-labelledby')).length
  }));
  checks.push({ label, viewportWidth, ...result });
  if (result.h1Count !== 1) issues.push({ type: 'heading', viewport: viewportWidth, url: page.url(), message: `Expected one H1, found ${result.h1Count}` });
  if (result.overflow > 1) issues.push({ type: 'overflow', viewport: viewportWidth, url: page.url(), message: `${result.overflow}px horizontal overflow` });
  if (result.images.length) issues.push({ type: 'image', viewport: viewportWidth, url: page.url(), message: result.images.join(', ') });
  if (result.emptyInternalLinks.length) issues.push({ type: 'link', viewport: viewportWidth, url: page.url(), message: `Empty links: ${result.emptyInternalLinks.join(', ')}` });
  if (result.unlabeledFields.length) issues.push({ type: 'label', viewport: viewportWidth, url: page.url(), message: `Unlabeled fields: ${result.unlabeledFields.join(', ')}` });
  if (result.unnamedButtons) issues.push({ type: 'button-name', viewport: viewportWidth, url: page.url(), message: `${result.unnamedButtons} visible buttons have no accessible name.` });
};

const goto = async (page, route) => {
  const response = await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' });
  if (!response || !response.ok()) issues.push({ type: 'route', viewport: page.viewportSize()?.width, url: route, message: `Status ${response?.status()}` });
};

const seedCart = async (page) => {
  await goto(page, '/product/white-shaker-base-cabinet');
  await page.locator('[data-config="Three drawers"]').click();
  await page.locator('button[data-width="18"]').click();
  await page.locator('[data-add-product]').first().click();
  await page.waitForTimeout(250);
};

const screenshotRoutes = async (page, suffix) => {
  const routes = [
    ['home', '/'],
    ['category', '/shop/white-shaker-cabinets'],
    ['product', '/product/white-shaker-base-cabinet'],
    ['quote', '/free-3d-kitchen-design']
  ];
  for (const [name, route] of routes) {
    await goto(page, route);
    await inspect(page, `${name}-${suffix}`, page.viewportSize().width);
    await page.screenshot({ path: path.join(screenshotDir, `${name}-${suffix}.png`), fullPage: true });
  }
  await seedCart(page);
  await goto(page, '/cart');
  await inspect(page, `cart-${suffix}`, page.viewportSize().width);
  await page.screenshot({ path: path.join(screenshotDir, `cart-${suffix}.png`), fullPage: true });
  await goto(page, '/checkout');
  await inspect(page, `checkout-${suffix}`, page.viewportSize().width);
  await page.screenshot({ path: path.join(screenshotDir, `checkout-${suffix}.png`), fullPage: true });
};

const desktop = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
const desktopPage = await desktop.newPage();
attachDiagnostics(desktopPage, 1440);
await screenshotRoutes(desktopPage, 'desktop');

await goto(desktopPage, '/shop/white-shaker-cabinets');
await desktopPage.locator('[data-filter-form="desktop"] input[name="type"][value="base"]').check({ force: true });
await desktopPage.locator('[data-sort]').selectOption('price-desc');
const filteredCount = await desktopPage.locator('[data-product-card]:visible').count();
checks.push({ label: 'desktop-filter', filteredCount, url: desktopPage.url() });
if (!desktopPage.url().includes('type=base') || filteredCount < 1) issues.push({ type: 'filter', viewport: 1440, url: desktopPage.url(), message: 'Filter state or URL did not update.' });

await goto(desktopPage, '/free-3d-kitchen-design');
await desktopPage.fill('#quote-zip', '75201');
await desktopPage.locator('label.visual-choice:has(input[name="projectType"][value="full-kitchen"])').click();
await desktopPage.selectOption('#project-stage', 'measuring');
await desktopPage.selectOption('#desired-service', '3d-design');
await desktopPage.locator('[data-quote-next]').click();
await desktopPage.locator('label.layout-choice:has(input[name="layout"][value="l-shape"])').click();
await desktopPage.locator('label.style-choice:has(input[name="doorStyle"][value="white-shaker"])').click();
await desktopPage.locator('[data-quote-next]').click();
await desktopPage.locator('label.choice-radio:has(input[name="budget"][value="10-20"])').click();
await desktopPage.locator('label.choice-radio:has(input[name="timing"][value="3-6"])').click();
await desktopPage.locator('label.visual-choice:has(input[name="installation"][value="contractor"])').click();
await desktopPage.locator('label.choice-radio:has(input[name="fulfillment"][value="delivery"])').click();
await desktopPage.locator('[data-quote-next]').click();
await desktopPage.fill('#full-name', 'Prototype Customer');
await desktopPage.fill('#email', 'prototype@example.com');
await desktopPage.fill('#phone', '4692096518');
await desktopPage.selectOption('#contact-method', 'email');
await desktopPage.setInputFiles('#quote-files', { name: 'kitchen-sketch.png', mimeType: 'image/png', buffer: Buffer.from('89504e470d0a1a0a', 'hex') });
if (await desktopPage.locator('[data-upload-previews] .upload-preview').count() !== 1) issues.push({ type: 'quote-upload', viewport: 1440, url: desktopPage.url(), message: 'Upload preview was not created.' });
await desktopPage.locator('input[name="consent"]').check({ force: true });
await desktopPage.locator('[data-quote-submit]').click();
await desktopPage.waitForURL('**/quote-confirmation', { timeout: 5000 });
await inspect(desktopPage, 'quote-confirmation-desktop', 1440);
await desktopPage.screenshot({ path: path.join(screenshotDir, 'quote-confirmation-desktop.png'), fullPage: true });

await seedCart(desktopPage);
await goto(desktopPage, '/checkout');
await desktopPage.fill('#checkout-email', 'prototype@example.com');
await desktopPage.fill('#checkout-phone', '4692096518');
await desktopPage.fill('#first-name', 'Prototype');
await desktopPage.fill('#last-name', 'Customer');
await desktopPage.fill('#street', '100 Test Street');
await desktopPage.fill('#city', 'Dallas');
await desktopPage.selectOption('#state', 'TX');
await desktopPage.fill('#checkout-zip', '75201');
await desktopPage.fill('#card-number', '4242 4242 4242 4242');
await desktopPage.fill('#expiry', '12/30');
await desktopPage.fill('#cvc', '123');
await desktopPage.locator('input[name="terms"]').check({ force: true });
await desktopPage.locator('[data-place-order]').click();
await desktopPage.waitForURL('**/order-confirmation', { timeout: 5000 });
await inspect(desktopPage, 'order-confirmation-desktop', 1440);
await desktopPage.screenshot({ path: path.join(screenshotDir, 'order-confirmation-desktop.png'), fullPage: true });

const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, reducedMotion: 'reduce', isMobile: true, hasTouch: true });
const mobilePage = await mobile.newPage();
attachDiagnostics(mobilePage, 390);
await screenshotRoutes(mobilePage, 'mobile');
await goto(mobilePage, '/');
await mobilePage.locator('[data-open-drawer="mobile-nav"]').click();
if (await mobilePage.locator('#mobile-nav').getAttribute('aria-hidden') !== 'false') issues.push({ type: 'mobile-nav', viewport: 390, url: mobilePage.url(), message: 'Mobile drawer did not open.' });
await mobilePage.locator('[data-close-drawer]').click();
await goto(mobilePage, '/shop/white-shaker-cabinets');
await mobilePage.locator('[data-open-dialog="filter-dialog"]').click();
await mobilePage.locator('[data-filter-form="mobile"] input[name="width"][value="18"]').check({ force: true });
await mobilePage.locator('[data-apply-filters]').click();
if (!mobilePage.url().includes('width=18')) issues.push({ type: 'mobile-filter', viewport: 390, url: mobilePage.url(), message: 'Mobile filter URL did not update.' });

for (const viewport of [
  { width: 360, height: 800 },
  { width: 768, height: 900 },
  { width: 1024, height: 900 },
  { width: 1680, height: 1050 }
]) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: 'reduce', isMobile: viewport.width <= 390, hasTouch: viewport.width <= 768 });
  const page = await context.newPage();
  attachDiagnostics(page, viewport.width);
  for (const [name, route] of [['home','/'],['category','/shop/white-shaker-cabinets'],['product','/product/white-shaker-base-cabinet'],['quote','/free-3d-kitchen-design']]) {
    await goto(page, route); await inspect(page, `${name}-${viewport.width}`, viewport.width);
  }
  await seedCart(page); await goto(page, '/cart'); await inspect(page, `cart-${viewport.width}`, viewport.width);
  await goto(page, '/checkout'); await inspect(page, `checkout-${viewport.width}`, viewport.width);
  await context.close();
}

await writeFile(path.resolve('preview/qa-results.json'), JSON.stringify({ baseURL, generatedAt: new Date().toISOString(), checks, issues }, null, 2));
await desktop.close(); await mobile.close(); await browser.close();
console.log(JSON.stringify({ checks: checks.length, issues: issues.length, screenshots: 14 }, null, 2));
if (issues.length) {
  console.error(JSON.stringify(issues, null, 2));
  process.exitCode = 1;
}
