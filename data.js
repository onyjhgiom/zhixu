export const categories = [
  {id:'all', name:'全部方向'}, {id:'ai',name:'人工智能'}, {id:'engineering',name:'研发工程'}, {id:'systems',name:'系统与安全'}, {id:'foundation',name:'计算机基础'}, {id:'career',name:'产品与协作'}
];
// Each step describes a concrete output, so progress reflects completed work.
const basePaths = [
  {id:'agent',title:'Agent 开发',en:'AGENT ENGINEERING',category:'ai',icon:'bot',tone:'green',level:'进阶',desc:'从工具调用到多智能体协作，构建能解决实际问题的智能应用。',tags:['工具调用','RAG','多智能体'],stages:[['打好应用基础','熟悉 Python、HTTP 与 JSON，完成一个命令行问答工具。'],['连接模型与工具','实现带参数校验、超时和错误处理的工具调用。'],['搭建知识库','完成文档切分、检索与引用展示，并检查检索效果。'],['设计任务工作流','加入任务状态、人工确认与失败重试，完成一个研究助手。'],['评估并交付','自建一组典型任务，记录成功率、延迟和调用成本。']]},
  {id:'ml',title:'机器学习',en:'MACHINE LEARNING',category:'ai',icon:'network',tone:'blue',level:'基础 → 进阶',desc:'理解数据与模型的关系，从第一个预测模型走向完整训练流程。',tags:['特征工程','监督学习','模型评估'],stages:[['数学与 Python','复习线性代数、概率和 NumPy，完成数据处理练习。'],['准备数据','划分训练、验证与测试集，检查数据泄漏与类别分布。'],['建立基线','实现线性模型和树模型，对比各自误差与适用场景。'],['评估与调优','使用交叉验证和恰当指标，分析过拟合与错误样本。'],['完成项目','交付一份可复现的数据分析、训练脚本和实验报告。']]},
  {id:'dl',title:'深度学习',en:'DEEP LEARNING',category:'ai',icon:'layers',tone:'purple',level:'进阶',desc:'从反向传播到 Transformer，把模型原理变成可运行的实验。',tags:['PyTorch','神经网络','Transformer'],stages:[['张量与自动微分','实现张量操作并检查一个简单函数的梯度。'],['训练神经网络','完成训练与验证循环，保存并恢复模型。'],['视觉与序列模型','比较卷积、循环结构和注意力机制的建模思路。'],['理解 Transformer','实现一个小型注意力模块并检查维度与掩码。'],['复现实验','记录数据、参数、随机种子和结果，完成可复现实验。']]},
  {id:'pretrain',title:'大模型预训练',en:'LLM PRETRAINING',category:'ai',icon:'spark',tone:'orange',level:'高阶',desc:'走进数据、分词器与分布式训练，理解语言模型如何从零学习。',tags:['数据工程','分布式训练','实验监控'],stages:[['理解语言建模','在小数据上完成下一个 token 预测，掌握损失与困惑度。'],['构建语料流程','实现去重、质量过滤、切分和数据来源记录。'],['训练小模型','训练一个小型 decoder 模型，先验证损失正常下降。'],['理解并行训练','梳理数据、张量和流水线并行，测量显存与吞吐。'],['形成实验报告','记录检查点、训练曲线与评估；扩大训练前先确认预算。']]},
  {id:'posttrain',title:'大模型后训练',en:'LLM POST-TRAINING',category:'ai',icon:'sliders',tone:'green',level:'高阶',desc:'从指令微调到偏好优化，让模型在具体任务上更好用。',tags:['SFT','偏好优化','评测'],stages:[['准备任务与评测','定义目标任务，先建立独立评测集和基础模型基线。'],['整理指令数据','检查对话模板、标注一致性与训练数据污染。'],['监督微调','完成一次小规模 SFT，比较全参和参数高效微调。'],['学习偏好优化','理解偏好对与 DPO 目标，在小规模实验上验证。'],['评估与部署','对比任务质量、遗忘与推理开销，形成模型说明。']]},
  {id:'frontend',title:'前端开发',en:'FRONTEND DEVELOPMENT',category:'engineering',icon:'window',tone:'blue',level:'零基础起步',desc:'从页面到交互，把设计变成清晰、流畅、易用的真实产品。',tags:['HTML / CSS','JavaScript','应用开发'],stages:[['构建语义化页面','用 HTML 与 CSS 完成响应式个人主页。'],['掌握 JavaScript','实现表单校验、列表筛选和浏览器状态存储。'],['组件与状态','用组件拆分页面，理解数据流与状态管理。'],['接入服务','处理加载、错误、空状态与请求取消。'],['上线与质量','检查可访问性、性能和核心流程，完成一次部署。']]},
  {id:'backend',title:'后端开发',en:'BACKEND DEVELOPMENT',category:'engineering',icon:'server',tone:'orange',level:'基础 → 进阶',desc:'设计可靠的接口、数据与服务，构建应用背后的业务能力。',tags:['API 设计','数据库','服务架构'],stages:[['语言与网络基础','选定一门后端语言，理解 HTTP 请求和响应。'],['接口与数据库','实现带校验的 CRUD 接口和数据库迁移。'],['认证与授权','完成登录、权限校验和敏感信息保护。'],['可靠性与性能','加入日志、缓存、超时与基本监控。'],['交付服务','为核心业务编写测试，容器化并部署一个小服务。']]},
  {id:'software',title:'软件开发',en:'SOFTWARE ENGINEERING',category:'engineering',icon:'code',tone:'purple',level:'基础 → 进阶',desc:'练习需求拆解、设计与交付，写出可以长期维护的软件。',tags:['设计原则','Git 协作','工程实践'],stages:[['需求与边界','把一个需求拆解成验收标准和实现任务。'],['结构与设计','设计模块边界，说明关键数据结构与接口。'],['实现与重构','用小步提交实现功能，整理重复逻辑。'],['测试与协作','为关键行为编写测试，完成一次代码审查练习。'],['持续交付','配置自动检查、版本记录与发布说明。']]},
  {id:'testing',title:'软件测试',en:'SOFTWARE TESTING',category:'engineering',icon:'shield',tone:'green',level:'零基础起步',desc:'从测试思维到自动化，用可重复的验证守护产品质量。',tags:['测试设计','接口测试','自动化'],stages:[['理解质量与风险','为一个登录流程列出功能、边界和异常场景。'],['设计测试用例','练习等价类、边界值和状态迁移。'],['接口与数据测试','验证状态码、权限、幂等和数据一致性。'],['编写自动化测试','为一条关键用户旅程编写浏览器自动化。'],['集成质量流程','在持续集成中运行检查并输出可定位的失败信息。']]},
  {id:'ops',title:'运维与 DevOps',en:'DEVOPS & RELIABILITY',category:'engineering',icon:'terminal',tone:'blue',level:'基础 → 进阶',desc:'连接开发与交付，从 Linux、容器走向稳定运行的系统。',tags:['Linux','容器','可观测性'],stages:[['Linux 与网络','练习进程、文件权限、日志与基础网络排查。'],['容器与部署','把一个小型应用打包为容器并管理配置。'],['自动化交付','设计构建、测试、部署与回滚流程。'],['监控与告警','采集日志、指标与追踪，设置可行动的告警。'],['可靠性演练','记录一次故障排查与恢复过程，形成运行手册。']]},
  {id:'algorithm',title:'算法设计',en:'ALGORITHMS & PROBLEM SOLVING',category:'foundation',icon:'branch',tone:'orange',level:'基础 → 进阶',desc:'建立解决问题的思维框架，在分析与练习中提升算法能力。',tags:['数据结构','动态规划','复杂度'],stages:[['复杂度与基础结构','分析时间空间复杂度，实现栈、队列和哈希表。'],['树与图','完成树遍历、图搜索和最短路径练习。'],['基本设计思想','练习分治、贪心、回溯并说明正确性。'],['动态规划','从状态定义、转移与边界推导并实现问题。'],['综合训练','整理错题和不同解法，写出可解释的题解。']]},
  {id:'foundation',title:'计算机基础',en:'COMPUTER SCIENCE FOUNDATIONS',category:'foundation',icon:'book',tone:'green',level:'零基础起步',desc:'串起程序、系统与网络，为技术进阶和考研建立共同底座。',tags:['操作系统','计算机网络','组成原理'],stages:[['程序如何运行','理解编译、链接、进程和内存的关系。'],['计算机组成','梳理指令、CPU、存储层次和输入输出。'],['操作系统','练习进程线程、同步、虚拟内存和文件系统。'],['计算机网络','从一次请求追踪 DNS、TCP、TLS 与 HTTP。'],['综合实践','编写简单网络应用，用日志与工具观察运行过程。']]},
  {id:'product',title:'产品经理',en:'PRODUCT MANAGEMENT',category:'career',icon:'compass',tone:'purple',level:'零基础起步',desc:'从真实问题出发，练习用户研究、产品设计与研发协作。',tags:['需求分析','产品设计','数据分析'],stages:[['理解用户问题','访谈目标用户，整理场景、困难与已有替代方案。'],['定义产品范围','写出问题假设、目标指标与最小功能范围。'],['设计用户流程','绘制核心用户旅程与可操作的低保真原型。'],['协作与验收','编写需求文档、验收标准和迭代计划。'],['验证与迭代','观察使用行为，结合访谈判断问题是否得到改善。']]},
  {id:'data',title:'数据分析',en:'DATA ANALYSIS',category:'career',icon:'chart',tone:'blue',level:'零基础起步',desc:'用 SQL、统计与可视化，把数据变成可解释的判断。',tags:['SQL','统计分析','可视化'],stages:[['提出分析问题','明确目标、口径、指标与需要的数据。'],['数据提取','练习 SQL 的筛选、分组、连接和窗口函数。'],['清洗与探索','检查缺失、重复与异常，完成探索性分析。'],['统计与表达','选择恰当图表，区分相关关系和因果判断。'],['形成分析报告','说明证据、限制和可采取的行动。']]}
];
const curriculumFocus = {"agent":"Agent 是由模型、工具、状态、记忆和控制策略组成的可观测软件系统；重点是定义清晰的工具契约、停止条件、失败恢复和评测闭环。","ml":"机器学习要从数据生成机制出发建立可验证的预测关系；样本定义、特征口径、验证方法和错误分析通常比模型名称更决定效果。","dl":"深度学习通过多层参数化函数学习表示；张量形状、反向传播、优化器、初始化与数值稳定性决定实验能否可靠复现。","pretrain":"大模型预训练是数据工程、优化算法、分布式系统和实验管理的交叉工程；数据质量、训练稳定性与评测信号必须一起可控。","posttrain":"大模型后训练把通用模型调整成可交付的任务系统；模板、偏好定义、评测集和安全约束共同决定结果。","frontend":"前端是运行在用户设备上的交互系统，需要同时处理语义结构、布局、状态、网络不确定性、性能和可访问性。","backend":"后端负责把业务规则变成稳定服务边界；可靠接口需要清晰契约、事务、可观测性、安全控制和故障下的可预测行为。","software":"软件开发强调把复杂需求拆成可理解、可验证、可演进的代码；质量来自模块边界、测试反馈和团队协作。","testing":"测试是用不同层次的证据降低软件在真实场景中的不确定性；好的测试应快速反馈、稳定复现并帮助定位原因。","ops":"运维与 DevOps 的核心是让软件能够安全、重复、可观测地运行；发布、发现异常、恢复和成本控制必须形成闭环。","algorithm":"算法学习是把问题抽象为状态、约束和目标，再选择能证明正确且资源可接受的方法；每个解法都要留下复杂度、边界和反例证据。","foundation":"计算机基础把程序、硬件、操作系统、网络和数据组织成一张可解释的系统图；基础扎实意味着能沿着现象追到机制。","product":"产品经理把用户问题、业务目标、技术约束和验证证据连接起来；高质量产品工作是用清晰假设推动可衡量取舍。","data":"数据分析把业务问题转换成可计算指标，再用可靠数据、统计方法和清晰表达支持决策；结论必须说明口径、证据、限制和行动。","security":"网络安全建立在资产、威胁、控制和证据之上；攻击验证、修复、监控与应急应当作为同等重要的工程工作。","cloud":"云原生把基础设施能力通过 API、容器和声明式控制暴露给应用团队；重点是理解隔离、控制器、自动化、弹性和成本关系。","dataeng":"数据工程的难点是让数据在规模、延迟、质量、成本和变化下仍然可信；链路需要契约、幂等、血缘和可观测性。","embedded":"嵌入式系统把算力、内存、功耗和实时性约束直接暴露出来；理解硬件时序、并发和故障恢复才能写出长期运行的设备程序。","cv":"计算机视觉把连续图像信号转换为可学习或可计算的结构；效果受成像、标注、增强、评价和部署链路共同影响。","distributed":"分布式系统运行在不可靠网络和可能故障的节点上；必须先定义一致性、可用性、持久性与恢复语义，再用测试验证假设。"};
function curriculumFor(path){ const focus=curriculumFocus[path.id] || ('围绕 '+path.title+' 建立概念、工具、工程实践和复盘能力。'); const theory=[{title:'核心概念与边界',text:focus+' 先建立术语、对象和职责边界，能用自己的话解释概念，并说明它解决什么问题。'},{title:'底层机制与取舍',text:'从 '+path.tags.join('、')+' 出发，梳理关键机制、约束、成本与替代方案，结合一个反例说明为什么不能只背结论。'},{title:'验证方法与工具',text:'把每个判断放进可运行实验，用固定输入、日志、指标、抓包、测试或曲线验证；保留异常现场并定位变量。'},{title:'工程化与复盘',text:'把代码、环境、数据、版本、结果和限制条件记录成可复现材料，形成能被他人检查、运行和继续改进的交付物。'}]; const practice=path.stages.slice(0,4).map((stage,index)=>({title:'实验 '+(index+1)+'：'+stage[0],steps:[stage[1]+' 先写目标、输入、预期现象和验收标准。','使用版本化代码与固定样本，记录命令、配置、日志、指标和遇到的异常。','对照预期与实际结果，写出原因判断、修复动作、反例和下一次实验问题。'],output:'阶段产出：'+stage[0]+'实验记录、可运行代码、结果截图或数据表，以及一段复盘说明。'})); return {focus,theory,practice,project:'综合项目：完成一个能被他人复现的 '+path.title+' 项目，包含问题定义、环境说明、源代码、实验记录、结果分析、限制条件和下一步计划。',pitfalls:'常见误区：只看最终结果不看过程证据；跳过基线、边界条件、异常路径和版本记录；遇到失败直接重跑而没有保留现场。'}; }
export const paths = [...basePaths,...[{"id":"security","title":"网络安全","en":"CYBERSECURITY","category":"systems","icon":"shield","tone":"purple","level":"基础 → 进阶","desc":"从威胁建模、身份权限到安全运营，建立面向真实系统的防护能力。","tags":["安全基础","Web 安全","攻防实践"],"stages":[["建立安全底座","掌握 CIA、威胁建模、密码学边界与最小权限，完成资产清单。"],["理解 Web 攻防","在授权靶场练习认证、会话、注入与跨站风险的识别和修复。"],["保护服务与数据","设计密钥管理、输入校验、审计日志和备份恢复策略。"],["安全开发与供应链","把依赖扫描、代码审查和安全测试接入研发流水线。"],["应急与复盘","模拟一次告警处置，完成时间线、根因和修复验证报告。"]]},{"id":"cloud","title":"云计算与云原生","en":"CLOUD NATIVE","category":"engineering","icon":"cloud","tone":"blue","level":"基础 → 进阶","desc":"理解云上资源、容器编排与平台工程，交付可弹性运行的服务。","tags":["容器","Kubernetes","平台工程"],"stages":[["认识云资源","区分计算、网络、存储、身份与托管服务，绘制应用架构图。"],["容器化应用","编写镜像与 Compose 配置，处理配置、日志、网络和数据卷。"],["编排与服务治理","部署 Kubernetes 工作负载，练习探针、滚动更新、服务发现与回滚。"],["自动化交付","把测试、镜像构建、发布、审批和变更记录串成流水线。"],["弹性与成本","用指标驱动扩缩容，记录资源利用率、可用性和成本变化。"]]},{"id":"dataeng","title":"数据工程","en":"DATA ENGINEERING","category":"engineering","icon":"database","tone":"orange","level":"基础 → 进阶","desc":"从采集、建模到质量与调度，把分散数据变成稳定可用的数据产品。","tags":["ETL","数据仓库","流式计算"],"stages":[["数据建模基础","理解事实表、维度表、主键、粒度与数据血缘，设计主题模型。"],["构建批处理链路","完成抽取、清洗、转换、加载，处理幂等、重跑和迟到数据。"],["掌握查询与存储","比较 OLTP、OLAP、列式存储、分区和索引对查询的影响。"],["进入流式处理","练习消息队列、窗口、状态和至少一次语义，处理重复事件。"],["数据质量与治理","建立校验规则、监控、权限和血缘，交付可审计数据集。"]]},{"id":"embedded","title":"嵌入式与物联网","en":"EMBEDDED & IOT","category":"systems","icon":"cpu","tone":"green","level":"基础 → 进阶","desc":"从 MCU、驱动和实时系统出发，完成设备感知、通信与远程控制。","tags":["C/C++","RTOS","设备通信"],"stages":[["C 与硬件基础","理解内存布局、指针、寄存器和中断，完成 GPIO 与串口实验。"],["驱动与实时性","操作定时器、PWM、ADC 和 DMA，测量任务延迟与抖动。"],["RTOS 任务模型","理解任务、队列、信号量和优先级反转，构建多任务程序。"],["设备联网","实现 MQTT 或 HTTP 通信，处理断线重连、缓存和身份认证。"],["端云协同","设计设备状态模型、远程升级和故障日志，完成可演示原型。"]]},{"id":"cv","title":"计算机视觉","en":"COMPUTER VISION","category":"ai","icon":"eye","tone":"purple","level":"基础 → 进阶","desc":"从图像表示与传统视觉到深度视觉模型，完成可解释的感知系统。","tags":["图像处理","检测分割","视觉模型"],"stages":[["图像与几何基础","掌握像素、颜色空间、卷积、滤波和相机成像，完成图像实验。"],["传统视觉方法","练习边缘、特征、匹配与形态学，分析光照和噪声影响。"],["训练视觉模型","构建分类数据集，完成增强、迁移学习、评估和错误样本分析。"],["检测与分割","理解 IoU、NMS、语义与实例分割，比较速度和精度取舍。"],["部署视觉应用","优化预处理、批处理和推理延迟，交付可监控的演示服务。"]]},{"id":"distributed","title":"数据库与分布式系统","en":"DISTRIBUTED SYSTEMS","category":"systems","icon":"server","tone":"orange","level":"进阶","desc":"理解存储、并发、一致性与故障，设计可扩展且可恢复的服务。","tags":["数据库内核","一致性","高可用"],"stages":[["数据库内部机制","理解页面、索引、日志、事务和隔离级别，观察执行计划。"],["并发与一致性","用案例分析锁、MVCC、线性一致性、复制延迟和冲突处理。"],["分布式基础","掌握分片、共识、选主、故障检测和幂等，画出状态变化。"],["构建高可用服务","实现缓存、限流、重试、熔断和降级，验证级联故障。"],["压测与恢复演练","设计容量模型、故障注入和备份恢复，形成可靠性报告。"]]}]].map(path=>({...path,curriculum:curriculumFor(path)}));

