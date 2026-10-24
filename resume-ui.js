import { createResumeState, sanitizeResumeState, analyzeResume, buildResumeDocument, getResumeValidation } from './resume-core.js';
import { downloadResume } from './resume-export.js';
import { createResumeAIRequest, applyResumeAIPlan } from './resume-ai-core.js';
import { RESUME_TEMPLATES, getResumeTemplate, resumeTemplateStyle } from './resume-templates.js';

// Resume drafts and delegated events stay separate from interview records.
export function createResume({ paths = [], icon = () => '', e = value => String(value ?? ''), toast = () => {}, render = () => {} }) {
  const modelIdPattern = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,99}$/;
  const storageKey = 'zhixu-resume-v1';
  let state;
  let storageAvailable = true;
  let photoJob = 0;
  let exporting = false;
  let pendingAction = '';
  let generating = false;
  let generatingIntent = 'generate';
  let generationError = '';
  let generationController;
  let models = [{ id: 'gpt-6-astra', name: 'GPT-6 Astra' }], modelsStatus = 'idle';
  let defaultModel = 'gpt-6-astra';
  async function loadModels() {
    if (modelsStatus !== 'idle') return;
    modelsStatus = 'loading';
    try {
      const response = await fetch('./api/resume/models', { cache: 'no-store', signal: AbortSignal.timeout(20000) });
      if (!response.ok) throw new Error();
      const body = await response.json();
      const available = array(body.models).filter(item => modelIdPattern.test(item?.id || ''));
      if (!available.length) throw new Error();
      models = available;
      defaultModel = typeof body.defaultModel === 'string' ? body.defaultModel : models[0].id;
      if (state.aiModel && !models.some(item => item.id === state.aiModel)) { state.aiModel = ''; persist(true); }
      modelsStatus = 'ready';
    } catch { modelsStatus = 'error'; }
    if (document.getElementById('resume-builder') && state.step === 4 && !generating) render();
  }
  const fallback = roleId => createResumeState(roleId || '');
  function load(roleId = '') {
    try {
      const raw = JSON.parse(localStorage.getItem(storageKey) || 'null');
      state = sanitizeResumeState(raw || fallback(roleId));
      storageAvailable = true;
    } catch {
      state = sanitizeResumeState(fallback(roleId));
      storageAvailable = false;
    }
    if (state.aiModel && !modelIdPattern.test(state.aiModel)) { state.aiModel = ''; persist(true); }
    if (!state.target?.roleId && roleId) state.target.roleId = roleId;
    const path = paths.find(item => item.id === state.target?.roleId || item.id === roleId);
    if (path && !state.target.roleTitle) state.target.roleTitle = path.title;
    if (roleId && !state.target.roleId) state.target.roleId = roleId;
  }
  load();
  const esc = value => e(String(value ?? ''));
  const uid = prefix => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  const array = value => Array.isArray(value) ? value : [];
  const text = value => String(value ?? '');
  function persist(silent = false) {
    state.updatedAt = new Date().toISOString();
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
      storageAvailable = true;
      return true;
    } catch {
      storageAvailable = false;
      if (!silent) toast('浏览器无法保存简历草稿，本次操作仍保留在当前页面。请尽快导出。');
      return false;
    }
  }
  function currentRole() {
    return paths.find(item => item.id === state.target?.roleId);
  }
  function val(path, fallbackValue = '') {
    return path.split('.').reduce((result, key) => result == null ? undefined : result[key], state) ?? fallbackValue;
  }
  function setValue(path, value) {
    const keys = path.split('.');
    let target = state;
    keys.forEach((key, index) => {
      if (index === keys.length - 1) target[key] = value;
      else {
        const next = keys[index + 1];
        if (target[key] == null) target[key] = /^\d+$/.test(next) ? [] : {};
        target = target[key];
      }
    });
  }
  function validation(step = state.step) {
    try { return getResumeValidation(state, step) || {}; } catch { return {}; }
  }
  function validationErrors(step = state.step) {
    const result = validation(step);
    if (Array.isArray(result)) return result.filter(Boolean);
    if (typeof result === 'string') return result ? [result] : [];
    if (Array.isArray(result.errors)) return result.errors.filter(Boolean).map(item => item.message || item);
    return result.valid === false ? [result.message || '请先补齐本步骤的必填内容。'] : [];
  }
  function normalizeEntry(kind, item = {}) {
    if (kind === 'education') return { id: item.id || uid('edu'), school: text(item.school), degree: text(item.degree), major: text(item.major), start: text(item.start), end: text(item.end), details: text(item.details) };
    if (kind === 'experience') return { id: item.id || uid('exp'), company: text(item.company), title: text(item.title), start: text(item.start), end: text(item.end), details: text(item.details) };
    return { id: item.id || uid('project'), name: text(item.name), role: text(item.role), start: text(item.start), end: text(item.end), details: text(item.details) };
  }
  function addEntry(kind) { if (array(state[kind]).length >= (kind === 'education' ? 12 : 20)) { toast('已达到本模块可添加的经历数量。'); return; } state[kind] = [...array(state[kind]), normalizeEntry(kind)]; markStale(); persist(); render(); }
  function removeEntry(kind, index) { state[kind] = array(state[kind]).filter((_, itemIndex) => itemIndex !== Number(index)); markStale(); persist(); render(); }
  function markStale() { if (state.document) state.documentStale = true; const hint = document.querySelector('#resume-builder .resume-stale'); if (hint) hint.hidden = !state.document; }
  function input(label, path, options = {}) {
    const { type = 'text', placeholder = '', wide = false, required = false, maxlength = '', rows = 0, hint = '' } = options;
    const value = esc(val(path));
    const control = rows
      ? `<textarea class="field-control" data-resume-field="${esc(path)}" rows="${rows}" maxlength="${maxlength}" placeholder="${esc(placeholder)}"${required ? ' required' : ''}>${value}</textarea>`
      : `<input class="field-control" data-resume-field="${esc(path)}" type="${type}" value="${value}" maxlength="${maxlength}" placeholder="${esc(placeholder)}"${required ? ' required' : ''}>`;
    return `<label class="resume-field ${wide ? 'wide' : ''}"><span>${esc(label)}${required ? ' <b aria-hidden="true">*</b>' : ''}</span>${control}${hint ? `<small>${esc(hint)}</small>` : ''}</label>`;
  }
  function photoMarkup() {
    return `<div class="resume-photo-row"><div class="resume-photo">${state.photo ? `<img src="${esc(state.photo)}" alt="证件照预览">` : icon('users')}</div><div><div class="resume-photo-controls"><label class="btn btn-secondary resume-upload">${icon('upload')}${state.photo ? '更换照片' : '上传照片'}<input class="resume-photo-input" type="file" accept="image/jpeg,image/png,image/webp" data-resume-photo></label>${state.photo ? '<button type="button" class="btn btn-secondary" data-resume-remove-photo>移除照片</button>' : ''}</div><p class="resume-photo-hint">支持 JPG、PNG、WebP，最大 5MB。照片只在当前浏览器处理和保存，不会上传服务器。</p></div></div>`;
  }
  function basicStep() {
    return `<div class="resume-section-head"><div><h3>基本信息与证件照</h3><p>先填写可联系、可核验的基础信息。姓名与至少一种联系方式是生成简历的最低要求。</p></div></div><div class="resume-form-grid">${input('姓名', 'basics.name', { required: true, maxlength: 60, placeholder: '如：张三' })}${input('手机', 'basics.phone', { type: 'tel', maxlength: 40, placeholder: '如：13800000000' })}${input('邮箱', 'basics.email', { type: 'email', maxlength: 120, placeholder: 'name@example.com' })}${input('所在城市', 'basics.city', { maxlength: 40, placeholder: '如：杭州' })}${input('个人主页 / GitHub', 'basics.website', { wide: true, maxlength: 200, placeholder: 'https://github.com/your-name' })}${input('一句话定位', 'basics.summary', { wide: true, rows: 3, maxlength: 500, placeholder: '如：关注可靠性与性能的后端工程师，擅长用可观测证据推进问题闭环。' })}</div>${photoMarkup()}<p class="resume-feedback" data-resume-feedback></p>`;
  }
  function educationItem(item, index) {
    const p = `education.${index}`;
    return `<article class="resume-repeat"><header><strong>教育经历 ${index + 1}</strong>${`<button type="button" class="resume-remove" data-resume-remove="education" data-index="${index}">${icon('close')}移除</button>`}</header><div class="resume-form-grid">${input('学校', `${p}.school`, { required: true, maxlength: 100, placeholder: '学校名称' })}${input('学位', `${p}.degree`, { maxlength: 50, placeholder: '本科 / 硕士' })}${input('专业', `${p}.major`, { maxlength: 80, placeholder: '计算机科学与技术' })}${input('开始时间', `${p}.start`, { maxlength: 30, placeholder: '2021.09' })}${input('结束时间', `${p}.end`, { maxlength: 30, placeholder: '2025.06 / 至今' })}${input('补充说明', `${p}.details`, { wide: true, rows: 2, maxlength: 300, placeholder: 'GPA、核心课程、奖学金等可核验信息' })}</div></article>`;
  }
  function educationStep() {
    const entries = array(state.education);
    return `<div class="resume-section-head"><div><h3>教育背景</h3><p>保留学校、专业与时间线；成绩和荣誉请填写真实可核验内容。</p></div><button type="button" class="btn btn-secondary" data-resume-add="education">${icon('plus')}添加教育经历</button></div>${entries.length ? entries.map(educationItem).join('') : '<p class="resume-local-note">还没有教育经历，点击右上角添加一条。没有相关经历时也可以继续下一步。</p>'}<p class="resume-feedback" data-resume-feedback></p>`;
  }
  function experienceItem(item, index) {
    const p = `experience.${index}`;
    return `<article class="resume-repeat"><header><strong>工作 / 实习经历 ${index + 1}</strong><button type="button" class="resume-remove" data-resume-remove="experience" data-index="${index}">${icon('close')}移除</button></header><div class="resume-form-grid">${input('公司 / 团队', `${p}.company`, { maxlength: 100, placeholder: '公司或团队名称' })}${input('职位', `${p}.title`, { maxlength: 80, placeholder: '后端开发实习生' })}${input('开始时间', `${p}.start`, { maxlength: 30, placeholder: '2024.07' })}${input('结束时间', `${p}.end`, { maxlength: 30, placeholder: '2024.10 / 至今' })}${input('工作内容与结果', `${p}.details`, { wide: true, rows: 5, maxlength: 1500, placeholder: '按“做了什么—怎么做—结果如何”填写，尽量保留指标口径与本人贡献。' })}</div></article>`;
  }
  function projectItem(item, index) {
    const p = `projects.${index}`;
    return `<article class="resume-repeat"><header><strong>项目经历 ${index + 1}</strong><button type="button" class="resume-remove" data-resume-remove="projects" data-index="${index}">${icon('close')}移除</button></header><div class="resume-form-grid">${input('项目名称', `${p}.name`, { maxlength: 100, placeholder: '双人协作闯关与性能优化' })}${input('个人角色', `${p}.role`, { maxlength: 80, placeholder: '客户端负责人' })}${input('开始时间', `${p}.start`, { maxlength: 30, placeholder: '2024.03' })}${input('结束时间', `${p}.end`, { maxlength: 30, placeholder: '2024.06' })}${input('项目内容与个人贡献', `${p}.details`, { wide: true, rows: 5, maxlength: 1800, placeholder: '写清业务场景、技术方案、关键取舍、验收指标和你的实际贡献。' })}</div></article>`;
  }
  function experienceStep() {
    return `<div class="resume-section-head"><div><h3>工作 / 实习与项目</h3><p>用事实和结果组织经历，避免编造团队规模、业务数据或个人职责。</p></div></div><h4 class="resume-block-label">工作 / 实习经历</h4>${array(state.experience).map(experienceItem).join('')}<button type="button" class="btn btn-secondary resume-add" data-resume-add="experience">${icon('plus')}添加工作 / 实习经历</button><h4 class="resume-block-label">项目经历</h4>${array(state.projects).map(projectItem).join('')}<button type="button" class="btn btn-secondary resume-add" data-resume-add="projects">${icon('plus')}添加项目经历</button><p class="resume-feedback" data-resume-feedback></p>`;
  }
  function targetRoleOptions() {
    const roleId = state.target?.roleId || '';
    return `<select class="field-control" data-resume-field="target.roleId"><option value="">请选择目标岗位</option>${paths.map(item => `<option value="${esc(item.id)}" ${item.id === roleId ? 'selected' : ''}>${esc(item.title)}</option>`).join('')}</select>`;
  }
  function targetStep() {
    return `<div class="resume-section-head"><div><h3>技能、证书与目标 JD / HC</h3><p>填写目标岗位的招聘要求与团队职责，突出相关经历。</p></div></div><div class="resume-form-grid"><label class="resume-field"><span>目标岗位</span>${targetRoleOptions()}</label>${input('岗位名称（可自定义）', 'target.roleTitle', { maxlength: 100, placeholder: currentRole()?.title || '如：游戏客户端工程师' })}${input('目标公司 / 团队', 'target.company', { maxlength: 120, placeholder: '公司或团队名称' })}<label class="resume-field"><span>准备类型</span><select class="field-control" data-resume-field="target.mode"><option value="campus" ${state.target.mode === 'campus' ? 'selected' : ''}>校招</option><option value="social" ${state.target.mode === 'social' ? 'selected' : ''}>社招</option></select></label>${input('技能', 'skills', { wide: true, rows: 3, maxlength: 1200, placeholder: '如：TypeScript、Unity、C++、网络同步、性能分析；用逗号或换行分隔。' })}${input('证书 / 奖项', 'certificates', { wide: true, rows: 2, maxlength: 800, placeholder: '如：英语六级、ACM 区域赛、云计算认证；没有可留空。' })}${input('岗位 JD', 'target.jd', { wide: true, rows: 7, maxlength: 6000, placeholder: '粘贴职位描述、必备技能和加分项。' })}${input('团队 HC / 职级 / 职责描述', 'target.hc', { wide: true, rows: 5, maxlength: 5000, placeholder: '粘贴团队当前招聘名额、职级、业务职责与人员需求；未知可留空。' })}</div><div class="resume-local-note"><label class="resume-switch"><input type="checkbox" data-resume-optimize ${state.optimize ? 'checked' : ''}><span><strong>根据 JD / HC 优化简历结构</strong><small>优先展示相关经历，保留你填写的真实成果。</small></span></label></div><p class="resume-feedback" data-resume-feedback></p>`;
  }
  function highlight(content) {
    const words = array(state.document?.keywords).filter(Boolean).sort((a, b) => b.length - a.length);
    if (!words.length) return esc(content);
    const pattern = new RegExp(words.map(word => '(?<![A-Za-z0-9_])' + word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![A-Za-z0-9_])').join('|'), 'giu');
    let cursor = 0, output = '';
    for (const match of text(content).matchAll(pattern)) { output += esc(text(content).slice(cursor, match.index)) + '<mark>' + esc(match[0]) + '</mark>'; cursor = match.index + match[0].length; }
    return output + esc(text(content).slice(cursor));
  }
  function editable(path, content, tag = 'span', className = '') {
    return `<${tag} class="${className}" role="textbox" aria-label="${esc(path === 'name' ? '简历姓名' : path === 'headline' ? '简历目标岗位' : path === 'summary' ? '简历个人简介' : '简历内容：' + text(content).slice(0, 32))}" contenteditable="${generating ? 'false' : 'plaintext-only'}" spellcheck="false" data-resume-edit="${esc(path)}">${highlight(content)}</${tag}>`;
  }
  function docSection(section, sectionIndex) {
    const items = array(section.items);
    if (!items.length) return '';
    const p = `sections.${sectionIndex}`;
    return `<section class="resume-paper-section"><h2>${editable(`${p}.title`, section.title || '')}</h2>${items.map((item, index) => `<article class="resume-paper-item">${item.title || item.date ? `<div class="resume-paper-item-head"><strong>${editable(`${p}.items.${index}.title`, item.title || '', 'span')}</strong>${item.date ? editable(`${p}.items.${index}.date`, item.date, 'span', 'resume-paper-date') : ''}</div>` : ''}${item.subtitle ? editable(`${p}.items.${index}.subtitle`, item.subtitle, 'div', 'resume-paper-subtitle') : ''}${array(item.bullets).length ? `<ul class="resume-paper-bullets">${item.bullets.map((bullet, bulletIndex) => `<li>${editable(`${p}.items.${index}.bullets.${bulletIndex}.text`, bullet.text || '', 'span')}</li>`).join('')}</ul>` : ''}</article>`).join('')}</section>`;
  }
  function templatePicker() {
    return `<fieldset class="resume-template-picker"><legend>简历风格</legend><div class="resume-template-options">${RESUME_TEMPLATES.map(template => `<button type="button" class="resume-template-option" data-resume-template-choice="${template.id}" style="${resumeTemplateStyle(template)}" aria-pressed="${state.templateId === template.id}"><span class="resume-template-thumb" aria-hidden="true"><i></i><i></i><i></i><b></b></span><span class="resume-template-option-copy"><strong>${esc(template.name)}</strong><small>${esc(template.caption)}</small></span><span class="resume-template-swatches" aria-hidden="true"><i style="background:${template.palette.background}"></i><i style="background:${template.palette.accent}"></i><i style="background:${template.palette.ink}"></i></span></button>`).join('')}</div></fieldset>`;
  }

  function previewDocument(doc) {
    if (!doc) return `<div class="resume-preview-empty">${icon('file')}<h3>你的下一份简历，从这里开始</h3><p>让真实的经历，被合适的岗位看见。</p><span class="resume-empty-label">个人信息 · 教育背景 · 经历与技能</span></div>`;
    const contacts = array(doc.contacts), template = getResumeTemplate(doc.templateId);
    return `<div class="resume-preview-viewport"><article class="resume-paper" data-resume-template="${template.id}" style="${resumeTemplateStyle(template)}"><header class="resume-paper-header"><div class="resume-paper-identity"><h1>${editable('name', doc.name || '', 'span')}</h1>${doc.headline ? editable('headline', doc.headline, 'div', 'resume-paper-headline') : ''}<div class="resume-paper-contacts">${contacts.map((contact, index) => editable(`contacts.${index}`, contact, 'span')).join('')}</div></div>${doc.photo ? `<img class="resume-paper-photo" src="${esc(doc.photo)}" alt="证件照">` : ''}</header>${doc.summary ? editable('summary', doc.summary, 'p', 'resume-paper-summary') : ''}${array(doc.sections).map(docSection).join('')}</article></div><p class="resume-preview-note">个人简历草稿 · 仅保存在当前浏览器</p>${state.documentEdited ? '<p class="resume-edited">当前预览包含在线编辑内容，关键词分析仍以表单证据为准。</p>' : ''}`;
  }
  function analysisMarkup() {
    if (!state.document) return '';
    let result = {};
    try { result = analyzeResume(state) || {}; } catch { result = {}; }
    const matched = array(result.matchedKeywords || result.matches || result.hitKeywords);
    const missing = array(result.missingKeywords || result.gaps || result.missing);
    const suggestions = array(result.suggestions || result.recommendations);
    const score = result.score ?? result.coverage ?? null;
    return `<section class="resume-analysis"><h3>JD / HC 匹配诊断</h3>${state.generation?.mode === 'ai' ? `<p class="resume-ai-result">${icon('spark')}AI 已优化 · ${esc(state.generation.model)}</p>` : ''}<div class="resume-analysis-stat"><div><strong>${score == null ? '—' : `${esc(score)}${typeof score === 'number' && score <= 1 ? '' : '%'}`}</strong><span>表单证据覆盖度</span></div><div><strong>${matched.length}</strong><span>已命中关键词</span></div><div><strong>${missing.length}</strong><span>待补充关键词</span></div></div><p>以下结果仅分析你填写的经历、技能和目标文本，不代表录用概率，也不会虚构 HC 信息。</p>${matched.length ? `<h4>已命中 · 表单证据</h4><div class="resume-keywords match">${matched.map(word => `<span>${esc(word.keyword || word)}</span>`).join('')}</div>` : ''}${missing.length ? `<h4>待补充或待证明</h4><div class="resume-keywords gap">${missing.map(word => `<span>${esc(word.keyword || word)}</span>`).join('')}</div>` : ''}${suggestions.length ? `<h4>表达建议</h4><ul>${suggestions.map(item => `<li>${esc(item.text || item)}</li>`).join('')}</ul>` : ''}${state.generation?.suggestions?.length ? `<h4>AI 表达建议</h4><ul>${state.generation.suggestions.map(item => `<li>${esc(item)}</li>`).join('')}</ul>` : ''}</section>`;
  }
  function previewPanel() {
    const generated = !!state.document;
    return `<aside class="resume-preview-panel"><div class="resume-preview-toolbar"><div><h3>简历预览</h3><small>${exporting ? '正在导出…' : generated ? 'A4 排版 · 长内容自动分页导出' : '尚未生成'}</small></div>${generated || state.step === 4 ? `<div class="resume-export-actions">${state.step === 4 ? `<button type="button" class="btn btn-secondary" data-resume-polish title="根据当前填写内容与目标 JD / HC 润色简历" ${exporting || generating ? 'disabled' : ''}>${icon('spark')}AI 润色</button>` : ''}${generated ? `<button type="button" class="btn btn-secondary" data-resume-export="pdf" ${exporting || generating ? 'disabled' : ''}>${icon('download')}PDF</button><button type="button" class="btn btn-secondary" data-resume-export="png" title="单页下载 PNG，多页 PNG 打包为 ZIP 下载" ${exporting || generating ? 'disabled' : ''}>${icon('download')}PNG 图片</button>` : ''}</div>` : ''}</div><p class="resume-stale" ${state.documentStale && generated ? '' : 'hidden'}>表单已修改，预览仍为上次生成的版本。重新生成后将使用最新表单。</p>${previewDocument(state.document)}${analysisMarkup()}</aside>`;
  }
  function aiOptions() {
    const selected = state.aiModel || '';
    const options = models.some(item => item.id === selected) || !selected ? models : [{ id: selected, name: selected }, ...models];
    return `<div class="resume-ai-settings"><label class="resume-switch"><input type="checkbox" data-resume-ai ${state.useAI ? 'checked' : ''}><span><strong>使用 AI 优化简历</strong><small>根据岗位需求润色已有经历，保留真实成果。</small></span></label><label class="resume-field"><span>模型</span><select class="field-control" data-resume-field="aiModel" ${state.useAI ? '' : 'disabled'}><option value="">默认 · ${esc(defaultModel)}</option>${options.map(item => `<option value="${esc(item.id)}" ${selected === item.id ? 'selected' : ''}>${esc(item.name)}</option>`).join('')}</select></label>${modelsStatus === 'loading' ? '<small role="status">正在获取可用模型…</small>' : modelsStatus === 'error' ? '<small>模型列表暂不可用，请检查服务配置后重试。</small><button type="button" class="text-link" data-resume-models-retry>重新加载模型</button>' : ''}<p class="resume-ai-privacy">AI 将处理经历、技能与岗位需求文本；姓名、联系方式和照片保留在本地。</p></div>`;
  }
  function formStep() {
    if (state.step === 0) return basicStep();
    if (state.step === 1) return educationStep();
    if (state.step === 2) return experienceStep();
    if (state.step === 3) return targetStep();
    if (generating) return `<div class="resume-generating" role="status" aria-live="polite">${icon('clock')}<div><h3>${generatingIntent === 'polish' ? 'AI 正在润色简历' : 'AI 正在优化简历'}</h3><p>正在分析岗位需求、梳理经历与核对事实，请稍候。</p><small>${esc(state.aiModel || defaultModel)}</small></div></div><button type="button" class="btn btn-secondary" data-resume-cancel-ai>取消${generatingIntent === 'polish' ? '润色' : '生成'}</button>`;
    if (pendingAction) return `<div class="resume-local-note" role="alert"><h3>${pendingAction === 'polish' ? '用 AI 润色当前简历？' : '重新生成简历？'}</h3><p>${pendingAction === 'polish' ? 'AI 将基于当前填写内容与目标 JD / HC 重新整理预览，在线编辑内容会被替换。' : '预览中的在线编辑将被最新表单内容替换。'}</p><div class="resume-main-actions"><button type="button" class="btn btn-primary" data-resume-confirm-action="${pendingAction}">确认${pendingAction === 'polish' ? ' AI 润色' : '重新生成'}</button><button type="button" class="btn btn-secondary" data-resume-cancel-generate>保留当前编辑</button></div></div>`;
    return `<div class="resume-section-head"><div><h3>生成与预览</h3><p>确认你的目标岗位与经历。</p></div></div><div class="resume-target-context">${esc(state.target.roleTitle || currentRole()?.title || '未选择岗位')}${state.target.company ? ` · ${esc(state.target.company)}` : ''} · ${state.target.mode === 'social' ? '社招' : '校招'}</div>${templatePicker()}${aiOptions()}<div class="resume-main-actions">${state.useAI ? `<button type="button" class="btn btn-primary" data-resume-quick-local>${icon('file')}本地生成预览</button>` : ''}<button type="button" class="btn ${state.useAI ? 'btn-secondary' : 'btn-primary'}" data-resume-generate>${icon('spark')}${state.document ? '重新生成预览' : state.useAI ? 'AI 生成简历预览' : '生成简历预览'}</button><button type="button" class="btn btn-secondary" data-resume-step="3">返回修改目标 JD / HC</button></div>${generationError ? `<div class="resume-ai-error" role="alert"><p>${esc(generationError)}</p><button type="button" class="btn btn-secondary" data-resume-local>使用本地排版</button></div>` : ''}<p class="resume-feedback" data-resume-feedback></p>`;
  }
  function page({ roleId = '', companyId = '' } = {}) {
    if (!state) load(roleId);
    if (modelsStatus === 'idle') loadModels();
    if (roleId && !state.target.roleId) { state.target.roleId = roleId; state.target.roleTitle = paths.find(item => item.id === roleId)?.title || ''; persist(true); }
    if (companyId && !state.target.company) { state.target.company = companyId; persist(true); }
    const steps = ['基本信息', '教育背景', '经历与项目', '技能与目标', '生成与预览'];
    return `<div id="resume-builder" data-resume-step-current="${state.step}"><div class="resume-intro"><div><div class="eyebrow">ZHIXU / SMART RESUME</div><h2>智能简历生成</h2><p>填写真实经历，粘贴目标岗位 JD 与已知 HC 描述，生成规范的 A4 简历并获得可解释的匹配提示。</p></div><span class="resume-storage">${storageAvailable ? '草稿已保存在当前浏览器' : '当前仅保留会话草稿'}</span></div><nav class="resume-steps" aria-label="简历生成步骤">${steps.map((label, index) => `<button type="button" class="resume-step ${state.step === index ? 'active' : ''}" data-resume-step="${index}" ${generating ? 'disabled' : ''} aria-current="${state.step === index ? 'step' : 'false'}"><span>${index + 1}</span>${esc(label)}</button>`).join('')}</nav><div class="resume-layout ${state.step === 4 ? 'is-preview' : ''}"><section class="resume-form-panel"><form id="resume-form" novalidate>${formStep()}<div class="resume-form-foot"><small>第 ${state.step + 1} / ${steps.length} 步 · ${state.updatedAt ? `上次保存 ${esc(new Date(state.updatedAt).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }))}` : '尚未保存'}</small><div>${state.step > 0 ? '<button type="button" class="btn btn-secondary" data-resume-prev>上一步</button>' : ''}${state.step < 4 ? '<button type="button" class="btn btn-primary" data-resume-next>下一步</button>' : ''}</div></div></form></section>${previewPanel()}</div></div>`;
  }
  function syncField(target) {
    const path = target.dataset.resumeField;
    if (!path) return;
    setValue(path, text(target.value));
    markStale();
    if (path === 'target.roleId') {
      const role = paths.find(item => item.id === target.value);
      state.target.roleTitle = role?.title || state.target.roleTitle;
      const title = document.querySelector('#resume-builder [data-resume-field="target.roleTitle"]');
      if (title) title.value = state.target.roleTitle;
    }
    persist(true);
  }
  async function handlePhoto(inputElement) {
    const file = inputElement.files?.[0];
    inputElement.value = '';
    if (!file) return;
    if (!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size > 5 * 1024 * 1024) { toast('照片需为 JPG、PNG 或 WebP，且不超过 5MB。'); return; }
    const job = ++photoJob;
    try {
      const source = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file); });
      const image = await new Promise((resolve, reject) => { const img = new Image(); img.onload = () => resolve(img); img.onerror = reject; img.src = source; });
      if (job !== photoJob) return;
      const canvas = document.createElement('canvas'); canvas.width = 256; canvas.height = 320;
      const ctx = canvas.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      const scale = Math.max(canvas.width / image.width, canvas.height / image.height); const width = image.width * scale; const height = image.height * scale;
      ctx.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
    state.photo = canvas.toDataURL('image/jpeg', .86); state.document = state.document ? { ...state.document, photo: state.photo } : null; persist(); render(); toast('证件照已处理并保存到当前浏览器。');
    } catch { toast('照片无法读取，请换一张常见格式的图片。'); }
  }
  function updateStep(next, check = true) {
    const destination = Math.max(0, Math.min(4, Number(next)));
    if (check && destination > state.step) {
      const errors = validationErrors(state.step);
      if (errors.length) { const feedback = document.querySelector('#resume-builder [data-resume-feedback]'); if (feedback) feedback.textContent = errors.join('；'); toast(errors[0]); return; }
    }
    state.step = destination; persist(true); render();
  }
  async function generate({ intent = 'generate', confirmed = false } = {}) {
    if (generating) return;
    for (let step = 0; step < 4; step++) {
      const errors = validationErrors(step);
      if (errors.length) { toast(errors[0]); state.step = step; persist(true); render(); return; }
    }
    if (state.documentEdited && !confirmed) { pendingAction = intent; render(); return; }
    generationError = ''; pendingAction = '';
    if (intent !== 'polish' && !state.useAI) {
      try { state.document = buildResumeDocument(state, { optimize: !!state.optimize }); state.generation = null; state.documentEdited = false; state.documentStale = false; persist(); render(); toast('本地简历预览已生成。'); }
      catch { toast('简历生成失败，请检查表单内容后重试。'); }
      return;
    }
    const snapshot = sanitizeResumeState(state);
    generating = true; generatingIntent = intent; generationController = new AbortController(); render();
    try {
      const selectedModel = models.some(item => item.id === snapshot.aiModel) ? snapshot.aiModel : defaultModel;
      const response = await fetch('./api/resume/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.any([generationController.signal, AbortSignal.timeout(165000)]), body: JSON.stringify({ ...createResumeAIRequest(snapshot), model: selectedModel }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error?.message || 'AI 生成暂不可用，请重试或使用本地排版。');
      const generated = applyResumeAIPlan(snapshot, result);
      state.document = generated.document; state.generation = generated.generation; state.documentEdited = false; state.documentStale = false; persist();
      toast(intent === 'polish' ? 'AI 已润色简历内容，可继续在线编辑和导出。' : 'AI 简历已生成，可在线编辑和导出。');
    } catch (error) {
      generationError = generationController.signal.aborted ? `已取消 AI ${intent === 'polish' ? '润色' : '生成'}，当前预览已保留。` : error.name === 'TimeoutError' ? 'AI 生成超时，请重试或使用本地排版。' : error.name === 'TypeError' ? '暂时无法连接 AI 服务，请重试或使用本地排版。' : error.message;
      toast(generationError);
    } finally { generating = false; generatingIntent = 'generate'; generationController = null; render(); }
  }
  async function exportDocument(format) {
    if (!state.document || exporting) return;
    exporting = true; render();
    try { const result = await downloadResume(state.document, format); toast(`${format === 'pdf' ? 'PDF' : 'PNG'}已导出${result?.pages ? `，共 ${result.pages} 页` : ''}。`); }
    catch { toast('导出失败，请稍后重试或检查浏览器下载权限。'); }
    finally { exporting = false; render(); }
  }
  document.addEventListener('input', event => {
    if (!event.target.closest('#resume-builder')) return;
    if (event.target.matches('[data-resume-field]')) syncField(event.target);
    if (event.target.matches('[data-resume-edit]')) {
      const path = event.target.dataset.resumeEdit;
      const max = path === 'name' ? 100 : path === 'headline' ? 200 : path === 'summary' ? 1000 : path.startsWith('contacts.') || path.endsWith('.subtitle') ? 300 : path.endsWith('.date') ? 100 : /^sections\.\d+\.title$/.test(path) ? 80 : path.endsWith('.title') ? 200 : 2400;
      const value = text(event.target.textContent).replace(/\r\n/g, '\n');
      if (value.length > max) { event.target.textContent = value.slice(0, max); toast(`此项最多保留 ${max} 个字符。`); }
      setValue(`document.${path}`, value.slice(0, max)); state.documentEdited = true; persist(true);
    }
  });
  document.addEventListener('change', event => {
    if (!event.target.closest('#resume-builder')) return;
    if (event.target.matches('[data-resume-ai]')) { state.useAI = event.target.checked; generationError = ''; markStale(); persist(); render(); return; }
    if (event.target.matches('[data-resume-field]')) { syncField(event.target); persist(); return; }
    if (event.target.matches('[data-resume-optimize]')) { state.optimize = event.target.checked; markStale(); persist(); return; }
    if (event.target.matches('[data-resume-photo]')) handlePhoto(event.target);
  });
  document.addEventListener('submit', event => { if (event.target.id === 'resume-form') event.preventDefault(); });
  document.addEventListener('click', event => {
    const root = event.target.closest('#resume-builder'); if (!root) return;
    if (event.target.closest('[data-resume-cancel-ai]')) { generationController?.abort(); return; }
    if (generating) return;
    if (event.target.closest('[data-resume-models-retry]')) { modelsStatus = 'idle'; loadModels(); render(); return; }
    const templateButton = event.target.closest('[data-resume-template-choice]');
    if (templateButton) {
      state.templateId = getResumeTemplate(templateButton.dataset.resumeTemplateChoice).id;
      if (state.document) state.document = { ...state.document, templateId: state.templateId };
      persist(); render(); return;
    }
    if (event.target.closest('[data-resume-local], [data-resume-quick-local]')) { state.useAI = false; pendingAction = ''; generate(); return; }
    const confirmAction = event.target.closest('[data-resume-confirm-action]');
    if (confirmAction) { generate({ intent: confirmAction.dataset.resumeConfirmAction, confirmed: true }); return; }
    const step = event.target.closest('[data-resume-step]'); if (step) { updateStep(step.dataset.resumeStep); return; }
    if (event.target.closest('[data-resume-prev]')) { updateStep(state.step - 1, false); return; }
    if (event.target.closest('[data-resume-next]')) { updateStep(state.step + 1); return; }
    const add = event.target.closest('[data-resume-add]'); if (add) { addEntry(add.dataset.resumeAdd); return; }
    const remove = event.target.closest('[data-resume-remove]'); if (remove) { removeEntry(remove.dataset.resumeRemove, remove.dataset.index); return; }
    if (event.target.closest('[data-resume-remove-photo]')) { ++photoJob; state.photo = ''; if (state.document) state.document.photo = ''; persist(); render(); toast('证件照已移除。'); return; }
    if (event.target.closest('[data-resume-generate]')) { generate(); return; }
    if (event.target.closest('[data-resume-polish]')) { generate({ intent: 'polish' }); return; }
    if (event.target.closest('[data-resume-cancel-generate]')) { pendingAction = ''; render(); return; }
    const exportButton = event.target.closest('[data-resume-export]'); if (exportButton) exportDocument(exportButton.dataset.resumeExport);
  });
  return { page, getState: () => state };
}
