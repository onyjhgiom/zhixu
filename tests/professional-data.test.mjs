import test from 'node:test';
import assert from 'node:assert/strict';
import {paths,resources} from '../data.js';
import {
  professionalDataVersion,professionalDirections,professionalRoles,professionalSkills,
  masteryLevels,contentPolicy,getProfessionalDirection,getProfessionalRole
} from '../professional-data.js';

const pathIds = new Set(paths.map(item => item.id));
const resourceIds = new Set(resources.map(item => item.id));
const skillIds = new Set(professionalSkills.map(item => item.id));
const directionIds = new Set(professionalDirections.map(item => item.id));
const validLevel = level => Number.isInteger(level) && level >= 1 && level <= 4;
const nonempty = value => typeof value === 'string' && value.trim().length > 0;

test('professional catalogue preserves existing paths and distinguishes unknown from level zero',()=>{
  assert.match(professionalDataVersion,/^\d{4}-\d{2}-\d{2}\.\d+$/);
  assert.deepEqual([...directionIds],['frontend','backend','algorithm','data','systems','ai','security','testing','game','embodied','driving']);
  assert.deepEqual(masteryLevels.map(item => item.level),[0,1,2,3,4]);
  assert.match(masteryLevels[0].description,/null/);
  assert.match(contentPolicy.baseline,/不代表.*官方招聘/);
  assert.match(contentPolicy.measurement,/实验环境/);
  assert.match(contentPolicy.privacy,/合成|授权/);
  for (const direction of professionalDirections) {
    assert.ok(direction.pathIds.length > 0,direction.id);
    for (const id of direction.pathIds) assert.ok(pathIds.has(id),`${direction.id}: ${id}`);
    assert.equal(getProfessionalDirection(direction.id),direction);
  }
  assert.equal(getProfessionalDirection('agent').id,'ai');
  assert.equal(getProfessionalDirection('ops').id,'systems');
  assert.equal(getProfessionalDirection('nonexistent'),undefined);
});

test('each direction provides four concrete stages with tasks, evidence and acceptance',()=>{
  const allStageIds = new Set();
  for (const direction of professionalDirections) {
    assert.ok(direction.stages.length >= 4,direction.id);
    for (const stage of direction.stages) {
      assert.ok(!allStageIds.has(stage.id),stage.id);
      allStageIds.add(stage.id);
      assert.ok(Number.isFinite(stage.weeks) && stage.weeks > 0);
      for (const field of ['prerequisites','goals','tasks','deliverables','acceptance']) {
        assert.ok(Array.isArray(stage[field]) && stage[field].length > 0,`${stage.id}.${field}`);
        assert.ok(stage[field].every(nonempty),`${stage.id}.${field}`);
      }
      assert.ok(stage.tasks.length >= 2,stage.id);
      assert.ok(stage.acceptance.length >= 2,stage.id);
    }
  }
});

test('skills have unique stable ids, valid stage placement and an acyclic dependency graph',()=>{
  assert.equal(professionalSkills.length,70);
  assert.equal(skillIds.size,professionalSkills.length);
  const byId = new Map(professionalSkills.map(item => [item.id,item]));
  for (const direction of professionalDirections) {
    assert.ok(direction.skills.length >= 6,direction.id);
    const stages = new Map(direction.stages.map((item,index) => [item.id,index]));
    for (const skill of direction.skills) {
      assert.ok(['P0','P1','P2'].includes(skill.priority),skill.id);
      assert.ok(validLevel(skill.targetLevel),skill.id);
      assert.ok(stages.has(skill.stage),skill.id);
      assert.ok(nonempty(skill.evidence),skill.id);
      assert.equal(new Set(skill.dependencies).size,skill.dependencies.length,skill.id);
      for (const dependency of skill.dependencies) {
        assert.ok(byId.has(dependency),`${skill.id} -> ${dependency}`);
        const parent = byId.get(dependency);
        if (parent.directionId === direction.id) assert.ok(stages.get(parent.stage) <= stages.get(skill.stage),skill.id);
      }
    }
  }
  const visiting = new Set(),visited = new Set();
  function visit(id) {
    assert.ok(!visiting.has(id),`dependency cycle at ${id}`);
    if (visited.has(id)) return;
    visiting.add(id);
    for (const dependency of byId.get(id).dependencies) visit(dependency);
    visiting.delete(id);visited.add(id);
  }
  for (const id of skillIds) visit(id);
});

test('business projects state lab conditions, actionable metrics and inspectable deliverables',()=>{
  const ids = new Set();
  for (const direction of professionalDirections) {
    const project = direction.project;
    assert.ok(!ids.has(project.id));ids.add(project.id);
    assert.ok(nonempty(project.scenario));
    assert.match(project.environment,/本地|单进程|隔离/);
    assert.ok(project.tasks.length >= 4,project.id);
    assert.ok(project.deliverables.length >= 4,project.id);
    assert.ok(project.acceptance.length >= 3,project.id);
    for (const check of project.acceptance) {
      assert.ok(nonempty(check.metric) && nonempty(check.target) && nonempty(check.method),project.id);
    }
    for (const id of project.skillIds) assert.ok(skillIds.has(id),`${project.id}: ${id}`);
  }
});

