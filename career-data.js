import { paths } from './data.js';
import { mobilityPrep } from './mobility-data.js';
// 公司场景与准备重点为站内编辑建议，不代表官方考题、招聘承诺或固定面试流程。
export const companies = [
  {
    "id": "bytedance",
    "title": "字节跳动",
    "en": "ByteDance",
    "mark": "B",
    "color": "#267b9a",
    "url": "https://jobs.bytedance.com/",
    "linkLabel": "官方招聘",
    "theme": "内容与规模化服务",
    "scenario": "以内容分发、创作工具或高并发服务为练习背景",
    "prompts": [
      "解释用户体验与系统性能之间的取舍",
      "准备峰值流量、故障降级和数据指标的讨论",
      "用可复现实验支撑项目结论"
    ],
    "keywords": [
      "字节",
      "抖音",
      "ByteDance"
    ]
  },
  {
    "id": "alibaba",
    "title": "阿里巴巴",
    "en": "Alibaba",
    "mark": "A",
    "color": "#c57933",
    "url": "https://talent.alibaba.com/",
    "linkLabel": "官方招聘",
    "theme": "交易与企业服务",
    "scenario": "以电商交易、企业应用或云服务为练习背景",
    "prompts": [
      "围绕交易链路讨论一致性和可观测性",
      "讲清业务规则、技术边界与成本",
      "准备一次跨团队交付和线上排障复盘"
    ],
    "keywords": [
      "阿里",
      "淘宝",
      "Alibaba"
    ]
  },
  {
    "id": "tencent",
    "title": "腾讯",
    "en": "Tencent",
    "mark": "T",
    "color": "#417bd0",
    "url": "https://careers.tencent.com/",
    "linkLabel": "官方招聘",
    "theme": "连接与互动体验",
    "scenario": "以即时通信、互动产品或在线服务为练习背景",
    "prompts": [
      "考虑弱网、并发互动和长连接场景",
      "解释数据隐私、稳定性与产品体验的权衡",
      "准备协作推进、质量保障和风险处理案例"
    ],
    "keywords": [
      "腾讯",
      "微信",
      "Tencent"
    ]
  },
  {
    "id": "moonshot",
    "title": "月之暗面",
    "en": "Moonshot AI · Kimi",
    "mark": "K",
    "color": "#5f668f",
    "url": "https://careers.kimi.com/",
    "linkLabel": "官方招聘",
    "theme": "长文本与智能应用",
    "scenario": "以长文档问答、检索或智能助手为练习背景",
    "prompts": [
      "围绕长输入、信息召回与答案依据设计评测",
      "说明数据质量、推理成本和端到端体验",
      "准备对模型错误、工具失败与迭代结果的分析"
    ],
    "keywords": [
      "月之暗面",
      "Moonshot",
      "Kimi"
    ]
  },
  {
    "id": "minimax",
    "title": "MiniMax",
    "en": "MiniMax",
    "mark": "M",
    "color": "#ae637d",
    "url": "https://www.minimaxi.com/careers",
    "linkLabel": "官方招聘",
    "theme": "多模态与生成体验",
    "scenario": "以多模态生成、语音交互或智能应用为练习背景",
    "prompts": [
      "考虑生成质量、交互延迟和成本的联合评估",
      "说明不同输入模态的数据质量与异常处理",
      "准备实验复现、质量回归和产品迭代案例"
    ],
    "keywords": [
      "MiniMax",
      "minimax",
      "稀宇"
    ]
  }
];
companies.push(
  { id: 'meituan', title: '美团', en: 'Meituan', mark: '美', color: '#a27d0a', url: 'https://zhaopin.meituan.com/', linkLabel: '官方招聘', verifiedAt: '2026-10-22', theme: '本地生活与即时履约', scenario: '以配送调度、本地生活交易或无人配送系统为练习背景', prompts: ['讨论订单履约、调度优化和高峰稳定性', '区分无人配送的感知定位、规划控制与平台职责', '用固定场景和容量数据说明方案取舍'], keywords: ['美团', 'Meituan', '外卖', '配送'] },
  { id: 'zhipu', title: '智谱', en: 'Z.ai · Zhipu AI', mark: '智', color: '#5478b2', url: 'https://www.zhipuai.cn/zh/joinus', linkLabel: '官方招聘', verifiedAt: '2026-10-22', theme: '通用模型与智能体应用', scenario: '以模型训练、推理服务、多模态或智能体应用为练习背景', prompts: ['准备数据质量、训练评估和推理成本分析', '区分模型能力与应用工具链的职责', '保留可复现实验、评测集和失败案例'], keywords: ['智谱', 'Zhipu', 'GLM', 'Z.ai'] },
  { id: 'jd', title: '京东', en: 'JD.com', mark: '京', color: '#b74448', url: 'https://zhaopin.jd.com/', linkLabel: '官方招聘', verifiedAt: '2026-10-22', theme: '零售供应链与物流技术', scenario: '以零售交易、仓储履约、配送或机器人系统为练习背景', prompts: ['围绕库存、订单和物流链路讨论一致性', '解释仓储机器人数据、调度与系统接口', '准备并发容量、异常恢复和工程交付证据'], keywords: ['京东', 'JD', '物流', '供应链'] },
  { id: 'baidu', title: '百度', en: 'Baidu', mark: '百', color: '#4366b4', url: 'https://talent.baidu.com/', linkLabel: '官方招聘', verifiedAt: '2026-10-22', theme: '搜索、模型与智能驾驶', scenario: '以搜索服务、模型应用或 Apollo 驾驶仿真为练习背景', prompts: ['区分搜索检索排序、模型服务与驾驶算法', '准备感知融合、规划控制或车载测试的具体证据', '解释数据闭环、场景覆盖和版本回归'], keywords: ['百度', 'Baidu', 'Apollo', '智能驾驶', '文心'] },
  { id: 'mihoyo', title: '米哈游', en: 'miHoYo', mark: '米', color: '#2a8795', url: 'https://jobs.mihoyo.com/', linkLabel: '官方招聘', verifiedAt: '2026-10-22', theme: '游戏技术与互动内容', scenario: '以游戏客户端、引擎渲染、服务端或技术工具为练习背景', prompts: ['讲清帧循环、资源生命周期和性能分析', '准备渲染、网络同步或自动化质量的独立项目', '说明美术协作、工具效率和跨平台边界'], keywords: ['米哈游', 'miHoYo', '游戏', '原神', '星穹铁道'] },
  { id: 'netease', title: '网易', en: 'NetEase', mark: '网', color: '#a2505d', url: 'https://hr.163.com/', linkLabel: '官方招聘', verifiedAt: '2026-10-22', theme: '游戏、内容与互联网服务', scenario: '以在线游戏、内容产品、音视频或高并发服务为练习背景', prompts: ['准备客户端、游戏服务端或内容推荐的工程证据', '讨论多人状态、质量保障与线上稳定性', '用指标与失败复盘说明业务和技术取舍'], keywords: ['网易', 'NetEase', '游戏', '云音乐', '有道'] },
  {
    id: 'huawei', title: '华为', en: 'Huawei', mark: '华', color: '#c63b45',
    url: 'https://career.huawei.com/reccampportal/portal5/index.html', linkLabel: '官方招聘', verifiedAt: '2026-10-23',
    theme: '连接、计算、云与智能终端',
    scenario: '以通信网络、基础软件、昇腾 AI、云服务、智能终端或智能汽车解决方案为练习背景',
    prompts: ['从操作系统、网络、芯片或算法底层机制解释方案边界', '准备性能、可靠性、功耗、安全与工程交付的量化证据', '根据具体 JD 核对业务线、工作地点、招聘类型与技术栈'],
    keywords: ['华为', 'Huawei', '鸿蒙', '昇腾', '鲲鹏', '云服务', '通信', '芯片', '智能驾驶'],
    roleFamilies: [
      { id: 'ai-infra', title: 'AI Infra 工程师', pathIds: ['mlops', 'distributed', 'cloud'], professionalRoleId: 'cloud-engineer', focus: '训练与推理平台、分布式系统、加速与资源调度' },
      { id: 'ai-application', title: 'AI 应用工程师', pathIds: ['agent', 'nlp'], professionalRoleId: 'ai-application-engineer', focus: '智能体、RAG、工具调用、评测与服务工程' },
      { id: 'ai-model', title: 'AI 模型工程师', pathIds: ['pretrain', 'posttrain', 'dl'], professionalRoleId: 'ml-engineer', focus: '预训练、后训练、模型评测与推理优化' },
      { id: 'ai-security', title: 'AI 安全与隐私工程师', pathIds: ['security', 'ml'], professionalRoleId: 'security-engineer', focus: '模型与数据安全、隐私保护、攻防评测与治理' },
      { id: 'hardware', title: '硬件技术工程师', pathIds: ['embedded'], focus: '数字电路、板级系统、驱动调试、可靠性与功耗' },
      { id: 'software', title: '软件开发工程师', pathIds: ['software', 'backend', 'mobile'], professionalRoleId: 'backend-engineer', focus: '基础软件、业务服务、终端应用与工程质量' },
      { id: 'chip', title: '芯片与器件工程师', pathIds: ['compiler', 'embedded'], focus: '芯片架构、编译工具链、驱动适配与软硬件协同' },
      { id: 'data-science', title: '数据科学工程师', pathIds: ['data', 'dataeng'], professionalRoleId: 'data-engineer', focus: '数据治理、特征工程、指标体系与分析建模' },
      { id: 'algorithm', title: '算法工程师', pathIds: ['algorithm', 'cv', 'recsys'], professionalRoleId: 'algorithm-engineer', focus: '算法设计、复杂度、视觉与搜索推荐建模' },
      { id: 'network-security', title: '网络安全与隐私工程师', pathIds: ['security', 'network'], professionalRoleId: 'security-engineer', focus: '网络协议、安全架构、漏洞治理与数据合规' },
      { id: 'cloud-service', title: '云服务开发工程师', pathIds: ['cloud', 'ops', 'distributed'], professionalRoleId: 'cloud-engineer', focus: '云原生平台、可靠性、可观测性与多租户隔离' },
      { id: 'network-research', title: '网络技术研究工程师', pathIds: ['network', 'distributed'], professionalRoleId: 'sre-engineer', focus: '网络协议、性能建模、分布式通信与系统研究' },
      { id: 'automation-control', title: '自动化控制工程师', pathIds: ['robotics', 'embedded'], professionalRoleId: 'robot-control-engineer', focus: '运动控制、实时系统、传感器执行器与系统联调' },
      { id: 'intelligent-driving', title: '智能驾驶算法工程师', pathIds: ['driving', 'cv'], professionalRoleId: 'driving-planning-engineer', focus: '感知融合、定位、预测规划控制与仿真验证' }
    ]
  }
);
export const rolePrep = [
  {
    "id": "agent",
    "skills": [
      "工具调用与状态管理",
      "RAG 与评测",
      "异步、重试与安全边界"
    ],
    "project": "做一个有来源引用、工具调用记录和失败恢复的知识库助手。",
    "written": "手写检索排序与异步任务调度，覆盖超时、空结果与重复调用。",
    "interview": "把一次失败请求沿检索、推理、工具执行逐层复盘，用成功率和成本解释改进。",
    "questions": [
      {
        "id": "agent-1",
        "role": "agent",
        "type": "written",
        "title": "实现一个有超时与重试的工具执行器",
        "answer": [
          "区分瞬时错误与不可重试错误，设置重试上限和退避",
          "使用超时及取消机制，避免任务一直占用资源",
          "通过幂等键防止重复副作用，输出可追踪日志"
        ],
        "pitfall": "对有副作用的操作直接无限重试。",
        "origin": "站内原创练习"
      },
      {
        "id": "agent-2",
        "role": "agent",
        "type": "written",
        "title": "如何评价知识库检索是否有效？",
        "answer": [
          "建立问题、证据与答案标注集，按文档划分避免泄漏",
          "计算 Recall@K 等检索指标，并单独评估答案正确性和引用依据",
          "比较分块、混合检索与重排配置，同时记录延迟和成本"
        ],
        "pitfall": "只看几个成功案例，混淆检索质量与生成质量。",
        "origin": "站内原创练习"
      },
      {
        "id": "agent-3",
        "role": "agent",
        "type": "technical",
        "title": "什么时候使用工作流，什么时候使用自主 Agent？",
        "answer": [
          "从任务稳定性、可验证性和错误成本解释选择",
          "明确状态、终止条件、工具权限与人工确认点",
          "用失败恢复和可观测性说明如何上线"
        ],
        "pitfall": "认为工具越多、循环越长，能力就一定越强。",
        "origin": "站内原创练习"
      },
      {
        "id": "agent-4",
        "role": "agent",
        "type": "project",
        "title": "如何证明你的 Agent 比基础方案更好？",
        "answer": [
          "定义同一测试集上的基础检索或单次调用基线",
          "报告任务成功率、错误类型、P95 延迟与单任务成本",
          "做消融并解释提升来源和不适用场景"
        ],
        "pitfall": "把提示词变动与模型、数据变动混在一起比较。",
        "origin": "站内原创练习"
      }
    ]
  },
  {
    "id": "ml",
    "skills": [
      "统计与泛化",
      "特征与数据泄漏",
      "实验与误差分析"
    ],
    "project": "完成含数据校验、交叉验证和误差分群的分类任务。",
    "written": "手推逻辑回归梯度，解释偏差方差与常用指标，手写数据切分。",
    "interview": "从数据分布、基线、验证方案和误差类型讲清一轮建模。",
    "questions": [
      {
        "id": "ml-1",
        "role": "ml",
        "type": "written",
        "title": "为什么不能在全量数据上先标准化再划分？",
        "answer": [
          "预处理参数包含测试集信息，造成泄漏",
          "将拟合过程放在训练折内，用 Pipeline 组织变换",
          "时间相关数据按时间切分，用户重复样本按组隔离"
        ],
        "pitfall": "只删除标签列就认定没有泄漏。",
        "origin": "站内原创练习"
      },
      {
        "id": "ml-2",
        "role": "ml",
        "type": "written",
        "title": "推导逻辑回归的损失和梯度",
        "answer": [
          "写出 sigmoid、二元交叉熵以及参数维度",
          "通过链式法则得到梯度，说明正则项影响",
          "使用数值稳定实现，并用有限差分检查"
        ],
        "pitfall": "忽略极端输入导致的 log(0) 和溢出。",
        "origin": "站内原创练习"
      },
      {
        "id": "ml-3",
        "role": "ml",
        "type": "technical",
        "title": "类别不平衡时如何选择指标？",
        "answer": [
          "先明确漏报与误报的业务成本",
          "比较 PR-AUC、召回率、精确率与阈值变化",
          "检查校准和分群表现，必要时调整样本或权重"
        ],
        "pitfall": "只报告准确率，不说明正负样本比例。",
        "origin": "站内原创练习"
      },
      {
        "id": "ml-4",
        "role": "ml",
        "type": "project",
        "title": "离线指标提升，线上没有提升怎么办？",
        "answer": [
          "核对数据口径、切分方式和分布偏移",
          "检查特征在线离线一致性与标签延迟",
          "通过控制实验和分群定位问题，给出回退方案"
        ],
        "pitfall": "没有排查实验和埋点就继续堆复杂模型。",
        "origin": "站内原创练习"
      }
    ]
  },
  {
    "id": "dl",
    "skills": [
      "张量与反向传播",
      "优化与正则化",
      "复现与消融"
    ],
    "project": "复现一个视觉或文本模型，并提交消融和资源消耗报告。",
    "written": "手推反向传播、计算网络尺寸与参数量，用张量写训练循环。",
    "interview": "解释模型设计为什么有效，并用对照实验区分实现错误与算法改进。",
    "questions": [
      {
        "id": "dl-1",
        "role": "dl",
        "type": "written",
        "title": "实现稳定的 softmax 交叉熵",
        "answer": [
          "减去最大 logit 或使用 logsumexp 避免溢出",
          "区分 batch 与类别维度，检查张量形状",
          "验证极端输入、梯度和 reduction 方式"
        ],
        "pitfall": "直接 exp 后再取 log，忽略数值稳定性。",
        "origin": "站内原创练习"
      },
      {
        "id": "dl-2",
        "role": "dl",
        "type": "written",
        "title": "如何估算一个网络的训练显存？",
        "answer": [
          "分别统计参数、梯度、优化器状态和激活",
          "考虑精度、batch size、序列长度与临时缓冲区",
          "说明梯度检查点与累积如何改变峰值和时间"
        ],
        "pitfall": "只用参数量乘以权重字节数。",
        "origin": "站内原创练习"
      },
      {
        "id": "dl-3",
        "role": "dl",
        "type": "technical",
        "title": "训练损失不下降，如何定位？",
        "answer": [
          "先用少量样本验证能否过拟合，检查标签与损失",
          "检查梯度、学习率、归一化、模式切换和随机种子",
          "逐层对照输出并设置可重复的最小实验"
        ],
        "pitfall": "没有验证数据和梯度就更换模型架构。",
        "origin": "站内原创练习"
      },
      {
        "id": "dl-4",
        "role": "dl",
        "type": "project",
        "title": "如何设计可信的消融实验？",
        "answer": [
          "固定数据、训练预算和评测方式，仅改变目标因素",
          "多次运行或报告变动范围，保存配置与检查点",
          "同时记录质量、速度与资源开销"
        ],
        "pitfall": "比较不同训练预算的结果后直接归因于结构。",
        "origin": "站内原创练习"
      }
    ]
  },
  {
    "id": "pretrain",
    "skills": [
      "语料与分词",
      "训练并行与数值稳定",
      "评测与复现"
    ],
    "project": "完成小规模语言模型预训练，记录语料版本、吞吐、损失和下游评测。",
    "written": "估算 Transformer 参数和显存，手写因果掩码与样本打包。",
    "interview": "说明数据配比、并行策略和训练故障如何共同影响效果与效率。",
    "questions": [
      {
        "id": "pretrain-1",
        "role": "pretrain",
        "type": "written",
        "title": "如何构造自回归语言模型的训练标签？",
        "answer": [
          "输入与标签错位一位，用因果掩码防止看到未来",
          "说明 padding、文档边界和 loss mask 的处理",
          "用极小样本验证移位、注意力范围和有效 token 数"
        ],
        "pitfall": "只关注 batch 形状，忽略跨文档信息与标签错位。",
        "origin": "站内原创练习"
      },
      {
        "id": "pretrain-2",
        "role": "pretrain",
        "type": "written",
        "title": "比较数据、张量与流水线并行",
        "answer": [
          "数据并行划分样本，梯度聚合需要通信",
          "张量并行拆算子，流水线并行拆层并引入气泡",
          "结合模型大小、互联带宽和 microbatch 分析选择"
        ],
        "pitfall": "把所有并行策略当成可无成本叠加。",
        "origin": "站内原创练习"
      },
      {
        "id": "pretrain-3",
        "role": "pretrain",
        "type": "technical",
        "title": "训练发生 loss spike 时怎么办？",
        "answer": [
          "检查异常 batch、数据损坏、溢出与梯度范数",
          "核对精度、学习率、恢复状态和分布式一致性",
          "用检查点与样本回放定位，记录恢复与跳过策略"
        ],
        "pitfall": "直接跳过问题数据却不记录原因和影响。",
        "origin": "站内原创练习"
      },
      {
        "id": "pretrain-4",
        "role": "pretrain",
        "type": "project",
        "title": "怎样证明语料质量改进有效？",
        "answer": [
          "保持训练预算、评测集和模型配置可比较",
          "记录去重、过滤、许可和数据配比，防止评测污染",
          "比较损失、下游能力与不同语种或领域的变化"
        ],
        "pitfall": "只依据训练 loss 判断最终模型能力。",
        "origin": "站内原创练习"
      }
    ]
  },
  {
    "id": "posttrain",
    "skills": [
      "SFT 与偏好学习",
      "数据质量与对齐评估",
      "LoRA 与训练稳定性"
    ],
    "project": "完成小规模 SFT 与偏好优化对照，输出质量、安全和成本评测。",
    "written": "写出 SFT 的 loss mask，解释 DPO 目标与 LoRA 参数量。",
    "interview": "先讲数据与评测，再讲训练方法，用错误分析解释收益和副作用。",
    "questions": [
      {
        "id": "posttrain-1",
        "role": "posttrain",
        "type": "written",
        "title": "SFT 为什么需要区分 prompt 与 response 的损失？",
        "answer": [
          "解释只在目标回复计算损失的常见任务设置",
          "正确处理模板、特殊 token、padding 与截断",
          "通过样本可视化验证 mask 与标签是否对齐"
        ],
        "pitfall": "模板变化后沿用旧 mask，导致监督位置错误。",
        "origin": "站内原创练习"
      },
      {
        "id": "posttrain-2",
        "role": "posttrain",
        "type": "written",
        "title": "LoRA 如何影响参数量与训练显存？",
        "answer": [
          "写出低秩增量矩阵的维度和可训练参数量",
          "分析秩、目标层与缩放对表达和开销的影响",
          "区分可训练参数节约与激活显存、推理成本"
        ],
        "pitfall": "认为参数少就一定不需要大量激活显存。",
        "origin": "站内原创练习"
      },
      {
        "id": "posttrain-3",
        "role": "posttrain",
        "type": "technical",
        "title": "偏好优化后回复更长，如何判断是否变好？",
        "answer": [
          "检查偏好数据和评审是否存在长度偏差",
          "在同一问题集上评估正确性、简洁性与遵循指令",
          "分群检查退化，避免只依赖单一自动打分"
        ],
        "pitfall": "把长度增长直接当成质量提升。",
        "origin": "站内原创练习"
      },
      {
        "id": "posttrain-4",
        "role": "posttrain",
        "type": "project",
        "title": "如何对比 SFT 与 DPO 实验？",
        "answer": [
          "固定基座、数据边界和评测集，记录训练配置",
          "说明参考模型、偏好标签质量与训练预算",
          "报告提升、退化、置信区间或变动范围及回退策略"
        ],
        "pitfall": "没有基线和错误样本，只展示挑选过的回复。",
        "origin": "站内原创练习"
      }
    ]
  },
  {
    "id": "frontend",
    "skills": [
      "JS 与浏览器",
      "组件状态与工程化",
      "性能与可访问性"
    ],
    "project": "完成带搜索、表单、权限状态和自动化测试的响应式应用。",
    "written": "手写防抖、Promise 调度与数据转换，解释事件循环执行顺序。",
    "interview": "用一次状态设计或性能优化说明取舍，现场展示定位过程。",
    "questions": [
      {
        "id": "frontend-1",
        "role": "frontend",
        "type": "written",
        "title": "实现支持取消的防抖函数",
        "answer": [
          "说明 this、参数透传和计时器管理",
          "区分首次调用、尾部调用与取消语义",
          "测试连续调用、取消和组件卸载"
        ],
        "pitfall": "只给简化代码，不说明边界和清理机制。",
        "origin": "站内原创练习"
      },
      {
        "id": "frontend-2",
        "role": "frontend",
        "type": "written",
        "title": "如何解释事件循环的执行顺序？",
        "answer": [
          "区分同步栈、任务和微任务",
          "结合 Promise、定时器及浏览器渲染时机推演",
          "说明浏览器与运行时差异，避免不成立的绝对结论"
        ],
        "pitfall": "背输出顺序，却无法说明每一步入队原因。",
        "origin": "站内原创练习"
      },
      {
        "id": "frontend-3",
        "role": "frontend",
        "type": "technical",
        "title": "列表卡顿时如何定位？",
        "answer": [
          "使用性能工具区分网络、脚本、布局与绘制瓶颈",
          "检查长任务、重复渲染、列表规模与状态范围",
          "选择虚拟列表或计算缓存，并验证交互和可访问性"
        ],
        "pitfall": "未测量就对所有组件添加缓存。",
        "origin": "站内原创练习"
      },
      {
        "id": "frontend-4",
        "role": "frontend",
        "type": "project",
        "title": "如何设计一个可靠的搜索页面？",
        "answer": [
          "组织查询、筛选、分页与 URL 状态",
          "处理并发竞态、错误、空状态和键盘操作",
          "提供可重复测试，并记录首屏与交互表现"
        ],
        "pitfall": "旧请求覆盖新请求，或刷新后状态丢失。",
        "origin": "站内原创练习"
      }
    ]
  },
  {
    "id": "backend",
    "skills": [
      "语言与并发",
      "数据库与缓存",
      "系统设计与排障"
    ],
    "project": "实现带鉴权、事务、缓存、可观测性和压测报告的业务服务。",
    "written": "完成 SQL、LRU 和并发控制练习，说明事务隔离与索引选择。",
    "interview": "沿请求链路解释数据一致性、容量估算、故障和扩展方案。",
    "questions": [
      {
        "id": "backend-1",
        "role": "backend",
        "type": "written",
        "title": "设计并实现 LRU 缓存",
        "answer": [
          "用哈希表和双向链表实现平均 O(1) 查找与更新",
          "明确容量、覆盖写入、淘汰和空缓存边界",
          "讨论并发访问和内存开销"
        ],
        "pitfall": "更新 key 后忘记移动到最新位置。",
        "origin": "站内原创练习"
      },
      {
        "id": "backend-2",
        "role": "backend",
        "type": "written",
        "title": "如何查询每个用户最近一笔订单？",
        "answer": [
          "定义重复时间戳时的确定性排序",
          "使用窗口函数或等价查询并解释执行方式",
          "分析用户与时间组合索引，检查执行计划"
        ],
        "pitfall": "用 GROUP BY 随意选出其他列。",
        "origin": "站内原创练习"
      },
      {
        "id": "backend-3",
        "role": "backend",
        "type": "technical",
        "title": "缓存与数据库不一致如何处理？",
        "answer": [
          "先定义可接受的一致性和失效窗口",
          "比较更新后失效、消息重试与读写路径的竞态",
          "设计监控、补偿和热点保护，说明限制"
        ],
        "pitfall": "用一个固定延迟宣称解决所有并发问题。",
        "origin": "站内原创练习"
      },
      {
        "id": "backend-4",
        "role": "backend",
        "type": "project",
        "title": "接口 P99 延迟突然升高，如何排查？",
        "answer": [
          "沿网关、应用、数据库和下游分段定位",
          "核对流量变化、锁等待、连接池、GC 与发布记录",
          "先止损，再验证根因并沉淀监控与回归测试"
        ],
        "pitfall": "只看平均延迟，忽略尾延迟与错误率。",
        "origin": "站内原创练习"
      }
    ]
  },
  {
    "id": "software",
    "skills": [
      "模块与接口设计",
      "内存与并发",
      "构建、测试与协作"
    ],
    "project": "完成可安装、可测试、有版本记录和清晰模块边界的软件工具。",
    "written": "练习资源生命周期、并发同步与数据结构，解释语言语义。",
    "interview": "用一次代码审查或重构说明兼容性、验证策略和维护成本。",
    "questions": [
      {
        "id": "software-1",
        "role": "software",
        "type": "written",
        "title": "如何定位资源泄漏？",
        "answer": [
          "区分内存、文件句柄、连接与后台任务泄漏",
          "用最小复现和监控确认资源随操作持续增长",
          "明确所有权与释放时机，并为异常分支添加验证"
        ],
        "pitfall": "只在正常路径释放资源。",
        "origin": "站内原创练习"
      },
      {
        "id": "software-2",
        "role": "software",
        "type": "written",
        "title": "实现线程安全的有界生产者消费者队列",
        "answer": [
          "定义容量、阻塞、关闭和超时语义",
          "用互斥与条件变量保护不变量，循环判断唤醒条件",
          "测试并发退出、空满队列和取消"
        ],
        "pitfall": "假设一次唤醒就必然满足条件。",
        "origin": "站内原创练习"
      },
      {
        "id": "software-3",
        "role": "software",
        "type": "technical",
        "title": "如何设计可维护的模块接口？",
        "answer": [
          "围绕责任边界、依赖方向和稳定契约拆分",
          "明确错误、所有权、版本和兼容策略",
          "用契约测试与调用方示例检查设计"
        ],
        "pitfall": "为了复用提前设计大量没有需求的抽象。",
        "origin": "站内原创练习"
      },
      {
        "id": "software-4",
        "role": "software",
        "type": "project",
        "title": "重构一个旧模块如何控制风险？",
        "answer": [
          "先补齐关键行为与回归测试，量化当前问题",
          "逐步替换，保留兼容层和回退路径",
          "用可读性、缺陷和性能证据评价结果"
        ],
        "pitfall": "把重构与功能变更混在一起，难以定位回归。",
        "origin": "站内原创练习"
      }
    ]
  },
  {
    "id": "testing",
    "skills": [
      "测试设计与覆盖",
      "自动化与质量分析",
      "性能与故障定位"
    ],
    "project": "为业务应用建立接口、UI、性能测试和可执行的质量报告。",
    "written": "练习等价类、边界值、SQL 和脚本题，设计异常与并发用例。",
    "interview": "从风险到用例再到缺陷定位，说明为什么这些验证能保护用户。",
    "questions": [
      {
        "id": "testing-1",
        "role": "testing",
        "type": "written",
        "title": "为优惠券结算设计测试用例",
        "answer": [
          "先澄清门槛、有效期、叠加、币种与金额精度",
          "覆盖边界、异常、重复提交、并发与退款",
          "按业务风险排序，说明测试数据与验收结果"
        ],
        "pitfall": "只列正常功能，没有边界和状态流转。",
        "origin": "站内原创练习"
      },
      {
        "id": "testing-2",
        "role": "testing",
        "type": "written",
        "title": "自动化用例偶发失败如何定位？",
        "answer": [
          "按产品缺陷、环境、数据竞争和断言问题分类",
          "保留 trace、日志和失败种子，重复最小复现",
          "使用条件等待、隔离数据与稳定定位，记录真实故障"
        ],
        "pitfall": "用固定长等待或无限重跑掩盖错误。",
        "origin": "站内原创练习"
      },
      {
        "id": "testing-3",
        "role": "testing",
        "type": "technical",
        "title": "如何判断压测结果可信？",
        "answer": [
          "说明流量模型、数据规模、环境和预热条件",
          "联合看吞吐、P95/P99、错误率和资源饱和度",
          "定位瓶颈并复测，区分客户端与服务端限制"
        ],
        "pitfall": "只报告最大 QPS，没有错误率和延迟。",
        "origin": "站内原创练习"
      },
      {
        "id": "testing-4",
        "role": "testing",
        "type": "project",
        "title": "上线前时间不足时如何制定测试策略？",
        "answer": [
          "基于变更范围、用户影响和历史缺陷确定风险",
          "优先关键链路、鉴权、数据正确性与回滚能力",
          "明确已覆盖和未覆盖风险，跟踪线上质量指标"
        ],
        "pitfall": "用用例数量替代风险判断。",
        "origin": "站内原创练习"
      }
    ]
  },
  {
    "id": "ops",
    "skills": [
      "Linux 与网络",
      "容器与交付",
      "监控、SLO 与故障恢复"
    ],
    "project": "部署可观测的服务，完成备份恢复、告警演练和故障复盘。",
    "written": "练习 Linux 排查命令、网络路径、Shell 脚本与资源诊断。",
    "interview": "按影响、止损、定位、恢复和预防讲清一场模拟故障。",
    "questions": [
      {
        "id": "ops-1",
        "role": "ops",
        "type": "written",
        "title": "服务端口不可达时如何排查？",
        "answer": [
          "从进程监听、地址绑定和本机访问开始",
          "逐段核对路由、DNS、防火墙、代理和健康检查",
          "用连接、抓包与日志证据定位，避免盲目变更"
        ],
        "pitfall": "直接关闭防火墙且没有检查监听状态。",
        "origin": "站内原创练习"
      },
      {
        "id": "ops-2",
        "role": "ops",
        "type": "written",
        "title": "容器内存不足如何分析？",
        "answer": [
          "区分应用堆、缓存、页缓存和容器限制",
          "查看 OOM 事件、内存曲线与请求变化",
          "用资源设置、优化与限流验证方案"
        ],
        "pitfall": "只增加限制，不解释峰值来源。",
        "origin": "站内原创练习"
      },
      {
        "id": "ops-3",
        "role": "ops",
        "type": "technical",
        "title": "如何设计有用的告警？",
        "answer": [
          "基于用户体验定义 SLI 和 SLO",
          "区分症状与原因，设置窗口、分级和抑制",
          "提供处理手册，评估误报、漏报和恢复时间"
        ],
        "pitfall": "对每个指标都设置同一静态阈值。",
        "origin": "站内原创练习"
      },
      {
        "id": "ops-4",
        "role": "ops",
        "type": "project",
        "title": "发布后错误率升高，如何处理？",
        "answer": [
          "核对影响范围和发布变化，优先止损或回滚",
          "对比版本、依赖与配置，确认恢复而非只看进程",
          "无责复盘根因、检测缺口和行动项负责人"
        ],
        "pitfall": "未确认用户恢复就结束事件。",
        "origin": "站内原创练习"
      }
    ]
  },
  {
    "id": "algorithm",
    "skills": [
      "复杂度与证明",
      "数据结构与图",
      "动态规划与表达"
    ],
    "project": "整理有错误分析、测试样例和多解法对比的算法题解集。",
    "written": "限时练习数组、树图、二分与 DP，先写不变量和边界再编码。",
    "interview": "先澄清约束，再推导解法，用例走查后给出复杂度与优化。",
    "questions": [
      {
        "id": "algorithm-1",
        "role": "algorithm",
        "type": "written",
        "title": "如何写出不易出错的二分查找？",
        "answer": [
          "统一区间定义并写出循环不变量",
          "推导边界移动与终止条件，检查空数组和重复值",
          "说明返回首个满足条件位置时的单调性"
        ],
        "pitfall": "混用闭区间和半开区间的更新规则。",
        "origin": "站内原创练习"
      },
      {
        "id": "algorithm-2",
        "role": "algorithm",
        "type": "written",
        "title": "如何从问题推导动态规划？",
        "answer": [
          "定义状态与含义，判断是否有重叠子问题",
          "推导转移、初始值、遍历顺序和不可达状态",
          "给出复杂度并用小样例验证，可考虑滚动优化"
        ],
        "pitfall": "先套模板，无法解释状态为什么充分。",
        "origin": "站内原创练习"
      },
      {
        "id": "algorithm-3",
        "role": "algorithm",
        "type": "technical",
        "title": "最短路问题如何选择算法？",
        "answer": [
          "根据权重正负、图规模和单源或多源需求选择",
          "说明 BFS、Dijkstra、Bellman-Ford 的条件",
          "讨论不可达、负环和整数溢出"
        ],
        "pitfall": "在含负权边的图上无条件使用 Dijkstra。",
        "origin": "站内原创练习"
      },
      {
        "id": "algorithm-4",
        "role": "algorithm",
        "type": "project",
        "title": "遇到不会的题时如何与面试官沟通？",
        "answer": [
          "复述条件和可行的暴力方案，明确瓶颈",
          "通过样例、结构或不变量推进优化",
          "接受提示后解释新思路，完成代码与边界验证"
        ],
        "pitfall": "长时间沉默，或只背答案无法说明正确性。",
        "origin": "站内原创练习"
      }
    ]
  },
  {
    "id": "foundation",
    "skills": [
      "操作系统与网络",
      "数据库与计算机组成",
      "语言与调试基础"
    ],
    "project": "制作覆盖进程、网络、数据库和内存的可复现实验手册。",
    "written": "做基础选择、简答和代码题，用实验验证概念而不是只背定义。",
    "interview": "从一个真实请求出发，把网络、进程调度、内存和存储连起来。",
    "questions": [
      {
        "id": "foundation-1",
        "role": "foundation",
        "type": "written",
        "title": "进程、线程与协程如何比较？",
        "answer": [
          "说明地址空间、调度主体与切换成本",
          "讨论共享数据、同步、阻塞和运行时模型",
          "结合 CPU 密集与 I/O 密集工作选择方案"
        ],
        "pitfall": "把协程当成可以自动利用所有 CPU 核心。",
        "origin": "站内原创练习"
      },
      {
        "id": "foundation-2",
        "role": "foundation",
        "type": "written",
        "title": "数据库索引为什么可能不被使用？",
        "answer": [
          "结合选择性、回表成本和统计信息分析",
          "检查函数、类型转换、排序与联合索引条件",
          "用执行计划与真实耗时验证，而非只看是否命中"
        ],
        "pitfall": "认为建立索引就能加速所有查询。",
        "origin": "站内原创练习"
      },
      {
        "id": "foundation-3",
        "role": "foundation",
        "type": "technical",
        "title": "从输入 URL 到页面显示发生了什么？",
        "answer": [
          "按 DNS、连接、TLS、HTTP 和资源加载描述",
          "补充缓存、重定向、渲染和脚本执行的关系",
          "说明复用连接、协议版本和异常路径"
        ],
        "pitfall": "背诵固定顺序却忽略缓存与连接复用。",
        "origin": "站内原创练习"
      },
      {
        "id": "foundation-4",
        "role": "foundation",
        "type": "project",
        "title": "如何证明你理解了系统基础？",
        "answer": [
          "提供可运行的并发、网络和存储小实验",
          "记录预期、观测、工具输出与异常解释",
          "说明实验限制，并映射到实际工程问题"
        ],
        "pitfall": "只有术语笔记，没有验证与推理过程。",
        "origin": "站内原创练习"
      }
    ]
  },
  {
    "id": "product",
    "skills": [
      "用户问题与需求",
      "指标与实验",
      "优先级与跨团队交付"
    ],
    "project": "完成含用户研究、原型、指标树、验收条件和上线复盘的产品方案。",
    "written": "练习产品分析、估算与 SQL，限定用户、场景和目标后再提出方案。",
    "interview": "讲清问题证据、取舍、协作和结果，区分个人贡献与团队成果。",
    "questions": [
      {
        "id": "product-1",
        "role": "product",
        "type": "written",
        "title": "为学习网站设计核心指标",
        "answer": [
          "先定义目标用户和需要解决的学习问题",
          "区分访问、有效学习、阶段完成与长期留存",
          "给出事件口径、分母、时间窗和防刷要求"
        ],
        "pitfall": "把浏览量增长直接当成学习效果提升。",
        "origin": "站内原创练习"
      },
      {
        "id": "product-2",
        "role": "product",
        "type": "written",
        "title": "需求很多但研发资源有限，如何排序？",
        "answer": [
          "比较用户价值、证据强度、成本、风险与依赖",
          "给出明确评估规则，避免假精确分数",
          "划定最小可验证范围，并说明延后事项"
        ],
        "pitfall": "所有需求都标最高优先级，缺少舍弃依据。",
        "origin": "站内原创练习"
      },
      {
        "id": "product-3",
        "role": "product",
        "type": "technical",
        "title": "A/B 测试结果显著就能上线吗？",
        "answer": [
          "检查随机化、样本比例、数据质量和实验周期",
          "同时评估效应大小、护栏指标与分群差异",
          "考虑多重比较、长期影响、成本和灰度策略"
        ],
        "pitfall": "反复看结果，一显著就停止实验。",
        "origin": "站内原创练习"
      },
      {
        "id": "product-4",
        "role": "product",
        "type": "project",
        "title": "如何讲述一次产品迭代？",
        "answer": [
          "说明用户问题、证据、目标和约束",
          "描述个人决策、方案取舍与研发协作",
          "报告结果、归因限制和下一步，不夸大因果"
        ],
        "pitfall": "只展示页面，讲不清为什么做与如何验证。",
        "origin": "站内原创练习"
      }
    ]
  },
  {
    "id": "data",
    "skills": [
      "SQL 与指标口径",
      "数据建模与质量",
      "统计与分析表达"
    ],
    "project": "建立含数据模型、校验、可视化与业务建议的分析项目。",
    "written": "练习连接、窗口函数、留存漏斗和统计推断，关注去重与空值。",
    "interview": "从业务问题到数据口径、分析方法和行动建议讲清证据链。",
    "questions": [
      {
        "id": "data-1",
        "role": "data",
        "type": "written",
        "title": "如何计算次日留存？",
        "answer": [
          "定义新增用户、活跃行为、时区和自然日口径",
          "按用户去重，将 cohort 与次日活跃关联",
          "验证分母、空样本、跨日和迟到事件"
        ],
        "pitfall": "把所有活跃用户作为新增 cohort 分母。",
        "origin": "站内原创练习"
      },
      {
        "id": "data-2",
        "role": "data",
        "type": "written",
        "title": "SQL 连接后行数异常增加怎么办？",
        "answer": [
          "确认每张表的粒度、唯一键和连接基数",
          "检查一对多与多对多，必要时先聚合或去重",
          "用样本和总量校验确认没有重复计数"
        ],
        "pitfall": "直接 SELECT DISTINCT 隐藏数据建模问题。",
        "origin": "站内原创练习"
      },
      {
        "id": "data-3",
        "role": "data",
        "type": "technical",
        "title": "转化率下降如何分析？",
        "answer": [
          "先核对埋点、口径、分母与版本变化",
          "按渠道、设备、地区和漏斗步骤分解",
          "区分结构变化与组内变化，再提出可验证假设"
        ],
        "pitfall": "没有数据质量检查就认定产品出了问题。",
        "origin": "站内原创练习"
      },
      {
        "id": "data-4",
        "role": "data",
        "type": "project",
        "title": "如何让分析报告推动行动？",
        "answer": [
          "围绕具体决策组织问题、证据和不确定性",
          "给出可执行建议、预期影响与验证方案",
          "标注相关性与因果的边界，并跟踪后续结果"
        ],
        "pitfall": "罗列大量图表，但没有支持任何决策。",
        "origin": "站内原创练习"
      }
    ]
  }
];
// Domain-specific practice for the additional directions.
rolePrep.push(...[
  {
    "id": "nlp",
    "skills": [
      "文本表示",
      "信息抽取",
      "语义理解"
    ],
    "project": "完成一个中文工单分类与实体抽取助手，展示分类依据、实体位置、错误分析和模型版本，交付脱敏样例、接口测试及运行说明。",
    "written": "重点准备文本单位与语言表示、序列建模与任务边界；用具体输入与反例说明原理和边界。",
    "interview": "围绕语义检索实验与文本服务与回归解释方案、失败证据、指标和恢复过程。",
    "questions": [
      {
        "id": "nlp-written-1",
        "role": "nlp",
        "type": "written",
        "title": "为什么 TF-IDF 必须只在训练集上拟合？",
        "answer": [
          "IDF 是从文档频率估计出的特征参数，验证集参与拟合会泄漏集合信息。",
          "划分数据后分别执行训练集 fit 和验证集 transform，并把词表与分类器一起保存。",
          "比较不同来源或时间切分的指标，并解释哪些词项或模板导致效果虚高。"
        ],
        "pitfall": "不能只说避免过拟合，还要说清泄漏来自哪一步。",
        "origin": "站内原创练习"
      },
      {
        "id": "nlp-written-2",
        "role": "nlp",
        "type": "written",
        "title": "命名实体识别的 token 标签如何映射回原文？",
        "answer": [
          "先定义字符偏移、token 对齐和 BIO 标签规范，保留分词器的偏移信息。",
          "处理子词、特殊 token、截断和 padding；解释标签忽略位及实体拼接规则。",
          "用标点、中英文混排、重复实体和跨边界样例检查位置与类型。"
        ],
        "pitfall": "只比较 token 准确率，忽略实体边界。",
        "origin": "站内原创练习"
      },
      {
        "id": "nlp-technical-3",
        "role": "nlp",
        "type": "technical",
        "title": "领域迁移后 F1 降低，应先检查什么？",
        "answer": [
          "确认评测集、标签规范、分词器和模型版本一致。",
          "按类别、文本长度与来源分析错误，检查领域词汇和类别分布变化。",
          "先建立词典或特征基线，再决定补充标注、微调和线上灰度方案。"
        ],
        "pitfall": "直接扩大模型，没有误差定位。",
        "origin": "站内原创练习"
      },
      {
        "id": "nlp-project-4",
        "role": "nlp",
        "type": "project",
        "title": "怎样证明工单分类助手带来了可重复的改进？",
        "answer": [
          "保留独立测试集和旧模型基线，固定数据、预处理与评测脚本。",
          "同时报告逐类召回、延迟、拒识或人工转交比例，并展示失败样本。",
          "说明个人实现、模型升级回归、数据限制及后续收集计划。"
        ],
        "pitfall": "只展示几条成功问答，没有总体指标。",
        "origin": "站内原创练习"
      }
    ]
  },
  {
    "id": "recsys",
    "skills": [
      "召回排序",
      "特征工程",
      "离线评估"
    ],
    "project": "交付一个带关键词检索、个性化排序和冷启动回退的图书推荐站，提供时间切分数据、召回与排序报告及实验设计文档。",
    "written": "重点准备候选生成与多阶段排序、行为数据与曝光偏差；用具体输入与反例说明原理和边界。",
    "interview": "围绕排序与特征验证与检索服务与实验设计解释方案、失败证据、指标和恢复过程。",
    "questions": [
      {
        "id": "recsys-written-1",
        "role": "recsys",
        "type": "written",
        "title": "Recall@K 与 NDCG@K 分别衡量什么？",
        "answer": [
          "明确相关标签、候选池与 K，Recall 衡量相关物品进入结果的比例。",
          "解释折损累计增益与位置权重，并说明 NDCG 需要用理想排序归一化。",
          "构造召回相同但前部排序不同的例子，讨论覆盖率与热门偏置。"
        ],
        "pitfall": "只背公式，不说明候选池和标签定义。",
        "origin": "站内原创练习"
      },
      {
        "id": "recsys-written-2",
        "role": "recsys",
        "type": "written",
        "title": "推荐数据为什么通常需要按时间切分？",
        "answer": [
          "实际预测只能利用请求发生前可见的数据，未来行为进入特征会泄漏目标。",
          "区分训练交互、验证目标和物品可用时间，明确特征计算窗口。",
          "对新用户、冷物品和重复行为单独检查，保留可以重放的样本构造脚本。"
        ],
        "pitfall": "只划分标签时间，特征仍使用全量统计。",
        "origin": "站内原创练习"
      },
      {
        "id": "recsys-technical-3",
        "role": "recsys",
        "type": "technical",
        "title": "搜索无结果与低相关性如何排查？",
        "answer": [
          "先检查分词、过滤、索引更新和召回候选数量，再检查排序。",
          "用固定查询与相关性标注对照关键词、向量和混合检索。",
          "记录分阶段延迟与失败样本，设计扩展查询、回退和索引回滚。"
        ],
        "pitfall": "直接换向量模型，跳过索引与分词问题。",
        "origin": "站内原创练习"
      },
      {
        "id": "recsys-project-4",
        "role": "recsys",
        "type": "project",
        "title": "怎样评价推荐系统的改进是否可信？",
        "answer": [
          "统一候选池、数据窗口与指标，保留热门基线及分组结果。",
          "用消融实验说明特征或模型贡献，同时报告覆盖率和资源开销。",
          "说明线上实验分桶、护栏、停止条件与离线结果的限制。"
        ],
        "pitfall": "把离线指标提升直接写成线上增长。",
        "origin": "站内原创练习"
      }
    ]
  },
  {
    "id": "mobile",
    "skills": [
      "Android",
      "Flutter",
      "跨端应用"
    ],
    "project": "完成一个可离线使用的学习任务 App，包含搜索、收藏、进度记录与失败重试，交付安装演示、状态设计、测试清单和运行说明。",
    "written": "重点准备组件状态与生命周期、平台能力与跨端边界；用具体输入与反例说明原理和边界。",
    "interview": "围绕离线同步实验与性能与安装验证解释方案、失败证据、指标和恢复过程。",
    "questions": [
      {
        "id": "mobile-written-1",
        "role": "mobile",
        "type": "written",
        "title": "页面重建后如何避免丢失输入和请求状态？",
        "answer": [
          "区分临时界面状态、业务状态和需要持久化的数据。",
          "把状态放到生命周期合适的容器，并从可恢复的数据源重建页面。",
          "测试旋转、前后台切换与进程重启，避免重复发请求或重复提交。"
        ],
        "pitfall": "把内存状态保存当成进程回收后的持久化。",
        "origin": "站内原创练习"
      },
      {
        "id": "mobile-written-2",
        "role": "mobile",
        "type": "written",
        "title": "离线写入怎样处理重试与冲突？",
        "answer": [
          "为本地写入、待同步、已确认和失败定义明确状态。",
          "使用操作标识与幂等机制，比较客户端时间和服务端版本的限制。",
          "构造重复提交、并发编辑和断网恢复，验证最终一致与用户提示。"
        ],
        "pitfall": "只增加无限重试，没有冲突和幂等设计。",
        "origin": "站内原创练习"
      },
      {
        "id": "mobile-technical-3",
        "role": "mobile",
        "type": "technical",
        "title": "列表滚动掉帧怎样定位？",
        "answer": [
          "在固定设备和数据量下记录帧、主线程、图片与内存基线。",
          "分离布局、重复构建、计算和 I/O，逐项缩小问题范围。",
          "对单一改动复测，同时检查内存、响应速度与正确性。"
        ],
        "pitfall": "只凭肉眼判断或一次性添加大量缓存。",
        "origin": "站内原创练习"
      },
      {
        "id": "mobile-project-4",
        "role": "mobile",
        "type": "project",
        "title": "怎样交付一个别人能够安装验证的移动应用？",
        "answer": [
          "记录工具链、构建配置、测试环境与权限需求。",
          "提供测试安装方式和数据准备步骤，覆盖启动、离线及错误路径。",
          "展示一次实际性能或状态问题的定位、修复与回归结果。"
        ],
        "pitfall": "只有录屏，没有可复现构建和测试说明。",
        "origin": "站内原创练习"
      }
    ]
  },
  {
    "id": "game",
    "skills": [
      "游戏循环",
      "物理与动画",
      "玩法系统"
    ],
    "project": "交付一个包含两种敌人、计分、暂停、重开与两关配置的 2D 游戏，附玩法说明、状态图、试玩反馈和性能报告。",
    "written": "重点准备游戏循环与时间步长、场景对象与状态机；用具体输入与反例说明原理和边界。",
    "interview": "围绕资源与关卡系统与性能与发布解释方案、失败证据、指标和恢复过程。",
    "questions": [
      {
        "id": "game-written-1",
        "role": "game",
        "type": "written",
        "title": "为什么按每帧固定距离移动会导致速度不一致？",
        "answer": [
          "区分渲染帧与物理时间步，说明帧率变化导致单位时间的更新次数不同。",
          "根据适用场景使用时间增量或固定物理更新，并说明插值与稳定性。",
          "在不同帧率和暂停恢复场景比较移动距离与碰撞行为。"
        ],
        "pitfall": "只给公式，没有区分逻辑与物理更新。",
        "origin": "站内原创练习"
      },
      {
        "id": "game-written-2",
        "role": "game",
        "type": "written",
        "title": "对象池需要重置哪些状态？",
        "answer": [
          "列出位置、速度、生命、计时器、动画及事件订阅。",
          "明确激活、失活、回收和销毁的契约，避免复用仍被引用的对象。",
          "用连续生成回收与场景切换测试，观察内存和行为是否稳定。"
        ],
        "pitfall": "只隐藏对象，忽略事件监听和内部计时器。",
        "origin": "站内原创练习"
      },
      {
        "id": "game-technical-3",
        "role": "game",
        "type": "technical",
        "title": "角色发生穿透或重复触发应如何排查？",
        "answer": [
          "检查碰撞层、形状、更新频率和移动方式。",
          "用日志与可视化记录接触时间和状态，分离物理与动画逻辑。",
          "构造高速移动、低帧率和重复生成案例验证修复。"
        ],
        "pitfall": "只放大碰撞体，未验证根因。",
        "origin": "站内原创练习"
      },
      {
        "id": "game-project-4",
        "role": "game",
        "type": "project",
        "title": "怎样证明作品具备完整玩法闭环？",
        "answer": [
          "说明玩家目标、输入、反馈、胜败和重新开始。",
          "展示状态管理、关卡配置和资源边界的设计。",
          "结合试玩反馈与目标平台性能记录说明一次迭代。"
        ],
        "pitfall": "只展示画面，没有可操作的目标和验收。",
        "origin": "站内原创练习"
      }
    ]
  },
  {
    "id": "graphics",
    "skills": [
      "渲染管线",
      "Shader",
      "三维交互"
    ],
    "project": "完成可交互的三维学习展厅，包含模型拾取、材质切换、相机导航与资源释放，提供变换和光照说明及移动设备性能记录。",
    "written": "重点准备坐标变换与投影、光栅化与着色；用具体输入与反例说明原理和边界。",
    "interview": "围绕三维交互与资源与渲染性能与降级解释方案、失败证据、指标和恢复过程。",
    "questions": [
      {
        "id": "graphics-written-1",
        "role": "graphics",
        "type": "written",
        "title": "为什么矩阵乘法顺序会改变三维物体的位置？",
        "answer": [
          "区分局部与世界变换，说明矩阵乘法一般不可交换。",
          "用先平移后旋转和先旋转后平移的具体向量比较结果。",
          "明确行列向量约定和父子变换，并用坐标轴实验验证。"
        ],
        "pitfall": "只背模型观察投影顺序，不解释坐标含义。",
        "origin": "站内原创练习"
      },
      {
        "id": "graphics-written-2",
        "role": "graphics",
        "type": "written",
        "title": "sRGB 纹理为什么通常要在线性空间参与光照？",
        "answer": [
          "解释编码值与物理光强的关系，以及非线性空间直接相加的问题。",
          "区分颜色纹理与法线、粗糙度等数据纹理的处理。",
          "固定曝光和色调映射，比较正确转换与重复转换的输出。"
        ],
        "pitfall": "把所有纹理都按颜色纹理转换。",
        "origin": "站内原创练习"
      },
      {
        "id": "graphics-technical-3",
        "role": "graphics",
        "type": "technical",
        "title": "三维场景内存增长和帧率下降如何定位？",
        "answer": [
          "区分 CPU 对象、GPU 几何纹理、绘制调用和分辨率。",
          "在固定场景测量，并逐项排查重建对象、阴影和资源未释放。",
          "用重复加载销毁和不同设备复测，记录画质与开销取舍。"
        ],
        "pitfall": "只减少多边形，忽略纹理和资源生命周期。",
        "origin": "站内原创练习"
      },
      {
        "id": "graphics-project-4",
        "role": "graphics",
        "type": "project",
        "title": "怎样交付能被别人理解的三维作品？",
        "answer": [
          "提供场景目标、资源来源、坐标约定与交互说明。",
          "解释一个变换、着色或拾取问题的定位证据。",
          "展示性能预算、设备差异、资源释放与降级方案。"
        ],
        "pitfall": "只有截图，没有交互和技术解释。",
        "origin": "站内原创练习"
      }
    ]
  },
  {
    "id": "mlops",
    "skills": [
      "实验管理",
      "模型服务",
      "推理优化"
    ],
    "project": "交付一个具备实验追踪、模型版本、监控与回滚的轻量模型服务，提供固定工作负载下的性能报告和容量限制说明。",
    "written": "重点准备模型、数据与实验版本、推理执行与显存约束；用具体输入与反例说明原理和边界。",
    "interview": "围绕推理性能实验与发布与回滚演练解释方案、失败证据、指标和恢复过程。",
    "questions": [
      {
        "id": "mlops-written-1",
        "role": "mlops",
        "type": "written",
        "title": "首 token 延迟与总生成延迟受哪些因素影响？",
        "answer": [
          "区分排队、预填充、首 token 与逐步解码。",
          "解释输入长度、输出长度、并发和批处理对显存与吞吐的影响。",
          "用固定工作负载报告分位数、饱和点及测试硬件。"
        ],
        "pitfall": "只给平均延迟，省略工作负载。",
        "origin": "站内原创练习"
      },
      {
        "id": "mlops-written-2",
        "role": "mlops",
        "type": "written",
        "title": "怎样记录一次可重现的模型实验？",
        "answer": [
          "记录代码、数据来源与切分、依赖、硬件、参数和随机性。",
          "保存模型工件、预处理、标签与输入输出契约，追踪指标产生方式。",
          "在独立环境复测并说明非确定性与容差。"
        ],
        "pitfall": "只保存权重和训练日志截图。",
        "origin": "站内原创练习"
      },
      {
        "id": "mlops-technical-3",
        "role": "mlops",
        "type": "technical",
        "title": "模型服务过载时如何保护系统？",
        "answer": [
          "先定义限额、超时和排队预算，区分服务时间与等待时间。",
          "观察并发、长度、显存与错误，采用准入控制、限流或降级。",
          "通过负载重放验证尾延迟、恢复时间与资源隔离。"
        ],
        "pitfall": "只扩容，不解释瓶颈和饱和行为。",
        "origin": "站内原创练习"
      },
      {
        "id": "mlops-project-4",
        "role": "mlops",
        "type": "project",
        "title": "怎样证明推理优化没有牺牲质量？",
        "answer": [
          "固定硬件、模型、输入输出长度与并发，保留基线。",
          "同时比较精度或任务质量、首 token、尾延迟、吞吐和显存。",
          "提供配置、请求集、误差样本及灰度回滚方案。"
        ],
        "pitfall": "只展示最佳吞吐结果。",
        "origin": "站内原创练习"
      }
    ]
  },
  {
    "id": "network",
    "skills": [
      "交换与路由",
      "协议分析",
      "网络排障"
    ],
    "project": "搭建含两个业务网段、路由与服务节点的可复现虚拟网络，完成地址规划、协议分析、链路故障和配置回退演练。",
    "written": "重点准备分层、地址与转发、路由、控制与收敛；用具体输入与反例说明原理和边界。",
    "interview": "围绕协议抓包分析与网络自动化与变更解释方案、失败证据、指标和恢复过程。",
    "questions": [
      {
        "id": "network-written-1",
        "role": "network",
        "type": "written",
        "title": "同网段与跨网段通信时下一跳如何确定？",
        "answer": [
          "用地址与掩码判断目标是否在本地链路，说明路由最长前缀匹配。",
          "区分最终目标 IP 和下一跳链路层地址，解释邻居解析。",
          "通过路由表、邻居表与抓包验证，而非只背 OSI 分层。"
        ],
        "pitfall": "混淆目标 IP 与网关 MAC。",
        "origin": "站内原创练习"
      },
      {
        "id": "network-written-2",
        "role": "network",
        "type": "written",
        "title": "如何区分 DNS 慢、连接慢和应用响应慢？",
        "answer": [
          "给请求分解解析、连接、TLS 与应用处理时间。",
          "结合两端日志与抓包时间线，确认复用连接和缓存等条件。",
          "在隔离实验中注入延迟，验证判断和工具读数。"
        ],
        "pitfall": "只看总耗时或单次 ping。",
        "origin": "站内原创练习"
      },
      {
        "id": "network-technical-3",
        "role": "network",
        "type": "technical",
        "title": "修改路由后部分请求失败如何定位？",
        "answer": [
          "检查受影响网段、路由表、回程路径、策略与 MTU。",
          "对比变更前后配置并做分层探测，保留故障抓包。",
          "使用最小变更和已验证回退恢复服务，再复盘原因。"
        ],
        "pitfall": "直接重启所有节点，丢失证据。",
        "origin": "站内原创练习"
      },
      {
        "id": "network-project-4",
        "role": "network",
        "type": "project",
        "title": "如何交付网络实验让别人重现故障？",
        "answer": [
          "提供拓扑、地址、软件版本与初始配置。",
          "记录故障注入、观察位置、时间线和验收条件。",
          "交付恢复步骤、配置差异与自动检查结果。"
        ],
        "pitfall": "只有拓扑截图，没有配置和验证命令。",
        "origin": "站内原创练习"
      }
    ]
  },
  {
    "id": "robotics",
    "skills": [
      "ROS 2",
      "感知定位",
      "规划控制"
    ],
    "project": "交付一个在仿真地图内导航的移动机器人演示，包含消息与坐标说明、路径跟踪指标、障碍场景和异常停止验证；不将仿真成果直接用于真实车辆。",
    "written": "重点准备坐标、时间与传感器、消息通信与系统分解；用具体输入与反例说明原理和边界。",
    "interview": "围绕规划与跟踪对照与异常与停止演练解释方案、失败证据、指标和恢复过程。",
    "questions": [
      {
        "id": "robotics-written-1",
        "role": "robotics",
        "type": "written",
        "title": "机器人坐标和时间不同步会产生什么问题？",
        "answer": [
          "说明传感器、机体和地图坐标及变换链路。",
          "分析外参、时间戳、延迟与运动造成的投影或融合误差。",
          "使用静态与运动场景对照检查，保留测量单位和标定信息。"
        ],
        "pitfall": "只讨论坐标，不讨论时间。",
        "origin": "站内原创练习"
      },
      {
        "id": "robotics-written-2",
        "role": "robotics",
        "type": "written",
        "title": "路径规划与轨迹跟踪的验收有什么不同？",
        "answer": [
          "规划需要满足可行性、碰撞与运动约束。",
          "控制需要测量实际轨迹、跟踪误差和响应，对动态变化作处理。",
          "用到达率、误差、碰撞和时延共同评价，并明确场景范围。"
        ],
        "pitfall": "只展示一条理想路径。",
        "origin": "站内原创练习"
      },
      {
        "id": "robotics-technical-3",
        "role": "robotics",
        "type": "technical",
        "title": "ROS 2 话题存在但节点收不到数据如何排查？",
        "answer": [
          "核对发行版环境、发现域、类型与话题名称。",
          "检查 QoS、生命周期、频率、时间戳和网络可达性。",
          "用最小发布订阅样例逐步替换组件，区分通信与语义问题。"
        ],
        "pitfall": "直接重装环境，未检查配置。",
        "origin": "站内原创练习"
      },
      {
        "id": "robotics-project-4",
        "role": "robotics",
        "type": "project",
        "title": "怎样说明仿真导航项目的可靠性边界？",
        "answer": [
          "记录地图、传感器、控制参数与随机种子。",
          "重复测试障碍、噪声和超时，报告失败率及停止行为。",
          "说明与真实硬件、标定和环境差异，不把仿真通过当成实车验证。"
        ],
        "pitfall": "只展示一段成功视频。",
        "origin": "站内原创练习"
      }
    ]
  },
  {
    "id": "compiler",
    "skills": [
      "语法分析",
      "中间表示",
      "代码生成"
    ],
    "project": "交付支持表达式、变量和块作用域的小型语言解释器，提供语法说明、错误位置、一项可验证优化和完整正反例测试。",
    "written": "重点准备词法、语法与抽象语法树、作用域、类型与语义检查；用具体输入与反例说明原理和边界。",
    "interview": "围绕IR 与优化对照与诊断与工具交付解释方案、失败证据、指标和恢复过程。",
    "questions": [
      {
        "id": "compiler-written-1",
        "role": "compiler",
        "type": "written",
        "title": "词法、语法和语义错误分别由谁发现？",
        "answer": [
          "用非法字符、括号不匹配和未定义变量分别说明阶段。",
          "解释 token、AST、符号表与源位置如何传递。",
          "讨论错误恢复和多个诊断的质量，而非只返回失败。"
        ],
        "pitfall": "混淆文法可解析与程序有意义。",
        "origin": "站内原创练习"
      },
      {
        "id": "compiler-written-2",
        "role": "compiler",
        "type": "written",
        "title": "常量折叠为什么不能任意重排表达式？",
        "answer": [
          "明确整数溢出、浮点、异常和副作用的语言语义。",
          "说明变量读写、函数调用与求值顺序可能影响结果。",
          "构造反例并用差分执行验证优化保持行为。"
        ],
        "pitfall": "只考虑数学等价，忽略程序可观察行为。",
        "origin": "站内原创练习"
      },
      {
        "id": "compiler-technical-3",
        "role": "compiler",
        "type": "technical",
        "title": "嵌套作用域中的变量解析错误如何定位？",
        "answer": [
          "检查环境链、进入退出作用域及遮蔽规则。",
          "对比 AST、符号表和绑定记录，最小化触发程序。",
          "加入闭包或生命周期相关用例时明确当前语言支持范围。"
        ],
        "pitfall": "用全局变量表掩盖作用域问题。",
        "origin": "站内原创练习"
      },
      {
        "id": "compiler-project-4",
        "role": "compiler",
        "type": "project",
        "title": "如何证明自制解释器的正确性？",
        "answer": [
          "写出明确语法、语义、输入输出与错误类别。",
          "建立正反例、边界样例及与参考实现的差分测试。",
          "展示一项优化的条件、反例与执行对照，并说明限制。"
        ],
        "pitfall": "只有正常算术表达式演示。",
        "origin": "站内原创练习"
      }
    ]
  },
  {
    "id": "blockchain",
    "skills": [
      "智能合约",
      "状态机",
      "链上应用"
    ],
    "project": "完成本地链上的证书登记与查询应用，包含角色权限、事件索引、撤销记录及自动测试；交付运行脚本、状态不变量和威胁分析。",
    "written": "重点准备账本、状态与交易、合约执行与信任边界；用具体输入与反例说明原理和边界。",
    "interview": "围绕事件索引与应用与联盟链流程对照解释方案、失败证据、指标和恢复过程。",
    "questions": [
      {
        "id": "blockchain-written-1",
        "role": "blockchain",
        "type": "written",
        "title": "交易提交、执行成功和最终确认有什么差别？",
        "answer": [
          "区分 RPC 接受、链上执行结果、区块收录与最终性。",
          "说明回滚、重复提交和网络重组如何影响应用展示。",
          "通过本地回执、区块和状态查询验证，而不是只看前端提示。"
        ],
        "pitfall": "收到交易哈希就提示永久成功。",
        "origin": "站内原创练习"
      },
      {
        "id": "blockchain-written-2",
        "role": "blockchain",
        "type": "written",
        "title": "智能合约为什么要先定义状态不变量？",
        "answer": [
          "说明余额、权限或登记记录应始终满足的关系。",
          "分析状态更新、外部调用与异常回滚对不变量的影响。",
          "用未授权、边界与重复操作测试验证，并讨论属性测试。"
        ],
        "pitfall": "只有正常路径单元测试。",
        "origin": "站内原创练习"
      },
      {
        "id": "blockchain-technical-3",
        "role": "blockchain",
        "type": "technical",
        "title": "事件索引重复或遗漏怎样恢复？",
        "answer": [
          "记录消费位置和日志标识，设计幂等写入与可重放流程。",
          "处理确认策略、可能重组与 RPC 失败，区分缓存和链上事实。",
          "从检查点重放并与合约查询核对，保存修复记录。"
        ],
        "pitfall": "只依赖实时监听，没有恢复机制。",
        "origin": "站内原创练习"
      },
      {
        "id": "blockchain-project-4",
        "role": "blockchain",
        "type": "project",
        "title": "怎样交付一个可信的本地链应用练习？",
        "answer": [
          "提供工具版本、本地账户、部署和测试脚本。",
          "展示权限矩阵、不变量、失败路径与索引对照。",
          "说明链外数据真实性、管理员能力与环境限制，不宣称示例已经通过安全审计。"
        ],
        "pitfall": "只有部署成功截图，缺少测试和边界说明。",
        "origin": "站内原创练习"
      }
    ]
  }
]);
for (const prep of mobilityPrep) {
  const index = rolePrep.findIndex(item => item.id === prep.id);
  if (index >= 0) rolePrep[index] = prep; else rolePrep.push(prep);
}
const preparedRoleIds = new Set(rolePrep.map(item=>item.id));
for (const path of paths) {
  if (preparedRoleIds.has(path.id)) continue;
  const focus = path.tags.join('、');
  rolePrep.push({id:path.id,skills:path.tags,project:'围绕'+path.title+'完成一个可演示、可复现并能解释取舍的综合项目。',written:'围绕'+focus+'准备概念、原理、复杂度、故障和设计题。',interview:'从项目目标、关键决策、失败案例、指标与后续改进五个角度展开复盘。',questions:[
    {id:path.id+'-written-1',role:path.id,type:'written',title:path.title+'核心概念与边界题',answer:['先定义问题中的对象、输入输出与约束','结合底层机制解释方案如何工作以及何时失效','用复杂度、质量指标或故障案例验证结论'],pitfall:'只背术语，不说明边界条件和验证方式。',origin:'站内原创练习'},
    {id:path.id+'-technical-1',role:path.id,type:'technical',title:path.title+'系统设计与排障题',answer:['先画出数据流、模块边界和关键依赖','按日志、指标、输入输出和时间线定位问题','说明取舍、降级、测试和恢复方案'],pitfall:'直接给出工具名，没有证据链和回滚方案。',origin:'站内原创练习'},
    {id:path.id+'-project-1',role:path.id,type:'project',title:path.title+'项目深挖题',answer:['说明项目背景、目标、个人负责范围和验收指标','讲清一次重要技术选择、失败尝试和最终结果','给出可复现材料、限制条件和下一步优化计划'],pitfall:'只讲功能列表，没有数据、过程和个人贡献。',origin:'站内原创练习'}]});
}
for (const prep of rolePrep) { if (prep.questions.length < 4) prep.questions.push({id:prep.id+'-written-2',role:prep.id,type:'written',title:prep.id+'综合设计与权衡题',answer:['先列出目标、约束、输入输出和验收指标','比较至少两种方案的复杂度、可靠性、成本与维护边界','用一个反例或故障场景验证最终选择'],pitfall:'只写理想路径，没有说明异常、资源限制和验证方法。',origin:'站内原创练习'}); }
export const questions = rolePrep.flatMap(p=>p.questions);
export const questionTypes = [{id:'all',name:'全部练习'},{id:'written',name:'笔试练习'},{id:'technical',name:'技术 / 专业面试'},{id:'project',name:'项目深挖'}];
export function experienceUrl(company,role) { return 'https://www.nowcoder.com/search/all?query='+encodeURIComponent(company.title+' '+role.title+' 面经 笔试'); }

