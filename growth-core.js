import { professionalDirections, professionalRoles, professionalSkills, professionalDataVersion } from './professional-data.js';

// Diagnostic questions establish a narrow knowledge signal, not production experience.
const question = (directionId, suffix, skillId, title, options, answer, explanation, level = 2) => ({ id: `${directionId}-${suffix}`, directionId, skillId, title, options, answer, explanation, level });
export const assessmentQuestions = [
  question('frontend', 'a', 'frontend-web', '业务表单的提交按钮应优先使用哪种实现？', ['带点击事件的 div', '原生 button 并配置 type 与可访问名称', '仅用颜色标注可点击', '给所有元素加 tabindex=0'], 1, '原生 button 自带键盘语义与禁用状态；表单内明确 type，标签提供可访问名称。', 1),
  question('frontend', 'b', 'frontend-js', '切换搜索词后旧请求较晚返回，怎样避免旧结果覆盖新结果？', ['所有请求都渲染', '固定延迟 500ms', '仅给请求加 loading', '取消前次请求，并用请求序号校验当前响应'], 3, 'AbortController 节省无效工作；序号校验保证最后一次有效请求才能写入当前视图。'),
  question('frontend', 'c', 'frontend-network', '带身份的跨域请求失败，排查哪组信息最有帮助？', ['请求 Origin、预检响应、credentials、Cookie 的 SameSite/Secure', '仅清理 CSS 缓存', '把 token 写进 URL', '关闭浏览器安全限制'], 0, '核对 CORS 许可源与凭据策略，同时检查 Cookie 属性。生产环境不能靠关闭安全限制修复。'),
  question('backend', 'a', 'backend-language', '多个线程执行库存扣减，为什么单独使用 volatile 不够？', ['volatile 会自动锁住方法', 'volatile 无法保存整数', '可见性不保证读改写的原子性', 'volatile 只适用于单核'], 2, '读、校验、扣减是复合操作，需要原子更新、锁或数据库条件更新，并验证并发不变量。', 1),
  question('backend', 'b', 'backend-api', '支付通知可能重复投递，消费端应怎样处理？', ['按业务幂等键去重，并在事务中校验状态迁移', '收到第二次就删除订单', '只在内存里记住最近请求', '要求网络绝不重试'], 0, '幂等键应有持久化唯一约束，去重与业务更新需要一致的事务边界；返回结果可安全重放。'),
  question('backend', 'c', 'backend-storage', '慢 SQL 优化前，哪项证据最有效？', ['直接给每列加索引', '把超时时间改成十分钟', '只看 Java 方法名', '执行计划、扫描行数、索引选择性及锁等待'], 3, '先复现负载，结合 EXPLAIN/ANALYZE、慢日志与锁信息确定扫描、排序或竞争瓶颈，再比较基线。'),
  question('algorithm', 'a', 'algorithm-complexity', '代码两层循环，内层指针只向前移动且全程不回退，复杂度如何判断？', ['一定 O(n²)', '按两指针总移动次数分析，可能为 O(n)', '一定 O(log n)', '只看循环缩进'], 1, '复杂度取决于总操作次数。内层指针全程最多移动 n 次时，可用摊还分析得到线性界。', 1),
  question('algorithm', 'b', 'algorithm-structures', '实现 O(1) LRU 的常见结构是什么？', ['单链表逐项查找', '每次完整排序', '哈希表加双向链表', '仅使用普通数组'], 2, '哈希表定位节点，双向链表维护访问顺序，命中移到头部，超容量淘汰尾部；测试容量为零及重复写入。'),
  question('algorithm', 'c', 'algorithm-dp', '动态规划中最需要先明确的是什么？', ['状态含义、转移、边界、遍历顺序与依赖', '先创建最大的二维数组', '默认所有问题都能滚动压缩', '只抄样例输出'], 0, '状态必须足以描述子问题；转移和遍历遵守依赖，证明后再做空间压缩，避免覆盖未读取状态。'),
  question('data', 'a', 'data-sql', '订单表连接多条明细后直接 SUM(订单金额)，可能出现什么问题？', ['聚合会自动去重', 'LEFT JOIN 永远不重复', '只会丢失小数', '一对多连接导致订单金额重复累加'], 3, '先确定统计粒度，在订单粒度预聚合或采用适当去重键，并用小样本核对总额。', 1),
  question('data', 'b', 'data-metrics', '比较两个渠道的次日留存，首先需要统一什么？', ['页面颜色', '时区、新增用户定义、去重键与观察窗口', '只比较百分比大小', '把缺失用户都当活跃'], 1, '统一 cohort、事件定义、身份与时间窗口，检查数据迟到及样本量后再解释差异。'),
  question('data', 'c', 'data-pipeline', '批处理任务重跑产生重复数据，应优先设计什么？', ['每次人工删除所有历史数据', '禁止任何重跑', '分区覆盖或业务主键 upsert，并记录运行批次', '把重复行隐藏在图表中'], 2, '幂等写入与可追踪运行批次支持重跑；还要定义迟到数据、回填范围和上下游质量检查。'),
  question('systems', 'a', 'systems-linux', '服务延迟上升且 CPU 不高，下一步如何定位？', ['关联线程栈、I/O 等待、连接池与请求分位延迟', '立即扩容到十倍', '只看 CPU 均值', '清空全部日志'], 0, 'CPU 低不能排除锁、I/O 或连接池等待。用同一时间窗的请求、系统与依赖指标验证假设。', 1),
  question('systems', 'b', 'systems-network', 'TCP 连接正常却偶发请求超时，应怎样继续排查？', ['断言一定是前端问题', '只增大重试次数', '禁用所有超时', '按 DNS、建连、TLS、TTFB 分段测量并抓包关联'], 3, '请求超时可能发生在不同阶段；分段计时、重传与下游调用证据可缩小故障范围。'),
  question('systems', 'c', 'systems-distributed', '下游故障时所有实例同时立即重试，主要风险是什么？', ['一定提高可用性', '放大负载形成重试风暴，应设预算、退避与抖动', '消除所有重复请求', '代替幂等设计'], 1, '重试需要超时边界、次数预算、指数退避与抖动，并评估业务幂等和熔断降级。'),
  question('ai', 'a', 'ai-data', '训练和验证分数都很好，上线却显著下降，优先检查什么？', ['增加展示图数量', '只增大模型', '按实体或时间切分，检查标签与未来信息泄漏', '删除所有失败样本'], 2, '随机切分可能让同一实体或未来信息穿越边界；切分应贴近线上预测过程，并保留独立测试集。', 1),
  question('ai', 'b', 'ai-evaluation', '对低占比风险样本做二分类，只报告准确率有什么问题？', ['多数类基线可能很高，需要 PR、召回与业务阈值分析', '准确率永远为零', '无需看混淆矩阵', '数据越不平衡越可靠'], 0, '结合 PR、混淆矩阵、误报漏报成本、阈值及分组指标，避免多数类掩盖风险。'),
  question('ai', 'c', 'ai-rag', 'RAG 回答没有依据时，应该怎样评估与改进？', ['只增加提示词长度', '只看输出流畅度', '直接移除引用', '分别测检索召回与答案依据一致性，允许拒答'], 3, '拆开检索与生成误差，对固定评测集记录 recall@k、引用命中和无依据回答，保留拒答与回归。'),
  question('security', 'a', 'security-auth', '检测业务接口的越权风险，应重点验证什么？', ['仅检查按钮是否隐藏', '服务端是否对当前主体和具体资源执行授权校验', '只检查 HTTPS', '把资源 ID 改为更长字符串'], 1, '授权必须在服务端验证主体、资源与动作；使用不同权限账号覆盖横向与纵向越权。', 1),
  question('security', 'b', 'security-code', '用户输入进入 SQL 查询，首选哪项防护？', ['拼接后替换空格', '把错误消息隐藏即可', '参数化查询，并限制数据库账户权限', '只在前端做长度限制'], 2, '参数化分离数据与语句结构，最小权限限制影响面；动态标识符还需允许列表。'),
  question('security', 'c', 'security-response', '发现泄漏的生产访问密钥，应优先做什么？', ['撤销或轮换密钥，保留审计证据并核查影响范围', '仅删除聊天记录', '只在 README 增加提醒', '等待密钥自然过期'], 0, '先遏制凭据滥用，关联审计记录评估影响，随后清理泄漏源、修复流程并验证。'),
  question('testing', 'a', 'testing-design', '优惠券仅限满 100 元使用，最基本的边界测试是哪组？', ['只测 200 元', '只测首页打开', '每次随机一个大金额', '小于、等于、大于 100 元，并明确精度和叠加规则'], 3, '先澄清金额精度、门槛与叠加规则，再做边界值、等价类及异常路径设计。', 1),
  question('testing', 'b', 'testing-api', '订单接口返回 200，为什么测试还可能失败？', ['200 保证全部业务正确', '还需断言业务状态、持久化结果及副作用', '只需断言响应长度', '把失败断言删掉'], 1, 'HTTP 成功不等于业务成功；检查契约、状态迁移、数据库或事件副作用，并隔离测试数据。'),
  question('testing', 'c', 'testing-ci', 'UI 自动化偶发失败，哪种修复方式更可靠？', ['所有步骤 sleep 30 秒', '无限重试直到通过', '定位共享状态与等待条件，隔离数据并保留 trace', '取消持续集成'], 2, '用可观察条件替代固定等待，定位环境与状态污染；重试不能掩盖不稳定性，保留 trace 支持复盘。')
];

