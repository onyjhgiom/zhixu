// Keep the robotics path ID so existing learning and interview records remain valid.
const embodiedStages = [
  ['机器人计算与 ROS 2', '掌握 C++ / Python、Linux、ROS 2 节点、消息、QoS、坐标与时间同步，完成可回放的传感器链路。'],
  ['感知、定位与空间表示', '对齐相机、激光与 IMU，建立检测、点云处理、SLAM 与地图基线，按场景记录误差和失败样本。'],
  ['运动、导航与操作', '在仿真中实现移动导航、机械臂运动学、碰撞检查和轨迹控制，验证延迟、扰动与约束。'],
  ['具身学习与工程验证', '连接模仿学习、强化学习、VLA、数据采集、仿真评测和端侧推理，固定数据划分与回归条件。'],
  ['交付机器人闭环系统', '交付移动导航与抓取仿真任务，包含节点契约、感知误差、任务成功率、异常停止、模型版本与回放报告。']
];
const drivingStages = [
  ['车载计算与数据基础', '梳理 C++ / Python、Linux、车载以太网、CAN、时间戳和传感器标定，建立离线数据回放与信号字典。'],
  ['感知、融合与定位', '处理相机、点云、毫米波雷达和 IMU，比较检测跟踪、BEV / 占据、融合定位和地图误差。'],
  ['预测、规划与控制', '区分行为预测、决策、轨迹规划与控制，构造跟车、变道、路口和泊车的闭环仿真场景。'],
  ['车载软件与算法验证', '覆盖车载中间件、端侧推理、诊断、SIL / HIL、场景回归、算法测试与数据闭环。'],
  ['交付智能驾驶仿真验证', '交付固定场景集的驾驶仿真回放与测试平台，包含分桶指标、版本追踪、轨迹约束、异常注入与失败复现。']
];
function learningPath(id, title, en, tags, stages, theory, labs, pitfalls) {
  return { id, title, en, category: 'ai', icon: id === 'robotics' ? 'cpu' : 'compass', tone: id === 'robotics' ? 'green' : 'blue', level: '基础 → 高阶', desc: stages.slice(0, 4).map(item => item[0]).join('、') + '，连接计算机岗位所需的算法、系统与验证能力。', tags, stages,
    curriculum: { focus: theory[0][1], theory: theory.map(([title, text]) => ({ title, text })), practice: labs.map((lab, index) => ({ title: stages[index][0], steps: lab.slice(0, 3), output: lab[3] })), project: stages[4][1], pitfalls } };
}
export const mobilityPaths = [
  learningPath('robotics', '具身智能', 'EMBODIED INTELLIGENCE', ['ROS 2', '感知定位', '运动控制', '灵巧操作', 'VLA', '机器人软件'], embodiedStages, [
    ['时空与机器人软件', '机器人计算系统必须明确传感器坐标、消息时间、控制周期和执行器反馈。节点连通不等于物理语义一致；需要利用 rosbag、TF 和 QoS 证据定位时延、丢包、坐标错误与生命周期异常，再验证恢复路径。'],
    ['感知与状态估计', '检测、分割、点云配准与 SLAM 为机器人提供环境和自身状态。指标必须匹配运动与操作任务；建立标定、噪声、遮挡和动态环境的误差分组，区分估计漂移、误检与下游决策不稳定，避免只报告单个平均精度。'],
    ['导航、操作与全身控制', '移动机器人、机械臂与人形机器人共享运动学、动力学和约束优化基础，但自由度、接触和执行器约束不同。学习路径规划、逆运动学、抓取、轨迹跟踪与全身控制时，应固定机器人模型与仿真条件，检查关节限位、碰撞和接触稳定性。'],
    ['具身策略与部署闭环', '模仿学习、强化学习和视觉语言动作模型需要明确观测、动作、奖励及任务成功定义。训练与验证按物体、场景或任务划分，比较基线、多随机种子和推理预算；记录 sim-to-real 差异、数据来源、模型版本与策略失效条件。']
  ], [
    ['固定 ROS 2 发行版，启动相机与里程计模拟节点并保存全部配置。', '改变时间偏移、QoS 与坐标变换，分别复现消息和语义错误。', '用回放记录验证节点重启和数据恢复，输出时序与坐标检查。', '节点、启动脚本与可重复的时空一致性报告'],
    ['选定授权数据或仿真序列，固定相机内参、点云外参与基线版本。', '运行检测与定位，按遮挡、运动速度和场景分别汇总误差。', '加入噪声和丢帧样本，对照轨迹漂移与异常定位日志。', '感知定位基线、误差分桶和失败样本清单'],
    ['在固定仿真地图和机械臂模型中定义导航及抓取目标与约束。', '实现规划、碰撞检查与轨迹跟踪，记录接触和关节状态。', '改变障碍、目标位置与执行延迟，复现失败并验证受控停止。', '导航抓取演示、轨迹记录与约束验证报告'],
    ['整理演示数据，按任务或物体划分训练与独立验证集合。', '对比规则基线与一个具身策略，固定种子和推理硬件预算。', '记录任务成功率、延迟与失败类型，将模型版本关联到回放。', '策略评测、端侧部署配置和版本化回归集']
  ], '不要把机器人、车辆的运动模型混用，也不要将仿真成功率当作真实部署能力；必须交代标定、同步、场景划分、接触模型、执行器限制与本人贡献。'),
  learningPath('driving', '智能驾驶', 'INTELLIGENT DRIVING', ['感知融合', '预测规划', '车载软件', '算法测试', 'SIL / HIL', '数据闭环'], drivingStages, [
    ['车载链路与运行时', '智能驾驶软件跨越传感器、通信、计算、决策与执行。CAN 信号、车载以太网、坐标与采样时间应具备明确契约；处理离线回放、诊断、资源预算和跨进程通信时，需要区分信号失效、时间过期与算法输出异常。'],
    ['感知、融合与地图定位', '多模态感知不仅比较检测准确率，还涉及跟踪稳定性、BEV 空间表示、占据预测、融合置信度和定位误差。按天气、光照、目标类别、距离与遮挡分组评测，并验证外参、时间偏移、传感器缺失及地图变化对下游轨迹的影响。'],
    ['预测规划控制的任务边界', '预测输出其他交通参与者的行为分布，规划在规则、碰撞、舒适度和可行性约束中选择轨迹，控制负责执行跟踪。开环轨迹误差下降不必然带来闭环收益；应固定跟车、路口、变道与泊车场景，并单独核对约束和失败原因。'],
    ['算法测试与数据闭环', '车载测试涵盖单元、接口、软件在环、硬件在环与场景回归，测试工程师需要把算法指标、通信时序和车辆行为关联起来。建立场景覆盖、故障注入、版本追踪、数据标注质量、训练评测切分和回流去重，实验结果必须标明仿真或台架环境。']
  ], [
    ['建立仿真车辆的信号字典、传感器配置、时间基准与记录格式。', '回放 CAN 或合成车速、转角信号，核对单位、范围和更新频率。', '注入缺帧和时延，检查诊断输出、过期信号与模块恢复路径。', '信号契约、离线回放工具与时序异常记录'],
    ['固定公开数据的授权范围，明确坐标、标注协议和数据划分。', '建立检测跟踪或融合定位基线，按距离与场景生成指标表。', '改变时间偏移和传感器可用性，记录结果退化与失败样本。', '感知融合基线、定位误差表与数据配置'],
    ['固定 CARLA 等仿真版本、车辆模型、地图与任务成功定义。', '实现或接入规划控制基线，完成跟车、变道和泊车任务回放。', '统计碰撞、越线、轨迹误差与舒适度，分析开环和闭环差异。', '闭环场景、轨迹对照和失败复现材料'],
    ['把场景、模块版本、模型权重和数据版本绑定到同一运行记录。', '构建 SIL 回归与 HIL 接口设计，注入丢帧、超时和异常目标。', '核对告警、退出与恢复行为，输出场景覆盖和回归差异报告。', '算法测试脚本、台架接口说明与版本化回归报告']
  ], '不要把目标检测准确率或仿真无碰撞当成整车能力；不要把 SIL 当作已经完成 HIL。需要标明车辆模型、场景覆盖、时间同步、数据授权和验证边界。')
];

