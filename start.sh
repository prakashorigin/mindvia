#!/bin/bash

# Mindvia Quick Start Script

echo "🚀 Mindvia Setup Script"
echo "======================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it first."
    exit 1
fi

echo "✅ Node.js is installed"

# Navigate to backend
cd backend || exit

# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found!"
    echo "Please create .env with your MongoDB URI:"
    echo ""
    echo "PORT=5000"
    echo "MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/mindviaDB"
    echo "JWT_SECRET=mindvia_secret_key_2026"
    echo ""
    exit 1
fi

echo "✅ .env file found"

# Start the server
echo "🚀 Starting Mindvia Backend..."
echo "Server will run on http://localhost:5000"
echo "Frontend: Open frontend/index.html in your browser"
echo ""

npm start
