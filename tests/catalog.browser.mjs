import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { companies } from '../career-data.js';
import { paths } from '../data.js';
import { mobilityRoles } from '../mobility-data.js';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4173';
await mkdir('artifacts', { recursive: true });
let browser;
try { browser = await chromium.launch({ channel: 'msedge', headless: true }); }
catch { browser = await chromium.launch({ channel: 'chrome', headless: true }); }
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
const page = await context.newPage(), errors = [];
page.on('pageerror', error => errors.push(error.message));
await context.route('**/api/resume/models', route => route.fulfill({ json: { defaultModel: 'claude-sonnet-4-6', models: [{ id: 'claude-sonnet-4-6' }] } }));
async function navigate(hash) {
  await page.goto(base + '/#' + hash);
  await expect(page.locator('#content h1').first()).toBeVisible();
}
try {
  for (const company of companies.filter(item => ['meituan', 'zhipu', 'jd', 'baidu', 'mihoyo', 'netease'].includes(item.id))) {
    for (const role of ['robotics', 'driving']) {
      await navigate(`interviews?role=${role}&company=${company.id}`);
      await expect(page.locator('.company-focus h3')).toContainText(company.title);
      await expect(page.locator('#career-role option')).toHaveCount(paths.length);
      await expect(page.locator('.company-pill')).toHaveCount(companies.length + 1);
      await expect(page.locator('.question-card')).toHaveCount(4);
      await expect(page.locator('.company-focus a')).toHaveAttribute('href', company.url);
      await page.getByRole('link', { name: '面经与我的复盘', exact: true }).click();
      await expect(page.locator('.experience-source h3')).toContainText(company.title);
      await page.locator('[name="note"]').fill(company.title + ' · ' + role + ' 独立复盘');
      await page.getByRole('button', { name: '保存复盘', exact: true }).click();
      await page.reload();
      await expect(page.locator('[name="note"]')).toHaveValue(company.title + ' · ' + role + ' 独立复盘');
    }
  }
  for (const role of mobilityRoles) {
    await navigate('role?role=' + role.id);
    await expect(page.locator('#content h1')).toContainText(role.title);
  }
  for (const theme of ['light', 'dark']) for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 960 });
    await page.evaluate(value => document.documentElement.dataset.theme = value, theme);
    for (const route of ['interviews?role=driving&company=baidu', 'interviews?role=robotics&company=meituan&tab=experience', 'growth?direction=embodied', 'growth?direction=driving', 'role?role=vehicle-algorithm-test-engineer', 'projects?role=driving', 'resources']) {
      await navigate(route);
      if (route === 'resources') await page.locator('#resource-path').selectOption('driving');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${route} ${width} ${theme}`);
      if ([1440, 390].includes(width) && ['growth?direction=embodied', 'growth?direction=driving', 'interviews?role=driving&company=baidu'].includes(route)) await page.screenshot({ path: `artifacts/catalog-${route.split('?')[0]}-${route.includes('embodied') ? 'embodied' : 'driving'}-${theme}-${width}.png`, fullPage: true });
    }
  }
  await navigate('search?q=' + encodeURIComponent('智谱'));
  await expect(page.locator('.company-card')).toHaveCount(1);
  await navigate('search?q=' + encodeURIComponent('具身智能'));
  await expect(page.locator('.path-card')).toHaveCount(1);
  await navigate('search?q=' + encodeURIComponent('智能驾驶'));
  assert.ok(await page.locator('.path-card').count() >= 1);
  assert.deepEqual(errors, []);
  console.log('Catalogue browser checks passed: 12 company/direction combinations, independent notes, 16 specialist roles, search and 42 responsive states.');
} finally { await browser.close(); }
