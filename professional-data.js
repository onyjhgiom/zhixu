// Editorial learning baselines. Benchmarks below apply only to their stated lab.
export const professionalDataVersion = '2026-10-22.2';
export const contentPolicy = {
  baseline: '以下路线、岗位能力与 JD 词义均为知序编辑能力基线，供校招与社招准备参考，不代表任何公司的官方招聘要求、固定题库或录用承诺。具体岗位以当期官方 JD 为准。',
  measurement: '项目数值是明确实验环境下的练习验收目标。记录硬件、版本、数据规模、并发和测量方法后再比较；不得把本地结果描述为线上生产业绩。',
  privacy: '使用合成或已获授权且脱敏的数据；简历只填写本人完成且能够举证的结果，论文、竞赛和开源贡献按岗位适用性准备。'
};
export const masteryLevels = [
  {level:0,label:'待补基础',description:'自评尚未掌握，或已测知识点尚未达到基础标准；未评估的能力以 null 表示，不记为零分。'},
  {level:1,label:'能解释',description:'能解释概念、边界和常见反例。'},
  {level:2,label:'能实现',description:'可借助文档完成独立实现并覆盖基本测试。'},
  {level:3,label:'能交付',description:'能在异常、协作和性能约束下交付可复现成果。'},
  {level:4,label:'能取舍',description:'能比较方案、解释数据并推动系统性改进。'}
];
const stage = (id,title,weeks,prerequisites,goals,tasks,deliverables,acceptance) => ({id,title,weeks,prerequisites,goals,tasks,deliverables,acceptance});
const skill = (id,title,priority,targetLevel,dependencies,stage,evidence) => ({id,title,priority,targetLevel,dependencies,stage,evidence});
const question = (id,title,type,skillIds,answer,points,followUps) => ({id,title,type,skillIds,answer,scoring:points.map((point,index)=>({point,points:index===0?4:3})),followUps,origin:'站内原创练习'});
const resource = (resourceId,reason) => ({resourceId,reason});
export const professionalDirections = [
  {
    id:'frontend',title:'前端工程',description:'围绕交易工作台建立组件、异步状态、性能、可访问性与发布能力。',pathIds:['frontend'],
    stages:[
      stage('frontend-s1','页面语义与语言基础',2,['能够使用编辑器、命令行和 Git'],['理解浏览器渲染、事件循环与 JavaScript 类型'],['按设计稿实现订单筛选页面，覆盖 375px 与 1440px 宽度','手写表单校验与数组分组，给空值和重复提交写测试'],['语义化页面','20 个语言与表单测试'],['所有输入有可访问名称，键盘可完成筛选','页面在两种宽度无横向溢出，测试全部通过']),
      stage('frontend-s2','组件建模与数据流',3,['完成 frontend-s1'],['按业务状态拆分组件并明确状态归属'],['实现筛选、分页和详情抽屉；筛选条件与 URL 同步','抽离可复用表格与表单，比较本地状态与共享状态适用范围'],['组件边界图','状态转换表','组件测试'],['返回上一页可恢复筛选状态','覆盖空数据、错误、加载和无权限四类状态']),
      stage('frontend-s3','接口联调与质量',3,['完成 frontend-s2'],['处理异步竞态、身份过期和性能瓶颈'],['基于 OpenAPI mock 联调，取消过期请求并处理乱序响应','定位长任务，优化大列表，补关键旅程端到端测试'],['接口契约','性能前后对照报告','自动化测试'],['故意让旧请求晚返回，页面仍显示最新筛选结果','核心操作全部通过键盘和浏览器自动化验证']),
      stage('frontend-s4','工程交付与复盘',2,['完成 frontend-s3'],['完成可审核、可回滚的前端交付'],['接入 lint、类型检查、单元测试和构建检查','记录缓存策略、错误监控与灰度回滚步骤，做一次故障演练'],['可部署构建','CI 配置','发布与回滚手册'],['干净环境按 README 完成构建','模拟接口失败时有可恢复提示，回滚步骤可复现'])
    ],
    skills:[
      skill('frontend-web','语义 HTML、响应式与可访问性','P0',2,[],'frontend-s1','键盘操作录像、标签检查与响应式截图'),
      skill('frontend-js','JavaScript、TypeScript 与事件循环','P0',3,['frontend-web'],'frontend-s1','异步执行顺序解释及边界测试'),
      skill('frontend-state','组件边界、状态机与状态管理','P0',3,['frontend-js'],'frontend-s2','状态图、组件测试和 URL 恢复用例'),
      skill('frontend-network','HTTP、请求取消与缓存一致性','P0',3,['frontend-js','frontend-state'],'frontend-s3','竞态复现用例及修复前后结果'),
      skill('frontend-quality','性能分析与自动化质量','P1',3,['frontend-state','frontend-network'],'frontend-s3','浏览器 trace、性能对照与端到端报告'),
      skill('frontend-delivery','构建、CI、监控与回滚','P1',3,['frontend-quality'],'frontend-s4','CI 记录、错误定位和回滚演练')
    ],
    project:{id:'frontend-order-console',title:'电商订单运营工作台',scenario:'运营需要按状态、时间与用户查询订单，处理审批并在弱网中保留上下文。',environment:'4 核 CPU、8GB 内存；固定 Chromium 版本；本地 mock API；1 万条合成订单；性能用 4 倍 CPU 降速、Fast 4G 配置测试，记录浏览器版本。',tasks:['定义订单状态与权限矩阵，产出接口契约和组件图','实现筛选、分页、详情、审批确认及撤销','加入请求取消、错误重试、键盘导航与虚拟列表','配置 CI，执行弱网与身份过期演练'],deliverables:['源代码与启动说明','组件与接口契约','端到端测试','性能 trace 与发布手册'],acceptance:[{metric:'数据正确性',target:'50 次快速切换筛选无旧响应覆盖新结果',method:'mock 随机 0–1500ms 延迟并验证响应对应请求序号'},{metric:'关键旅程',target:'筛选、查看、审批、权限拒绝等 8 条旅程全部通过',method:'Playwright 在固定 Chromium 执行并保存 trace'},{metric:'交互响应',target:'1 万条订单虚拟列表滚动中单次筛选状态更新的主线程长任务不超过 200ms',method:'固定环境录制 3 次 Performance trace，报告最差值与实现限制'}],skillIds:['frontend-state','frontend-network','frontend-quality','frontend-delivery']},
    questions:[
      question('frontend-q1','快速切换筛选时，为什么页面偶尔显示旧订单？','technical',['frontend-js','frontend-network'],['请求完成顺序与发起顺序不同，闭包和缓存键也可能保留旧条件。','为请求设置序号或 AbortController；提交结果前确认请求仍是当前版本，缓存键包含完整筛选条件。','用可控制的延迟让请求 A 晚于 B 返回，断言最终结果属于 B；分别验证取消和异常分支。'],['准确复现乱序并解释事件循环与状态更新','给出能防止过期结果提交的实现','覆盖取消、失败和缓存键回归'],['请求已经被服务端执行，取消能保证没有副作用吗？','如何处理多组件共享同一份查询缓存？']),
      question('frontend-q2','订单表格首次可用耗时 4 秒，你会如何定位？','design',['frontend-quality','frontend-state'],['先定义首次可用动作和测量环境，使用网络瀑布、Performance 与组件分析区分请求、脚本与渲染耗时。','按瓶颈选择服务端分页、虚拟化、减少重复渲染或拆分加载，保持相同数据与设备进行对照。','报告分位延迟与最差样本，同时回归焦点管理、读屏语义和错误状态，避免性能优化损坏可用性。'],['能给出可重复测量并分解耗时','优化动作与定位证据匹配','覆盖体验与异常回归'],['虚拟列表如何保持屏幕阅读器语义？','为什么给所有计算加 memo 可能没有收益？'])
    ],resources:[resource('mdn','完成语义页面与浏览器基础练习'),resource('react','练习组件边界、状态归属与副作用'),resource('typescript-cn','为接口和业务状态建立可检查类型'),resource('playwright','对竞态、权限和关键旅程保存可复现 trace'),resource('webdev','基于真实 trace 学习性能和可访问性')]
  },
  {
    id:'backend',title:'后端工程',description:'以订单和库存服务练习业务建模、事务、幂等、可观测性与容量验证。',pathIds:['backend','software'],
    stages:[
      stage('backend-s1','语言、协议与工程入口',2,['能编写基本程序并使用 Git'],['建立 HTTP、异常处理与自动测试基础'],['选定 Java、Go 或 Python，一种语言贯穿项目','实现有参数校验、错误码和请求 ID 的订单查询 API'],['API 服务','OpenAPI 契约','单元测试'],['输入错误稳定返回契约错误结构','业务异常不泄漏堆栈和凭据']),
      stage('backend-s2','业务与事务一致性',3,['完成 backend-s1'],['定义订单状态、库存不变量和事务边界'],['设计表结构、索引、迁移和事务流程','实现下单幂等与库存扣减，对并发和重试写集成测试'],['ER 图','迁移脚本','幂等测试'],['相同幂等键重复 20 次只产生一笔订单','并发扣减后库存不为负且总量守恒']),
      stage('backend-s3','可靠性与容量',3,['完成 backend-s2'],['在依赖变慢和负载上升时保持可预测行为'],['为数据库和外部调用配置超时、连接池与有限重试','分析慢查询并设计缓存失效，执行阶梯压测和故障注入'],['压测脚本','查询计划','故障与容量报告'],['记录每档吞吐、P95、错误率和资源使用','依赖超时能终止调用，重试不会重复副作用']),
      stage('backend-s4','服务交付与设计表达',2,['完成 backend-s3'],['独立交付并解释方案取舍'],['容器化并配置 CI，加入结构化日志与业务指标','演练数据库迁移失败、回滚和告警响应'],['部署配置','设计决策记录','运行手册'],['空数据库可一键迁移并启动','通过请求 ID 能追踪一次失败下单并说明恢复路径'])
    ],
    skills:[
      skill('backend-language','语言运行时、并发与错误处理','P0',3,[],'backend-s1','并发边界测试与错误传播示例'),
      skill('backend-api','API 契约、鉴权与业务状态','P0',3,['backend-language'],'backend-s1','OpenAPI、权限矩阵与契约测试'),
      skill('backend-storage','SQL、索引、事务与迁移','P0',3,['backend-api'],'backend-s2','事务测试、EXPLAIN 与迁移回滚'),
      skill('backend-reliability','幂等、超时、限流与缓存','P0',3,['backend-storage'],'backend-s3','重试并发测试与依赖故障注入'),
      skill('backend-observability','日志、指标与容量分析','P1',3,['backend-reliability'],'backend-s3','请求追踪、压测曲线与容量拐点'),
      skill('backend-design','系统设计、演进与发布取舍','P1',4,['backend-observability'],'backend-s4','设计决策、约束说明与回滚演练')
    ],
    project:{id:'backend-inventory',title:'限量商品下单与库存服务',scenario:'活动流量下避免超卖、重复扣减，并让运营能够解释每一笔失败请求。',environment:'4 核 CPU、8GB 内存；本地 Docker Compose 单实例 API、PostgreSQL 与 Redis；1 千商品、10 万历史订单、固定随机种子；压测客户端与服务分进程，记录 CPU 共享限制。',tasks:['定义库存不变量、订单状态机与鉴权范围','实现原子扣减、幂等请求和事务提交','加入限流、外部支付 mock、日志与指标','注入支付超时与数据库连接耗尽，编写恢复方案'],deliverables:['OpenAPI 与 ER 图','服务与数据库迁移','并发集成测试','容量报告与故障复盘'],acceptance:[{metric:'库存一致性',target:'100 并发请求争抢 20 件库存，成功订单为 20 且库存为 0',method:'固定数据集并用事务后查询核对订单与库存'},{metric:'幂等',target:'同一请求键重放 20 次仅形成一个业务结果',method:'并发集成测试检查唯一约束及返回结果'},{metric:'容量与恢复',target:'完成 10、25、50 并发各 60 秒阶梯测试，报告拐点；注入 3 秒支付延迟时调用在配置的 1 秒预算内终止',method:'k6 导出 P95、错误率及资源图，检查超时与无重复扣减证据'}],skillIds:['backend-storage','backend-reliability','backend-observability','backend-design']},
    questions:[
      question('backend-q1','客户端超时后重试下单，怎样避免生成两笔订单？','technical',['backend-storage','backend-reliability'],['客户端生成业务幂等键；服务端用唯一约束或事务性占位原子登记，并绑定用户与请求摘要。','重复请求返回同一业务结果，处理中状态有明确语义；不同参数复用同一键应拒绝。','把订单写入与幂等记录置于同一事务，外部支付使用自身幂等键与补偿核对，验证进程崩溃窗口。'],['解释唯一约束、事务和键作用域','处理处理中与参数冲突','覆盖崩溃窗口及外部副作用'],['如果 Redis 键过期但订单仍存在怎么办？','幂等与业务去重有什么不同？']),
      question('backend-q2','缓存命中率很高，接口 P99 仍在抖动，怎么排查？','design',['backend-observability','backend-design'],['按请求分组检查慢样本，关联连接池等待、GC、数据库锁、热点键和外部依赖，平均命中率掩盖长尾。','核对缓存穿透、过期集中、重建并发及序列化大小，设计受控流量和单变量实验。','先定义延迟预算和一致性要求，再选择错峰过期、请求合并或回源限流，并记录回退和效果。'],['以分位数和请求追踪定位长尾','能设计可证伪的假设与实验','方案考虑一致性、资源与回滚'],['为什么盲目扩大线程池可能更慢？','如何证明延迟下降不是压测流量变化导致？'])
    ],resources:[resource('spring','学习 API 与数据访问的完整最小实现'),resource('go','选择 Go 时练习并发与错误处理'),resource('postgres','用事务与 EXPLAIN 验证库存和索引设计'),resource('redis','理解缓存、原子操作与失效边界'),resource('k6','记录固定环境容量曲线而非只写峰值 QPS')]
  },
  {
    id:'algorithm',title:'算法与问题求解',description:'将复杂度、正确性证明和测试转化为可运行的检索、调度与图算法服务。',pathIds:['algorithm','recsys'],
    stages:[
      stage('algorithm-s1','复杂度与数据结构',2,['掌握一门语言的函数、集合与基本测试'],['能从约束估算时间与内存预算'],['实现堆、哈希计数和并查集，说明操作代价','为重复值、空集合、溢出和极端规模构建测试'],['数据结构实现','复杂度表','边界测试集'],['至少 20 个边界用例通过','每种结构解释一个不适用场景']),
      stage('algorithm-s2','搜索、图与状态建模',3,['完成 algorithm-s1'],['把业务问题转成状态、边与约束'],['实现 BFS、Dijkstra 和拓扑排序，构造负权反例','用回溯与剪枝解决小规模任务分配，和穷举对照'],['图算法库','模型说明','对照测试'],['随机小图与独立穷举结果一致','说明 DAG、非负权等适用前提']),
      stage('algorithm-s3','动态规划与正确性',3,['完成 algorithm-s2'],['能推导状态转移并证明边界'],['完成区间、背包与序列三类状态推导','用循环不变量或归纳法解释正确性，并做状态压缩对照'],['3 份推导题解','状态转移表','性质测试'],['代码与递推式逐项对应','至少一个错误状态定义被反例推翻']),
      stage('algorithm-s4','业务算法与性能实验',2,['完成 algorithm-s3'],['交付有质量边界和性能证据的算法组件'],['为任务调度器定义目标函数与约束，比较精确和启发式方案','基于固定输入规模测量耗时、内存与解质量，说明失败情况'],['调度组件','基准脚本','取舍报告'],['同一输入可复现输出或固定随机种子','报告最差样本、正确性约束与规模上限'])
    ],
    skills:[
      skill('algorithm-complexity','复杂度、规模估算与边界','P0',3,[],'algorithm-s1','输入规模估算和复杂度推导'),
      skill('algorithm-structures','堆、哈希、树与并查集','P0',3,['algorithm-complexity'],'algorithm-s1','操作不变量及边界测试'),
      skill('algorithm-search','图搜索、最短路与剪枝','P0',3,['algorithm-structures'],'algorithm-s2','适用条件、反例与穷举对照'),
      skill('algorithm-dp','动态规划与状态压缩','P0',3,['algorithm-search'],'algorithm-s3','状态、转移、初始化和答案位置说明'),
      skill('algorithm-proof','正确性证明与性质测试','P1',3,['algorithm-dp'],'algorithm-s3','归纳证明及随机性质测试'),
      skill('algorithm-benchmark','算法服务与基准评估','P1',3,['algorithm-proof'],'algorithm-s4','固定数据下耗时、内存和质量对照')
    ],
    project:{id:'algorithm-scheduler',title:'带依赖的离线任务调度器',scenario:'数据任务有依赖、优先级和工作槽限制，需要验证合法调度并减少整体完成时间。',environment:'4 核 CPU、8GB 内存；单进程命令行；固定种子生成 100、1000、10000 节点 DAG；节点耗时为离散模拟值，输出不声称真实集群吞吐。',tasks:['定义 DAG、槽位、任务耗时和合法调度不变量','实现拓扑校验、优先队列调度与环检测','为不超过 8 节点实例实现穷举最优对照','比较 FIFO 与关键路径启发式，记录分布和最差案例'],deliverables:['调度器与输入格式','性质和随机测试','基准数据与复现命令','质量与复杂度报告'],acceptance:[{metric:'约束正确性',target:'1000 个随机 DAG 无依赖违规或槽位超额',method:'独立校验器逐时段检查输出'},{metric:'基准可信度',target:'8 节点以下至少 100 个实例与穷举对照并报告最优差距',method:'同一输入运行全部策略并保存原始结果'},{metric:'规模可用性',target:'1 万节点、5 万边用例在 5 秒内完成调度计算',method:'指定本地环境运行 5 次，报告中位数、最差值和峰值内存'}],skillIds:['algorithm-search','algorithm-proof','algorithm-benchmark']},
    questions:[
      question('algorithm-q1','如何在持续到来的日志中维护出现最多的 K 个词？','technical',['algorithm-structures','algorithm-complexity'],['明确精确统计还是近似统计、词典规模与窗口语义；精确方案用哈希计数加大小 K 的堆或可更新索引。','分析新增与更新的复杂度，处理相同频次、K 为零、词数少于 K；不能每条日志无条件全量排序。','滑动窗口需移除过期计数；无限词典需说明内存不可控，近似算法应给误差语义。'],['根据约束选择结构并解释更新正确性','复杂度和边界分析准确','说明窗口或内存限制与验证方法'],['堆内已有元素增加频次时如何维护？','如果只能使用固定内存如何调整指标？']),
      question('algorithm-q2','为什么带负权边的图不能直接用 Dijkstra？','technical',['algorithm-search','algorithm-proof'],['Dijkstra 固定当前最短距离点的贪心依据依赖边权非负；负边可使已经确定的点再次变短。','构造 3 个点的反例并逐步展示出错；按需求选 Bellman–Ford 或 DAG 上的拓扑最短路。','说明负环使有限最短路径可能不存在，补充不可达点、整数溢出与随机小图对照测试。'],['用具体反例解释失效机制','替代方案符合约束并给复杂度','覆盖负环与工程边界'],['只有一条负边但没有负环，仍会失效吗？','如何验证路径输出与距离输出一致？'])
    ],resources:[resource('hello-algo-cn','从可视化结构走向可测试实现'),resource('mit-algo','学习算法分析与正确性论证'),resource('oi','按图、动态规划和数据结构查专题'),resource('cp-algo','比较算法适用前提和复杂度'),resource('leetcode','选择代表性题练习并保留错误反例')]
  },
  {
    id:'data',title:'数据分析与工程',description:'连接业务指标、SQL、数仓、统计与质量，交付可追溯的数据结论和数据链路。',pathIds:['data','dataeng'],
    stages:[
      stage('data-s1','SQL 与指标口径',2,['会使用表格并理解基本业务流程'],['能定义粒度、分母和时间窗口'],['整理用户、订单和退款数据字典，定义 GMV 与支付转化率','编写 JOIN、窗口函数和去重查询，检查一对多膨胀'],['数据字典','指标 SQL','人工核对样例'],['10 组小样例手算与 SQL 一致','指标明确时间、退款、去重及空值口径']),
      stage('data-s2','数据建模与可重复链路',3,['完成 data-s1'],['建立事实表、维表与可重跑作业'],['设计订单事实与用户维表，明确迟到数据策略','实现增量抽取、幂等写入和分区回填'],['分层模型','作业脚本','血缘和重跑说明'],['同一日期重复运行结果不变','迟到、重复和撤单样例均有明确结果']),
      stage('data-s3','统计推断与业务分析',3,['完成 data-s2'],['区分观察性相关和实验因果'],['拆解转化下降为渠道、设备、版本和漏斗阶段','设计 A/B 实验，预先写样本量、主指标、护栏和停止规则'],['分析 notebook','实验设计','置信区间与限制说明'],['结论附原始查询、分组样本量与区间','检查随机分桶、样本比例和多次查看风险']),
      stage('data-s4','质量监控与数据交付',2,['完成 data-s3'],['把数据结果交付成可维护产品'],['监控完整性、唯一性、新鲜度与业务对账','制作指标看板与异常处理手册，演练上游延迟和字段变更'],['质量规则','看板','故障复盘'],['异常样例均触发指定规则并定位到分区','报告提供可行动建议及适用限制'])
    ],
    skills:[
      skill('data-sql','SQL、窗口函数与查询验证','P0',3,[],'data-s1','复杂查询与手算样例对照'),
      skill('data-metrics','指标口径、漏斗与业务拆解','P0',3,['data-sql'],'data-s1','指标字典、分母与维度拆解'),
      skill('data-modeling','事实维度、粒度与数仓建模','P0',3,['data-sql','data-metrics'],'data-s2','模型图及重复与迟到数据处理'),
      skill('data-pipeline','增量、幂等、调度与血缘','P1',3,['data-modeling'],'data-s2','可重跑作业与回填验证'),
      skill('data-statistics','实验设计、统计推断与误差','P0',3,['data-metrics'],'data-s3','预注册实验方案、区间和假设检验'),
      skill('data-quality','数据质量、对账与监控','P1',3,['data-pipeline','data-statistics'],'data-s4','质量规则、告警与差异明细')
    ],
    project:{id:'data-growth-mart',title:'电商增长指标与质量数据集市',scenario:'业务方需要解释支付转化下降，并确认下降来自产品变化还是埋点和数据延迟。',environment:'4 核 CPU、8GB 内存；本地 PostgreSQL 或 DuckDB；100 万条合成事件、10 万订单；固定时区、币种和种子；不把模拟 A/B 差异解释为真实产品效果。',tasks:['定义曝光、点击、支付、退款口径与事件去重键','构建事实表和增量日汇总，处理重复、迟到与撤单','建立漏斗分群和 A/B 分析，输出不确定性','注入埋点缺失、金额重复和迟到分区并验证质量告警'],deliverables:['数据字典与模型图','SQL 与作业','可复现分析报告','质量看板与对账清单'],acceptance:[{metric:'金额与人数正确性',target:'日汇总与明细对账差额为 0；10 组手算样本全部一致',method:'分区汇总对账并保存差异明细'},{metric:'重跑与迟到',target:'同一分区连续重跑 3 次结果一致，迟到 24 小时样本在回填后计入一次',method:'固定数据快照进行校验和与主键检查'},{metric:'质量监控',target:'重复键、字段缺失、超时到达、金额越界 4 类注入均检出',method:'独立坏数据集验证规则命中与定位信息'}],skillIds:['data-metrics','data-modeling','data-pipeline','data-statistics','data-quality']},
    questions:[
      question('data-q1','支付转化率下降 5%，你会先做哪些核对？','design',['data-metrics','data-statistics','data-quality'],['确认 5% 是相对还是百分点，检查时间窗口、去重、支付状态和分母；先排除延迟、漏埋和口径变更。','按渠道、设备、版本、新老用户分群，比较样本组成和漏斗阶段，警惕辛普森悖论与重复 JOIN。','区分观察性分析与因果结论，报告样本量和区间；若要归因，提出实验或明确假设的准实验。'],['口径与数据可信度核验完整','分群与漏斗定位有证据','正确表达不确定性和因果边界'],['分群转化都提高，整体转化能下降吗？','昨天数据未到齐时如何发布日报？']),
      question('data-q2','每日订单增量任务重跑后金额翻倍，怎样设计可重跑链路？','technical',['data-modeling','data-pipeline'],['明确业务主键、事件版本、目标粒度与分区边界，定位 append 是否重复写入。','选择分区原子替换或按主键 upsert，处理 CDC 更新、删除及迟到数据；提交成功后再推进检查点。','对相同快照重跑、半途失败、乱序更新、退款与跨日样本验证，金额和订单数与明细对账。'],['识别重复写与数据粒度根因','给出幂等和检查点语义','验证更新、失败和迟到边界'],['上游主键会复用时如何处理？','为什么 DISTINCT 不能可靠修复重复金额？'])
    ],resources:[resource('postgres','用 SQL 与事务实现可验证的数据集市'),resource('joyful-pandas','练习清洗、连接与分析过程复现'),resource('spark-cn','数据规模扩大后学习分区与批处理'),resource('flink-cn','对照事件时间、状态与迟到处理'),resource('ms-experiment','学习实验设计及可信度检查')]
  },
  {
    id:'systems',title:'系统与基础架构',description:'围绕 Linux、网络、容器、分布式和 SRE 构建可观测、可回滚的服务平台。',pathIds:['ops','cloud','distributed','foundation'],
    stages:[
      stage('systems-s1','Linux 与网络排障',2,['能运行命令行程序并阅读日志'],['沿请求路径定位 CPU、内存、连接与 DNS 问题'],['使用 ps、ss、top、curl 与抓包解释一次 HTTPS 请求','复现端口占用、文件权限和连接超时，记录证据'],['排障手册','请求路径图','3 份故障记录'],['每个判断都有命令输出和可验证假设','能区分应用错误、网络不可达与资源耗尽']),
      stage('systems-s2','容器与声明式部署',3,['完成 systems-s1'],['理解进程隔离、资源限制与健康检查'],['构建最小权限镜像并分离配置和密钥','在本地 Kubernetes 部署双副本服务，加入资源和探针配置'],['镜像构建','部署清单','配置说明'],['容器重启后业务数据仍由外部存储保存','就绪失败实例不会继续接收新流量']),
      stage('systems-s3','分布式语义与可观测性',3,['完成 systems-s2'],['定义一致性、重试、SLO 与故障恢复边界'],['复现网络超时和进程退出，观察重试与重复请求','建立请求量、错误率、延迟指标及可行动告警'],['SLO 文档','监控看板','故障注入脚本'],['每个告警包含影响、定位入口与行动','说明单机实验无法证明多机一致性与容灾能力']),
      stage('systems-s4','自动交付与故障演练',2,['完成 systems-s3'],['完成可审计发布和恢复流程'],['建立镜像版本、自动测试、滚动发布与回滚','演练坏版本、依赖超时与实例退出，形成无责复盘'],['CI/CD 配置','运行手册','故障复盘'],['5 次发布和回滚均有版本与时间记录','恢复步骤能由另一位同学按文档执行'])
    ],
    skills:[
      skill('systems-linux','Linux 进程、内存与文件权限','P0',3,[],'systems-s1','资源耗尽定位命令与证据'),
      skill('systems-network','TCP、DNS、HTTP 与网络排障','P0',3,['systems-linux'],'systems-s1','请求路径与抓包解释'),
      skill('systems-container','容器、资源限制与 Kubernetes','P0',3,['systems-linux','systems-network'],'systems-s2','镜像与资源探针清单'),
      skill('systems-distributed','一致性、失败语义与恢复','P1',3,['systems-network'],'systems-s3','超时、重复与节点故障实验'),
      skill('systems-observability','SLO、指标、告警与故障定位','P0',3,['systems-container','systems-distributed'],'systems-s3','错误预算、看板与告警处置'),
      skill('systems-delivery','CI/CD、灰度、回滚与成本','P1',4,['systems-observability'],'systems-s4','发布记录、恢复计时与容量取舍')
    ],
    project:{id:'systems-reliable-platform',title:'可回滚的服务交付与故障演练平台',scenario:'应用团队需要发现发布引入的故障，快速定位并恢复服务，且能解释资源成本。',environment:'4 核 CPU、8GB 内存；本地 kind 单节点集群、双副本 API、Prometheus 与固定压测客户端；只评估进程级恢复，不宣称跨机高可用。',tasks:['定义请求成功率 SLI 与 1 分钟观测窗口','部署应用、资源限制、就绪探针与监控','编排坏镜像、慢依赖、进程退出 3 类故障','关联请求指标、事件与日志，执行版本回滚'],deliverables:['部署和 CI 配置','SLO 与告警规则','故障脚本','含时间线的复盘与运行手册'],acceptance:[{metric:'发布可追溯',target:'5 次发布均可追溯到提交 SHA、镜像摘要和配置版本',method:'核对流水线记录与集群实际镜像'},{metric:'探测与恢复',target:'坏版本在 60 秒观测窗口内触发演练告警，执行回滚后 120 秒内连续 3 次健康检查成功',method:'固定每秒 10 次请求，保存时间线与健康检查日志'},{metric:'证据完整性',target:'3 类故障都有用户影响、定位证据、恢复步骤和预防动作',method:'由未参与实现者按手册重放并记录偏差'}],skillIds:['systems-container','systems-distributed','systems-observability','systems-delivery']},
    questions:[
      question('systems-q1','服务进程存活但请求大量超时，为什么重启可能只短暂缓解？','design',['systems-linux','systems-network','systems-observability'],['进程存活不代表业务可用；先查看连接池、线程池、队列、CPU、内存、文件句柄和下游延迟。','用请求追踪和资源时间线找到耗尽链路，重启只是释放积压，持续流量或慢依赖会再次触发。','先限流或降级保护资源，再调整超时、背压和容量；用受控压测验证根因并补探针和告警。'],['区别存活、就绪与业务可用','用数据定位资源耗尽链路','恢复与长期修复可验证'],['就绪探针直接检查所有下游有什么风险？','扩大连接池为什么可能放大故障？']),
      question('systems-q2','滚动发布期间如何避免请求丢失和重复处理？','technical',['systems-container','systems-distributed','systems-delivery'],['新实例先通过就绪检查再接流量，旧实例先摘流量再排空连接；为长请求设置合理终止宽限期。','停止接收新任务并提交已完成任务，消息确认和检查点要匹配处理语义；重投由业务幂等保护。','用持续流量覆盖发布窗口，检查完成数、失败数和重复业务结果，记录负载均衡传播与超时限制。'],['解释摘流、排空与信号处理顺序','区分传输重试与业务幂等','覆盖发布窗口与长连接验证'],['WebSocket 会话如何迁移或重连？','数据库迁移如何兼容新旧两个版本？'])
    ],resources:[resource('linux101-cn','建立 Linux 可观察机制与排障基础'),resource('k8s-cn','理解资源、探针与滚动更新'),resource('ddia-cn','研究一致性和故障语义的取舍'),resource('prometheus','写可行动的指标和告警'),resource('sre','以 SLO 与演练组织可靠性实践')]
  },
  {
    id:'ai',title:'人工智能与智能应用',description:'把数据、模型、评测与服务组成可复现闭环，覆盖机器学习和 RAG 应用交付。',pathIds:['agent','ml','dl','pretrain','posttrain','mlops','cv','nlp'],
    stages:[
      stage('ai-s1','Python、数据与建模基线',2,['掌握函数和集合，了解概率与向量'],['建立独立数据集与最简单可比较方案'],['用 Python 构建数据清洗和按来源切分流程','训练 TF-IDF 线性分类器或建立 BM25 检索基线'],['数据卡','固定划分','基线脚本'],['预处理仅在训练集拟合','每条样本有来源、划分和版本可追溯']),
      stage('ai-s2','模型与错误分析',3,['完成 ai-s1'],['理解目标函数、泛化与消融'],['固定种子和配置，训练一组可复现模型','按类别与困难样本分析错误，比较特征、模型和数据变更'],['模型配置','实验表','错误样例集'],['报告整体与分组指标、样本量及失败案例','每次实验只变更可追踪变量']),
      stage('ai-s3','RAG 与可信评测',3,['完成 ai-s2'],['区分检索质量、答案依据与生成错误'],['构建带页码或段落引用的知识库与混合检索','制作独立问题证据集，评估 Recall@K、引用支持率与拒答'],['检索链路','评测集','消融报告'],['知识库无法回答时返回明确缺失信息','测试问题来源与调参用例分开管理']),
      stage('ai-s4','服务、成本与安全边界',2,['完成 ai-s3'],['在服务预算与权限边界内交付'],['实现限流、超时、取消与调用记录，脱敏日志','测试提示注入、越权检索和模型不可用，比较质量、延迟及成本'],['接口与部署','评测和成本报告','模型卡与运行手册'],['每次结果可追踪索引、模型和提示版本','提示注入不能提升文档权限，失败请求有明确状态'])
    ],
    skills:[
      skill('ai-python','Python、数组与数值基础','P0',2,[],'ai-s1','向量化数据处理和数值边界测试'),
      skill('ai-data','数据切分、标签质量与泄漏','P0',3,['ai-python'],'ai-s1','来源隔离及预处理拟合证据'),
      skill('ai-model','模型目标、优化与泛化','P0',3,['ai-data'],'ai-s2','基线、学习曲线与消融记录'),
      skill('ai-evaluation','评测设计、误差分析与复现','P0',3,['ai-model'],'ai-s3','独立评测集、分组指标及失败分析'),
      skill('ai-serving','模型服务、预算与可观测性','P1',3,['ai-evaluation'],'ai-s4','延迟、成本、版本及故障回归'),
      skill('ai-rag','检索增强、引用与工具边界','P1',3,['ai-data','ai-evaluation'],'ai-s3','Recall@K、引用支持和越权测试')
    ],
    project:{id:'ai-knowledge-assistant',title:'带权限与证据的研发知识助手',scenario:'研发团队需要查询版本化运行手册，并在无依据、无权限或模型失效时得到可信反馈。',environment:'4 核 CPU、8GB 内存；200 份合成或授权脱敏文档；50 条冻结测试问题含 10 条无答案、10 条越权问题；固定向量模型与索引；生成模型使用可配置 API 或本地 mock，真实质量评测注明所用模型。',tasks:['定义用户文档权限、切分与版本规则','实现 BM25 基线及混合检索和引用展示','建立问题、证据、可回答性标注并冻结测试集','加入超时、调用预算、注入与越权回归，比较消融'],deliverables:['数据与模型卡','可运行服务','问题证据评测集','基线消融、成本与安全回归报告'],acceptance:[{metric:'检索召回',target:'冻结测试中可回答问题 Recall@5 达到 0.80，并报告基线与样本量',method:'按人工证据文档集合逐题计算；公布所有失败例'},{metric:'权限边界',target:'10 条越权查询无未经授权段落进入模型上下文或响应',method:'检索层权限过滤并检查上下文审计记录'},{metric:'答案依据',target:'逐条人工标记引用是否支持结论；10 条无答案用例全部有明确拒答或缺失提示',method:'固定 rubric 双次复核，记录分歧与原始输出'},{metric:'预算',target:'每次调用记录检索延迟、生成延迟、token 量、模型与索引版本',method:'用固定请求集生成可导出审计表，模拟超时与限额'}],skillIds:['ai-data','ai-evaluation','ai-serving','ai-rag']},
    questions:[
      question('ai-q1','离线准确率很高，上线后效果差，怎么区分数据与模型问题？','design',['ai-data','ai-model','ai-evaluation'],['核对离线切分是否泄漏，比较线上与训练数据的来源、时间、缺失率、类别和标签延迟。','复现线上预处理与特征版本，对错误样本分群；建立简单基线，隔离数据、阈值、模型和服务变更。','报告分组质量、延迟与反馈偏差，基于冻结评测做消融；线上归因需灰度和护栏，不能用离线单指标代替。'],['检查泄漏、分布与版本一致性','用基线和错误分群隔离变量','提出可重复验证与发布护栏'],['线上标签几天后才到，先监测什么？','类别比例变化会怎样影响准确率与 PR 指标？']),
      question('ai-q2','RAG 返回了正确文档，答案仍错误，应如何拆解？','technical',['ai-rag','ai-evaluation','ai-serving'],['检查证据是否落入实际上下文，关注截断、分块、重排、冲突版本和引用位置；文档命中不等于证据命中。','固定检索结果分别评估生成，要求结论逐句有证据支持并允许拒答；针对多跳、否定和数值问题分组。','记录检索、上下文、模型和提示版本；比较有无重排与不同上下文长度，报告质量、延迟和成本取舍。'],['准确区分检索、上下文与生成三层','评测有引用支持和拒答锚点','消融与调用记录可追溯'],['如何防止测试问题泄漏到提示调优？','文档中嵌入“忽略系统指令”时权限如何保证？'])
    ],resources:[resource('python','建立数据处理与可测试代码基础'),resource('sklearn','比较预处理、基线与验证方案'),resource('d2l','推导训练过程并保存复现实验'),resource('hf-agents','练习工具契约和任务执行边界'),resource('faiss','比较向量检索与独立召回指标'),resource('langgraph','实现可观察状态与失败恢复')]
  },
  {
    id:'security',title:'安全工程',description:'在授权实验环境中建立威胁建模、应用安全、检测、修复与应急闭环。',pathIds:['security'],
    stages:[
      stage('security-s1','协议与威胁建模',2,['理解 HTTP 与基本代码，具备隔离实验环境'],['识别资产、信任边界和攻击面'],['绘制练习电商服务数据流，标出身份和敏感数据','在本地靶场复现输入校验与会话错误，保存脱敏请求'],['资产清单','威胁模型','授权测试范围'],['每个威胁关联资产、入口、影响和控制','测试仅限本地或明确授权环境']),
      stage('security-s2','身份与安全编码',3,['完成 security-s1'],['把修复落到服务端控制和回归测试'],['实现对象级授权、参数化查询和安全会话设置','对比越权、注入和 XSS 的根因、修复与绕过样例'],['权限矩阵','安全测试','修复提交'],['未登录、低权限、跨用户请求均有负向测试','修复后正常业务和异常路径同时回归']),
      stage('security-s3','检测与开发流程',3,['完成 security-s2'],['把安全规则与可行动证据接入研发流程'],['配置依赖、密钥和 SAST 扫描，并人工复核误报','为异常登录和越权尝试设计审计事件与检测规则'],['扫描基线','审计字段','告警规则'],['规则输出能关联代码位置、请求和处置人','不在日志存储密码、令牌和未脱敏隐私']),
      stage('security-s4','应急与修复验证',2,['完成 security-s3'],['形成影响评估、止损、恢复与复盘'],['演练模拟凭据泄漏，执行吊销和密钥轮换','按风险排序修复，提交可复现报告和回归证据'],['事件时间线','漏洞报告','应急手册'],['旧凭据在演练轮换后失效','报告包含前提、最小复现、影响和修复验证'])
    ],
    skills:[
      skill('security-http','HTTP、会话与浏览器安全','P0',3,[],'security-s1','本地抓包、会话和来源边界解释'),
      skill('security-threat','资产、威胁模型与风险排序','P0',3,['security-http'],'security-s1','数据流与资产威胁控制对应表'),
      skill('security-auth','身份、对象授权与权限测试','P0',3,['security-threat'],'security-s2','跨租户和跨用户负向测试'),
      skill('security-code','注入防护、安全编码与审计','P0',3,['security-auth'],'security-s2','修复差异、根因与绕过回归'),
      skill('security-detection','安全扫描、日志与检测工程','P1',3,['security-code'],'security-s3','误报复核、审计字段与规则样例'),
      skill('security-response','事件响应、密钥轮换与复盘','P1',3,['security-detection'],'security-s4','事件时间线与吊销验证')
    ],
    project:{id:'security-review-lab',title:'多租户订单服务安全评审与修复',scenario:'订单服务即将支持企业租户，需要发现越权与凭据风险并将修复纳入持续交付。',environment:'本地隔离 Docker 网络；练习服务与 3 个合成租户、每租户 2 用户；只使用合成身份和虚构数据，不扫描任何第三方系统。',tasks:['定义授权范围、威胁模型和角色对象矩阵','复现跨租户越权、注入和令牌泄漏风险','修复服务端授权、参数化访问和日志脱敏','接入扫描与安全回归，演练令牌吊销'],deliverables:['威胁模型与权限矩阵','脱敏漏洞报告','修复代码与自动化回归','检测规则与应急手册'],acceptance:[{metric:'租户隔离',target:'3 租户 × 2 用户的对象读取与写入矩阵中跨租户访问全部拒绝',method:'自动生成正负权限组合，验证响应和数据库未修改'},{metric:'根因修复',target:'每类练习漏洞都有修复前复现与修复后负向回归',method:'保存最小请求、修复提交与正常业务回归结果'},{metric:'凭据保护',target:'扫描测试日志无明文令牌；轮换后旧令牌的 10 次请求全部拒绝',method:'敏感字段扫描及固定权限测试，日志仅保留不可逆标识'}],skillIds:['security-threat','security-auth','security-code','security-detection','security-response']},
    questions:[
      question('security-q1','前端隐藏了删除按钮，为什么订单仍可能被越权删除？','technical',['security-auth','security-code'],['前端控制不构成服务端授权，用户可构造 HTTP 请求；身份认证也不等于对象授权。','服务端校验操作者、租户、对象归属、动作与状态，数据库访问必须包含授权范围，默认拒绝。','对跨用户、跨租户、不同角色和批量接口做负向测试，同时核对错误响应不泄漏对象是否存在。'],['清楚区分认证、界面和对象授权','授权规则落实到服务端数据范围','权限矩阵和负向回归完整'],['管理员切换租户时怎样保留审计？','批量删除的部分越权如何定义事务语义？']),
      question('security-q2','扫描发现高危依赖，但升级可能破坏业务，应如何处理？','design',['security-threat','security-detection','security-response'],['核对版本、调用路径、可利用前提与暴露面，复核扫描结论并确定受影响资产。','优先采用修复版本并跑兼容回归；无法立即升级时评估禁用入口、隔离或规则缓解，给出负责人和到期时间。','保留依赖锁和组件清单，验证缓解有效且可回滚，升级后复扫；风险接受需要明确记录而非永久忽略。'],['基于利用条件和资产评估风险','修复、缓解与兼容验证可执行','复扫、责任与时限清晰'],['CVSS 很高就一定要先于所有漏洞处理吗？','如何证明缓解规则没有漏掉编码变体？'])
    ],resources:[resource('owasp-cn','用风险类别组织威胁与控制'),resource('portswigger','仅在授权靶场练习漏洞与修复验证'),resource('owasp','按测试方法建立覆盖矩阵'),resource('sast','把规则、误报复核与安全回归接入 CI')]
  },
  {
    id:'testing',title:'测试与质量工程',description:'以风险、契约、自动化、性能和故障诊断组成可维护的质量反馈体系。',pathIds:['testing'],
    stages:[
      stage('testing-s1','风险分析与测试设计',2,['理解一个完整业务流程并能阅读基本代码'],['将业务规则转成可验证的状态和边界'],['为优惠券下单建立决策表、状态迁移和风险清单','覆盖金额边界、有效期、重复提交和权限组合'],['风险矩阵','决策表','测试用例'],['每条高风险规则至少一条正向与负向用例','期望结果明确到状态、金额和副作用']),
      stage('testing-s2','接口与数据自动化',3,['完成 testing-s1'],['建立稳定夹具与契约验证'],['实现接口测试，隔离数据并对鉴权、幂等和事务断言','对数据库前后状态和异步任务结果进行可轮询验证'],['接口套件','数据夹具','契约与数据库断言'],['测试可乱序独立运行并自行清理数据','异步验证使用条件轮询及上限，不靠固定长等待']),
      stage('testing-s3','端到端与性能诊断',3,['完成 testing-s2'],['用最少关键旅程覆盖高风险并定位失败'],['实现稳定语义定位器、trace 和失败截图','做阶梯负载与异常注入，关联接口分位耗时和服务资源'],['端到端测试','性能脚本','定位报告'],['失败可区分产品缺陷、测试问题和环境问题','报告包含负载模型、数据规模与瓶颈证据']),
      stage('testing-s4','持续质量与发布门禁',2,['完成 testing-s3'],['按风险和执行成本设计反馈速度'],['将单元、接口、端到端分层接入 CI','建立不稳定用例处置、缺陷分级和上线回归清单'],['流水线','质量报告','发布与缺陷复盘'],['关键用例失败阻止演练发布','不以重跑掩盖失败，隔离用例有原因与修复期限'])
    ],
    skills:[
      skill('testing-design','风险、决策表与状态迁移','P0',3,[],'testing-s1','高风险规则到用例的可追溯矩阵'),
      skill('testing-api','接口契约、数据库与幂等测试','P0',3,['testing-design'],'testing-s2','独立夹具和数据库副作用断言'),
      skill('testing-automation','自动化架构、定位与测试隔离','P0',3,['testing-api'],'testing-s3','乱序通过、语义定位与失败 trace'),
      skill('testing-performance','负载模型、容量与性能指标','P1',3,['testing-api'],'testing-s3','阶梯负载、P95 和资源关联'),
      skill('testing-diagnosis','缺陷定位、可观测性与复现','P0',3,['testing-automation'],'testing-s3','最小复现、请求 ID 和归因证据'),
      skill('testing-ci','质量门禁、不稳定治理与发布','P1',3,['testing-performance','testing-diagnosis'],'testing-s4','CI 门禁和不稳定用例处置记录')
    ],
    project:{id:'testing-coupon-quality',title:'优惠券交易链路质量保障',scenario:'满减、有效期、库存、退款和并发叠加后容易出现金额与状态缺陷，需要可持续回归。',environment:'4 核 CPU、8GB 内存；本地 mock 电商服务和 PostgreSQL；固定 UTC 时间夹具、合成订单；Chromium 固定版本；每个测试使用唯一命名空间。',tasks:['建立优惠券规则决策表与金额不变量','实现接口、数据库、端到端三层验证','注入重复提交、时钟边界、慢回调和库存不足','设置 CI 门禁、性能基线与失败归因'],deliverables:['风险用例矩阵','自动化套件与夹具','负载与故障报告','缺陷报告及质量门禁'],acceptance:[{metric:'业务覆盖',target:'至少 24 个规则用例与 6 条关键旅程全部通过',method:'用例映射至决策表，断言金额、订单状态与库存'},{metric:'稳定与隔离',target:'固定环境随机顺序运行 10 轮无共享数据污染，所有失败保存 trace',method:'记录种子、轮次、环境和独立夹具清理结果'},{metric:'缺陷检出',target:'重复扣券、过期可用、退款未回补 3 类已知注入全部被门禁检出',method:'对每个变异版本执行 CI 并核对失败断言'},{metric:'性能可信度',target:'10、25、50 并发各 60 秒报告 P95、错误率和瓶颈，不将接口失败算作成功吞吐',method:'k6 原始结果与服务日志按请求 ID 对齐'}],skillIds:['testing-design','testing-api','testing-automation','testing-performance','testing-ci']},
    questions:[
      question('testing-q1','一条 UI 自动化偶尔失败，直接重跑为什么不够？','technical',['testing-automation','testing-diagnosis','testing-ci'],['先保存失败 trace、截图、控制台、网络与数据种子；区分等待竞态、选择器、共享数据、环境和真实产品缺陷。','用状态或响应条件等待，使用语义定位器和独立夹具；控制单变量重放原始失败。','重跑只用于收集不稳定证据，记录首次失败率；临时隔离要保留负责人、原因和修复期限。'],['能够保留现场并分类假设','修复针对根因且可复现','门禁与不稳定统计不被重跑掩盖'],['重试通过能否算质量通过？','如何区分服务变慢与测试等待写错？']),
      question('testing-q2','如何验证接口“成功返回”但实际发生了重复扣款？','design',['testing-design','testing-api','testing-performance'],['定义金额守恒、业务唯一键和支付记录不变量；状态码仅是一个观察面。','并发发送相同键、超时重试与回调重复，核对订单、账本和外部支付 mock 记录。','注入提交前后崩溃并做对账，验证补偿和告警；所有夹具隔离且能重现请求顺序。'],['定义业务不变量和副作用断言','覆盖重试、并发及重复回调','验证崩溃、补偿与证据链'],['客户端超时但数据库已提交时应断言什么？','异步支付如何设计测试完成条件？'])
    ],resources:[resource('pytest','建立独立夹具、参数化与失败定位'),resource('playwright','通过 trace、语义定位和自动等待验证旅程'),resource('k6','明确负载模型与性能结果口径'),resource('gha','把分层检查接入可追溯流水线'),resource('design','以可审核变更和质量反馈组织协作')]
  },
  {
    id:'game',title:'游戏开发',description:'围绕可玩的双人协作关卡，掌握引擎与数学基础、玩法架构、资源生命周期、帧时间分析和权威同步。',pathIds:['game'],
    stages:[
      stage('game-s1','编程、数学与引擎循环',2,['会使用一门编程语言、Git 与调试器'],['理解向量、坐标变换与时间步长，完成最小可玩原型'],['选择 Unity / C#、Unreal / C++ 或 Godot 作为主线，固定引擎版本并提交可复现工程；基础薄弱可先用 Godot 验证机制','实现移动、相机跟随和碰撞；分离输入采样、固定步模拟与渲染插值，记录点积、归一化和局部/世界坐标实验'],['可运行原型与环境说明','坐标与更新时序图','移动和碰撞测试'],['无碰撞直线移动 10 秒，在 30/60/120 渲染帧率限制下位移差异不超过 1%','暂停时模拟停止且菜单可操作，恢复后无时间累计导致的瞬移']),
      stage('game-s2','玩法架构与资源生命周期',3,['完成 game-s1'],['用组件、状态机和数据配置组织可扩展玩法'],['实现待机、移动、受击、死亡状态及两类敌人；分离战斗规则、动画和 UI，以配置驱动两关难度','为弹体和特效建立对象池，处理回收重置、事件退订、异步加载取消和场景切换；检查素材许可'],['状态迁移图与组件边界','两关配置及存档格式','资源清单与生命周期测试'],['同一攻击事件只结算一次，死亡角色不能继续造成伤害','连续重开 20 次后无重复订阅、残留弹体或旧场景加载回调污染新场景']),
      stage('game-s3','渲染、内存与性能诊断',3,['完成 game-s2'],['区分 CPU、GPU、分配和资源加载瓶颈，以帧时间验证优化'],['在独立构建中固定 200 活跃实体和输入回放，采集主线程、GPU、Draw Call、分配及内存；分别记录冷启动和稳态','按证据选择批处理、对象池、碰撞简化或分帧加载，比较优化前后 P50/P95/P99 帧时间和峰值内存'],['固定负载与回放脚本','Profiler 捕获与原始帧时间','优化对照和限制说明'],['报告注明 CPU/GPU 型号、分辨率、引擎版本、构建模式、预热与采样长度','同一配置执行 3 轮 10 分钟实验，性能变化能对应到具体瓶颈，核心玩法回归通过']),
      stage('game-s4','联机同步、构建与作品交付',2,['完成 game-s3'],['明确服务端权威和客户端表现边界，交付可复现作品'],['使用引擎已有联机框架运行本地权威服务端和两个客户端，给操作加序号，验证位置、伤害和计分权限；比较快照插值与预测校正的适用范围','注入延迟、丢包、重复和断连，处理重连快照与重复结算；自动导出构建并整理试玩、缺陷、发布与回滚记录'],['双客户端与服务端构建','协议与故障回放记录','作品演示、CI 和版本说明'],['伪造分数或重复攻击不能改变权威结算，重连后恢复同一房间最新快照','干净环境按 README 启动双人流程，包体、素材许可、已知问题和个人贡献可核对'])
    ],
    skills:[
      skill('game-programming','编程、向量数学与引擎组件','P0',3,[],'game-s1','主线引擎工程、坐标变换测试与生命周期时序说明'),
      skill('game-loop','游戏循环、固定步物理与输入','P0',3,['game-programming'],'game-s1','跨帧率位移对照、碰撞与暂停恢复用例'),
      skill('game-gameplay','玩法状态机、战斗规则与配置','P0',3,['game-loop'],'game-s2','状态图、两关配置和伤害唯一结算测试'),
      skill('game-assets','资源加载、对象池与场景生命周期','P0',3,['game-gameplay'],'game-s2','回收重置、事件退订、取消加载与 20 次重开检查'),
      skill('game-performance','渲染管线、Profiler 与帧时间优化','P1',3,['game-assets'],'game-s3','独立构建 CPU/GPU 捕获、帧时间分位数与内存对照'),
      skill('game-network','权威同步、弱网恢复与构建交付','P1',3,['game-gameplay','game-performance'],'game-s4','双客户端弱网回放、权威校验、重连快照与 CI 构建')
    ],
    project:{
      id:'game-coop-arena',title:'双人协作闯关与性能优化',
      scenario:'为双人协作玩法交付两关原型：移动、战斗、两类敌人、计分、暂停与重开；验证资源释放、低帧率和弱网下的正确性。',
      environment:'本地 4 核 CPU、8GB 内存，记录实际 CPU/GPU 型号；固定主线引擎版本，1280×720 独立构建；固定随机种子、200 个活跃实体和输入回放。性能以单客户端测量，网络验证另开一个无渲染权威服务端和两个客户端；资源使用原创或许可素材。',
      tasks:['画出输入、模拟、动画、UI 和权威结算边界，用版本化配置组织两关与存档','实现固定步移动、战斗状态机、两类敌人、暂停和重开，覆盖碰撞与重复伤害','加入对象池、异步加载取消和事件退订，检查场景切换及资源回收','在独立构建中定位 CPU/GPU 和分配瓶颈，保存同负载的优化前后数据','使用引擎联机框架完成双客户端权威同步，注入弱网、伪造分数、重复事件和断线重连','配置自动构建与冒烟检查，提交可玩包、演示、素材清单和缺陷复盘'],
      deliverables:['源代码、引擎版本与一键运行说明','状态图、场景配置、协议和素材许可清单','可玩构建、双人演示与自动化/回放测试','Profiler 捕获、帧时间原始数据与优化对照','CI 记录、已知问题和个人贡献复盘'],
      acceptance:[
        {metric:'时间与玩法正确性',target:'30/60/120 渲染帧率下无碰撞直线移动 10 秒的位移差异不超过 1%；两关的死亡、计分、暂停和重开 12 条回归全部通过',method:'固定输入与物理步长，记录逻辑坐标；回放检查状态和伤害事件，不要求浮点物理跨平台确定性'},
        {metric:'资源生命周期',target:'连续重开 20 次后，无旧场景弹体、重复事件监听或过期加载回调；清理后存活对象不随重开次数持续增长',method:'逐轮记录活跃节点、池容量、订阅数和内存，区分缓存保留与泄漏，保存异常复现'},
        {metric:'帧时间预算',target:'预热 30 秒后，200 活跃实体连续运行 10 分钟，3 轮 P95 帧时间均不超过 33.3ms，并报告 P99、最差帧与峰值内存',method:'在上述固定单客户端环境采样独立构建；附 CPU/GPU 捕获和前后对照，预算仅为该练习验收目标'},
        {metric:'权威与弱网恢复',target:'每向 100ms 注入延迟、2% 丢包下完成一局；50 次重复攻击只按唯一事件结算，伪造分数被拒绝；断线 3 秒后重连恢复最新权威快照',method:'使用有上限的应用层网络故障夹具和固定种子，保存请求序号、事件 ID、快照版本与服务端结算日志'}
      ],skillIds:['game-loop','game-gameplay','game-assets','game-performance','game-network']
    },
    questions:[
      question('game-q1','角色在低帧率下跑得更慢，物理还会穿墙，如何分别定位？','technical',['game-loop','game-performance'],['先记录输入采样、模拟与渲染频率，区分每帧固定移动量、过大时间步和离散碰撞漏检；平均 FPS 不能代替时序证据。','按速度乘时间步计算位移，物理逻辑使用引擎固定步；限制卡顿后的追帧工作并明确丢时策略，渲染使用插值；高速物体按需求采用连续检测或扫掠。','固定输入比较 30/60/120 渲染帧率和卡顿注入，分别断言无碰撞位移、碰撞结果和暂停恢复；固定步不自动保证跨平台浮点确定性。'],['区分速度、时间步与碰撞采样的根因','给出固定步、插值与高速碰撞的适用方案','提供可复现对照并说明确定性限制'],['一帧内多次物理更新时如何保留一次性按键？','物理追帧超过预算时应如何取舍？']),
      question('game-q2','多人战斗中客户端显示命中，服务端却没扣血，怎么设计同步？','design',['game-gameplay','game-network'],['明确伤害、生命和计分由服务端权威维护，客户端发送带序号的输入或动作请求，不能直接提交最终伤害或分数。','结合快照和时间戳定位延迟、丢包、权限与碰撞差异；视觉表现可用快照插值，预测必须配套校正与未确认输入重放，补偿要限制回溯窗口。','对重复、乱序和断线建立事件去重及最新快照恢复；用固定故障种子对齐双方日志，验证每次权威伤害只结算一次，而非强求所有端每帧完全相同。'],['明确权威边界与请求校验','解释插值、预测校正及延迟补偿的约束','覆盖去重、弱网、重连与日志验证'],['把每个位置都改为可靠消息会有什么代价？','如何避免旧快照覆盖重连后的新状态？'])
    ],resources:[resource('game-guide-1','先完成可玩的输入、碰撞、敌人与重开原型'),resource('game-guide-2','验证固定物理更新、碰撞层与高速移动边界'),resource('game-guide-3','用已有网络框架练习权限、同步与重连'),resource('game-guide-4','比较场景、组件和资源的工程组织方式'),resource('game-guide-5','实现生命周期回调、事件退订和对象复用'),resource('unity-fixed-update','用固定步实验验证渲染帧率与物理更新的关系'),resource('unreal-networking','对照权威模型、网络模式与状态复制设计双人同步')]
  }
];

