import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';
const directory=fileURLToPath(new URL('../artifacts/',import.meta.url));
let browser;
try{browser=await chromium.launch({channel:'msedge'});}catch{browser=await chromium.launch({channel:'chrome'});}
try{
 const page=await browser.newPage({viewport:{width:1440,height:1020}});
 await page.goto('http://127.0.0.1:4173/');await page.locator('.hero h2').waitFor();
 await page.screenshot({path:directory+'home-preview.png'});
 await page.screenshot({path:directory+'home-desktop.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});
 await page.waitForFunction(()=>document.getElementById('sidebar').getBoundingClientRect().right<=0);await page.screenshot({path:directory+'home-mobile.png',fullPage:true,animations:'disabled'});
 await page.setViewportSize({width:1440,height:1080});await page.goto('http://127.0.0.1:4173/#interviews?role=agent&company=moonshot');await page.locator('.question-card').first().waitFor();await page.locator('.question-card details').first().evaluate(el=>el.open=true);await page.evaluate(()=>{document.activeElement?.blur();window.scrollTo(0,0);});await page.screenshot({path:directory+'interviews-preview.png'});await page.screenshot({path:directory+'interviews-desktop.png',fullPage:true});
 await page.goto('http://127.0.0.1:4173/#interviews?role=agent&company=moonshot&tab=experience');await page.locator('.curated-experience').waitFor();await page.evaluate(()=>{document.activeElement?.blur();window.scrollTo(0,0);});await page.screenshot({path:directory+'interviews-experience.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4173/#interviews?role=agent&company=moonshot');await page.waitForFunction(()=>document.getElementById('sidebar').getBoundingClientRect().right<=0);await page.screenshot({path:directory+'interviews-mobile.png',fullPage:true,animations:'disabled'});
 await page.setViewportSize({width:1440,height:1080});await page.goto('http://127.0.0.1:4173/#resources');await page.locator('#resource-path').selectOption('posttrain');await page.getByRole('button',{name:'只看中文资料',exact:true}).click();await page.evaluate(()=>{document.activeElement?.blur();window.scrollTo(0,0);});await page.screenshot({path:directory+'resources-chinese-preview.png'});await page.screenshot({path:directory+'resources-chinese-desktop.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});await page.waitForFunction(()=>document.getElementById('sidebar').getBoundingClientRect().right<=0);await page.screenshot({path:directory+'resources-chinese-mobile.png',fullPage:true,animations:'disabled'});
 console.log('Clean desktop and mobile previews saved, including career practice and experience pages.');
}finally{await browser.close();}
