// Items system - separate from talents
var items = {
    data: null,
    loaded: false,
    lookups: {
        damage_types: null
    }
};

function loadItemsData() {
    if (items.loaded) return Promise.resolve();
    
    return $.when(
        $.getJSON('data/' + versions.current + '/items.artifacts.json'),
        $.getJSON('data/' + versions.current + '/items.special.json'),
        $.getJSON('data/' + versions.current + '/lookups/damage_types.json').fail(function() {
            return {};
        })
    ).then(function(result0, result1, result2) {
        var results = [
            result0[0] || result0,
            result1[0] || result1,
            result2[0] || result2 || {}
        ];
        
        // Use pre-generated artifacts and special files
        var artifactItems = Array.isArray(results[0]) ? results[0] : [];
        var specialItems = Array.isArray(results[1]) ? results[1] : [];
        var allItems = artifactItems.concat(specialItems);
        
        items.data = {
            artifacts: artifactItems,
            special: specialItems,
            all: allItems
        };
        items.lookups.damage_types = results[2] || {};
        items.loaded = true;
        
        // Create indices for faster access
        items.data.artifactsById = {};
        items.data.specialById = {};
        items.data.allById = {};
        
        if (Array.isArray(items.data.artifacts)) {
            items.data.artifacts.forEach(function(item) {
                if (item && item.id) {
                    items.data.artifactsById[item.id] = item;
                }
            });
        }
        
        if (Array.isArray(items.data.special)) {
            items.data.special.forEach(function(item) {
                if (item && item.id) {
                    items.data.specialById[item.id] = item;
                }
            });
        }
        
        if (Array.isArray(items.data.all)) {
            items.data.all.forEach(function(item) {
                if (item && item.id) {
                    items.data.allById[item.id] = item;
                }
            });
        }
        
        items.loaded = true;
    });
}

// Function to convert damage type constant to human-readable name with styling
function getDamageTypeName(damageType) {
    if (!items.lookups.damage_types || !damageType) {
        return damageType; // Fallback to original constant
    }
    
    // Handle DamageType.FIRE format
    var cleanType = damageType;
    if (damageType.startsWith('DamageType.')) {
        cleanType = damageType.replace('DamageType.', '').toUpperCase();
    }
    
    var lookup = items.lookups.damage_types[cleanType];
    if (lookup && lookup.name) {
        var color = convertToMEColor(lookup.text_color);
        return '<span class="damage-type-name" data-original="' + damageType + '" style="color: ' + color + '; font-weight: bold;">' + lookup.name + '</span>';
    }
    
    return damageType; // Fallback to original constant
}

