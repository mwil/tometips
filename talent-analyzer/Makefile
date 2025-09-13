# Makefile for Talent Analyzer (local operations)
# For full automation, use the main project Makefile with talent-* targets

# Local development commands
.PHONY: dev build install clean extract-icons

# Start development server
dev:
	npm run dev

# Build for production
build:
	npm run build

# Install dependencies
install:
	npm install

# Clean build artifacts
clean:
	rm -rf .next
	rm -rf node_modules/.cache
	rm -f talent_icon_mapping.ts extract_talent_icons.js

# Extract talent icons (standalone)
extract-icons:
	@echo "🔄 Extracting talent icons from game data..."
	@node extract_all_talent_icons.js > talent_icon_mapping.ts
	@echo "✅ Generated talent_icon_mapping.ts"
	@python3 update_talent_component.py talent_icon_mapping.ts app/page.tsx
	@echo "✅ Updated React component"

# Quick development cycle
quick: extract-icons dev

# Help
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
	@echo ""
	@echo "For full automation, use the main project Makefile:"
	@echo "  cd .. && make talent-icons"
	@echo "  cd .. && make talent-build"