function resource(id, title, source, url, paths, use, lang = '中文') { return { id, title, source, url, paths, use, lang, level: '进阶', type: '官方文档 / 开源教程', desc: use }; }
export const mobilityResources = [
  resource('ros2-official', 'ROS 2 官方教程', 'ROS', 'https://docs.ros.org/en/jazzy/Tutorials.html', ['robotics'], '练习节点、执行器与 QoS，对照版本保存时序和异常恢复证据。', '英文'),
  resource('lerobot-official', 'LeRobot · 官方策略训练与数据工具', 'Hugging Face', 'https://github.com/huggingface/lerobot', ['robotics'], '梳理演示数据、动作空间与策略评测，记录数据和模型版本。', '英文'),
  resource('apollo-cn', 'Apollo 自动驾驶中文文档', '百度 Apollo', 'https://apollo.baidu.com/docs/apollo/latest/index.html', ['driving'], '按感知、预测、规划、控制与 Cyber 模块建立调用关系和回放基线。'),
  resource('apollo-code-cn', 'Apollo 中文开发与实践入口', '百度 Apollo', 'https://apollo.baidu.com/community', ['driving'], '按中文开发实践阅读模块示例，固定环境并保留数据回放、启动与日志记录。'),
  resource('paddle3d-cn', 'Paddle3D · 三维感知', 'PaddlePaddle', 'https://github.com/PaddlePaddle/Paddle3D', ['driving', 'robotics'], '从中文说明建立点云或三维检测基线，记录数据划分与距离分桶指标。'),
  resource('unilidar-cn', 'UniLidar SDK 中文说明', 'Unitree Robotics', 'https://github.com/unitreerobotics/unilidar_sdk', ['robotics'], '阅读激光数据、坐标和时间接口，在离线样例中验证帧与点云语义。'),
  resource('driving-slam-cn', '视觉 SLAM · 智能驾驶定位基础', '高翔与协作者', 'https://github.com/gaoxiang12/slambook2', ['driving'], '复现几何与位姿估计，解释坐标、误差和退化场景对定位的影响。'),
  resource('driving-rl-cn', 'Easy RL · 驾驶策略评测基础', 'Datawhale', 'https://github.com/datawhalechina/easy-rl', ['driving'], '明确观测、动作与奖励，在仿真控制任务中报告多种子结果与约束。'),
  resource('autoware-docs', 'Autoware 官方仿真与架构文档', 'Autoware Foundation', 'https://autowarefoundation.github.io/autoware-documentation/main/', ['driving'], '梳理感知到控制的接口，复现规划仿真并记录场景、版本与失败。', '英文'),
  resource('carla-docs', 'CARLA 官方仿真教程', 'CARLA', 'https://carla.readthedocs.io/en/latest/', ['driving'], '固定地图、车辆和随机种子，输出闭环场景与测试指标。', '英文')
];