const competency = (skillId,weight,campusLevel,socialLevel) => ({skillId,weight,campusLevel,socialLevel});
const jd = (keyword,meaning,evidence,skillIds) => ({keyword,meaning,evidence,skillIds});
const artifact = (type,title,campus,social,standard) => ({type,title,campus,social,standard});
const role = (id,title,directionId,pathIds,summary,workScenes,competencies,jdKeywords,deliverables,resumeBullets,interviewPrep,campusFocus,socialFocus) => ({id,title,directionId,pathIds,summary,workScenes,competencies,jdKeywords,deliverables,resumeBullets,interviewPrep,campusFocus,socialFocus});
const engineeringArtifacts = (title,standard) => [artifact('project',title,'required','required',standard),artifact('competition','相关竞赛记录','optional','optional','说明赛制、本人职责和可公开的结果，不用名次替代工程证据。'),artifact('paper','研究论文','optional','optional','非通用工程岗位必要条件；如填写，应能说明问题、方法、本人贡献与复现限制。'),artifact('opensource','可验证开源贡献','recommended','recommended','提供 issue 或 PR、代码差异、测试、审查反馈和合并状态。')];
export const professionalRoles = [
  role('frontend-engineer','前端工程师','frontend',['frontend'],'负责面向用户或运营的 Web 产品，兼顾交互正确性、性能和持续交付。',['复杂表单与数据工作台','跨端响应式体验','接口联调与线上体验排查'],[competency('frontend-web',15,2,3),competency('frontend-js',20,2,3),competency('frontend-state',20,2,3),competency('frontend-network',15,2,3),competency('frontend-quality',20,2,4),competency('frontend-delivery',10,1,3)],[jd('工程化','可重复构建、自动检查和可追溯发布','CI 结果、依赖锁、发布与回滚记录',['frontend-delivery']),jd('复杂交互','对业务状态、异步与异常建立一致模型','状态图、竞态回归与组件边界',['frontend-state','frontend-network']),jd('性能优化','以固定环境数据找到和验证瓶颈','trace、测量方法、前后对照',['frontend-quality'])],engineeringArtifacts('一个完整 Web 业务项目','可运行链接或本地启动、核心旅程、错误状态、性能与测试证据。'),['在合成订单工作台中实现请求取消和状态恢复，以 [次数] 次乱序响应测试验证无旧数据覆盖，并提交 trace。'],['手写异步与集合处理，解释边界和复杂度','按需求、状态、组件、接口、质量、结果讲解项目','准备一次性能定位和一次联调失败复盘'],['语言与浏览器基础能现场解释','独立完成端到端业务流程'],['说明跨团队接口协作与发布责任','用线上或明确标注实验的数据解释体验取舍']),
  role('backend-engineer','后端研发工程师','backend',['backend'],'负责业务规则、数据与服务接口，保障一致性、可靠性和可演进性。',['订单与库存','支付与权限','高峰容量和线上故障'],[competency('backend-language',15,2,3),competency('backend-api',15,2,3),competency('backend-storage',25,2,4),competency('backend-reliability',20,2,4),competency('backend-observability',10,1,3),competency('backend-design',15,1,4)],[jd('高并发','根据负载模型保护有限资源并保持业务不变量','并发测试、容量曲线与失败策略',['backend-reliability','backend-observability']),jd('数据库优化','从查询计划、锁与数据分布解释代价','EXPLAIN、慢样本和索引对照',['backend-storage']),jd('系统设计','在一致性、延迟、复杂度和成本间作可解释取舍','边界、容量假设与演进决策',['backend-design'])],engineeringArtifacts('有事务与故障验证的业务服务','包含契约、迁移、幂等、压测、追踪和运行手册。'),['设计 [业务] 的幂等键与事务边界，在 [并发数]、[数据规模] 实验中验证 [不变量]，给出容量拐点与恢复步骤。'],['手写基础数据结构、并发与 SQL','画出一次请求和事务失败窗口','准备慢查询、缓存与故障排查案例'],['扎实语言、网络、数据库与算法基础','能解释独立项目的事务和边界'],['能承担设计、发布、稳定性和跨团队协作','提供真实责任范围与可核验结果']),
  role('fullstack-engineer','全栈应用工程师','backend',['frontend','backend'],'围绕完整用户旅程贯通界面、接口、数据与交付，明确前后端职责边界。',['内部工具','业务原型到可运营服务','端到端联调与发布'],[competency('frontend-state',15,2,3),competency('frontend-network',15,2,3),competency('backend-api',20,2,3),competency('backend-storage',20,2,3),competency('frontend-quality',10,1,3),competency('backend-design',20,1,4)],[jd('端到端交付','从需求到数据再到部署均有验收证据','用户旅程、接口契约与部署文档',['frontend-state','backend-api']),jd('技术选型','按业务规模和维护成本解释方案','约束、替代方案和决策记录',['backend-design'])],engineeringArtifacts('有真实业务状态的全栈应用','覆盖权限、数据迁移、异常 UX、端到端测试和发布。'),['独立交付 [流程]，将 [需求] 拆成状态与接口契约，使用 [测试] 验证前后端一致，并完成 [部署与回滚]。'],['沿用户动作追踪到事务和界面更新','解释前后端验证、缓存与权限边界','复盘一次范围取舍和联调缺陷'],['至少一个方向有扎实深度','另一方向能完成闭环和基本质量保障'],['能够估算复杂度、交付风险与演进成本','有可验证的需求推进和质量责任']),
  role('algorithm-engineer','算法工程师','algorithm',['algorithm','ml'],'将业务约束转成可评测算法，证明正确性或量化近似质量。',['调度与资源分配','图计算与检索','复杂度和效果优化'],[competency('algorithm-complexity',15,3,3),competency('algorithm-structures',15,3,3),competency('algorithm-search',20,2,3),competency('algorithm-dp',15,2,3),competency('algorithm-proof',15,2,4),competency('algorithm-benchmark',20,1,4)],[jd('算法能力','根据规模建模、选结构并论证正确性','推导、边界、反例与复杂度',['algorithm-search','algorithm-proof']),jd('效果优化','以固定基准比较质量、耗时和内存','基线与最差样本对照',['algorithm-benchmark'])],[artifact('project','可复现实验与算法组件','required','required','输入、目标、约束、基线、复杂度、边界与基准完整。'),artifact('competition','算法竞赛经历','recommended','optional','提供题目、职责、解法与反思；竞赛能力需补工程交付证据。'),artifact('paper','与方向相关的论文','optional','recommended','研究型岗位可提升适用性；需能解释方法、对照、消融和贡献。'),artifact('opensource','算法库或基准贡献','recommended','recommended','有测试、复杂度说明与审查反馈。')],['将 [业务约束] 建模为 [问题]，与 [基线] 在固定 [规模] 数据上比较 [质量/耗时]，公开最差样本与适用限制。'],['限时编码后解释证明、复杂度和反例','讲清精确方案与启发式边界','准备算法与业务目标不一致的案例'],['数据结构、算法和数学推导扎实','能写可验证实现而非只记题型'],['对业务目标、效果迭代和工程约束负责','用实验说明规模变化与质量退化']),
  role('recommendation-engineer','推荐与搜索算法工程师','ai',['recsys','ml','algorithm'],'连接行为数据、候选召回、排序与实验，评估质量、延迟和反馈偏差。',['多路召回与排序','冷启动与特征链路','离线评测和在线实验'],[competency('ai-data',20,2,3),competency('ai-model',20,2,4),competency('ai-evaluation',25,2,4),competency('ai-serving',10,1,3),competency('data-statistics',15,2,3),competency('algorithm-benchmark',10,1,3)],[jd('召回排序','区分候选覆盖、排名质量与服务预算','Recall@K、NDCG、候选范围和延迟',['ai-evaluation','algorithm-benchmark']),jd('特征工程','保证事件时间可用性并处理反馈偏差','特征口径、时间切分、消融',['ai-data']),jd('实验闭环','用分桶、护栏与统计检查验证变更','实验方案、区间、样本比例检查',['data-statistics'])],[artifact('project','可复现推荐或检索链路','required','required','时间划分、固定候选、冷启动、基线和分组质量完整。'),artifact('competition','推荐或数据竞赛','recommended','optional','讲清验证方案与潜在泄漏，不能把榜单结果当线上收益。'),artifact('paper','相关论文复现或研究','recommended','recommended','给出复现差异、消融和贡献。'),artifact('opensource','模型、数据管道或评测贡献','optional','recommended','有可运行代码、许可与审查记录。')],['在 [授权数据集] 以时间切分比较 [基线] 与 [方案]，报告 [NDCG/Recall]、冷启动分组和 P95 延迟，分析反馈偏差。'],['推导常用损失与评价指标','检查曝光、负样本和未来信息泄漏','准备离线提升未能带来线上收益的分析'],['掌握模型、概率统计与编码','有可信评测而非只报告榜单分数'],['理解数据、特征、模型和实验全链路','能解释业务护栏与迭代决策']),
  role('data-analyst','数据分析师','data',['data'],'用可靠口径、统计与表达帮助业务判断问题和行动优先级。',['指标体系与漏斗','异动归因与专题分析','实验设计与业务沟通'],[competency('data-sql',25,2,3),competency('data-metrics',30,2,4),competency('data-statistics',25,2,4),competency('data-quality',15,1,3),competency('data-modeling',5,1,2)],[jd('业务分析','把业务问题拆成可计算指标与可采取动作','口径、分群、证据与限制',['data-metrics']),jd('A/B 测试','明确随机化、样本量、指标与停止规则','实验设计、区间与护栏',['data-statistics']),jd('SQL 熟练','能控制连接粒度并验证查询结果','窗口函数、手算用例与重复检查',['data-sql'])],engineeringArtifacts('有口径与行动建议的分析报告','提供可运行 SQL、数据字典、原始结果、区间与结论限制。'),['针对 [转化变化] 核对 [口径]，按 [维度] 分解并输出 [证据]；提出 [行动] 与 [验证方案]，不将相关性表述为因果。'],['现场写 SQL 并检查连接膨胀','讲解一次从问题到行动的分析','解释统计显著与业务价值的区别'],['SQL、基础统计和清晰表达','能够验证数据而非只制作图表'],['推动指标治理、实验和业务决策','说明建议被采纳的范围及验证结果']),
  role('data-engineer','数据研发工程师','data',['dataeng','data'],'构建可靠数据模型、批流链路和质量规则，控制延迟与计算成本。',['数仓分层与指标加工','增量与实时处理','回填、对账与质量告警'],[competency('data-sql',20,2,3),competency('data-modeling',25,2,4),competency('data-pipeline',30,2,4),competency('data-quality',15,2,3),competency('systems-distributed',10,1,3)],[jd('数仓建模','明确粒度、主键、维度变化和血缘','模型图、指标口径和变更方案',['data-modeling']),jd('流处理','定义事件时间、状态、检查点和迟到语义','乱序回放、重启与对账',['data-pipeline']),jd('稳定性','发现数据缺失和延迟并可重跑恢复','新鲜度告警、回填与恢复记录',['data-quality'])],engineeringArtifacts('可重跑的数据加工链路','包含模型、增量策略、血缘、迟到处理、对账和资源报告。'),['设计 [事实/维度] 与 [增量作业]，在 [规模] 合成数据上验证重跑幂等、迟到回填和 [质量规则]，记录资源成本。'],['写 SQL 并分析倾斜与执行计划','解释 exactly-once 的系统边界','准备数据回填和口径变更复盘'],['SQL、数据库、建模与编程基础','小规模链路可独立复现'],['承担 SLA、回填、成本和数据治理','能处理上游变化与多团队口径协作']),
  role('sre-engineer','SRE 可靠性工程师','systems',['ops','cloud'],'通过 SLO、自动化与故障分析提升服务可用性和恢复效率。',['发布护航与容量','监控告警与故障响应','运行手册与自动化治理'],[competency('systems-linux',20,2,3),competency('systems-network',15,2,3),competency('systems-container',15,2,3),competency('systems-distributed',10,1,3),competency('systems-observability',25,2,4),competency('systems-delivery',15,1,4)],[jd('稳定性建设','从用户影响建立 SLI、SLO 与行动','SLO、错误预算与告警运行手册',['systems-observability']),jd('故障处理','按时间线提出假设、定位、止损和复盘','命令证据、恢复计时与后续动作',['systems-linux','systems-network']),jd('自动化','用可审核流程降低重复操作错误','脚本、幂等、权限与回滚',['systems-delivery'])],engineeringArtifacts('带 SLO 的故障演练平台','环境、负载、告警、定位、恢复和单机限制都要注明。'),['为 [服务] 定义 [SLI]，在 [实验环境] 注入 [故障]，按日志与指标定位并在 [实测时间] 恢复，沉淀 [运行手册]。'],['用 Linux 与网络工具解释故障证据','设计不会放大故障的探针与告警','复盘一次止损取舍和恢复流程'],['基础机制与清晰排障步骤','能用代码完成自动化'],['有明确值班、容量和发布责任','推动跨团队复盘与系统性修复']),
  role('cloud-engineer','云原生平台工程师','systems',['cloud','ops'],'为研发提供可重复、安全且可观察的容器与交付平台。',['Kubernetes 平台','多环境交付','资源配额与平台 API'],[competency('systems-linux',10,2,3),competency('systems-network',15,2,3),competency('systems-container',30,2,4),competency('systems-distributed',15,1,3),competency('systems-delivery',20,2,4),competency('security-auth',10,1,3)],[jd('Kubernetes','理解声明式控制、资源调度和故障语义','部署、探针、事件与控制流程解释',['systems-container']),jd('平台工程','将常见研发任务做成有边界的自助能力','API 契约、权限、审计和操作反馈',['systems-delivery','security-auth'])],engineeringArtifacts('可自助部署与回滚的平台原型','提供多环境配置、资源限制、权限与审计，标注本地实验限制。'),['实现 [部署流程] 的声明式配置与权限审计，在 [本地环境] 验证 [失败场景] 和回滚，记录资源配额与操作时序。'],['解释控制器、调度、网络与存储的职责','定位 Pending、CrashLoop 和流量不可达','准备平台易用性与隔离的取舍'],['Linux、网络、容器和代码基础','理解声明式控制而非只会命令'],['能设计平台接口和多租户隔离','说明升级、配额、成本与迁移责任']),
  role('database-engineer','数据库与存储工程师','systems',['distributed','backend'],'围绕事务、索引、恢复和复制构建可靠数据系统，说明一致性和性能边界。',['查询与索引','事务与锁','复制、备份及恢复'],[competency('backend-storage',30,3,4),competency('systems-distributed',25,2,4),competency('systems-linux',15,2,3),competency('algorithm-structures',15,2,3),competency('backend-observability',15,1,3)],[jd('事务机制','解释隔离、并发控制、日志和恢复语义','并发异常、锁等待与崩溃恢复实验',['backend-storage']),jd('分布式存储','面对节点与网络故障定义一致性和持久性','故障前提、恢复时间与数据验证',['systems-distributed']),jd('性能分析','把访问模式、缓存、IO 和查询代价关联','查询计划、系统指标与固定基准',['backend-observability'])],engineeringArtifacts('数据库机制实验或存储组件','包含事务异常复现、查询计划、日志或恢复验证及基准。'),['使用 [固定负载] 对比 [索引/事务方案]，解释锁与 IO 证据，并在 [故障模型] 下验证数据恢复和一致性边界。'],['解释 B+ 树、LSM 与访问模式取舍','分析隔离异常和 WAL 恢复','说明复制延迟与故障边界'],['结构、系统与数据库机制扎实','能以小实验验证原理'],['有性能、迁移、恢复或内核改进证据','谨慎定义一致性与持久性承诺']),
  role('ai-application-engineer','AI 应用工程师','ai',['agent','nlp','mlops'],'构建带评测、权限、状态与预算的模型应用，负责端到端结果。',['RAG 与企业知识库','工具调用与工作流','质量回归与成本监控'],[competency('ai-python',10,2,3),competency('ai-data',15,2,3),competency('ai-evaluation',25,2,4),competency('ai-rag',25,2,4),competency('ai-serving',15,2,3),competency('backend-api',10,1,3)],[jd('RAG','把证据检索、上下文与生成分别评估','冻结问题集、Recall@K、引用支持与拒答',['ai-rag','ai-evaluation']),jd('Agent','定义工具契约、状态、权限和停止条件','重试、幂等、失败恢复与审计',['ai-serving','backend-api']),jd('模型应用落地','共同满足质量、延迟、成本与权限','评测、预算表、故障与越权回归',['ai-evaluation','ai-serving'])],engineeringArtifacts('有独立评测的知识助手或工具工作流','提供数据权限、评测基线、错误分析、调用记录和失败恢复。'),['构建 [场景] 助手，以冻结 [问题数] 条测试比较 [基线]，报告引用支持、拒答、P95 与调用成本，验证 [权限边界]。'],['拆解检索错误与生成错误','编码带超时和幂等的工具执行器','解释评测集维护、数据权限与预算'],['编码、HTTP、数据与基本评测扎实','能够交付可失败、可恢复的应用'],['能承担质量回归、权限与成本责任','用真实使用反馈推动可验证迭代']),
  role('ml-engineer','机器学习工程师','ai',['ml','dl','mlops'],'负责从数据和训练到部署与监控的可复现模型链路。',['特征与训练流水线','模型评估与部署','分布漂移与质量回归'],[competency('ai-python',15,2,3),competency('ai-data',25,2,4),competency('ai-model',25,2,4),competency('ai-evaluation',20,2,4),competency('ai-serving',15,1,3)],[jd('机器学习基础','理解损失、优化、泛化与指标适用条件','推导、基线、学习曲线与反例',['ai-model']),jd('MLOps','将数据、模型、特征和部署作为可追溯整体','版本、自动验证、灰度与回滚',['ai-data','ai-serving']),jd('效果迭代','用独立评测和错误分析支撑变更','分组结果、置信范围和消融',['ai-evaluation'])],[artifact('project','可复现训练与服务链路','required','required','固定划分、预处理、种子、模型卡、误差分析与回滚齐全。'),artifact('competition','机器学习竞赛','recommended','optional','说明验证、泄漏防范、个人贡献和线上适用限制。'),artifact('paper','相关研究或论文复现','recommended','recommended','研究型岗位适用性更高；需解释数据、对照、消融与复现偏差。'),artifact('opensource','训练、评测或推理贡献','recommended','recommended','可追踪提交、测试、基准与审查记录。')],['在 [数据来源与切分] 上建立 [基线]，通过 [消融] 分析改进，交付训练与服务版本并报告分组质量和推理预算。'],['推导基础模型损失和梯度','辨识训练验证泄漏与分布变化','解释模型部署、监控和回滚'],['数学、算法、编码与实验基本功','能复现并诚实报告失败实验'],['能维护数据到服务全链路','对效果、资源成本与生产变化负责']),
  role('security-engineer','应用安全工程师','security',['security'],'将威胁识别、漏洞验证、根因修复和检测响应嵌入研发流程。',['设计与代码安全评审','授权测试与修复验证','依赖治理与事件响应'],[competency('security-http',15,2,3),competency('security-threat',20,2,4),competency('security-auth',20,2,3),competency('security-code',20,2,4),competency('security-detection',15,1,3),competency('security-response',10,1,3)],[jd('安全评审','按资产与信任边界识别可验证风险','威胁模型、影响和控制映射',['security-threat']),jd('漏洞挖掘','在授权范围复现根因并验证修复','最小复现、修复提交与回归',['security-code','security-auth']),jd('安全运营协作','将检测信号转成可处置事件','审计字段、规则、时间线和轮换验证',['security-detection','security-response'])],engineeringArtifacts('授权本地安全评审与修复项目','明确范围、脱敏复现、风险评估、修复和自动化回归。'),['在授权 [本地环境] 对 [对象权限] 建模，复现并修复 [风险]，以 [权限组合数] 条负向测试验证隔离，并完成 [应急演练]。'],['解释注入、鉴权和会话的根因','阅读代码并给出可回归修复','按风险排序漏洞并设计止损流程'],['协议、代码与安全边界清楚','有合法范围内可复现实践'],['推动修复、误报治理和跨团队落地','说明风险责任、时限与事件复盘']),
  role('test-development-engineer','测试开发工程师','testing',['testing'],'用代码和风险模型建立分层验证、质量门禁和可定位的反馈。',['接口与端到端自动化','性能与稳定性验证','测试平台和质量流程'],[competency('testing-design',20,2,3),competency('testing-api',20,2,3),competency('testing-automation',20,2,4),competency('testing-performance',15,1,3),competency('testing-diagnosis',15,2,4),competency('testing-ci',10,1,3)],[jd('自动化测试','建立稳定夹具、正确断言和可定位报告','独立运行、trace、失败归因',['testing-automation','testing-api']),jd('质量保障','按风险和反馈成本安排覆盖与门禁','风险矩阵、变异检出与 CI',['testing-design','testing-ci']),jd('性能测试','定义负载与成功口径并定位容量拐点','阶梯压测、资源和瓶颈证据',['testing-performance'])],engineeringArtifacts('分层自动化与缺陷检出项目','覆盖接口、数据库、旅程、故障注入和 CI，提供不稳定治理记录。'),['将 [交易规则] 建成决策表与 [用例数] 条回归，通过 [故障注入] 验证门禁检出，并以 trace 定位 [失败根因]。'],['现场编写接口和数据断言','从需求推导边界、状态与风险','解释不稳定治理和性能定位案例'],['编码、测试设计与基础机制扎实','能完成独立自动化与缺陷复现'],['设计可维护测试架构与质量度量','推动缺陷预防、门禁与发布决策']),
  role('game-client-engineer','游戏客户端工程师','game',['game'],
    '负责玩法逻辑、交互表现与引擎资源，兼顾帧时间、内存、联机状态和可发布构建。',
    ['角色、战斗与关卡系统','资源管理与 CPU/GPU 性能诊断','客户端同步、弱网恢复与构建发布'],
    [competency('game-programming',20,2,3),competency('game-loop',20,2,3),competency('game-gameplay',20,2,4),competency('game-assets',15,2,3),competency('game-performance',15,1,4),competency('game-network',10,1,3)],
    [jd('Unity / Unreal 引擎开发','理解主线引擎的组件、更新顺序、资源和调试流程，语言能力能支撑实际玩法实现','固定版本工程、C# / C++ 代码、更新时序与边界测试',['game-programming','game-loop']),jd('玩法系统','让战斗规则、角色状态、配置与表现有清楚的职责边界','状态图、配置、扩展新敌人的差异和唯一结算用例',['game-gameplay']),jd('性能优化','从帧时间和 CPU/GPU 证据区分渲染、脚本、分配与加载瓶颈','独立构建 Profiler、分位帧时间、内存和同负载对照',['game-assets','game-performance']),jd('网络同步','区分客户端表现与权威状态，处理延迟、乱序、重复及重连','协议、弱网回放、服务端校验与状态恢复',['game-network'])],
    engineeringArtifacts('可试玩的玩法与工程作品','可运行构建、短演示、本人代码与职责、素材许可、状态设计、帧时间原始数据和弱网回归齐全；Game Jam 可作为补充证据。'),
    ['使用 [引擎/版本] 实现 [玩法系统]，以 [固定场景与硬件] 比较优化前后 P95 帧时间和内存，提交 [回放/测试] 并说明个人贡献与限制。'],
    ['现场解释向量、坐标变换、对象生命周期和一门主线语言的内存行为','沿输入、模拟、碰撞、动画、渲染与同步追踪一次角色攻击','准备性能瓶颈、场景泄漏和弱网状态不一致的定位复盘'],
    ['掌握编程、数据结构、向量数学与引擎更新机制','能够独立交付可玩原型，并解释实现与测试'],
    ['能承担玩法模块设计、性能预算、跨策划美术协作与版本发布','用可核验数据说明优化、联机边界、资源治理与线上问题处理'])
];

