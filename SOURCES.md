# 网站内容来源与核验

公司与面经核验日期：2026-10-16；新增中文资料核验日期：2026-10-17。以下 HTTP 结果只反映本次访问，不保证之后可用。面经是用户自述，不能独立证明其面试经过。本站仅编写简短摘要和阅读建议，不搬运完整正文。

## 公司入口

| 公司 | 来源入口 | 本次核验 |
|---|---|---|
| 字节跳动 | https://jobs.bytedance.com/ | HTTP 200 |
| 阿里巴巴 | https://talent.alibaba.com/ | HTTP 200 |
| 腾讯 | https://careers.tencent.com/ | 重试后 HTTP 200 |
| 月之暗面 | https://careers.kimi.com/ | 从 https://www.moonshot.cn/ 官方首页找到该招聘链接；首页 HTTP 200，招聘页超时 |
| MiniMax | https://www.minimaxi.com/careers | 从公司官网「加入我们」找到；HTTP 200，跳转 https://www.minimax.cn/careers |

公司场景与准备重点属于编辑建议，不是官方考题或招聘流程声明。

## 公开面经初始样本

| 公司 / 岗位 | 原文标题 | 日期信息 | 原文 |
|---|---|---|---|
| 字节跳动 / 后端开发 | 抖音用户产品-后端一面面经 | 2026-08-25 发布 | https://www.nowcoder.com/discuss/921820120039555072 |
| 阿里巴巴 / 前端开发 | 阿里巴巴前端秋招面经（一面挂） | 2022-09-17 发布 · 历史样本 | https://www.nowcoder.com/discuss/400681373596495872 |
| 腾讯 / 软件测试 | 腾讯光子工作室，测试开发日常一面 | 2026-07-07 面试（作者自述） | https://www.nowcoder.com/discuss/908761110117908480 |
| 月之暗面 / Agent 开发 | 月之暗面AI应用岗Agent开发一面，全程被吊打！！！ | 日期与招聘类型请查原文 | https://www.nowcoder.com/discuss/920077145584455680 |
| MiniMax / 产品经理 | Minimax-AI产品面经 | 2024-05-30 发布 · 历史样本 | https://www.nowcoder.com/discuss/625779241275109376 |

以上五份原文均返回 HTTP 200，并核对了页面标题和可见内容/元描述。字节、阿里与 MiniMax 的发布日期取自原文页面嵌入的 createTime；腾讯的面试日期来自作者的内容描述；月之暗面未确认完整日期，页面要求读者查看原文。历史样本已标记，不推断它们适用于当前招聘。

牛客检索为外部搜索入口，结果受搜索排序、登录状态和内容更新影响，并不是本站审核过的面经。

## 学习资料与原创练习

资料目录在 data.js 中，现有 97 个入口，其中 51 个中文入口。保留原发布方地址、来源、语言、学习阶段、内容简介和原创练习产出。此前的 60 个入口尚未逐一完成本轮 HTTP 核验；本轮新增 37 个入口的核验记录见下表。

56 道笔试/专业面试/项目练习和六类准备方法由本站编写，题目不冠以任何公司的原题标签。阶段、项目和答题要点是学习起点，用户应根据具体岗位描述调整。

## 2026-10-17 新增中文资料

新增 67 项，分别保留官方文档、官方译文、作者教程和社区教材等来源类型，未将社区翻译写成原框架官方文档。当前 20 个方向各有至少 5 项中文入口。入门、进阶和高阶为本站编辑的学习阶段建议，不代表发布方认证。

通过当前系统网络代理逐个读取实际页面，37 项均返回 HTTP 200，核对了页面标题、中文内容标识或作者仓库 README。仓库文档、译文可能含英文术语、未译章节或外链英文课程，语言标识指入口的主要阅读内容；CS 自学指南和 TypeScript 已特别说明。

