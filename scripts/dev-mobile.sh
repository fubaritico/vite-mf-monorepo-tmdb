#!/bin/bash
# Builds and serves prod servers exposed on LAN for mobile device testing.
# Rewrites remote URLs to proxy through host (single origin = no iOS Safari issues).
# Waits for all servers to be ready before printing the URL.
# Restores .env.local on exit.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
ENV_LOCAL="$ROOT_DIR/.env.local"
ENV_BACKUP="$ROOT_DIR/.env.local.bak"

# Detect LAN IP (macOS)
LAN_IP=$(ipconfig getifaddr en0 2>/dev/null || true)
if [ -z "$LAN_IP" ]; then
  LAN_IP=$(ipconfig getifaddr en1 2>/dev/null || true)
fi
if [ -z "$LAN_IP" ]; then
  echo "Could not detect LAN IP. Are you connected to Wi-Fi?"
  exit 1
fi

# Guard against nested runs
if [ -f "$ENV_BACKUP" ]; then
  echo ".env.local.bak already exists — a previous session was not cleaned up."
  echo "Restoring original .env.local first..."
  mv "$ENV_BACKUP" "$ENV_LOCAL"
fi

# Backup .env.local
cp "$ENV_LOCAL" "$ENV_BACKUP"

# Restore .env.local and kill background servers on any exit
restore() {
  echo ""
  echo "Shutting down servers..."
  kill $SERVER_PID 2>/dev/null || true
  wait $SERVER_PID 2>/dev/null || true
  echo "Restoring .env.local..."
  if [ -f "$ENV_BACKUP" ]; then
    mv "$ENV_BACKUP" "$ENV_LOCAL"
    echo "Done — .env.local restored to localhost mode."
  fi
}
trap restore EXIT

# Rewrite remote URLs to proxy through host (same origin)
HOST_URL="http://${LAN_IP}:3000"
sed -E \
  -e "s|^VITE_HOST_URL=.*|VITE_HOST_URL=${LAN_IP}:3000|" \
  -e "s|^VITE_HOME_URL=.*|VITE_HOME_URL=${HOST_URL}/_remote/home|" \
  -e "s|^VITE_MEDIA_URL=.*|VITE_MEDIA_URL=${HOST_URL}/_remote/media|" \
  -e "s|^VITE_PHOTOS_URL=.*|VITE_PHOTOS_URL=${HOST_URL}/_remote/photos|" \
  -e "s|^VITE_SEARCH_URL=.*|VITE_SEARCH_URL=${HOST_URL}/_remote/search|" \
  "$ENV_BACKUP" > "$ENV_LOCAL"

echo ""
echo "Building and starting production servers..."
echo ""

# Start prod servers in background so we can wait for readiness
cd "$ROOT_DIR"
DEV_MOBILE=true pnpm prod:server &
SERVER_PID=$!

# Wait for all 5 servers to be ready (host + 4 remotes)
echo "Waiting for all servers to be ready..."
npx wait-on \
  http://localhost:3000/remoteEntry.js \
  http://localhost:3001/remoteEntry.js \
  http://localhost:3002/remoteEntry.js \
  http://localhost:3003/remoteEntry.js \
  http://localhost:3004/remoteEntry.js \
  --timeout 120000

echo ""
echo "========================================"
echo "  All servers ready!"
echo "  Open on your device: http://${LAN_IP}:3000"
echo "  Ctrl+C to stop"
echo "========================================"
echo ""

# Keep script alive until Ctrl+C
wait $SERVER_PID