// A role may specialize its engineering evidence while keeping direction pages reusable.
const roleProjects = {
  'recommendation-engineer':{
    id:'role-recommendation-ranking',title:'图书推荐召回排序与实验评估链路',
    scenario:'为图书站构建热门与协同过滤多路召回、轻量排序和冷启动回退，并准备能够验证业务假设的在线实验方案。',
    environment:'4 核 CPU、8GB 内存；本地 Python 与单实例 API；固定种子生成 5000 用户、1000 图书、10 万曝光点击事件；按时间划分训练、验证、冻结测试。线上部分仅在本地流量模拟，不将模拟点击或离线指标写成真实业务收益。',
    tasks:['定义曝光、点击、未曝光和负样本口径，检查特征在事件时间可用且无未来泄漏','实现热门与协同过滤召回、去重过滤及轻量排序，配置新用户与空候选回退','固定同一候选与时间测试集比较 Recall@50、NDCG@10、覆盖率及新老用户分组结果','实现用户稳定分桶和曝光日志；预先写主指标、护栏、样本量假设、停止与回滚规则','在本地持续流量中测量分阶段延迟，并保存模型、特征与策略版本'],
    deliverables:['事件与特征字典、固定时间划分','召回排序 API 与冷启动用例','基线、消融及分组评测原始结果','在线实验设计、稳定分桶测试与延迟报告'],
    acceptance:[
      {metric:'离线评测可信度',target:'训练、验证、测试按时间隔离；所有模型使用同一冻结测试与候选范围，逐组报告 Recall@50、NDCG@10、样本量和失败例',method:'校验事件与特征时间戳，保存逐请求候选、得分、标签和指标脚本；不要求虚构相对提升'},
      {metric:'冷启动与候选约束',target:'20 个新用户、空历史、全量已过滤等边界用例无重复或越权图书，空候选有明确回退',method:'接口测试核对返回集合、过滤条件、策略和索引版本'},
      {metric:'实验机制',target:'1000 个合成用户各请求 10 次分桶保持一致；曝光、点击可按同一实验与用户关联',method:'固定实验盐和分桶版本回放，检查样本比例并输出主指标与护栏的模拟统计'},
      {metric:'服务预算',target:'在 5、10、20 并发下各运行 60 秒，完整报告召回、排序和端到端 P95、错误率及资源占用',method:'固定输入与版本，保留原始计时；用实验方案说明线上效果仍需真实随机实验验证'}
    ],skillIds:['ai-data','ai-model','ai-evaluation','ai-serving','data-statistics','algorithm-benchmark']
  },
  'ml-engineer':{
    id:'role-ml-classification',title:'风险分类模型训练、评估与服务闭环',
    scenario:'从合成风险事件构建分类模型，控制泄漏与类不平衡，交付可追溯预测、阈值策略和版本回滚。',
    environment:'4 核 CPU、8GB 内存；本地 Python、scikit-learn 与单实例 HTTP API；固定种子生成 5 万条带实体和时间的合成事件，训练、验证、测试按实体或时间隔离；无真实个人信息，不把合成数据效果解释为生产风控能力。',
    tasks:['写数据卡和划分规则，保留测试集；只在训练集拟合预处理与特征','以多数类和逻辑回归为基线训练树模型，保存种子、依赖和配置','在验证集选择业务阈值，冻结后报告测试 PR-AUC、精确率、召回率、混淆矩阵与分组表现','将预处理、特征顺序、标签映射和模型作为同一版本提供 API','监控输入分布、缺失、延迟与错误，演练新模型失败后回滚'],
    deliverables:['数据卡、切分清单与泄漏检查','训练代码、依赖锁和模型卡','基线、阈值、消融与错误分析报告','预测 API、契约测试与回滚运行手册'],
    acceptance:[
      {metric:'数据与验证隔离',target:'按所选规则划分后实体交集为 0 或所有训练事件早于验证与测试；预处理无测试拟合',method:'自动检查划分不变量并记录预处理拟合样本 ID，阈值选择不读取测试标签'},
      {metric:'复现与评测',target:'相同环境、配置和种子重复训练 2 次，预测概率最大绝对差不超过 1e-6；完整报告基线与测试分组指标',method:'比较固定测试预测及原始指标，保留不改善和误差样本；记录无法完全确定性的算子'},
      {metric:'离线在线一致',target:'至少 100 条固定样本的批处理与 API 类别一致、概率差不超过 1e-6；空值、未知类别、错误字段均有契约测试',method:'同一模型包运行对照，核对特征顺序、预处理版本和错误响应'},
      {metric:'交付与回滚',target:'预测响应可追踪模型与特征版本；回滚后 20 条固定请求恢复为旧模型输出',method:'部署两个版本，模拟新版本加载失败并按手册切回，保存错误、计时和资源记录'}
    ],skillIds:['ai-python','ai-data','ai-model','ai-evaluation','ai-serving','backend-api']
  },
  'database-engineer':{
    id:'role-database-recovery',title:'订单数据库索引、事务与备份恢复实验',
    scenario:'订单数据增长后，需要解释查询和锁瓶颈，并验证并发写入、备份还原和崩溃恢复的数据语义。',
    environment:'4 核 CPU、8GB 内存；本地固定 PostgreSQL 版本、单实例容器与独立恢复实例；100 万条合成订单；记录共享 CPU、内存、磁盘、缓存冷热与配置。只验证本地实例备份及恢复，不宣称跨机容灾或复制一致性。',
    tasks:['根据查询频率和字段分布建立复合索引候选，保存基线与 EXPLAIN ANALYZE','复现同一行并发更新、不可重复读与死锁，比较明确的事务隔离级别','实现条件更新与事务重试，核对库存和账本不变量','制作一致性逻辑备份，在独立实例恢复并核对数据与约束','对持久卷保留时的进程退出做恢复演练，记录已确认事务、恢复耗时和失败窗口'],
    deliverables:['模式、数据生成器与固定查询集','查询计划、索引和资源基准报告','事务异常复现与并发回归','备份恢复脚本、校验清单与恢复时间线'],
    acceptance:[
      {metric:'查询分析',target:'3 类固定查询各执行冷、热场景至少 5 次，报告索引前后计划、扫描行数、P95 与磁盘占用',method:'固定参数与数据快照，解释未改善或退化原因，避免将缓存差异归因于索引'},
      {metric:'事务正确性',target:'100 并发争抢 20 件库存，最终成功 20、库存 0；死锁或序列化失败有限重试后无重复账本',method:'保存隔离级别、请求键与事务日志，以独立 SQL 校验金额、库存和唯一约束'},
      {metric:'备份可恢复',target:'独立实例恢复后各表行数、稳定排序内容校验和及主外键约束与备份快照一致',method:'固定快照生成逻辑备份，恢复至空实例，执行全量校验和及业务查询冒烟'},
      {metric:'崩溃恢复',target:'保留持久卷的进程强制退出后，已收到提交成功的 100 条标记事务全部存在且无半笔业务记录',method:'固定同步提交配置，记录退出前客户端确认集合，重启后核对；分别报告进程故障模型与未验证的断电风险'}
    ],skillIds:['backend-storage','backend-reliability','backend-observability','systems-linux','systems-distributed','algorithm-structures']
  },
  'fullstack-engineer':{
    id:'role-fullstack-orders',title:'前后端一体的订单审批与库存平台',
    scenario:'运营在浏览器查询和审批订单，服务维护库存与权限，前后端共同处理重试、竞态、身份过期和发布异常。',
    environment:'4 核 CPU、8GB 内存；本地前端、单实例 API、PostgreSQL 与 Redis 的 Docker Compose；1 万条合成订单、3 类角色；固定 Chromium 与 mock 支付。界面弱网使用 Fast 4G 和 4 倍 CPU 降速配置，记录版本与共享资源限制。',
    tasks:['定义订单状态、角色权限、OpenAPI 与数据库迁移，以同一验收用例驱动前后端','实现筛选 URL 恢复、详情、审批确认与无权限/错误/空状态','服务端实现对象授权、原子库存与幂等，前端处理请求取消与乱序','用真实本地 API 跑完整旅程，并独立断言数据库和库存副作用','配置前后端 CI、健康检查与发布回滚，演练过期身份、支付超时与坏版本'],
    deliverables:['交互状态图、权限矩阵、OpenAPI 与 ER 图','前后端代码、迁移和一键启动','浏览器、契约与并发测试及 trace','性能报告、发布回滚和故障复盘'],
    acceptance:[
      {metric:'完整用户旅程',target:'登录、筛选恢复、查看、审批、拒绝越权、失败重试等至少 8 条旅程通过本地真实 API',method:'Playwright 使用独立数据夹具，关联请求 ID 与数据库状态，保存 trace'},
      {metric:'重试与业务一致性',target:'重复提交同一幂等键 20 次只产生一次审批副作用；100 并发争抢 20 件库存后成功 20、库存 0',method:'接口与数据库集成测试核对订单、库存和审计记录，不仅断言 200 状态码'},
      {metric:'前端竞态与可用性',target:'50 次快速切换筛选无旧响应覆盖；375px 与 1440px 无横向溢出；键盘可完成审批',method:'受控乱序响应、响应式截图及焦点/标签断言，身份过期可恢复到登录后上下文'},
      {metric:'端到端交付',target:'干净环境按文档完成迁移和启动；模拟坏版本后回滚恢复 3 次连续核心冒烟',method:'记录提交、镜像、配置和迁移版本，保留回滚前后前端与 API 的兼容测试'}
    ],skillIds:['frontend-state','frontend-network','frontend-quality','frontend-delivery','backend-api','backend-storage','backend-reliability','backend-design']
  }
};
for (const item of professionalRoles) if (roleProjects[item.id]) item.project = roleProjects[item.id];

export const professionalSkills = professionalDirections.flatMap(direction => direction.skills.map(item => ({...item,directionId:direction.id})));
export function getProfessionalDirection(idOrPathId) {
  return professionalDirections.find(direction => direction.id === idOrPathId) || professionalDirections.find(direction => direction.pathIds.includes(idOrPathId));
}
export function getProfessionalRole(id) { return professionalRoles.find(item => item.id === id); }