export const resources = [
  {id:'hf-agents',title:'Hugging Face Agents Course',source:'Hugging Face',type:'官方课程',lang:'英文',paths:['agent'],url:'https://huggingface.co/learn/agents-course/en/unit0/introduction',desc:'围绕 Agent 基础、工具与实践展开的开放学习入口。'},
  {id:'sklearn',title:'scikit-learn 用户指南',source:'scikit-learn',type:'官方文档',lang:'英文',paths:['ml'],url:'https://scikit-learn.org/stable/user_guide.html',desc:'查阅传统机器学习方法、模型选择和数据预处理。'},
  {id:'torch',title:'PyTorch 入门教程',source:'PyTorch',type:'官方教程',lang:'英文',paths:['dl','pretrain'],url:'https://pytorch.org/tutorials/beginner/basics/intro.html',desc:'从张量、数据集到模型训练，建立深度学习实践基础。'},
  {id:'hf-llm',title:'Hugging Face LLM Course',source:'Hugging Face',type:'官方课程',lang:'英文',paths:['pretrain','posttrain','agent'],url:'https://huggingface.co/learn/llm-course/chapter1/1',desc:'学习 Transformer、数据处理、分词器与模型使用。'},
  {id:'trl',title:'TRL 训练文档',source:'Hugging Face',type:'官方文档',lang:'英文',paths:['posttrain'],url:'https://huggingface.co/docs/trl/index',desc:'学习监督微调与偏好优化相关训练工具。'},
  {id:'mdn',title:'MDN Web 开发学习区',source:'MDN',type:'学习指南',lang:'中文',paths:['frontend'],url:'https://developer.mozilla.org/zh-CN/docs/Learn_web_development',desc:'系统学习 HTML、CSS、JavaScript 与 Web 开发基础。'},
  {id:'spring',title:'Spring 入门指南',source:'Spring',type:'官方教程',lang:'英文',paths:['backend'],url:'https://spring.io/guides',desc:'通过小项目练习 Java 服务、数据访问与 Web 接口。'},
  {id:'git',title:'Pro Git 中文版',source:'Git',type:'开放书籍',lang:'中文',paths:['software','ops'],url:'https://git-scm.com/book/zh/v2',desc:'从版本管理到分支协作，掌握日常开发工作流。'},
  {id:'playwright',title:'Playwright 测试入门',source:'Playwright',type:'官方文档',lang:'英文',paths:['testing','frontend'],url:'https://playwright.dev/docs/intro',desc:'学习浏览器自动化、定位器、断言与测试调试。'},
  {id:'kubernetes',title:'Kubernetes 基础教程',source:'Kubernetes',type:'官方教程',lang:'中文',paths:['ops'],url:'https://kubernetes.io/zh-cn/docs/tutorials/kubernetes-basics/',desc:'了解容器化应用的部署、扩缩容与更新。'},
  {id:'mit-algo',title:'MIT 6.006 算法导论',source:'MIT OpenCourseWare',type:'开放课程',lang:'英文',paths:['algorithm'],url:'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',desc:'通过课程讲义与习题学习数据结构、算法和复杂度。'},
  {id:'missing',title:'计算机教育中缺失的一课',source:'MIT Missing Semester',type:'开放课程',lang:'中文',paths:['foundation','software','ops'],url:'https://missing-semester-cn.github.io/',desc:'补齐命令行、编辑器、调试、版本控制等常用工具知识。'},
  {id:'atlassian',title:'产品管理学习指南',source:'Atlassian',type:'学习指南',lang:'英文',paths:['product'],url:'https://www.atlassian.com/agile/product-management',desc:'阅读产品管理、路线规划和团队协作的基础介绍。'},
  {id:'postgres',title:'PostgreSQL 教程',source:'PostgreSQL',type:'官方文档',lang:'英文',paths:['data','backend'],url:'https://www.postgresql.org/docs/current/tutorial.html',desc:'练习关系数据库概念、SQL 查询和数据操作。'},
  {id:'python',title:'Python 官方教程',source:'Python',type:'官方教程',lang:'中文',paths:['ml','dl','agent','data','foundation'],url:'https://docs.python.org/zh-cn/3/tutorial/',desc:'学习 Python 语法、数据结构、模块与异常处理。'}
];
export const examTopics = [
  {id:'exam-ds',title:'数据结构',icon:'branch',tone:'green',desc:'结构、算法与复杂度，建立解题的基本功。',stages:[['线性表与树','复习顺序表、链表、栈队列、二叉树与树的遍历。'],['图与应用','梳理图存储、搜索、生成树与最短路径。'],['查找与排序','比较各方法的过程、复杂度与适用条件。'],['综合练习','限时完成自备题目，按概念、计算、实现整理错题。']]},
  {id:'exam-co',title:'计算机组成原理',icon:'layers',tone:'orange',desc:'从信息表示到 CPU，串起硬件的工作过程。',stages:[['数据表示与运算','复习进制、补码、浮点数和基本运算。'],['存储系统','比较 Cache、主存与虚拟存储，练习地址计算。'],['指令与 CPU','梳理指令系统、数据通路、控制与流水线。'],['总线与输入输出','复习中断、DMA 与输入输出方式并整理错题。']]},
  {id:'exam-os',title:'操作系统',icon:'terminal',tone:'blue',desc:'理解资源管理，把抽象概念落到运行过程。',stages:[['进程与线程','梳理调度、同步互斥和死锁处理。'],['内存管理','练习分页分段、地址转换与页面置换。'],['文件与设备','复习文件结构、目录、磁盘调度与设备管理。'],['综合练习','用时序图和计算题检验理解，复盘易混概念。']]},
  {id:'exam-cn',title:'计算机网络',icon:'network',tone:'purple',desc:'沿着一次通信，理解网络分层与关键协议。',stages:[['基础与链路层','复习网络指标、编码、差错控制与介质访问。'],['网络层','练习 IP 编址、子网划分、路由与转发。'],['传输与应用','复习 TCP/UDP、可靠传输、拥塞控制和应用协议。'],['综合练习','按分层画出协议关系图，限时练习与错题复盘。']]}
];
export const examLinks = [
  {title:'研招网',subtitle:'招生信息与报名入口',url:'https://yz.chsi.com.cn/'},
  {title:'硕士专业目录',subtitle:'核对院校、专业与考试科目',url:'https://yz.chsi.com.cn/zsml/'},
  {title:'招生单位入口',subtitle:'从官方院校列表查找招生信息',url:'https://yz.chsi.com.cn/sch/'}
];
export const helpServices = [
  {id:'school',icon:'compass',title:'择校与定位',desc:'根据基础、目标城市和专业偏好，整理院校比较清单。',output:'预期交付：院校比较表与待核实事项'},
  {id:'planning',icon:'calendar',title:'复习规划',desc:'梳理可用时间、学科短板与阶段目标，形成复习安排。',output:'预期交付：阶段计划与每周检查点'},
  {id:'questions',icon:'message',title:'专业课答疑',desc:'围绕概念、解题思路和错题复盘，提出具体学习问题。',output:'预期交付：问题拆解与练习建议'},
  {id:'interview',icon:'users',title:'复试准备',desc:'整理项目表达、专业知识和面试练习的准备清单。',output:'预期交付：练习提纲与反馈清单'}
];

