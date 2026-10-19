import { resources, paths } from '../data.js';
import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const artifacts=fileURLToPath(new URL('../artifacts/',import.meta.url));await mkdir(artifacts,{recursive:true});
let browser;
try { browser=await chromium.launch({channel:'msedge',headless:true}); }
catch { browser=await chromium.launch({channel:'chrome',headless:true}); }
const page=await browser.newPage({viewport:{width:1440,height:1080},deviceScaleFactor:1});
const errors=[];page.on('pageerror',err=>errors.push(err.message));
const testBase=process.env.TEST_BASE_URL || 'http://127.0.0.1:4173';
async function navigate(hash){await page.goto(testBase+'/#'+hash);await page.locator('#content h1').waitFor();}
async function noOverflow(){assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),`horizontal overflow at ${await page.url()}`);const shortcut=page.locator('.resource-language-shortcut');if(await shortcut.count()){const box=await shortcut.boundingBox();assert.ok(box.height<70,'resource language shortcut should remain a readable horizontal button');}}
try {
  await navigate('home');
  assert.equal(await page.locator('.path-card').count(),6);await noOverflow();
  await page.screenshot({path:artifacts+'home-desktop.png',fullPage:true});
  await page.getByRole('button',{name:'人工智能',exact:true}).click();assert.equal(await page.locator('.path-card').count(),paths.filter(p=>p.category==='ai').length);
  await page.locator('.card-open[data-path="agent"]').click();
  await page.getByRole('button',{name:'加入我的学习',exact:true}).click();
  await page.locator('#stage-0').check();await page.locator('#stage-1').check();
  assert.match(await page.locator('#dialog-progress').innerText(),/40%/);
  await page.getByRole('button',{name:'关闭弹窗',exact:true}).click();
  await navigate('learning');assert.match(await page.locator('.learning-card').innerText(),/40%/);
  await page.reload();assert.match(await page.locator('.learning-card').innerText(),/40%/);
  await page.getByRole('button',{name:'暂停此路线',exact:true}).click();assert.equal(await page.locator('.learning-card').count(),0);
  await navigate('tech');await page.locator('.card-open[data-path="agent"]').click();assert.match(await page.locator('#dialog-progress').innerText(),/40%/);await page.keyboard.press('Escape');
  await navigate('resources');assert.equal(await page.locator('#content .resource-row').count(),resources.length);
  await page.getByRole('button',{name:'只看中文资料',exact:true}).click();
  assert.equal(await page.locator('#resource-language').inputValue(),'中文');assert.equal(await page.locator('#content .resource-row').count(),resources.filter(r=>r.lang==='中文').length);
  await page.locator('#content [data-save="hello-agents"]').click();await page.reload();assert.equal(await page.locator('#content [data-save="hello-agents"]').getAttribute('aria-pressed'),'true');await page.locator('#content [data-save="hello-agents"]').click();
  await page.getByRole('button',{name:'只看中文资料',exact:true}).click();
  for(const role of paths){await page.locator('#resource-path').selectOption(role.id);assert.equal(await page.locator('#content .resource-row').count(),resources.filter(r=>r.paths.includes(role.id)&&r.lang==='中文').length);assert.ok((await page.locator('#content .resource-lang').allTextContents()).every(x=>x==='中文'));}
  await page.locator('#resource-path').selectOption('pretrain');await page.locator('#resource-level').selectOption('高阶');assert.equal(await page.locator('#content .resource-row').count(),resources.filter(r=>r.paths.includes('pretrain')&&r.lang==='中文'&&r.level==='高阶').length);
  await page.getByRole('button',{name:'查看全部语言',exact:true}).click();assert.equal(await page.locator('#resource-path').inputValue(),'pretrain');assert.equal(await page.locator('#resource-level').inputValue(),'高阶');assert.equal(await page.locator('#resource-language').inputValue(),'all');assert.equal(await page.locator('#content .resource-row').count(),resources.filter(r=>r.paths.includes('pretrain')&&r.level==='高阶').length);
  await page.locator('#resource-level').selectOption('all');
  await page.locator('#resource-path').selectOption('frontend');assert.equal(await page.locator('#content .resource-row').count(),resources.filter(r=>r.paths.includes('frontend')).length);
  await page.locator('#resource-language').selectOption('中文');assert.equal(await page.locator('#content .resource-row').count(),resources.filter(r=>r.paths.includes('frontend')&&r.lang==='中文').length);
  await page.locator('#content [data-save="mdn"]').click();assert.equal(await page.locator('#content [data-save="mdn"]').getAttribute('aria-pressed'),'true');
  await page.locator('[data-action="saved"]').click();assert.equal(await page.locator('#content .resource-row').count(),1);
  await page.reload();assert.equal(await page.locator('#content .resource-row').count(),1);
  await page.locator('#search-input').fill('agent');await page.locator('#search-input').press('Enter');await page.waitForURL('**/#search?q=agent');assert.ok(await page.locator('.path-card').count()>0);
  await page.locator('#search-input').fill('<img src=x onerror=alert(1)>');await page.locator('#search-input').press('Enter');await page.waitForURL(/search\?q=%3C/);assert.equal(await page.locator('#content img').count(),0);

  await navigate('interviews');assert.equal(await page.locator('.question-card').count(),4);
  await page.locator('.question-card details').first().locator('summary').click();await expect(page.locator('.question-answer').first()).toBeVisible();
  await page.locator('[data-review="agent-1"]').check();assert.match(await page.locator('#practice-progress').innerText(),/1 \/ 4/);
  await page.reload();assert.equal(await page.locator('[data-review="agent-1"]').isChecked(),true);
  for(const role of paths){await page.locator('#career-role').selectOption(role.id);await page.waitForURL(new RegExp('role='+role.id+'(?:&|$)'));assert.equal(await page.locator('.question-card').count(),4);assert.equal(await page.locator('.role-overview h2').innerText(),role.title+' · 准备地图');}
  await navigate('interviews?role=backend&company=bytedance');assert.match(await page.locator('.company-focus h3').innerText(),/字节跳动/);
  await page.getByRole('link',{name:'笔试练习',exact:true}).click();assert.equal(await page.locator('.question-card').count(),2);
  await page.locator('#practice-search input').fill('LRU');await page.getByRole('button',{name:'搜索练习',exact:true}).click();await page.waitForURL(/q=LRU/);assert.equal(await page.locator('.question-card').count(),1);
  await page.locator('#practice-search input').fill('<img src=x>');await page.getByRole('button',{name:'搜索练习',exact:true}).click();await page.waitForURL(/q=%3C/);assert.equal(await page.locator('.question-card').count(),0);assert.equal(await page.locator('#content img').count(),0);
  await page.getByRole('link',{name:'面经与我的复盘',exact:true}).click();assert.equal(await page.locator('.curated-experience').count(),1);assert.equal(await page.locator('.curated-experience a').getAttribute('href'),'https://www.nowcoder.com/discuss/921820120039555072');
  await page.locator('[name="note"]').fill('接口排查复盘：<script>alert(1)</script> 先核对请求链路、缓存和数据库锁。');await page.getByRole('button',{name:'保存复盘',exact:true}).click();await page.reload();assert.match(await page.locator('[name="note"]').inputValue(),/<script>alert/);assert.equal(await page.locator('#content script').count(),0);
  await page.getByRole('link',{name:'阿里巴巴',exact:true}).click();assert.equal(await page.locator('[name="note"]').inputValue(),'');await page.getByRole('link',{name:'字节跳动',exact:true}).click();assert.match(await page.locator('[name="note"]').inputValue(),/接口排查复盘/);
  const noteDL=page.waitForEvent('download');await page.getByRole('button',{name:'导出当前复盘',exact:true}).click();assert.match((await noteDL).suggestedFilename(),/面试复盘.txt/);
  await page.getByRole('button',{name:'查看岗位资料',exact:true}).click();await page.waitForURL('**/#resources');assert.equal(await page.locator('#resource-path').inputValue(),'backend');assert.equal(await page.locator('#content .resource-row').count(),resources.filter(r=>r.paths.includes('backend')).length);
  await page.locator('#resource-level').selectOption('进阶');assert.equal(await page.locator('#content .resource-row').count(),resources.filter(r=>r.paths.includes('backend')&&r.level==='进阶').length);
  await navigate('tech');await page.locator('.card-open[data-path="frontend"]').click();await page.getByRole('link',{name:'查看岗位面试',exact:false}).click();await page.waitForURL('**/#interviews?role=frontend');assert.equal(await page.locator('#detail-dialog').isVisible(),false);
  await navigate('search?q='+encodeURIComponent('腾讯'));assert.equal(await page.locator('.company-card').count(),1);await page.locator('.company-card').click();await page.waitForURL(/company=tencent/);assert.equal(await page.locator('.question-card').count(),4);
  await navigate('interviews?role=agent&company=moonshot&tab=experience');assert.equal(await page.locator('.curated-experience').count(),1);await page.screenshot({path:artifacts+'interviews-experience.png',fullPage:true});
  await navigate('interviews?role=frontend&company=alibaba&tab=strategy');assert.equal(await page.locator('.strategy-card').count(),6);
  await navigate('interviews?role=agent&company=moonshot');await page.locator('.question-card summary').first().click();await page.evaluate(()=>{document.activeElement?.blur();window.scrollTo(0,0);});await page.screenshot({path:artifacts+'interviews-desktop.png',fullPage:true});
  await navigate('exam');await page.locator('[name="weeks"]').fill('16');await page.locator('[name="hours"]').fill('3.5');await page.locator('[name="subject"]').selectOption('custom');await page.getByRole('button',{name:'生成复习草案',exact:true}).click();assert.match(await page.locator('#plan-output').innerText(),/16 周/);
  const dlPromise=page.waitForEvent('download');await page.getByRole('button',{name:'导出复习计划',exact:true}).click();const dl=await dlPromise;assert.match(dl.suggestedFilename(),/复习计划/);
  await page.reload();assert.equal(await page.locator('[name="weeks"]').inputValue(),'16');
  await page.screenshot({path:artifacts+'exam-desktop.png',fullPage:true});
  await page.locator('[data-path="exam-os"]').click();await page.locator('#stage-0').check();await page.keyboard.press('Escape');
  await navigate('support');await page.locator('[data-help="school"]').click();await page.locator('[name="goal"]').fill('计算机专业择校');await page.locator('[name="text"]').fill('目前已经复习完数据结构，希望梳理适合自己基础的院校清单。');await page.getByRole('button',{name:'保存需求草稿',exact:true}).click();assert.equal(await page.locator('.draft-item').count(),1);assert.match(await page.locator('.draft-item').innerText(),/仅本地草稿/);await page.reload();assert.equal(await page.locator('.draft-item').count(),1);
  const draftDl=page.waitForEvent('download');await page.getByRole('button',{name:'导出需求草稿',exact:true}).click();assert.match((await draftDl).suggestedFilename(),/json$/);
  await page.locator('[data-delete-draft="0"]').click();assert.equal(await page.locator('.draft-item').count(),0);
  for(const width of [1440,1024,768,390,320]){
    await page.setViewportSize({width,height:900});
    for(const view of ['home','tech','roadmaps','resources','interviews','interviews?role=backend&company=bytedance&tab=experience','interviews?role=product&company=minimax&tab=strategy','exam','support','learning','saved']){await navigate(view);await noOverflow();}
  }
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>localStorage.clear());await navigate('home');await page.reload();await page.screenshot({path:artifacts+'home-mobile.png',fullPage:true});
  await page.getByRole('button',{name:'展开导航',exact:true}).click();assert.equal(await page.locator('#mobile-menu').getAttribute('aria-expanded'),'true');await page.locator('#main-nav').getByRole('link',{name:'考研升学',exact:true}).click();assert.equal(await page.locator('#mobile-menu').getAttribute('aria-expanded'),'false');
  await page.setViewportSize({width:1440,height:1080});await navigate('home');await page.locator('[data-action="guide"]').first().click();await page.locator('[data-guide="ai"]').click();assert.equal(await page.locator('.path-card').count(),paths.filter(p=>p.category==='ai').length);
  await page.setViewportSize({width:390,height:844});await navigate('interviews?role=agent&company=moonshot');await page.waitForFunction(()=>document.getElementById('sidebar').getBoundingClientRect().right<=0);await page.screenshot({path:artifacts+'interviews-mobile.png',fullPage:true,animations:'disabled'});
  assert.deepEqual(errors,[]);
  console.log('Browser checks passed: navigation, filters, search escaping, progress persistence, pause/resume, bookmarks, exam planning, exports, support drafts, guide, mobile menu career filters, role/company coverage, reviewed progress, sourced experiences, review notes and 55 responsive page checks.');
} finally { await browser.close(); }
