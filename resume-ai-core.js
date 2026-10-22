import { sanitizeResumeState, buildResumeDocument, extractResumeKeywords } from './resume-core.js';

export class ResumeAIError extends Error {
  constructor(code, message, status = 502) { super(message); this.code = code; this.status = status; }
}

// Only career evidence goes to the model; identity, contact details, photos and drafts stay local.
export function createResumeAIRequest(raw) {
  const state = sanitizeResumeState(raw);
  const stripContacts = value => value.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[邮箱已隐藏]').replace(/(?<!\d)(?:\+?86[ -]?)?1[3-9]\d{9}(?!\d)/g, '[手机已隐藏]');
  const cleanEntry = entry => Object.fromEntries(Object.entries(entry).filter(([key]) => key !== 'id').map(([key, value]) => [key, stripContacts(value)]));
  return {
    summary: stripContacts(state.basics.summary),
    optimize: state.optimize,
    education: state.education.map(cleanEntry), experience: state.experience.map(cleanEntry), projects: state.projects.map(cleanEntry),
    skills: stripContacts(state.skills), certificates: stripContacts(state.certificates),
    target: Object.fromEntries(Object.entries(state.target).map(([key, value]) => [key, stripContacts(value)]))
  };
}

export function createResumeAISource(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new ResumeAIError('INVALID_RESUME', '请填写简历信息后再生成。', 400);
  const data = createResumeAIRequest({ ...raw, basics: { summary: typeof raw?.summary === 'string' ? raw.summary : raw?.basics?.summary } });
  let doc;
  try { doc = buildResumeDocument({ ...data, basics: { name: '候选人', email: 'candidate@example.invalid', summary: data.summary } }, { optimize: false }); }
  catch { throw new ResumeAIError('INVALID_RESUME', '请补齐教育或经历条目的名称后重试。', 400); }
  if (!doc.sections.length && !data.summary) throw new ResumeAIError('EMPTY_RESUME', '请补充经历或技能后使用 AI，也可以先使用本地排版。', 400);
  return { summary: data.summary, optimize: data.optimize, target: data.target, sections: doc.sections };
}

function rejectResult() { throw new ResumeAIError('INVALID_AI_RESULT', 'AI 结果未通过事实校验，请重试或使用本地排版。'); }
function checkRewrite(source, rewritten, allEvidence) {
  if (typeof rewritten !== 'string' || !rewritten.trim() || rewritten.length > 2400) rejectResult();
  const quantities = text => new Set((text.match(/\d+(?:\.\d+)?\s*(?:%|％|ms|毫秒|秒|分钟|小时|万|亿|GB|MB|KB|TB|FPS|人|名|个|次|项)?/gi) || []).map(value => value.replace(/\s+/g, '')));
  const original = quantities(source), updated = quantities(rewritten);
  if ([...updated].some(value => !original.has(value)) || [...original].some(value => !updated.has(value))) rejectResult();
  const known = new Set(extractResumeKeywords(allEvidence).map(item => item.keyword));
  if (extractResumeKeywords(rewritten).some(item => !known.has(item.keyword))) rejectResult();
}

export function validateResumeAIPlan(source, raw) {
  if (!raw || !Array.isArray(raw.sections) || raw.sections.length !== source.sections.length) rejectResult();
  const seenSections = new Set(), evidence = source.sections.map(section => JSON.stringify(section.items)).join('\n') + source.summary;
  const sections = raw.sections.map((section, sectionIndex) => {
    const original = source.sections.find(item => item.id === section?.id);
    if (!original || seenSections.has(section.id) || !Array.isArray(section.items) || section.items.length !== original.items.length) rejectResult();
    if (source.optimize === false && section.id !== source.sections[sectionIndex].id) rejectResult();
    seenSections.add(section.id);
    const seenItems = new Set();
    return { id: section.id, items: section.items.map((item, itemIndex) => {
      if (!Number.isInteger(item?.index) || item.index < 0 || item.index >= original.items.length || seenItems.has(item.index)) rejectResult();
      seenItems.add(item.index);
      if (source.optimize === false && item.index !== itemIndex) rejectResult();
      const base = original.items[item.index], seenBullets = new Set();
      if (!Array.isArray(item.bullets) || item.bullets.length > base.bullets.length) rejectResult();
      const bullets = item.bullets.map(bullet => {
        if (!Array.isArray(bullet?.sourceIndexes) || !bullet.sourceIndexes.length || bullet.sourceIndexes.some(index => !Number.isInteger(index) || index < 0 || index >= base.bullets.length || seenBullets.has(index)) || new Set(bullet.sourceIndexes).size !== bullet.sourceIndexes.length) rejectResult();
        bullet.sourceIndexes.forEach(index => seenBullets.add(index));
        const text = bullet.sourceIndexes.map(index => base.bullets[index].text).join('；');
        if (['experience', 'projects'].includes(section.id)) checkRewrite(text, bullet.text, evidence);
        else if (bullet.sourceIndexes.length !== 1 || bullet.text !== text) rejectResult();
        return { text: bullet.text, sourceIndexes: bullet.sourceIndexes };
      });
      if (seenBullets.size !== base.bullets.length) rejectResult();
      return { index: item.index, bullets };
    }) };
  });
  let summary = source.summary;
  if (source.summary && typeof raw.summary === 'string' && raw.summary !== source.summary) {
    if (raw.summary.length > 1000) rejectResult();
    checkRewrite(source.summary, raw.summary, evidence); summary = raw.summary;
  }
  return { summary, sections, suggestions: Array.isArray(raw.suggestions) ? raw.suggestions.filter(value => typeof value === 'string').slice(0, 6).map(value => value.slice(0, 600)) : [] };
}

export function applyResumeAIPlan(raw, response) {
  const source = createResumeAISource(createResumeAIRequest(raw)), plan = validateResumeAIPlan(source, response.plan);
  const doc = buildResumeDocument(raw, { optimize: raw.optimize !== false });
  const original = buildResumeDocument(raw, { optimize: false });
  doc.summary = plan.summary;
  doc.sections = plan.sections.map(section => {
    const base = original.sections.find(item => item.id === section.id);
    return { ...base, items: section.items.map(item => ({ ...base.items[item.index], bullets: item.bullets.map(bullet => ({ text: bullet.text })) })) };
  });
  return { document: doc, generation: { mode: 'ai', model: typeof response.model === 'string' ? response.model.slice(0, 100) : '', generatedAt: new Date().toISOString(), suggestions: plan.suggestions } };
}
