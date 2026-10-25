#!/usr/bin/env bash
# 知序 ECS 后端部署脚本：在阿里云 ECS 上拉起 /api 后端（简历 AI 模型列表 + 生成）。
# 用法（在 ECS 的 /opt/zhixu 目录）： bash scripts/setup-ecs-backend.sh
set -euo pipefail

cd /opt/zhixu || { echo "请先 cd /opt/zhixu"; exit 1; }

echo "== 1) 拉取最新代码 =="
git pull --ff-only

echo "== 2) 安装运行时依赖（跳过 dev）=="
npm install --omit=dev

echo "== 3) 准备 .env.local =="
if [ ! -f .env.local ]; then
  cp .env.example .env.local
  echo "⚠️ 已生成 .env.local 模板，请编辑填入真实 SUB2API_API_KEY："
  echo "   nano .env.local"
  echo "   必填：SUB2API_BASE_URL / SUB2API_API_KEY / RESUME_AI_PROTOCOL=chat-completions"
  echo "   填好后重新运行： bash scripts/setup-ecs-backend.sh"
  exit 0
fi

# 从 .env.local 读取 base 与 key（不打印值）
BASE="$(grep -E '^SUB2API_BASE_URL=' .env.local | head -1 | cut -d= -f2- | tr -d ' \t\"'\\'')"
KEY="$(grep -E '^SUB2API_API_KEY=' .env.local | head -1 | cut -d= -f2- | tr -d ' \t\"'\\'')"

echo "== 4) 测试 ECS 能否访问转发服务 =="
CODE="$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 -H "Authorization: Bearer ${KEY}" "${BASE%/}/models" 2>/dev/null || echo 000)"
if [ "$CODE" = "200" ]; then
  echo "✓ 转发服务可达且鉴权通过 (200)"
else
  echo "⚠️ 转发服务返回 $CODE（可能出网受限或 key 有误）。模型列表将走前端兜底（仅 GPT-6 Astra）。"
fi

echo "== 5) 启动后端（优先 pm2，否则 nohup）=="
if command -v pm2 >/dev/null 2>&1; then
  pm2 delete zhixu 2>/dev/null || true
  pm2 start server.mjs --name zhixu --update-env
  pm2 save
  echo "✓ 已用 pm2 启动（建议再跑一次 'pm2 startup' 实现开机自启）"
else
  pkill -f "node server.mjs" 2>/dev/null || true
  sleep 1
  nohup node server.mjs > /var/log/zhixu.log 2>&1 &
  echo "✓ 已用 nohup 启动，日志 /var/log/zhixu.log（重启会丢失，建议装 pm2: npm i -g pm2）"
fi

sleep 2
echo "== 6) 自检本机 /api/resume/models =="
curl -s --max-time 10 http://127.0.0.1:4173/api/resume/models | head -c 500
echo
echo "=== 完成后，请按文档在 nginx 增加 /api 反代并 reload（见聊天里的 nginx 配置）==="