const prepQuestion = (role, suffix, type, title, answer, pitfall) => ({ id: role + '-' + suffix, role, type, title, answer, pitfall, origin: '站内原创练习' });
export const mobilityPrep = [
  { id: 'robotics', skills: ['机器人软件与 ROS 2', '感知定位与运动控制', '操作学习、VLA 与仿真验证'], project: embodiedStages[4][1], written: '准备坐标变换、运动学、状态估计、C++ 并发与实时数据处理。', interview: '区分机器人软件、感知、SLAM、导航控制、操作策略、仿真和端侧部署岗位，展示闭环与失败回放证据。', questions: [
    prepQuestion('robotics', 'written-1', 'written', '机器人坐标和时间不同步会产生什么问题？', ['定义相机、激光、机体和地图坐标及时间基准。', '分析外参误差、延迟与运动对融合、定位和抓取的影响。', '构造固定时间偏移和坐标错误，通过回放比较误差与恢复结果。'], '只检查节点是否连通，不检查物理语义。'),
    prepQuestion('robotics', 'written-2', 'written', '机械臂逆运动学有解，为何抓取仍会失败？', ['区分几何解、关节限位、碰撞约束与轨迹可执行性。', '检查标定、目标位姿、接触、夹持力和时延。', '固定模型与物体，按失败类型统计并复现轨迹，不将单次成功当作稳定策略。'], '只计算末端位置，不验证约束和执行误差。'),
    prepQuestion('robotics', 'technical-3', 'technical', '如何评估具身策略是否学会任务，而非记住场景？', ['按物体、场景或任务划分数据，避免相邻轨迹泄漏。', '比较规则基线、模仿策略与多种子结果，记录成功定义和推理时延。', '加入遮挡、位置扰动和传感器失效，分析分布外表现及受控停止。'], '只报告训练损失或单段演示视频。'),
    prepQuestion('robotics', 'project-4', 'project', '如何交付可复现的导航与抓取闭环项目？', ['记录 ROS、机器人模型、仿真世界、策略和数据版本。', '贯通观测、定位、规划、控制与反馈，区分本人实现与已有组件。', '提供任务成功率、延迟、碰撞检查、故障回放及环境边界。'], '只有运行视频，没有配置、指标和失败证据。')
  ] },
  { id: 'driving', skills: ['感知融合与定位', '预测规划与控制', '车载软件、算法测试与数据闭环'], project: drivingStages[4][1], written: '准备坐标与同步、目标跟踪、轨迹约束、C++、CAN 信号及测试设计。', interview: '按感知、规划、车载、算法测试、仿真和数据平台拆分职责，解释离线指标与闭环行为的差异。', questions: [
    prepQuestion('driving', 'written-1', 'written', '相机与雷达目标位置总有偏差，如何定位原因？', ['先核对外参、坐标、单位、时间戳与采样延迟。', '用静止和运动场景区分几何偏差与时间偏差，记录关联与置信度。', '加入受控偏移并绘制误差分桶，验证修正与缺失传感器时的行为。'], '直接调整检测阈值，跳过同步和标定证据。'),
    prepQuestion('driving', 'written-2', 'written', '为什么规划的开环误差下降，闭环表现可能变差？', ['开环只对给定观测比较轨迹，闭环动作会改变后续状态。', '核对车辆动力学、行为交互、可行性、延迟和分布偏移。', '固定场景集比较碰撞、约束、跟踪与舒适度，并复现失败。'], '把单个轨迹误差当作全部驾驶质量。'),
    prepQuestion('driving', 'technical-3', 'technical', '如何设计车载算法的 SIL / HIL 测试？', ['按算法、接口、时序、诊断和车辆行为定义测试分层与判定条件。', 'SIL 固定软件和场景；HIL 需要真实控制器、I/O、总线与台架证据。', '注入丢帧、超时和异常信号，关联版本、日志、恢复行为和回归差异。'], '在桌面回放上通过就宣称完成硬件在环。'),
    prepQuestion('driving', 'project-4', 'project', '驾驶数据闭环如何避免回流样本污染验证集？', ['按行程、时间和场景划分，记录样本谱系与授权。', '对回流、标注修订和训练抽样去重，冻结独立验证集。', '比较分桶指标和闭环场景，保留版本、复现脚本与失败原因。'], '随机拆相邻帧，使同一路段同时进入训练和验证。')
  ] }
];

