#!/bin/bash

echo "Starting the blog template..."
cd blog-template

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
    echo "Installing blog dependencies..."
    npm install
fi

# Start the blog development server
echo "Starting blog development server on port 4321..."
npm run dev