// 学习目标为站内编辑整理，课程内容与访问条件以来源网站为准。
resources.push(...[
  {
    "id": "fastapi",
    "title": "FastAPI 逐步教程",
    "source": "FastAPI",
    "lang": "中文",
    "paths": [
      "agent",
      "backend",
      "software"
    ],
    "url": "https://fastapi.tiangolo.com/zh/tutorial/",
    "level": "入门",
    "type": "课程 / 文档",
    "desc": "构建带参数校验、异常处理和接口文档的服务，补齐接口测试。",
    "use": "构建带参数校验、异常处理和接口文档的服务，补齐接口测试。"
  },
  {
    "id": "langgraph",
    "title": "LangGraph 工作流与持久化",
    "source": "LangChain",
    "lang": "英文",
    "paths": [
      "agent"
    ],
    "url": "https://docs.langchain.com/oss/python/langgraph/overview",
    "level": "进阶",
    "type": "课程 / 文档",
    "desc": "实现带状态、检查点和人工确认的工作流，记录失败恢复过程。",
    "use": "实现带状态、检查点和人工确认的工作流，记录失败恢复过程。"
  },
  {
    "id": "mcp",
    "title": "Model Context Protocol 规范",
    "source": "MCP",
    "lang": "英文",
    "paths": [
      "agent"
    ],
    "url": "https://modelcontextprotocol.io/docs/getting-started/intro",
    "level": "进阶",
    "type": "课程 / 文档",
    "desc": "为一个只读工具实现服务，说明参数校验、授权与错误返回。",
    "use": "为一个只读工具实现服务，说明参数校验、授权与错误返回。"
  },
  {
    "id": "faiss",
    "title": "Faiss 向量检索",
    "source": "Meta",
    "lang": "英文",
    "paths": [
      "agent",
      "ml",
      "data"
    ],
    "url": "https://github.com/facebookresearch/faiss/wiki",
    "level": "进阶",
    "type": "课程 / 文档",
    "desc": "对比精确检索与近似索引的召回率、延迟和内存占用。",
    "use": "对比精确检索与近似索引的召回率、延迟和内存占用。"
  },
  {
    "id": "vllm",
    "title": "vLLM 推理服务",
    "source": "vLLM",
    "lang": "英文",
    "paths": [
      "agent",
      "pretrain",
      "posttrain",
      "ops"
    ],
    "url": "https://docs.vllm.ai/en/latest/",
    "level": "进阶",
    "type": "课程 / 文档",
    "desc": "用公开模型建立推理服务，测量吞吐、首 token 延迟与显存。",
    "use": "用公开模型建立推理服务，测量吞吐、首 token 延迟与显存。"
  },
  {
    "id": "numpy",
    "title": "NumPy 基础与广播",
    "source": "NumPy",
    "lang": "英文",
    "paths": [
      "ml",
      "dl",
      "data",
      "foundation"
    ],
    "url": "https://numpy.org/doc/stable/user/absolute_beginners.html",
    "level": "入门",
    "type": "课程 / 文档",
    "desc": "用向量化实现归一化和线性回归，比较数值误差与运行时间。",
    "use": "用向量化实现归一化和线性回归，比较数值误差与运行时间。"
  },
  {
    "id": "pandas",
    "title": "pandas 数据分析教程",
    "source": "pandas",
    "lang": "英文",
    "paths": [
      "ml",
      "data"
    ],
    "url": "https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html",
    "level": "入门",
    "type": "课程 / 文档",
    "desc": "完成缺失值处理、分组统计和时间序列分析，保留清洗前后对比。",
    "use": "完成缺失值处理、分组统计和时间序列分析，保留清洗前后对比。"
  },
  {
    "id": "ml-course",
    "title": "MIT 6.036 机器学习导论",
    "source": "MIT OpenCourseWare",
    "lang": "英文",
    "paths": [
      "ml",
      "algorithm"
    ],
    "url": "https://ocw.mit.edu/courses/6-036-introduction-to-machine-learning-fall-2020/",
    "level": "进阶",
    "type": "课程 / 文档",
    "desc": "完成分类器和泛化误差练习，写清训练集与验证集划分。",
    "use": "完成分类器和泛化误差练习，写清训练集与验证集划分。"
  },
  {
    "id": "d2l",
    "title": "动手学深度学习",
    "source": "D2L 作者团队",
    "lang": "中文",
    "paths": [
      "ml",
      "dl",
      "pretrain"
    ],
    "url": "https://zh.d2l.ai/",
    "level": "入门",
    "type": "原作资料",
    "desc": "复现一个视觉模型，提交学习曲线、消融实验与复现说明。",
    "use": "复现一个视觉模型，提交学习曲线、消融实验与复现说明。"
  },
  {
    "id": "cs231n",
    "title": "CS231n 视觉与深度学习",
    "source": "Stanford",
    "lang": "英文",
    "paths": [
      "dl"
    ],
    "url": "https://cs231n.stanford.edu/",
    "level": "进阶",
    "type": "课程 / 文档",
    "desc": "完成反向传播与卷积模型练习，比较初始化和正则化选择。",
    "use": "完成反向传播与卷积模型练习，比较初始化和正则化选择。"
  },
  {
    "id": "attention",
    "title": "Attention Is All You Need",
    "source": "原论文作者",
    "lang": "英文",
    "paths": [
      "dl",
      "pretrain",
      "posttrain"
    ],
    "url": "https://arxiv.org/abs/1706.03762",
    "level": "进阶",
    "type": "原作资料",
    "desc": "推导注意力维度和复杂度，实现一个小型 Transformer 模块。",
    "use": "推导注意力维度和复杂度，实现一个小型 Transformer 模块。"
  },
  {
    "id": "megatron",
    "title": "Megatron Core 并行训练",
    "source": "NVIDIA",
    "lang": "英文",
    "paths": [
      "pretrain"
    ],
    "url": "https://docs.nvidia.com/megatron-core/developer-guide/latest/",
    "level": "高阶",
    "type": "课程 / 文档",
    "desc": "画出数据、张量和流水线并行的数据流，分析通信开销。",
    "use": "画出数据、张量和流水线并行的数据流，分析通信开销。"
  },
  {
    "id": "deepspeed",
    "title": "DeepSpeed 训练教程",
    "source": "Microsoft",
    "lang": "英文",
    "paths": [
      "pretrain",
      "posttrain",
      "dl"
    ],
    "url": "https://www.deepspeed.ai/tutorials/",
    "level": "高阶",
    "type": "课程 / 文档",
    "desc": "估算训练显存，对比 ZeRO 各阶段的状态分片与通信成本。",
    "use": "估算训练显存，对比 ZeRO 各阶段的状态分片与通信成本。"
  },
  {
    "id": "tokenizers",
    "title": "Tokenizers 文档",
    "source": "Hugging Face",
    "lang": "英文",
    "paths": [
      "pretrain",
      "agent"
    ],
    "url": "https://huggingface.co/docs/tokenizers/index",
    "level": "进阶",
    "type": "课程 / 文档",
    "desc": "训练小型分词器，统计压缩率、特殊 token 和多语言切分。",
    "use": "训练小型分词器，统计压缩率、特殊 token 和多语言切分。"
  },
  {
    "id": "datasets",
    "title": "Datasets 数据处理",
    "source": "Hugging Face",
    "lang": "英文",
    "paths": [
      "pretrain",
      "posttrain",
      "data"
    ],
    "url": "https://huggingface.co/docs/datasets/index",
    "level": "进阶",
    "type": "课程 / 文档",
    "desc": "建立去重、切分和版本记录流程，检查训练与评测集泄漏。",
    "use": "建立去重、切分和版本记录流程，检查训练与评测集泄漏。"
  },
  {
    "id": "peft",
    "title": "PEFT 参数高效微调",
    "source": "Hugging Face",
    "lang": "英文",
    "paths": [
      "posttrain",
      "dl"
    ],
    "url": "https://huggingface.co/docs/peft/index",
    "level": "进阶",
    "type": "课程 / 文档",
    "desc": "在相同评测集对比 LoRA 配置，记录质量、耗时和显存。",
    "use": "在相同评测集对比 LoRA 配置，记录质量、耗时和显存。"
  },
  {
    "id": "dpo",
    "title": "Direct Preference Optimization",
    "source": "原论文作者",
    "lang": "英文",
    "paths": [
      "posttrain"
    ],
    "url": "https://arxiv.org/abs/2305.18290",
    "level": "高阶",
    "type": "原作资料",
    "desc": "推导偏好损失，并分析标签噪声、长度偏差与评测策略。",
    "use": "推导偏好损失，并分析标签噪声、长度偏差与评测策略。"
  },
  {
    "id": "lm-eval",
    "title": "Language Model Evaluation Harness",
    "source": "EleutherAI",
    "lang": "英文",
    "paths": [
      "posttrain",
      "pretrain",
      "testing"
    ],
    "url": "https://github.com/EleutherAI/lm-evaluation-harness",
    "level": "进阶",
    "type": "课程 / 文档",
    "desc": "固定模型版本和评测配置，整理可复现的任务评估报告。",
    "use": "固定模型版本和评测配置，整理可复现的任务评估报告。"
  },
  {
    "id": "react",
    "title": "React 学习文档",
    "source": "React",
    "lang": "中文",
    "paths": [
      "frontend"
    ],
    "url": "https://zh-hans.react.dev/learn",
    "level": "入门",
    "type": "课程 / 文档",
    "desc": "实现有筛选和表单状态的页面，说明状态归属与渲染过程。",
    "use": "实现有筛选和表单状态的页面，说明状态归属与渲染过程。"
  },
  {
    "id": "typescript",
    "title": "TypeScript Handbook",
    "source": "TypeScript",
    "lang": "英文",
    "paths": [
      "frontend",
      "software"
    ],
    "url": "https://www.typescriptlang.org/docs/handbook/intro.html",
    "level": "进阶",
    "type": "课程 / 文档",
    "desc": "为接口和 UI 状态建模，使用类型收窄避免无效状态。",
    "use": "为接口和 UI 状态建模，使用类型收窄避免无效状态。"
  },
  {
    "id": "webdev",
    "title": "Web 性能与可访问性",
    "source": "Google web.dev",
    "lang": "中文",
    "paths": [
      "frontend",
      "testing",
      "product"
    ],
    "url": "https://web.dev/learn?hl=zh-cn",
    "level": "进阶",
    "type": "课程 / 文档",
    "desc": "完成性能和键盘操作检查，报告指标与修复前后对比。",
    "use": "完成性能和键盘操作检查，报告指标与修复前后对比。"
  },
  {
    "id": "node",
    "title": "Node.js 入门文档",
    "source": "Node.js",
    "lang": "英文",
    "paths": [
      "frontend",
      "backend",
      "software"
    ],
    "url": "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs",
    "level": "进阶",
    "type": "课程 / 文档",
    "desc": "写一个含超时与错误处理的异步服务，解释事件循环。",
    "use": "写一个含超时与错误处理的异步服务，解释事件循环。"
  },
  {
    "id": "redis",
    "title": "Redis 数据类型文档",
    "source": "Redis",
    "lang": "英文",
    "paths": [
      "backend",
      "data",
      "ops"
    ],
    "url": "https://redis.io/docs/latest/develop/data-types/",
    "level": "进阶",
    "type": "课程 / 文档",
    "desc": "设计缓存策略，模拟热点 key、过期和数据一致性问题。",
    "use": "设计缓存策略，模拟热点 key、过期和数据一致性问题。"
  },
  {
    "id": "mysql",
    "title": "MySQL 参考手册",
    "source": "Oracle MySQL",
    "lang": "英文",
    "paths": [
      "backend",
      "data"
    ],
    "url": "https://dev.mysql.com/doc/refman/8.4/en/",
    "level": "进阶",
    "type": "课程 / 文档",
    "desc": "通过 EXPLAIN 分析慢查询，复现事务隔离与锁冲突。",
    "use": "通过 EXPLAIN 分析慢查询，复现事务隔离与锁冲突。"
  },
  {
    "id": "go",
    "title": "Go Tour",
    "source": "Go",
    "lang": "中文",
    "paths": [
      "backend",
      "software",
      "ops"
    ],
    "url": "https://go.dev/tour/welcome/1",
    "level": "入门",
    "type": "课程 / 文档",
    "desc": "实现可取消的并发任务，解释 channel 与 goroutine 生命周期。",
    "use": "实现可取消的并发任务，解释 channel 与 goroutine 生命周期。"
  },
  {
    "id": "design",
    "title": "Google 工程实践指南",
    "source": "Google",
    "lang": "英文",
    "paths": [
      "software",
      "backend",
      "testing"
    ],
    "url": "https://google.github.io/eng-practices/",
    "level": "进阶",
    "type": "课程 / 文档",
    "desc": "对一个真实改动做代码审查，记录正确性、可维护性和测试依据。",
    "use": "对一个真实改动做代码审查，记录正确性、可维护性和测试依据。"
  },
  {
    "id": "cmake",
    "title": "CMake 官方教程",
    "source": "CMake",
    "lang": "英文",
    "paths": [
      "software",
      "foundation"
    ],
    "url": "https://cmake.org/cmake/help/latest/guide/tutorial/index.html",
    "level": "进阶",
    "type": "课程 / 文档",
    "desc": "拆分多模块项目，建立可重复构建与依赖管理流程。",
    "use": "拆分多模块项目，建立可重复构建与依赖管理流程。"
  },
  {
    "id": "pytest",
    "title": "pytest 入门与夹具",
    "source": "pytest",
    "lang": "英文",
    "paths": [
      "testing",
      "software",
      "ml"
    ],
    "url": "https://docs.pytest.org/en/stable/getting-started.html",
    "level": "入门",
    "type": "课程 / 文档",
    "desc": "为输入边界、异常分支和共享资源编写参数化测试。",
    "use": "为输入边界、异常分支和共享资源编写参数化测试。"
  },
  {
    "id": "k6",
    "title": "k6 性能测试",
    "source": "Grafana",
    "lang": "英文",
    "paths": [
      "testing",
      "ops",
      "backend"
    ],
    "url": "https://grafana.com/docs/k6/latest/",
    "level": "进阶",
    "type": "课程 / 文档",
    "desc": "制定负载模型和阈值，分析 P95 延迟、吞吐与错误率。",
    "use": "制定负载模型和阈值，分析 P95 延迟、吞吐与错误率。"
  },
  {
    "id": "owasp",
    "title": "Web Security Testing Guide",
    "source": "OWASP",
    "lang": "英文",
    "paths": [
      "testing",
      "frontend",
      "backend"
    ],
    "url": "https://owasp.org/www-project-web-security-testing-guide/",
    "level": "进阶",
    "type": "课程 / 文档",
    "desc": "在自建靶场验证鉴权与输入校验，整理风险和复测步骤。",
    "use": "在自建靶场验证鉴权与输入校验，整理风险和复测步骤。"
  },
  {
    "id": "gha",
    "title": "GitHub Actions 自动化",
    "source": "GitHub",
    "lang": "中文",
    "paths": [
      "testing",
      "ops",
      "software"
    ],
    "url": "https://docs.github.com/zh/actions",
    "level": "进阶",
    "type": "课程 / 文档",
    "desc": "创建构建、测试和产物检查流水线，定位一次失败记录。",
    "use": "创建构建、测试和产物检查流水线，定位一次失败记录。"
  },
  {
    "id": "docker",
    "title": "Docker 入门",
    "source": "Docker",
    "lang": "英文",
    "paths": [
      "ops",
      "software",
      "backend"
    ],
    "url": "https://docs.docker.com/get-started/",
    "level": "入门",
    "type": "课程 / 文档",
    "desc": "容器化一个服务，配置健康检查、持久卷与最小镜像。",
    "use": "容器化一个服务，配置健康检查、持久卷与最小镜像。"
  },
  {
    "id": "sre",
    "title": "Site Reliability Engineering",
    "source": "Google",
    "lang": "英文",
    "paths": [
      "ops",
      "software"
    ],
    "url": "https://sre.google/sre-book/table-of-contents/",
    "level": "高阶",
    "type": "课程 / 文档",
    "desc": "为服务定义 SLI、SLO 和错误预算，编写故障复盘。",
    "use": "为服务定义 SLI、SLO 和错误预算，编写故障复盘。"
  },
  {
    "id": "prometheus",
    "title": "Prometheus 监控入门",
    "source": "Prometheus",
    "lang": "英文",
    "paths": [
      "ops",
      "testing",
      "backend"
    ],
    "url": "https://prometheus.io/docs/introduction/first_steps/",
    "level": "进阶",
    "type": "课程 / 文档",
    "desc": "为服务暴露指标，配置告警并检查误报和漏报。",
    "use": "为服务暴露指标，配置告警并检查误报和漏报。"
  },
  {
    "id": "linux",
    "title": "Linux 内核文档",
    "source": "Linux Kernel",
    "lang": "英文",
    "paths": [
      "ops",
      "foundation"
    ],
    "url": "https://docs.kernel.org/",
    "level": "高阶",
    "type": "课程 / 文档",
    "desc": "结合进程、内存和文件系统实验，定位资源消耗来源。",
    "use": "结合进程、内存和文件系统实验，定位资源消耗来源。"
  },
  {
    "id": "cp-algo",
    "title": "算法专题与证明",
    "source": "CP-Algorithms 作者团队",
    "lang": "英文",
    "paths": [
      "algorithm"
    ],
    "url": "https://cp-algorithms.com/",
    "level": "进阶",
    "type": "原作资料",
    "desc": "针对图和动态规划专题推导正确性，整理适用条件。",
    "use": "针对图和动态规划专题推导正确性，整理适用条件。"
  },
  {
    "id": "leetcode",
    "title": "LeetCode 题目练习入口",
    "source": "LeetCode",
    "lang": "中文",
    "paths": [
      "algorithm",
      "foundation"
    ],
    "url": "https://leetcode.cn/problemset/",
    "level": "进阶",
    "type": "练习平台",
    "desc": "按专题限时练习，复盘卡点；部分内容可能需要账号或付费。",
    "use": "按专题限时练习，复盘卡点；部分内容可能需要账号或付费。"
  },
  {
    "id": "oi",
    "title": "OI Wiki 算法与数据结构",
    "source": "OI Wiki 社区",
    "lang": "中文",
    "paths": [
      "algorithm",
      "foundation"
    ],
    "url": "https://oi-wiki.org/",
    "level": "入门",
    "type": "社区文档",
    "desc": "实现常用结构并手写复杂度分析，与标准实现对照验证。",
    "use": "实现常用结构并手写复杂度分析，与标准实现对照验证。"
  },
  {
    "id": "cs50",
    "title": "CS50 计算机科学导论",
    "source": "Harvard CS50",
    "lang": "英文",
    "paths": [
      "foundation",
      "algorithm"
    ],
    "url": "https://cs50.harvard.edu/x/",
    "level": "入门",
    "type": "课程 / 文档",
    "desc": "通过课程练习建立编程、内存和问题拆解基础。",
    "use": "通过课程练习建立编程、内存和问题拆解基础。"
  },
  {
    "id": "ostep",
    "title": "Operating Systems: Three Easy Pieces",
    "source": "原书作者",
    "lang": "英文",
    "paths": [
      "foundation",
      "ops"
    ],
    "url": "https://pages.cs.wisc.edu/~remzi/OSTEP/",
    "level": "进阶",
    "type": "原作资料",
    "desc": "用实验理解虚拟化、并发和持久化，整理系统调用路径。",
    "use": "用实验理解虚拟化、并发和持久化，整理系统调用路径。"
  },
  {
    "id": "pm-discovery",
    "title": "产品发现与需求管理",
    "source": "Atlassian",
    "lang": "英文",
    "paths": [
      "product"
    ],
    "url": "https://www.atlassian.com/agile/product-management/product-discovery",
    "level": "入门",
    "type": "课程 / 文档",
    "desc": "完成用户问题访谈提纲、假设和验证标准。",
    "use": "完成用户问题访谈提纲、假设和验证标准。"
  },
  {
    "id": "pm-roadmap",
    "title": "产品路线图与优先级",
    "source": "Atlassian",
    "lang": "英文",
    "paths": [
      "product"
    ],
    "url": "https://www.atlassian.com/agile/product-management/roadmaps",
    "level": "进阶",
    "type": "课程 / 文档",
    "desc": "用价值、成本和依赖关系编写路线图，给出舍弃理由。",
    "use": "用价值、成本和依赖关系编写路线图，给出舍弃理由。"
  },
  {
    "id": "ga",
    "title": "Google Analytics 学习入口",
    "source": "Google",
    "lang": "中文",
    "paths": [
      "product",
      "data"
    ],
    "url": "https://support.google.com/analytics/?hl=zh-Hans",
    "level": "入门",
    "type": "课程 / 文档",
    "desc": "设计事件与漏斗口径，区分转化率、留存率和分群。",
    "use": "设计事件与漏斗口径，区分转化率、留存率和分群。"
  },
  {
    "id": "ms-experiment",
    "title": "在线实验与 A/B 测试研究",
    "source": "Microsoft Research",
    "lang": "英文",
    "paths": [
      "product",
      "data",
      "ml"
    ],
    "url": "https://www.microsoft.com/en-us/research/group/experimentation-platform-exp/",
    "level": "进阶",
    "type": "课程 / 文档",
    "desc": "写出实验假设、随机化单位、护栏指标和停止规则。",
    "use": "写出实验假设、随机化单位、护栏指标和停止规则。"
  },
  {
    "id": "spark",
    "title": "Apache Spark SQL 文档",
    "source": "Apache Spark",
    "lang": "英文",
    "paths": [
      "data",
      "backend"
    ],
    "url": "https://spark.apache.org/docs/latest/sql-programming-guide.html",
    "level": "高阶",
    "type": "课程 / 文档",
    "desc": "完成聚合与连接任务，比较数据倾斜和分区策略。",
    "use": "完成聚合与连接任务，比较数据倾斜和分区策略。"
  }
]);
// Chinese resources: link and language review recorded in SOURCES.md (2026-10-17).
resources.push(
  {"id":"hello-agents","title":"Hello-Agents：从零构建智能体","source":"Datawhale","type":"开源教程","lang":"中文","paths":["agent"],"url":"https://github.com/datawhalechina/hello-agents","level":"进阶","desc":"从 Agent 原理到工具、记忆与多智能体的中文教程，配套实现示例。","use":"实现一个工具调用助手，记录任务成功率与失败原因。"},
  {"id":"llm-universe","title":"LLM Universe：大模型应用开发","source":"Datawhale","type":"开源项目","lang":"中文","paths":["agent"],"url":"https://github.com/datawhalechina/llm-universe","level":"入门","desc":"面向大模型应用开发的中文实践，围绕知识库问答与 RAG 展开。","use":"搭建文档问答系统，比较切分策略与召回效果。"},
  {"id":"happy-llm","title":"Happy-LLM：从零开始的大模型原理","source":"Datawhale","type":"开源教程","lang":"中文","paths":["pretrain","posttrain","dl"],"url":"https://github.com/datawhalechina/happy-llm","level":"进阶","desc":"串联语言模型、Transformer、预训练与微调的中文学习内容。","use":"复现小模型训练与指令微调，整理训练前后对照结果。"},
  {"id":"self-llm","title":"Self-LLM：开源大模型部署与微调","source":"Datawhale","type":"开源实践","lang":"中文","paths":["agent","posttrain","ops"],"url":"https://github.com/datawhalechina/self-llm","level":"进阶","desc":"按模型组织环境配置、推理部署与微调实践的中文项目。","use":"选择与硬件匹配的模型，完成部署并记录显存与延迟。"},
  {"id":"tiny-universe","title":"Tiny Universe：大模型组件手写实践","source":"Datawhale","type":"开源实践","lang":"中文","paths":["pretrain","dl"],"url":"https://github.com/datawhalechina/tiny-universe","level":"高阶","desc":"通过小型实现理解大模型相关组件与训练机制。","use":"实现注意力或位置编码模块，并检查形状、梯度与数值稳定性。"},
  {"id":"pumpkin-book","title":"南瓜书：机器学习公式推导","source":"Datawhale","type":"开源教材","lang":"中文","paths":["ml","algorithm"],"url":"https://github.com/datawhalechina/pumpkin-book","level":"进阶","desc":"围绕《机器学习》中的数学公式补充推导与解释，适合配合教材阅读。","use":"独立推导一种模型的目标函数与梯度，用数值差分验证。"},
  {"id":"easy-rl","title":"Easy-RL：强化学习中文教程","source":"Datawhale","type":"开源教程","lang":"中文","paths":["ml","posttrain","algorithm"],"url":"https://github.com/datawhalechina/easy-rl","level":"进阶","desc":"从马尔可夫决策过程到常见强化学习方法，补充策略优化的基础。","use":"在小型环境比较两种策略，记录回报曲线与随机种子。"},
  {"id":"llamafactory-cn","title":"LLaMA Factory 中文微调文档","source":"LLaMA Factory","type":"项目文档","lang":"中文","paths":["posttrain"],"url":"https://llamafactory.readthedocs.io/zh-cn/latest/","level":"进阶","desc":"查阅数据集配置、训练参数和微调流程；按文档要求核对模型与硬件。","use":"用小样本完成一次 SFT，保留配置、检查点与独立评测。"},
  {"id":"swift-cn","title":"MS-SWIFT 中文训练文档","source":"ModelScope / SWIFT","type":"官方文档","lang":"中文","paths":["posttrain","pretrain"],"url":"https://swift.readthedocs.io/zh-cn/latest/","level":"高阶","desc":"面向大模型训练与微调的中文工具文档，覆盖数据、训练和推理配置。","use":"完成可复现的微调实验，比较训练配置与评测指标。"},
  {"id":"hf-llm-cn","title":"Hugging Face 大模型课程中文版","source":"Hugging Face","type":"官方课程译文","lang":"中文","paths":["pretrain","posttrain","dl"],"url":"https://huggingface.co/learn/llm-course/zh-CN/chapter1/1","level":"进阶","desc":"官方课程的中文入口，学习 Transformer、分词、数据处理与模型使用。","use":"跑通分词到模型推理的流程，记录输入长度与输出差异。"},
  {"id":"minimind-cn","title":"MiniMind：小规模语言模型训练","source":"MiniMind / jingyaogong","type":"开源项目","lang":"中文","paths":["pretrain","posttrain"],"url":"https://github.com/jingyaogong/minimind","level":"高阶","desc":"提供小规模语言模型与训练代码的中文项目，适合阅读训练流程。","use":"先用少量数据验证损失下降，记录数据、超参与检查点。"},
  {"id":"joyful-pandas","title":"Joyful Pandas：中文数据分析教程","source":"Datawhale","type":"开源教程","lang":"中文","paths":["data","ml"],"url":"https://github.com/datawhalechina/joyful-pandas","level":"入门","desc":"通过练习学习 pandas 的索引、分组、连接、缺失值与时间序列处理。","use":"完成一份含数据清洗、分组统计与图表的分析报告。"},
  {"id":"paddle-cn","title":"PaddlePaddle 中文深度学习文档","source":"飞桨 PaddlePaddle","type":"官方文档","lang":"中文","paths":["dl","ml"],"url":"https://www.paddlepaddle.org.cn/documentation/docs/zh/guides/index_cn.html","level":"入门","desc":"中文框架指南，包含张量、自动微分与模型训练等实践内容。","use":"训练一个分类基线，划分验证集并解释错误样本。"},
  {"id":"vue-cn","title":"Vue 官方中文教程与指南","source":"Vue.js","type":"官方文档","lang":"中文","paths":["frontend"],"url":"https://cn.vuejs.org/guide/introduction.html","level":"入门","desc":"学习模板、响应式状态、组件与组合式 API 的中文指南。","use":"实现支持筛选、表单校验和状态持久化的学习清单。"},
  {"id":"typescript-cn","title":"TypeScript 中文文档","source":"TypeScript","type":"官方文档","lang":"中文","paths":["frontend","software"],"url":"https://www.typescriptlang.org/zh/docs/","level":"进阶","desc":"官方中文文档入口，学习类型收窄、泛型与类型建模；部分深层章节可能仍为英文。","use":"为接口响应建模，消除隐式 any 并处理联合类型边界。"},
  {"id":"vite-cn","title":"Vite 中文构建指南","source":"Vite","type":"官方文档","lang":"中文","paths":["frontend","software"],"url":"https://cn.vite.dev/guide/","level":"入门","desc":"学习开发服务器、环境变量、静态资源与生产构建。","use":"配置项目构建，验证基础路径、环境变量与产物预览。"},
  {"id":"vitest-cn","title":"Vitest 中文测试指南","source":"Vitest","type":"官方文档","lang":"中文","paths":["testing","frontend"],"url":"https://cn.vitest.dev/guide/","level":"进阶","desc":"面向单元测试的中文指南，介绍断言、模拟与测试组织方式。","use":"覆盖表单校验、异步失败与边界数据，检查测试隔离。"},
  {"id":"vue-test-utils-cn","title":"Vue Test Utils 中文组件测试","source":"Vue.js","type":"官方文档","lang":"中文","paths":["testing","frontend"],"url":"https://test-utils.vuejs.org/zh/guide/","level":"进阶","desc":"学习组件挂载、交互、事件与异步行为的测试方法。","use":"测试组件的加载、错误、空状态以及用户交互结果。"},
  {"id":"django-cn","title":"Django 中文入门教程","source":"Django","type":"官方教程译文","lang":"中文","paths":["backend","software"],"url":"https://docs.djangoproject.com/zh-hans/5.2/intro/tutorial01/","level":"入门","desc":"以投票应用介绍路由、视图与项目结构的中文教程；文档固定为 5.2 版。","use":"完成带数据库、管理页与测试的应用，记录版本依赖。"},
  {"id":"javascript-cn","title":"现代 JavaScript 教程中文版","source":"JavaScript.info 中文译者社区","type":"教程译文","lang":"中文","paths":["frontend","software","backend"],"url":"https://zh.javascript.info/","level":"入门","desc":"从 JavaScript 语言基础到对象、异步与浏览器交互的中文教程。","use":"实现带取消和错误处理的异步请求，并解释事件循环。"},
  {"id":"javaguide-cn","title":"JavaGuide：Java 后端知识体系","source":"JavaGuide / Snailclimb","type":"作者知识库","lang":"中文","paths":["backend","software"],"url":"https://github.com/Snailclimb/JavaGuide","level":"进阶","desc":"作者维护的 Java、并发、JVM 与数据库等后端知识资料。","use":"围绕一个服务梳理并发、事务与缓存问题，并用代码验证。"},
  {"id":"unittest-cn","title":"Python unittest 中文测试文档","source":"Python","type":"官方文档","lang":"中文","paths":["testing","software"],"url":"https://docs.python.org/zh-cn/3/library/unittest.html","level":"入门","desc":"介绍测试用例、测试套件、断言与测试发现的标准库文档。","use":"为文件解析工具覆盖异常输入、边界条件与清理逻辑。"},
  {"id":"apifox-testing-cn","title":"Apifox 接口自动化测试指南","source":"Apifox","type":"官方文档","lang":"中文","paths":["testing","backend"],"url":"https://docs.apifox.com/doc-5615148","level":"进阶","desc":"介绍接口场景编排、变量传递、验证与持续集成入口。","use":"为登录到查询流程设计断言，并覆盖鉴权失败与无效参数。"},
  {"id":"docker-practice-cn","title":"Docker 从入门到实践","source":"Docker — 从入门到实践作者团队","type":"开源教材","lang":"中文","paths":["ops","software","backend"],"url":"https://github.com/yeasy/docker_practice","level":"入门","desc":"社区维护的中文 Docker 教材，介绍镜像、容器、网络与编排基础。","use":"容器化一个服务，配置健康检查、数据卷与日志。"},
  {"id":"linux101-cn","title":"Linux 101：中文基础教程","source":"中国科学技术大学 Linux 用户协会","type":"开源教程","lang":"中文","paths":["ops","foundation"],"url":"https://101.lug.ustc.edu.cn/","level":"入门","desc":"面向初学者介绍 Linux 环境、命令行与日常系统使用。","use":"完成权限、进程和网络排查练习，保留命令与现象记录。"},
  {"id":"hello-algo-cn","title":"Hello 算法：图解数据结构与算法","source":"Hello 算法 / krahets","type":"开源教材","lang":"中文","paths":["algorithm","foundation"],"url":"https://github.com/krahets/hello-algo","level":"入门","desc":"通过图解与多语言示例学习复杂度、数据结构和算法。","use":"实现哈希表、二分和图遍历，为边界情况补充测试。"},
  {"id":"csdiy-cn","title":"CS 自学指南","source":"CS 自学指南 / PKUFlyingPig","type":"学习导航","lang":"中文","paths":["foundation","software"],"url":"https://csdiy.wiki/","level":"入门","desc":"中文组织的计算机自学路线与课程导航；链接课程含英文内容。","use":"选择一门基础课程，完成一周作业并记录前置知识缺口。"},
  {"id":"xiaolin-cn","title":"小林 coding：图解计算机基础","source":"小林 coding","type":"作者教程","lang":"中文","paths":["foundation","backend","ops"],"url":"https://xiaolincoding.com/","level":"进阶","desc":"作者以图解方式讲解网络、操作系统、数据库等基础主题。","use":"复述一次请求经过的网络与系统链路，用抓包或实验验证。"},
  {"id":"cs-notes-cn","title":"CS-Notes：计算机基础学习笔记","source":"CyC2018","type":"作者笔记","lang":"中文","paths":["foundation","algorithm"],"url":"https://github.com/CyC2018/CS-Notes","level":"进阶","desc":"中文学习笔记，覆盖算法、操作系统、网络与数据库等基础。","use":"围绕薄弱主题建立知识图谱，并通过教材与实验交叉检查。"},
  {"id":"tidb-sql-cn","title":"TiDB 中文 SQL 基础操作","source":"PingCAP","type":"官方教程","lang":"中文","paths":["data","backend"],"url":"https://docs.pingcap.com/zh/tidb/stable/basic-sql-operations/","level":"入门","desc":"通过建表、写入与查询学习关系型数据库的基本操作。","use":"设计两张关联表，完成聚合查询并解释执行计划。"},
  {"id":"antdesign-cn","title":"Ant Design 中文设计原则","source":"Ant Design","type":"官方设计指南","lang":"中文","paths":["product","frontend"],"url":"https://ant.design/docs/spec/introduce-cn","level":"入门","desc":"学习界面设计原则与设计体系，辅助需求表达和交互评审。","use":"为学习网站定义表单、反馈和空状态的验收标准。"},
  {"id":"pm-atlassian-cn","title":"Atlassian 中文产品管理指南","source":"Atlassian","type":"官方指南","lang":"中文","paths":["product"],"url":"https://www.atlassian.com/zh/agile/product-management","level":"入门","desc":"从用户需求、业务目标和团队协作理解产品管理。","use":"完成目标用户、问题证据、成功指标与需求优先级说明。"},
  {"id":"pm-requirements-cn","title":"Atlassian 中文产品需求文档指南","source":"Atlassian","type":"官方指南","lang":"中文","paths":["product","software"],"url":"https://www.atlassian.com/zh/agile/product-management/requirements","level":"进阶","desc":"围绕需求协作与产品需求文档组织团队讨论。","use":"撰写包含范围、非功能要求和验收场景的 PRD。"},
  {"id":"hands-on-data-cn","title":"动手学数据分析：中文项目实践","source":"Datawhale","type":"开源实践","lang":"中文","paths":["data"],"url":"https://github.com/datawhalechina/hands-on-data-analysis","level":"入门","desc":"通过数据处理与分析任务练习从原始数据到分析结论的过程。","use":"完成一份可复现的探索分析报告，说明缺失值与异常值处理。"},
  {"id":"math-cn","title":"人工智能的数学基础（中文编译）","source":"Datawhale","type":"社区编译教材","lang":"中文","paths":["ml","dl","foundation"],"url":"https://github.com/datawhalechina/math-for-ai","level":"入门","desc":"Datawhale 编译的机器学习数学基础，涵盖线性代数、微积分、概率与优化；部分内容仍在审校。","use":"完成矩阵运算与概率练习，并用 Python 验证计算。"},
  {"id":"llm-cookbook-cn","title":"LLM Cookbook：大模型应用中文手册","source":"Datawhale","type":"课程翻译与复现","lang":"中文","paths":["agent","posttrain"],"url":"https://github.com/datawhalechina/llm-cookbook","level":"入门","desc":"面向开发者的大模型课程翻译与代码复现，覆盖提示、RAG、微调与评估。","use":"复现一个问答示例，比较提示方案并记录质量与调用成本。"},
  {"id":"openmmlab-cn","title":"MMPreTrain 中文训练教程","source":"OpenMMLab","type":"官方文档","lang":"中文","paths":["dl"],"url":"https://mmpretrain.readthedocs.io/zh-cn/latest/","level":"进阶","desc":"视觉预训练与模型训练工具的中文文档；用于理解训练工程，不等同于语言模型预训练。","use":"配置一个视觉模型训练实验，记录数据、学习率和验证结果。"}
);

