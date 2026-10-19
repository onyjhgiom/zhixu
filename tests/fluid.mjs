import {chromium, expect} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
await mkdir('artifacts',{recursive:true});
let browser;
try {browser=await chromium.launch({channel:'msedge'});} catch {browser=await chromium.launch({channel:'chrome'});}
const errors=[];
try {
 const context=await browser.newContext({viewport:{width:1440,height:1000},colorScheme:'dark'});
 await context.addInitScript(()=>{
  window.fluidDraws=0;
  const clear=CanvasRenderingContext2D.prototype.clearRect;
  CanvasRenderingContext2D.prototype.clearRect=function(...args){if(this.canvas.id==='fluid-atmosphere')window.fluidDraws++;return clear.apply(this,args);};
 });
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 const root=page.locator('html'), toggle=page.locator('#fluid-motion-toggle');
 async function route(hash){
  await page.evaluate(hash=>{location.hash=hash;scrollTo(0,0);},hash);
  await expect(page.locator('#content')).toHaveAttribute('data-fluid-route','#'+hash);
  await expect(page.locator('.fluid-module').first()).toBeVisible();
 }
 async function frozen(){await page.waitForTimeout(120);const count=await page.evaluate(()=>window.fluidDraws);await page.waitForTimeout(260);expect(await page.evaluate(()=>window.fluidDraws)).toBe(count);}
 await page.goto('http://127.0.0.1:4173/#resources');
 await expect(root).toHaveAttribute('data-fluid-state','running');
 await expect.poll(()=>page.evaluate(()=>window.fluidDraws)).toBeGreaterThan(3);
 const last=page.locator('.resource-row').last();expect(await last.getAttribute('data-fluid-revealed')).toBeNull();await last.scrollIntoViewIfNeeded();await expect(last).toHaveAttribute('data-fluid-revealed','true');
 await page.evaluate(()=>scrollTo(0,0));const first=page.locator('.resource-row').first();await first.hover();
 await expect.poll(()=>first.evaluate(el=>el.style.getPropertyValue('--surface-x'))).not.toBe('');
 await first.evaluate((el)=>{const target=el.querySelector('a');const rect=target.getBoundingClientRect();target.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,button:0,clientX:rect.left+4,clientY:rect.top+4}));});
 await expect(page.locator('.fluid-droplet')).toHaveCount(1);await expect(page.locator('.fluid-droplet-clip')).toHaveCount(0,{timeout:2000});
 const routes=['home','tech','roadmaps','resources','interviews','interviews?role=backend&company=bytedance&tab=experience','interviews?role=product&company=minimax&tab=strategy','exam','support','learning','saved','search?q=Agent'];
 for(const hash of routes){
  await route(hash);await page.waitForTimeout(170);
  await expect(page.locator('#fluid-atmosphere')).toHaveCount(1);await expect(toggle).toHaveCount(1);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),hash+' animated overflow').toBeTruthy();
  expect(await page.locator('.fluid-surface').evaluateAll(els=>els.every(el=>el.querySelectorAll(':scope > .fluid-surface-light').length===1))).toBeTruthy();
  expect(await page.locator('.sidebar').evaluate(el=>getComputedStyle(el).position)).toBe('fixed');
 }
 await route('interviews');await page.locator('.question-card summary').first().click();await expect(page.locator('.question-answer').first()).toBeVisible();
 await route('tech');await page.locator('[data-path="agent"].card-open').click();
 await expect(page.locator('#detail-dialog .stage-item.fluid-surface')).toHaveCount(5);
 await page.getByRole('button',{name:'加入我的学习',exact:true}).click();
 await expect(page.locator('#detail-dialog .stage-item.fluid-surface')).toHaveCount(5);
 await page.locator('#stage-0').check();await expect(page.locator('#stage-0')).toBeChecked();await page.keyboard.press('Escape');
 await route('resources');await toggle.focus();await page.keyboard.press('Space');await expect(root).toHaveAttribute('data-fluid-state','paused');await frozen();
 await page.reload();await expect(root).toHaveAttribute('data-fluid-state','paused');await frozen();
 await route('home');await expect(page.locator('.hero')).toHaveAttribute('data-motion-state','paused');
 await page.locator('#motion-toggle').click();await expect(root).toHaveAttribute('data-fluid-state','running');await expect(toggle).toHaveAttribute('aria-pressed','false');
 await toggle.click();await expect(page.locator('.hero')).toHaveAttribute('data-motion-state','paused');await toggle.click();
 const sibling=await context.newPage();await sibling.goto('http://127.0.0.1:4173/#resources');
 await sibling.locator('#fluid-motion-toggle').click();await expect(root).toHaveAttribute('data-fluid-state','paused');await expect(page.locator('.hero')).toHaveAttribute('data-motion-state','paused');
 await sibling.locator('#fluid-motion-toggle').click();await expect(root).toHaveAttribute('data-fluid-state','running');await sibling.close();
 await page.emulateMedia({reducedMotion:'reduce'});await expect(root).toHaveAttribute('data-fluid-state','reduced');await expect(toggle).toBeDisabled();await frozen();
 await route('tech');await expect(page.locator('.path-card').first()).toBeVisible();expect(await page.locator('.fluid-surface-light').first().evaluate(el=>getComputedStyle(el,':before').animationName)).toBe('none');
 await page.emulateMedia({reducedMotion:'no-preference'});await expect(root).toHaveAttribute('data-fluid-state','running');
 for(const theme of ['light','dark']){
  await page.emulateMedia({colorScheme:theme});await expect(root).toHaveAttribute('data-theme',theme);
  for(const width of [320,390,768,1440]){
   await page.setViewportSize({width,height:900});
   for(const hash of ['resources','interviews?role=agent&company=moonshot','exam','support']){
    await route(hash);await page.waitForTimeout(60);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),theme+' '+width+' '+hash).toBeTruthy();
   }
   const box=await toggle.boundingBox();expect(box.x+box.width).toBeLessThanOrEqual(width);
  }
 }
 await page.setViewportSize({width:1440,height:1000});await route('resources');await page.waitForTimeout(1000);
 const count=await page.evaluate(()=>window.fluidDraws);await page.waitForTimeout(1000);const draws=(await page.evaluate(()=>window.fluidDraws))-count;expect(draws).toBeGreaterThan(5);expect(draws).toBeLessThanOrEqual(26);
 await page.screenshot({path:'artifacts/fluid-resources-verified.png'});
 await route('interviews?role=agent&company=moonshot');await page.waitForTimeout(1000);await page.screenshot({path:'artifacts/fluid-interviews-verified.png'});
 await page.emulateMedia({colorScheme:'light'});await route('exam');await page.waitForTimeout(1000);await page.screenshot({path:'artifacts/fluid-exam-light-verified.png'});
 const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,colorScheme:'dark'});mobile.on('pageerror',e=>errors.push(e.message));
 await mobile.goto('http://127.0.0.1:4173/#resources');await mobile.locator('#fluid-motion-toggle').tap();await expect(mobile.locator('html')).toHaveAttribute('data-fluid-state','paused');await mobile.locator('#fluid-motion-toggle').tap();await expect(mobile.locator('html')).toHaveAttribute('data-fluid-state','running');await mobile.waitForTimeout(1000);await mobile.screenshot({path:'artifacts/fluid-mobile-verified.png'});
 expect(errors).toEqual([]);
 console.log('Fluid checks passed: 12 route states, single persistent canvas, 32 animated responsive theme combinations, visible-only reveals, spotlight and ripple cleanup, dynamic dialog modules, question expansion, progress controls, shared keyboard/touch pause, persisted preference and cross-tab sync, reduced motion, capped rendering ('+draws+' draws/s), no overflow and no JavaScript errors.');
} finally {await browser.close();}
