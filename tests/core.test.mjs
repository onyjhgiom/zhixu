import test from 'node:test';
import assert from 'node:assert/strict';
import { buildExamPlan, sanitizeState, progressFor, escapeHtml, matchesQuery } from '../core.js';
import { paths, resources, examTopics } from '../data.js';

test('all published routes have tasks and resource references resolve',()=>{
  const ids=new Set(paths.map(p=>p.id));
  assert.equal(ids.size,paths.length);
  assert.equal(new Set(resources.map(r=>r.id)).size,resources.length);
  for(const p of paths){assert.ok(p.stages.length>=4);assert.ok(resources.some(r=>r.paths.includes(p.id)));}
  for(const r of resources){assert.equal(new URL(r.url).protocol,'https:');for(const id of r.paths)assert.ok(ids.has(id));}
});
test('exam plan covers every week without gaps or zero-length phases',()=>{
  for(let weeks=4;weeks<=52;weeks++)for(let hours=1;hours<=12;hours+=.5){
    const p=buildExamPlan({weeks,hours,subject:'408'});
    assert.equal(p.phases.reduce((n,x)=>n+x.weeks,0),weeks);
    assert.ok(p.phases.every(x=>x.weeks>=1));
    assert.ok(Math.abs(p.daily.reduce((n,x)=>n+x.hours,0)-hours)<1e-8);
    assert.ok(p.daily.every(x=>x.hours>=0));
  }
});
test('exam plan rejects invalid inputs and distinguishes custom subjects',()=>{
  for(const bad of [{weeks:0,hours:4,subject:'408'},{weeks:24.5,hours:4,subject:'408'},{weeks:24,hours:NaN,subject:'408'},{weeks:24,hours:4,subject:'bad'}])assert.throws(()=>buildExamPlan(bad));
  assert.match(buildExamPlan({weeks:12,hours:3,subject:'custom'}).daily[0].name,/自命题/);
});
test('persisted data drops unknown IDs and corrupt steps while preserving valid progress',()=>{
  const all=[...paths,...examTopics],ids=new Set(all.map(p=>p.id)),counts=Object.fromEntries(all.map(p=>[p.id,p.stages.length]));
  const clean=sanitizeState({joined:['agent','agent','made-up',null],saved:['python','wrong'],done:{agent:[0,0,2,-1,100,'1'],wrong:[0]},plan:{weeks:0,hours:2,subject:'408'},drafts:[null,{service:'wrong',goal:'a',text:'b'}]},ids,counts,new Set(resources.map(r=>r.id)));
  assert.deepEqual(clean.joined,['agent']);assert.deepEqual(clean.saved,['python']);assert.deepEqual(clean.done.agent,[0,2]);assert.equal(clean.plan,null);assert.deepEqual(clean.drafts,[]);
  for(const value of [null,[],5,'broken'])assert.doesNotThrow(()=>sanitizeState(value,ids,counts,new Set()));
});
test('progress ignores duplicate and out of range indexes',()=>{
  assert.deepEqual(progressFor(paths[0],{done:{agent:[0,0,1,100]}}),{count:2,total:5,percent:40});
});
test('search supports case insensitive multi-term queries and Chinese',()=>{
  assert.equal(matchesQuery(paths[0],'AGENT 工具'),true);
  assert.equal(matchesQuery(paths[0],'不存在的词'),false);
  assert.equal(matchesQuery(paths.find(p=>p.id==='ml'),'机器学习'),true);
});
test('user supplied content escapes markup',()=>{
  assert.equal(escapeHtml('<img src=x onerror="1">'), '&lt;img src=x onerror=&quot;1&quot;&gt;');
});
