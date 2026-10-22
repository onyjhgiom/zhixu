import { RESUME_TEMPLATE_IDS, getResumeTemplate } from './resume-templates.js';

const SECTION_IDS = ['education', 'experience', 'projects', 'skills', 'certificates'];
const string = (value, max = 2000) => typeof value === 'string' ? value.replace(/\u0000/g, '').slice(0, max) : '';
const object = value => value && typeof value === 'object' && !Array.isArray(value) ? value : {};
const list = value => Array.isArray(value) ? value : [];
const fields = (source, schema) => Object.fromEntries(Object.entries(schema).map(([key, max]) => [key, string(object(source)[key], max)]));
const basicsSchema = { name: 60, phone: 40, email: 120, city: 40, website: 200, summary: 500 };
const entrySchema = { id: 80, start: 30, end: 30, details: 1800 };
const photo = value => /^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(string(value, 500000)) && value.length <= 500000 ? value : '';

export function createResumeState(roleId = '') {
  return { version: 1, step: 0, basics: fields({}, basicsSchema), photo: '', education: [], experience: [], projects: [], skills: '', certificates: '', target: { roleId, roleTitle: '', company: '', mode: 'campus', jd: '', hc: '' }, optimize: true, useAI: false, templateId: 'folio', generation: null, document: null, documentEdited: false, documentStale: false, updatedAt: '' };
}

export function sanitizeResumeDocument(raw) {
  if (!raw || !Array.isArray(raw.sections)) return null;
  const source = object(raw);
  const used = new Set();
  return {
    ...fields(source, { name: 100, headline: 200, summary: 1000 }),
    templateId: RESUME_TEMPLATE_IDS.includes(source.templateId) ? source.templateId : 'folio',
    contacts: list(source.contacts).slice(0, 8).map(value => string(value, 300)),
    photo: photo(source.photo),
    keywords: list(source.keywords).slice(0, 50).map(value => string(value, 60)).filter(Boolean),
    sections: source.sections.filter(section => SECTION_IDS.includes(section?.id) && !used.has(section.id) && used.add(section.id)).slice(0, 5).map(section => ({
      id: section.id, title: string(section.title, 80),
      items: list(section.items).slice(0, 20).map(item => ({
        ...fields(item, { title: 200, subtitle: 300, date: 100 }),
        bullets: list(item?.bullets).slice(0, 1000).map(bullet => ({ text: string(typeof bullet === 'string' ? bullet : bullet?.text, 2400) }))
      }))
    }))
  };
}

export function sanitizeResumeState(raw) {
  const source = object(raw), target = object(source.target), clean = createResumeState();
  const step = Number(source.step);
  return {
    ...clean,
    step: Number.isInteger(step) && step >= 0 && step <= 4 ? step : 0,
    basics: fields(source.basics, basicsSchema), photo: photo(source.photo),
    education: list(source.education).slice(0, 12).map(entry => fields(entry, { ...entrySchema, school: 100, degree: 50, major: 80, details: 300 })),
    experience: list(source.experience).slice(0, 20).map(entry => fields(entry, { ...entrySchema, company: 100, title: 80, details: 1500 })),
    projects: list(source.projects).slice(0, 20).map(entry => fields(entry, { ...entrySchema, name: 100, role: 80 })),
    skills: string(source.skills, 1200), certificates: string(source.certificates, 800),
    target: { ...fields(target, { roleId: 80, roleTitle: 100, company: 120, jd: 6000, hc: 5000 }), mode: target.mode === 'social' ? 'social' : 'campus' },
    optimize: source.optimize !== false,
    useAI: source.useAI === true,
    templateId: getResumeTemplate(source.templateId).id,
    aiModel: string(source.aiModel, 100),
    generation: source.generation?.mode === 'ai' ? { mode: 'ai', model: string(source.generation.model, 100), generatedAt: string(source.generation.generatedAt, 40), suggestions: list(source.generation.suggestions).slice(0, 6).map(value => string(value, 600)) } : null,
    document: sanitizeResumeDocument(source.document), documentEdited: source.documentEdited === true, documentStale: source.documentStale === true,
    updatedAt: /^\d{4}-\d\d-\d\dT/.test(source.updatedAt) && Number.isFinite(Date.parse(source.updatedAt)) ? source.updatedAt : ''
  };
}

