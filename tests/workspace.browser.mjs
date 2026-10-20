import { chromium, expect } from '@playwright/test';
import { paths, resources } from '../data.js';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { mkdir, readFile } from 'node:fs/promises';
const base=process.env.TEST_BASE_URL || 'http://127.0.0.1:4173';
const artifacts=new URL('../artifacts/',import.meta.url);await mkdir(artifacts,{recursive:true});
let browser;
try { browser=await chromium.launch({channel:'msedge',headless:true}); }
catch { browser=await chromium.launch({channel:'chrome',headless:true}); }
const page=await browser.newPage({viewport:{width:1440,height:1080},reducedMotion:'reduce'});
const errors=[];page.on('pageerror',err=>errors.push(err.message));
const metrics=()=>page.locator('.workspace-metric strong').allTextContents();
async function navigate(route){await page.goto(base+'/#'+route);await page.locator('#content h1').waitFor();}
async function workspace(){await navigate('workspace');await expect(page.locator('#content h1')).toHaveText('我的学习空间');}
try {
  // Enter through the real sidebar control, including native keyboard activation.
  await navigate('home');await page.locator('.local-profile').focus();await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#workspace$/);await expect(page.locator('.local-profile')).toHaveAttribute('aria-current','page');
  await expect(page.locator('#personal-nav [href="#workspace"]')).toHaveAttribute('aria-current','page');
  await expect(page.locator('#page-title')).toHaveText('我的学习空间');assert.match(await page.title(),/我的学习空间/);
  assert.deepEqual(await metrics(),['0','0','0','0']);await expect(page.locator('.workspace-next')).toContainText('从第一条学习路线开始');
  await page.locator('.workspace-next .btn').click();await expect(page).toHaveURL(/#tech$/);
  await page.locator('.card-open[data-path="agent"]').click();await page.getByRole('button',{name:'加入我的学习',exact:true}).click();
  await page.locator('#stage-0').check();await page.keyboard.press('Escape');
  await navigate('resources');await page.locator('#content [data-save]').first().click();
  await workspace();assert.deepEqual(await metrics(),['1','1','1','0']);
  await expect(page.locator('.workspace-next')).toContainText('第 2 / 5 阶段');
  await page.locator('.workspace-next [data-path]').click();await expect(page.locator('#stage-0')).toBeChecked();await page.locator('#stage-1').check();await page.keyboard.press('Escape');
  await expect(page.locator('.workspace-route')).toContainText('40%');
  await page.reload();assert.deepEqual(await metrics(),['1','2','1','0']);
  await page.locator('.workspace-route').click();for(let i=2;i<5;i++)await page.locator('#stage-'+i).check();await page.keyboard.press('Escape');
  await expect(page.locator('.workspace-next')).toContainText('已完成所有已加入路线');assert.deepEqual(await metrics(),['1','5','1','1']);
  // Saved entry resets earlier resource filters and reflects removal immediately.
  await navigate('resources');await page.locator('#resource-path').selectOption('backend');await page.locator('#resource-language').selectOption('英文');
  await workspace();await page.locator('.workspace-saved [data-action="saved"]').click();await expect(page).toHaveURL(/#saved$/);await expect(page.locator('#content .resource-row')).toHaveCount(1);
  await workspace();const resourceLink=page.locator('.workspace-saved .resource-body h3 a');await expect(resourceLink).toHaveAttribute('target','_blank');await expect(resourceLink).toHaveAttribute('rel','noopener noreferrer');
  await page.locator('.workspace-saved [data-save]').click();assert.deepEqual(await metrics(),['1','5','0','1']);await expect(page.locator('.workspace-saved')).toContainText('把好资料留在手边');
  await page.locator('.workspace-plan .btn').click();await expect(page).toHaveURL(/#exam$/);
  await page.locator('[name="weeks"]').fill('16');await page.locator('[name="hours"]').fill('3.5');await page.locator('[name="subject"]').selectOption('custom');await page.getByRole('button',{name:'生成复习草案',exact:true}).click();
  await workspace();await expect(page.locator('.workspace-plan')).toContainText('16 周 · 每天 3.5 小时 · 院校自命题专业课');
  const planDownload=page.waitForEvent('download');await page.locator('.workspace-plan [data-action="export-plan"]').click();assert.match((await planDownload).suggestedFilename(),/复习计划/);
  await page.locator('.workspace-drafts a').click();await expect(page).toHaveURL(/#support$/);
  await page.locator('[data-help="school"]').click();await page.locator('[name="goal"]').fill('计算机专业择校');await page.locator('[name="text"]').fill('希望根据当前的复习进度整理适合自己的目标院校。');await page.getByRole('button',{name:'保存需求草稿',exact:true}).click();
  await workspace();await expect(page.locator('.workspace-drafts')).toContainText('1 份');
  const downloadPromise=page.waitForEvent('download');await page.locator('[data-action="export-learning"]').click();const download=await downloadPromise;
  const backup=JSON.parse(await readFile(await download.path(),'utf8'));assert.equal(backup.version,1);assert.equal(backup.learning.joined[0],'agent');assert.equal(backup.learning.done.agent.length,5);assert.equal(backup.learning.plan.weeks,16);assert.equal(backup.learning.drafts.length,1);
  for(const href of ['learning','projects','interviews','support','exam']){
    await workspace();await page.locator('#content a[href="#'+href+'"]').first().click();await expect(page).toHaveURL(new RegExp('#'+href+'$'));await expect(page.locator('#content h1')).toBeVisible();
  }
  // Both palettes, small phones through large desktops, with data and empty states.
  for(const theme of ['dark','light']){
    if(await page.locator('html').getAttribute('data-theme')!==theme)await page.locator('#theme-toggle').click();
    for(const width of [1440,1024,768,390,320]){
      await page.setViewportSize({width,height:900});await workspace();
      assert.equal(await page.locator('html').getAttribute('data-theme'),theme);
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'workspace overflow: '+theme+' '+width);
      assert.ok(await page.locator('.workspace-metrics').evaluate(el=>el.scrollWidth<=el.clientWidth),'metrics overflow');
      if([1440,390].includes(width))await page.screenshot({path:fileURLToPath(new URL('workspace-'+theme+'-'+width+'.png',artifacts)),fullPage:true,animations:'disabled'});
    }
  }
  await page.setViewportSize({width:390,height:844});await navigate('home');await page.locator('#mobile-menu').click();await page.locator('.local-profile').click();
  await expect(page).toHaveURL(/#workspace$/);await expect(page.locator('#mobile-menu')).toHaveAttribute('aria-expanded','false');
  await page.reload();assert.deepEqual(await metrics(),['1','5','0','1']);
  await page.locator('#mobile-menu').click();await page.locator('#personal-nav [href="#workspace"]').click();await expect(page.locator('#mobile-menu')).toHaveAttribute('aria-expanded','false');
  // Native navigation back/forward preserves the dedicated page and data.
  await page.locator('.workspace-tool[href="#projects"]').click();await page.goBack();await expect(page).toHaveURL(/#workspace$/);assert.deepEqual(await metrics(),['1','5','0','1']);
  // A larger saved collection and route list must stay compact and usable on phones.
  await page.evaluate(({routes,saved})=>{const state=JSON.parse(localStorage.getItem('zhixu-learning-v1'));state.joined=routes;state.saved=saved;localStorage.setItem('zhixu-learning-v1',JSON.stringify(state));},{routes:paths.slice(0,6).map(p=>p.id),saved:resources.slice(0,5).map(r=>r.id)});
  await page.reload();await expect(page.locator('.workspace-route')).toHaveCount(4);await expect(page.locator('.workspace-saved .resource-row')).toHaveCount(3);
  for(const width of [1440,320]){await page.setViewportSize({width,height:900});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'populated workspace overflow');}
  await page.emulateMedia({reducedMotion:'no-preference'});await page.reload();await expect(page.locator('.workspace-hero')).toHaveClass(/fluid-surface/);await page.locator('.workspace-next [data-path]').click();await expect(page.locator('#detail-dialog')).toBeVisible();await page.keyboard.press('Escape');
  await page.evaluate(()=>localStorage.removeItem('zhixu-learning-v1'));await page.reload();assert.deepEqual(await metrics(),['0','0','0','0']);
  // Storage-disabled browsers still support the dashboard during the current session.
  const temporary=await browser.newPage();temporary.on('pageerror',err=>errors.push(err.message));
  await temporary.addInitScript(()=>{Storage.prototype.setItem=function(){throw new DOMException('Blocked','SecurityError');};Storage.prototype.getItem=function(){throw new DOMException('Blocked','SecurityError');};});
  await temporary.goto(base+'/#workspace');await expect(temporary.locator('.workspace-status')).toContainText('本次会话');
  await temporary.goto(base+'/#tech');await temporary.locator('.card-open[data-path="agent"]').click();await temporary.getByRole('button',{name:'加入我的学习',exact:true}).click();await temporary.keyboard.press('Escape');
  await temporary.goto(base+'/#workspace');await expect(temporary.locator('#content h1')).toHaveText('我的学习空间');await expect(temporary.locator('.workspace-metric strong').first()).toHaveText('1');await temporary.close();
  assert.deepEqual(errors,[]);
  console.log('Workspace checks passed: sidebar/keyboard/mobile navigation, independent route, empty and completed states, real progress, saved filters/removal, plans, drafts, JSON export, refresh/history, disabled storage and 10 theme/viewport combinations.');
} finally {await browser.close();}