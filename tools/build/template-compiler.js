#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Modern template compiler for feature-based organization
 * Compiles Handlebars templates into separate files by feature
 */

const FEATURES = ['classes', 'races', 'talents', 'items', 'shared'];
const SRC_DIR = 'src/features';
const DIST_DIR = 'dist/js';

// Ensure output directories exist
function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// Compile templates for a specific feature
function compileFeatureTemplates(feature) {
    console.log(`Compiling ${feature} templates...`);
    
    const featureDir = path.join(SRC_DIR, feature);
    const templatesDir = path.join(featureDir, 'templates');
    const partialsDir = path.join(featureDir, 'partials');
    
    const outputTemplatesFile = path.join(DIST_DIR, 'templates', `${feature}.js`);
    const outputPartialsFile = path.join(DIST_DIR, 'templates', `${feature}-partials.js`);
    
    // Ensure output directory exists
    ensureDir(path.dirname(outputTemplatesFile));
    
    try {
        // Compile templates if they exist
        if (fs.existsSync(templatesDir)) {
            const templateFiles = fs.readdirSync(templatesDir).filter(f => f.endsWith('.handlebars'));
            if (templateFiles.length > 0) {
                console.log(`  - ${templateFiles.length} templates`);
                execSync(`handlebars --min "${templatesDir}" > "${outputTemplatesFile}"`, { stdio: 'pipe' });
            }
        }
        
        // Compile partials if they exist
        if (fs.existsSync(partialsDir)) {
            const partialFiles = fs.readdirSync(partialsDir).filter(f => f.endsWith('.handlebars'));
            if (partialFiles.length > 0) {
                console.log(`  - ${partialFiles.length} partials`);
                execSync(`handlebars --min --partial "${partialsDir}" > "${outputPartialsFile}"`, { stdio: 'pipe' });
            }
        }
        
        console.log(`✅ ${feature} templates compiled successfully`);
    } catch (error) {
        console.error(`❌ Error compiling ${feature} templates:`, error.message);
        process.exit(1);
    }
}

// Generate a template registry for dynamic loading
function generateTemplateRegistry() {
    console.log('Generating template registry...');
    
    const registry = {
        features: {},
        loaded: new Set()
    };
    
    FEATURES.forEach(feature => {
        const templatesFile = path.join(DIST_DIR, 'templates', `${feature}.js`);
        const partialsFile = path.join(DIST_DIR, 'templates', `${feature}-partials.js`);
        
        registry.features[feature] = {
            templates: fs.existsSync(templatesFile) ? `templates/${feature}.js` : null,
            partials: fs.existsSync(partialsFile) ? `templates/${feature}-partials.js` : null
        };
    });
    
    const registryCode = `
// Auto-generated template registry
window.TemplateRegistry = {
    registry: ${JSON.stringify(registry.features, null, 2)},
    loaded: new Set(),
    
    // Load templates for a specific feature
    async loadFeature(feature) {
        if (this.loaded.has(feature)) {
            return true;
        }
        
        const config = this.registry[feature];
        if (!config) {
            console.warn('Unknown feature:', feature);
            return false;
        }
        
        try {
            // Load templates
            if (config.templates) {
                await this._loadScript(config.templates);
            }
            
            // Load partials
            if (config.partials) {
                await this._loadScript(config.partials);
            }
            
            this.loaded.add(feature);
            console.log('Loaded templates for feature:', feature);
            return true;
        } catch (error) {
            console.error('Error loading feature templates:', feature, error);
            return false;
        }
    },
    
    // Load all features at once (fallback for compatibility)
    async loadAll() {
        const promises = Object.keys(this.registry).map(feature => this.loadFeature(feature));
        await Promise.all(promises);
    },
    
    // Helper to load a script dynamically
    _loadScript(src) {
        return new Promise((resolve, reject) => {
            if (document.querySelector(\`script[src="\${src}"]\`)) {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
};

// For backwards compatibility, load all templates immediately
// TODO: Remove this once we implement lazy loading
TemplateRegistry.loadAll();
`;
    
    const registryFile = path.join(DIST_DIR, 'template-registry.js');
    fs.writeFileSync(registryFile, registryCode);
    console.log('✅ Template registry generated');
}

// Main compilation process
function main() {
    console.log('🚀 Starting feature-based template compilation...');
    console.log('================================');
    
    // Ensure base output directory exists
    ensureDir(DIST_DIR);
    
    // Compile templates for each feature
    FEATURES.forEach(compileFeatureTemplates);
    
    // Generate template registry
    generateTemplateRegistry();
    
    console.log('================================');
    console.log('✅ All templates compiled successfully!');
    console.log(`📁 Output directory: ${DIST_DIR}`);
}

if (require.main === module) {
    main();
}

module.exports = { compileFeatureTemplates, generateTemplateRegistry };