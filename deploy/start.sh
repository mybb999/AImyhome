#!/bin/bash
set -e
# 生产环境变量（模型 key 等）放在同目录 .env，权限 600
set -a
[ -f /opt/ai-myhome-blog/.env ] && . /opt/ai-myhome-blog/.env
set +a

exec node /opt/ai-myhome-blog/server/index.mjs
