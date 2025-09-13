# Makefile for Talent Analyzer (local operations)

.PHONY: dev build install clean extract-icons quick help

dev:
	npm run dev

build:
	npm run build

install:
	npm install

clean:
	rm -rf .next
	rm -rf node_modules/.cache
	rm -f talent_icon_mapping.ts extract_talent_icons.js

extract-icons:
	@echo "🔄 Extracting talent icons from game data..."
	@node extract_all_talent_icons.js > talent_icon_mapping.ts
	@echo "✅ Generated talent_icon_mapping.ts"
	@python3 update_talent_component.py talent_icon_mapping.ts app/page.tsx
	@echo "✅ Updated React component"

quick: extract-icons dev

help:
	@echo "Talent Analyzer - Local Commands:"
	@echo "=================================="
	@echo "make dev           - Start development server"
	@echo "make build         - Build for production"
	@echo "make install       - Install dependencies"
	@echo "make clean         - Clean build artifacts"
	@echo "make extract-icons - Extract and update talent icons"
	@echo "make quick         - Extract icons and start dev server"
	@echo "make help          - Show this help"