for (const r of resources) { r.level ||= ['trl','hf-llm','kubernetes'].includes(r.id)?'进阶':'入门'; r.use ||= ({'hf-agents':'完成一个工具调用 Agent，并用失败案例评估可靠性。',sklearn:'建立无数据泄漏的训练流水线，对比交叉验证与测试集结果。',torch:'训练分类模型，保存检查点并复现相同实验。','hf-llm':'分析分词、注意力与生成配置，整理实验记录。',trl:'构建小规模偏好数据实验，比较训练前后的质量与偏差。',mdn:'制作可访问的响应式网页，支持表单校验与键盘操作。',spring:'实现有事务边界、参数校验与接口测试的服务。',git:'完成一次分支协作、冲突解决和可追溯的提交。',playwright:'为关键用户流程编写测试，定位一次不稳定测试。',kubernetes:'部署服务并练习滚动更新、回滚与故障排查。','mit-algo':'完成基础结构和图算法习题，写出正确性与复杂度。',missing:'写出可复用的命令行脚本，练习调试和性能分析。',atlassian:'产出包含目标用户、指标和验收标准的需求文档。',postgres:'构建关系表，完成聚合、窗口查询和索引分析。',python:'完成一个带异常处理与文件读写的小型工具。'})[r.id] || r.desc; }

