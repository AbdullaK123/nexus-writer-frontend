#!/bin/bash
# nuke-next.sh

echo "🔥 Nuking Next.js (complete blank slate)..."

# Kill any running Next.js processes
echo "Killing Next.js processes..."
pkill -f "next dev" || true
pkill -f "next build" || true
pkill -f "next start" || true

# Remove .next folder
echo "Removing .next folder..."
rm -rf .next

# Remove node_modules entirely
echo "Removing node_modules..."
rm -rf node_modules

# Remove package manager lock files (keeps package.json)
echo "Removing lock files..."
rm -f package-lock.json yarn.lock pnpm-lock.yaml

# Clear package manager cache
echo "Clearing package manager cache..."
npm cache clean --force 2>/dev/null || true
yarn cache clean 2>/dev/null || true
pnpm store prune 2>/dev/null || true

# Fresh install
echo "Fresh installing dependencies..."
npm install

echo "✅ Complete blank slate ready. Starting dev server..."

# Start dev server
npm run dev