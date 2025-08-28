SHELL := /bin/bash

LUA := luajit

TOME_GIT_URL := http://git.net-core.org/tome/t-engine4.git

RELEASE_VERSIONS := 1.7.6
VERSIONS := $(RELEASE_VERSIONS)

# GitHub Pages output
PAGES_OUTPUT = ../tometips.github.io

all: t-engine4 img html/js/templates.js html/js/partials.js json recent

json:
	$(LUA) spoilers.lua $(LUA)

html/js/partials.js: html/js/partials/*.handlebars
	handlebars --min --partial html/js/partials > $@

html/js/templates.js: html/js/templates/*.handlebars
	handlebars --min html/js/templates > $@

# Note: Handlebars partial registrations are handled by html/js/partials-registration.js
# This persistent file ensures partials are available without manual re-registration after compilation

# "make clean" support.  To avoid creating spurious changes, this does not
# delete images.
clean:
	find html/data -mindepth 1 -maxdepth 1 -not -name README.txt | xargs rm -rf
	rm -f html/js/templates.js html/js/partials.js

# Cleaner than clean.  This *does* delete images.
clean-all: clean
	rm -rf html/img/talents/*.png html/img/talents/*/*.png

publish:
	test -d $(PAGES_OUTPUT)
	rsync --recursive --times --exclude=*.handlebars --exclude=*.swp --delete --verbose html/* $(PAGES_OUTPUT)

# Changes from one version to the next
changes.mk: Makefile scripts/make-changes-mk.sh
	scripts/make-changes-mk.sh $(VERSIONS) > $@
-include changes.mk

# Convert and publish images.
img: t-engine4 dlc
	scripts/prepare-img.sh
	$(MAKE) item-img

# Convert and publish item images.
item-img: t-engine4 dlc
	mkdir -p html/img/object/{96,64,48,32}
	mkdir -p html/img/object/artifact/{96,64,48,32}
	@# Copy object images from main ToME installation
	@for gfx in t-engine4/game/modules/tome/data/gfx/shockbolt/object t-engine4/game/modules/tome/data/gfx/mushroom/object; do \
		if [ -d "$$gfx" ]; then \
			for img in $$gfx/*.png; do \
				if [ -f "$$img" ]; then \
					newimg=html/img/object/64/$${img##*/}; \
					if [ $$img -nt $$newimg ]; then \
						echo "Converting $$newimg..."; \
						pngcrush -q -rem allb -reduce $$img $$newimg; \
					fi; \
				fi; \
			done; \
			if [ -d "$$gfx/artifact" ]; then \
				for img in $$gfx/artifact/*.png; do \
					if [ -f "$$img" ]; then \
						newimg=html/img/object/artifact/64/$${img##*/}; \
						if [ $$img -nt $$newimg ]; then \
							echo "Converting $$newimg..."; \
							pngcrush -q -rem allb -reduce $$img $$newimg; \
						fi; \
					fi; \
				done; \
			fi; \
		fi; \
	done
	@# Copy from DLC directories
	@for gfx in dlc/*/overload/data/gfx/*/object; do \
		if [ -d "$$gfx" ]; then \
			for img in $$gfx/*.png; do \
				if [ -f "$$img" ]; then \
					newimg=html/img/object/64/$${img##*/}; \
					if [ $$img -nt $$newimg ]; then \
						echo "Converting DLC $$newimg..."; \
						pngcrush -q -rem allb -reduce $$img $$newimg; \
					fi; \
				fi; \
			done; \
			if [ -d "$$gfx/artifact" ]; then \
				for img in $$gfx/artifact/*.png; do \
					if [ -f "$$img" ]; then \
						newimg=html/img/object/artifact/64/$${img##*/}; \
						if [ $$img -nt $$newimg ]; then \
							echo "Converting DLC artifact $$newimg..."; \
							pngcrush -q -rem allb -reduce $$img $$newimg; \
						fi; \
					fi; \
				done; \
			fi; \
		fi; \
	done
	@# Create smaller/larger sizes for object images
	@for size in 32 48 96; do \
		for img in html/img/object/64/*.png; do \
			if [ -f "$$img" ]; then \
				newimg=$${img/64/$$size}; \
				if [ $$img -nt $$newimg ]; then \
					echo "Converting $$newimg..."; \
					convert -resize $${size}x$${size} $$img tmp.png; \
					pngcrush -q -rem allb -reduce tmp.png $$newimg; \
					rm -f tmp.png; \
				fi; \
			fi; \
		done; \
	done
	@# Create smaller/larger sizes for artifact images
	@for size in 32 48 96; do \
		for img in html/img/object/artifact/64/*.png; do \
			if [ -f "$$img" ]; then \
				newimg=$${img/64/$$size}; \
				if [ $$img -nt $$newimg ]; then \
					echo "Converting $$newimg..."; \
					convert -resize $${size}x$${size} $$img tmp.png; \
					pngcrush -q -rem allb -reduce tmp.png $$newimg; \
					rm -f tmp.png; \
				fi; \
			fi; \
		done; \
	done

# Pretty-prints each of the JSON files.
pretty: html/data/$(VERSION)
	for file in $$(find html -name '*.json'); do python -mjson.tool $$file > $$file.tmp && mv $$file.tmp $$file; done

# git shortcuts to automate maintenance of the local source tree
t-engine4:
	git clone $(TOME_GIT_URL)

# git shortcut - git pull
pull:
	cd t-engine4 && \
		git remote set-url origin $(TOME_GIT_URL) && \
		git checkout master && \
		git pull
	@# Mark html/data/master/* as needing updating
	touch master

# Symlinks and working copies
master:
	scripts/link-master-src.sh

$(RELEASE_VERSIONS):
	scripts/copy-tag-src.sh $@

dlc: $(VERSIONS)
	touch dlc

.PHONY: clean pretty img pull publish

