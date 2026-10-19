import { matchesQuery } from './core.js';

// Region describes the public initiating institution, not a hiring or on-site location.
// Repository URLs and the four institution profiles were checked on 2026-10-19.
export const projectRegions = [
  { id: 'global', name: '全球协作' },
  { id: 'china', name: '中国' },
  { id: 'us', name: '美国' }
];
const locations = {
  global: { region: 'global', label: '全球协作', note: '开源社区协作，未指定线下项目地点' },
  tencent: { region: 'china', label: '中国 · 深圳', note: '发起机构 Tencent 所在地；项目面向全球协作', source: 'https://github.com/Tencent' },
  alibaba: { region: 'china', label: '中国 · 杭州', note: '发起机构 Alibaba 所在地；项目面向全球协作', source: 'https://github.com/alibaba' },
  microsoft: { region: 'us', label: '美国 · 雷德蒙德', note: '发起机构 Microsoft 所在地；项目面向全球协作', source: 'https://github.com/microsoft' },
  mit: { region: 'us', label: '美国 · 剑桥', note: 'MIT PDOS 所在地；教学项目可远程实践', source: 'https://github.com/mit-pdos' }
};

export const projects = [
  {
    id: 'dify', roles: ['agent', 'product'], title: 'Dify · AI 应用与知识库工作流',
    desc: '以知识库问答为切入点，理解检索增强生成、工作流编排与工具调用如何组成可交付的 AI 应用。对比不同分块方式与提示词，观察引用准确性和回答边界。',
    url: 'https://github.com/langgenius/dify', location: locations.global, level: '进阶', tags: ['RAG', 'Workflow', 'Python'],
    practice: '按仓库说明部署，导入一组自有文档，配置检索与引用展示；构造能回答、需澄清和应拒答三类问题，记录结果。',
    deliverable: '一个知识库助手、一份测试集与效果对比报告'
  },
  {
    id: 'langchain', roles: ['agent', 'backend'], title: 'LangChain · 工具调用型助手',
    desc: '围绕模型、工具和消息状态组织一个可检查的助手调用链。重点理解工具参数校验、失败处理、调用预算与上下文管理，避免把 Agent 当成不可解释的黑盒。',
    url: 'https://github.com/langchain-ai/langchain', location: locations.global, level: '进阶', tags: ['Agent', 'Python', 'Tool Calling'],
    practice: '从官方最小示例起步，接入一个只读查询工具；加入超时与错误返回，保存调用轨迹，再用固定问题集检查重复调用和无效参数。',
    deliverable: '可运行的工具助手与异常场景测试记录'
  },
  {
    id: 'ml-beginners', roles: ['ml', 'data'], title: 'ML for Beginners · 机器学习实验集',
    desc: '通过回归、分类与聚类任务理解传统机器学习的完整流程。关注特征处理、训练集划分、数据泄漏和指标选择，建立先做基线、再改进模型的实验习惯。',
    url: 'https://github.com/microsoft/ML-For-Beginners', location: locations.microsoft, level: '入门', tags: ['Python', 'scikit-learn', 'Notebook'],
    practice: '选一个分类案例复现，固定随机种子，分别建立简单基线和改进模型；用混淆矩阵解释错误类型，记录预处理与验证方式。',
    deliverable: '可复现的 Notebook、指标表与误差分析'
  },
  {
    id: 'pytorch-examples', roles: ['dl', 'cv'], title: 'PyTorch Examples · 神经网络训练实验',
    desc: '从训练循环入手理解张量、自动求导、损失函数和优化器的配合机制。通过保存与恢复模型、切换训练与评估模式，掌握一个深度学习实验的必要组成。',
    url: 'https://github.com/pytorch/examples', location: locations.global, level: '入门', tags: ['PyTorch', 'Autograd', 'Vision'],
    practice: '复现一个小型图像分类示例，分别改变学习率、批大小和正则化；记录训练曲线，并检查独立测试集表现与预测失败样本。',
    deliverable: '训练脚本、权重文件与三组对照实验'
  },
  {
    id: 'nanogpt', roles: ['pretrain', 'dl'], title: 'nanoGPT · 小型语言模型预训练',
    desc: '用紧凑代码梳理自回归语言建模、因果注意力、分词与梯度累积。学习吞吐、显存和训练步数之间的关系，理解训练损失下降与真实生成质量的区别。',
    url: 'https://github.com/karpathy/nanoGPT', location: locations.global, level: '高阶', tags: ['Transformer', 'PyTorch', 'Pretraining'],
    practice: '使用小语料和缩小配置跑通训练，保留独立验证集；比较上下文长度和批大小，定期保存检查点并生成固定提示词样本。',
    deliverable: '小模型检查点、训练曲线与生成样本对照'
  },
  {
    id: 'llamafactory', roles: ['posttrain', 'ml'], title: 'LlamaFactory · 指令微调实践',
    desc: '围绕数据格式、对话模板和参数高效微调理解后训练流程。重点区分训练与推理模板，检查数据重复、样本长度和验证集污染对评估的影响。',
    url: 'https://github.com/hiyouga/LlamaFactory', location: locations.global, level: '进阶', tags: ['SFT', 'LoRA', 'LLM'],
    practice: '按硬件条件选择小型可用模型，准备一组领域指令数据，执行小规模 LoRA 实验；在未参与训练的问题上比较微调前后答案。',
    deliverable: '数据说明、训练配置与固定评测集对比报告'
  },
  {
    id: 'trl', roles: ['posttrain', 'pretrain'], title: 'TRL · 偏好优化对照实验',
    desc: '从偏好样本与奖励信号理解语言模型后训练，梳理监督微调和偏好优化的目标差异。关注参考模型、长度偏差、偏好噪声以及评估集的构造。',
    url: 'https://github.com/huggingface/trl', location: locations.global, level: '高阶', tags: ['DPO', 'Alignment', 'Transformers'],
    practice: '根据当前文档选择一个小模型 DPO 示例，先检查成对数据，再以少量训练步数跑通流程；对比偏好胜率、回答长度与任务正确性。',
    deliverable: '偏好数据样例、实验配置和多指标评估表'
  },
  {
    id: 'vue-core', roles: ['frontend', 'software'], title: 'Vue Core · 响应式机制与组件实验',
    desc: '沿着响应式依赖收集、更新调度和组件渲染的路径阅读实现。通过小实验理解 ref、computed 与 effect 的联系，再把这些机制映射到实际页面性能问题。',
    url: 'https://github.com/vuejs/core', location: locations.global, level: '进阶', tags: ['Vue', 'TypeScript', 'Reactivity'],
    practice: '建立最小响应式实验并观察依赖触发，阅读对应测试；制作带搜索和列表的组件，比较稳定键值与无效重复渲染造成的差异。',
    deliverable: '机制阅读笔记、最小复现与组件性能记录'
  },
  {
    id: 'mall', roles: ['backend', 'software'], title: 'Mall · 电商交易系统',
    desc: '围绕商品、库存、购物车和订单梳理典型后端业务边界。理解关系数据建模、权限控制、缓存与事务一致性，练习把业务规则落实为接口约束。',
    url: 'https://github.com/macrozheng/mall', location: locations.global, level: '进阶', tags: ['Java', 'Spring Boot', 'MySQL'],
    practice: '按文档启动必要服务，走通商品到订单流程；选择一个接口补充参数校验和测试，分析重复提交、库存不足与权限失败的处理。',
    deliverable: '接口说明、交易流程图与异常用例清单'
  },
  {
    id: 'fastapi-fullstack', roles: ['software', 'frontend', 'backend'], title: 'Full Stack FastAPI · 全栈任务管理',
    desc: '通过一个现成全栈模板连接页面、接口和数据库。理解登录鉴权、模型校验、数据库迁移与容器配置如何配合，练习建立清晰的前后端数据契约。',
    url: 'https://github.com/fastapi/full-stack-fastapi-template', location: locations.global, level: '进阶', tags: ['FastAPI', 'React', 'PostgreSQL'],
    practice: '按 README 初始化项目，新增任务实体与列表页面；实现创建、编辑和权限隔离，为接口添加成功与失败测试，完成一次迁移。',
    deliverable: '可运行的任务管理应用、接口测试与部署说明'
  },
  {
    id: 'playwright', roles: ['testing', 'frontend'], title: 'Playwright · 端到端质量保障',
    desc: '学习浏览器上下文隔离、语义定位、自动等待与失败追踪。把用户流程转成可维护的测试，理解稳定断言、测试数据和网络依赖对结果的影响。',
    url: 'https://github.com/microsoft/playwright', location: locations.microsoft, level: '入门', tags: ['E2E', 'TypeScript', 'Testing'],
    practice: '为自己的站点覆盖导航、搜索和表单流程；加入窄屏与明暗模式场景，在失败时保存截图和 trace，消除依赖固定延时的等待。',
    deliverable: '一组自动化用例与可定位失败的测试报告'
  },
  {
    id: 'prometheus', roles: ['ops', 'backend'], title: 'Prometheus · 服务可观测性实验',
    desc: '理解时序数据、标签、采集和查询计算之间的关系。围绕请求量、错误率和延迟建立观测视角，分析高基数标签、采样窗口与告警噪声。',
    url: 'https://github.com/prometheus/prometheus', location: locations.global, level: '进阶', tags: ['Metrics', 'PromQL', 'Monitoring'],
    practice: '给一个本地服务暴露指标并配置采集；构造慢请求和错误，编写查询与告警条件，记录从触发告警到确认根因的步骤。',
    deliverable: '采集配置、关键查询与一份故障排查记录'
  },
  {
    id: 'algorithms-python', roles: ['algorithm', 'foundation'], title: 'The Algorithms · 算法验证实验',
    desc: '通过可阅读实现学习搜索、排序、图与动态规划。把复杂度分析、循环不变量和边界条件写进笔记，关注算法成立的输入假设与数据结构选择。',
    url: 'https://github.com/TheAlgorithms/Python', location: locations.global, level: '入门', tags: ['Python', 'Algorithms', 'Data Structures'],
    practice: '选择最短路或排序实现，先手工推导再独立编写；增加空输入、重复元素和极端规模测试，与标准实现或暴力结果交叉核对。',
    deliverable: '算法实现、复杂度分析与边界测试集'
  },
  {
    id: 'xv6', roles: ['foundation', 'embedded'], title: 'xv6 RISC-V · 操作系统内核实验',
    desc: '沿系统调用理解用户态与内核态切换，结合进程调度、页表和文件系统建立操作系统整体图景。先理解状态与资源所有权，再尝试修改内核。',
    url: 'https://github.com/mit-pdos/xv6-riscv', location: locations.mit, level: '高阶', tags: ['C', 'RISC-V', 'Operating Systems'],
    practice: '按仓库文档配置工具链并在模拟器启动；跟踪一个系统调用，添加一个简单观测功能，测试正常路径、非法参数与资源回收。',
    deliverable: '内核小改动、调用路径图与实验复盘'
  },
  {
    id: 'appsmith', roles: ['product', 'frontend'], title: 'Appsmith · 内部工具产品原型',
    desc: '以运营后台为场景理解用户任务、页面状态、数据权限与验收标准。把产品需求拆成可以操作和验证的流程，练习从原型发现业务规则缺口。',
    url: 'https://github.com/appsmithorg/appsmith', location: locations.global, level: '入门', tags: ['Product', 'Low-code', 'Dashboard'],
    practice: '选择工单或库存场景，连接测试数据，搭建查询和编辑页面；补充空状态、错误状态及角色权限，邀请同伴完成一次任务走查。',
    deliverable: '需求文档、可交互原型与用户走查结论'
  },
  {
    id: 'superset', roles: ['data', 'dataeng'], title: 'Apache Superset · 数据分析看板',
    desc: '从业务问题出发理解指标口径、数据粒度与可视化表达。分析聚合、过滤和时间窗口如何影响结论，避免用图表替代对数据质量和统计口径的检查。',
    url: 'https://github.com/apache/superset', location: locations.global, level: '进阶', tags: ['SQL', 'BI', 'Visualization'],
    practice: '使用示例数据或脱敏数据建立数据集，制作趋势与分布看板；核对 SQL 与图表数字，写清指标定义、适用范围和可能误读。',
    deliverable: '分析看板、SQL 查询与指标口径文档'
  },
  {
    id: 'juice-shop', roles: ['security', 'testing'], title: 'OWASP Juice Shop · Web 安全靶场',
    desc: '在有意设计的训练应用中理解输入边界、身份认证与访问控制。围绕威胁建模、漏洞复现、根因解释和修复验证学习完整的安全问题处理流程。',
    url: 'https://github.com/juice-shop/juice-shop', location: locations.global, level: '进阶', tags: ['OWASP', 'Web Security', 'Node.js'],
    practice: '在自己的隔离环境启动靶场，选择入门挑战，记录请求与响应；解释信任边界被破坏的位置，并提出参数化、编码或权限校验方案。',
    deliverable: '本地实验记录、风险说明与修复验证清单'
  },
  {
    id: 'kubernetes', roles: ['cloud', 'ops'], title: 'Kubernetes · 应用编排与弹性部署',
    desc: '围绕期望状态与控制循环理解容器编排，梳理 Pod、Deployment、Service 和配置资源的职责。分析健康检查、资源约束与滚动更新对稳定性的影响。',
    url: 'https://github.com/kubernetes/kubernetes', location: locations.global, level: '高阶', tags: ['Kubernetes', 'Containers', 'Cloud Native'],
    practice: '在本地测试集群部署一个小应用，配置探针和资源限制；执行扩缩容、滚动更新和回滚，观察事件与日志中的状态变化。',
    deliverable: '部署清单、发布流程与一次故障恢复记录'
  },
  {
    id: 'flink', roles: ['dataeng', 'distributed'], title: 'Apache Flink · 实时数据管道',
    desc: '理解有状态流处理中的事件时间、窗口、水位线与检查点。结合乱序、重放和失败恢复讨论计算正确性，区分业务去重与系统处理语义。',
    url: 'https://github.com/apache/flink', location: locations.global, level: '高阶', tags: ['Streaming', 'Java', 'Stateful Processing'],
    practice: '用本地样例数据建立窗口聚合作业，注入乱序和重复事件；启用检查点后模拟失败，核对恢复前后状态与结果是否符合预期。',
    deliverable: '流处理作业、输入样例与恢复验证报告'
  },
  {
    id: 'zephyr', roles: ['embedded', 'software'], title: 'Zephyr · 嵌入式实时系统入门',
    desc: '理解线程、同步原语、中断和设备抽象在实时系统中的作用。关注时序约束、内存占用与资源竞争，学习把硬件行为和软件调度联系起来。',
    url: 'https://github.com/zephyrproject-rtos/zephyr', location: locations.global, level: '进阶', tags: ['C', 'RTOS', 'IoT'],
    practice: '按官方指南选择支持的开发板或模拟目标，运行一个基础示例；增加周期任务和队列通信，记录线程优先级变化对执行次序的影响。',
    deliverable: '可运行固件或模拟实验、时序观察与资源记录'
  },
  {
    id: 'opencv', roles: ['cv', 'algorithm'], title: 'OpenCV · 图像处理与视觉流水线',
    desc: '通过滤波、边缘、特征和几何变换构建传统视觉基础。理解图像坐标、颜色空间与插值方法，分析光照、尺度和噪声对处理结果的影响。',
    url: 'https://github.com/opencv/opencv', location: locations.global, level: '入门', tags: ['OpenCV', 'Python', 'Computer Vision'],
    practice: '制作文档轮廓检测与透视校正小工具，分步骤保存中间结果；在不同光照、角度与背景下测试，记录失败原因并改进预处理。',
    deliverable: '图像处理工具、样例集与鲁棒性对比'
  },
  {
    id: 'dubbo', roles: ['distributed', 'backend'], title: 'Apache Dubbo · RPC 服务治理',
    desc: '围绕远程调用理解序列化、服务发现、超时与负载均衡。分析本地函数调用与跨网络调用的差异，重点学习重试放大、幂等和服务边界。',
    url: 'https://github.com/apache/dubbo', location: locations.global, level: '高阶', tags: ['Java', 'RPC', 'Microservices'],
    practice: '运行最小提供方与消费方示例，注入慢响应与不可用实例；比较超时和重试配置，给关键操作增加幂等约束并观察调用日志。',
    deliverable: 'RPC 示例、调用时序图与故障实验记录'
  },
  {
    id: 'ncnn', roles: ['cv', 'embedded', 'dl'], title: 'ncnn · 移动端视觉模型推理',
    desc: '从训练模型走向端侧推理，理解模型转换、算子支持与输入预处理的一致性。关注数值精度、内存与延迟，建立精度和性能同时验证的习惯。',
    url: 'https://github.com/Tencent/ncnn', location: locations.tencent, level: '高阶', tags: ['C++', 'Inference', 'Mobile'],
    practice: '选择仓库支持的示例模型，按文档完成构建与推理；对齐归一化和输入尺寸，比较若干样例的输出与运行时间，记录环境信息。',
    deliverable: '端侧推理演示、模型转换记录与性能表'
  },
  {
    id: 'spring-cloud-alibaba', roles: ['backend', 'cloud', 'distributed'], title: 'Spring Cloud Alibaba · 微服务协作实验',
    desc: '围绕服务发现、配置与流量治理理解微服务基础设施。把框架能力映射到实际故障场景，分析配置变更、调用依赖和限流策略对业务的影响。',
    url: 'https://github.com/alibaba/spring-cloud-alibaba', location: locations.alibaba, level: '进阶', tags: ['Java', 'Spring Cloud', 'Microservices'],
    practice: '按示例要求选择兼容版本，启动两个相互调用的服务；验证配置更新、实例下线与限流行为，保留配置和恢复过程说明。',
    deliverable: '双服务演示、配置清单与稳定性实验报告'
  }
];

