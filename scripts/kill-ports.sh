#!/bin/bash

# Kill processes on dev ports (3000, 3001, 3002, 6006)
echo "🔪 Killing processes on ports 3000, 3001, 3002, 6006..."

lsof -ti:3000,3001,3002,6006 | xargs kill -9 2>/dev/null

if [ $? -eq 0 ]; then
  echo "✅ Ports freed!"
else
  echo "ℹ️  No processes found on these ports"
fi