test('interview questions are original, scored out of ten and include standard explanations and follow-ups',()=>{
  const ids = new Set();
  for (const direction of professionalDirections) {
    assert.ok(direction.questions.length >= 2,direction.id);
    for (const question of direction.questions) {
      assert.ok(!ids.has(question.id));ids.add(question.id);
      assert.equal(question.origin,'站内原创练习');
      assert.ok(['technical','design'].includes(question.type));
      assert.ok(question.answer.length >= 3,question.id);
      assert.ok(question.followUps.length >= 2,question.id);
      assert.equal(question.scoring.reduce((sum,item) => sum + item.points,0),10,question.id);
      assert.ok(question.scoring.every(item => nonempty(item.point) && item.points > 0));
      for (const id of question.skillIds) assert.ok(skillIds.has(id),`${question.id}: ${id}`);
    }
  }
  assert.ok(ids.size >= 16);
});

test('every curated resource reference resolves to the existing catalogue with a learning purpose',()=>{
  for (const direction of professionalDirections) {
    assert.ok(direction.resources.length >= 4,direction.id);
    assert.equal(new Set(direction.resources.map(item => item.resourceId)).size,direction.resources.length);
    for (const item of direction.resources) {
      assert.ok(resourceIds.has(item.resourceId),`${direction.id}: ${item.resourceId}`);
      assert.ok(nonempty(item.reason),item.resourceId);
    }
  }
});

test('roles have weighted campus/social targets, JD evidence and appropriate output requirements',()=>{
  assert.ok(professionalRoles.length >= 12);
  assert.equal(new Set(professionalRoles.map(item => item.id)).size,professionalRoles.length);
  for (const role of professionalRoles) {
    assert.equal(getProfessionalRole(role.id),role);
    assert.ok(directionIds.has(role.directionId),role.id);
    assert.ok(nonempty(role.summary) && role.workScenes.length >= 3,role.id);
    for (const id of role.pathIds) assert.ok(pathIds.has(id),`${role.id}: ${id}`);
    assert.equal(role.competencies.reduce((sum,item) => sum + item.weight,0),100,role.id);
    assert.equal(new Set(role.competencies.map(item => item.skillId)).size,role.competencies.length);
    for (const target of role.competencies) {
      assert.ok(skillIds.has(target.skillId),`${role.id}: ${target.skillId}`);
      assert.ok(Number.isInteger(target.weight) && target.weight > 0);
      assert.ok(validLevel(target.campusLevel) && validLevel(target.socialLevel));
      assert.ok(target.socialLevel >= target.campusLevel);
    }
    assert.ok(role.jdKeywords.length >= 2,role.id);
    for (const item of role.jdKeywords) {
      assert.ok(nonempty(item.keyword) && nonempty(item.meaning) && nonempty(item.evidence));
      assert.ok(item.skillIds.length > 0);
      for (const id of item.skillIds) assert.ok(skillIds.has(id));
    }
    assert.deepEqual(new Set(role.deliverables.map(item => item.type)),new Set(['project','competition','paper','opensource']),role.id);
    for (const item of role.deliverables) {
      assert.ok(['required','recommended','optional'].includes(item.campus));
      assert.ok(['required','recommended','optional'].includes(item.social));
      assert.ok(nonempty(item.standard));
    }
    assert.ok(role.resumeBullets.length > 0 && role.resumeBullets.every(nonempty),role.id);
    assert.ok(role.interviewPrep.length >= 3,role.id);
    assert.ok(role.campusFocus.length >= 2 && role.socialFocus.length >= 2,role.id);
  }
  assert.equal(getProfessionalRole('nonexistent'),undefined);
});

test('specialized roles use business-appropriate projects with complete, resolvable engineering evidence',()=>{
  const expected = {
    'recommendation-engineer':{title:/召回排序/,skills:['ai-data','ai-model','ai-evaluation','data-statistics']},
    'ml-engineer':{title:/分类模型/,skills:['ai-data','ai-model','ai-serving']},
    'database-engineer':{title:/索引.*事务.*恢复/,skills:['backend-storage','systems-distributed']},
    'fullstack-engineer':{title:/前后端/,skills:['frontend-quality','frontend-network','backend-storage','backend-reliability']}
  };
  const projectIds = new Set(professionalDirections.map(item => item.project.id));
  for (const [roleId,expectation] of Object.entries(expected)) {
    const role = getProfessionalRole(roleId),project = role.project;
    assert.ok(project,roleId);
    assert.match(project.title,expectation.title);
    assert.ok(!projectIds.has(project.id),project.id);projectIds.add(project.id);
    assert.match(project.environment,/本地/);
    assert.ok(nonempty(project.scenario));
    assert.ok(project.tasks.length >= 4 && project.tasks.every(nonempty),project.id);
    assert.ok(project.deliverables.length >= 4 && project.deliverables.every(nonempty),project.id);
    assert.ok(project.acceptance.length >= 4,project.id);
    for (const check of project.acceptance) assert.ok(nonempty(check.metric) && nonempty(check.target) && nonempty(check.method),project.id);
    assert.equal(new Set(project.skillIds).size,project.skillIds.length,project.id);
    for (const id of project.skillIds) assert.ok(skillIds.has(id),`${project.id}: ${id}`);
    for (const id of expectation.skills) assert.ok(project.skillIds.includes(id),`${project.id}: missing ${id}`);
  }
  assert.ok(!getProfessionalRole('ml-engineer').project.skillIds.includes('ai-rag'));
  assert.ok(!getProfessionalRole('recommendation-engineer').project.skillIds.includes('ai-rag'));
  assert.ok(getProfessionalRole('frontend-engineer').project === undefined,'direction fallback stays compatible');
});