const roleById = id => professionalRoles.find(role => role.id === id);
const skillById = id => professionalSkills.find(skill => skill.id === id);
const validDate = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
const localDate = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
function cleanAnswers(raw) {
  const answers = {};
  for (const q of assessmentQuestions) if (Number.isInteger(raw?.[q.id]) && raw[q.id] >= 0 && raw[q.id] < q.options.length) answers[q.id] = raw[q.id];
  return answers;
}

export function sanitizeGrowthState(raw) {
  const defaultRole = professionalRoles[0].id;
  const state = { version: 1, profile: { roleId: roleById(raw?.profile?.roleId)?.id || defaultRole, mode: raw?.profile?.mode === 'social' ? 'social' : 'campus', hoursPerWeek: 8 }, selfLevels: {}, answers: cleanAnswers(raw?.answers), attempts: [], completed: {}, plan: null };
  const hours = raw?.profile?.hoursPerWeek;
  if (Number.isFinite(hours) && hours >= 2 && hours <= 40) state.profile.hoursPerWeek = hours;
  for (const skill of professionalSkills) if (Number.isInteger(raw?.selfLevels?.[skill.id]) && raw.selfLevels[skill.id] >= 0 && raw.selfLevels[skill.id] <= 4) state.selfLevels[skill.id] = raw.selfLevels[skill.id];
  if (Array.isArray(raw?.attempts)) state.attempts = raw.attempts.filter(item => item && roleById(item.roleId) && typeof item.at === 'string' && !Number.isNaN(Date.parse(item.at))).slice(-20).map(item => ({ id: String(item.id || item.at).slice(0, 80), at: item.at.slice(0, 40), roleId: item.roleId, answers: cleanAnswers(item.answers) }));
  const validTasks = new Set();
  for (const role of professionalRoles) for (const mode of ['campus', 'social']) {
    for (const skill of professionalSkills) validTasks.add(`${role.id}:${mode}:skill:${skill.id}`);
    validTasks.add(`${role.id}:${mode}:project`); validTasks.add(`${role.id}:${mode}:interview`);
  }
  if (raw?.completed && typeof raw.completed === 'object') for (const [id, at] of Object.entries(raw.completed)) if (validTasks.has(id) && typeof at === 'string' && !Number.isNaN(Date.parse(at))) state.completed[id] = at.slice(0, 40);
  if (raw?.plan && roleById(raw.plan.roleId) && ['campus', 'social'].includes(raw.plan.mode) && Number.isFinite(raw.plan.hoursPerWeek) && raw.plan.hoursPerWeek >= 2 && raw.plan.hoursPerWeek <= 40 && validDate(raw.plan.startDate)) {
    state.plan = buildLearningPlan(raw.plan, state);
    if (typeof raw.plan.createdAt === 'string' && !Number.isNaN(Date.parse(raw.plan.createdAt))) state.plan.createdAt = raw.plan.createdAt;
  }
  return state;
}

