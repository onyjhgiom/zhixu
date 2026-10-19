import { paths } from './data.js';
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
