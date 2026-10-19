import { chromium, expect } from '@playwright/test';
let browser;
try { browser = await chromium.launch({channel:'msedge'}); } catch { browser = await chromium.launch({channel:'chrome'}); }
const errors=[];
try {
 const context=await browser.newContext({viewport:{width:1440,height:1050},colorScheme:'dark',reducedMotion:'no-preference'});
 await context.addInitScript(()=>{
   window.networkDraws=0;
   const clear=CanvasRenderingContext2D.prototype.clearRect;
   CanvasRenderingContext2D.prototype.clearRect=function(...args){if(this.canvas.classList.contains('hero-network'))window.networkDraws++;return clear.apply(this,args);};
 });
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4173/#home');
 const hero=page.locator('.hero'),button=page.locator('#motion-toggle');
 await expect(hero).toHaveAttribute('data-motion-state','running');
 await expect(page.locator('.hero-network')).toBeVisible();
 const before=await page.evaluate(()=>window.networkDraws);
 // Initial page/module entrance animations can delay the first few frames.
 await expect.poll(()=>page.evaluate(()=>window.networkDraws),{timeout:2500}).toBeGreaterThan(before+5);
 const text=await page.locator('.terminal-line').textContent();await expect.poll(()=>page.locator('.terminal-line').textContent(),{timeout:2000}).not.toBe(text);
 // Verify the added orbit animation advances, and local energy waves react to a pointer.
 await expect(page.locator('.energy-orbit')).toHaveCount(3);
 const orbit=page.locator('.orbit-one>span');
 const orbitBefore=await orbit.evaluate(el=>getComputedStyle(el).transform);await page.waitForTimeout(160);
 expect(await orbit.evaluate(el=>getComputedStyle(el).transform)).not.toBe(orbitBefore);
 await page.evaluate(()=>{
   window.energyWaves=0;
   const arc=CanvasRenderingContext2D.prototype.arc;
   CanvasRenderingContext2D.prototype.arc=function(x,y,r,...args){if(this.canvas.classList.contains('hero-network')&&r>8&&r<160)window.energyWaves++;return arc.call(this,x,y,r,...args);};
 });
 const box=await hero.boundingBox();
 await page.mouse.click(box.x+box.width*.52,box.y+box.height*.92);
 await page.waitForTimeout(250);expect(await page.evaluate(()=>window.energyWaves)).toBeGreaterThan(0);
 await expect(hero).toBeVisible();expect(new URL(page.url()).hash).toBe('#home');await page.mouse.move(box.x+box.width*.85,box.y+box.height*.2);
 expect(await hero.evaluate(el=>el.style.getPropertyValue('--tilt-y'))).not.toBe('0deg');
 await button.focus();await page.keyboard.press('Space');await expect(hero).toHaveAttribute('data-motion-state','paused');await expect(button).toHaveAttribute('aria-pressed','true');
 await page.waitForTimeout(200);const orbitStopped=await orbit.evaluate(el=>getComputedStyle(el).transform);await page.waitForTimeout(120);expect(await orbit.evaluate(el=>getComputedStyle(el).transform)).toBe(orbitStopped);const stopped=await page.evaluate(()=>window.networkDraws);await page.waitForTimeout(350);expect(await page.evaluate(()=>window.networkDraws)).toBe(stopped);
 const stoppedText=await page.locator('.terminal-line').textContent();await page.waitForTimeout(180);expect(await page.locator('.terminal-line').textContent()).toBe(stoppedText);
 await page.reload();await expect(hero).toHaveAttribute('data-motion-state','paused');
 await button.click();await expect(hero).toHaveAttribute('data-motion-state','running');
 await page.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));await expect(hero).toHaveAttribute('data-motion-state','idle');
 await page.waitForTimeout(150);const idle=await page.evaluate(()=>window.networkDraws);await page.waitForTimeout(350);expect(await page.evaluate(()=>window.networkDraws)).toBe(idle);
 await page.evaluate(()=>scrollTo(0,0));await expect(hero).toHaveAttribute('data-motion-state','running');
 await page.emulateMedia({reducedMotion:'reduce'});await expect(hero).toHaveAttribute('data-motion-state','reduced');await expect(button).toBeDisabled();
 expect(await page.locator('.core-scan').evaluate(el=>getComputedStyle(el).animationName)).toBe('none');
 expect(await orbit.evaluate(el=>getComputedStyle(el).animationName)).toBe('none');
 expect(await page.locator('.compute-core').evaluate(el=>getComputedStyle(el).animationName)).toBe('none');
 await page.waitForTimeout(150);const reduced=await page.evaluate(()=>window.networkDraws);await page.waitForTimeout(350);expect(await page.evaluate(()=>window.networkDraws)).toBe(reduced);
 await page.emulateMedia({reducedMotion:'no-preference'});await expect(hero).toHaveAttribute('data-motion-state','running');
 await page.locator('.hero .btn-primary').click();await expect(page.locator('.hero-network')).toHaveCount(0);
 await page.waitForTimeout(200);const departed=await page.evaluate(()=>window.networkDraws);await page.waitForTimeout(400);expect(await page.evaluate(()=>window.networkDraws)).toBe(departed);
 for(let i=0;i<3;i++){await page.goto('http://127.0.0.1:4173/#home');await expect(hero).toHaveAttribute('data-motion-state','running');await expect(page.locator('.hero-network')).toHaveCount(1);await page.goto('http://127.0.0.1:4173/#resources');}
 for(const mode of ['light','dark']){
   await page.emulateMedia({colorScheme:mode});
   await page.goto('http://127.0.0.1:4173/#home');await expect(page.locator('html')).toHaveAttribute('data-theme',mode);
   for(const width of [320,390,560,768,1024,1440,1920]){
     await page.setViewportSize({width,height:1050});
     await page.waitForTimeout(100);
     expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),mode+' '+width+'px').toBeTruthy();
     const dimensions=await page.locator('.hero-network').evaluate(c=>({width:c.width,cssWidth:c.getBoundingClientRect().width,height:c.height}));expect(dimensions.width).toBeLessThanOrEqual(dimensions.cssWidth*1.5+2);expect(dimensions.height).toBeGreaterThan(0);
   }
 }
 await page.setViewportSize({width:1440,height:1050});await page.goto('http://127.0.0.1:4173/#home');await expect(hero).toHaveAttribute('data-motion-state','running');
 const start=await page.evaluate(()=>window.networkDraws);await page.waitForTimeout(1000);const draws=(await page.evaluate(()=>window.networkDraws))-start;expect(draws).toBeLessThanOrEqual(27);expect(draws).toBeGreaterThan(5);
 const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,colorScheme:'dark'});mobile.on('pageerror',e=>errors.push(e.message));await mobile.goto('http://127.0.0.1:4173/#home');await expect(mobile.locator('.hero')).toHaveAttribute('data-motion-state','running');await mobile.locator('#motion-toggle').tap();await expect(mobile.locator('.hero')).toHaveAttribute('data-motion-state','paused');await mobile.locator('#motion-toggle').tap();await expect(mobile.locator('.hero')).toHaveAttribute('data-motion-state','running');await mobile.screenshot({path:'artifacts/dynamic-home-mobile-verified.png',animations:'disabled'});
 expect(errors).toEqual([]);
 console.log('Motion checks passed: live Canvas and terminal, moving energy orbits, click ripples, pointer parallax, keyboard/touch pause, saved preference, offscreen suspension, reduced motion, render cleanup, 14 responsive theme/width checks, capped rendering ('+draws+' draws/s), DPR cap and no JavaScript errors.');
} finally {await browser.close();}
