import { projects, projectRegions, repositoryUrl, parseProjectFilters, projectHash, filterProjects } from './project-data.js';
import { mountProjectVideos } from './video-ui.js';

export function createProjects({ paths, icon, e, closeDialog }) {
  const roleById = new Map(paths.map(p => [p.id, p]));
  const selection = () => parseProjectFilters(location.hash, paths);
  const filtered = s => filterProjects(projects, s, paths);
  const options = (items, current) => items.map(x => '<option value="' + e(x.id) + '"' + (current === x.id ? ' selected' : '') + '>' + e(x.name || x.title) + '</option>').join('');
  const quickRoles = ['all', 'agent', 'frontend', 'backend', 'game', 'robotics', 'driving'];

  function card(p, hidden = false) {
    const roles = p.roles.map(id => roleById.get(id));
    const url = repositoryUrl(p.url);
    const platform = url && new URL(url).hostname === 'gitee.com' ? 'Gitee' : 'GitHub';
    const title = e(p.title), names = roles.map(r => r.title).join(' / ');
    return '<a class="project-card" data-project-id="' + e(p.id) + '"' + (hidden ? ' hidden' : '') +
      (url ? ' href="' + e(url) + '" target="_blank" rel="noopener noreferrer"' : ' aria-disabled="true"') +
      ' aria-label="' + title + '，' + e(names) + '，在新标签页打开 ' + platform + ' 仓库">' +
      '<div class="project-card-top"><span class="tile-icon tone-' + e(roles[0].tone) + '">' + icon(roles[0].icon) + '</span><span class="project-level">' + e(p.level) + '实践</span></div>' +
      '<div class="project-roles">' + roles.map(r => '<span>' + e(r.title) + '</span>').join('') + '</div>' +
      '<h3>' + title + '</h3><p class="project-description">' + e(p.desc) + '</p>' +
      '<div class="tags project-tags">' + p.tags.map(t => '<span class="tag">' + e(t) + '</span>').join('') + '</div>' +
      '<div class="project-practice"><span>动手实践</span><p>' + e(p.practice) + '</p><strong>交付成果</strong><p>' + e(p.deliverable) + '</p></div>' +
      '<div class="project-location" title="' + e(p.location.note) + '">' + icon('pin') + '<span>' + e(p.location.label) + (p.location.region !== 'global' ? '<small>发起机构所在地</small>' : '') + '</span></div>' +
      '<div class="project-repository"><span>' + e(url ? new URL(url).hostname + new URL(url).pathname : '仓库地址待核验') + '</span></div>' +
      '<div class="project-card-footer"><span>' + platform + ' / OPEN SOURCE</span><strong>' + (url ? '打开仓库' : '暂无链接') + icon('external') + '</strong></div></a>';
  }

  function summary(s, count) {
    const labels = [roleById.get(s.role)?.title, projectRegions.find(r => r.id === s.region)?.name, s.q.trim() ? '关键词「' + s.q.trim() + '」' : ''].filter(Boolean);
    return '展示 ' + count + ' / ' + projects.length + ' 个项目' + (labels.length ? ' · ' + labels.join(' / ') : ' · 全部岗位与地区');
  }

  function page() {
    const s = selection(), visible = new Set(filtered(s).map(p => p.id));
    const active = s.role !== 'all' || s.region !== 'all' || !!s.q.trim();
    return '<div class="project-page">' +
      '<section class="page-header project-hero"><div><div class="eyebrow">PROJECT LAB / BUILD SOMETHING REAL</div><h1>把知识，写进真实项目。</h1><p>读源码，做实验，交付一个作品。按岗位找到起点，让每一次学习都有可展示的成果。</p><div class="project-hero-stats"><span><b>' + projects.length + '</b> 个开源项目</span><span><b>' + paths.length + '</b> 个岗位方向</span><span><b>理论 → 实践</b> 从理解到交付</span></div></div>' +
      '<div class="project-terminal" aria-hidden="true"><div><i></i><i></i><i></i><span>project.workspace</span></div><p><em>const</em> growth = {</p><p>&nbsp; learn: <b>"understand"</b>,</p><p>&nbsp; build: <b>"experiment"</b>,</p><p>&nbsp; ship: <b>"your next project"</b></p><p>}; <span class="project-caret">▌</span></p></div></section>' +
      '<section class="project-filters" aria-label="项目筛选"><form id="project-filter-form" role="search" aria-label="搜索项目">' +
      '<label class="project-search-field" for="project-query"><span>搜索项目</span><div>' + icon('search') + '<input id="project-query" type="search" name="q" placeholder="项目、技术栈、岗位或城市…" value="' + e(s.q) + '" maxlength="100" autocomplete="off" aria-controls="project-grid"></div></label>' +
      '<label for="project-role"><span>岗位方向</span><select id="project-role" name="role" aria-controls="project-grid">' + options([{ id: 'all', title: '全部岗位方向' }, ...paths], s.role) + '</select></label>' +
      '<label for="project-region"><span>所属地区</span><select id="project-region" name="region" aria-controls="project-grid">' + options([{ id: 'all', name: '全部地区' }, ...projectRegions], s.region) + '</select></label>' +
      '<button class="btn btn-secondary project-reset" type="button" data-project-reset' + (active ? '' : ' disabled') + '>重置筛选 ' + icon('close') + '</button></form>' +
      '<div class="project-shortcuts" role="group" aria-label="常用岗位方向"><span>快速探索</span>' + quickRoles.map(id => '<button type="button" class="tab ' + (s.role === id ? 'active' : '') + '" data-project-role="' + id + '" aria-pressed="' + (s.role === id) + '">' + e(id === 'all' ? '全部方向' : roleById.get(id).title) + '</button>').join('') + '</div></section>' +
      '<section class="project-list-section" aria-labelledby="project-list-title"><div class="project-list-heading"><h2 id="project-list-title">开源项目清单<span>EXPLORE & CREATE</span></h2><p id="project-result-count" role="status" aria-live="polite" aria-atomic="true">' + e(summary(s, visible.size)) + '</p></div>' +
      '<div id="project-grid" class="project-grid">' + projects.map(p => card(p, !visible.has(p.id))).join('') + '</div>' +
      '<div id="project-empty" class="empty-state"' + (visible.size ? ' hidden' : '') + '>' + icon('search') + '<h3>暂时没有匹配的项目</h3><p>试试缩短关键词，或放宽岗位和地区条件。搜索支持项目名称、技术栈、岗位与城市。</p><button class="btn btn-secondary" type="button" data-project-reset>查看全部项目 ' + icon('arrow') + '</button></div></section>' +
      '<p class="project-region-note">' + icon('info') + '<span>地区表示公开发起机构所在地或全球协作属性，不是线下实习、招聘或授课地点。项目与机构资料核对于 2026-10-19；运行方式与环境要求请以仓库文档为准。点击整张卡片即可在新标签页打开仓库。</span></p></div>';
  }

  // Keep the page and card nodes mounted while filtering: no full-page redraw or focus loss.
  function update(changes) {
    const root = document.querySelector('.project-page');
    if (!root || document.body.dataset.page !== 'projects') return;
    const s = { ...selection(), ...changes }, visible = new Set(filtered(s).map(p => p.id));
    history.replaceState(history.state, '', projectHash(s));
    root.querySelectorAll('[data-project-id]').forEach(el => { el.hidden = !visible.has(el.dataset.projectId); });
    root.querySelector('#project-role').value = s.role;
    root.querySelector('#project-region').value = s.region;
    const input = root.querySelector('#project-query');
    if (input.value !== s.q) input.value = s.q;
    root.querySelectorAll('[data-project-role]').forEach(el => {
      const active = el.dataset.projectRole === s.role;
      el.classList.toggle('active', active);el.setAttribute('aria-pressed', String(active));
    });
    root.querySelector('.project-reset').disabled = s.role === 'all' && s.region === 'all' && !s.q.trim();
    root.querySelector('#project-empty').hidden = visible.size > 0;
    root.querySelector('#project-result-count').textContent = summary(s, visible.size);
    mountProjectVideos(root, s.role);
  }

  function preview(role) {
    return '<div class="career-bridge project-bridge"><span class="tile-icon tone-blue">' + icon('code') + '</span><div><h3>把学过的知识，做成一个作品。</h3><p>真实开源仓库、动手任务与交付建议，找到适合自己的实践起点。</p></div><a class="btn btn-secondary" data-project-link href="' + (role ? projectHash({ role, region: 'all', q: '' }) : '#projects') + '">探索项目实践 ' + icon('arrow') + '</a></div>';
  }

  function search(q) {
    const found = filtered({ role: 'all', region: 'all', q });
    return { count: found.length, markup: found.length ? '<h2 class="search-heading">项目实践</h2><div class="project-grid">' + found.map(p => card(p)).join('') + '</div>' : '' };
  }

  document.addEventListener('click', event => {
    if (event.target.closest('[data-project-link]')) closeDialog();
    if (event.target.closest('[data-project-reset]')) {
      update({ role: 'all', region: 'all', q: '' });
      document.getElementById('project-query')?.focus();
    }
    const button = event.target.closest('[data-project-role]');
    if (button) update({ role: button.dataset.projectRole });
  });
  document.addEventListener('change', event => {
    if (event.target.id === 'project-role') update({ role: event.target.value });
    if (event.target.id === 'project-region') update({ region: event.target.value });
  });
  document.addEventListener('input', event => {
    if (event.target.id === 'project-query' && !event.isComposing) update({ q: event.target.value });
  });
  document.addEventListener('compositionend', event => {
    if (event.target.id === 'project-query') update({ q: event.target.value });
  });
  document.addEventListener('submit', event => {
    if (event.target.id === 'project-filter-form') { event.preventDefault();update({ q: document.getElementById('project-query').value.trim() }); }
  });
  return { page, preview, search };
}