const embodiedSkillSpecs = [
  ['systems', '机器人软件、ROS 2 与实时通信', 1, [], '节点契约、TF 树、QoS 与时序回放'],
  ['geometry', '坐标标定、运动学与状态估计', 1, ['systems'], '标定残差、变换单元测试与轨迹误差'],
  ['perception', '视觉、点云与多模态感知', 2, ['geometry'], '场景分桶指标、点云处理与误检样本'],
  ['navigation', 'SLAM、导航与路径规划', 2, ['geometry'], '定位轨迹、规划路径与障碍回归'],
  ['control', '机械臂、足式与全身运动控制', 3, ['geometry', 'navigation'], '关节约束、接触状态和跟踪误差'],
  ['policy', '操作学习、强化学习与 VLA', 3, ['perception', 'control'], '按任务划分的数据、多种子成功率与基线'],
  ['simulation', '机器人仿真、测试与数据工程', 4, ['navigation', 'control'], '场景集、故障注入、回放与数据谱系'],
  ['deployment', '端侧推理、驱动与系统集成', 4, ['systems', 'policy'], '设备资源、推理时延、版本和恢复记录']
];
const drivingSkillSpecs = [
  ['runtime', '车载 C++、通信与运行时', 1, [], 'CAN 信号字典、消息契约与时间预算'],
  ['geometry', '传感器标定、融合定位与地图', 1, ['runtime'], '外参、同步、定位误差与地图版本'],
  ['perception', '多模态感知、跟踪与占据', 2, ['geometry'], '检测跟踪、距离分桶与退化样本'],
  ['prediction', '交通行为预测与交互建模', 2, ['perception'], '预测分布、轨迹误差和长尾案例'],
  ['planning', '决策、轨迹规划与车辆控制', 3, ['prediction', 'geometry'], '可行性、碰撞、舒适度和闭环轨迹'],
  ['testing', '车载算法测试、SIL / HIL 与诊断', 3, ['runtime', 'planning'], '测试分层、台架接口、故障注入与回归'],
  ['data', '驾驶数据闭环与评测平台', 4, ['perception', 'testing'], '行程切分、标注质量、版本谱系和场景覆盖'],
  ['deployment', '车载中间件、推理部署与工具链', 4, ['runtime', 'testing'], '资源分析、模型精度对照、发布与回退']
];
const checks = rows => rows.map(([metric, target, method]) => ({ metric, target, method }));
function professionalDirection(id, pathId, title, specs, stages, project, resources) {
  return { id, title, pathIds: [pathId], description: mobilityPaths.find(item => item.id === pathId).desc,
    stages: stages.map((entry, index) => ({ id: id + '-s' + (index + 1), title: entry[0], weeks: index === 0 ? 2 : 3, prerequisites: [index ? '完成上一阶段并保留可复现配置' : '具备基础编程、Linux 与线性代数'], goals: [entry[1]], tasks: [entry[2], entry[3]], deliverables: [entry[4]], acceptance: [entry[5], entry[6]] })),
    skills: specs.map(([suffix, title, stage, dependencies, evidence], index) => ({ id: id + '-' + suffix, title, priority: index < 5 ? 'P0' : 'P1', targetLevel: 3, dependencies: dependencies.map(item => id + '-' + item), stage: id + '-s' + stage, evidence })),
    project: { ...project, skillIds: specs.map(item => id + '-' + item[0]) },
    questions: mobilityPrep.find(item => item.id === pathId).questions.slice(2).map((item, index) => ({ ...item, id: id + '-q' + index, type: index ? 'design' : 'technical', skillIds: specs.slice(index ? 4 : 2, index ? 8 : 6).map(item => id + '-' + item[0]), scoring: [{ point: '准确区分对象、约束与假设', points: 4 }, { point: '解释方案并给出可验证证据', points: 3 }, { point: '覆盖异常、复现与局限', points: 3 }], followUps: ['如何固定输入和版本复现一次失败？', '哪些结果只能说明仿真环境内的能力？'] })),
    resources: resources.map(([resourceId, reason]) => ({ resourceId, reason })) };
}
export const mobilityDirections = [
  professionalDirection('embodied', 'robotics', '具身智能', embodiedSkillSpecs, [
    ['时空与机器人平台', '建立机器人计算和数学底座', '运行 ROS 2 节点，定义消息、坐标和时间基准', '复现 QoS 失配与坐标错误，并用日志解释恢复', '节点契约、TF 树与回放脚本', '正常与失配案例均可按配置复现', '坐标变换单元测试通过'],
    ['感知定位与导航', '连接环境表示、状态估计和路径', '在固定序列完成点云或视觉感知与定位基线', '在固定地图实现导航，按障碍和时延分析失败', '误差分桶、地图与导航轨迹', '定位与规划输出具有明确坐标和时间', '每类失败保留输入与日志'],
    ['控制操作与具身学习', '建立可执行动作和学习策略', '在机械臂或移动底盘模型上验证约束与跟踪', '比较规则或模仿策略，按任务划分训练验证', '运动学验证、策略基线和成功率表', '关节与碰撞约束全部纳入判定', '报告种子、成功定义及推理预算'],
    ['仿真数据与部署交付', '贯通数据、测试、设备与回放', '注入传感器缺失和延迟，保留告警与恢复证据', '记录模型版本、设备预算与数据谱系，建立回归集', '版本化回归包与端侧部署报告', '固定输入重复运行可对照', '仿真与真实设备证据分开标识']
  ], { id: 'embodied-loop', title: '移动导航与机械臂操作闭环', scenario: '在仿真工作区完成目标定位、导航到位与物体抓取，并复现异常任务。', environment: '本地隔离仿真；固定 ROS 2、机器人模型、地图、物体和随机种子；记录 CPU / GPU 及控制周期。', tasks: ['定义观测、动作、消息与坐标接口', '构建感知定位和导航控制基线', '接入操作策略并比较规则基线', '建立数据版本、回放、异常停止和部署报告'], deliverables: ['代码与版本配置', 'TF 树和节点契约', '任务回放与误差报告', '异常回归和部署手册'], acceptance: checks([['可复现性', '固定 10 个任务各重复 3 次并记录成功与失败', '保存种子、配置与原始日志'], ['时空一致性', '全部消息具备有效坐标与时间基准', '检查 TF 连通、时间偏移与过期输入'], ['异常恢复', '遮挡、丢帧、控制超时三类故障均输出可追踪结果', '故障注入并核对停止、告警和恢复日志']]) }, [['robotics-guide-1', '建立 ROS 2 消息与执行器基础'], ['robotics-guide-2', '学习位姿和几何推导'], ['robotics-guide-4', '实践规划与导航'], ['robotics-guide-5', '学习策略和随机性'], ['ros2-official', '核对发行版与接口行为']]),
  professionalDirection('driving', 'driving', '智能驾驶', drivingSkillSpecs, [
    ['车载数据与计算', '建立传感器、总线与运行时契约', '编写信号字典、时间基准与离线回放', '注入信号延迟和丢失，检查诊断及恢复', '信号字典、回放脚本和时序记录', '明确单位、坐标、频率和异常值', '每个故障可独立复现'],
    ['感知预测与定位', '建立可追踪的上游算法基线', '完成检测跟踪或融合定位并生成距离分桶', '按行程切分数据，分析交互预测和置信度', '基线配置、误差表和预测样本', '独立验证集无相邻帧泄漏', '失效传感器有对应退化证据'],
    ['规划控制与算法测试', '把轨迹与车辆行为纳入验证', '运行跟车、变道、路口和泊车的固定闭环场景', '定义 SIL / HIL 接口和故障注入，覆盖诊断恢复', '轨迹、测试集和台架接口说明', '比较碰撞、约束、跟踪与舒适度', '分别说明软件在环和硬件在环已验证范围'],
    ['数据闭环与部署', '实现版本关联、性能和回归比较', '绑定数据、模型、软件版本与场景运行 ID', '分析端侧精度、延迟和资源占用，编写回退流程', '场景覆盖、部署对照和回归报告', '失败可定位到输入与版本', '固定数据复测并说明性能环境']
  ], { id: 'driving-validation', title: '智能驾驶场景回放与算法验证平台', scenario: '比较驾驶算法版本在固定闭环场景中的行为，关联车载信号、轨迹和数据谱系。', environment: '本地隔离 CARLA 或规划仿真；固定地图、车辆、天气、种子与算法版本；HIL 仅在有实际台架时验证。', tasks: ['定义场景和车辆信号契约', '接入感知规划与控制回放', '构建算法测试、SIL 回归和 HIL 接口', '关联数据模型版本，输出分桶和回归差异'], deliverables: ['场景与回放代码', '算法接口与信号字典', '测试报告与失败样本', '版本谱系与部署回退说明'], acceptance: checks([['场景覆盖', '跟车、变道、路口、泊车各 5 个固定场景', '记录配置和运行 ID，对比碰撞、轨迹及约束'], ['异常验证', '丢帧、时间偏移、错误信号均可复现', '逐项注入并核对诊断及恢复行为'], ['数据追溯', '每次运行关联数据、模型和代码版本', '从报告定位原始输入并按配置重跑']]) }, [['apollo-cn', '理解驾驶模块和接口'], ['apollo-code-cn', '配置模块及回放流程'], ['paddle3d-cn', '建立三维感知基线'], ['driving-slam-cn', '分析定位几何'], ['autoware-docs', '理解闭环仿真与规划接口']])
];

