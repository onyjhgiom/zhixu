import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { paths, examTopics, helpServices } from '../data.js';
import { professionalDirections, professionalRoles } from '../professional-data.js';
import { videoCourses, pathVideoCourses } from '../video-data.js';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4173';
await mkdir('artifacts', { recursive: true });
let browser;
try { browser = await chromium.launch({ channel: 'msedge', headless: true }); }
catch { browser = await chromium.launch({ channel: 'chrome', headless: true }); }
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
const page = await context.newPage(), errors = [];
page.on('pageerror', error => errors.push(error.message));
await context.route('**/api/resume/models', route => route.fulfill({ json: { defaultModel: 'test-model', models: [{ id: 'test-model' }] } }));
async function navigate(hash) {
  await page.goto(`${base}/#${hash}`);
  await expect(page.locator('#content h1').first()).toBeVisible();
}
async function validate(root = page.locator('#content')) {
  const links = await root.locator('[data-video-binding]').evaluateAll(items => items.map(item => ({ href: item.href, binding: item.dataset.videoBinding, course: item.dataset.videoCourse, target: item.target, rel: item.rel, nested: !!item.parentElement.closest('a,button'), width: item.getBoundingClientRect().width })));
  assert.ok(links.length, 'No video entries');
  assert.equal(new Set(links.map(item => item.binding)).size, links.length, 'Duplicate bindings');
  for (const link of links) {
    assert.equal(link.href, videoCourses[link.course].url);
    assert.equal(link.target, '_blank');
    assert.ok(link.rel.includes('noopener') && link.rel.includes('noreferrer'));
    assert.equal(link.nested, false, link.binding);
  }
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow: ${page.url()}`);
}
try {
  await navigate('tech');
  await expect(page.locator('.path-card [data-video-binding]')).toHaveCount(paths.length);
  for (const item of paths) await expect(page.locator(`[data-video-binding="path:${item.id}"]`)).toHaveAttribute('href', videoCourses[pathVideoCourses[item.id][0]].url);
  await validate();
  await page.screenshot({ path: 'artifacts/video-directions-desktop.png', fullPage: true });
  for (const item of [...paths, ...examTopics]) {
    await navigate(item.id.startsWith('exam-') ? 'exam' : 'tech');
    await page.locator(item.id.startsWith('exam-') ? `.subject-card[data-path="${item.id}"]` : `.card-open[data-path="${item.id}"]`).click();
    const dialog = page.locator('#dialog-content');
    await expect(dialog.locator('.stage-item [data-video-binding]')).toHaveCount(item.stages.length);
    await validate(dialog);
    await page.keyboard.press('Escape');
  }
  await navigate('growth');
  await expect(page.locator('.growth-direction [data-video-binding]')).toHaveCount(professionalDirections.length);
  for (const item of professionalDirections) {
    await navigate(`growth?direction=${item.id}`);
    await expect(page.locator('.growth-stage [data-video-binding]')).toHaveCount(item.stages.length);
    await expect(page.locator('.growth-skill [data-video-binding]')).toHaveCount(item.skills.length);
    await validate();
  }
  await navigate('support');
  await expect(page.locator('.support-card [data-video-binding]')).toHaveCount(helpServices.length + 3);
  for (const key of ['wangdaoDS', 'wangdaoCO', 'wangdaoOS', 'wangdaoCN']) {
    await expect(page.locator(`.support-grid [data-video-course="${key}"]`)).toBeVisible();
  }
  await validate();
  await navigate('roles');
  await expect(page.locator('.growth-role-card [data-video-binding]')).toHaveCount(professionalRoles.length);
  await expect(page.locator('[data-video-binding="role:vehicle-algorithm-test-engineer"]')).toHaveAttribute('href', videoCourses.drivingSimulation.url);
  await validate();
  await navigate('role?role=vehicle-algorithm-test-engineer');
  await expect(page.locator('[data-video-section="role-module"] [data-video-course="drivingSimulation"]')).toBeVisible();
  await page.locator('[data-growth-make-plan]').click();
  await expect(page.locator('.growth-task')).not.toHaveCount(0);
  await expect(page.locator('.growth-task [data-video-binding]')).toHaveCount(await page.locator('.growth-task').count());
  await expect(page.locator('[data-video-section="role-module"] [data-video-course="drivingSimulation"]')).toBeVisible();
  await validate();
  for (const tab of ['practice', 'experience', 'strategy', 'resume']) {
    await navigate(`interviews?role=driving&company=huawei&tab=${tab}`);
    await expect(page.locator('[data-video-section="career"]')).toBeVisible();
    await validate();
  }
  const before = await page.evaluate(() => JSON.stringify(localStorage));
  await context.route('https://www.bilibili.com/**', route => route.fulfill({ contentType: 'text/html', body: '<title>External link destination test</title>' }));
  const opened = context.waitForEvent('page');
  await page.locator('[data-video-section="career"] a').first().click();
  const external = await opened; await external.waitForLoadState();
  assert.equal(external.url(), videoCourses.resume.url);
  assert.equal(await external.evaluate(() => window.opener === null), true);
  assert.equal(await page.evaluate(() => JSON.stringify(localStorage)), before);
  await external.close();
  await page.screenshot({ path: 'artifacts/video-resume-desktop.png', fullPage: true });
  await navigate('projects');
  await page.locator('#project-role').selectOption('robotics');
  await expect(page.locator('[data-video-section="projects"] [data-video-course="robotics"]')).toBeVisible();
  await page.locator('#project-role').selectOption('driving');
  await expect(page.locator('[data-video-section="projects"] [data-video-course="driving"]')).toBeVisible();
  await expect(page.locator('[data-video-section="projects"] [data-video-course="robotics"]')).toHaveCount(0);
  await validate();
  await navigate('resources');
  await page.locator('.video-library summary').click();
  await validate();
  for (const theme of ['dark', 'light']) {
    await page.evaluate(value => localStorage.setItem('zhixu-theme-v1', value), theme);
    await page.setViewportSize({ width: 390, height: 844 });
    for (const hash of ['tech', 'exam', 'growth?direction=embodied', 'interviews?tab=resume', 'projects?role=driving']) {
      await navigate(hash); await validate();
    }
    await navigate('interviews?tab=resume');
    await page.screenshot({ path: `artifacts/video-resume-mobile-${theme}.png`, fullPage: true });
  }
  assert.deepEqual(errors, []);
  console.log('Video learning passed: 35 path dialogs, 11 directions, 31 roles, 70 skills, saved-plan tasks, modules, new-tab safety, live filters and mobile themes.');
} finally { await browser.close(); }
