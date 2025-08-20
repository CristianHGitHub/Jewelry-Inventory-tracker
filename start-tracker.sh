#!/bin/bash

# Jewelry Inventory Tracker Startup Script
# This script makes it easy to start the application

echo "🚀 Starting Jewelry Inventory Tracker..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js first:"
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Start the application
echo "🎯 Starting the server..."
echo "📱 Open your browser and go to: http://localhost:3000"
echo "⏹️  Press Ctrl+C to stop the server"
echo ""

npm start
