import test from 'node:test';
import assert from 'node:assert/strict';
import { professionalRoles, professionalSkills } from '../professional-data.js';
import { assessmentQuestions, sanitizeGrowthState, getSkillEvidence, diagnoseRole, buildLearningPlan } from '../growth-core.js';

const role = professionalRoles.find(item => item.id === 'frontend-engineer');
const empty = () => sanitizeGrowthState({});
const configuration = { roleId: role.id, mode: 'campus', hoursPerWeek: 8, startDate: '2026-10-22' };

test('diagnostic bank covers all directions, references real skills and has valid answers', () => {
  const ids = new Set();
  for (const item of assessmentQuestions) {
    assert.ok(!ids.has(item.id)); ids.add(item.id);
    assert.ok(professionalSkills.some(skill => skill.id === item.skillId && skill.directionId === item.directionId));
    assert.equal(item.options.length, 4); assert.ok(item.answer >= 0 && item.answer < 4);
    assert.ok(item.explanation.length > 15); assert.ok(item.level <= 2);
  }
  assert.equal(assessmentQuestions.length, 24);
});

test('unknown skills remain unknown, including when all self ratings are high', () => {
  const state = empty();
  for (const skill of professionalSkills) state.selfLevels[skill.id] = 4;
  const diagnostic = diagnoseRole(role.id, 'campus', state);
  assert.equal(diagnostic.score, null); assert.equal(diagnostic.coverage, 0);
  assert.equal(diagnostic.lowerBound, 0); assert.equal(diagnostic.upperBound, 100);
  assert.equal(diagnostic.gaps.length, 0); assert.equal(diagnostic.unassessed.length, role.competencies.length);
  assert.equal(getSkillEvidence(state, role.competencies[0].skillId).selfLevel, 4);
});

test('incorrect answers differ from unassessed knowledge', () => {
  const state = empty(), q = assessmentQuestions.find(item => item.directionId === 'frontend');
  state.answers[q.id] = (q.answer + 1) % 4;
  assert.equal(getSkillEvidence(state, q.skillId).level, 0);
  const report = diagnoseRole(role.id, 'campus', state);
  assert.equal(report.score, 0); assert.ok(report.coverage > 0 && report.coverage < 100);
  assert.ok(report.gaps.some(item => item.skillId === q.skillId));
});

test('matching returns transparent coverage and bounds instead of counting unknown as failure', () => {
  const state = empty();
  for (const q of assessmentQuestions) state.answers[q.id] = q.answer;
  for (const mode of ['campus', 'social']) for (const item of professionalRoles) {
    const result = diagnoseRole(item.id, mode, state);
    assert.ok(result.score === null || result.score >= 0 && result.score <= 100);
    assert.ok(result.lowerBound <= result.upperBound);
    assert.ok(result.coverage >= 0 && result.coverage <= 100);
    assert.ok(result.unassessed.every(gap => gap.currentLevel === null));
    assert.ok(result.gaps.every(gap => gap.gap > 0 && gap.currentLevel !== null));
  }
});

test('state sanitation filters invalid IDs, answer indices, dates and prototype payloads', () => {
  const q = assessmentQuestions[0];
  const input = JSON.parse('{"selfLevels":{"__proto__":4},"completed":{"__proto__":"2026-10-22"}}');
  input.profile = { roleId: 'missing', mode: 'invalid', hoursPerWeek: -2 };
  input.answers = { [q.id]: 99, unknown: 0 };
  input.selfLevels[q.skillId] = 9;
  const state = sanitizeGrowthState(input);
  assert.equal(state.profile.roleId, professionalRoles[0].id); assert.equal(state.profile.mode, 'campus');
  assert.equal(state.profile.hoursPerWeek, 8); assert.deepEqual(state.answers, {});
  assert.deepEqual(state.selfLevels, {}); assert.deepEqual(state.completed, {});
});