const present = entry => Object.entries(entry).some(([key, value]) => key !== 'id' && value.trim());
const month = value => { const match = /^(\d{4})[.\-/年](\d{1,2})/.exec(value); return match ? Number(match[1]) * 12 + Number(match[2]) : null; };
export function getResumeValidation(raw, step) {
  const state = sanitizeResumeState(raw), errors = [];
  if (step === undefined || step === 0) {
    if (!state.basics.name.trim()) errors.push('请填写姓名。');
    if (!state.basics.phone.trim() && !state.basics.email.trim()) errors.push('请至少填写手机或邮箱中的一种联系方式。');
    if (state.basics.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.basics.email.trim())) errors.push('请填写有效的邮箱地址。');
    if (state.basics.phone.trim() && !/^\+?[\d\s().-]{6,40}$/.test(state.basics.phone.trim())) errors.push('请检查手机或电话号码格式。');
  }
  for (const [kind, required, label, entryStep] of [['education', 'school', '教育经历的学校', 1], ['experience', 'company', '工作 / 实习经历的公司', 2], ['projects', 'name', '项目经历的名称', 2]]) {
    if (step !== undefined && step !== entryStep) continue;
    for (const [index, entry] of state[kind].entries()) {
      if (!present(entry)) continue;
      if (!entry[required].trim()) errors.push(`请填写第 ${index + 1} 条${label}。`);
      if (month(entry.start) !== null && month(entry.end) !== null && month(entry.start) > month(entry.end)) errors.push(`第 ${index + 1} 条${label}的结束时间不能早于开始时间。`);
    }
  }
  return { valid: !errors.length, errors };
}

// Aliases keep matching literal and explainable; target text never becomes evidence.
const KEYWORDS = [
  ['JavaScript', 'JS'], ['TypeScript', 'TS'], ['React', 'React.js'], ['Vue', 'Vue.js'], ['Angular'], ['HTML', 'HTML5'], ['CSS', 'CSS3'], ['Node.js', 'NodeJS'], ['Next.js'], ['Nuxt'], ['Vite'], ['Webpack'],
  ['Java'], ['Spring Boot', 'SpringBoot'], ['Spring Cloud'], ['MyBatis'], ['Python'], ['Django'], ['FastAPI'], ['Go', 'Golang'], ['Rust'], ['C++'], ['C#'], ['.NET'], ['PHP'], ['Swift'], ['Kotlin'], ['Dart'], ['Flutter'], ['Android'], ['iOS'],
  ['MySQL'], ['PostgreSQL'], ['Redis'], ['MongoDB'], ['SQL'], ['Kafka'], ['RabbitMQ'], ['Elasticsearch', 'ES'], ['ClickHouse'], ['Flink'], ['Spark'], ['Hadoop'], ['Hive'],
  ['Docker'], ['Kubernetes', 'K8s'], ['Linux'], ['Git'], ['CI/CD'], ['DevOps'], ['Terraform'], ['Prometheus'], ['Grafana'], ['Nginx'], ['gRPC'], ['HTTP'], ['TCP'], ['WebSocket'], ['REST'],
  ['PyTorch'], ['TensorFlow'], ['LLM', '大语言模型'], ['RAG', '检索增强生成'], ['Agent', '智能体'], ['NLP', '自然语言处理'], ['LoRA'], ['Transformer'], ['CUDA'], ['MLOps'], ['机器学习'], ['深度学习'], ['推荐系统'], ['计算机视觉'], ['数据分析'], ['数据建模'], ['特征工程'], ['A/B 测试', 'A/B测试'],
  ['Unity'], ['Unreal Engine', 'Unreal', 'UE5', 'UE4'], ['Godot'], ['Cocos'], ['OpenGL'], ['Vulkan'], ['DirectX'], ['Shader', '着色器'], ['HLSL'], ['GLSL'], ['Lua'], ['游戏循环'], ['网络同步'], ['帧同步'], ['状态同步'], ['物理引擎'], ['渲染管线'], ['图形学'], ['动画系统'], ['ECS'], ['Gameplay', '玩法系统'],
  ['ROS 2', 'ROS2'], ['SLAM'], ['VLA'], ['BEV'], ['CAN'], ['AUTOSAR'], ['SIL'], ['HIL'], ['感知融合'], ['轨迹规划'], ['行为预测'], ['运动控制'], ['机械臂'], ['模仿学习'], ['强化学习'], ['车载测试'], ['算法测试'], ['点云'], ['传感器标定'],
  ['自动化测试'], ['单元测试'], ['集成测试'], ['性能测试'], ['接口测试'], ['Playwright'], ['Selenium'], ['Jest'], ['Vitest'], ['Cypress'], ['JMeter'], ['渗透测试'], ['网络安全'], ['信息安全'],
  ['性能优化'], ['内存优化'], ['可观测性'], ['高并发'], ['分布式'], ['微服务'], ['数据结构'], ['算法'], ['系统设计'], ['需求分析'], ['项目管理'], ['团队协作'], ['跨部门协作'], ['产品设计'], ['用户研究'], ['Figma'], ['Axure'], ['英语']
];
const escapeRegex = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const patternFor = term => new RegExp(`${/^[A-Za-z0-9]/.test(term) ? '(?<![A-Za-z0-9_])' : ''}${escapeRegex(term)}${/[A-Za-z0-9]$/.test(term) ? '(?![A-Za-z0-9_])' : ''}`, 'iu');
const has = (source, aliases) => aliases.some(alias => patternFor(alias).test(source));
const clauses = value => value.split(/[\n。；;！？!?]+/).map(line => line.replace(/^\s*(?:[-*•·]|\d+[.)、])\s*/, '').trim()).filter(Boolean);
const positive = value => clauses(value.replace(/[，,、]/g, '\n')).filter(line => !/(?:不了解|不会使用|不会|未掌握|尚未掌握|没有.{0,4}经验|未接触|不熟悉|待学习|计划学习)/.test(line)).join('\n');

