import { resources } from './data.js';
import { professionalDirections, professionalRoles, professionalSkills, masteryLevels, contentPolicy, professionalDataVersion, getProfessionalDirection, getProfessionalRole } from './professional-data.js';
import { sanitizeGrowthState, assessmentQuestions, getSkillEvidence, diagnoseRole, buildLearningPlan } from './growth-core.js';

export function createGrowth({ e, icon, toast, go, render, resourceRow, exportFile, closeDialog }) {
  const storageKey = 'zhixu-growth-v1';
  let state;
  let storageAvailable = true;
  let compareIds = [];
  try { state = sanitizeGrowthState(JSON.parse(localStorage.getItem(storageKey) || '{}')); }
  catch { state = sanitizeGrowthState({}); storageAvailable = false; }
  const esc = value => e(String(value ?? ''));
  const list = value => Array.isArray(value) ? value : value ? [value] : [];
  const plain = value => typeof value === 'string' ? value : value?.title || value?.description || value?.label || '';
  const ul = values => `<ul class="growth-list">${list(values).map(value => `<li>${esc(plain(value))}</li>`).join('')}</ul>`;
  const skill = id => professionalSkills.find(item => item.id === id);
  const dir = id => getProfessionalDirection(id) || professionalDirections.find(item => item.id === id);
  const role = id => getProfessionalRole(id) || professionalRoles.find(item => item.id === id);
  const labelMode = mode => mode === 'social' ? '社招' : '校招';
  const artifactLabel = value => ({ project: '工程项目', competition: '竞赛经历', paper: '论文与复现', opensource: '开源贡献', required: '必备', recommended: '推荐', optional: '按岗位选择' }[value] || value);
  const today = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  const taskSchedule = task => `第 ${task.week}${task.endWeek && task.endWeek !== task.week ? `–${task.endWeek}` : ''} 周 · ${task.hours}h${task.dueDate ? ` · ${task.dueDate} 前` : ''}`;
  const levelLabel = level => level == null ? '未评估' : `L${level} · ${masteryLevels.find(item => item.level === level)?.label || '掌握等级'}`;
  const params = () => new URLSearchParams(location.hash.split('?')[1] || '');
  const targetRole = () => role(params().get('role') || state.profile.roleId) || professionalRoles[0];
  const mode = () => params().get('mode') === 'social' ? 'social' : params().get('mode') === 'campus' ? 'campus' : state.profile.mode;
  const href = (page, values = {}) => `#${page}${Object.keys(values).length ? `?${new URLSearchParams(Object.entries(values).filter(([, value]) => value != null && value !== ''))}` : ''}`;
  function persist() {
    try { localStorage.setItem(storageKey, JSON.stringify(state)); storageAvailable = true; return true; }
    catch { storageAvailable = false; toast('浏览器未能保存成长记录，本次操作已保留在内存中，请导出备份。'); return false; }
  }
  function header(title, description, current = 'growth') {
    return `<div class="growth-page"><header class="growth-header"><div><div class="eyebrow">ZHIXU / PROFESSIONAL GROWTH</div><h1>${esc(title)}</h1><p>${esc(description)}</p></div><a class="btn btn-primary" href="${esc(href('assessment', { role: state.profile.roleId, mode: mode() }))}">${icon('sliders')}能力测评</a></header><nav class="growth-nav" aria-label="专业成长导航">${[['growth', '方向与技能'], ['roles', '岗位能力'], ['assessment', '测评与诊断'], ['plan', '我的成长计划']].map(([id, title]) => `<a class="${current === id ? 'active' : ''}" href="#${id}" ${current === id ? 'aria-current="page"' : ''}>${esc(title)}</a>`).join('')}</nav>`;
  }
  function footer() {
    const policy = typeof contentPolicy === 'string' ? contentPolicy : contentPolicy?.baseline || contentPolicy?.summary || contentPolicy?.description;
    return `<footer class="growth-footnote"><p>${esc(policy || '内容为站内编辑能力基线与原创工程练习。实际岗位职责与招聘要求请核对目标团队官方 JD。匹配覆盖度不代表录取概率。')}</p>${contentPolicy?.measurement ? `<p>${esc(contentPolicy.measurement)}</p>` : ''}<p>内容版本 ${esc(professionalDataVersion)} · ${storageAvailable ? '成长记录保存在当前浏览器' : '当前仅保留会话记录，请导出备份'} · 自评、客观测评与任务完成分别记录；客观题仅提供知识信号，工程交付能力需结合项目评审验证。</p></footer></div>`;
  }
  function pills(values) { return `<div class="growth-tags">${list(values).map(value => `<span>${esc(plain(value))}</span>`).join('')}</div>`; }
  function section(title, description, body, id = '') { return `<section class="growth-section" ${id ? `id="${esc(id)}"` : ''}><div class="growth-section-heading"><h2>${esc(title)}</h2>${description ? `<p>${esc(description)}</p>` : ''}</div>${body}</section>`; }
  function directionCard(item) {
    const relatedRoles = professionalRoles.filter(job => job.directionId === item.id);
    return `<article class="growth-direction"><div class="growth-direction-top"><span class="growth-number">${String(professionalDirections.indexOf(item) + 1).padStart(2, '0')}</span><span>${item.stages.length} 个阶段 / ${item.skills.length} 项技能</span></div><h2><a href="${esc(href('growth', { direction: item.id }))}">${esc(item.title)}${icon('arrow')}</a></h2><p>${esc(item.description)}</p><div class="growth-direction-stage">${item.stages.map(stage => `<span>${esc(stage.title)}</span>`).join('<b aria-hidden="true">→</b>')}</div><div class="growth-direction-bottom"><span>${relatedRoles.length} 类岗位 · ${item.questions.length} 道深度题</span><a href="${esc(href('growth', { direction: item.id }))}">进入学习 ${icon('chevron')}</a></div></article>`;
  }
  function directionsPage() {
    const selected = dir(params().get('direction'));
    if (selected) return directionPage(selected);
    return header('把目标岗位，拆成可验证的能力。', '八个学习方向，从基础、工程实践到面试表达。每一阶段都带着任务、交付物和验收标准前进。') + `<div class="growth-overview"><div><strong>${professionalDirections.length}</strong><span>专业学习方向</span></div><div><strong>${professionalSkills.length}</strong><span>技能与证据要求</span></div><div><strong>${professionalRoles.length}</strong><span>主流岗位画像</span></div><div><strong>${professionalDirections.reduce((count, item) => count + item.questions.length, 0)}</strong><span>原创深度面试题</span></div></div><div class="growth-direction-grid">${professionalDirections.map(directionCard).join('')}</div>` + section('如何使用这套能力体系', '沿着真实产出的顺序组织学习。', `<div class="growth-flow">${[['01', '先明确目标', '选择岗位与校招 / 社招模式，理解职责、能力等级和证据要求。'], ['02', '测出当前起点', '把自我判断和客观题结果分开记录，未测内容保持未评估。'], ['03', '按周完成任务', '围绕技能差距生成任务，提交设计、代码、测试和复盘材料。'], ['04', '用证据准备求职', '对照验收标准整理项目经历，在追问中解释方案、边界与取舍。']].map(([number, title, text]) => `<div><b>${number}</b><h3>${title}</h3><p>${text}</p></div>`).join('')}</div>`) + footer();
  }
  function skillRows(item) {
    return `<div class="growth-skill-tree" role="list">${item.skills.map(node => {
      const evidence = getSkillEvidence(state, node.id);
      return `<article class="growth-skill" role="listitem"><div class="growth-skill-title"><span class="growth-priority ${esc(String(node.priority).toLowerCase())}">${esc(node.priority)}</span><h3>${esc(node.title)}</h3><span class="growth-skill-level">目标 ${esc(levelLabel(node.targetLevel))}</span></div><p class="growth-evidence-state">客观证据：${esc(levelLabel(evidence.level))} <span>自评：${esc(levelLabel(evidence.selfLevel))}</span></p><p><strong>先修依赖：</strong>${list(node.dependencies).length ? list(node.dependencies).map(id => esc(skill(id)?.title || id)).join(' / ') : '可直接开始'}</p><p><strong>掌握证据：</strong>${esc(list(node.evidence).map(plain).join('；'))}</p><div class="growth-level-meter" aria-label="${esc(node.title)}客观测评等级">${[0, 1, 2, 3, 4].map(level => `<span class="${evidence.level != null && level <= evidence.level ? 'filled' : ''}">L${level}</span>`).join('')}</div></article>`;
    }).join('')}</div>`;
  }
  function directionPage(item) {
    const project = item.project;
    const relatedRoles = professionalRoles.filter(job => job.directionId === item.id);
    const recommended = item.resources.map(entry => ({ ...entry, resource: resources.find(resource => resource.id === entry.resourceId) })).filter(entry => entry.resource);
    return header(item.title, item.description) + `<div class="growth-context"><a href="#growth">${icon('chevron')}全部方向</a><span>${item.stages.length} 阶段 · ${item.skills.length} 项技能 · ${item.questions.length} 道面试题</span></div><nav class="growth-section-nav" aria-label="方向内容">${[['stages', '阶段路线'], ['skills', '技能依赖'], ['project', '工程实战'], ['questions', '面试深挖'], ['resources', '精选资料']].map(([id, title]) => `<a href="#growth?direction=${esc(item.id)}" data-growth-scroll="growth-${id}">${title}</a>`).join('')}</nav>` + section('阶段学习路线', '阶段时长是内容建议，个人计划按测评结果与每周时间重新排期。', `<div class="growth-stages">${item.stages.map((stage, index) => `<details class="growth-stage" ${index === 0 ? 'open' : ''}><summary><span class="growth-stage-number">${index + 1}</span><span><strong>${esc(stage.title)}</strong><small>建议 ${esc(stage.weeks)} 周 · 先修：${esc(list(stage.prerequisites).map(plain).join('；') || '完成环境准备')}</small></span>${icon('chevron')}</summary><div class="growth-stage-body"><div><h4>阶段目标</h4>${ul(stage.goals)}<h4>工程任务</h4>${ul(stage.tasks)}</div><div><h4>需要交付</h4>${ul(stage.deliverables)}<h4>通过标准</h4>${ul(stage.acceptance)}</div></div></details>`).join('')}</div>`, 'growth-stages') + section('知识技能树', 'P0 核心必备，P1 进阶能力，P2 拓展。等级由 L0 至 L4；依赖关系与证据定义如下。', `<div class="growth-mastery-legend">${masteryLevels.map(level => `<span title="${esc(level.description)}"><b>L${esc(level.level)}</b>${esc(level.label)}</span>`).join('')}</div>${skillRows(item)}`, 'growth-skills') + section('真实业务工程项目', '按需求澄清、方案设计、实现、测试、上线与复盘组织，验收使用可复现材料。', `<article class="growth-project"><div class="growth-project-heading"><span class="tile-icon tone-green">${icon('code')}</span><div><h3>${esc(project.title)}</h3><p>${esc(project.scenario)}</p></div></div><p><strong>环境与约束：</strong>${esc(list(project.environment).map(plain).join('；'))}</p><div class="growth-two-columns"><div><h4>实施任务</h4>${ul(project.tasks)}</div><div><h4>提交材料</h4>${ul(project.deliverables)}</div></div><h4>项目验收表</h4><div class="growth-table-scroll"><table class="growth-table"><thead><tr><th>验收指标</th><th>通过目标</th><th>验证方法</th></tr></thead><tbody>${project.acceptance.map(check => `<tr><th scope="row">${esc(check.metric)}</th><td>${esc(check.target)}</td><td>${esc(check.method)}</td></tr>`).join('')}</tbody></table></div></article>`, 'growth-project') + section('经典问题与面试解析', '先作答，再按评分要点复盘。题目为编辑原创练习，未宣称来自具体公司。', `<div class="growth-questions">${item.questions.map(question => `<details class="growth-question"><summary><span><small>${esc(question.type)} · ${esc(question.origin || '站内原创')}</small><strong>${esc(question.title)}</strong></span>${icon('chevron')}</summary><div class="growth-question-answer"><h4>解析与推导</h4>${ul(question.answer)}<h4>评分要点</h4><ul class="growth-list">${list(question.scoring).map(point => `<li>${esc(point.point)} <strong>(${esc(point.points)} 分)</strong></li>`).join('')}</ul><h4>进一步追问</h4>${ul(question.followUps)}</div></details>`).join('')}</div>`, 'growth-questions') + section('优质学习资源', '根据阶段目标选择阅读内容，并完成相应练习产出。', recommended.length ? recommended.map(entry => `<div class="growth-resource-reason"><p><strong>推荐理由：</strong>${esc(entry.reason)}</p>${resourceRow(entry.resource, true)}</div>`).join('') : '<p class="growth-muted">资料正在补充，请先按阶段任务和验收标准推进。</p>', 'growth-resources') + section('可以准备的岗位', '', `<div class="growth-related-roles">${relatedRoles.map(job => `<a class="btn btn-secondary" href="${esc(href('role', { role: job.id }))}">${esc(job.title)}${icon('arrow')}</a>`).join('')}<a class="btn btn-primary" href="${esc(href('assessment', { role: relatedRoles[0]?.id || professionalRoles[0].id, mode: mode() }))}">测评并生成个人计划 ${icon('sliders')}</a></div>`) + footer();
  }
  function diagnostic(job, selectedMode = mode()) { return diagnoseRole(job.id, selectedMode, state); }
  function matchSummary(result, compact = false) {
    return `<div class="growth-match ${compact ? 'compact' : ''}"><strong>${result.score == null ? '待评估' : `${esc(result.score)}%`}</strong><span>已测知识达成度</span><div class="growth-meter"><span style="width:${Number(result.coverage) || 0}%"></span></div><small>证据覆盖 ${esc(result.coverage)}%${result.lowerBound != null && result.upperBound != null ? ` · 整体区间 ${esc(result.lowerBound)}–${esc(result.upperBound)}%` : ''}</small></div>`;
  }
  function roleCard(job) {
    const result = diagnostic(job);
    return `<article class="growth-role-card"><div class="growth-role-kicker"><span>${esc(dir(job.directionId)?.title)}</span><label><input type="checkbox" data-growth-compare="${esc(job.id)}" ${compareIds.includes(job.id) ? 'checked' : ''}>对比</label></div><h2><a href="${esc(href('role', { role: job.id, mode: mode() }))}">${esc(job.title)}</a></h2><p>${esc(job.summary)}</p>${pills(job.competencies.slice(0, 3).map(item => skill(item.skillId)?.title || item.skillId))}${matchSummary(result, true)}<a class="growth-card-link" href="${esc(href('role', { role: job.id, mode: mode() }))}">查看岗位能力模型 ${icon('arrow')}</a></article>`;
  }
  function rolesPage() {
    const p = params();
    const directionFilter = p.get('direction') || 'all';
    const q = (p.get('q') || '').slice(0, 100);
    const jobs = professionalRoles.filter(job => (directionFilter === 'all' || job.directionId === directionFilter) && `${job.title} ${job.summary} ${job.jdKeywords.map(item => item.keyword).join(' ')}`.toLowerCase().includes(q.toLowerCase()));
    return header('先看岗位，再安排学习。', '从职责、能力等级和真实产出理解主流岗位，用校招与社招两套能力基线对照自己的准备。', 'roles') + `<form id="growth-role-filter" class="growth-filter"><label>方向<select class="field-control" name="direction"><option value="all">全部方向</option>${professionalDirections.map(item => `<option value="${esc(item.id)}" ${directionFilter === item.id ? 'selected' : ''}>${esc(item.title)}</option>`).join('')}</select></label><label>招聘类型<select class="field-control" name="mode"><option value="campus" ${mode() === 'campus' ? 'selected' : ''}>校招能力基线</option><option value="social" ${mode() === 'social' ? 'selected' : ''}>社招能力基线</option></select></label><label class="growth-search-label">岗位或能力关键词<input class="field-control" name="q" value="${esc(q)}" placeholder="如：后端、可观测性、模型评估" maxlength="100"></label><button class="btn btn-secondary" type="submit">${icon('search')}筛选</button><span>${jobs.length} 个岗位</span></form><div class="growth-role-grid">${jobs.length ? jobs.map(roleCard).join('') : '<div class="growth-empty"><h2>没有匹配的岗位</h2><p>调整方向或关键词，再查看岗位能力模型。</p><a class="btn btn-secondary" href="#roles">重置筛选</a></div>'}</div>${comparison()}` + footer();
  }
  function comparison() {
    const jobs = compareIds.map(role).filter(Boolean);
    if (!jobs.length) return '<p class="growth-compare-hint">勾选岗位上的「对比」，可同时比较最多 3 个岗位。</p>';
    return section(`岗位对比 · ${jobs.length} / 3`, '使用相同招聘类型与个人测评记录进行比较。', `<button class="text-link" data-growth-clear-compare>清空对比</button><div class="growth-table-scroll"><table class="growth-table growth-compare-table"><thead><tr><th>能力维度</th>${jobs.map(job => `<th><a href="${esc(href('role', { role: job.id, mode: mode() }))}">${esc(job.title)}</a></th>`).join('')}</tr></thead><tbody><tr><th scope="row">核心职责</th>${jobs.map(job => `<td>${esc(job.summary)}</td>`).join('')}</tr><tr><th scope="row">当前匹配 / 证据覆盖</th>${jobs.map(job => { const result = diagnostic(job); return `<td>${result.score == null ? '待评估' : `${esc(result.score)}%`} / ${esc(result.coverage)}%</td>`; }).join('')}</tr><tr><th scope="row">关键能力</th>${jobs.map(job => `<td>${ul(job.competencies.map(item => `${skill(item.skillId)?.title || item.skillId} · 目标 L${mode() === 'social' ? item.socialLevel : item.campusLevel}`))}</td>`).join('')}</tr><tr><th scope="row">成果重点</th>${jobs.map(job => `<td>${ul(job.deliverables.map(item => `${artifactLabel(item.type)}：${artifactLabel(mode() === 'social' ? item.social : item.campus)}`))}</td>`).join('')}</tr></tbody></table></div>`);
  }
  function gapsMarkup(result, showAll = false) {
    const rows = showAll ? [...result.gaps, ...result.unassessed] : [...result.weaknesses, ...result.unassessed].slice(0, 8);
    const unique = [...new Map(rows.map(row => [row.skillId, row])).values()];
    return unique.length ? `<div class="growth-gap-list">${unique.map(gap => `<article><div><span class="growth-priority">${esc(gap.priority || 'P1')}</span><strong>${esc(gap.title)}</strong></div><p>${gap.currentLevel == null ? '未评估，尚不能判断差距' : `当前客观等级 L${esc(gap.currentLevel)} → 目标 L${esc(gap.targetLevel)}`}</p><small>目标 L${esc(gap.targetLevel)} · 权重 ${esc(gap.weight)} · ${esc(gap.source || '待补充客观证据')}</small></article>`).join('')}</div>` : '<p class="growth-muted">当前已评能力达到此岗位基线。继续补充项目证据，并定期进行新的客观测评。</p>';
  }
  function roleProjectMarkup(job) {
    const project = job.project || dir(job.directionId)?.project;
    if (!project) return '';
    return section('岗位工程项目与验收', '从岗位日常场景出发，按交付材料与可复现的验收方法准备项目证据。', `<article class="growth-project"><div class="growth-project-heading"><span class="tile-icon tone-green">${icon('code')}</span><div><h3>${esc(project.title)}</h3><p>${esc(project.scenario)}</p></div></div><p><strong>实验环境与约束：</strong>${esc(list(project.environment).map(plain).join('；'))}</p><div class="growth-two-columns"><div><h4>业务与工程任务</h4>${ul(project.tasks)}</div><div><h4>提交材料</h4>${ul(project.deliverables)}</div></div><h4>验收标准</h4><div class="growth-table-scroll"><table class="growth-table"><thead><tr><th>指标</th><th>练习目标</th><th>验证方法</th></tr></thead><tbody>${project.acceptance.map(item => `<tr><th scope="row">${esc(item.metric)}</th><td>${esc(item.target)}</td><td>${esc(item.method)}</td></tr>`).join('')}</tbody></table></div></article>`);
  }
  function rolePage() {
    const job = targetRole();
    const result = diagnostic(job);
    return header(job.title, job.summary, 'roles') + `<div class="growth-context"><a href="#roles">${icon('chevron')}全部岗位</a><span>${esc(dir(job.directionId)?.title)} / ${labelMode(mode())}基线</span></div><div class="growth-mode-switch" role="group" aria-label="招聘类型">${['campus', 'social'].map(value => `<a class="${mode() === value ? 'active' : ''}" href="${esc(href('role', { role: job.id, mode: value }))}">${labelMode(value)}</a>`).join('')}</div><div class="growth-role-intro"><div><h2>岗位画像与业务场景</h2>${ul(job.workScenes)}<h3>${labelMode(mode())}准备重点</h3>${ul(mode() === 'social' ? job.socialFocus : job.campusFocus)}</div>${matchSummary(result)}</div>` + section('能力模型', `${masteryLevels.map(level => `L${level.level} ${level.label}`).join('、')}。自评只作为学习安排参考。`, `<div class="growth-table-scroll"><table class="growth-table"><thead><tr><th>能力项</th><th>权重</th><th>校招目标</th><th>社招目标</th><th>我的客观证据</th></tr></thead><tbody>${job.competencies.map(item => `<tr><th scope="row">${esc(skill(item.skillId)?.title || item.skillId)}</th><td>${esc(item.weight)}</td><td>L${esc(item.campusLevel)}</td><td>L${esc(item.socialLevel)}</td><td>${esc(levelLabel(getSkillEvidence(state, item.skillId).level))}</td></tr>`).join('')}</tbody></table></div>`) + section('JD 能力词拆解', '把招聘描述翻译成可以练习、可以展示、可以被追问的能力证据。', `<div class="growth-jd-list">${job.jdKeywords.map(item => `<article><h3>${esc(item.keyword)}</h3><p>${esc(item.meaning)}</p><p><strong>可展示证据：</strong>${esc(item.evidence)}</p></article>`).join('')}</div>`) + section('产出物要求与适用性', '项目、竞赛、论文和开源贡献按岗位适用性准备；每项都应清楚说明个人贡献与验证方式。', `<div class="growth-deliverables">${job.deliverables.map(item => `<article><span class="growth-chip">${esc(artifactLabel(item.type))}</span><h3>${esc(item.title)}</h3><dl><dt>校招</dt><dd>${esc(artifactLabel(item.campus))}</dd><dt>社招</dt><dd>${esc(artifactLabel(item.social))}</dd><dt>质量标准</dt><dd>${esc(item.standard)}</dd></dl></article>`).join('')}</div>`) + roleProjectMarkup(job) + section('简历准备', '只写真实经历，保留指标定义、测量环境与本人贡献的可核对证据。', ul(job.resumeBullets)) + section('面试准备', '围绕基础推导、工程取舍、排障与项目证据进行模拟。', ul(job.interviewPrep)) + section('我的差距清单', '未评估内容单独保留，不能把未知能力当成零分或已掌握。', gapsMarkup(result, true)) + `<div class="growth-actions"><a class="btn btn-primary" href="${esc(href('assessment', { role: job.id, mode: mode() }))}">测评此岗位 ${icon('sliders')}</a><a class="btn btn-secondary" href="${esc(href('growth', { direction: job.directionId }))}">查看对应学习方向 ${icon('arrow')}</a><button class="btn btn-secondary" data-growth-make-plan="${esc(job.id)}" data-mode="${esc(mode())}">生成岗位学习计划 ${icon('calendar')}</button></div>` + footer();
  }
  function assessedSkills(job) {
    const core = job.competencies.slice().sort((a, b) => b.weight - a.weight).map(item => skill(item.skillId)).filter(Boolean);
    const extras = (dir(job.directionId)?.skills || []).filter(item => !core.some(node => node.id === item.id));
    return [...core, ...extras].slice(0, 6);
  }
  function relevantQuestions(job) { return assessmentQuestions.filter(question => question.directionId === job.directionId); }
  function assessmentPage() {
    const job = targetRole();
    const qs = relevantQuestions(job);
    const latest = state.attempts.filter(attempt => attempt.roleId === job.id).at(-1);
    const result = diagnostic(job, mode());
    return header('找到起点，给下一阶段一个具体目标。', '先选择岗位和可投入时间，再完成技能自评与方向客观题。诊断基于本地规则与已收集证据生成。', 'assessment') + `<form id="growth-assessment-form"><section class="growth-assessment-profile"><h2>01 / 目标与时间</h2><div class="growth-form-grid"><label>目标岗位<select class="field-control" name="roleId" data-growth-assessment-role>${professionalRoles.map(item => `<option value="${esc(item.id)}" ${item.id === job.id ? 'selected' : ''}>${esc(item.title)}</option>`).join('')}</select></label><label>招聘类型<select class="field-control" name="mode"><option value="campus" ${mode() === 'campus' ? 'selected' : ''}>校招</option><option value="social" ${mode() === 'social' ? 'selected' : ''}>社招</option></select></label><label>每周可投入（小时）<input class="field-control" name="hoursPerWeek" type="number" min="2" max="40" step="1" value="${esc(state.profile.hoursPerWeek)}" required></label><label>计划开始日期<input class="field-control" name="startDate" type="date" value="${esc(state.plan?.startDate || today())}" required></label></div></section><section class="growth-section"><div class="growth-section-heading"><h2>02 / 六项核心能力自评</h2><p>选择能被真实经历支撑的等级。自评与客观结果分别展示，自评不会直接变成匹配分数。</p></div><div class="growth-self-grid">${assessedSkills(job).map(item => `<label class="growth-self-item"><strong>${esc(item.title)}</strong><span>${esc(list(item.evidence).map(plain).join('；'))}</span><select class="field-control" name="self:${esc(item.id)}"><option value="">尚未自评</option>${masteryLevels.map(level => `<option value="${esc(level.level)}" ${state.selfLevels[item.id] === level.level ? 'selected' : ''}>L${esc(level.level)} · ${esc(level.label)}</option>`).join('')}</select></label>`).join('')}</div></section><section class="growth-section"><div class="growth-section-heading"><h2>03 / ${esc(dir(job.directionId)?.title)}客观诊断</h2><p>${qs.length} 道原创情境题，覆盖部分基础能力。题目数量有限，未覆盖能力会继续标记为未评估。</p></div><div class="growth-quiz-list">${qs.map((question, index) => `<fieldset class="growth-quiz"><legend><span>${index + 1}</span>${esc(question.title)}</legend><label class="growth-quiz-skip"><input type="radio" name="answer:${esc(question.id)}" value="" ${!Object.prototype.hasOwnProperty.call(state.answers, question.id) ? 'checked' : ''}><span>暂不作答，保留为未评估</span></label>${question.options.map((option, optionIndex) => `<label><input type="radio" name="answer:${esc(question.id)}" value="${optionIndex}" ${state.answers[question.id] === optionIndex ? 'checked' : ''}><span>${String.fromCharCode(65 + optionIndex)}. ${esc(option)}</span></label>`).join('')}${latest && Object.prototype.hasOwnProperty.call(latest.answers || {}, question.id) ? `<div class="growth-quiz-explanation"><strong>${latest.answers[question.id] === question.answer ? '本次作答正确' : '本次作答需复盘'} · 参考答案 ${String.fromCharCode(65 + question.answer)}</strong><p>${esc(question.explanation)}</p></div>` : ''}</fieldset>`).join('')}</div></section><div class="growth-actions"><button class="btn btn-primary" type="submit">${icon('check')}提交测评并生成计划</button><span class="growth-muted">可以跳过不确定的题，跳过内容保持未评估。</span></div></form>${latest ? section('最近一次诊断', `${new Date(latest.at).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })} · ${labelMode(mode())}`, `<div class="growth-diagnostic-summary">${matchSummary(result)}<div><h3>优先补齐与待验证</h3>${gapsMarkup(result)}<a class="btn btn-secondary" href="#plan">打开成长计划 ${icon('arrow')}</a></div></div>`) : ''}` + footer();
  }
  function planPage() {
    const plan = state.plan;
    if (!plan) return header('把差距，变成每周能完成的任务。', '完成一次岗位测评，或直接选择岗位生成学习计划。计划依据能力证据、先修关系和每周可用时间安排。', 'plan') + `<div class="growth-empty"><span class="tile-icon tone-green">${icon('calendar')}</span><h2>还没有个人成长计划</h2><p>明确目标与可用时间后，从当前能力开始安排下一步。</p><a class="btn btn-primary" href="#assessment">开始能力测评 ${icon('arrow')}</a></div>` + footer();
    const job = role(plan.roleId) || professionalRoles[0];
    const result = diagnostic(job, plan.mode);
    const completed = plan.tasks.filter(task => state.completed[task.id]);
    const completedHours = completed.reduce((sum, task) => sum + task.hours, 0);
    const percent = plan.tasks.length ? Math.round(completed.length / plan.tasks.length * 100) : 0;
    const weeks = [...new Set(plan.tasks.map(task => task.week))].sort((a, b) => a - b);
    return header('我的成长计划', `${job.title} · ${labelMode(plan.mode)} · 每周 ${plan.hoursPerWeek} 小时 · ${plan.weekCount} 周任务安排`, 'plan') + `<div class="growth-plan-toolbar"><p>开始日期 ${esc(plan.startDate)} · 内容版本 ${esc(plan.contentVersion)}<br><span>任务完成为自主记录，客观能力仍需测评和交付证据验证。</span></p><div class="growth-actions"><a class="btn btn-secondary" href="${esc(href('assessment', { role: plan.roleId, mode: plan.mode }))}">调整 / 重新测评 ${icon('sliders')}</a><button class="btn btn-secondary" data-growth-regenerate>重新生成 ${icon('calendar')}</button><button class="btn btn-secondary" data-growth-export="plan">${icon('download')}导出计划</button><button class="btn btn-secondary" data-growth-export="data">${icon('download')}备份记录</button></div></div><div class="growth-plan-metrics"><div><strong>${percent}%</strong><span>任务完成 ${completed.length} / ${plan.tasks.length}</span></div><div><strong>${esc(completedHours)} / ${esc(plan.totalHours)}h</strong><span>已完成 / 总估算工时</span></div><div><strong>${esc(result.coverage)}%</strong><span>客观证据覆盖度</span></div><div><strong>${result.score == null ? '待评估' : `${esc(result.score)}%`}</strong><span>已测知识达成度</span></div></div><div class="growth-progress-track" aria-label="任务完成进度 ${percent}%"><span style="width:${percent}%"></span></div><div class="growth-plan-layout"><div>${weeks.map(week => `<section class="growth-week"><header><h2>第 ${esc(week)} 周开始</h2><span>本批 ${plan.tasks.filter(task => task.week === week).reduce((sum, task) => sum + task.hours, 0)}h，可跨周 · ${plan.tasks.filter(task => task.week === week && state.completed[task.id]).length} / ${plan.tasks.filter(task => task.week === week).length} 已完成</span></header>${plan.tasks.filter(task => task.week === week).map(task => `<article class="growth-task ${state.completed[task.id] ? 'complete' : ''}"><div class="growth-task-head"><label><input type="checkbox" data-growth-complete="${esc(task.id)}" ${state.completed[task.id] ? 'checked' : ''}><strong>${esc(task.title)}</strong></label><span class="growth-chip">${{ skill: '技能训练', project: '工程项目', interview: '面试准备' }[task.kind] || esc(task.kind)}</span></div><p class="growth-task-schedule">${esc(taskSchedule(task))}</p><p>${esc(task.description)}</p><details><summary>交付物与验收标准 ${icon('chevron')}</summary><div class="growth-two-columns"><div><h4>提交材料</h4>${ul(task.deliverables)}</div><div><h4>验收标准</h4>${ul(task.acceptance)}</div></div></details>${state.completed[task.id] ? `<small>自主完成记录：${esc(new Date(state.completed[task.id]).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }))}</small>` : ''}</article>`).join('')}</section>`).join('')}</div><aside class="growth-plan-aside"><section><h2>薄弱项与待验证</h2><p>优先处理高权重差距，再补充未评估能力证据。</p>${gapsMarkup(result)}<a class="btn btn-secondary" href="${esc(href('assessment', { role: job.id, mode: mode() }))}">补充客观测评 ${icon('arrow')}</a></section><section><h2>阶段完成前检查</h2>${ul(['代码、环境和数据版本可复现', '验收指标有测量方法与记录', '明确本人贡献和失败尝试', '能解释关键取舍与适用边界'])}<a class="text-link" href="${esc(href('role', { role: job.id, mode: plan.mode }))}">对照岗位完整要求 ${icon('arrow')}</a></section></aside></div>` + footer();
  }
  function preview(pathId) {
    if (pathId == null) return `<section class="growth-preview"><span class="tile-icon tone-green">${icon('branch')}</span><div><h3>专业成长 · 从能力诊断到工程交付</h3><p>${professionalDirections.length} 个学习方向、${professionalRoles.length} 类岗位，将技能差距拆成带验收标准的每周任务。</p></div><a class="btn btn-secondary" href="#growth" data-growth-link>进入专业成长 ${icon('arrow')}</a></section>`;
    const item = professionalDirections.find(direction => direction.pathIds.includes(pathId));
    if (!item) return '';
    return `<section class="growth-preview"><span class="tile-icon tone-green">${icon('branch')}</span><div><h3>${esc(item.title)} · 专业能力与工程验收</h3><p>${item.skills.length} 项技能、${item.stages.length} 个阶段、业务项目与面试评分标准。</p></div><a class="btn btn-secondary" href="${esc(href('growth', { direction: item.id }))}" data-growth-link>打开专业路线 ${icon('arrow')}</a></section>`;
  }
  function page() {
    const route = location.hash.slice(1).split('?')[0];
    return route === 'roles' ? rolesPage() : route === 'role' ? rolePage() : route === 'assessment' ? assessmentPage() : route === 'plan' ? planPage() : directionsPage();
  }
  function search(q) {
    const query = String(q || '').trim().toLowerCase();
    if (!query) return { count: 0, markup: '' };
    const directions = professionalDirections.filter(item => `${item.title} ${item.description} ${item.skills.map(node => node.title).join(' ')}`.toLowerCase().includes(query));
    const jobs = professionalRoles.filter(item => `${item.title} ${item.summary} ${item.jdKeywords.map(word => word.keyword).join(' ')}`.toLowerCase().includes(query));
    return { count: directions.length + jobs.length, markup: directions.length || jobs.length ? `<section class="growth-search-results"><h2 class="search-heading">专业成长与岗位</h2>${[...directions.map(item => ({ title: item.title, description: item.description, url: href('growth', { direction: item.id }) })), ...jobs.map(item => ({ title: item.title, description: item.summary, url: href('role', { role: item.id }) }))].map(item => `<a href="${esc(item.url)}"><strong>${esc(item.title)}</strong><span>${esc(item.description)}</span>${icon('arrow')}</a>`).join('')}</section>` : '' };
  }
  function readAssessment(form) {
    const data = new FormData(form);
    const selectedRole = role(String(data.get('roleId'))) || professionalRoles[0];
    const hours = Number(data.get('hoursPerWeek'));
    state.profile = { roleId: selectedRole.id, mode: data.get('mode') === 'social' ? 'social' : 'campus', hoursPerWeek: Number.isInteger(hours) && hours >= 2 && hours <= 40 ? hours : state.profile.hoursPerWeek };
    for (const [key, value] of data) {
      if (key.startsWith('self:')) { if (value === '') delete state.selfLevels[key.slice(5)]; else state.selfLevels[key.slice(5)] = Number(value); }
    }
    return data;
  }
  function makePlan(roleId, selectedMode = state.profile.mode) {
    const job = role(roleId) || professionalRoles[0];
    state.profile.roleId = job.id;
    state.profile.mode = selectedMode;
    const date = state.plan?.startDate || today();
    state.plan = buildLearningPlan({ roleId: job.id, mode: selectedMode, hoursPerWeek: state.profile.hoursPerWeek, startDate: date }, state);
    const ok = persist();
    if (ok) toast('成长计划已生成，历史完成记录已保留。');
    go('plan');
  }
  function exportPlan() {
    const plan = state.plan;
    if (!plan) return;
    const job = role(plan.roleId);
    const text = [`# 知序成长计划 · ${job?.title || plan.roleId}`, `类型：${labelMode(plan.mode)} | 开始：${plan.startDate} | 每周：${plan.hoursPerWeek}h | 总计：${plan.totalHours}h`, `内容版本：${plan.contentVersion}`, '任务勾选为自主完成记录；匹配不是录取概率。', '', ...plan.tasks.flatMap(task => [`## ${state.completed[task.id] ? '[x]' : '[ ]'} ${task.title} · ${taskSchedule(task)}`, task.description, '交付：', ...list(task.deliverables).map(value => `- ${plain(value)}`), '验收：', ...list(task.acceptance).map(value => `- ${plain(value)}`), ''])].join('\n');
    exportFile(`知序-${job?.title || '个人'}-成长计划.md`, text);
    toast('学习计划已导出');
  }
  document.addEventListener('submit', event => {
    if (event.target.id === 'growth-role-filter') {
      event.preventDefault();
      const data = new FormData(event.target);
      go(href('roles', { direction: data.get('direction'), mode: data.get('mode'), q: String(data.get('q') || '').trim() }).slice(1));
    }
    if (event.target.id === 'growth-assessment-form') {
      event.preventDefault();
      if (!event.target.reportValidity()) return;
      const data = readAssessment(event.target);
      const job = role(state.profile.roleId);
      const answers = {};
      for (const question of relevantQuestions(job)) {
        const value = data.get(`answer:${question.id}`);
        if (value !== null && value !== '') { answers[question.id] = Number(value); state.answers[question.id] = Number(value); }
        else delete state.answers[question.id];
      }
      state.attempts.push({ id: `attempt-${Date.now()}`, at: new Date().toISOString(), roleId: job.id, answers });
      state.attempts = state.attempts.slice(-20);
      const date = String(data.get('startDate')) || today();
      state.plan = buildLearningPlan({ ...state.profile, startDate: date }, state);
      const ok = persist();
      if (ok) toast('测评已保存，个人成长计划已生成。下方可查看答案解析。');
      history.replaceState(null, '', href('assessment', { role: job.id, mode: state.profile.mode }));
      render();
      document.querySelector('.growth-diagnostic-summary')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  document.addEventListener('change', event => {
    const target = event.target;
    if (target.matches('[data-growth-assessment-role]')) {
      readAssessment(target.closest('form'));
      persist();
      go(href('assessment', { role: target.value, mode: state.profile.mode }).slice(1));
    }
    if (target.matches('[data-growth-complete]')) {
      const task = state.plan?.tasks.find(item => item.id === target.dataset.growthComplete);
      if (!task) return;
      if (target.checked) state.completed[task.id] = new Date().toISOString(); else delete state.completed[task.id];
      persist();
      render();
    }
    if (target.matches('[data-growth-compare]')) {
      const id = target.dataset.growthCompare;
      if (!role(id)) return;
      if (target.checked && compareIds.length >= 3) { target.checked = false; toast('最多同时比较 3 个岗位。'); return; }
      compareIds = target.checked ? [...new Set([...compareIds, id])] : compareIds.filter(item => item !== id);
      render();
    }
  });
  document.addEventListener('click', event => {
    const target = event.target.closest('button,a');
    if (!target) return;
    if (target.matches('[data-growth-link]')) closeDialog();
    if (target.matches('[data-growth-scroll]')) { event.preventDefault(); document.getElementById(target.dataset.growthScroll)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    if (target.matches('[data-growth-clear-compare]')) { compareIds = []; render(); }
    if (target.matches('[data-growth-make-plan]')) makePlan(target.dataset.growthMakePlan, target.dataset.mode === 'social' ? 'social' : 'campus');
    if (target.matches('[data-growth-regenerate]')) makePlan(state.plan.roleId, state.plan.mode);
    if (target.matches('[data-growth-export="plan"]')) exportPlan();
    if (target.matches('[data-growth-export="data"]')) { exportFile('知序-专业成长记录.json', JSON.stringify(state, null, 2)); toast('成长记录备份已导出'); }
  });
  return { page, preview, search };
}