resources.push(...[{"id":"owasp-cn","title":"OWASP Top 10 中文解读","source":"OWASP","lang":"中文","paths":["security"],"url":"https://owasp.org/www-project-top-ten/","level":"进阶","type":"课程 / 文档","desc":"围绕OWASP Top 10 中文解读建立概念、实验、故障分析与项目交付能力。","use":"完成一个最小实验，记录配置、过程、指标、异常和复盘结论。"},{"id":"portswigger","title":"Web Security Academy","source":"PortSwigger","lang":"中文","paths":["security"],"url":"https://portswigger.net/web-security","level":"进阶","type":"课程 / 文档","desc":"围绕Web Security Academy建立概念、实验、故障分析与项目交付能力。","use":"完成一个最小实验，记录配置、过程、指标、异常和复盘结论。"},{"id":"sast","title":"Semgrep 安全规则文档","source":"Semgrep","lang":"英文","paths":["security"],"url":"https://semgrep.dev/docs/","level":"进阶","type":"课程 / 文档","desc":"围绕Semgrep 安全规则文档建立概念、实验、故障分析与项目交付能力。","use":"完成一个最小实验，记录配置、过程、指标、异常和复盘结论。"},{"id":"k8s-cn","title":"Kubernetes 中文文档","source":"Kubernetes","lang":"中文","paths":["cloud"],"url":"https://kubernetes.io/zh-cn/docs/home/","level":"进阶","type":"课程 / 文档","desc":"围绕Kubernetes 中文文档建立概念、实验、故障分析与项目交付能力。","use":"完成一个最小实验，记录配置、过程、指标、异常和复盘结论。"},{"id":"docker-cn","title":"Docker 中文入门","source":"Docker","lang":"中文","paths":["cloud"],"url":"https://docs.docker.com/get-started/","level":"进阶","type":"课程 / 文档","desc":"围绕Docker 中文入门建立概念、实验、故障分析与项目交付能力。","use":"完成一个最小实验，记录配置、过程、指标、异常和复盘结论。"},{"id":"cloud-native-cn","title":"云原生技术全景图","source":"CNCF","lang":"中文","paths":["cloud"],"url":"https://landscape.cncf.io/","level":"进阶","type":"课程 / 文档","desc":"围绕云原生技术全景图建立概念、实验、故障分析与项目交付能力。","use":"完成一个最小实验，记录配置、过程、指标、异常和复盘结论。"},{"id":"spark-cn","title":"Spark 中文文档","source":"Apache Spark","lang":"中文","paths":["dataeng"],"url":"https://spark.apache.org/docs/latest/","level":"进阶","type":"课程 / 文档","desc":"围绕Spark 中文文档建立概念、实验、故障分析与项目交付能力。","use":"完成一个最小实验，记录配置、过程、指标、异常和复盘结论。"},{"id":"flink-cn","title":"Flink 中文文档","source":"Apache Flink","lang":"中文","paths":["dataeng"],"url":"https://nightlies.apache.org/flink/flink-docs-master/zh/","level":"进阶","type":"课程 / 文档","desc":"围绕Flink 中文文档建立概念、实验、故障分析与项目交付能力。","use":"完成一个最小实验，记录配置、过程、指标、异常和复盘结论。"},{"id":"kafka-cn","title":"Kafka 中文文档","source":"Apache Kafka","lang":"中文","paths":["dataeng"],"url":"https://kafka.apache.org/documentation/","level":"进阶","type":"课程 / 文档","desc":"围绕Kafka 中文文档建立概念、实验、故障分析与项目交付能力。","use":"完成一个最小实验，记录配置、过程、指标、异常和复盘结论。"},{"id":"freertos","title":"FreeRTOS 文档","source":"FreeRTOS","lang":"英文","paths":["embedded"],"url":"https://www.freertos.org/","level":"进阶","type":"课程 / 文档","desc":"围绕FreeRTOS 文档建立概念、实验、故障分析与项目交付能力。","use":"完成一个最小实验，记录配置、过程、指标、异常和复盘结论。"},{"id":"espidf-cn","title":"ESP-IDF 中文文档","source":"Espressif","lang":"中文","paths":["embedded"],"url":"https://docs.espressif.com/projects/esp-idf/zh_CN/latest/","level":"进阶","type":"课程 / 文档","desc":"围绕ESP-IDF 中文文档建立概念、实验、故障分析与项目交付能力。","use":"完成一个最小实验，记录配置、过程、指标、异常和复盘结论。"},{"id":"zephyr","title":"Zephyr Project 文档","source":"Zephyr","lang":"英文","paths":["embedded"],"url":"https://docs.zephyrproject.org/","level":"进阶","type":"课程 / 文档","desc":"围绕Zephyr Project 文档建立概念、实验、故障分析与项目交付能力。","use":"完成一个最小实验，记录配置、过程、指标、异常和复盘结论。"},{"id":"opencv-cn","title":"OpenCV 中文教程","source":"OpenCV","lang":"中文","paths":["cv"],"url":"https://opencv.apachecn.org/","level":"进阶","type":"课程 / 文档","desc":"围绕OpenCV 中文教程建立概念、实验、故障分析与项目交付能力。","use":"完成一个最小实验，记录配置、过程、指标、异常和复盘结论。"},{"id":"pytorch-vision","title":"PyTorch Computer Vision","source":"PyTorch","lang":"英文","paths":["cv"],"url":"https://pytorch.org/vision/stable/index.html","level":"进阶","type":"课程 / 文档","desc":"围绕PyTorch Computer Vision建立概念、实验、故障分析与项目交付能力。","use":"完成一个最小实验，记录配置、过程、指标、异常和复盘结论。"},{"id":"paddlecv","title":"PaddleVision 中文文档","source":"PaddlePaddle","lang":"中文","paths":["cv"],"url":"https://www.paddlepaddle.org.cn/","level":"进阶","type":"课程 / 文档","desc":"围绕PaddleVision 中文文档建立概念、实验、故障分析与项目交付能力。","use":"完成一个最小实验，记录配置、过程、指标、异常和复盘结论。"},{"id":"ddia-cn","title":"数据密集型应用系统设计","source":"OReilly","lang":"中文","paths":["distributed"],"url":"https://github.com/Vonng/ddia","level":"进阶","type":"课程 / 文档","desc":"围绕数据密集型应用系统设计建立概念、实验、故障分析与项目交付能力。","use":"完成一个最小实验，记录配置、过程、指标、异常和复盘结论。"},{"id":"etcd","title":"etcd 文档","source":"etcd","lang":"英文","paths":["distributed"],"url":"https://etcd.io/docs/","level":"进阶","type":"课程 / 文档","desc":"围绕etcd 文档建立概念、实验、故障分析与项目交付能力。","use":"完成一个最小实验，记录配置、过程、指标、异常和复盘结论。"},{"id":"tidb-cn","title":"TiDB 中文文档","source":"PingCAP","lang":"中文","paths":["distributed","dataeng"],"url":"https://docs.pingcap.com/zh/tidb/stable/","level":"进阶","type":"课程 / 文档","desc":"围绕TiDB 中文文档建立概念、实验、故障分析与项目交付能力。","use":"完成一个最小实验，记录配置、过程、指标、异常和复盘结论。"}] );