export function extractResumeKeywords(jd = '', hc = '') {
  const sources = [{ text: string(jd, 6000), source: 'JD' }, { text: string(hc, 5000), source: 'HC' }];
  const result = [];
  for (const aliases of KEYWORDS) {
    let weight = 0; const origins = [];
    for (const source of sources) {
      const matches = clauses(source.text).filter(line => has(line, aliases));
      if (!matches.length) continue;
      origins.push(source.source);
      weight += source.source === 'HC' ? 4 : 3;
      if (matches.some(line => /必须|必备|核心|精通|熟练|负责|要求|必需|required|must/i.test(line))) weight += 2;
      else if (matches.every(line => /优先|加分|了解|nice.to.have|preferred/i.test(line))) weight -= 1;
    }
    if (weight) result.push({ keyword: aliases[0], aliases, weight, sources: origins });
  }
  // Preserve unknown technology identifiers rather than guessing facts from a role title.
  for (const source of sources) for (const match of source.text.matchAll(/[A-Za-z][A-Za-z0-9]*(?:[.+#/-][A-Za-z0-9]+)*[+#]*/g)) {
    const term = match[0];
    if (term.length < 2 || term.length > 40 || /^(?:JD|HC|the|and|with|for|our|you|are|will|have|experience|years|required|must|skills|team|or|in|of|to|is|we|a|an|on|as|be|at|by|from|work|knowledge|ability|strong|good|preferred|using|development|job|responsibilities|requirements|熟悉)$/i.test(term)) continue;
    if (KEYWORDS.some(aliases => aliases.some(alias => alias.toLowerCase().split(/\s+/).includes(term.toLowerCase())))) continue;
    const existing = result.find(item => item.keyword.toLowerCase() === term.toLowerCase());
    if (existing) { if (!existing.sources.includes(source.source)) { existing.weight += source.source === 'HC' ? 4 : 3; existing.sources.push(source.source); } }
    else result.push({ keyword: term, aliases: [term], weight: source.source === 'HC' ? 4 : 3, sources: [source.source] });
  }
  return result.sort((a, b) => b.weight - a.weight).slice(0, 40);
}

function evidenceFor(state) {
  return positive([state.basics.summary, state.skills, state.certificates, ...state.education.map(item => [item.major, item.details].join('\n')), ...state.experience.map(item => [item.title, item.details].join('\n')), ...state.projects.map(item => [item.role, item.details].join('\n'))].join('\n'));
}
export function analyzeResume(raw) {
  const state = sanitizeResumeState(raw), keywords = extractResumeKeywords(state.target.jd, state.target.hc), evidence = evidenceFor(state);
  const matchedKeywords = keywords.filter(item => has(evidence, item.aliases)), missingKeywords = keywords.filter(item => !has(evidence, item.aliases));
  const total = keywords.reduce((sum, item) => sum + item.weight, 0);
  const score = total ? Math.round(100 * matchedKeywords.reduce((sum, item) => sum + item.weight, 0) / total) : null;
  const suggestions = [];
  if (!keywords.length) suggestions.push('填写目标岗位的 JD 与团队职责后，可提取技能关键词并调整简历重点。');
  if (missingKeywords.length) suggestions.push(`目标文本提到 ${missingKeywords.slice(0, 5).map(item => item.keyword).join('、')}，目前缺少表单证据；有真实经历时再补充。`);
  if ([...state.experience, ...state.projects].some(item => item.details && !/\d/.test(item.details))) suggestions.push('可为经历补充真实的规模、耗时、质量指标或验收结果，并交代统计口径。');
  if (!state.experience.some(present) && !state.projects.some(present)) suggestions.push('补充至少一段实习、工作或项目经历，更容易展示技能的实际应用。');
  if (keywords.length) suggestions.push('已优先排列与岗位有关的经历和要点；覆盖度按 JD / HC 关键词权重计算，HC 与必备技能权重更高。');
  return { keywords, matchedKeywords, missingKeywords, score, suggestions };
}

const lines = value => clauses(value).map(text => ({ text }));
const range = entry => [entry.start.trim(), entry.end.trim()].filter(Boolean).join(' - ');
const relevance = (text, keywords) => keywords.reduce((sum, item) => sum + (has(positive(text), item.aliases) ? item.weight : 0), 0);
const rank = (items, keywords, toText, optimize) => optimize ? [...items].sort((a, b) => relevance(toText(b), keywords) - relevance(toText(a), keywords)) : items;
export function buildResumeDocument(raw, { optimize = raw?.optimize !== false } = {}) {
  const state = sanitizeResumeState(raw), validation = getResumeValidation(state);
  if (!validation.valid) throw new Error(validation.errors[0]);
  const analysis = analyzeResume(state), keywords = analysis.matchedKeywords;
  const bullets = value => rank(lines(value), keywords, item => item.text, optimize);
  const sections = [
    { id: 'education', title: '教育背景', items: state.education.filter(present).map(item => ({ title: item.school, subtitle: [item.degree, item.major].filter(Boolean).join(' · '), date: range(item), bullets: bullets(item.details) })) },
    { id: 'experience', title: '工作 / 实习经历', items: state.experience.filter(present).map(item => ({ title: item.company, subtitle: item.title, date: range(item), bullets: bullets(item.details) })) },
    { id: 'projects', title: '项目经历', items: state.projects.filter(present).map(item => ({ title: item.name, subtitle: item.role, date: range(item), bullets: bullets(item.details) })) },
    { id: 'skills', title: '专业技能', items: state.skills.trim() ? [{ title: '', subtitle: '', date: '', bullets: rank(state.skills.split(/[\n,，、;；]+/).map(text => ({ text: text.trim() })).filter(item => item.text), keywords, item => item.text, optimize) }] : [] },
    { id: 'certificates', title: '证书与荣誉', items: state.certificates.trim() ? [{ title: '', subtitle: '', date: '', bullets: bullets(state.certificates) }] : [] }
  ].filter(section => section.items.length);
  for (const section of sections) section.items = rank(section.items, keywords, item => [item.title, item.subtitle, ...item.bullets.map(bullet => bullet.text)].join('\n'), optimize);
  if (optimize) {
    const order = state.target.mode === 'social' ? ['experience', 'projects', 'skills', 'education', 'certificates'] : ['education', 'projects', 'experience', 'skills', 'certificates'];
    sections.sort((a, b) => {
      const priority = section => {
        const weight = relevance(section.items.flatMap(item => item.bullets.map(bullet => bullet.text)).join('\n'), keywords);
        return weight ? 10 + Math.min(weight, 20) : 0;
      };
      return priority(b) - priority(a) || order.indexOf(a.id) - order.indexOf(b.id);
    });
  }
  return {
    name: state.basics.name.trim(), headline: state.target.roleTitle.trim(), summary: state.basics.summary.trim(),
    templateId: state.templateId,
    contacts: [state.basics.phone, state.basics.email, state.basics.city, state.basics.website].map(value => value.trim()).filter(Boolean),
    photo: state.photo, keywords: optimize ? [...new Set(keywords.flatMap(item => item.aliases.filter(alias => patternFor(alias).test(evidenceFor(state)))))] : [], sections
  };
}