const roleSpecs = [
  ['robot-software-engineer', '机器人软件与 ROS 2 工程师', 'embodied', ['systems', 'geometry', 'simulation', 'deployment'], '机器人节点、通信中间件与设备集成', ['节点生命周期与 QoS', 'TF、日志与回放', '驱动、并发及资源诊断']],
  ['robot-perception-engineer', '机器人感知与三维视觉工程师', 'embodied', ['geometry', 'perception', 'simulation', 'deployment'], '视觉、点云与多模态感知系统', ['标定与点云处理', '检测分割与目标位姿', '遮挡误检与推理部署']],
  ['robot-slam-engineer', '机器人定位与导航工程师', 'embodied', ['geometry', 'navigation', 'systems', 'simulation'], 'SLAM、地图与移动导航', ['多传感器状态估计', '重定位与地图维护', '导航障碍与轨迹误差']],
  ['robot-control-engineer', '机器人运动与全身控制工程师', 'embodied', ['geometry', 'navigation', 'control', 'simulation'], '移动底盘、足式及人形运动控制', ['动力学和接触建模', '轨迹跟踪与稳定性', '关节限位和控制延迟']],
  ['robot-manipulation-engineer', '机械臂与灵巧操作工程师', 'embodied', ['geometry', 'perception', 'control', 'policy'], '机械臂抓取与灵巧手操作', ['逆运动学和碰撞约束', '物体位姿及抓取规划', '接触、力控与操作失败']],
  ['embodied-policy-engineer', '具身大模型与策略学习工程师', 'embodied', ['perception', 'control', 'policy', 'deployment'], 'VLA、模仿学习与强化学习策略', ['演示数据和动作空间', '任务泛化与多种子评测', '模型压缩与在线推理预算']],
  ['robot-simulation-engineer', '机器人仿真与测试工程师', 'embodied', ['systems', 'navigation', 'control', 'simulation'], '仿真场景、合成数据与闭环质量', ['物理与传感器模型', '回归覆盖及故障注入', 'sim-to-real 差异分析']],
  ['robot-platform-engineer', '机器人数据与端侧平台工程师', 'embodied', ['systems', 'policy', 'simulation', 'deployment'], '机器人数据平台、嵌入式软件与端侧部署', ['采集标注与数据谱系', '端侧算子与推理优化', '驱动更新、监控与恢复']],
  ['driving-perception-engineer', '智能驾驶感知与融合工程师', 'driving', ['runtime', 'geometry', 'perception', 'deployment'], '多传感器检测跟踪、BEV 与占据', ['相机激光和雷达融合', '距离分桶与目标跟踪', '模型部署与缺失传感器']],
  ['driving-localization-engineer', '智能驾驶定位与地图工程师', 'driving', ['runtime', 'geometry', 'perception', 'data'], '融合定位、建图与地图数据工程', ['GNSS、IMU 与里程计融合', '地图更新与版本管理', '退化场景和定位误差']],
  ['driving-planning-engineer', '智能驾驶预测规划与控制工程师', 'driving', ['geometry', 'prediction', 'planning', 'testing'], '行为预测、交互决策、轨迹与泊车控制', ['交通参与者意图和多模态预测', '跟车变道与泊车约束', '闭环安全距离和舒适度']],
  ['vehicle-software-engineer', '车载软件与中间件工程师', 'driving', ['runtime', 'geometry', 'testing', 'deployment'], '车载 C++、中间件、通信与诊断', ['CAN 与车载以太网', '消息调度、运行时和诊断', 'OTA 回退与资源预算']],
  ['vehicle-algorithm-test-engineer', '车载算法测试与验证工程师', 'driving', ['runtime', 'planning', 'testing', 'data'], '车载算法测试、SIL / HIL 与场景验证', ['算法及接口测试设计', '总线、台架和故障注入', '场景覆盖与回归判定']],
  ['driving-simulation-engineer', '智能驾驶仿真与场景工程师', 'driving', ['prediction', 'planning', 'testing', 'data'], '闭环仿真、场景挖掘与合成数据', ['仿真传感器和车辆模型', '长尾场景与评价函数', '开环闭环差异与版本对照']],
  ['driving-data-engineer', '智能驾驶数据闭环工程师', 'driving', ['geometry', 'perception', 'testing', 'data'], '采集标注、场景挖掘与训练评测平台', ['行程切分和样本去重', '标注质量与场景分桶', '模型数据谱系与回流验证']],
  ['driving-deployment-engineer', '车载推理部署与工具链工程师', 'driving', ['runtime', 'perception', 'testing', 'deployment'], '端侧推理、编译优化与交付工具链', ['算子兼容和精度回归', '内存、延迟与功耗预算', '构建发布、诊断和回退']]
];
export const mobilityRoles = roleSpecs.map(([id, title, directionId, suffixes, summary, scenes]) => {
  const direction = mobilityDirections.find(item => item.id === directionId), skillIds = suffixes.map(suffix => directionId + '-' + suffix);
  return { id, title, directionId, pathIds: direction.pathIds, summary, workScenes: scenes,
    competencies: skillIds.map((skillId, index) => ({ skillId, weight: 25, campusLevel: index === 3 ? 1 : 2, socialLevel: index === 3 ? 3 : 4 })),
    jdKeywords: scenes.slice(0, 2).map((keyword, index) => ({ keyword, meaning: '在' + summary + '中解释约束、实现与失效条件', evidence: direction.skills.find(skill => skill.id === skillIds[index]).evidence, skillIds: [skillIds[index]] })),
    deliverables: [{ type: 'project', title: summary + '项目', campus: 'required', social: 'required', standard: '固定环境与输入，提供代码、接口、分桶指标、异常回放及本人贡献。' }, { type: 'competition', title: '相关竞赛', campus: 'optional', social: 'optional', standard: '说明赛制、角色、数据与可公开结果。' }, { type: 'paper', title: '相关研究或复现', campus: 'optional', social: 'optional', standard: '研究岗位按实际 JD 准备论文与复现；说明本人贡献及实验局限。' }, { type: 'opensource', title: '开源贡献', campus: 'recommended', social: 'recommended', standard: '提供 PR、测试与审查反馈，区分复现与原创实现。' }],
    resumeBullets: ['在明确标注的仿真或台架环境中完成' + summary + '，对 [场景数] 个样本记录 [指标] 与 [失败类型]，提供版本、回放和本人负责范围。'],
    interviewPrep: ['解释' + scenes[0] + '的核心机制与约束', '用输入、日志和版本复现' + scenes[1] + '中的失败', '比较' + scenes[2] + '的基线、指标和取舍'],
    campusFocus: ['掌握编程、数学与对应算法基础', '独立运行基线并解释一次失败'], socialFocus: ['说明系统接口、性能预算与交付责任', '提供跨模块诊断和版本回归证据'],
    project: { ...direction.project, id: id + '-lab', title: summary + '验证实验', scenario: scenes.join('；'), tasks: ['围绕' + scenes[0] + '建立输入输出与验收契约', '实现或接入' + scenes[1] + '基线并保存配置', '比较' + scenes[2] + '的异常与性能结果', '完成固定场景回归、版本追溯与本人贡献报告'], skillIds }
  };
});

