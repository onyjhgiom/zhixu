// Direct Bilibili course pages checked against their indexed title and syllabus.
// Reusing a course is intentional where its syllabus covers multiple modules.
export const videoCheckedAt = '2026-10-23';
const course = (bvid, title, scope) => Object.freeze({
  title, scope, url: `https://www.bilibili.com/video/${bvid}/`, checkedAt: videoCheckedAt
});
export const videoCourses = {
  frontend: course('BV1RK4y1X7qd', '黑马程序员 · Web 前端全套课程', 'HTML / CSS / JavaScript 与浏览器基础'),
  javascript: course('BV1Y84y1L7Nn', '黑马程序员 · JavaScript 入门到精通', '语言基础、Web API 与进阶实践'),
  deepLearning: course('BV1zP4y147DS', '李宏毅 · 机器学习与深度学习 2021 课程录像', '基础概念、PyTorch、训练优化与模型实践'),
  machineLearning: course('BV1zA411K7en', '李宏毅 · 2021 机器学习课程与作业讲解', '机器学习基础、模型训练与作业实践'),
  tensors: course('BV1CV411Y7i4', '李沐 · 数据操作与数据预处理', '动手学深度学习 v2：张量与数据处理实现'),
  autograd: course('BV1KA411N7Px', '李沐 · 自动求导', '自动微分原理、计算图与实现'),
  training: course('BV1PX4y1g7KC', '李沐 · 线性回归与基础优化算法', '模型、损失与训练流程的原理及代码实现'),
  vision: course('BV1t44y1r7ct', '李沐 · 经典卷积神经网络 LeNet', '卷积网络、训练与代码实现'),
  transformer: course('BV1Kq4y1H7FL', '李沐 · Transformer', '注意力、Transformer 架构与代码实现'),
  agent: course('BV1yjz5BLEoY', '黑马程序员 · RAG 与 Agent 项目实战', '知识库检索、工具调用与智能应用'),
  robotics: course('BV16B4y1Q7jQ', '古月居 · ROS 2 入门 21 讲', '机器人节点、通信、TF、URDF 与仿真'),
  driving: course('BV1R64y187su', '智能驾驶入门课程', '自动驾驶感知、预测、规划与控制入门'),
  slam: course('BV1Hs411k7gi', '泡泡机器人 · 高翔视觉 SLAM 基础', '视觉定位、建图与 SLAM 基础'),
  robotControl: course('BV19z4y197cf', '机器人学 · 运动学与控制公开课', '机械臂正逆运动学、轨迹规划、动力学与控制'),
  robotLearning: course('BV1utSoBNEmV', '机器人学习 · 模仿学习与强化学习', '机器人学习导论、最优控制与策略学习'),
  drivingSimulation: course('BV1bJ4m1n7DV', 'CARLA · 接入自动驾驶算法', 'CARLA / Autoware 联合仿真与算法接入；非 HIL 专项课程'),
  game: course('BV19m421P7eJ', 'Unity 零基础 ACT 入门案例', '引擎、组件、角色与可玩场景实践'),
  algorithm: course('BV1hJ411S7wU', '清华大学 · 邓俊辉数据结构与算法', '复杂度、线性结构、树、图与算法设计'),
  operatingSystems: course('BV1Xm411f7CM', '南京大学 · 操作系统：设计与实现 2024', '课程首讲及系列入口：程序、进程与系统机制'),
  network: course('BV1WS4y1g742', '计算机网络 · 原理与实验课程', '网络分层、协议与 eNSP 实验'),
  architecture: course('BV1vt421L7oc', '尚硅谷 · 计算机组成原理', '408 组成原理、指令、存储与考点讲解'),
  wangdaoDS: course('BV1b7411N798', '王道计算机考研 · 数据结构', '王道计算机教育发布；数据结构课程，旧版公开讲解'),
  wangdaoCO: course('BV1ps4y1d73V', '王道计算机考研 · 计算机组成原理', '王道计算机教育发布；组成原理课程，公开讲解'),
  wangdaoOS: course('BV1YE411D7nH', '王道计算机考研 · 操作系统', '王道计算机教育发布；操作系统课程，旧版公开讲解'),
  wangdaoCN: course('BV19E411D78Q', '王道计算机考研 · 计算机网络', '王道计算机教育发布；计算机网络课程，旧版公开讲解'),
  git: course('BV1MU4y1Y7h5', '黑马程序员 · Git 项目管理与协作', '版本控制、分支、冲突处理与团队协作'),
  testing: course('BV1LJ41137b5', '黑马程序员 · 接口测试与项目实战', 'HTTP、Postman、Python requests 与接口自动化'),
  cloud: course('BV13Q4y1C7hS', '尚硅谷 · Docker / K8s / DevOps', '容器、编排、流水线与应用上云；注意工具版本差异'),
  product: course('BV14i4y1U7LX', '产品经理基础入门', '用户访谈、需求收集、竞品分析与项目流程'),
  sql: course('BV16M4y1c7Le', '数据分析之 SQL 基础入门', '查询、分组、连接、索引与事务'),
  spark: course('BV11A411L7CK', '尚硅谷 · Spark 数据工程课程', 'Spark 3.0、RDD、SQL 与批流处理'),
  flink: course('BV1eg4y1V7AN', '尚硅谷 · Flink 1.17 实战', '窗口、水位线、状态、检查点与流式 SQL'),
  embedded: course('BV1th411z7sn', '江协科技 · STM32 入门教程 2023', '外设、中断、定时器与嵌入式通信实验'),
  security: course('BV1mx411R7cz', '老男孩 IT 教育 · 网络安全课程', 'Web 安全与隔离实验环境入门；仅用于授权测试'),
  blockchain: course('BV1RFsfe5Ek5', 'Chainlink · Web3 与 Solidity 实战', '智能合约、Hardhat、测试与跨链开发'),
  compiler: course('BV1KYrZB3EKo', '哈尔滨工业大学 · 陈鄞编译原理', '词法、语法、语义分析与编译理论'),
  graphics: course('BV1X7411F744', 'GAMES101 · 现代计算机图形学入门', '闫令琪：变换、光栅化、着色、几何与光线追踪'),
  recsys: course('BV1HZ421U77y', '王树森 · 推荐系统公开课', '工业推荐系统、召回、排序与评估'),
  pretrain: course('BV1dU17YAEJQ', '从零构建 GPT · NanoGPT 训练实践', 'Karpathy 课程译制：GPT-2、数据、梯度累积与 DDP'),
  posttrain: course('BV1ibbkzvENg', 'LoRA 微调原理及从零实现', '参数高效微调、训练与推理实验'),
  nlp: course('BV11H4y1L7yP', '李宏毅 · 自然语言处理课程录像', '语言表示、序列模型与深度学习语言处理'),
  mobile: course('BV1wR4Xz6EqG', '黑马程序员 · Flutter 从入门到实战', 'Dart、组件、状态、路由与多平台适配'),
  serving: course('BV11Z4y1q7vW', 'Triton Inference Server 原理入门', '推理服务产品设计与部署工作流'),
  backend: course('BV14z4y1N7pg', '黑马程序员 · Spring Boot 3 与 Vue 3 实战', '接口、MyBatis、JWT、Redis 与全栈项目'),
  database: course('BV1Kr4y1i7ru', '黑马程序员 · MySQL 入门到进阶', 'SQL、索引、ACID、隔离级别与事务'),
  distributed: course('BV1S142197x7', '黑马程序员 · Spring Cloud 微服务实战', '微服务、消息队列、限流与分布式事务'),
  resume: course('BV1iA41127Jv', '程序员鱼皮 · 工作两年半，再看自己大学的简历', '校招与实习简历案例复盘；经验分享，不代替真实经历'),
  interview: course('BV1Jy4y1U7QD', '黑马程序员 · 项目业务与技术面试讲解', '以 Java 项目为案例练习背景、架构、业务流程与技术表达'),
  examSchool: course('BV1dAXKYSEds', '王道 · 2026 届考研择校与复习规划历史回放', '仅参考择校方法；招生信息以当年公告为准'),
  examPlan: course('BV1HVnezNEDe', '27 计算机考研全年规划分享', '2027 届全年规划经验；按个人基础和考试要求调整'),
  examInterview: course('BV1wm411o7sk', '如何准备复试计算机专业课问答', '数据结构、组成原理、操作系统与网络的口头问答')
};
export const pathVideoCourses = {
  agent: ['agent'], ml: ['machineLearning', 'deepLearning'], dl: ['deepLearning', 'training', 'transformer'],
  pretrain: ['pretrain', 'deepLearning'], posttrain: ['posttrain', 'machineLearning'],
  frontend: ['frontend', 'javascript'], backend: ['backend', 'database'], algorithm: ['algorithm'],
  foundation: ['architecture', 'operatingSystems', 'network'],
  software: ['git', 'testing'], testing: ['testing'], ops: ['cloud', 'operatingSystems'],
  product: ['product'], data: ['sql'], security: ['security'], cloud: ['cloud'],
  dataeng: ['spark', 'flink'], embedded: ['embedded'], cv: ['vision', 'deepLearning', 'graphics'], distributed: ['distributed', 'database'],
  nlp: ['nlp'], recsys: ['recsys'], mobile: ['mobile'], game: ['game'],
  graphics: ['graphics'], mlops: ['serving', 'cloud'], network: ['network'],
  robotics: ['robotics', 'slam', 'robotControl', 'robotLearning'], driving: ['driving', 'drivingSimulation'], compiler: ['compiler'], blockchain: ['blockchain'],
  'exam-ds': ['wangdaoDS'], 'exam-co': ['wangdaoCO'],
  'exam-os': ['wangdaoOS'], 'exam-cn': ['wangdaoCN']
};
export function coursesForPath(id) {
  return (pathVideoCourses[id] || []).map(key => ({ key, ...videoCourses[key] }));
}
export const professionalVideoCourses = {
  frontend: ['frontend', 'javascript'], backend: ['backend', 'database'], algorithm: ['algorithm'],
  data: ['sql', 'spark'], systems: ['cloud', 'operatingSystems'], ai: ['machineLearning', 'agent'],
  security: ['security'], testing: ['testing'], game: ['game', 'graphics'],
  embodied: ['robotics', 'slam', 'robotControl', 'robotLearning'], driving: ['driving', 'drivingSimulation']
};
export const pathStageVideoCourses = {
  agent: ['network', 'agent', 'agent', 'agent', 'testing'],
  ml: ['machineLearning', 'machineLearning', 'machineLearning', 'machineLearning', 'deepLearning'],
  dl: ['autograd', 'training', 'vision', 'transformer', 'deepLearning'],
  pretrain: ['pretrain', 'pretrain', 'pretrain', 'pretrain', 'pretrain'],
  posttrain: ['machineLearning', 'posttrain', 'posttrain', 'machineLearning', 'serving'],
  frontend: ['frontend', 'javascript', 'backend', 'javascript', 'testing'],
  backend: ['backend', 'database', 'backend', 'distributed', 'backend'],
  software: ['git', 'git', 'git', 'testing', 'cloud'], testing: ['testing', 'testing', 'testing', 'testing', 'cloud'],
  ops: ['operatingSystems', 'cloud', 'cloud', 'cloud', 'cloud'],
  algorithm: ['algorithm', 'algorithm', 'algorithm', 'algorithm', 'algorithm'],
  foundation: ['operatingSystems', 'architecture', 'operatingSystems', 'network', 'network'],
  product: ['product', 'product', 'product', 'product', 'product'], data: ['sql', 'sql', 'sql', 'machineLearning', 'sql'],
  security: ['security', 'security', 'security', 'security', 'security'],
  cloud: ['cloud', 'cloud', 'cloud', 'cloud', 'cloud'], dataeng: ['sql', 'spark', 'sql', 'flink', 'flink'],
  embedded: ['embedded', 'embedded', 'embedded', 'embedded', 'embedded'],
  cv: ['graphics', 'vision', 'vision', 'deepLearning', 'serving'],
  distributed: ['database', 'database', 'distributed', 'distributed', 'distributed'],
  nlp: ['nlp', 'nlp', 'agent', 'serving', 'nlp'], recsys: ['recsys', 'recsys', 'recsys', 'recsys', 'recsys'],
  mobile: ['mobile', 'mobile', 'mobile', 'mobile', 'mobile'], game: ['game', 'game', 'game', 'game', 'game'],
  graphics: ['graphics', 'graphics', 'graphics', 'graphics', 'graphics'],
  mlops: ['serving', 'serving', 'serving', 'cloud', 'serving'],
  network: ['network', 'network', 'network', 'network', 'network'],
  robotics: ['robotics', 'slam', 'robotControl', 'robotLearning', 'robotics'],
  driving: ['driving', 'driving', 'driving', 'drivingSimulation', 'drivingSimulation'],
  compiler: ['compiler', 'compiler', 'compiler', 'compiler', 'compiler'],
  blockchain: ['blockchain', 'blockchain', 'blockchain', 'blockchain', 'blockchain'],
  'exam-ds': ['wangdaoDS', 'wangdaoDS', 'wangdaoDS', 'wangdaoDS'],
  'exam-co': ['wangdaoCO', 'wangdaoCO', 'wangdaoCO', 'wangdaoCO'],
  'exam-os': ['wangdaoOS', 'wangdaoOS', 'wangdaoOS', 'wangdaoOS'],
  'exam-cn': ['wangdaoCN', 'wangdaoCN', 'wangdaoCN', 'wangdaoCN']
};
export const professionalStageVideoCourses = {
  frontend: ['frontend', 'backend', 'testing', 'git'], backend: ['backend', 'database', 'distributed', 'backend'],
  algorithm: ['algorithm', 'algorithm', 'algorithm', 'algorithm'], data: ['sql', 'spark', 'machineLearning', 'flink'],
  systems: ['operatingSystems', 'cloud', 'cloud', 'cloud'], ai: ['machineLearning', 'deepLearning', 'agent', 'serving'],
  security: ['security', 'security', 'security', 'security'], testing: ['testing', 'testing', 'testing', 'cloud'],
  game: ['game', 'game', 'graphics', 'network'], embodied: ['robotics', 'slam', 'robotControl', 'robotics'],
  driving: ['driving', 'driving', 'drivingSimulation', 'drivingSimulation']
};
export const skillVideoOverrides = {
  'frontend-js': 'javascript', 'frontend-state': 'backend', 'frontend-network': 'network', 'frontend-quality': 'testing', 'frontend-delivery': 'git',
  'backend-storage': 'database', 'backend-reliability': 'distributed',
  'backend-observability': 'distributed', 'backend-design': 'distributed',
  'data-modeling': 'spark', 'data-pipeline': 'flink', 'data-statistics': 'machineLearning', 'data-quality': 'flink',
  'systems-linux': 'operatingSystems', 'systems-network': 'network',
  'ai-python': 'tensors', 'ai-model': 'training', 'ai-serving': 'serving', 'ai-rag': 'agent', 'game-performance': 'graphics', 'game-network': 'network',
  'embodied-geometry': 'robotControl', 'embodied-perception': 'deepLearning', 'embodied-navigation': 'slam',
  'embodied-control': 'robotControl', 'embodied-policy': 'robotLearning', 'embodied-deployment': 'serving',
  'driving-runtime': 'embedded', 'driving-geometry': 'slam', 'driving-perception': 'deepLearning',
  'driving-testing': 'drivingSimulation', 'driving-data': 'drivingSimulation', 'driving-deployment': 'serving'
};
export const moduleVideoCourses = {
  projects: ['git'], practice: ['algorithm'], experience: ['resume', 'interview'], strategy: ['interview'],
  resume: ['resume'], assessment: ['algorithm'], plan: ['git'],
  'support-school': ['examSchool'], 'support-planning': ['examPlan'],
  'support-questions': ['wangdaoDS', 'wangdaoCO', 'wangdaoOS', 'wangdaoCN'],
  'support-interview': ['examInterview']
};
export const roleVideoCourses = {
  'recommendation-engineer': ['recsys'], 'ai-application-engineer': ['agent'],
  'ml-engineer': ['machineLearning', 'deepLearning'], 'data-engineer': ['spark', 'flink'],
  'database-engineer': ['database', 'distributed'], 'fullstack-engineer': ['backend', 'frontend'],
  'robot-software-engineer': ['robotics'], 'robot-perception-engineer': ['deepLearning', 'slam'],
  'robot-slam-engineer': ['slam'], 'robot-control-engineer': ['robotControl'],
  'robot-manipulation-engineer': ['robotControl', 'robotLearning'], 'embodied-policy-engineer': ['robotLearning'],
  'robot-simulation-engineer': ['robotics'], 'robot-platform-engineer': ['serving', 'robotics'],
  'driving-perception-engineer': ['driving', 'deepLearning'], 'driving-localization-engineer': ['slam', 'driving'],
  'driving-planning-engineer': ['driving'], 'vehicle-software-engineer': ['embedded', 'driving'],
  'vehicle-algorithm-test-engineer': ['drivingSimulation'], 'driving-simulation-engineer': ['drivingSimulation'],
  'driving-data-engineer': ['drivingSimulation', 'spark'], 'driving-deployment-engineer': ['serving', 'driving']
};