test('plan uses stable IDs, valid prerequisites, business acceptance and correct weekly capacity', () => {
  const state = empty(), plan = buildLearningPlan(configuration, state);
  assert.equal(new Set(plan.tasks.map(item => item.id)).size, plan.tasks.length);
  assert.equal(plan.totalHours, plan.tasks.reduce((sum, item) => sum + item.hours, 0));
  assert.equal(plan.weekCount, Math.ceil(plan.totalHours / configuration.hoursPerWeek));
  const skills = plan.tasks.filter(item => item.kind === 'skill').map(item => item.skillIds[0]);
  for (const task of plan.tasks) {
    assert.ok(task.acceptance.length > 0 && task.deliverables.length > 0);
    assert.ok(task.week >= 1 && task.week <= plan.weekCount);
    assert.ok(task.endWeek >= task.week && task.endWeek <= plan.weekCount);
    assert.match(task.dueDate, /^\d{4}-\d{2}-\d{2}$/);
    if (task.kind === 'skill') for (const dependency of professionalSkills.find(item => item.id === task.skillIds[0]).dependencies) assert.ok(skills.indexOf(dependency) < skills.indexOf(task.skillIds[0]));
  }
  assert.ok(plan.tasks.some(item => item.kind === 'project'));
  assert.ok(plan.tasks.some(item => item.kind === 'interview'));
});

test('self reports do not skip required learning or prove engineering mastery', () => {
  const state = empty();
  const before = buildLearningPlan(configuration, state);
  for (const skill of professionalSkills) state.selfLevels[skill.id] = 4;
  const after = buildLearningPlan(configuration, state);
  assert.deepEqual(after.tasks.map(item => item.id), before.tasks.map(item => item.id));
  assert.ok(after.totalHours <= before.totalHours);
});

test('role projects include all required skills and their dependencies in the plan', () => {
  const state = empty();
  for (const item of professionalRoles) {
    const plan = buildLearningPlan({ ...configuration, roleId: item.id }, state);
    const project = plan.tasks.find(task => task.kind === 'project');
    const planned = new Set(plan.tasks.filter(task => task.kind === 'skill').flatMap(task => task.skillIds));
    for (const id of project.skillIds) assert.ok(planned.has(id), `${item.id} missing project prerequisite ${id}`);
  }
});

test('diagnostic evidence maps to the concept actually asked', () => {
  assert.equal(assessmentQuestions.find(item => item.id === 'ai-a').skillId, 'ai-data');
  assert.equal(assessmentQuestions.find(item => item.id === 'security-a').skillId, 'security-auth');
  assert.equal(assessmentQuestions.find(item => item.id === 'security-b').skillId, 'security-code');
});

test('changing weekly availability changes scheduling and invalid dates are rejected', () => {
  const state = empty(), slow = buildLearningPlan({ ...configuration, hoursPerWeek: 4 }, state), fast = buildLearningPlan({ ...configuration, hoursPerWeek: 16 }, state);
  assert.ok(slow.weekCount > fast.weekCount);
  for (const value of [0, 1, 41, NaN]) assert.throws(() => buildLearningPlan({ ...configuration, hoursPerWeek: value }, state));
  for (const value of ['2026-02-30', 'invalid', '2026-13-01']) assert.throws(() => buildLearningPlan({ ...configuration, startDate: value }, state));
});

test('refresh and regeneration preserve task completion and bound attempt history', () => {
  const state = empty(); state.plan = buildLearningPlan(configuration, state);
  const id = state.plan.tasks[0].id;
  state.completed[id] = '2026-10-22T09:00:00.000Z';
  state.attempts = Array.from({ length: 25 }, (_, index) => ({ id: String(index), roleId: role.id, at: '2026-10-22T09:00:00.000Z', answers: {} }));
  const restored = sanitizeGrowthState(JSON.parse(JSON.stringify(state)));
  assert.equal(restored.completed[id], state.completed[id]); assert.equal(restored.attempts.length, 20);
  assert.deepEqual(restored.plan.tasks.map(task => task.id), state.plan.tasks.map(task => task.id));
  restored.plan = buildLearningPlan({ ...configuration, mode: 'social' }, restored);
  assert.equal(restored.completed[id], state.completed[id]);
});

test('persisted plans are rebuilt from trusted content instead of arbitrary stored markup', () => {
  const state = empty(); state.plan = { ...buildLearningPlan(configuration, state), tasks: [{ title: '<script>bad</script>', id: 'unknown' }], totalHours: -10 };
  const clean = sanitizeGrowthState(state);
  assert.ok(clean.plan.tasks.every(task => !task.title.includes('<script>')));
  assert.ok(clean.plan.totalHours > 0);
});
