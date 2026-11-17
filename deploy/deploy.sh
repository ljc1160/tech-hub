#!/usr/bin/env bash
# 子站部署：拉取最新源码与数据 → 构建，out/ 即 Nginx 站点目录
set -euo pipefail

main() {
  cd "$(dirname "$0")/.."
  git pull --ff-only
  npm ci
  npm run build
  echo "✅ ins.itcsdn.com 部署完成"
}
main
