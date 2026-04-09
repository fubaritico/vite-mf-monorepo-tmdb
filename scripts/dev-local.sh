#!/bin/bash
# Safety net: restores .env.local if dev-mobile.sh exited abnormally.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
ENV_LOCAL="$ROOT_DIR/.env.local"
ENV_BACKUP="$ROOT_DIR/.env.local.bak"

if [ ! -f "$ENV_BACKUP" ]; then
  echo "No .env.local.bak found — .env.local is already in localhost mode."
  exit 0
fi

mv "$ENV_BACKUP" "$ENV_LOCAL"
echo "Restored .env.local to localhost mode."