const assessment = (directionId, suffix, skillId, title, options, answer, explanation) => ({ id: directionId + '-' + suffix, directionId, skillId: directionId + '-' + skillId, title, options, answer, explanation, level: 2 });
export const mobilityAssessment = [
  assessment('embodied', 'a', 'geometry', '相机与机械臂坐标不一致，首先应检查什么？', ['加大抓取力', '外参、坐标定义、单位与采样时间', '只换策略模型', '删除失败样本'], 1, '先校验时空语义，再分析感知与执行误差，记录受控偏移的回放证据。'),
  assessment('embodied', 'b', 'policy', '评估模仿策略泛化时，哪种切分更合理？', ['将同一轨迹相邻帧随机拆分', '只用训练损失', '按任务、物体或场景保留独立验证', '删除分布外场景'], 2, '相邻轨迹泄漏会高估能力；按实际泛化对象划分并保留失败分组。'),
  assessment('embodied', 'c', 'control', '机械臂末端位姿可达，为何仍需轨迹验证？', ['不需要检查', '逆运动学保证不会碰撞', '提高渲染帧率即可', '还存在关节、碰撞、速度与接触约束'], 3, '几何可达不代表轨迹可执行，需要检查运动学、动力学和环境约束。'),
  assessment('driving', 'a', 'testing', 'SIL 回归通过能否直接证明 HIL 已通过？', ['可以，两者完全相同', '不可以，HIL 还需控制器、真实 I/O 与台架证据', '只要场景够多就可以', '只需更改报告标题'], 1, '软件在环与硬件在环覆盖范围不同，必须标记测试环境和接口。'),
  assessment('driving', 'b', 'data', '驾驶相邻帧随机拆分训练验证的主要风险是什么？', ['数据量一定变小', '无法使用 GPU', '同一行程信息泄漏，高估泛化能力', '地图自动更新'], 2, '按行程、时间或场景隔离，版本化管理回流与验证集。'),
  assessment('driving', 'c', 'planning', '轨迹开环误差更低为什么仍需闭环回归？', ['开环指标无任何价值', '闭环只用于截图', '不需要回归', '动作影响未来观测，可能触发交互与分布偏移'], 3, '闭环应同时核对车辆约束、交互、碰撞、轨迹跟踪和舒适度。')
];

