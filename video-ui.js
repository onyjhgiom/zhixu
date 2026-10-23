import { escapeHtml as e } from './core.js';
import { paths, examTopics, helpServices } from './data.js';
import { professionalDirections, professionalRoles } from './professional-data.js';
import { videoCourses, pathVideoCourses, pathStageVideoCourses, professionalVideoCourses, professionalStageVideoCourses, skillVideoOverrides, moduleVideoCourses, roleVideoCourses, videoCheckedAt } from './video-data.js';

const learningPaths = new Map([...paths, ...examTopics].map(item => [item.id, item]));
const professionalById = new Map(professionalDirections.map(item => [item.id, item]));
const roleById = new Map(professionalRoles.map(item => [item.id, item]));
const linkParams = link => new URLSearchParams(link?.hash.split('?')[1] || '');

export function videoLinkMarkup(key, binding, label, compact = false) {
  const item = videoCourses[key];
  if (!item) return '';
  return `<a class="bili-link${compact ? ' bili-link--compact' : ''}" href="${e(item.url)}" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer" data-video-binding="${e(binding)}" data-video-course="${e(key)}" aria-label="${e(label)}：${e(item.title)}（B站，新标签页）"><span class="bili-mark" aria-hidden="true">B站</span><span class="bili-link-body"><span class="bili-link-label">${e(label)}</span><strong>${e(item.title)}</strong>${compact ? '' : `<small>${e(item.scope)}</small>`}</span><span class="bili-link-action" aria-hidden="true">去学习 ↗</span></a>`;
}

function addLink(parent, key, binding, label, before = null) {
  if (!parent || [...parent.querySelectorAll('[data-video-binding]')].some(link => link.dataset.videoBinding === binding)) return;
  const markup = videoLinkMarkup(key, binding, label, true);
  if (before) before.insertAdjacentHTML('beforebegin', markup);
  else parent.insertAdjacentHTML('beforeend', markup);
}

function courseSection(keys, binding, title) {
  const valid = [...new Set(keys)].filter(key => videoCourses[key]);
  if (!valid.length) return '';
  return `<section class="video-learning" data-video-section="${e(binding)}" aria-label="${e(title)}"><div class="video-learning-heading"><h2>${e(title)}</h2><span>B站视频课 · 新标签页打开</span></div><div class="video-learning-grid">${valid.map(key => videoLinkMarkup(key, `${binding}:${key}`, '配套视频课程')).join('')}</div></section>`;
}

function insertSection(root, keys, binding, title, anchor) {
  root.querySelector(`[data-video-section="${binding}"]`)?.remove();
  const markup = courseSection(keys, binding, title);
  if (!markup) return;
  if (anchor) anchor.insertAdjacentHTML('afterend', markup);
  else root.insertAdjacentHTML('afterbegin', markup);
}

export function mountProjectVideos(root, roleId = 'all') {
  const keys = roleId === 'all' ? moduleVideoCourses.projects : pathVideoCourses[roleId];
  const title = roleId === 'all' ? '项目实践 · B站学习' : `${learningPaths.get(roleId)?.title || '项目实践'} · B站学习`;
  insertSection(root, keys || [], 'projects', title, root.querySelector('.project-filters'));
}