export function getSkillEvidence(state, skillId) {
  const answered = assessmentQuestions.filter(q => q.skillId === skillId && Number.isInteger(state.answers?.[q.id]) && state.answers[q.id] >= 0 && state.answers[q.id] < q.options.length);
  const selfLevel = Number.isInteger(state.selfLevels?.[skillId]) ? state.selfLevels[skillId] : null;
  if (!answered.length) return { level: null, selfLevel, source: '未评估' };
  const level = Math.min(...answered.map(q => state.answers[q.id] === q.answer ? q.level : 0));
  return { level, selfLevel, source: '客观知识题', answered: answered.length };
}

export function diagnoseRole(roleId, mode, state) {
  const role = roleById(roleId);
  if (!role || !['campus', 'social'].includes(mode)) throw new Error('请选择有效的目标岗位与招聘类型。');
  let measuredWeight = 0, earned = 0;
  const gaps = [], unassessed = [];
  for (const competency of role.competencies) {
    const skill = skillById(competency.skillId), evidence = getSkillEvidence(state, skill.id);
    const targetLevel = mode === 'social' ? competency.socialLevel : competency.campusLevel;
    const row = { skillId: skill.id, title: skill.title, priority: skill.priority, currentLevel: evidence.level, selfLevel: evidence.selfLevel, targetLevel, weight: competency.weight, gap: evidence.level === null ? null : Math.max(0, targetLevel - evidence.level), source: evidence.source };
    if (evidence.level === null) unassessed.push(row);
    else {
      measuredWeight += competency.weight;
      earned += competency.weight * Math.min(1, evidence.level / targetLevel);
      if (row.gap > 0) gaps.push(row);
    }
  }
  const weight = role.competencies.reduce((sum, item) => sum + item.weight, 0);
  gaps.sort((a, b) => (b.gap * b.weight / b.targetLevel) - (a.gap * a.weight / a.targetLevel));
  return { score: measuredWeight ? Math.round(earned / measuredWeight * 100) : null, coverage: Math.round(measuredWeight / weight * 100), lowerBound: Math.round(earned / weight * 100), upperBound: Math.round((earned + weight - measuredWeight) / weight * 100), gaps, unassessed, weaknesses: gaps.filter(item => item.priority === 'P0' || item.gap >= 2), measuredWeight, totalWeight: weight };
}

