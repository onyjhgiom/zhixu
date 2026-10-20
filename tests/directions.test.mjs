import test from 'node:test';
import assert from 'node:assert/strict';
import { paths, categories, resources } from '../data.js';
import { projects } from '../project-data.js';
import { rolePrep } from '../career-data.js';

const addedIds = ['nlp', 'recsys', 'mobile', 'game', 'graphics', 'mlops', 'network', 'robotics', 'compiler', 'blockchain'];
test('additional directions retain their domain curriculum and connect learning, interviews and projects', () => {
  const categoryIds = new Set(categories.map(x => x.id));
  for (const id of addedIds) {
    const p = paths.find(x => x.id === id);
    assert.ok(p, id);assert.ok(categoryIds.has(p.category));
    assert.equal(p.stages.length, 5);
    assert.equal(p.curriculum.theory.length, 4);
    assert.equal(p.curriculum.practice.length, 4);
    for (const t of p.curriculum.theory) assert.ok(t.title && t.text.length > 65, id + ': theory');
    for (const lab of p.curriculum.practice) {
      assert.equal(lab.steps.length, 3);
      assert.ok(lab.steps.every(s => s.length > 18));assert.ok(lab.output.length > 10);
    }
    assert.equal(p.curriculum.practice[0].title, p.stages[0][0]);
    assert.equal(p.curriculum.project, p.stages[4][1]);
    assert.ok(p.curriculum.pitfalls.length > 35);
    assert.ok(resources.filter(r => r.paths.includes(id) && r.lang === '中文').length >= 5);
    assert.ok(projects.filter(x => x.roles[0] === id).length >= 2);
    const prep = rolePrep.find(x => x.id === id);
    assert.equal(prep.questions.filter(q => q.type === 'written').length, 2);
    assert.equal(prep.questions.filter(q => q.type === 'technical').length, 1);
    assert.equal(prep.questions.filter(q => q.type === 'project').length, 1);
    assert.ok(prep.questions.every(q => !q.title.includes('核心概念与边界题')), 'generic fallback replaced specific questions');
  }
});