// Convert ToME color codes to CSS colors
function convertToMEColor(tomeColor) {
    if (!tomeColor) return '#ffffff';
    
    var colorMap = {
        '#LIGHT_RED#': '#ff6b6b',
        '#RED#': '#ff4444', 
        '#DARK_RED#': '#cc3333',
        '#CRIMSON#': '#dc143c',
        '#LIGHT_BLUE#': '#6bb6ff',
        '#BLUE#': '#4488ff',
        '#DARK_BLUE#': '#3366cc',
        '#LIGHT_GREEN#': '#6bff6b',
        '#GREEN#': '#44ff44',
        '#DARK_GREEN#': '#33cc33',
        '#YELLOW#': '#ffff44',
        '#ORANGE#': '#ffaa44',
        '#PURPLE#': '#bb44ff',
        '#VIOLET#': '#aa66ff',
        '#PINK#': '#ff66bb',
        '#WHITE#': '#ffffff',
        '#LIGHT_GREY#': '#cccccc',
        '#GREY#': '#999999',
        '#DARK_GREY#': '#666666',
        '#BLACK#': '#333333',
        '#BROWN#': '#aa7744',
        '#TAN#': '#ddaa77',
        '#UMBER#': '#886644',
        '#F53CBE#': '#f53cbe',
        '#SLATE#': '#708090',
        '#AQUA#': '#00ffff',
        '#LIME#': '#32cd32',
        '#MAGENTA#': '#ff00ff',
        '#CYAN#': '#00ffff',
        '#GOLD#': '#ffd700',
        '#SILVER#': '#c0c0c0'
    };
    
    // If it's already a hex color (like #F53CBE#), use it directly
    if (tomeColor.match(/^#[0-9A-F]{6}#$/i)) {
        return tomeColor.slice(1, -1).toLowerCase(); // Remove surrounding # symbols
    }
    
    return colorMap[tomeColor] || '#ffffff';
}

function navItems() {
    if (!items.loaded) return '<div>Loading items...</div>';
    
    // Group items by main categories and subcategories
    var artifactGroups = groupItemsByType(items.data.artifacts);
    var equipmentGroups = groupItemsByType(items.data.special);
    
    // Create navigation structure similar to talents
    var navData = {
        categories: [
            {
                id: 'artifacts',
                name: 'Artifacts',
                count: items.data.artifacts.length,
                subcategories: createSubcategoryNav(artifactGroups)
            },
            {
                id: 'equipment', 
                name: 'Equipment',
                count: items.data.special.length,
                subcategories: createSubcategoryNav(equipmentGroups)
            }
        ]
    };
    
    return Handlebars.templates.item_nav_hierarchical(navData);
}

function createSubcategoryNav(groupedItems) {
    var subcategories = [];
    
    Object.keys(groupedItems).forEach(function(mainGroup) {
        var subgroups = [];
        Object.keys(groupedItems[mainGroup]).forEach(function(subGroup) {
            var items = groupedItems[mainGroup][subGroup];
            if (items.length > 0) {
                subgroups.push({
                    id: toHtmlId(subGroup),
                    name: subGroup,
                    count: items.length
                });
            }
        });
        
        if (subgroups.length > 0) {
            subcategories.push({
                id: toHtmlId(mainGroup),
                name: mainGroup,
                count: subgroups.reduce(function(sum, sg) { return sum + sg.count; }, 0),
                subgroups: subgroups
            });
        }
    });
    
    return subcategories;
}

// Detailed equipment type groupings with subcategories
// Based on comprehensive analysis of all 47 base classes from the documentation
var equipmentGroups = {
    'Weapons': {
        'Swords': ['BASE_LONGSWORD', 'BASE_GREATSWORD'],
        'Axes': ['BASE_BATTLEAXE', 'BASE_WARAXE'],
        'Maces & Hammers': ['BASE_MACE', 'BASE_GREATMAUL'],
        'Daggers & Knives': ['BASE_KNIFE'],
        'Polearms': ['BASE_TRIDENT'],
        'Bows': ['BASE_LONGBOW'],
        'Slings': ['BASE_SLING'],
        'Ammunition': ['BASE_ARROW', 'BASE_SHOT'],
        'Staves': ['BASE_STAFF'],
        'Mindstars': ['BASE_MINDSTAR'],
        'Rods': ['BASE_ROD'],
        'Wands': ['BASE_WAND'],
        'Totems': ['BASE_TOTEM'],
        'Steam Guns': ['BASE_STEAMGUN'],
        'Steam Saws': ['BASE_STEAMSAW'],
        'Whips': ['BASE_WHIP']
    },
    'Armor & Defense': {
        'Light Armor': ['BASE_CLOTH_ARMOR', 'BASE_LIGHT_ARMOR'],
        'Heavy Armor': ['BASE_HEAVY_ARMOR', 'BASE_MASSIVE_ARMOR'],
        'Shields': ['BASE_SHIELD'],
        'Cloaks': ['BASE_CLOAK']
    },
    'Head & Extremities': {
        'Helmets': ['BASE_HELM'],
        'Caps & Hats': ['BASE_LEATHER_CAP', 'BASE_LEATHER_HAT', 'BASE_WIZARD_HAT'],
        'Special Wrappings': ['BASE_MUMMY_WRAPPING'],
        'Gauntlets': ['BASE_GAUNTLETS'],
        'Gloves': ['BASE_GLOVES'],
        'Light Boots': ['BASE_LEATHER_BOOT'],
        'Heavy Boots': ['BASE_HEAVY_BOOTS'],
        'Belts': ['BASE_LEATHER_BELT']
    },
    'Jewelry': {
        'Amulets': ['BASE_AMULET'],
        'Rings': ['BASE_RING'],
        'Torques': ['BASE_TORQUE']
    },
    'Consumables & Tools': {
        'Scrolls': ['BASE_SCROLL'],
        'Infusions': ['BASE_INFUSION'],
        'Runes': ['BASE_RUNE'],
        'Taints': ['BASE_TAINT'],
        'Tinkers': ['BASE_TINKER'],
        'Schematics': ['BASE_SCHEMATIC'],
        'Forbidden Tomes': ['BASE_FORBIDDEN_TOME']
    },
    'Miscellaneous': {
        'Gems & Materials': ['BASE_GEM'],
        'Tools': ['BASE_TOOL_MISC'],
        'Light Sources': ['BASE_LITE'],
        'Currency': ['BASE_MONEY'],
        'Mounts': ['BASE_MOUNT'],
        'Diggers': ['BASE_DIGGER']
    },
    'Lore & Books': {
        'Lore Books': ['BASE_LORE_RANDOM']
    }
};

function groupItemsByType(itemList) {
    var grouped = {};
    
    // Initialize main groups with subgroups
    Object.keys(equipmentGroups).forEach(function(mainGroup) {
        grouped[mainGroup] = {};
        Object.keys(equipmentGroups[mainGroup]).forEach(function(subGroup) {
            grouped[mainGroup][subGroup] = [];
        });
    });
    grouped['Other'] = { 'Uncategorized': [] };
    
    // Group items
    itemList.forEach(function(item) {
        var placed = false;
        
        // Find which group and subgroup this item belongs to
        Object.keys(equipmentGroups).forEach(function(mainGroup) {
            Object.keys(equipmentGroups[mainGroup]).forEach(function(subGroup) {
                if (equipmentGroups[mainGroup][subGroup].indexOf(item.base) !== -1) {
                    grouped[mainGroup][subGroup].push(item);
                    placed = true;
                }
            });
        });
        
        // If no group found, put in Other
        if (!placed) {
            grouped['Other']['Uncategorized'].push(item);
        }
    });
    
    // Sort items by material level within each subgroup and remove empty groups
    Object.keys(grouped).forEach(function(mainGroup) {
        Object.keys(grouped[mainGroup]).forEach(function(subGroup) {
            if (grouped[mainGroup][subGroup].length === 0) {
                delete grouped[mainGroup][subGroup];
            } else {
                // Sort items by material level (ascending), then by name
                grouped[mainGroup][subGroup].sort(function(a, b) {
                    // First sort by material level
                    var aLevel = a.material_level || 0;
                    var bLevel = b.material_level || 0;
                    
                    if (aLevel !== bLevel) {
                        return aLevel - bLevel;
                    }
                    
                    // If material levels are equal, sort by name
                    var aName = (a.name || '').toLowerCase();
                    var bName = (b.name || '').toLowerCase();
                    return aName.localeCompare(bName);
                });
            }
        });
        // Remove main group if all subgroups are empty
        if (Object.keys(grouped[mainGroup]).length === 0) {
            delete grouped[mainGroup];
        }
    });
    
    return grouped;
}

function listItems(category, subcategory) {
    if (!items.loaded) return '<div>Loading items...</div>';
    
    var itemList = [];
    
    if (category === 'artifacts') {
        itemList = items.data.artifacts;
    } else if (category === 'equipment') {
        itemList = items.data.special;
    } else {
        // Show all items (artifacts + equipment)
        itemList = items.data.artifacts.concat(items.data.special);
    }
    
    // Group items by equipment type
    var groupedItems = groupItemsByType(itemList);
    
    // Filter by subcategory if specified
    if (subcategory) {
        var actualSubcategory = null;
        
        // First try exact match (original name)
        if (groupedItems[subcategory]) {
            actualSubcategory = subcategory;
        } else {
            // Try to find by HTML ID match
            Object.keys(groupedItems).forEach(function(key) {
                if (toHtmlId(key) === subcategory) {
                    actualSubcategory = key;
                }
            });
        }
        
        if (actualSubcategory) {
            var filteredGroups = {};
            filteredGroups[actualSubcategory] = groupedItems[actualSubcategory];
            groupedItems = filteredGroups;
            itemList = [];
            Object.keys(groupedItems[actualSubcategory]).forEach(function(subGroup) {
                itemList = itemList.concat(groupedItems[actualSubcategory][subGroup]);
            });
        }
    }
    
    var html = Handlebars.templates.item_list_grouped({ 
        groups: groupedItems,
        category: category || 'all',
        subcategory: subcategory,
        totalItems: itemList.length
    });
    
    // Setup popup click handlers after rendering
    setTimeout(function() {
        setupItemPopupHandlers();
    }, 0);
    
    return html;
}

function setupItemPopupHandlers() {
    $('.item-popup-link').off('click').on('click', function() {
        var itemId = $(this).data('item-id');
        var itemName = $(this).data('item-name');
        
        if (itemId && itemName) {
            showItemPopup(itemId, itemName);
        }
    });
}

function showItem(itemId) {
    if (!items.loaded) return '<div>Loading item...</div>';
    
    var item = items.data.artifactsById[itemId] || items.data.specialById[itemId];
    
    if (!item) {
        return '<div>Item not found: ' + itemId + '</div>';
    }
    
    return Handlebars.templates.item_detail({ item: item });
}

// Router integration is now handled in main.js

// Item popup functions (similar to talent popup)
function showItemPopup(itemId, itemName) {
    // Store item info for popup title formatting
    window.currentPopupItem = { id: itemId, name: itemName };
    
    // Create popup HTML if it doesn't exist
    if (!$('#item-popup-overlay').length) {
        $('body').append(`
            <div id="item-popup-overlay" class="ui-popup-item">
                <div id="item-popup">
                    <div class="popup-header">
                        <h3 id="item-popup-title">Loading...</h3>
                        <button class="popup-close">&times;</button>
                    </div>
                    <div class="popup-content" id="item-popup-content">
                        <p><i class="fa fa-spinner fa-spin"></i> Loading item data...</p>
                    </div>
                </div>
            </div>
        `);
        
        // Set up close handlers
        $('#item-popup-overlay').on('click', function(e) {
            if (e.target === this) {
                hideItemPopup();
            }
        });
        
        $('.popup-close').on('click', function() {
            hideItemPopup();
        });
        
        // ESC key to close
        $(document).on('keyup.itemPopup', function(e) {
            if (e.keyCode === 27) { // ESC
                hideItemPopup();
            }
        });
    }
    
    // Show popup
    $('#item-popup-overlay').show();
    $('#item-popup-title').text(itemName);
    $('#item-popup-content').html('<p><i class="fa fa-spinner fa-spin"></i> Loading item data...</p>');
    
    // Load item data
    loadItemData(itemId, itemName);
}

function hideItemPopup() {
    $('#item-popup-overlay').hide();
    $(document).off('keyup.itemPopup');
}

function loadItemData(itemId, itemName) {
    if (!items.loaded) {
        $('#item-popup-content').html('<p style="color: #ff6b6b;">Error: No item data loaded.</p>');
        return;
    }
    
    var item = items.data.artifactsById[itemId] || items.data.specialById[itemId];
    
    if (!item) {
        $('#item-popup-content').html('<p style="color: #ff6b6b;">Error: Item not found: ' + itemId + '</p>');
        return;
    }
    
    displayItemData(item);
}

function displayItemData(item) {
    // Update popup title with colored rectangle, tier, and power source
    var titleHtml = '<div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">';
    
    // Color indicator if item has color
    if (item.color) {
        titleHtml += '<div style="width: 16px; height: 16px; background-color: rgb(' + item.color.r + ', ' + item.color.g + ', ' + item.color.b + '); border-radius: 3px; flex-shrink: 0;"></div>';
    }
    
    // Item name
    titleHtml += '<span style="color: #ffffff; font-size: 18px; font-weight: bold;">' + item.name + '</span>';
    
    // Tier (if available)
    if (item.material_level) {
        titleHtml += '<span style="color: #90EE90; font-size: 14px; background: rgba(144, 238, 144, 0.2); padding: 2px 6px; border-radius: 3px; margin-left: 10px;">Tier ' + item.material_level + '</span>';
    }
    
    // Power Source (if available)
    if (item.power_source) {
        var sources = Object.keys(item.power_source).filter(function(key) { return item.power_source[key]; });
        if (sources.length > 0) {
            titleHtml += '<span style="color: #FF69B4; font-size: 14px; background: rgba(255, 105, 180, 0.2); padding: 2px 6px; border-radius: 3px; margin-left: 6px;">' + sources.map(function(source) { return source.charAt(0).toUpperCase() + source.slice(1); }).join(', ') + '</span>';
        }
    }
    
    titleHtml += '</div>';
    $('#item-popup-title').html(titleHtml);
    
    var html = '';
    
    // Add item image (using largest size for better detail in popup)
    if (item.image) {
        // Use same logic as itemImagePath helper to build correct path
        var parts = item.image.split('/');
        if (parts.length >= 2) {
            // Insert size folder before filename
            var filename = parts.pop();
            parts.push('96');
            parts.push(filename);
            var imagePath = 'img/' + parts.join('/');
        } else {
            var imagePath = 'img/' + item.image;
        }
        html += '<img src="' + imagePath + '" style="float: left; margin: 8px 24px 16px 8px; width: 96px; height: 96px;" onerror="this.style.display=\'none\'">';
    }
    
    // CRITICAL INFO BAR - essential gameplay info (tier and power moved to header)
    var hasCriticalInfo = item.slot || (item.wielder && item.wielder.learn_talent) || 
                         (item.color_attributes && (item.color_attributes.damage_type || item.color_attributes.alt_damage_type));
    
    if (hasCriticalInfo) {
        html += '<div style="background: rgba(0, 150, 255, 0.1); padding: 10px; margin-bottom: 20px; border-radius: 5px;">';
        html += '<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">';
        
        // Equipment Slot (where it goes)
        if (item.slot) {
            html += '<div><strong style="color: #DDA0DD;">🎯 Slot:</strong> ' + item.slot + '</div>';
        }
        
        // Damage Types (important for weapon effectiveness)
        if (item.color_attributes) {
            var damageTypes = [];
            if (item.color_attributes.damage_type) {
                damageTypes.push(getDamageTypeName(item.color_attributes.damage_type));
            }
            if (item.color_attributes.alt_damage_type && item.color_attributes.alt_damage_type !== item.color_attributes.damage_type) {
                damageTypes.push(getDamageTypeName(item.color_attributes.alt_damage_type) + ' (alt)');
            }
            if (damageTypes.length > 0) {
                html += '<div><strong style="color: #FF6B6B;">⚔️ Damage:</strong> ' + damageTypes.join(', ') + '</div>';
            }
        }
        
        // Learn Talents (VERY important for character progression)
        if (item.wielder && item.wielder.learn_talent) {
            var talents = [];
            Object.keys(item.wielder.learn_talent).forEach(function(talentId) {
                var level = item.wielder.learn_talent[talentId];
                talents.push(talentId.replace('T_', '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + ' (Lv ' + level + ')');
            });
            if (talents.length > 0) {
                html += '<div><strong style="color: #4CAF50;">🎓 Teaches:</strong> ' + talents.join(', ') + '</div>';
            }
        }
        
        html += '</div></div>';
    }
    
    // DESCRIPTION
    if (item.desc) {
        html += '<div style="margin-bottom: 20px;"><strong>Description</strong><br>' + item.desc + '</div>';
    }
    
    // SPECIAL DESCRIPTION - critical item-specific info
    if (item.special_desc) {
        html += '<div style="margin-bottom: 20px; padding: 10px; background: rgba(255, 215, 0, 0.1); border-left: 4px solid gold;"><strong>Special Properties</strong><br>' + item.special_desc + '</div>';
    }
    
    // Two-column layout container
    html += '<div style="display: flex; gap: 20px; clear: both;">';
    
    // LEFT COLUMN
    html += '<div style="flex: 1; min-width: 250px;">';
    
    // COMBAT STATISTICS
    if (item.combat) {
        html += '<div style="margin-bottom: 15px;"><strong>Combat Statistics</strong>';
        html += '<table style="border: none; background: transparent; margin-top: 5px;">';
        
        if (item.combat.dam) {
            var damDisplay = item.combat.dam.display || item.combat.dam;
            html += '<tr><td style="border: none; padding: 1px 0; width: 100px; font-weight: bold; background: transparent;">Damage:</td><td style="border: none; padding: 1px 0; background: transparent;">' + damDisplay + '</td></tr>';
        }
        
        if (item.combat.apr) {
            var aprDisplay = item.combat.apr.display || item.combat.apr;
            html += '<tr><td style="border: none; padding: 1px 0; width: 100px; font-weight: bold; background: transparent;">Armor Pen:</td><td style="border: none; padding: 1px 0; background: transparent;">' + aprDisplay + '</td></tr>';
        }
        
        if (item.combat.physcrit) {
            var critDisplay = item.combat.physcrit.display || item.combat.physcrit;
            html += '<tr><td style="border: none; padding: 1px 0; width: 100px; font-weight: bold; background: transparent;">Physical Crit:</td><td style="border: none; padding: 1px 0; background: transparent;">' + critDisplay + '%</td></tr>';
        }
        
        if (item.combat.dammod) {
            var modifiers = [];
            if (item.combat.dammod.str) modifiers.push('Str: ' + (item.combat.dammod.str.display || item.combat.dammod.str));
            if (item.combat.dammod.dex) modifiers.push('Dex: ' + (item.combat.dammod.dex.display || item.combat.dammod.dex));
            if (item.combat.dammod.cun) modifiers.push('Cun: ' + (item.combat.dammod.cun.display || item.combat.dammod.cun));
            if (item.combat.dammod.wil) modifiers.push('Wil: ' + (item.combat.dammod.wil.display || item.combat.dammod.wil));
            if (item.combat.dammod.mag) modifiers.push('Mag: ' + (item.combat.dammod.mag.display || item.combat.dammod.mag));
            if (modifiers.length > 0) {
                html += '<tr><td style="border: none; padding: 1px 0; width: 100px; font-weight: bold; background: transparent;">Dam Mod:</td><td style="border: none; padding: 1px 0; background: transparent;">' + modifiers.join(', ') + '</td></tr>';
            }
        }
        
        // Weapon damage type (primary damage)
        if (item.combat.damtype) {
            html += '<tr><td style="border: none; padding: 1px 0; width: 100px; font-weight: bold; background: transparent;">Damage Type:</td><td style="border: none; padding: 1px 0; background: transparent;"><div class="weapon-damage-type">' + getDamageTypeName(item.combat.damtype) + '</div></td></tr>';
        }
        
        // Shield/special combat damage type
        if (item.special_combat && item.special_combat.damtype) {
            html += '<tr><td style="border: none; padding: 1px 0; width: 100px; font-weight: bold; background: transparent;">Shield Damage:</td><td style="border: none; padding: 1px 0; background: transparent;"><div class="shield-damage-type">' + getDamageTypeName(item.special_combat.damtype) + '</div></td></tr>';
        }
        
        if (item.combat.convert_damage) {
            var conversions = [];
            Object.keys(item.combat.convert_damage).forEach(function(type) {
                conversions.push('<div class="damage-conversion">' + getDamageTypeName(type) + ' ' + item.combat.convert_damage[type] + '%</div>');
            });
            if (conversions.length > 0) {
                html += '<tr><td style="border: none; padding: 1px 0; width: 100px; font-weight: bold; background: transparent;">Convert:</td><td style="border: none; padding: 1px 0; background: transparent;">' + conversions.join(' ') + '</td></tr>';
            }
        }
        
        if (item.combat.burst_on_crit) {
            var bursts = [];
            Object.keys(item.combat.burst_on_crit).forEach(function(type) {
                bursts.push(getDamageTypeName(type) + ' ' + item.combat.burst_on_crit[type]);
            });
            if (bursts.length > 0) {
                html += '<tr><td style="border: none; padding: 1px 0; width: 100px; font-weight: bold; background: transparent;">Burst on Crit:</td><td style="border: none; padding: 1px 0; background: transparent;">' + bursts.join(', ') + '</td></tr>';
            }
        }
        
        html += '</table></div>';
    }
    
    // LESS IMPORTANT INFO (moved to bottom of left column)
    html += '<div style="margin-top: 20px; padding: 8px; background: rgba(128, 128, 128, 0.1); border-radius: 3px;"><strong>Additional Info</strong>';
    html += '<div style="font-size: 11px; margin-top: 5px;">';
    
    var additionalInfo = [];
    
    // Classification info (moved from main section)
    if (item.type) {
        var typeText = item.type;
        if (item.subtype) {
            typeText += ' (' + item.subtype + ')';
        }
        additionalInfo.push('Type: ' + typeText);
    }
    
    if (item.base) {
        additionalInfo.push('Category: ' + item.base);
    }
    
    if (item.cost) {
        var costDisplay = item.cost.display || item.cost;
        additionalInfo.push('Cost: ' + costDisplay + ' gold');
    }
    
    if (item.require && item.require.stat) {
        var reqText = [];
        Object.keys(item.require.stat).forEach(function(stat) {
            var statValue = item.require.stat[stat].display || item.require.stat[stat];
            reqText.push(stat.toUpperCase() + ' ' + statValue);
        });
        if (reqText.length > 0) {
            additionalInfo.push('Requires: ' + reqText.join(', '));
        }
    }
    
    if (item.rarity) {
        additionalInfo.push('Rarity: ' + item.rarity);
    }
    
    if (item.unique) {
        additionalInfo.push('Unique');
    }
    
    if (item.quest) {
        additionalInfo.push('Quest Item');
    }
    
    if (item.encumber) {
        additionalInfo.push('Encumbrance: ' + item.encumber);
    }
    
    if (item.max_power) {
        additionalInfo.push('Max Power: ' + item.max_power);
    }
    
    if (item.unided_name) {
        additionalInfo.push('Unidentified: "' + item.unided_name + '"');
    }
    
    if (item.not_in_stores) {
        additionalInfo.push('Not sold in stores');
    }
    
    html += additionalInfo.join(' • ');
    html += '</div></div>';
    
    html += '</div>'; // Close LEFT COLUMN
    
    // RIGHT COLUMN
    html += '<div style="flex: 1; min-width: 250px;">';
    
    // WIELDER EFFECTS (condensed)
    if (item.wielder) {
        html += '<div style="margin-bottom: 15px;"><strong>Wielder Effects</strong>';
        html += '<table style="border: none; background: transparent; margin-top: 5px;">';
        
        // Most important combat bonuses only
        var combatStats = ['combat_atk', 'combat_def', 'combat_dam', 'combat_critical_power',
                          'combat_physcrit', 'combat_spellcrit', 'combat_mindcrit', 'combat_steamcrit'];
        combatStats.forEach(function(stat) {
            if (item.wielder[stat]) {
                var displayName = stat.replace('combat_', '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                var value = item.wielder[stat].display || item.wielder[stat];
                if (typeof value === 'number' && value > 0) value = '+' + value;
                html += '<tr><td style="border: none; padding: 1px 0; width: 100px; font-weight: bold; background: transparent;">' + displayName + ':</td><td style="border: none; padding: 1px 0; background: transparent;">' + value + '</td></tr>';
            }
        });
        
        // Resources (condensed)
        var resources = ['max_life', 'max_mana', 'max_psi', 'max_stamina'];
        resources.forEach(function(stat) {
            if (item.wielder[stat]) {
                var displayName = stat.replace('max_', '').replace(/\b\w/g, l => l.toUpperCase());
                var value = item.wielder[stat].display || item.wielder[stat];
                if (typeof value === 'number' && value > 0) value = '+' + value;
                html += '<tr><td style="border: none; padding: 1px 0; width: 100px; font-weight: bold; background: transparent;">' + displayName + ':</td><td style="border: none; padding: 1px 0; background: transparent;">' + value + '</td></tr>';
            }
        });
        
        // Resistances (condensed)
        if (item.wielder.resists) {
            var resists = [];
            Object.keys(item.wielder.resists).forEach(function(type) {
                var value = item.wielder.resists[type].display || item.wielder.resists[type];
                if (typeof value === 'number' && value > 0) value = '+' + value;
                resists.push(getDamageTypeName(type) + ' ' + value + '%');
            });
            if (resists.length > 0) {
                html += '<tr><td style="border: none; padding: 1px 0; width: 100px; font-weight: bold; background: transparent;">Resist:</td><td style="border: none; padding: 1px 0; background: transparent;">' + resists.join(', ') + '</td></tr>';
            }
        }
        
        // Damage increases (condensed)
        if (item.wielder.inc_damage) {
            var damages = [];
            Object.keys(item.wielder.inc_damage).forEach(function(type) {
                var value = item.wielder.inc_damage[type].display || item.wielder.inc_damage[type];
                if (typeof value === 'number' && value > 0) value = '+' + value;
                damages.push(getDamageTypeName(type) + ' ' + value + '%');
            });
            if (damages.length > 0) {
                html += '<tr><td style="border: none; padding: 1px 0; width: 100px; font-weight: bold; background: transparent;">+Damage:</td><td style="border: none; padding: 1px 0; background: transparent;">' + damages.join(', ') + '</td></tr>';
            }
        }
        
        // (Learn Talent moved to critical info bar at top)
        
        // Special attack mechanics
        if (item.wielder.on_melee_hit) {
            var meleeHits = [];
            Object.keys(item.wielder.on_melee_hit).forEach(function(type) {
                var value = item.wielder.on_melee_hit[type].display || item.wielder.on_melee_hit[type];
                meleeHits.push(getDamageTypeName(type) + ' ' + value);
            });
            if (meleeHits.length > 0) {
                html += '<tr><td style="border: none; padding: 1px 0; width: 100px; font-weight: bold; background: transparent;">Melee Hit:</td><td style="border: none; padding: 1px 0; background: transparent;">' + meleeHits.join(', ') + '</td></tr>';
            }
        }
        
        if (item.wielder.melee_project) {
            var meleeProj = [];
            Object.keys(item.wielder.melee_project).forEach(function(type) {
                var value = item.wielder.melee_project[type].display || item.wielder.melee_project[type];
                meleeProj.push(getDamageTypeName(type) + ' ' + value);
            });
            if (meleeProj.length > 0) {
                html += '<tr><td style="border: none; padding: 1px 0; width: 100px; font-weight: bold; background: transparent;">Melee Proj:</td><td style="border: none; padding: 1px 0; background: transparent;">' + meleeProj.join(', ') + '</td></tr>';
            }
        }
        
        if (item.wielder.ranged_project) {
            var rangedProj = [];
            Object.keys(item.wielder.ranged_project).forEach(function(type) {
                var value = item.wielder.ranged_project[type].display || item.wielder.ranged_project[type];
                rangedProj.push(getDamageTypeName(type) + ' ' + value);
            });
            if (rangedProj.length > 0) {
                html += '<tr><td style="border: none; padding: 1px 0; width: 100px; font-weight: bold; background: transparent;">Ranged Proj:</td><td style="border: none; padding: 1px 0; background: transparent;">' + rangedProj.join(', ') + '</td></tr>';
            }
        }
        
        // Special effects (very condensed)
        var specialEffects = [];
        ['see_invisible', 'infravision', 'confusion_immune', 'fear_immune', 'stun_immune', 'poison_immune', 'disease_immune', 'blind_immune'].forEach(function(effect) {
            if (item.wielder[effect]) {
                specialEffects.push(effect.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
            }
        });
        
        if (specialEffects.length > 0) {
            html += '<tr><td style="border: none; padding: 1px 0; width: 100px; font-weight: bold; background: transparent;">Special:</td><td style="border: none; padding: 1px 0; background: transparent;">' + specialEffects.join(', ') + '</td></tr>';
        }
        
        html += '</table></div>';
    }
    
    html += '</div>'; // Close RIGHT COLUMN
    html += '</div>'; // Close two-column container
    
    // CARRIER EFFECTS (inventory effects while not wielding)
    if (item.carrier) {
        html += '<div style="margin-top: 15px; padding: 8px; background: rgba(100, 100, 255, 0.1); border-left: 4px solid #6666ff;"><strong>Carrier Effects</strong> (while in inventory)<br>';
        html += '<div style="margin-top: 5px;">';
        
        var carrierEffects = [];
        Object.keys(item.carrier).forEach(function(effect) {
            var value = item.carrier[effect].display || item.carrier[effect];
            if (effect === 'lite') {
                carrierEffects.push('Light: ' + value);
            } else if (effect === 'auto_id') {
                carrierEffects.push('Auto-Identify: ' + value + '%');
            } else if (effect === 'has_transmo' || effect === 'has_transmo_orcs') {
                carrierEffects.push('Transmogrification Available');
            } else if (typeof value === 'object') {
                // Handle complex objects like on_melee_hit
                var subEffects = [];
                Object.keys(value).forEach(function(subKey) {
                    subEffects.push(subKey + ': ' + value[subKey]);
                });
                carrierEffects.push(effect.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + ' (' + subEffects.join(', ') + ')');
            } else {
                var displayName = effect.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                if (typeof value === 'number' && value > 0) value = '+' + value;
                carrierEffects.push(displayName + ': ' + value);
            }
        });
        
        html += carrierEffects.join(', ');
        html += '</div></div>';
    }
    
    // FLAVOR TEXT (if exists, at bottom)
    if (item.flavor_name) {
        html += '<div style="margin-top: 15px; font-style: italic; text-align: center; color: #aaa;">' + item.flavor_name + '</div>';
    }
    
    // Add collapsible raw JSON section at the end
    html += '<div style="margin-top: 30px; border-top: 1px solid #444; padding-top: 15px;">';
    html += '<div style="cursor: pointer; padding: 8px; background: #2a2a2a; border: 1px solid #555; border-radius: 4px; user-select: none;" onclick="toggleItemJsonDisplay()">';
    html += '<span id="json-toggle-icon">▼</span> <strong>Raw Item Data (JSON)</strong>';
    html += '</div>';
    html += '<div id="item-json-display" style="display: none; margin-top: 10px; padding: 15px; background: #1a1a1a; border: 1px solid #555; border-radius: 4px; font-family: monospace; font-size: 12px; line-height: 1.4; max-height: 400px; overflow-y: auto;">';
    html += '<pre style="margin: 0; color: #e0e0e0; white-space: pre-wrap; word-wrap: break-word;">' + JSON.stringify(item, null, 2) + '</pre>';
    html += '</div>';
    html += '</div>';
    
    $('#item-popup-content').html(html);
}

function toggleItemJsonDisplay() {
    var jsonDisplay = $('#item-json-display');
    var toggleIcon = $('#json-toggle-icon');
    
    if (jsonDisplay.is(':visible')) {
        jsonDisplay.slideUp(200);
        toggleIcon.text('▼');
    } else {
        jsonDisplay.slideDown(200);
        toggleIcon.text('▲');
    }
}