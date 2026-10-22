import { matchesQuery } from './core.js';
import { mobilityProjects } from './mobility-data.js';

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

// Practice projects for the additional directions.
projects.push(...[
  {
    "id": "transformers-nlp",
    "roles": [
      "nlp",
      "ml"
    ],
    "title": "Transformers · 中文文本分类实验",
    "desc": "从预训练模型到文本分类与实体抽取，理解分词、标签和任务输出头如何协作。以固定数据和词项模型为基线，重点分析领域词汇、长文本截断、错误类别和评测集泄漏。",
    "url": "https://github.com/huggingface/transformers",
    "location": {
      "region": "global",
      "label": "全球协作",
      "note": "开源社区协作，未指定线下项目地点"
    },
    "level": "进阶",
    "tags": [
      "文本表示",
      "信息抽取",
      "语义理解"
    ],
    "practice": "选择能在现有设备运行的小型文本模型，保存数据切分与分词配置；复现分类或抽取任务，并比较逐类 F1、延迟和固定失败样本。",
    "deliverable": "训练配置、分类或抽取接口与误差分析"
  },
  {
    "id": "hanlp-nlp",
    "roles": [
      "nlp",
      "agent"
    ],
    "title": "HanLP · 中文信息抽取流水线",
    "desc": "围绕中文分词、实体与句法结果构建信息抽取流程。关注模型输出与原文偏移的对齐、混合语言边界和领域词汇，把自然语言处理结果转为可检查的结构化记录。",
    "url": "https://github.com/hankcs/HanLP",
    "location": {
      "region": "global",
      "label": "全球协作",
      "note": "开源社区协作，未指定线下项目地点"
    },
    "level": "进阶",
    "tags": [
      "文本表示",
      "信息抽取",
      "语义理解"
    ],
    "practice": "根据文档运行一组中文句子，检查分词、实体和偏移；建立领域样例集，对照词典或模型变化，记录边界错误与类型错误。",
    "deliverable": "文本抽取脚本、标注规范与错误对照集"
  },
  {
    "id": "recbole",
    "roles": [
      "recsys",
      "ml"
    ],
    "title": "RecBole · 推荐召回与排序评测",
    "desc": "通过统一框架理解推荐数据、模型和评价口径之间的关系。关注时间切分、候选池与负采样，比较热门或协同过滤基线和学习模型，防止把实验配置差异误认为模型提升。",
    "url": "https://github.com/RUCAIBox/RecBole",
    "location": {
      "region": "global",
      "label": "全球协作",
      "note": "开源社区协作，未指定线下项目地点"
    },
    "level": "进阶",
    "tags": [
      "召回排序",
      "特征工程",
      "离线评估"
    ],
    "practice": "使用一个小数据集与最小模型，固定随机种子和时间切分；对比 Recall 与 NDCG，单独报告新用户和低活跃用户表现。",
    "deliverable": "可复现配置、指标表与分组结果"
  },
  {
    "id": "gorse",
    "roles": [
      "recsys",
      "backend"
    ],
    "title": "Gorse · 推荐服务与冷启动",
    "desc": "把用户、物品与反馈连接为可查询的推荐服务，理解离线任务与在线接口的协作。重点观察无交互用户、历史不足物品以及数据更新后的候选变化，建立可解释的回退机制。",
    "url": "https://github.com/gorse-io/gorse",
    "location": {
      "region": "global",
      "label": "全球协作",
      "note": "开源社区协作，未指定线下项目地点"
    },
    "level": "进阶",
    "tags": [
      "召回排序",
      "特征工程",
      "离线评估"
    ],
    "practice": "导入本地示例反馈与物品，配置推荐接口；对新用户、空反馈与批量更新分别测试，记录候选、延迟和回退规则。",
    "deliverable": "推荐服务、数据导入与冷启动测试"
  },
  {
    "id": "flutter-samples",
    "roles": [
      "mobile",
      "frontend"
    ],
    "title": "Flutter Samples · 跨端应用实践",
    "desc": "从官方样例学习组件、状态与异步数据流，理解界面重建与平台能力的边界。选择小型应用逐步增加本地状态和异常页面，避免只在模拟器正常网络下验证功能。",
    "url": "https://github.com/flutter/samples",
    "location": {
      "region": "global",
      "label": "全球协作",
      "note": "开源社区协作，未指定线下项目地点"
    },
    "level": "进阶",
    "tags": [
      "Android",
      "Flutter",
      "跨端应用"
    ],
    "practice": "运行一个列表或状态样例，增加收藏与本地存储；测试旋转、字体放大、网络失败及重新启动，记录平台适配差异。",
    "deliverable": "可安装演示、状态设计与设备测试清单"
  },
  {
    "id": "nowinandroid",
    "roles": [
      "mobile",
      "software"
    ],
    "title": "Now in Android · 原生应用架构",
    "desc": "通过完整 Android 示例理解界面、数据层和模块协作。关注声明式状态、离线数据、依赖与测试边界，沿一次用户操作追踪从页面到持久化的完整数据流。",
    "url": "https://github.com/android/nowinandroid",
    "location": {
      "region": "global",
      "label": "全球协作",
      "note": "开源社区协作，未指定线下项目地点"
    },
    "level": "进阶",
    "tags": [
      "Android",
      "Flutter",
      "跨端应用"
    ],
    "practice": "按官方说明运行兼容构建，跟踪一个列表和收藏流程；为一个小变更增加测试，观察前后台切换、离线和重启后的状态。",
    "deliverable": "原生应用小改动、数据流图与回归记录"
  },
  {
    "id": "godot-demos",
    "roles": [
      "game",
      "graphics"
    ],
    "title": "Godot Demos · 2D 游戏玩法实验",
    "desc": "以可运行的演示学习场景、输入、物理和动画的组合，明确游戏逻辑与渲染频率的差异。通过角色状态、关卡重置与资源生命周期，把独立技术点组成可玩的完整闭环。",
    "url": "https://github.com/godotengine/godot-demo-projects",
    "location": {
      "region": "global",
      "label": "全球协作",
      "note": "开源社区协作，未指定线下项目地点"
    },
    "level": "进阶",
    "tags": [
      "游戏循环",
      "物理与动画",
      "玩法系统"
    ],
    "practice": "选择与引擎版本匹配的 2D 示例，增加计分、暂停和重开；在不同帧率下检查移动与碰撞，记录试玩反馈和资源变化。",
    "deliverable": "可玩小游戏、状态图与试玩复盘"
  },
  {
    "id": "cocos-engine",
    "roles": [
      "game",
      "software"
    ],
    "title": "Cocos Engine · 组件与场景机制",
    "desc": "沿引擎组件、事件和资源管理理解游戏对象的运行机制。结合 Cocos Creator 中文指南，从小型场景观察脚本生命周期、场景切换与事件清理，避免把引擎当作不可分析的工具。",
    "url": "https://github.com/cocos/cocos-engine",
    "location": {
      "region": "global",
      "label": "全球协作",
      "note": "开源社区协作，未指定线下项目地点"
    },
    "level": "进阶",
    "tags": [
      "游戏循环",
      "物理与动画",
      "玩法系统"
    ],
    "practice": "按文档选择兼容编辑器与引擎版本，建立最小组件场景；跟踪创建、激活、失活和销毁，测试对象池重置及场景重复加载。",
    "deliverable": "组件实验、生命周期记录与资源检查"
  },
  {
    "id": "threejs",
    "roles": [
      "graphics",
      "frontend"
    ],
    "title": "Three.js · 交互式三维展厅",
    "desc": "在浏览器中连接相机、几何、材质与交互，理解场景对象如何进入实时渲染管线。重点比较坐标变换、颜色管理与资源开销，把视觉效果写成可以复现实验的参数与步骤。",
    "url": "https://github.com/mrdoob/three.js",
    "location": {
      "region": "global",
      "label": "全球协作",
      "note": "开源社区协作，未指定线下项目地点"
    },
    "level": "进阶",
    "tags": [
      "渲染管线",
      "Shader",
      "三维交互"
    ],
    "practice": "从基础示例搭建三维场景，加入拾取与材质切换；测试不同窗口和设备，记录绘制调用、纹理资源及场景销毁后的释放。",
    "deliverable": "三维展厅、参数说明与性能对照"
  },
  {
    "id": "learnopengl",
    "roles": [
      "graphics",
      "foundation"
    ],
    "title": "LearnOpenGL · 渲染管线小实验",
    "desc": "通过低层图形示例理解顶点、纹理、法线、光照与深度测试，避免只记忆渲染 API。结合中文教程对照 Shader 输入输出，说明矩阵顺序和颜色空间对最终像素的影响。",
    "url": "https://github.com/JoeyDeVries/LearnOpenGL",
    "location": {
      "region": "global",
      "label": "全球协作",
      "note": "开源社区协作，未指定线下项目地点"
    },
    "level": "进阶",
    "tags": [
      "渲染管线",
      "Shader",
      "三维交互"
    ],
    "practice": "选择基础变换和光照章节对应代码，固定相机与灯光；分别改变法线、纹理和颜色转换，对照画面及 Shader 计算解释结果。",
    "deliverable": "渲染实验、着色器说明与结果截图"
  },
  {
    "id": "mlflow",
    "roles": [
      "mlops",
      "ml",
      "ops"
    ],
    "title": "MLflow · 模型实验与版本追踪",
    "desc": "用可追溯实验连接数据、参数、评测与模型工件，理解模型生命周期不止保存权重。通过两组小实验建立基线、记录环境和恢复方法，为后续灰度与回滚提供版本依据。",
    "url": "https://github.com/mlflow/mlflow",
    "location": {
      "region": "global",
      "label": "全球协作",
      "note": "开源社区协作，未指定线下项目地点"
    },
    "level": "高阶",
    "tags": [
      "实验管理",
      "模型服务",
      "推理优化"
    ],
    "practice": "使用轻量模型记录数据切分、参数、指标和工件；在新目录恢复一次运行，检查模型契约，并整理新旧版本的固定评测对照。",
    "deliverable": "实验台账、模型版本与可重现评测"
  },
  {
    "id": "vllm",
    "roles": [
      "mlops",
      "posttrain",
      "ops"
    ],
    "title": "vLLM · 模型推理服务性能实验",
    "desc": "理解语言模型推理中的批处理、缓存与执行阶段，比较首 token 延迟、吞吐和显存。性能结论需要与模型、硬件、输入输出长度及并发一起解释，并保留质量验证。",
    "url": "https://github.com/vllm-project/vllm",
    "location": {
      "region": "global",
      "label": "全球协作",
      "note": "开源社区协作，未指定线下项目地点"
    },
    "level": "高阶",
    "tags": [
      "实验管理",
      "模型服务",
      "推理优化"
    ],
    "practice": "根据硬件支持选择小模型与运行方式，在固定请求集上改变并发和长度；记录首 token、总延迟、吞吐、显存及任务质量。",
    "deliverable": "模型服务、负载脚本与性能矩阵"
  },
  {
    "id": "mininet",
    "roles": [
      "network",
      "ops"
    ],
    "title": "Mininet · 可复现网络拓扑",
    "desc": "使用虚拟主机、链路与交换建立可控网络，观察地址、转发与请求时序。通过人为设置延迟和链路故障，把协议概念转为能重复验证的拓扑与诊断证据。",
    "url": "https://github.com/mininet/mininet",
    "location": {
      "region": "global",
      "label": "全球协作",
      "note": "开源社区协作，未指定线下项目地点"
    },
    "level": "进阶",
    "tags": [
      "交换与路由",
      "协议分析",
      "网络排障"
    ],
    "practice": "在支持的隔离环境建立多主机拓扑，配置地址和路由；改变延迟或断开链路，对照抓包、路径和可达性，保存恢复步骤。",
    "deliverable": "拓扑脚本、地址规划与故障时间线"
  },
  {
    "id": "frrouting",
    "roles": [
      "network",
      "cloud"
    ],
    "title": "FRRouting · 动态路由实验",
    "desc": "围绕路由协议、邻居与转发表理解控制平面和数据平面的关系。通过最小拓扑观察路由建立、链路变化和收敛，建立配置变更、验证与回退的工程流程。",
    "url": "https://github.com/FRRouting/frr",
    "location": {
      "region": "global",
      "label": "全球协作",
      "note": "开源社区协作，未指定线下项目地点"
    },
    "level": "进阶",
    "tags": [
      "交换与路由",
      "协议分析",
      "网络排障"
    ],
    "practice": "按官方说明在虚拟网络运行最小路由示例，记录邻居和路由表；注入一次链路故障，对比收敛期间丢包与恢复，验证配置回退。",
    "deliverable": "路由配置、收敛记录与变更报告"
  },
  {
    "id": "ros2-examples",
    "roles": [
      "robotics",
      "embedded"
    ],
    "title": "ROS 2 Examples · 消息与节点实验",
    "desc": "从官方最小节点示例理解发布订阅、服务和执行器，检查消息类型、QoS 与运行环境。把通信是否建立与数据的坐标、时间语义分开验证，为仿真系统提供可靠组件边界。",
    "url": "https://github.com/ros2/examples",
    "location": {
      "region": "global",
      "label": "全球协作",
      "note": "开源社区协作，未指定线下项目地点"
    },
    "level": "高阶",
    "tags": [
      "ROS 2",
      "感知定位",
      "规划控制"
    ],
    "practice": "选择与 ROS 2 发行版兼容的样例，运行发布订阅和服务；修改频率与 QoS，记录正常、失配和恢复过程，并解释消息时序。",
    "deliverable": "节点代码、配置清单与通信排查记录"
  },
  {
    "id": "webots",
    "roles": [
      "robotics",
      "cv",
      "embedded"
    ],
    "title": "Webots · 移动机器人导航仿真",
    "desc": "在可重复的仿真世界内连接传感器、运动与控制，分析理想路径和实际轨迹的差异。重点记录地图、设备参数与噪声，为障碍、时延和定位错误建立可验证的停止行为。",
    "url": "https://github.com/cyberbotics/webots",
    "location": {
      "region": "global",
      "label": "全球协作",
      "note": "开源社区协作，未指定线下项目地点"
    },
    "level": "高阶",
    "tags": [
      "ROS 2",
      "感知定位",
      "规划控制"
    ],
    "practice": "从小型移动机器人样例起步，固定世界与控制参数；记录轨迹和误差，加入障碍或传感器异常，验证告警与停止并说明仿真边界。",
    "deliverable": "仿真世界、导航演示与异常验证"
  },
  {
    "id": "llvm-project",
    "roles": [
      "compiler",
      "foundation"
    ],
    "title": "LLVM · 小语言与中间表示",
    "desc": "从官方教程的小语言构建前端与中间表示，理解语法树、类型和代码生成的衔接。只选必要组件与示例，重点验证 IR 语义、错误诊断和优化前后行为，而非追求完整工具链功能。",
    "url": "https://github.com/llvm/llvm-project",
    "location": {
      "region": "global",
      "label": "全球协作",
      "note": "开源社区协作，未指定线下项目地点"
    },
    "level": "高阶",
    "tags": [
      "语法分析",
      "中间表示",
      "代码生成"
    ],
    "practice": "按文档选择可用的发行工具链或最小构建，完成表达式到 IR 的示例；实现一个小扩展，用正反例和差分执行验证含义。",
    "deliverable": "小语言原型、IR 对照与测试集"
  },
  {
    "id": "crafting-interpreters",
    "roles": [
      "compiler",
      "software"
    ],
    "title": "Crafting Interpreters · 自制解释器",
    "desc": "通过一门小语言理解词法、解析、作用域与解释执行的配合。关注错误位置、变量生命周期和求值顺序，通过边界程序解释语言语义，不把演示成功当作正确性证明。",
    "url": "https://github.com/munificent/craftinginterpreters",
    "location": {
      "region": "global",
      "label": "全球协作",
      "note": "开源社区协作，未指定线下项目地点"
    },
    "level": "高阶",
    "tags": [
      "语法分析",
      "中间表示",
      "代码生成"
    ],
    "practice": "按章节选择树遍历解释器实现，加入变量或块作用域；构造非法表达式、名称遮蔽和重复运行测试，记录诊断与执行输出。",
    "deliverable": "解释器、语言说明与正反例回归"
  },
  {
    "id": "solidity-engineering",
    "roles": [
      "blockchain",
      "security"
    ],
    "title": "Solidity · 本地合约与状态验证",
    "desc": "通过合约语言与本地链理解状态修改、权限和失败回滚，围绕不变量组织测试。工程重点是可验证行为与信任边界，而不是交易或资产展示；示例只使用开发账户和本地测试数据。",
    "url": "https://github.com/argotorg/solidity",
    "location": {
      "region": "global",
      "label": "全球协作",
      "note": "开源社区协作，未指定线下项目地点"
    },
    "level": "进阶",
    "tags": [
      "智能合约",
      "状态机",
      "链上应用"
    ],
    "practice": "使用官方文档与兼容工具链编写证书登记合约，测试权限和边界；记录交易回执、事件及状态，验证失败操作不会破坏不变量。",
    "deliverable": "本地合约、权限矩阵与自动化测试"
  },
  {
    "id": "fabric-samples",
    "roles": [
      "blockchain",
      "distributed"
    ],
    "title": "Fabric Samples · 联盟链流程实验",
    "desc": "通过测试网络理解组织身份、背书、提交与账本状态的基本协作，区分许可网络与公开网络的假设。结合查询和事件消费说明链上事实、应用缓存和确认语义之间的关系。",
    "url": "https://github.com/hyperledger/fabric-samples",
    "location": {
      "region": "global",
      "label": "全球协作",
      "note": "开源社区协作，未指定线下项目地点"
    },
    "level": "进阶",
    "tags": [
      "智能合约",
      "状态机",
      "链上应用"
    ],
    "practice": "按样例启动本地测试网络并执行查询与写入，记录身份和交易状态；重启应用后重放事件，与账本核对并整理恢复步骤。",
    "deliverable": "测试网络、调用脚本与事件重放报告"
  }
]);

export function repositoryUrl(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || !['github.com', 'gitee.com'].includes(url.hostname) || url.username || url.password || url.port) return null;
    if (!/^\/[^/]+\/[^/]+\/?$/.test(url.pathname)) return null;
    return url.href;
  } catch { return null; }
}

projects.push(...mobilityProjects);

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
