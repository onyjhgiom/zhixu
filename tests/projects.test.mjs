import test from 'node:test';
import assert from 'node:assert/strict';
import { paths } from '../data.js';
import { projects, projectRegions, repositoryUrl, parseProjectFilters, projectHash, filterProjects } from '../project-data.js';

test('project catalog covers every direction with valid repositories and useful practice data', () => {
  const roleIds = new Set(paths.map(p => p.id));
  assert.equal(new Set(projects.map(p => p.id)).size, projects.length);
  for (const p of paths) assert.ok(projects.some(x => x.roles.includes(p.id)), p.title);
  for (const p of projects) {
    assert.ok(p.title && p.roles.length && p.tags.length);
    for (const role of p.roles) assert.ok(roleIds.has(role), role);
    assert.ok(p.desc.length > 50 && p.practice.length > 35 && p.deliverable.length > 10, p.id);
    assert.ok(repositoryUrl(p.url), p.id);
    assert.ok(projectRegions.some(r => r.id === p.location.region));
    assert.ok(p.location.label && p.location.note);
    if (p.location.region !== 'global') assert.ok(p.location.source);
  }
  for (const r of projectRegions) assert.ok(projects.some(p => p.location.region === r.id));
});

test('role, region and keyword filters intersect and search matches cities, names and stacks', () => {
  const pick = (s) => filterProjects(projects, { role: 'all', region: 'all', q: '', ...s }, paths);
  assert.equal(pick({}).length, projects.length);
  assert.deepEqual(pick({ role: 'cv', region: 'china', q: 'NCNN 深圳' }).map(p => p.id), ['ncnn']);
  assert.deepEqual(pick({ q: '杭州 微服务' }).map(p => p.id), ['spring-cloud-alibaba']);
  assert.ok(pick({ q: '算法设计 Python' }).some(p => p.id === 'algorithms-python'));
  assert.ok(pick({ q: '机器学习' }).length > 0);
  assert.equal(pick({ role: 'agent', region: 'china' }).length, 0);
  assert.equal(pick({ q: '不存在的项目xyz' }).length, 0);
  assert.equal(pick({ q: '   ' }).length, projects.length);
});

test('filter URLs round trip Chinese and reserved characters while rejecting unknown options', () => {
  const s = { role: 'cv', region: 'china', q: '深圳 C++ & ?/#' };
  assert.deepEqual(parseProjectFilters(projectHash(s), paths), s);
  assert.equal(projectHash({ role: 'all', region: 'all', q: '  ' }), '#projects');
  assert.deepEqual(parseProjectFilters('#projects?role=nope&region=nope&q=test', paths), { role: 'all', region: 'all', q: 'test' });
  assert.equal(parseProjectFilters('#projects?q=' + 'a'.repeat(500), paths).q.length, 100);
  assert.doesNotThrow(() => parseProjectFilters('#projects?q=%E0%A4%A', paths));
});

test('repository links accept GitHub and Gitee but reject unsafe schemes and misleading hosts', () => {
  for (const url of ['https://github.com/Tencent/ncnn', 'https://gitee.com/openharmony/docs']) assert.equal(repositoryUrl(url), url);
  for (const url of ['javascript:alert(1)', 'http://github.com/u/r', 'https://github.com.evil.test/u/r', 'https://github.com@evil.test/u/r', 'https://u:pass@github.com/u/r', 'https://github.com/', 'https://github.com/u/r/tree/main', 'not a url']) assert.equal(repositoryUrl(url), null, url);
});
