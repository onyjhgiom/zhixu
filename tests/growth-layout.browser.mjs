import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { access, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';

const base = (process.env.TEST_BASE_URL || 'http://127.0.0.1:4173').replace(/\/+$/, '');
const artifacts = new URL('../artifacts/', import.meta.url);
const uiFile = new URL('../growth-ui.js', import.meta.url);
const directions = ['frontend', 'backend', 'algorithm', 'data', 'systems', 'ai', 'security', 'testing'];
const roles = [
  'frontend-engineer', 'backend-engineer', 'fullstack-engineer', 'algorithm-engineer',
  'recommendation-engineer', 'data-analyst', 'data-engineer', 'sre-engineer',
  'cloud-engineer', 'database-engineer', 'ai-application-engineer', 'ml-engineer',
  'security-engineer', 'test-development-engineer'
];
const routes = [
  ...directions.map(id => 'growth?direction=' + id),
  ...roles.map(id => 'role?role=' + id),
  'roles', 'assessment', 'plan'
];
const captures = new Map([
  ['growth?direction=frontend', 'direction'],
  ['role?role=backend-engineer', 'role'],
  ['assessment', 'assessment'],
  ['plan', 'plan']
]);

async function waitForGrowthUi() {
  const deadline = Date.now() + 120_000;
  let lastFailure = 'growth-ui.js is not ready';
  while (Date.now() < deadline) {
    try {
      await access(uiFile);
      const response = await fetch(base + '/growth-ui.js', {
        signal: AbortSignal.timeout(Math.max(1, Math.min(5_000, deadline - Date.now())))
      });
      if (response.status === 200) {
        await response.body?.cancel();
        return;
      }
      lastFailure = 'GET /growth-ui.js returned ' + response.status;
      await response.body?.cancel();
    } catch (error) {
      lastFailure = error.message;
    }
    const remaining = deadline - Date.now();
    if (remaining > 0) await delay(Math.min(2_000, remaining));
  }
  throw new Error('Growth UI did not become available within two minutes: ' + lastFailure);
}

console.log('Waiting for local growth-ui.js and its HTTP 200 response.');
await waitForGrowthUi();
await mkdir(artifacts, { recursive: true });

let browser;
try { browser = await chromium.launch({ channel: 'msedge', headless: true }); }
catch { browser = await chromium.launch({ channel: 'chrome', headless: true }); }

const errors = [];
let checked = 0;
let screenshotCount = 0;
try {
  // A fresh browser context keeps automated checks separate from personal records.
  for (const theme of ['dark', 'light']) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      colorScheme: theme,
      reducedMotion: 'reduce'
    });
    try {
      const page = await context.newPage();
      page.on('pageerror', error => errors.push({ theme, url: page.url(), type: 'pageerror', message: error.message }));
      page.on('console', message => {
        if (message.type() === 'error') errors.push({ theme, url: page.url(), type: 'console', message: message.text() });
      });

      for (const width of [320, 390, 768, 1440]) {
        await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
        for (const hash of routes) {
          // Route values come exclusively from the fixed lists above.
          await page.goto(base + '/#' + hash, { waitUntil: 'domcontentloaded' });
          await expect(page.locator('body')).toHaveAttribute('data-page', hash.split('?')[0]);
          const heading = page.locator('#content h1').first();
          await expect(heading).toBeVisible();
          assert.ok((await heading.innerText()).trim().length > 0, hash + ' has an empty h1');
          await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
          await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));

          const layout = await page.evaluate(() => {
            const viewport = window.innerWidth;
            const scrollWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
            const overflow = scrollWidth > viewport
              ? [...document.querySelectorAll('#content *')].map(element => {
                const box = element.getBoundingClientRect();
                return { tag: element.tagName, className: String(element.className).slice(0, 100), left: box.left, right: box.right };
              }).filter(box => box.right > viewport + 1).slice(0, 10)
              : [];
            return { viewport, scrollWidth, overflow };
          });
          assert.ok(layout.scrollWidth <= layout.viewport, theme + ' ' + width + 'px #' + hash + ' overflow: ' + JSON.stringify(layout));
          assert.deepEqual(errors, [], 'Browser errors while checking ' + theme + ' ' + width + 'px #' + hash);
          checked += 1;

          if (captures.has(hash) && [390, 1440].includes(width)) {
            const device = width === 390 ? 'mobile' : 'desktop';
            const name = 'growth-' + captures.get(hash) + '-' + theme + '-' + device + '-layout.png';
            await page.screenshot({ path: fileURLToPath(new URL(name, artifacts)), fullPage: true, animations: 'disabled' });
            screenshotCount += 1;
          }
        }
      }
    } finally {
      await context.close();
    }
  }
  assert.deepEqual(errors, []);
  console.log('Growth layout checks passed: ' + checked + ' route/theme/viewport combinations, '
    + directions.length + ' directions, ' + roles.length + ' role details, roles/assessment/plan, '
    + screenshotCount + ' screenshots, and zero console or page errors.');
} finally {
  await browser.close();
}