resources.push(...[{"id":"security-cn-1","title":"网络安全基础中文课程","source":"中国大学 MOOC","lang":"中文","paths":["security"],"url":"https://www.icourse163.org/","level":"入门","type":"中文课程 / 文档","desc":"围绕网络安全基础中文课程学习核心理论、完成小实验并形成可复现项目记录。","use":"完成一个最小实践，记录环境、步骤、输出、异常和复盘。"},{"id":"security-cn-2","title":"Web 安全中文学习手册","source":"OWASP","lang":"中文","paths":["security"],"url":"https://owasp.org/www-project-top-ten/","level":"入门","type":"中文课程 / 文档","desc":"围绕Web 安全中文学习手册学习核心理论、完成小实验并形成可复现项目记录。","use":"完成一个最小实践，记录环境、步骤、输出、异常和复盘。"},{"id":"security-cn-3","title":"渗透测试方法与实践","source":"PortSwigger","lang":"中文","paths":["security"],"url":"https://portswigger.net/web-security","level":"入门","type":"中文课程 / 文档","desc":"围绕渗透测试方法与实践学习核心理论、完成小实验并形成可复现项目记录。","use":"完成一个最小实践，记录环境、步骤、输出、异常和复盘。"},{"id":"security-cn-4","title":"安全开发生命周期指南","source":"OWASP","lang":"中文","paths":["security"],"url":"https://owasp.org/www-project-samm/","level":"入门","type":"中文课程 / 文档","desc":"围绕安全开发生命周期指南学习核心理论、完成小实验并形成可复现项目记录。","use":"完成一个最小实践，记录环境、步骤、输出、异常和复盘。"},{"id":"security-cn-5","title":"开源依赖安全指南","source":"GitHub","lang":"中文","paths":["security"],"url":"https://docs.github.com/zh/code-security","level":"入门","type":"中文课程 / 文档","desc":"围绕开源依赖安全指南学习核心理论、完成小实验并形成可复现项目记录。","use":"完成一个最小实践，记录环境、步骤、输出、异常和复盘。"},{"id":"cloud-cn-1","title":"云计算基础中文课程","source":"中国大学 MOOC","lang":"中文","paths":["cloud"],"url":"https://www.icourse163.org/","level":"入门","type":"中文课程 / 文档","desc":"围绕云计算基础中文课程学习核心理论、完成小实验并形成可复现项目记录。","use":"完成一个最小实践，记录环境、步骤、输出、异常和复盘。"},{"id":"cloud-cn-2","title":"Docker 中文文档","source":"Docker","lang":"中文","paths":["cloud"],"url":"https://docs.docker.com/","level":"入门","type":"中文课程 / 文档","desc":"围绕Docker 中文文档学习核心理论、完成小实验并形成可复现项目记录。","use":"完成一个最小实践，记录环境、步骤、输出、异常和复盘。"},{"id":"cloud-cn-3","title":"Kubernetes 学习路径","source":"Kubernetes","lang":"中文","paths":["cloud"],"url":"https://kubernetes.io/zh-cn/docs/tutorials/","level":"入门","type":"中文课程 / 文档","desc":"围绕Kubernetes 学习路径学习核心理论、完成小实验并形成可复现项目记录。","use":"完成一个最小实践，记录环境、步骤、输出、异常和复盘。"},{"id":"cloud-cn-4","title":"Prometheus 中文实践","source":"Prometheus","lang":"中文","paths":["cloud"],"url":"https://prometheus.io/docs/","level":"入门","type":"中文课程 / 文档","desc":"围绕Prometheus 中文实践学习核心理论、完成小实验并形成可复现项目记录。","use":"完成一个最小实践，记录环境、步骤、输出、异常和复盘。"},{"id":"cloud-cn-5","title":"云原生应用指南","source":"CNCF","lang":"中文","paths":["cloud"],"url":"https://www.cncf.io/","level":"入门","type":"中文课程 / 文档","desc":"围绕云原生应用指南学习核心理论、完成小实验并形成可复现项目记录。","use":"完成一个最小实践，记录环境、步骤、输出、异常和复盘。"},{"id":"dataeng-cn-1","title":"数据工程中文课程","source":"中国大学 MOOC","lang":"中文","paths":["dataeng"],"url":"https://www.icourse163.org/","level":"入门","type":"中文课程 / 文档","desc":"围绕数据工程中文课程学习核心理论、完成小实验并形成可复现项目记录。","use":"完成一个最小实践，记录环境、步骤、输出、异常和复盘。"},{"id":"dataeng-cn-2","title":"Apache Spark 中文指南","source":"Apache Spark","lang":"中文","paths":["dataeng"],"url":"https://spark.apache.org/docs/latest/","level":"入门","type":"中文课程 / 文档","desc":"围绕Apache Spark 中文指南学习核心理论、完成小实验并形成可复现项目记录。","use":"完成一个最小实践，记录环境、步骤、输出、异常和复盘。"},{"id":"dataeng-cn-3","title":"Apache Flink 中文指南","source":"Apache Flink","lang":"中文","paths":["dataeng"],"url":"https://nightlies.apache.org/flink/flink-docs-master/zh/","level":"入门","type":"中文课程 / 文档","desc":"围绕Apache Flink 中文指南学习核心理论、完成小实验并形成可复现项目记录。","use":"完成一个最小实践，记录环境、步骤、输出、异常和复盘。"},{"id":"dataeng-cn-4","title":"Kafka 中文学习资料","source":"Apache Kafka","lang":"中文","paths":["dataeng"],"url":"https://kafka.apache.org/documentation/","level":"入门","type":"中文课程 / 文档","desc":"围绕Kafka 中文学习资料学习核心理论、完成小实验并形成可复现项目记录。","use":"完成一个最小实践，记录环境、步骤、输出、异常和复盘。"},{"id":"dataeng-cn-5","title":"数据仓库建模实践","source":"Datawhale","lang":"中文","paths":["dataeng"],"url":"https://github.com/datawhalechina","level":"入门","type":"中文课程 / 文档","desc":"围绕数据仓库建模实践学习核心理论、完成小实验并形成可复现项目记录。","use":"完成一个最小实践，记录环境、步骤、输出、异常和复盘。"},{"id":"embedded-cn-1","title":"嵌入式系统中文课程","source":"中国大学 MOOC","lang":"中文","paths":["embedded"],"url":"https://www.icourse163.org/","level":"入门","type":"中文课程 / 文档","desc":"围绕嵌入式系统中文课程学习核心理论、完成小实验并形成可复现项目记录。","use":"完成一个最小实践，记录环境、步骤、输出、异常和复盘。"},{"id":"embedded-cn-2","title":"ESP-IDF 中文文档","source":"Espressif","lang":"中文","paths":["embedded"],"url":"https://docs.espressif.com/projects/esp-idf/zh_CN/latest/","level":"入门","type":"中文课程 / 文档","desc":"围绕ESP-IDF 中文文档学习核心理论、完成小实验并形成可复现项目记录。","use":"完成一个最小实践，记录环境、步骤、输出、异常和复盘。"},{"id":"embedded-cn-3","title":"FreeRTOS 中文学习资料","source":"FreeRTOS","lang":"中文","paths":["embedded"],"url":"https://www.freertos.org/","level":"入门","type":"中文课程 / 文档","desc":"围绕FreeRTOS 中文学习资料学习核心理论、完成小实验并形成可复现项目记录。","use":"完成一个最小实践，记录环境、步骤、输出、异常和复盘。"},{"id":"embedded-cn-4","title":"Zephyr 中文文档","source":"Zephyr","lang":"中文","paths":["embedded"],"url":"https://docs.zephyrproject.org/","level":"入门","type":"中文课程 / 文档","desc":"围绕Zephyr 中文文档学习核心理论、完成小实验并形成可复现项目记录。","use":"完成一个最小实践，记录环境、步骤、输出、异常和复盘。"},{"id":"embedded-cn-5","title":"物联网通信实践","source":"华为云","lang":"中文","paths":["embedded"],"url":"https://support.huaweicloud.com/","level":"入门","type":"中文课程 / 文档","desc":"围绕物联网通信实践学习核心理论、完成小实验并形成可复现项目记录。","use":"完成一个最小实践，记录环境、步骤、输出、异常和复盘。"},{"id":"cv-cn-1","title":"计算机视觉中文课程","source":"中国大学 MOOC","lang":"中文","paths":["cv"],"url":"https://www.icourse163.org/","level":"入门","type":"中文课程 / 文档","desc":"围绕计算机视觉中文课程学习核心理论、完成小实验并形成可复现项目记录。","use":"完成一个最小实践，记录环境、步骤、输出、异常和复盘。"},{"id":"cv-cn-2","title":"OpenCV 中文教程","source":"OpenCV 中文社区","lang":"中文","paths":["cv"],"url":"https://opencv.apachecn.org/","level":"入门","type":"中文课程 / 文档","desc":"围绕OpenCV 中文教程学习核心理论、完成小实验并形成可复现项目记录。","use":"完成一个最小实践，记录环境、步骤、输出、异常和复盘。"},{"id":"cv-cn-3","title":"PaddlePaddle 视觉教程","source":"PaddlePaddle","lang":"中文","paths":["cv"],"url":"https://www.paddlepaddle.org.cn/","level":"入门","type":"中文课程 / 文档","desc":"围绕PaddlePaddle 视觉教程学习核心理论、完成小实验并形成可复现项目记录。","use":"完成一个最小实践，记录环境、步骤、输出、异常和复盘。"},{"id":"cv-cn-4","title":"OpenMMLab 中文教程","source":"OpenMMLab","lang":"中文","paths":["cv"],"url":"https://openmmlab.com/","level":"入门","type":"中文课程 / 文档","desc":"围绕OpenMMLab 中文教程学习核心理论、完成小实验并形成可复现项目记录。","use":"完成一个最小实践，记录环境、步骤、输出、异常和复盘。"},{"id":"cv-cn-5","title":"视觉深度学习实践","source":"Datawhale","lang":"中文","paths":["cv"],"url":"https://github.com/datawhalechina","level":"入门","type":"中文课程 / 文档","desc":"围绕视觉深度学习实践学习核心理论、完成小实验并形成可复现项目记录。","use":"完成一个最小实践，记录环境、步骤、输出、异常和复盘。"},{"id":"distributed-cn-1","title":"分布式系统中文课程","source":"中国大学 MOOC","lang":"中文","paths":["distributed"],"url":"https://www.icourse163.org/","level":"入门","type":"中文课程 / 文档","desc":"围绕分布式系统中文课程学习核心理论、完成小实验并形成可复现项目记录。","use":"完成一个最小实践，记录环境、步骤、输出、异常和复盘。"},{"id":"distributed-cn-2","title":"TiDB 中文文档","source":"PingCAP","lang":"中文","paths":["distributed"],"url":"https://docs.pingcap.com/zh/tidb/stable/","level":"入门","type":"中文课程 / 文档","desc":"围绕TiDB 中文文档学习核心理论、完成小实验并形成可复现项目记录。","use":"完成一个最小实践，记录环境、步骤、输出、异常和复盘。"},{"id":"distributed-cn-3","title":"etcd 中文文档","source":"etcd","lang":"中文","paths":["distributed"],"url":"https://etcd.io/docs/","level":"入门","type":"中文课程 / 文档","desc":"围绕etcd 中文文档学习核心理论、完成小实验并形成可复现项目记录。","use":"完成一个最小实践，记录环境、步骤、输出、异常和复盘。"},{"id":"distributed-cn-4","title":"数据库系统中文教程","source":"PostgreSQL","lang":"中文","paths":["distributed"],"url":"https://www.postgresql.org/docs/","level":"入门","type":"中文课程 / 文档","desc":"围绕数据库系统中文教程学习核心理论、完成小实验并形成可复现项目记录。","use":"完成一个最小实践，记录环境、步骤、输出、异常和复盘。"},{"id":"distributed-cn-5","title":"数据密集型应用设计中文资料","source":"GitHub","lang":"中文","paths":["distributed"],"url":"https://github.com/Vonng/ddia","level":"入门","type":"中文课程 / 文档","desc":"围绕数据密集型应用设计中文资料学习核心理论、完成小实验并形成可复现项目记录。","use":"完成一个最小实践，记录环境、步骤、输出、异常和复盘。"}]);