const globalLocation = { region: 'global', label: '全球协作', note: '开源实践项目，不代表招聘职位或线下实习' };
export const mobilityProjects = [
  { id: 'lerobot-policy', roles: ['robotics', 'ml'], title: 'LeRobot · 具身策略与演示数据', desc: '连接机器人数据、模仿学习与策略评测，按任务与物体划分并比较泛化。以固定的观测、动作与成功判据形成可重复的实验，分别报告训练、验证和异常任务中的表现。', url: 'https://github.com/huggingface/lerobot', location: globalLocation, level: '高阶', tags: ['VLA', '模仿学习', '机器人数据'], practice: '固定演示数据和策略版本，比较规则与学习基线，报告多种子任务成功率和推理预算。', deliverable: '策略配置、数据谱系和泛化评测报告' },
  { id: 'driving-autoware', roles: ['driving', 'embedded'], title: 'Autoware · 驾驶规划与闭环仿真', desc: '梳理感知定位、规划控制和车辆接口，以固定场景回放检查算法约束及异常。关注车辆模型、时间基准与模块依赖，在统一输入下比较版本行为与失败恢复。', url: 'https://github.com/autowarefoundation/autoware', location: globalLocation, level: '高阶', tags: ['ROS 2', '规划控制', '算法测试'], practice: '依照官方仿真说明固定场景与版本，回放轨迹并注入输入失效，保留恢复与分桶指标。', deliverable: '场景配置、轨迹日志和闭环回归报告' },
  { id: 'driving-carla', roles: ['driving', 'testing'], title: 'CARLA · 车载算法场景验证', desc: '构建可复现的交通、天气与传感器场景，比较开环感知和闭环车辆行为。将场景覆盖、测试判据与软件版本关联，分析跟车、路口和泊车中的时序及约束异常。', url: 'https://github.com/carla-simulator/carla', location: globalLocation, level: '高阶', tags: ['仿真', 'SIL', '车载测试'], practice: '固定种子实现跟车、路口和泊车场景，关联信号、软件版本与运行 ID，输出异常注入和回归对照。', deliverable: '场景库、SIL 测试脚本与失败复现材料' }
];
