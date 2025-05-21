#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install
cd client && npm install && cd ..

# Build client
echo "🏗️ Building client..."
cd client && npm run build && cd ..

# Start server
echo "🌐 Starting server..."
node server.js 