export function repositoryUrl(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || !['github.com', 'gitee.com'].includes(url.hostname) || url.username || url.password || url.port) return null;
    if (!/^\/[^/]+\/[^/]+\/?$/.test(url.pathname)) return null;
    return url.href;
  } catch { return null; }
}

export function parseProjectFilters(hash, roles) {
  const params = new URLSearchParams(hash.split('?')[1] || '');
  return {
    role: roles.some(p => p.id === params.get('role')) ? params.get('role') : 'all',
    region: projectRegions.some(r => r.id === params.get('region')) ? params.get('region') : 'all',
    q: (params.get('q') || '').slice(0, 100)
  };
}

export function projectHash(filters) {
  const params = new URLSearchParams();
  if (filters.role !== 'all') params.set('role', filters.role);
  if (filters.region !== 'all') params.set('region', filters.region);
  if (filters.q.trim()) params.set('q', filters.q.trim().slice(0, 100));
  return '#projects' + (params.size ? '?' + params : '');
}

export function filterProjects(items, filters, roles) {
  const roleNames = new Map(roles.map(p => [p.id, p.title]));
  return items.filter(p =>
    (filters.role === 'all' || p.roles.includes(filters.role)) &&
    (filters.region === 'all' || p.location.region === filters.region) &&
    matchesQuery({ title: p.title, desc: p.desc, source: p.url, tags: [
      ...p.roles.map(id => roleNames.get(id)), ...p.tags, p.location.label,
      projectRegions.find(r => r.id === p.location.region)?.name, p.practice, p.deliverable
    ] }, filters.q)
  );
}
