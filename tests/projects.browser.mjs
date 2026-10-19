import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { projects, filterProjects } from '../project-data.js';
import { paths } from '../data.js';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4173';
const artifacts = fileURLToPath(new URL('../artifacts/', import.meta.url));
await mkdir(artifacts, { recursive: true });
let browser;
try { browser = await chromium.launch({ channel: 'msedge', headless: true }); }
catch { browser = await chromium.launch({ channel: 'chrome', headless: true }); }
const errors = [], failed = [];
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, colorScheme: 'dark' });
page.on('pageerror', error => errors.push(error.message));
page.on('response', response => { if (response.url().startsWith(base) && response.status() >= 400) failed.push(response.url() + ' ' + response.status()); });
const cards = page.locator('#project-grid > .project-card:visible');
const search = page.getByRole('searchbox', { name: '搜索项目', exact: true });
async function noOverflow() {
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'page overflows viewport');
  const outside = await cards.evaluateAll(nodes => nodes.filter(n => n.getBoundingClientRect().right > innerWidth + 1 || n.getBoundingClientRect().left < -1).length);
  assert.equal(outside, 0, 'cards overflow viewport');
}
try {
  await page.goto(base + '/#home');
  await page.locator('#main-nav a[href="#projects"]').click();
  await expect(page.locator('#page-title')).toHaveText('项目实践');
  await expect(cards).toHaveCount(projects.length);
  await expect(page.locator('#main-nav a[href="#projects"]')).toHaveAttribute('aria-current', 'page');
  await noOverflow();
  await page.evaluate(() => { window.originalProjectNode = document.querySelector('[data-project-id="ncnn"]'); window.originalProjectPage = document.querySelector('.project-page'); });
  await page.getByRole('combobox', { name: '岗位方向', exact: true }).selectOption('cv');
  await page.getByRole('combobox', { name: '所属地区', exact: true }).selectOption('china');
  await search.fill('深圳 NCNN');
  await expect(cards).toHaveCount(1);
  await expect(cards).toHaveAttribute('data-project-id', 'ncnn');
  await expect(search).toBeFocused();
  assert.ok(await page.evaluate(() => window.originalProjectNode === document.querySelector('[data-project-id="ncnn"]') && window.originalProjectPage === document.querySelector('.project-page')), 'filtering replaced DOM');
  assert.match(page.url(), /role=cv/);assert.match(page.url(), /region=china/);
  const shared = page.url();
  await page.reload();
  await expect(cards).toHaveCount(1);await expect(search).toHaveValue('深圳 NCNN');
  await expect(page.getByRole('combobox', { name: '所属地区', exact: true })).toHaveValue('china');
  await expect(page.getByRole('combobox', { name: '岗位方向', exact: true })).toHaveValue('cv');
  await page.getByRole('button', { name: '重置筛选', exact: true }).click();
  await expect(cards).toHaveCount(projects.length);await expect(search).toHaveValue('');
  await expect(page.getByRole('button', { name: '重置筛选', exact: true })).toBeDisabled();
  // IME composition should leave the current results alone until composition completes.
  await search.focus();
  await search.evaluate(el => { el.value = '杭州';el.dispatchEvent(new InputEvent('input', { bubbles: true, isComposing: true })); });
  await expect(cards).toHaveCount(projects.length);
  await search.dispatchEvent('compositionend');
  await expect(cards).toHaveCount(1);
  await search.fill('不存在的项目xyz');
  await expect(cards).toHaveCount(0);await expect(page.locator('#project-empty')).toBeVisible();
  await page.getByRole('button', { name: '查看全部项目', exact: true }).click();
  await expect(cards).toHaveCount(projects.length);
  await page.getByRole('button', { name: 'Agent 开发', exact: true }).click();
  await expect(page.getByRole('combobox', { name: '岗位方向', exact: true })).toHaveValue('agent');
  await expect(cards).toHaveCount(filterProjects(projects, { role: 'agent', region: 'all', q: '' }, paths).length);
  await page.getByRole('button', { name: '全部方向', exact: true }).click();
  // Every role must be selectable and return a real project.
  for (const role of paths) {
    await page.getByRole('combobox', { name: '岗位方向', exact: true }).selectOption(role.id);
    await expect(cards).toHaveCount(filterProjects(projects, { role: role.id, region: 'all', q: '' }, paths).length);
  }
  await page.getByRole('button', { name: '重置筛选', exact: true }).click();
  const allLinks = await cards.evaluateAll(nodes => nodes.map(n => ({ href: n.href, target: n.target, rel: n.rel })));
  assert.equal(allLinks.length, projects.length);
  for (const link of allLinks) { assert.equal(link.target, '_blank');assert.ok(link.rel.includes('noopener') && link.rel.includes('noreferrer'));assert.ok(/^https:\/\/(github|gitee)\.com\//.test(link.href)); }
  // Intercept only the test popup so opening a repository never depends on network.
  await page.context().route('https://github.com/langgenius/dify', r => r.fulfill({ contentType: 'text/html', body: '<title>Repository test</title>' }));
  const popupPromise = page.waitForEvent('popup');
  await page.locator('[data-project-id="dify"] h3').click();
  const popup = await popupPromise;
  await popup.waitForLoadState();assert.equal(popup.url(), 'https://github.com/langgenius/dify');await popup.close();
  // Global search includes project matches and renders user input as text.
  await page.locator('#search-input').fill('ncnn');await page.locator('#search-input').press('Enter');
  await expect(page.locator('#content .project-card')).toHaveCount(1);
  await page.goto(base + '/#projects?q=' + encodeURIComponent('<img src=x onerror="window.projectInjected=1">'));
  await expect(page.locator('#project-empty')).toBeVisible();
  assert.equal(await page.evaluate(() => window.projectInjected), undefined);
  assert.equal(await page.locator('.project-page img').count(), 0);
  await page.goto(base + '/#projects?role=unknown&region=unknown');
  await expect(cards).toHaveCount(projects.length);
  // Visual and layout checks cover narrow phones, tablet and desktop in both themes.
  for (const theme of ['dark', 'light']) {
    await page.evaluate(theme => { document.documentElement.dataset.theme = theme;localStorage.setItem('zhixu-theme-v1', theme); }, theme);
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 1000 });await noOverflow();
      assert.equal(await page.locator('#project-grid').evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length), width <= 680 ? 1 : width <= 1280 ? 2 : 3);
      if ([390, 1440].includes(width)) await page.screenshot({ path: artifacts + 'projects-' + theme + '-' + width + '.png', fullPage: true, animations: 'disabled' });
    }
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await cards.first().evaluate(el => getComputedStyle(el).transitionDuration), '0s');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('#mobile-menu').click();
  await expect(page.locator('#sidebar')).toHaveClass(/open/);
  await page.locator('#main-nav a[href="#resources"]').click();
  await expect(page.locator('.resource-list').first()).toBeVisible();
  // Learning-route bridge preserves its role selection and closes the modal.
  await page.goto(base + '/#tech');await page.locator('[data-path="cv"]').first().click();
  await page.locator('#detail-dialog [data-project-link]').click();
  await expect(page.locator('#detail-dialog')).not.toBeVisible();
  await expect(page.getByRole('combobox', { name: '岗位方向', exact: true })).toHaveValue('cv');
  assert.deepEqual(errors, []);assert.deepEqual(failed, []);
  console.log(JSON.stringify({ projects: projects.length, roles: paths.length, themeWidths: 10, checked: ['combined filters', 'stable DOM and focus', 'IME', 'share and reload', 'empty reset', 'external popup', 'global search', 'escaping', 'responsive layout', 'reduced motion', 'mobile navigation', 'learning bridge'], shared }));
} finally { await browser.close(); }
