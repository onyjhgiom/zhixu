import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { readFile, mkdir } from 'node:fs/promises';
import { unzipSync } from 'fflate';
import { createResumeAISource } from '../resume-ai-core.js';
import { RESUME_TEMPLATES } from '../resume-templates.js';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4173';
await mkdir('artifacts', { recursive: true });
let browser;
try { browser = await chromium.launch({ channel: 'msedge', headless: true }); }
catch { browser = await chromium.launch({ channel: 'chrome', headless: true }); }
const context = await browser.newContext({ viewport: { width: 1440, height: 1080 }, reducedMotion: 'reduce', acceptDownloads: true });
const aiRequests = [];
let aiBehavior = 'success';
let modelsBehavior = 'success';
await context.route('**/api/resume/models', route => modelsBehavior === 'failure' ? route.fulfill({ status: 503, json: { error: { message: '模型列表暂不可用' } } }) : route.fulfill({ json: { defaultModel: 'gpt-6-astra', models: [{ id: 'gpt-6-astra', name: 'GPT-6 Astra' }, { id: 'gpt-5.5', name: 'GPT-5.5' }, { id: 'codex-mini-latest', name: 'Codex Mini' }] } }));
await context.route('**/api/resume/generate', async route => {
  const request = route.request().postDataJSON(); aiRequests.push(request);
  if (aiBehavior === 'failure') return route.fulfill({ status: 503, json: { error: { code: 'AI_ACCOUNTS_UNAVAILABLE', message: '接口服务商当前没有可用的上游账号。请联系服务商恢复该分组的可用账号。' } } });
  if (aiBehavior === 'slow') await new Promise(resolve => setTimeout(resolve, 1000));
  const source = createResumeAISource(request);
  const plan = { summary: source.summary, sections: source.sections.map(section => ({ id: section.id, items: section.items.map((item, index) => ({ index, bullets: item.bullets.map((bullet, index) => ({ text: bullet.text, sourceIndexes: [index] })) })) })), suggestions: ['补充可核验的项目验收记录。'] };
  return route.fulfill({ json: { plan, model: request.model || 'gpt-6-astra' } }).catch(() => {});
});
const page = await context.newPage(), errors = [];
page.on('pageerror', error => errors.push(error.message));
const field = path => page.locator(`[data-resume-field="${path}"]`);
const step = index => page.locator(`.resume-step[data-resume-step="${index}"]`);
const draft = () => page.evaluate(() => JSON.parse(localStorage.getItem('zhixu-resume-v1')));
const next = () => page.locator('[data-resume-next]').click();
async function navigate(hash) { await page.goto(`${base}/#${hash}`); await page.locator('#content h1').first().waitFor(); }
async function download(format, filename) {
  const pending = page.waitForEvent('download'); await page.locator(`[data-resume-export="${format}"]`).click();
  const item = await pending; assert.equal(await item.failure(), null); await item.saveAs(filename);
  await expect(page.locator(`[data-resume-export="${format}"]`)).toBeEnabled();
  return readFile(filename);
}
try {
  for (const file of ['resume-ui.js', 'resume-core.js', 'resume-export.js', 'resume-templates.js', 'resume.css', 'vendor/jspdf.umd.min.js']) {
    const response = await page.request.get(`${base}/${file}`); assert.equal(response.status(), 200, file);
  }
  assert.equal((await page.request.get(`${base}/node_modules/jspdf/package.json`)).status(), 404);
  await navigate('interviews?role=game&company=tencent');
  await page.locator('[data-review]').first().check();
  await page.getByRole('link', { name: '面经与我的复盘', exact: true }).click();
  await page.locator('[name="note"]').fill('保留原有游戏面试复盘');
  await page.getByRole('button', { name: '保存复盘', exact: true }).click();
  const careerBefore = await page.evaluate(() => localStorage.getItem('zhixu-career-v1'));
  await page.getByRole('link', { name: '智能简历生成', exact: true }).first().click();
  await expect(page.locator('#resume-builder')).toBeVisible();
  await next(); assert.equal((await draft()).step, 0);
  await field('basics.name').fill('林知远'); await field('basics.email').fill('lin@example.com'); await field('basics.phone').fill('13800138000'); await field('basics.city').fill('杭州');
  await field('basics.summary').fill('关注 Unity 客户端开发，以可验证的性能数据推进优化。');
  await field('basics.website').fill('https://github.com/lin-zhiyuan');
  await field('basics.name').press('Enter'); await expect(field('basics.name')).toHaveValue('林知远');
  const imageBuffer = Buffer.from(await page.evaluate(() => {
    const canvas = document.createElement('canvas'); canvas.width = 100; canvas.height = 140;
    const ctx = canvas.getContext('2d'); ctx.fillStyle = '#b8d8e8'; ctx.fillRect(0, 0, 100, 140); ctx.fillStyle = '#526575'; ctx.beginPath(); ctx.arc(50, 47, 23, 0, Math.PI * 2); ctx.fill(); ctx.fillRect(18, 80, 64, 60);
    return canvas.toDataURL('image/png').split(',')[1];
  }), 'base64');
  await page.locator('[data-resume-photo]').setInputFiles({ name: 'portrait.png', mimeType: 'image/png', buffer: imageBuffer });
  await expect(page.locator('.resume-photo img')).toBeVisible(); const photo1 = (await draft()).photo;
  await page.locator('[data-resume-photo]').setInputFiles({ name: 'invalid.png', mimeType: 'image/png', buffer: Buffer.from('invalid') });
  await expect(page.locator('#toast')).toContainText('照片无法读取'); assert.equal((await draft()).photo, photo1);
  await page.locator('[data-resume-photo]').setInputFiles({ name: 'invalid.svg', mimeType: 'image/svg+xml', buffer: Buffer.from('<svg/>') });
  await expect(page.locator('#toast')).toContainText('照片需为'); assert.equal((await draft()).photo, photo1);
  await next(); await page.locator('[data-resume-add="education"]').click();
  for (const [name, value] of Object.entries({ school: '示例大学', degree: '本科', major: '计算机科学与技术', start: '2021.09', end: '2025.06', details: '专业排名 10/120；软件设计竞赛二等奖' })) await field(`education.0.${name}`).fill(value);
  await next(); await page.locator('[data-resume-add="experience"]').click();
  for (const [name, value] of Object.entries({ company: '示例互动工作室', title: '游戏开发实习生', start: '2024.07', end: '2024.10', details: '维护团队文档。使用 Unity 与 C# 实现对象池，内存峰值降低 18%。编写单元测试，覆盖 12 个核心流程。' })) await field(`experience.0.${name}`).fill(value);
  await page.locator('[data-resume-add="projects"]').click();
  for (const [name, value] of Object.entries({ name: '双人联机解谜游戏', role: '客户端开发', start: '2024.03', end: '2024.06', details: '设计游戏 UI 页面。基于 Unity 实现网络同步，支持 2 名玩家协作。使用 Profiler 完成性能优化，在固定测试场景维持 60 FPS。' })) await field(`projects.0.${name}`).fill(value);
  await page.locator('[data-resume-add="projects"]').click(); await page.locator('[data-resume-remove="projects"][data-index="1"]').click();
  await next();
  await expect(field('target.roleId')).toHaveValue('game'); await expect(field('target.company')).toHaveValue('腾讯');
  await field('target.roleTitle').fill('游戏客户端工程师'); await field('skills').fill('Unity、C#、Git、TypeScript、性能优化'); await field('certificates').fill('英语六级；软件设计竞赛二等奖');
  await field('target.jd').fill('必须熟练使用 Unity、C#，掌握网络同步、性能优化。了解 Unreal Engine 优先。');
  await field('target.hc').fill('游戏客户端岗位，负责网络同步与内存优化，要求单元测试经验。');
  await next(); await expect(page.locator('[data-resume-polish]')).toBeVisible();
  await page.locator('[data-resume-polish]').click(); await expect.poll(() => aiRequests.length).toBe(1);
  await expect(page.locator('#toast')).toContainText('AI 已润色'); await expect(page.locator('.resume-paper')).toBeVisible();
  await page.locator('[data-resume-ai]').check(); await page.locator('[data-resume-generate]').click();
  await expect(page.locator('.resume-paper')).toBeVisible(); await expect(page.locator('.resume-paper-photo')).toBeVisible();
  assert.equal((await draft()).generation.mode, 'ai'); assert.equal(aiRequests[0].model, 'gpt-6-astra');
  await expect(page.locator('[data-resume-polish]')).toBeVisible();
  await page.locator('[data-resume-polish]').click(); await expect.poll(() => aiRequests.length).toBe(3);
  await expect(page.locator('#toast')).toContainText('AI 已润色');
  assert.equal(aiRequests[2].target.jd, '必须熟练使用 Unity、C#，掌握网络同步、性能优化。了解 Unreal Engine 优先。');
  for (const secret of ['林知远', '13800138000', 'lin@example.com', 'data:image']) for (const request of [aiRequests[0], aiRequests[2]]) assert.ok(!JSON.stringify(request).includes(secret));
  assert.ok(await page.locator('.resume-paper mark').count() > 0);
  await expect(page.locator('.resume-keywords.gap')).toContainText('Unreal Engine');
  assert.ok(!(await page.locator('.resume-paper').innerText()).includes('Unreal Engine'));
  assert.equal((await draft()).document.sections.length, 5);
  const bullet = page.locator('.resume-paper-bullets [contenteditable]').first(), editPath = await bullet.getAttribute('data-resume-edit');
  await bullet.fill('在线编辑：使用 Unity 验证网络同步，保留 2 人联机记录。');
  const editedText = () => page.locator(`[data-resume-edit="${editPath}"]`);
  await page.reload(); await expect(editedText()).toContainText('在线编辑');
  await page.locator('[data-resume-polish]').click();
  await expect(page.getByRole('button', { name: '确认 AI 润色', exact: true })).toBeVisible();
  await expect(page.locator('.resume-local-note')).toContainText('在线编辑内容会被替换');
  await page.getByRole('button', { name: '保留当前编辑', exact: true }).click(); await expect(editedText()).toContainText('在线编辑');
  await step(4).click();
  for (const template of RESUME_TEMPLATES) {
    await page.locator(`[data-resume-template-choice="${template.id}"]`).click();
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      await expect(editedText()).toContainText('在线编辑');
      const mismatch = await page.locator('.resume-paper').evaluate(node => {
        const paper = getComputedStyle(node);
        return { background: paper.backgroundColor, ink: paper.color, width: node.clientWidth, scroll: node.scrollWidth };
      });
      assert.ok(mismatch.scroll <= mismatch.width + 1);
      if (width !== 320) await page.locator('.resume-paper').screenshot({ path: `artifacts/resume-template-${template.id}-${width}.png` });
    }
  }
  await page.setViewportSize({ width: 1440, height: 1080 });
  await page.locator('[data-resume-template-choice="folio"]').click();
  await page.locator('[data-resume-edit="contacts.0"]').fill('');
  await page.reload(); await page.locator('[data-resume-edit="contacts.1"]').fill('edited@example.com');
  assert.deepEqual((await draft()).document.contacts.slice(0, 2), ['', 'edited@example.com']);
  await page.locator('[data-resume-edit="name"]').fill('林知远（编辑）');
  await step(0).click(); await page.getByRole('button', { name: '移除照片', exact: true }).click(); await expect(page.locator('.resume-paper-photo')).toHaveCount(0);
  await page.locator('[data-resume-photo]').setInputFiles({ name: 'new.png', mimeType: 'image/png', buffer: imageBuffer });
  await expect(page.locator('.resume-paper-photo')).toBeVisible(); await expect(editedText()).toContainText('在线编辑');
  const pdf = await download('pdf', 'artifacts/resume-edited.pdf'); assert.equal(pdf.subarray(0, 5).toString(), '%PDF-'); assert.ok(pdf.length > 10000);
  const png = await download('png', 'artifacts/resume-edited.png'); assert.equal(png.subarray(1, 4).toString(), 'PNG'); assert.equal(png.readUInt32BE(16), 1588); assert.equal(png.readUInt32BE(20), 2246);
  await step(4).click(); await page.locator('[data-resume-generate]').click();
  await expect(page.getByRole('button', { name: '确认重新生成', exact: true })).toBeVisible();
  await page.getByRole('button', { name: '保留当前编辑', exact: true }).click(); await expect(editedText()).toContainText('在线编辑');
  await page.locator('[data-resume-generate]').click(); await page.getByRole('button', { name: '确认重新生成', exact: true }).click();
  await expect(page.locator('[data-resume-edit="name"]')).toHaveText('林知远');
  await step(3).click(); await field('target.roleId').selectOption('backend'); await expect(field('target.roleTitle')).toHaveValue('后端开发');
  await field('target.roleTitle').fill('游戏客户端工程师');
  await expect(page.locator('.resume-stale')).toBeVisible();
  await next(); await page.locator('[data-resume-generate]').click();
  for (const theme of ['light', 'dark']) for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 960 }); await page.evaluate(theme => document.documentElement.dataset.theme = theme, theme);
    for (const index of [0, 3, 4]) {
      await step(index).click();
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${theme} ${width} step ${index}`);
      assert.equal(await page.locator('.resume-paper-photo').evaluate(image => image.complete && image.naturalWidth > 0), true);
      const bad = await page.locator('#resume-builder button, #resume-builder .field-control').evaluateAll(nodes => nodes.filter(node => node.scrollWidth > node.clientWidth + 2).map(node => node.textContent.slice(0, 30)));
      assert.deepEqual(bad, [], `${theme} ${width} clipped controls`);
    }
    if ([1440, 390].includes(width)) { await page.evaluate(() => { scrollTo(0, 0); document.getElementById('toast').classList.remove('visible'); }); await page.screenshot({ path: `artifacts/resume-${theme}-${width}.png`, fullPage: true }); }
  }
  await page.setViewportSize({ width: 1440, height: 1080 });
  await step(2).click();
  const longText = Array.from({ length: 22 }, (_, index) => `完成第 ${index + 1} 项客户端测试，使用 Unity 验证网络同步，记录 60 FPS 与性能优化数据并复核结果。`).join('\n');
  for (let index = 1; index <= 4; index++) { await page.locator('[data-resume-add="projects"]').click(); await field(`projects.${index}.name`).fill(`工程验证项目 ${index}`); await field(`projects.${index}.details`).fill(longText); }
  await step(4).click(); await page.locator('[data-resume-generate]').click();
  const pages = await page.evaluate(async () => {
    const { renderResumePages } = await import('./resume-export.js');
    const state = JSON.parse(localStorage.getItem('zhixu-resume-v1')), canvases = await renderResumePages(state.document, { scale: 1 });
    return canvases.map(canvas => {
      const context = canvas.getContext('2d'), pixels = context.getImageData(45, 45, 700, 1000).data;
      let dark = 0; for (let index = 0; index < pixels.length; index += 4) if (pixels[index] < 200) dark++;
      return { width: canvas.width, height: canvas.height, dark };
    });
  });
  assert.ok(pages.length >= 3); assert.ok(pages.every(page => page.dark > 500));
  const longPdf = await download('pdf', 'artifacts/resume-multipage.pdf'); assert.match(longPdf.toString('latin1'), new RegExp(`/Count ${pages.length}\\b`));
  const archive = await download('png', 'artifacts/resume-multipage-PNG.zip');
  const images = Object.values(unzipSync(archive)); assert.equal(images.length, pages.length);
  assert.ok(images.every(image => Buffer.from(image).subarray(1, 4).toString() === 'PNG'));
  await field('aiModel').selectOption('codex-mini-latest'); await page.locator('[data-resume-generate]').click();
  assert.equal(aiRequests.at(-1).model, 'codex-mini-latest');
  await expect(page.locator('.resume-ai-result')).toContainText('codex-mini-latest');
  await page.reload(); assert.equal((await draft()).generation.model, 'codex-mini-latest');
  const preserved = (await draft()).document;
  aiBehavior = 'failure'; await page.locator('[data-resume-generate]').click();
  await expect(page.locator('.resume-ai-error')).toContainText('没有可用的上游账号');
  assert.deepEqual((await draft()).document, preserved);
  aiBehavior = 'slow'; await page.locator('[data-resume-generate]').click();
  await expect(page.locator('.resume-generating')).toBeVisible(); await expect(step(0)).toBeDisabled();
  await page.locator('[data-resume-cancel-ai]').click(); await expect(page.locator('.resume-ai-error')).toContainText('已取消');
  assert.deepEqual((await draft()).document, preserved);
  await page.locator('[data-resume-local]').click(); await expect(page.locator('.resume-ai-result')).toHaveCount(0);
  assert.equal((await draft()).generation, null); assert.equal((await draft()).useAI, false);
  const localRequests = aiRequests.length;
  await page.locator('[data-resume-edit="name"]').fill('模板切换保留的编辑');
  for (const template of RESUME_TEMPLATES) {
    await page.locator(`[data-resume-template-choice="${template.id}"]`).click();
    await expect(page.locator('.resume-paper')).toHaveAttribute('data-resume-template', template.id);
    await expect(page.locator('[data-resume-edit="name"]')).toHaveText('模板切换保留的编辑');
    const rendered = await page.evaluate(async () => {
      const { renderResumePages } = await import('./resume-export.js');
      const state = JSON.parse(localStorage.getItem('zhixu-resume-v1'));
      const pages = await renderResumePages(state.document, { scale: 1 });
      return pages.map(page => ({ background: [...page.getContext('2d').getImageData(10, 20, 1, 1).data].slice(0, 3) }));
    });
    const expected = template.palette.background.slice(1).match(/../g).map(value => parseInt(value, 16));
    assert.ok(rendered.length > 1);
    assert.ok(rendered.every(page => JSON.stringify(page.background) === JSON.stringify(expected)));
    await page.reload();
    await expect(page.locator('.resume-paper')).toHaveAttribute('data-resume-template', template.id);
    assert.equal((await draft()).documentEdited, true);
  }
  assert.equal(aiRequests.length, localRequests);
  await page.locator('[data-resume-template-choice="folio"]').click();
  modelsBehavior = 'failure'; await page.reload();
  await expect(page.locator('.resume-ai-settings')).toContainText('模型列表暂不可用');
  await expect(field('aiModel').locator('option[value="gpt-6-astra"]')).toHaveCount(1);
  await expect(field('aiModel').locator('option[value="codex-mini-latest"]')).toHaveCount(1);
  await page.locator('[data-resume-ai]').check(); await field('aiModel').selectOption('codex-mini-latest');
  modelsBehavior = 'success'; await page.locator('[data-resume-models-retry]').click();
  await expect(page.locator('[data-resume-models-retry]')).toHaveCount(0);
  await expect(field('aiModel')).toHaveValue('codex-mini-latest');
  aiBehavior = 'success';
  assert.equal(await page.evaluate(() => localStorage.getItem('zhixu-career-v1')), careerBefore);
  await page.getByRole('link', { name: '返回笔试与面试', exact: false }).click(); await expect(page.locator('.question-card')).toHaveCount(4);
  await expect(page.locator('[data-review]').first()).toBeChecked();
  await page.getByRole('link', { name: '面经与我的复盘', exact: true }).click(); await expect(page.locator('[name="note"]')).toHaveValue('保留原有游戏面试复盘');
  await page.evaluate(() => localStorage.setItem('zhixu-resume-v1', '{broken'));
  await navigate('interviews?tab=resume'); await page.reload(); await expect(field('basics.name')).toHaveValue('');
  await page.evaluate(() => localStorage.setItem('zhixu-resume-v1', JSON.stringify({ step: 4, document: { name: '<img src=x onerror=alert(1)>', sections: [{ id: '__proto__' }] } })));
  await page.reload(); assert.equal(await page.locator('.resume-paper img').count(), 0); await expect(page.locator('.resume-paper')).toContainText('<img src=x onerror=alert(1)>');
  const quota = await context.newPage();
  await quota.addInitScript(() => { Storage.prototype.setItem = () => { throw new DOMException('Full', 'QuotaExceededError'); }; });
  await quota.goto(`${base}/#interviews?tab=resume`); await quota.locator('[data-resume-step="0"]').first().click();
  await quota.locator('[data-resume-field="basics.name"]').fill('会话草稿'); await quota.locator('[data-resume-field="basics.email"]').fill('draft@example.com'); await quota.locator('[data-resume-next]').click();
  await expect(quota.locator('.resume-storage')).toContainText('会话草稿'); await quota.close();
  assert.deepEqual(errors, []);
  console.log(`Resume browser checks passed: AI success and model switching, failure and cancellation preserve edits, local fallback, forms, photos, matching, editing, persistence, exports, ${pages.length}-page PDF, 30 responsive states, corrupt storage, quota fallback and unchanged interview records. AI responses mocked; live upstream tested separately.`);
} finally { await browser.close(); }