export function mountVideoLearning(root, { page = '', params = new URLSearchParams(), resourcePath = 'all', pathId = '' } = {}) {
  root.querySelectorAll('.path-card').forEach(card => {
    const id = card.querySelector('[data-path]')?.dataset.path;
    addLink(card, pathVideoCourses[id]?.[0], `path:${id}`, 'B站学习视频', card.querySelector('.card-footer'));
  });
  root.querySelectorAll('.subject-card').forEach(button => {
    const id = button.dataset.path;
    let group = button.closest('.subject-video-group');
    if (!group) {
      group = document.createElement('article'); group.className = 'subject-video-group';
      button.before(group); group.append(button);
    }
    addLink(group, pathVideoCourses[id]?.[0], `path:${id}`, 'B站专业课');
  });
  root.querySelectorAll('.support-card').forEach(card => {
    const id = card.querySelector('[data-help]')?.dataset.help;
    const keys = moduleVideoCourses[`support-${id}`] || [];
    const title = helpServices.find(item => item.id === id)?.title || '备考';
    keys.forEach((key, index) => addLink(card, key, `support:${id}:${index}`, `${id === 'questions' ? '408 专业课答疑' : title} · B站学习`, card.querySelector('[data-help]')));
  });
  root.querySelectorAll('.growth-direction').forEach(card => {
    const id = linkParams(card.querySelector('h2 a')).get('direction');
    addLink(card, professionalVideoCourses[id]?.[0], `direction:${id}`, 'B站方向课程', card.querySelector('.growth-direction-bottom'));
  });
  root.querySelectorAll('.growth-role-card').forEach(card => {
    const id = linkParams(card.querySelector('h2 a')).get('role'), job = roleById.get(id);
    addLink(card, (roleVideoCourses[id] || professionalVideoCourses[job?.directionId])?.[0], `role:${id}`, 'B站岗位课程', card.querySelector('.growth-card-link'));
  });

  if (pathId) {
    const item = learningPaths.get(pathId), keys = pathVideoCourses[pathId] || [];
    if (!item) return;
    insertSection(root, keys, 'path', `${item.title} · B站课程`, root.querySelector('.dialog-lead'));
    root.querySelectorAll('.stage-item').forEach((node, index) => {
      addLink(node, pathStageVideoCourses[pathId]?.[index] || keys[0], `stage:${pathId}:${index}`, '本阶段配套视频');
    });
    root.querySelectorAll('.theory-card, .practice-card').forEach((node, index) => {
      const practiceIndex = [...root.querySelectorAll('.practice-card')].indexOf(node);
      const key = practiceIndex >= 0 ? pathStageVideoCourses[pathId]?.[practiceIndex] || keys[0] : keys[0];
      addLink(node, key, `curriculum:${pathId}:${index}`, '模块配套视频');
    });
    return;
  }

  const selectedDirection = professionalById.get(params.get('direction'));
  if (page === 'growth' && selectedDirection) {
    const id = selectedDirection.id;
    insertSection(root, professionalVideoCourses[id], 'direction', `${selectedDirection.title} · B站课程`, root.querySelector('.growth-section-nav'));
    root.querySelectorAll('.growth-stage').forEach((node, index) => {
      addLink(node, professionalStageVideoCourses[id]?.[index], `professional-stage:${id}:${index}`, '本阶段配套视频');
    });
    root.querySelectorAll('.growth-skill').forEach((node, index) => {
      const skill = selectedDirection.skills[index];
      if (skill) addLink(node, skillVideoOverrides[skill.id] || professionalVideoCourses[id]?.[0], `skill:${skill.id}`, '技能配套视频');
    });
    root.querySelectorAll('.growth-project, .growth-question-answer').forEach((node, index) => {
      addLink(node, professionalVideoCourses[id]?.[0], `professional-module:${id}:${index}`, '方向配套课程');
    });
  }
  if (['role', 'assessment', 'plan'].includes(page)) {
    const planRole = page === 'plan' ? linkParams(root.querySelector('.growth-plan-toolbar a')).get('role') : '';
    const currentRole = planRole || root.querySelector('[data-growth-assessment-role]')?.value || params.get('role');
    const job = roleById.get(currentRole) || professionalRoles.find(item => item.title === root.querySelector('h1')?.textContent) || professionalRoles[0];
    insertSection(root, roleVideoCourses[job.id] || professionalVideoCourses[job.directionId], 'role-module', `${job.title} · B站学习`, root.querySelector('.growth-nav'));
    root.querySelectorAll('.growth-task').forEach(node => {
      const id = node.querySelector('[data-growth-complete]')?.dataset.growthComplete;
      if (!id) return;
      const [, , kind, skillId] = id.split(':');
      const key = kind === 'interview' ? 'interview' : skillVideoOverrides[skillId] || (roleVideoCourses[job.id] || professionalVideoCourses[job.directionId])?.[0];
      addLink(node, key, `plan-task:${id}`, '任务配套视频');
    });
  }
  if (page === 'interviews') {
    const tab = params.get('tab') || 'practice', id = params.get('role') || 'agent';
    const keys = tab === 'resume' ? moduleVideoCourses.resume : [...(pathVideoCourses[id] || []), ...(moduleVideoCourses[tab] || [])];
    const titles = { resume: '简历写作', practice: '笔试与面试', experience: '项目经历与复盘', strategy: '面试准备' };
    insertSection(root, keys, 'career', `${titles[tab] || '求职准备'} · B站学习`, root.querySelector('.career-section-tabs'));
  }
  if (page === 'projects') mountProjectVideos(root, params.get('role') || 'all');
  if (page === 'resources') {
    const ids = resourcePath === 'all' ? paths.map(item => item.id) : [resourcePath];
    const keys = ids.flatMap(id => pathVideoCourses[id] || []);
    const title = resourcePath === 'all' ? '方向视频课程' : `${learningPaths.get(resourcePath)?.title || '当前方向'}视频课程`;
    const gallery = `<details class="video-library"><summary><span class="bili-mark" aria-hidden="true">B站</span><strong>${e(title)}</strong><span>${new Set(keys).size} 门配套课程 · 展开选择</span></summary>${courseSection(keys, 'resources', 'B站学习课程')}<p class="video-source-note">链接核对：${e(videoCheckedAt)}。课程按知识主题匹配；工具版本、考试要求请以官方文档及当年通知为准。</p></details>`;
    root.querySelector('.resource-page-header')?.insertAdjacentHTML('afterend', gallery);
  }
}