// 仅保留简短编辑摘要与原文链接；经历为作者自述，未获得招聘方确认。核对日期 2026-10-16。
export const experiences = [
  {
    "id": "bytedance-backend",
    "company": "bytedance",
    "roles": [
      "backend"
    ],
    "title": "抖音用户产品-后端一面面经",
    "url": "https://www.nowcoder.com/discuss/921820120039555072",
    "source": "牛客用户公开自述",
    "date": "2026-08-25 发布",
    "summary": "作者记录了网络协议、数据库锁、缓存热点及算法题等讨论，并反思基础准备不足。",
    "takeaway": "把协议与数据库知识连到实际请求链路，再练习容量受限的排序与限流设计。"
  },
  {
    "id": "alibaba-frontend",
    "company": "alibaba",
    "roles": [
      "frontend"
    ],
    "title": "阿里巴巴前端秋招面经（一面挂）",
    "url": "https://www.nowcoder.com/discuss/400681373596495872",
    "source": "牛客用户公开自述",
    "date": "2022-09-17 发布 · 历史样本",
    "summary": "作者分享了本地生活商家端前端岗位的现场代码题与项目交流经历。",
    "takeaway": "限时解释 JavaScript 代码行为，并准备项目里的具体技术决策；历史题目仅供练习。"
  },
  {
    "id": "tencent-testing",
    "company": "tencent",
    "roles": [
      "testing"
    ],
    "title": "腾讯光子工作室，测试开发日常一面",
    "url": "https://www.nowcoder.com/discuss/908761110117908480",
    "source": "牛客用户公开自述",
    "date": "2026-07-07 面试（作者自述）",
    "summary": "作者列出 C++ 对象机制、智能指针、容器和连续子数组相关算法问题。",
    "takeaway": "测试开发也应结合岗位语言补齐编码与内存基础，不能只准备测试用例。"
  },
  {
    "id": "moonshot-agent",
    "company": "moonshot",
    "roles": [
      "agent"
    ],
    "title": "月之暗面AI应用岗Agent开发一面，全程被吊打！！！",
    "url": "https://www.nowcoder.com/discuss/920077145584455680",
    "source": "牛客用户公开自述",
    "date": "日期与招聘类型请查原文",
    "summary": "作者强调实际工程场景中的连续追问，并反思仅准备 Agent 概念的局限。",
    "takeaway": "准备能解释失败、恢复与评测的工程案例，把概念落实到具体实现和证据。"
  },
  {
    "id": "minimax-product",
    "company": "minimax",
    "roles": [
      "product"
    ],
    "title": "Minimax-AI产品面经",
    "url": "https://www.nowcoder.com/discuss/625779241275109376",
    "source": "牛客用户公开自述",
    "date": "2024-05-30 发布 · 历史样本",
    "summary": "作者记录了产品实习贡献、需求痛点、收益指标和 AI 产品理解方面的提问。",
    "takeaway": "把用户痛点、个人贡献与收益指标贯通，准备具体产品的优缺点和改进依据。"
  }
];
