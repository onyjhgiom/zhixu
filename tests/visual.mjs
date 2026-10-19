import { chromium, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const artifacts=fileURLToPath(new URL('../artifacts/',import.meta.url));
await mkdir(artifacts,{recursive:true});
let browser;
try{browser=await chromium.launch({channel:'msedge'});}catch{browser=await chromium.launch({channel:'chrome'});}
try{
 const page=await browser.newPage({viewport:{width:1440,height:1050},colorScheme:'dark',reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto('http://127.0.0.1:4173/#home');
 await expect(page.locator('.compute-core')).toBeVisible();
 expect(await page.evaluate(()=>getComputedStyle(document.body).backgroundColor)).toBe('rgb(9, 11, 21)');
 expect(await page.locator('.circuit-wire').first().evaluate(el=>getComputedStyle(el).animationName)).toBe('none');
 expect(await page.locator('.hero h2 em').evaluate(el=>getComputedStyle(el).backgroundImage)).toContain('linear-gradient');
 await expect(page.locator('.hero .btn-primary')).toHaveAttribute('href','#tech');
 await expect(page.locator('.hero .btn-secondary')).toHaveAttribute('href','#exam');
 for(const width of [320,390,560,768,1024,1440,1920]){
  await page.setViewportSize({width,height:1050});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),String(width)+'px homepage').toBeTruthy();
  const boxes=await page.locator('.hero h2,.compute-art,.hero-actions').evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return {left:r.left,right:r.right,width:r.width};}));
  expect(boxes.every(r=>r.left>=0&&r.right<=width&&r.width>0),String(width)+'px hero contents').toBeTruthy();
 }
 for(const [route,name] of [['home','home'],['tech','tech'],['resources','resources'],['interviews?role=agent&company=moonshot','interviews'],['exam','exam'],['support','support']]){
  await page.goto('http://127.0.0.1:4173/#'+route);
  await page.waitForFunction(route=>document.body.dataset.page===route,route.split('?')[0]);
  for(const [width,device] of [[1440,'desktop'],[390,'mobile']]){
   await page.setViewportSize({width,height:device==='mobile'?844:1050});
   await page.evaluate(()=>{document.activeElement?.blur();scrollTo(0,0);});
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),route+' '+device).toBeTruthy();
   await page.screenshot({path:artifacts+'technology-'+name+'-'+device+'.png',animations:'disabled'});
  }
 }
 await page.setViewportSize({width:1440,height:1050});
 await page.goto('http://127.0.0.1:4173/#tech');
 await page.locator('.card-open[data-path="agent"]').click();
 await expect(page.locator('#detail-dialog')).toBeVisible();
 await page.screenshot({path:artifacts+'technology-route-dialog.png',animations:'disabled'});
 await page.keyboard.press('Escape');await expect(page.locator('#detail-dialog')).not.toBeVisible();
 await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('http://127.0.0.1:4173/#home');
 expect(await page.locator('.circuit-wire').first().evaluate(el=>getComputedStyle(el).animationName)).toBe('circuit-flow');
 expect(errors).toEqual([]);
 console.log('Visual checks passed: dark theme, gradient headline, 7 homepage widths, 12 page/device captures, modal, motion preference and no JavaScript errors.');
}finally{await browser.close();}
