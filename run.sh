#!/bin/bash
# Script to run the ToME spoiler generator
# Fixed to work with modern LuaJIT

# Set up the Lua C path for lpeg
export LUA_CPATH="/Users/mwil/.luarocks/lib/lua/5.1/?.so;;"

echo "Running ToME spoiler generator for version 1.7.6..."
echo "================================================="

if [ "$1" = "json" ]; then
    echo "Generating JSON files only..."
    luajit spoilers.lua luajit
elif [ "$1" = "all" ] || [ "$1" = "html" ]; then
    echo "Running full build (JSON + HTML + images)..."
    make all
elif [ "$1" = "items" ]; then
    echo "Preparing item images..."
    make item-img
elif [ "$1" = "serve" ]; then
    echo "Starting local server on http://localhost:8000"
    echo "Note: Use Ctrl+F5 or Cmd+Shift+R to force refresh and bypass cache"
    cd html && python3 -m http.server 8000
else
    echo "Usage: $0 [json|all|html|items|serve]"
    echo "  json  - Generate spoiler JSON files only"
    echo "  all   - Run full build including HTML generation and images"  
    echo "  html  - Same as 'all'"
    echo "  items - Prepare item images only"
    echo "  serve - Start local web server to view the generated site"
    exit 1
fi

if [ "$1" != "serve" ]; then
    echo ""
    echo "✅ Build completed successfully!"
    echo "📁 Generated files are in: html/"
    echo "🌐 To view locally, run: $0 serve"
fi