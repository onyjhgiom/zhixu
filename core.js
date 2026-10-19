export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}
export function matchesQuery(item, query) {
  const text = [item.title,item.en,item.desc,item.source,...(item.tags || [])].filter(Boolean).join(' ').toLocaleLowerCase();
  return query.trim().toLocaleLowerCase().split(/\s+/).every(term => text.includes(term));
}
export function progressFor(item, state) {
  const steps = new Set(state.done?.[item.id] || []);
  const count = item.stages.filter((_,index) => steps.has(index)).length;
  return {count,total:item.stages.length,percent:Math.round(count / item.stages.length * 100)};
}
export function sanitizeState(raw, ids, stepCounts, resourceIds) {
  const list = (items, allowed) => Array.isArray(items) ? [...new Set(items.filter(x => typeof x === 'string' && allowed.has(x)))] : [];
  const done = {};
  if (raw?.done && typeof raw.done === 'object') {
    for (const id of ids) {
      if (Array.isArray(raw.done[id])) done[id] = [...new Set(raw.done[id].filter(n => Number.isInteger(n) && n >= 0 && n < stepCounts[id]))];
    }
  }
  let plan = null;
  if (raw?.plan && Number.isInteger(raw.plan.weeks) && raw.plan.weeks >= 4 && raw.plan.weeks <= 52 && Number.isFinite(raw.plan.hours) && raw.plan.hours >= 1 && raw.plan.hours <= 12 && ['408','custom'].includes(raw.plan.subject)) {
    plan = {weeks:raw.plan.weeks,hours:raw.plan.hours,subject:raw.plan.subject};
  }
  const drafts = Array.isArray(raw?.drafts) ? raw.drafts.filter(d => d && ['school','planning','questions','interview'].includes(d.service) && typeof d.text === 'string' && typeof d.goal === 'string').slice(0,20).map(d => ({service:d.service,text:d.text.slice(0,1500),goal:d.goal.slice(0,100)})) : [];
  return {joined:list(raw?.joined,ids),saved:list(raw?.saved,resourceIds),done,plan,drafts};
}
export function buildExamPlan({weeks,hours,subject}) {
  if (!Number.isInteger(weeks) || weeks < 4 || weeks > 52 || !Number.isFinite(hours) || hours < 1 || hours > 12 || !['408','custom'].includes(subject)) throw new Error('请填写有效的复习周数、每天时长和专业课类型。');
  const foundation = Math.max(1,Math.round(weeks * .4));
  const reinforce = Math.max(1,Math.round(weeks * .35));
  const sprint = weeks-foundation-reinforce;
  const professional = Math.round(hours * .4 * 10)/10;
  const math = Math.round(hours * .35 * 10)/10;
  const english = Math.round(hours * .15 * 10)/10;
  const politics = Math.round((hours-professional-math-english)*10)/10;
  return {weeks,hours,subject,phases:[{name:'基础梳理',weeks:foundation,focus:'梳理知识框架，完成基础练习，建立错题记录。'},{name:'强化训练',weeks:reinforce,focus:'按专题练习，定期自测，集中补齐薄弱环节。'},{name:'模拟与复盘',weeks:sprint,focus:'使用合法获取的题目限时模拟，复盘错题与时间分配。'}],daily:[{name:subject === '408' ? '专业课 / 408' : '院校自命题专业课',hours:professional},{name:'数学（如报考要求）',hours:math},{name:'英语',hours:english},{name:'政治',hours:politics}]};
}

export function sanitizeCareerState(raw, questionIds, roleIds, companyIds) {
  const reviewed=Array.isArray(raw?.reviewed)?[...new Set(raw.reviewed.filter(id=>questionIds.has(id)))]:[];
  const notes={};
  for (const role of roleIds) for (const company of ['all',...companyIds]) {
    const key=role+'@'+company, note=raw?.notes?.[key];
    if(note && typeof note.text==='string') notes[key]={text:note.text.slice(0,4000),date:typeof note.date==='string'?note.date.slice(0,30):''};
  }
  return {reviewed,notes};
}
