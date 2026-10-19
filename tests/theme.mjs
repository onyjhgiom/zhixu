import { chromium, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const origin='http://127.0.0.1:4173/';
const artifacts=fileURLToPath(new URL('../artifacts/',import.meta.url));
await mkdir(artifacts,{recursive:true});
let browser;
try{browser=await chromium.launch({channel:'msedge'});}catch{browser=await chromium.launch({channel:'chrome'});}
const contexts=[];
const errors=[];
async function context(options={}){const c=await browser.newContext({viewport:{width:1440,height:1050},colorScheme:'dark',reducedMotion:'reduce',...options});contexts.push(c);c.on('page',p=>p.on('pageerror',e=>errors.push(e.message)));return c;}
async function theme(page,value){await expect(page.locator('html')).toHaveAttribute('data-theme',value);await expect(page.locator('#theme-toggle')).toHaveAttribute('aria-pressed',String(value==='dark'));await expect(page.locator('#theme-toggle')).toHaveAccessibleName(value==='dark'?'切换到浅色模式':'切换到深色模式');}
async function navigate(page,route){await page.goto(origin+'#'+route);await page.waitForFunction(v=>document.body.dataset.page===v,route.split('?')[0]);}
try{
 const c=await context();const page=await c.newPage();
 await navigate(page,'home');await theme(page,'dark');
 await page.emulateMedia({colorScheme:'light'});await theme(page,'light');
 await page.emulateMedia({colorScheme:'dark'});await theme(page,'dark');
 await page.locator('#theme-toggle').focus();await page.keyboard.press('Space');await theme(page,'light');
 expect(await page.evaluate(()=>localStorage.getItem('zhixu-theme-v1'))).toBe('light');
 await page.reload();await theme(page,'light');
 expect(await page.locator('meta[name="theme-color"]').getAttribute('content')).toBe('#f2f4fc');
 await page.emulateMedia({colorScheme:'light'});await page.emulateMedia({colorScheme:'dark'});await theme(page,'light');
 const tab=await c.newPage();await navigate(tab,'resources');await theme(tab,'light');
 await page.locator('#theme-toggle').click();await theme(page,'dark');await theme(tab,'dark');
 await tab.evaluate(()=>localStorage.removeItem('zhixu-theme-v1'));await theme(page,'dark');
 await page.emulateMedia({colorScheme:'light'});await theme(page,'light');
 await page.locator('#theme-toggle').focus();await page.keyboard.press('Enter');await theme(page,'dark');
 await navigate(page,'resources');await page.locator('#resource-path').selectOption('agent');await page.locator('#resource-language').selectOption('中文');
 const count=await page.locator('#content .resource-row').count();
 const before=await page.evaluate(()=>({...localStorage}));
 await page.locator('#theme-toggle').click();await theme(page,'light');
 expect(await page.locator('#resource-path').inputValue()).toBe('agent');expect(await page.locator('#resource-language').inputValue()).toBe('中文');expect(await page.locator('#content .resource-row').count()).toBe(count);
 const after=await page.evaluate(()=>({...localStorage}));delete before['zhixu-theme-v1'];delete after['zhixu-theme-v1'];expect(after).toEqual(before);
 await navigate(page,'exam');await page.locator('[name="weeks"]').fill('19');await page.locator('[name="hours"]').fill('4.5');await page.locator('#theme-toggle').click();expect(await page.locator('[name="weeks"]').inputValue()).toBe('19');expect(await page.locator('[name="hours"]').inputValue()).toBe('4.5');
 const states=[['home','home'],['tech','tech'],['roadmaps','roadmaps'],['resources','resources'],['interviews','interviews'],['interviews?role=agent&company=moonshot&tab=experience','experience'],['interviews?role=backend&company=bytedance&tab=strategy','strategy'],['exam','exam'],['support','support'],['learning','learning'],['saved','saved']];
 let responsiveChecks=0;
 for(const mode of ['dark','light']){
  if(await page.locator('html').getAttribute('data-theme')!==mode)await page.locator('#theme-toggle').click();
  for(const [route,name] of states){
   await navigate(page,route);await theme(page,mode);
   for(const width of [320,390,768,1024,1440,1920]){
    await page.setViewportSize({width,height:width<760?844:1050});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),mode+' '+route+' '+width+'px').toBeTruthy();
    const toggle=await page.locator('#theme-toggle').boundingBox();expect(toggle.x>=0&&toggle.x+toggle.width<=width).toBeTruthy();responsiveChecks++;
    if([390,1440].includes(width)&&['home','resources','interviews','exam'].includes(name))await page.screenshot({path:artifacts+'cyber-'+mode+'-'+name+'-'+width+'.png',animations:'disabled'});
   }
  }
  await page.setViewportSize({width:1440,height:1050});await navigate(page,'tech');await page.locator('.card-open[data-path="agent"]').click();await expect(page.locator('#detail-dialog')).toBeVisible();await page.screenshot({path:artifacts+'cyber-'+mode+'-dialog.png',animations:'disabled'});await page.keyboard.press('Escape');
 }
 const lightContext=await context({colorScheme:'light'});const lightPage=await lightContext.newPage();await navigate(lightPage,'home');await theme(lightPage,'light');
 // Saved preference is applied by the head bootstrap, even before app.js is available.
 const early=await context({colorScheme:'light'});await early.addInitScript(()=>{if(location.protocol==='http:')localStorage.setItem('zhixu-theme-v1','dark');});const boot=await early.newPage();await boot.route('**/app.js',route=>route.fulfill({contentType:'text/javascript',body:'/* Deliberately unavailable application module. */'}));await boot.goto(origin);await expect(boot.locator('html')).toHaveAttribute('data-theme','dark');expect(await boot.evaluate(()=>getComputedStyle(document.body).backgroundColor)).toBe('rgb(9, 11, 21)');
 const blocked=await context();await blocked.addInitScript(()=>{const original=Storage.prototype.setItem;Storage.prototype.setItem=function(key,value){if(key==='zhixu-theme-v1')throw new DOMException('Storage blocked','SecurityError');return original.call(this,key,value);};});const blockedPage=await blocked.newPage();await navigate(blockedPage,'home');await blockedPage.locator('#theme-toggle').click();await theme(blockedPage,'light');await expect(blockedPage.locator('#toast')).toContainText('浏览器限制存储');
 expect(errors).toEqual([]);
 console.log('Theme checks passed: '+responsiveChecks+' responsive states across both themes, system preference, keyboard control, persistence, reload, cross-tab sync, pre-paint bootstrap, blocked storage, preserved filters/forms/learning data, dialogs and no JavaScript errors.');
}finally{for(const c of contexts)await c.close();await browser.close();}