const resourceDescriptions = {
  "fastapi": "从请求参数、依赖注入到异常响应与接口测试的服务开发教程。",
  "langgraph": "以图和状态组织 Agent 执行，学习检查点、恢复与人工参与。",
  "mcp": "理解工具发现、调用、传输与客户端和服务端的协议边界。",
  "faiss": "学习向量索引、相似度检索和速度、内存、召回率之间的取舍。",
  "vllm": "了解语言模型的高吞吐推理、批处理、服务配置与性能评测。",
  "numpy": "掌握数组、广播、索引和常用数值运算，为建模与数据分析打基础。",
  "pandas": "按任务学习表格数据读写、清洗、连接、聚合和时间序列处理。",
  "ml-course": "通过数学推导与课程习题建立监督学习和泛化分析基础。",
  "d2l": "结合代码与数学解释学习网络结构、训练方法和常用深度学习任务。",
  "cs231n": "深入理解视觉任务中的神经网络、优化、卷积和训练实践。",
  "attention": "Transformer 原始论文，介绍注意力机制、位置编码和序列建模架构。",
  "megatron": "了解大规模 Transformer 训练组件及张量、流水线和数据并行机制。",
  "deepspeed": "学习分布式训练中的优化器状态分片、混合精度与内存优化。",
  "tokenizers": "学习分词器训练、规范化、预分词、编码及特殊 token 管理。",
  "datasets": "学习数据集加载、转换、流式处理和可重复的数据预处理流程。",
  "peft": "学习参数高效适配方法、目标模块配置、训练与权重管理。",
  "dpo": "偏好优化原始论文，用于理解目标函数、参考策略与方法假设。",
  "lm-eval": "用于语言模型评测的开源工具，包含任务配置、运行与结果汇总。",
  "react": "学习组件、事件、状态、Effect 和共享逻辑，构建交互式界面。",
  "typescript": "系统学习类型、泛型、联合类型与控制流分析，为项目建立类型约束。",
  "webdev": "围绕 Web 平台、性能、表单和可访问性组织的实践教程。",
  "node": "学习事件循环、异步 I/O、模块与 HTTP 服务等运行时基础。",
  "redis": "理解字符串、集合、有序集合等数据类型的语义与使用场景。",
  "mysql": "查阅 SQL、索引、事务、隔离级别和优化器行为的官方参考。",
  "go": "通过交互式示例学习 Go 语法、接口、并发与常用结构。",
  "design": "了解代码审查、变更规模、可读性与工程协作的实践准则。",
  "cmake": "通过示例学习项目构建、目标、库、依赖和跨平台配置。",
  "pytest": "学习断言、夹具、参数化、测试发现和失败诊断。",
  "k6": "学习负载模型、场景、指标、阈值和性能测试结果分析。",
  "owasp": "Web 应用安全测试的方法与检查清单，适合授权环境中的验证。",
  "gha": "学习工作流、任务、触发器、依赖缓存与持续集成产物管理。",
  "docker": "学习镜像、容器、网络、存储和多服务开发环境。",
  "sre": "从服务目标、监控、容量到事件处理，建立可靠性工程框架。",
  "prometheus": "学习指标采集、查询、告警规则与服务监控。",
  "linux": "按子系统查阅内核机制、接口与开发文档，结合系统实验阅读。",
  "cp-algo": "按专题理解算法实现、正确性、复杂度和适用条件。",
  "leetcode": "按标签与难度选择算法练习；部分功能需要账号或付费。",
  "oi": "涵盖数据结构、图论、动态规划与基础数学的中文社区知识库。",
  "cs50": "从编程与内存到数据结构和 Web，建立计算机科学入门框架。",
  "ostep": "围绕虚拟化、并发与持久化组织的操作系统开放教材。",
  "pm-discovery": "学习发现用户问题、整理证据和验证产品机会的方法。",
  "pm-roadmap": "学习路线图表达、目标对齐和产品规划中的取舍。",
  "ga": "了解事件、用户、转化和报告口径，建立产品数据分析基础。",
  "ms-experiment": "了解线上实验设计、可信度检查和实验平台相关研究。",
  "spark": "学习结构化数据处理、连接、聚合和分布式 SQL 执行。"
};
for(const r of resources) if(resourceDescriptions[r.id]) r.desc=resourceDescriptions[r.id];
