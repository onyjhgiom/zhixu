import test from 'node:test';
import assert from 'node:assert/strict';
import { paths, examTopics, helpServices } from '../data.js';
import { professionalDirections, professionalRoles } from '../professional-data.js';
import { videoCourses, pathVideoCourses, pathStageVideoCourses, professionalVideoCourses, professionalStageVideoCourses, skillVideoOverrides, moduleVideoCourses, roleVideoCourses } from '../video-data.js';
import { videoLinkMarkup } from '../video-ui.js';

const checkKeys = (keys, label) => {
  assert.ok(keys?.length, `Missing videos: ${label}`);
  keys.forEach(key => assert.ok(videoCourses[key], `Unknown course ${key}: ${label}`));
};
test('every technical direction and exam subject has a direct course mapping', () => {
  for (const item of [...paths, ...examTopics]) checkKeys(pathVideoCourses[item.id], item.id);
  for (const item of paths) {
    assert.equal(pathStageVideoCourses[item.id]?.length, item.stages.length, item.id);
    checkKeys(pathStageVideoCourses[item.id], item.id);
  }
});
test('all four 408 subjects use 王道计算机教育 Bilibili courses', () => {
  for (const [subject, key] of Object.entries({ 'exam-ds': 'wangdaoDS', 'exam-co': 'wangdaoCO', 'exam-os': 'wangdaoOS', 'exam-cn': 'wangdaoCN' })) {
    assert.deepEqual(pathVideoCourses[subject], [key]);
    assert.match(videoCourses[key].title, /^王道计算机考研/);
    assert.equal(pathStageVideoCourses[subject].length, 4);
    assert.ok(pathStageVideoCourses[subject].every(stageCourse => stageCourse === key));
  }
});
test('all professional stages and skills resolve to a known course', () => {
  for (const item of professionalDirections) {
    checkKeys(professionalVideoCourses[item.id], item.id);
    assert.equal(professionalStageVideoCourses[item.id]?.length, item.stages.length, item.id);
    checkKeys(professionalStageVideoCourses[item.id], item.id);
    for (const skill of item.skills) checkKeys([skillVideoOverrides[skill.id] || professionalVideoCourses[item.id][0]], skill.id);
  }
});
test('functional modules have explicit course bindings', () => {
  for (const id of ['projects', 'practice', 'experience', 'strategy', 'resume', ...helpServices.map(item => `support-${item.id}`)]) checkKeys(moduleVideoCourses[id], id);
  assert.deepEqual(moduleVideoCourses['support-questions'], ['wangdaoDS', 'wangdaoCO', 'wangdaoOS', 'wangdaoCN']);
});
test('role-specific videos resolve and vehicle testing uses the simulation topic', () => {
  for (const role of professionalRoles) checkKeys(roleVideoCourses[role.id] || professionalVideoCourses[role.directionId], role.id);
  assert.equal(roleVideoCourses['vehicle-algorithm-test-engineer'][0], 'drivingSimulation');
  for (const id of Object.keys(roleVideoCourses)) assert.ok(professionalRoles.some(role => role.id === id), id);
});
test('course URLs are HTTPS Bilibili videos, not searches or invented chapters', () => {
  for (const item of Object.values(videoCourses)) {
    const url = new URL(item.url);
    assert.equal(url.protocol, 'https:');
    assert.equal(url.hostname, 'www.bilibili.com');
    assert.match(url.pathname, new RegExp('^/video/BV[0-9A-Za-z]{10}/$'));
    assert.equal(url.search, '');
    assert.ok(item.title && item.scope && item.checkedAt);
  }
});
test('video markup escapes labels and opens safely without sending user inputs', () => {
  const markup = videoLinkMarkup('resume', 'resume', '<img src=x onerror=alert(1)>');
  assert.ok(!markup.includes('<img'));
  assert.match(markup, /target="_blank"/);
  assert.match(markup, /rel="noopener noreferrer"/);
  assert.match(markup, /referrerpolicy="no-referrer"/);
  assert.equal(videoLinkMarkup('unknown', 'unknown', 'unknown'), '');
});
