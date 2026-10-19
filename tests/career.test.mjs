import test from 'node:test';
import assert from 'node:assert/strict';
import {paths,resources} from '../data.js';
import {companies,rolePrep,questions,experiences,experienceUrl} from '../career-data.js';
import {sanitizeCareerState} from '../core.js';
test('every learning direction has substantial resources and both written and interview preparation',()=>{
 const roles=new Set(paths.map(p=>p.id));
 assert.equal(rolePrep.length,roles.size);assert.equal(new Set(questions.map(q=>q.id)).size,questions.length);
 for(const p of paths){assert.ok(resources.filter(r=>r.paths.includes(p.id)).length>=5,p.id);assert.ok(resources.filter(r=>r.paths.includes(p.id)&&r.lang==='中文').length>=5,`${p.id} needs at least five Chinese resources`);const prep=rolePrep.find(x=>x.id===p.id);assert.ok(prep);assert.ok(prep.questions.some(q=>q.type==='written'));assert.ok(prep.questions.some(q=>q.type==='technical'));assert.ok(prep.questions.some(q=>q.type==='project'));for(const q of prep.questions){assert.equal(q.role,p.id);assert.ok(q.answer.length>=3);assert.ok(q.pitfall);}}
 for(const r of resources){assert.ok(['入门','进阶','高阶'].includes(r.level));assert.ok(r.use);}
});
test('company and experience references resolve without pretending that editorial exercises are company questions',()=>{
 const companyIds=new Set(companies.map(c=>c.id)),roleIds=new Set(paths.map(p=>p.id));
 assert.equal(companyIds.size,5);
 for(const c of companies){assert.equal(new URL(c.url).protocol,'https:');assert.ok(experiences.some(x=>x.company===c.id));for(const p of paths){const url=new URL(experienceUrl(c,p));assert.equal(url.hostname,'www.nowcoder.com');assert.ok(url.searchParams.get('query').includes(p.title));}}
 for(const x of experiences){assert.ok(companyIds.has(x.company));for(const id of x.roles)assert.ok(roleIds.has(id));assert.equal(new URL(x.url).hostname,'www.nowcoder.com');assert.ok(x.date);}
 for(const q of questions)assert.equal(q.origin,'站内原创练习');
});
test('career state rejects invalid question ids and isolates notes by role and company',()=>{
 const qs=new Set(questions.map(q=>q.id)),roles=paths.map(p=>p.id),cs=companies.map(c=>c.id);
 const clean=sanitizeCareerState({reviewed:['agent-1','agent-1','fake',{},null],notes:{'agent@moonshot':{text:'x'.repeat(5000),date:'2026-10-16'},'backend@all':{text:'有效的通用复盘'},'bad@moonshot':{text:'丢弃'},'agent@fake':{text:'丢弃'},'agent@tencent':{text:4}}},qs,roles,cs);
 assert.deepEqual(clean.reviewed,['agent-1']);assert.equal(clean.notes['agent@moonshot'].text.length,4000);assert.equal(clean.notes['backend@all'].text,'有效的通用复盘');assert.equal(Object.keys(clean.notes).length,2);
 for(const raw of [null,[],true,'bad',{}])assert.doesNotThrow(()=>sanitizeCareerState(raw,qs,roles,cs));
});