排除了正文主要为英文的 Node.js 中文路径、Jenkins 中文路径和 Clarity 中文路径。Hello 算法官网本次遇到访问验证，因此选用作者 GitHub 仓库。数学教材使用已确认的 math-for-ai 仓库。初次直连有超时，以下结果记录系统代理下的复核，不代表任意网络均可访问。

完整结果保存在 artifacts/chinese-resources-link-check.json；本轮条目清单保存在 artifacts/chinese-resources-additions.json。此前 60 个入口未被记为本轮已经核验。

| 资料 | 发布方 / 类型 | 关联方向 | 核验 |
|---|---|---|---|
| [Hello-Agents：从零构建智能体](https://github.com/datawhalechina/hello-agents) | Datawhale / 开源教程 | Agent 开发 | HTTP 200 |
| [LLM Universe：大模型应用开发](https://github.com/datawhalechina/llm-universe) | Datawhale / 开源项目 | Agent 开发 | HTTP 200 |
| [Happy-LLM：从零开始的大模型原理](https://github.com/datawhalechina/happy-llm) | Datawhale / 开源教程 | 大模型预训练、大模型后训练、深度学习 | HTTP 200 |
| [Self-LLM：开源大模型部署与微调](https://github.com/datawhalechina/self-llm) | Datawhale / 开源实践 | Agent 开发、大模型后训练、运维与 DevOps | HTTP 200 |
| [Tiny Universe：大模型组件手写实践](https://github.com/datawhalechina/tiny-universe) | Datawhale / 开源实践 | 大模型预训练、深度学习 | HTTP 200 |
| [南瓜书：机器学习公式推导](https://github.com/datawhalechina/pumpkin-book) | Datawhale / 开源教材 | 机器学习、算法设计 | HTTP 200 |
| [Easy-RL：强化学习中文教程](https://github.com/datawhalechina/easy-rl) | Datawhale / 开源教程 | 机器学习、大模型后训练、算法设计 | HTTP 200 |
| [LLaMA Factory 中文微调文档](https://llamafactory.readthedocs.io/zh-cn/latest/) | LLaMA Factory / 项目文档 | 大模型后训练 | HTTP 200 |
| [MS-SWIFT 中文训练文档](https://swift.readthedocs.io/zh-cn/latest/) | ModelScope / SWIFT / 官方文档 | 大模型后训练、大模型预训练 | HTTP 200 |
| [Hugging Face 大模型课程中文版](https://huggingface.co/learn/llm-course/zh-CN/chapter1/1) | Hugging Face / 官方课程译文 | 大模型预训练、大模型后训练、深度学习 | HTTP 200 |
| [MiniMind：小规模语言模型训练](https://github.com/jingyaogong/minimind) | MiniMind / jingyaogong / 开源项目 | 大模型预训练、大模型后训练 | HTTP 200 |
| [Joyful Pandas：中文数据分析教程](https://github.com/datawhalechina/joyful-pandas) | Datawhale / 开源教程 | 数据分析、机器学习 | HTTP 200 |
| [PaddlePaddle 中文深度学习文档](https://www.paddlepaddle.org.cn/documentation/docs/zh/guides/index_cn.html) | 飞桨 PaddlePaddle / 官方文档 | 深度学习、机器学习 | HTTP 200 |
| [Vue 官方中文教程与指南](https://cn.vuejs.org/guide/introduction.html) | Vue.js / 官方文档 | 前端开发 | HTTP 200 |
| [TypeScript 中文文档](https://www.typescriptlang.org/zh/docs/) | TypeScript / 官方文档 | 前端开发、软件开发 | HTTP 200 |
| [Vite 中文构建指南](https://cn.vite.dev/guide/) | Vite / 官方文档 | 前端开发、软件开发 | HTTP 200 |
| [Vitest 中文测试指南](https://cn.vitest.dev/guide/) | Vitest / 官方文档 | 软件测试、前端开发 | HTTP 200 |
| [Vue Test Utils 中文组件测试](https://test-utils.vuejs.org/zh/guide/) | Vue.js / 官方文档 | 软件测试、前端开发 | HTTP 200 |
| [Django 中文入门教程](https://docs.djangoproject.com/zh-hans/5.2/intro/tutorial01/) | Django / 官方教程译文 | 后端开发、软件开发 | HTTP 200 |
| [现代 JavaScript 教程中文版](https://zh.javascript.info/) | JavaScript.info 中文译者社区 / 教程译文 | 前端开发、软件开发、后端开发 | HTTP 200 |
| [JavaGuide：Java 后端知识体系](https://github.com/Snailclimb/JavaGuide) | JavaGuide / Snailclimb / 作者知识库 | 后端开发、软件开发 | HTTP 200 |
| [Python unittest 中文测试文档](https://docs.python.org/zh-cn/3/library/unittest.html) | Python / 官方文档 | 软件测试、软件开发 | HTTP 200 |
| [Apifox 接口自动化测试指南](https://docs.apifox.com/doc-5615148) | Apifox / 官方文档 | 软件测试、后端开发 | HTTP 200 |
| [Docker 从入门到实践](https://github.com/yeasy/docker_practice) | Docker — 从入门到实践作者团队 / 开源教材 | 运维与 DevOps、软件开发、后端开发 | HTTP 200 |
| [Linux 101：中文基础教程](https://101.lug.ustc.edu.cn/) | 中国科学技术大学 Linux 用户协会 / 开源教程 | 运维与 DevOps、计算机基础 | HTTP 200 |
| [Hello 算法：图解数据结构与算法](https://github.com/krahets/hello-algo) | Hello 算法 / krahets / 开源教材 | 算法设计、计算机基础 | HTTP 200 |
| [CS 自学指南](https://csdiy.wiki/) | CS 自学指南 / PKUFlyingPig / 学习导航 | 计算机基础、软件开发 | HTTP 200 |
| [小林 coding：图解计算机基础](https://xiaolincoding.com/) | 小林 coding / 作者教程 | 计算机基础、后端开发、运维与 DevOps | HTTP 200 |
| [CS-Notes：计算机基础学习笔记](https://github.com/CyC2018/CS-Notes) | CyC2018 / 作者笔记 | 计算机基础、算法设计 | HTTP 200 |
| [TiDB 中文 SQL 基础操作](https://docs.pingcap.com/zh/tidb/stable/basic-sql-operations/) | PingCAP / 官方教程 | 数据分析、后端开发 | HTTP 200 |
| [Ant Design 中文设计原则](https://ant.design/docs/spec/introduce-cn) | Ant Design / 官方设计指南 | 产品经理、前端开发 | HTTP 200 |
| [Atlassian 中文产品管理指南](https://www.atlassian.com/zh/agile/product-management) | Atlassian / 官方指南 | 产品经理 | HTTP 200 |
| [Atlassian 中文产品需求文档指南](https://www.atlassian.com/zh/agile/product-management/requirements) | Atlassian / 官方指南 | 产品经理、软件开发 | HTTP 200 |
| [动手学数据分析：中文项目实践](https://github.com/datawhalechina/hands-on-data-analysis) | Datawhale / 开源实践 | 数据分析 | HTTP 200 |
| [人工智能的数学基础（中文编译）](https://github.com/datawhalechina/math-for-ai) | Datawhale / 社区编译教材 | 机器学习、深度学习、计算机基础 | HTTP 200 |
| [LLM Cookbook：大模型应用中文手册](https://github.com/datawhalechina/llm-cookbook) | Datawhale / 课程翻译与复现 | Agent 开发、大模型后训练 | HTTP 200 |
| [MMPreTrain 中文训练教程](https://mmpretrain.readthedocs.io/zh-cn/latest/) | OpenMMLab / 官方文档 | 深度学习 | HTTP 200 |


## 项目实践示例（2026-10-19）

24 个仓库通过 GitHub 公开仓库 API 核对访问状态、仓库名称、简介与归档状态，均返回 HTTP 200；LlamaFactory 使用 API 返回的规范地址。项目练习任务和交付建议为本站编写，不表示仓库维护者提供课程或实习。链接访问核验不等于已逐一安装运行全部项目。

| 项目 | 仓库 | 所属地区口径 |
| --- | --- | --- |
| Dify · AI 应用与知识库工作流 | https://github.com/langgenius/dify | 全球协作 |
| LangChain · 工具调用型助手 | https://github.com/langchain-ai/langchain | 全球协作 |
| ML for Beginners · 机器学习实验集 | https://github.com/microsoft/ML-For-Beginners | 美国 · 雷德蒙德（发起机构所在地） |
| PyTorch Examples · 神经网络训练实验 | https://github.com/pytorch/examples | 全球协作 |
| nanoGPT · 小型语言模型预训练 | https://github.com/karpathy/nanoGPT | 全球协作 |
| LlamaFactory · 指令微调实践 | https://github.com/hiyouga/LlamaFactory | 全球协作 |
| TRL · 偏好优化对照实验 | https://github.com/huggingface/trl | 全球协作 |
| Vue Core · 响应式机制与组件实验 | https://github.com/vuejs/core | 全球协作 |
| Mall · 电商交易系统 | https://github.com/macrozheng/mall | 全球协作 |
| Full Stack FastAPI · 全栈任务管理 | https://github.com/fastapi/full-stack-fastapi-template | 全球协作 |
| Playwright · 端到端质量保障 | https://github.com/microsoft/playwright | 美国 · 雷德蒙德（发起机构所在地） |
| Prometheus · 服务可观测性实验 | https://github.com/prometheus/prometheus | 全球协作 |
| The Algorithms · 算法验证实验 | https://github.com/TheAlgorithms/Python | 全球协作 |
| xv6 RISC-V · 操作系统内核实验 | https://github.com/mit-pdos/xv6-riscv | 美国 · 剑桥（发起机构所在地） |
| Appsmith · 内部工具产品原型 | https://github.com/appsmithorg/appsmith | 全球协作 |
| Apache Superset · 数据分析看板 | https://github.com/apache/superset | 全球协作 |
| OWASP Juice Shop · Web 安全靶场 | https://github.com/juice-shop/juice-shop | 全球协作 |
| Kubernetes · 应用编排与弹性部署 | https://github.com/kubernetes/kubernetes | 全球协作 |
| Apache Flink · 实时数据管道 | https://github.com/apache/flink | 全球协作 |
| Zephyr · 嵌入式实时系统入门 | https://github.com/zephyrproject-rtos/zephyr | 全球协作 |
| OpenCV · 图像处理与视觉流水线 | https://github.com/opencv/opencv | 全球协作 |
| Apache Dubbo · RPC 服务治理 | https://github.com/apache/dubbo | 全球协作 |
| ncnn · 移动端视觉模型推理 | https://github.com/Tencent/ncnn | 中国 · 深圳（发起机构所在地） |
| Spring Cloud Alibaba · 微服务协作实验 | https://github.com/alibaba/spring-cloud-alibaba | 中国 · 杭州（发起机构所在地） |

机构地区来源：Tencent（Shenzhen, China）：https://github.com/Tencent；Alibaba（Hangzhou, China）：https://github.com/alibaba；Microsoft（Redmond, WA）：https://github.com/microsoft；MIT PDOS（Cambridge, MA）：https://github.com/mit-pdos。地点取自公开组织档案，未从项目语言、名称或维护者姓名推测所在地。其余条目统一标为全球协作。


## 方向、资料与项目扩充（2026-10-19）

新增十个岗位方向的课程、任务和面试题为本站编写。20 个新增项目在 GitHub 公开仓库 API 均返回 HTTP 200，核对了仓库简介和归档状态；Solidity 使用返回的规范地址 argotorg/solidity。这里只核对仓库与资料入口，未逐一安装运行所有外部项目。

| 方向 | 项目 | 仓库 |
| --- | --- | --- |
| 自然语言处理 | Transformers · 中文文本分类实验 | https://github.com/huggingface/transformers |
| 自然语言处理 | HanLP · 中文信息抽取流水线 | https://github.com/hankcs/HanLP |
| 推荐与搜索 | RecBole · 推荐召回与排序评测 | https://github.com/RUCAIBox/RecBole |
| 推荐与搜索 | Gorse · 推荐服务与冷启动 | https://github.com/gorse-io/gorse |
| 移动应用开发 | Flutter Samples · 跨端应用实践 | https://github.com/flutter/samples |
| 移动应用开发 | Now in Android · 原生应用架构 | https://github.com/android/nowinandroid |
| 游戏开发 | Godot Demos · 2D 游戏玩法实验 | https://github.com/godotengine/godot-demo-projects |
| 游戏开发 | Cocos Engine · 组件与场景机制 | https://github.com/cocos/cocos-engine |
| 计算机图形学与 XR | Three.js · 交互式三维展厅 | https://github.com/mrdoob/three.js |
| 计算机图形学与 XR | LearnOpenGL · 渲染管线小实验 | https://github.com/JoeyDeVries/LearnOpenGL |
| AI Infra 与 MLOps | MLflow · 模型实验与版本追踪 | https://github.com/mlflow/mlflow |
| AI Infra 与 MLOps | vLLM · 模型推理服务性能实验 | https://github.com/vllm-project/vllm |
| 网络工程 | Mininet · 可复现网络拓扑 | https://github.com/mininet/mininet |
| 网络工程 | FRRouting · 动态路由实验 | https://github.com/FRRouting/frr |
| 机器人与自动驾驶 | ROS 2 Examples · 消息与节点实验 | https://github.com/ros2/examples |
| 机器人与自动驾驶 | Webots · 移动机器人导航仿真 | https://github.com/cyberbotics/webots |
| 编译器与语言工具链 | LLVM · 小语言与中间表示 | https://github.com/llvm/llvm-project |
| 编译器与语言工具链 | Crafting Interpreters · 自制解释器 | https://github.com/munificent/craftinginterpreters |
| 区块链工程 | Solidity · 本地合约与状态验证 | https://github.com/argotorg/solidity |
| 区块链工程 | Fabric Samples · 联盟链流程实验 | https://github.com/hyperledger/fabric-samples |

中文入口保留作者和译者信息，英文 vLLM 官方文档独立标为英文。NLP-Beginner 原仓库已迁移至 nndl/llm-beginner，按实际内容更名。旧 Three.js 中文直链和错误的 vLLM 中文路径没有继续使用；Gorse 改用当前站点导航中的中文文档路径，Docker 失效章节以 Python 官方网络服务文档替换。

部分外部请求因连接失败、超时或 GitHub API 配额限制未完成核验，不能据此判定页面不存在，也不宣称全部新增资料均已核验可访问。下表仅将直接页面 HTTP 200 或已取得中文 README 的条目标记为已检查，其余仍需后续人工复核。单页应用的 HTTP 200 只代表入口可达。

| 方向 | 资料 | 语言 | 核验结果 |
| --- | --- | --- | --- |
| 自然语言处理 | [Hugging Face 中文 NLP 课程](https://huggingface.co/learn/nlp-course/zh-CN/chapter1/1) | 中文 | 待人工复核：网络或配额限制 |
| 自然语言处理 | [Transformers 中文文档](https://huggingface.co/docs/transformers/zh/index) | 中文 | 待人工复核：网络或配额限制 |
| 自然语言处理 | [jieba 中文分词](https://github.com/fxsjy/jieba) | 中文 | 中文 README 已核对 |
| 自然语言处理 | [HanLP 中文处理文档](https://github.com/hankcs/HanLP) | 中文 | 中文 README 已核对 |
| 自然语言处理 | [大模型与智能体中文编程任务](https://github.com/nndl/llm-beginner) | 中文 | 中文 README 已核对 |
| 推荐与搜索 | [Fun-Rec 中文推荐系统教程](https://github.com/datawhalechina/fun-rec) | 中文 | 中文 README 已核对 |
| 推荐与搜索 | [Gorse 中文冷启动与非个性化推荐](https://gorse.io/zh/docs/concepts/recommenders/non-personalized.html) | 中文 | 待人工复核：网络或配额限制 |
| 推荐与搜索 | [PaddleRec 推荐模型实践](https://github.com/PaddlePaddle/PaddleRec) | 中文 | 中文 README 已核对 |
| 推荐与搜索 | [Gorse 中文文档](https://gorse.io/zh/docs/) | 中文 | 待人工复核：网络或配额限制 |
| 推荐与搜索 | [AI 推荐系统中文学习笔记](https://github.com/zhongqiangwu960812/AI-RecommenderSystem) | 中文 | 中文 README 已核对 |
| 移动应用开发 | [Flutter 中文文档](https://docs.flutter.cn/) | 中文 | 待人工复核：网络或配额限制 |
| 移动应用开发 | [Android 中文学习课程](https://developer.android.google.cn/courses?hl=zh-cn) | 中文 | 待人工复核：网络或配额限制 |
| 移动应用开发 | [Jetpack Compose 中文文档](https://developer.android.google.cn/jetpack/compose/documentation?hl=zh-cn) | 中文 | 待人工复核：网络或配额限制 |
| 移动应用开发 | [React Native 中文文档](https://reactnative.cn/docs/getting-started) | 中文 | 待人工复核：网络或配额限制 |
| 移动应用开发 | [HarmonyOS ArkTS 入门](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-get-started) | 中文 | 待人工复核：网络或配额限制 |
| 游戏开发 | [Godot 中文首个 2D 游戏](https://docs.godotengine.org/zh-cn/stable/getting_started/first_2d_game/index.html) | 中文 | 待人工复核：网络或配额限制 |
| 游戏开发 | [Godot 中文物理文档](https://docs.godotengine.org/zh-cn/stable/tutorials/physics/index.html) | 中文 | 页面 HTTP 200 |
| 游戏开发 | [Godot 中文多人网络文档](https://docs.godotengine.org/zh-cn/stable/tutorials/networking/high_level_multiplayer.html) | 中文 | 页面 HTTP 200 |
| 游戏开发 | [Cocos Creator 中文手册](https://docs.cocos.com/creator/manual/zh/) | 中文 | 页面 HTTP 200 |
| 游戏开发 | [Cocos 中文脚本指南](https://docs.cocos.com/creator/manual/zh/scripting/) | 中文 | 页面 HTTP 200 |
| 计算机图形学与 XR | [WebGL 中文基础与渲染管线](https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-fundamentals.html) | 中文 | 待人工复核：网络或配额限制 |
| 计算机图形学与 XR | [WebGL 中文三维透视](https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-3d-perspective.html) | 中文 | 待人工复核：网络或配额限制 |
| 计算机图形学与 XR | [WebGL 中文方向光照](https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-3d-lighting-directional.html) | 中文 | 待人工复核：网络或配额限制 |
| 计算机图形学与 XR | [LearnOpenGL 中文教程](https://learnopengl-cn.github.io/) | 中文 | 页面 HTTP 200 |
| 计算机图形学与 XR | [GAMES101 中文图形学课程](https://games-cn.org/intro-graphics/) | 中文 | 页面 HTTP 200 |
| AI Infra 与 MLOps | [Self-LLM 中文模型部署实战](https://github.com/datawhalechina/self-llm) | 中文 | 待人工复核：网络或配额限制 |
| AI Infra 与 MLOps | [Kubernetes 中文 GPU 调度](https://kubernetes.io/zh-cn/docs/tasks/manage-gpus/scheduling-gpus/) | 中文 | 页面 HTTP 200 |
| AI Infra 与 MLOps | [动手学深度学习：计算性能](https://zh.d2l.ai/chapter_computational-performance/index.html) | 中文 | 页面 HTTP 200 |
| AI Infra 与 MLOps | [PaddlePaddle 中文框架指南](https://www.paddlepaddle.org.cn/documentation/docs/zh/guides/index_cn.html) | 中文 | 页面 HTTP 200 |
| AI Infra 与 MLOps | [InternLM 中文实战教程](https://github.com/InternLM/Tutorial) | 中文 | 中文 README 已核对 |
| 网络工程 | [小林 coding：图解网络](https://www.xiaolincoding.com/network/) | 中文 | 页面 HTTP 200 |
| 网络工程 | [网络与系统中文实践笔记](https://github.com/yanfeizhang/coder-kung-fu) | 中文 | 待人工复核：网络或配额限制 |
| 网络工程 | [协议与网络中文专题](https://github.com/halfrost/Halfrost-Field/tree/master/contents/Protocol) | 中文 | 待人工复核：网络或配额限制 |
| 网络工程 | [Python socket 中文文档](https://docs.python.org/zh-cn/3/library/socket.html) | 中文 | 页面 HTTP 200 |
| 网络工程 | [Python socketserver 中文网络服务](https://docs.python.org/zh-cn/3/library/socketserver.html) | 中文 | 待人工复核：网络或配额限制 |
| 机器人与自动驾驶 | [动手学 ROS 2 中文教程](https://fishros.com/d2lros2/) | 中文 | 页面 HTTP 200 |
| 机器人与自动驾驶 | [视觉 SLAM 十四讲第二版代码](https://github.com/gaoxiang12/slambook2) | 中文 | 待人工复核：网络或配额限制 |
| 机器人与自动驾驶 | [SLAM 中文学习与总结](https://github.com/HeYijia/SLAMSummarization) | 中文 | 待人工复核：网络或配额限制 |
| 机器人与自动驾驶 | [ROS 运动规划实践](https://github.com/ai-winter/ros_motion_planning) | 中文 | 待人工复核：网络或配额限制 |
| 机器人与自动驾驶 | [Easy RL 中文强化学习教程](https://github.com/datawhalechina/easy-rl) | 中文 | 待人工复核：网络或配额限制 |
| 编译器与语言工具链 | [LLVM 中文入门教程](https://llvm-tutorial-cn.readthedocs.io/en/latest/) | 中文 | 页面 HTTP 200 |
| 编译器与语言工具链 | [北京大学 MiniC 在线实验文档](https://pku-minic.github.io/online-doc/#/) | 中文 | 页面 HTTP 200 |
| 编译器与语言工具链 | [MiniDecaf 中文编译实验教程](https://github.com/decaf-lang/minidecaf-tutorial) | 中文 | 待人工复核：网络或配额限制 |
| 编译器与语言工具链 | [Python AST 中文接口文档](https://docs.python.org/zh-cn/3/library/ast.html) | 中文 | 待人工复核：网络或配额限制 |
| 编译器与语言工具链 | [Python 字节码分析中文文档](https://docs.python.org/zh-cn/3/library/dis.html) | 中文 | 待人工复核：网络或配额限制 |
| 区块链工程 | [Solidity 中文文档](https://docs.soliditylang.org/zh-cn/latest/) | 中文 | 页面 HTTP 200 |
| 区块链工程 | [以太坊中文开发文档](https://ethereum.org/zh/developers/docs/) | 中文 | 待人工复核：网络或配额限制 |
| 区块链工程 | [Hyperledger Fabric 中文文档](https://hyperledger-fabric.readthedocs.io/zh-cn/latest/) | 中文 | 页面 HTTP 200 |
| 区块链工程 | [FISCO BCOS 中文文档](https://fisco-bcos-documentation.readthedocs.io/zh-cn/latest/) | 中文 | 页面 HTTP 200 |
| 区块链工程 | [智能合约测试中文指南](https://ethereum.org/zh/developers/docs/smart-contracts/testing/) | 中文 | 待人工复核：网络或配额限制 |
| AI Infra 与 MLOps | [vLLM 官方推理服务文档](https://docs.vllm.ai/en/latest/) | 英文 | 待人工复核：网络或配额限制 |
