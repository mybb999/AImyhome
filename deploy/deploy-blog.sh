#!/usr/bin/env bash
# 本地构建 node-server 产物并部署到腾讯云
# 用法：bash deploy/deploy-blog.sh
set -euo pipefail

SERVER="${SERVER:-root@106.55.76.235}"
SSH_KEY="${SSH_KEY:-$HOME/.ssh/id_ed25519_agent}"
REMOTE_DIR="${REMOTE_DIR:-/opt/ai-myhome-blog}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

cd "$ROOT"

echo "==> build (node-server)"
NITRO_PRESET=node-server npm run build

echo "==> package"
tar -C .output -czf /tmp/blog-output.tgz .

echo "==> upload"
scp -i "$SSH_KEY" /tmp/blog-output.tgz "$SERVER:/tmp/blog-output.tgz"
scp -i "$SSH_KEY" deploy/ecosystem.config.cjs deploy/start.sh "$SERVER:$REMOTE_DIR/"
scp -i "$SSH_KEY" deploy/nginx-blog-locations.conf "$SERVER:/etc/nginx/snippets/blog-locations.conf"

echo "==> extract + restart"
ssh -i "$SSH_KEY" "$SERVER" "
  tar -xzf /tmp/blog-output.tgz -C '$REMOTE_DIR' &&
  chmod 700 '$REMOTE_DIR/start.sh' &&
  nginx -t && systemctl reload nginx &&
  cd '$REMOTE_DIR' &&
  pm2 delete blog >/dev/null 2>&1 || true
  pm2 start ecosystem.config.cjs --update-env &&
  pm2 save
"

echo "==> done: https://ai-myhome.space"
