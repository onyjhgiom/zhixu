import test from 'node:test';
import assert from 'node:assert/strict';
import { paths, resources } from '../data.js';
import { companies, questions, experienceUrl } from '../career-data.js';
import { professionalDirections, professionalRoles } from '../professional-data.js';
import { assessmentQuestions, sanitizeGrowthState, buildLearningPlan } from '../growth-core.js';
import { sanitizeState, sanitizeCareerState, progressFor } from '../core.js';
import { projects } from '../project-data.js';

test('embodied and driving paths cover their distinct software roles and connect to all catalogues', () => {
  assert.equal(paths.find(path => path.id === 'robotics').title, '具身智能');
  assert.equal(paths.find(path => path.id === 'driving').title, '智能驾驶');
  assert.ok(!paths.some(path => path.title === '机器人与自动驾驶'));
  for (const [id, pathId] of [['embodied', 'robotics'], ['driving', 'driving']]) {
    const direction = professionalDirections.find(item => item.id === id);
    assert.deepEqual(direction.pathIds, [pathId]);
    assert.ok(professionalRoles.filter(role => role.directionId === id).length >= 8);
    assert.equal(assessmentQuestions.filter(item => item.directionId === id).length, 3);
    assert.ok(resources.filter(item => item.paths.includes(pathId)).length >= 5);
    assert.ok(projects.filter(item => item.roles.includes(pathId)).length >= 2);
    const role = professionalRoles.find(item => item.directionId === id);
    for (const mode of ['campus', 'social']) {
      const plan = buildLearningPlan({ roleId: role.id, mode, hoursPerWeek: 8, startDate: '2026-10-22' }, sanitizeGrowthState({}));
      assert.ok(plan.tasks.some(task => task.kind === 'project'));
      assert.ok(plan.tasks.some(task => task.kind === 'interview'));
    }
  }
  const testing = professionalRoles.find(role => role.id === 'vehicle-algorithm-test-engineer');
  assert.match(JSON.stringify(testing), /SIL \/ HIL/);
  assert.match(JSON.stringify(testing), /车载算法测试/);
});

test('renaming robotics preserves legacy progress, saved resources and interview notes', () => {
  const ids = new Set(paths.map(item => item.id));
  const counts = Object.fromEntries(paths.map(item => [item.id, item.stages.length]));
  const clean = sanitizeState({ joined: ['robotics'], done: { robotics: [0, 2] }, saved: ['robotics-guide-1'] }, ids, counts, new Set(resources.map(item => item.id)));
  assert.deepEqual(clean.joined, ['robotics']);
  assert.deepEqual(clean.done.robotics, [0, 2]);
  assert.equal(progressFor(paths.find(item => item.id === 'robotics'), clean).count, 2);
  assert.deepEqual(clean.saved, ['robotics-guide-1']);
  const career = sanitizeCareerState({ reviewed: ['robotics-written-1'], notes: { 'robotics@tencent': { text: '已有机器人复盘' } } }, new Set(questions.map(item => item.id)), [...ids], companies.map(item => item.id));
  assert.deepEqual(career.reviewed, ['robotics-written-1']);
  assert.equal(career.notes['robotics@tencent'].text, '已有机器人复盘');
});

test('all six added companies provide official and role-specific experience links', () => {
  for (const id of ['meituan', 'zhipu', 'jd', 'baidu', 'mihoyo', 'netease']) {
    const company = companies.find(item => item.id === id);
    assert.ok(company);
    assert.equal(new URL(company.url).protocol, 'https:');
    assert.equal(company.verifiedAt, '2026-10-22');
    for (const pathId of ['game', 'robotics', 'driving']) {
      const path = paths.find(item => item.id === pathId);
      const query = new URL(experienceUrl(company, path)).searchParams.get('query');
      assert.ok(query.includes(path.title));
      assert.ok(query.includes(company.title));
    }
  }
});