export function buildLearningPlan({ roleId, mode = 'campus', hoursPerWeek = 8, startDate = localDate() }, state) {
  const role = roleById(roleId);
  if (!role || !['campus', 'social'].includes(mode) || !Number.isFinite(hoursPerWeek) || hoursPerWeek < 2 || hoursPerWeek > 40 || !validDate(startDate)) throw new Error('请提供有效岗位、招聘类型、开始日期与每周 2–40 小时的学习时间。');
  const ordered = [], visited = new Set();
  const targetMap = new Map(role.competencies.map(item => [item.skillId, mode === 'social' ? item.socialLevel : item.campusLevel]));
  const visit = id => {
    if (visited.has(id)) return;
    visited.add(id);
    const skill = skillById(id);
    if (!skill) return;
    skill.dependencies.forEach(visit);
    ordered.push(skill);
  };
  const direction = professionalDirections.find(item => item.id === role.directionId);
  const project = role.project || direction.project;
  [...role.competencies].sort((a, b) => b.weight - a.weight).forEach(item => visit(item.skillId));
  project.skillIds.forEach(visit);
  const tasks = [];
  for (const skill of ordered) {
    const target = targetMap.get(skill.id) || skill.targetLevel;
    const evidence = getSkillEvidence(state, skill.id);
    if (evidence.level !== null && evidence.level >= target) continue;
    const direction = professionalDirections.find(item => item.id === skill.directionId);
    const stage = direction.stages.find(item => item.id === skill.stage) || direction.stages[0];
    const current = evidence.level === null ? Math.min(1, evidence.selfLevel || 0) : evidence.level;
    tasks.push({ id: `${role.id}:${mode}:skill:${skill.id}`, kind: 'skill', skillIds: [skill.id], title: skill.title, description: `${evidence.level === null ? '补充证据并练习' : '针对知识题暴露的差距练习'} · ${skill.priority} · 目标 L${target}。${skill.evidence}`, acceptance: [skill.evidence, '记录复现步骤、输入输出和失败样例；对照阶段标准完成自查。'], deliverables: [skill.evidence], hours: Math.max(3, (target - current) * 3 + 3), week: 1, directionId: direction.id, stageId: stage.id });
  }
  tasks.push({ id: `${role.id}:${mode}:project`, kind: 'project', skillIds: project.skillIds, title: project.title, description: project.scenario + ' 环境：' + project.environment, acceptance: project.acceptance.map(item => `${item.metric}：${item.target}；验证：${item.method}`), deliverables: project.deliverables, hours: mode === 'social' ? 24 : 16, week: 1, directionId: direction.id, stageId: direction.stages.at(-1).id });
  tasks.push({ id: `${role.id}:${mode}:interview`, kind: 'interview', skillIds: role.competencies.map(item => item.skillId), title: `${role.title} · 简历证据与模拟面试`, description: role.interviewPrep.join('；'), acceptance: ['用项目背景、个人行动、指标口径、结果与限制完成一次 10 分钟项目讲解。', '至少复盘两道方向题，按评分锚点记录遗漏与下一次练习。'], deliverables: ['一页岗位定向简历、脱敏项目证据链接、模拟面试复盘'], hours: 6, week: 1, directionId: direction.id, stageId: direction.stages.at(-1).id });
  let totalHours = 0;
  for (const task of tasks) {
    task.week = Math.floor(totalHours / hoursPerWeek) + 1;
    totalHours += task.hours;
    task.endWeek = Math.ceil(totalHours / hoursPerWeek);
    const due = new Date(`${startDate}T00:00:00.000Z`);
    due.setUTCDate(due.getUTCDate() + task.endWeek * 7 - 1);
    task.dueDate = due.toISOString().slice(0, 10);
  }
  return { id: `${role.id}:${mode}`, contentVersion: professionalDataVersion, createdAt: new Date().toISOString(), roleId, mode, hoursPerWeek, startDate, totalHours, weekCount: Math.ceil(totalHours / hoursPerWeek), tasks };
}
