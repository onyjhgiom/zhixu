import test from 'node:test';
import assert from 'node:assert/strict';
import { createResumeState, sanitizeResumeState, extractResumeKeywords, analyzeResume, buildResumeDocument, getResumeValidation } from '../resume-core.js';
import { RESUME_TEMPLATES } from '../resume-templates.js';

function candidate() {
  const state = createResumeState('game');
  state.basics = { ...state.basics, name: '林知远', email: 'lin@example.com' };
  state.education = [{ school: '示例大学', degree: '本科', major: '计算机科学', start: '2021.09', end: '2025.06', details: '专业排名 10/120' }];
  state.experience = [{ company: '示例工作室', title: '开发实习生', details: '维护运营后台。使用 Unity 与 C# 实现对象池，内存峰值降低 18%。参与需求评审。' }];
  state.projects = [{ name: '双人联机游戏', role: '客户端开发', details: '负责 UI 页面。使用 Unity 实现网络同步，支持 2 名玩家联机。' }];
  state.skills = 'Unity、C#、Git、TypeScript';
  state.target = { ...state.target, roleTitle: '游戏客户端工程师', jd: '必须熟练使用 Unity、C#，具备网络同步能力；了解 Unreal 优先。', hc: '负责网络同步与内存优化。' };
  return state;
}

test('template selection survives document generation and restoration while preserving edits', () => {
  assert.equal(createResumeState().useAI, false);
  assert.equal(new Set(RESUME_TEMPLATES.map(item => item.palette.background)).size, RESUME_TEMPLATES.length);
  for (const template of RESUME_TEMPLATES) {
    const state = candidate(); state.templateId = template.id;
    state.document = buildResumeDocument(state);
    state.document.name = '在线编辑姓名'; state.documentEdited = true;
    const restored = sanitizeResumeState(JSON.parse(JSON.stringify(state)));
    assert.equal(restored.templateId, template.id);
    assert.equal(restored.document.templateId, template.id);
    assert.equal(restored.document.name, '在线编辑姓名');
    assert.equal(restored.documentEdited, true);
  }
  assert.equal(sanitizeResumeState({ templateId: '__proto__' }).templateId, 'folio');
});

test('JD and HC weighting handles aliases and technology boundaries', () => {
  const words = extractResumeKeywords('TypeScript JavaScript 算法 Golang C++，熟练 Unity，了解 Unreal 优先', '负责 Unity 与 K8s，Prisma');
  assert.ok(!words.some(word => word.keyword === 'Java'));
  assert.ok(words.some(word => word.keyword === 'Go'));
  assert.ok(words.some(word => word.keyword === 'Kubernetes'));
  assert.ok(words.some(word => word.keyword === 'Prisma'));
  assert.ok(words.find(word => word.keyword === 'Unity').weight > words.find(word => word.keyword === 'Unreal Engine').weight);
  assert.deepEqual(words.find(word => word.keyword === 'Unity').sources, ['JD', 'HC']);
});

test('matching excludes job descriptions, generated documents and explicit negative evidence', () => {
  const state = candidate();
  state.skills += '，未掌握 Redis';
  state.target.jd += ' Redis、Java';
  state.document = { name: 'Java', sections: [] };
  const analysis = analyzeResume(state);
  assert.ok(analysis.matchedKeywords.some(word => word.keyword === 'Unity'));
  assert.ok(analysis.missingKeywords.some(word => word.keyword === 'Redis'));
  assert.ok(analysis.missingKeywords.some(word => word.keyword === 'Java'));
  assert.ok(analysis.missingKeywords.some(word => word.keyword === 'Unreal Engine'));
  assert.ok(analysis.score > 0 && analysis.score < 100);
  assert.equal(analyzeResume(createResumeState()).score, null);
});

test('optimization prioritizes relevant modules and bullets without adding facts', () => {
  const state = candidate(), plain = buildResumeDocument(state, { optimize: false }), optimized = buildResumeDocument(state);
  assert.equal(plain.sections[0].id, 'education');
  assert.notEqual(optimized.sections[0].id, 'education');
  assert.match(optimized.sections.find(section => section.id === 'experience').items[0].bullets[0].text, /Unity/);
  const facts = doc => doc.sections.flatMap(section => section.items.flatMap(item => item.bullets.map(bullet => bullet.text))).sort();
  assert.deepEqual(facts(plain), facts(optimized));
  assert.ok(optimized.keywords.includes('Unity'));
  assert.ok(!optimized.keywords.includes('Unreal Engine'));
  assert.deepEqual(plain.keywords, []);
});

test('campus and experienced ordering works without JD and optional empty modules are omitted', () => {
  const state = candidate(); state.target.jd = ''; state.target.hc = '';
  assert.equal(buildResumeDocument(state).sections[0].id, 'education');
  state.target.mode = 'social';
  assert.equal(buildResumeDocument(state).sections[0].id, 'experience');
  assert.ok(!buildResumeDocument(state).sections.some(section => section.id === 'certificates'));
  state.projects.push({ id: 'empty' });
  assert.equal(buildResumeDocument(state).sections.find(section => section.id === 'projects').items.length, 1);
});

test('validation checks skipped steps, contact format and reversed dates', () => {
  assert.equal(getResumeValidation(createResumeState(), 0).valid, false);
  const state = candidate();
  state.basics.email = 'invalid'; assert.equal(getResumeValidation(state, 0).valid, false);
  state.basics.email = 'lin@example.com'; state.education[0].end = '2020.01';
  assert.equal(getResumeValidation(state, 1).valid, false);
  assert.throws(() => buildResumeDocument(state));
  state.education[0].end = '至今'; state.projects[0].name = '';
  assert.equal(getResumeValidation(state, 2).valid, false);
});

test('draft restoration retains online edits and drops malformed or excessive persisted content', () => {
  const state = candidate(); state.document = buildResumeDocument(state); state.document.sections[0].items[0].bullets[0].text = '在线编辑后的真实成果'; state.documentEdited = true;
  const restored = sanitizeResumeState(JSON.parse(JSON.stringify(state)));
  assert.equal(restored.document.sections[0].items[0].bullets[0].text, '在线编辑后的真实成果');
  assert.equal(restored.documentEdited, true);
  for (const raw of [null, 5, [], 'bad', { photo: 'https://evil.test/photo', step: 999, basics: null }, { document: { sections: [null, { id: '__proto__' }] }, projects: [null], updatedAt: 'invalid' }]) assert.doesNotThrow(() => sanitizeResumeState(raw));
  assert.equal(sanitizeResumeState({ photo: 'data:image/svg+xml;base64,xxx' }).photo, '');
  assert.equal(sanitizeResumeState({ basics: { name: 'a'.repeat(200) }, projects: Array(200).fill(null) }).basics.name.length, 60);
  assert.equal(sanitizeResumeState({ projects: Array(200).fill(null) }).projects.length, 20);
});

test('many short skill entries survive refresh and export sanitation', () => {
  const state = candidate(); state.skills = Array.from({ length: 100 }, (_, index) => `技能${index}`).join('、');
  state.document = buildResumeDocument(state);
  const restored = sanitizeResumeState(JSON.parse(JSON.stringify(state)));
  assert.equal(restored.document.sections.find(section => section.id === 'skills').items[0].bullets.length, 100);
});
