#!/usr/bin/env luajit

-- Direct Item Extractor - Parse Lua files directly without game engine
-- Extracts newEntity calls from ToME object definition files

local json = require 'lib.json4lua.json.json'

-- Configuration
local config = {
    version = arg[1] or "1.7.6",
    output_dir = "html/data/" .. (arg[1] or "1.7.6") .. "/",
    
    -- Item categories for organization
    categories = {
        weapons = { "weapon" },
        armor = { "armor", "shield" },
        jewelry = { "jewelry" },
        consumables = { "scroll", "infusion", "rune", "potion" },
        special = { "gem", "tool", "misc", "lore", "money", "alchemist-gem", "chest", "lite", "mount", "tome", "charm", "ammo" }
    },
    
    -- Fields to exclude (functions and problematic content)
    exclude_fields = {
        -- Functions that can't be serialized
        "info", "use_talent", "on_wear", "on_takeoff", "on_pickup", "on_drop",
        "special", "use_power", "spell_feedback", "tactical", "auto_pickup_sound",
        "twohanded", "archery", "archery_kind", "archery_ammo", "ego_chance",
        "egos", "greater_ego", "randart_able", "random_ego", "plot", "quest",
        "resolvers", "resolver", "tinker", "moddable_tile",
        
        -- Runtime/engine internals
        "__ATOMIC", "__tagged", "__last_module_name", "__LOADED",
        "particles", "shader", "particle", "particle_args",
        "use_simple_scroll", "use_sound", "fire_destroy"
    },
    
    -- Base classes to skip (they are templates)
    skip_base_classes = {
        "BASE_WEAPON", "BASE_ARMOR", "BASE_SHIELD", "BASE_CLOAK", "BASE_BELT",
        "BASE_BOOTS", "BASE_GLOVES", "BASE_HELM", "BASE_JEWELRY", "BASE_RING",
        "BASE_AMULET", "BASE_TORQUE", "BASE_LITE", "BASE_SCROLL", "BASE_INFUSION",
        "BASE_RUNE", "BASE_GEM", "BASE_TOOL_MISC", "BASE_LORE", "BASE_MONEY"
    }
}

-- Global variables to track parsing state
local current_entities = {}
local base_entities = {}

-- Stub functions for ToME Lua code execution
_t = function(text) return text end
tformat = function(text, ...) return text end

-- Add tformat as a string method
local string_mt = getmetatable("")
if string_mt then
    string_mt.__index.tformat = function(self, ...)
        return tformat(self, ...)
    end
end

-- Create a safe environment for executing Lua files
local function create_safe_env(current_entities, base_entities)
    local env = {
        -- Lua basics
        pairs = pairs,
        ipairs = ipairs,
        next = next,
        type = type,
        tostring = tostring,
        tonumber = tonumber,
        print = function() end, -- Suppress prints
        
        -- Math library
        math = math,
        
        -- String library  
        string = string,
        
        -- Table library
        table = table,
        
        -- ToME stubs
        _t = _t,
        tformat = tformat,
        
        -- Colors - comprehensive color support
        colors = setmetatable({
            WHITE = {r=255, g=255, b=255},
            BLACK = {r=0, g=0, b=0},
            RED = {r=255, g=0, b=0},
            GREEN = {r=0, g=255, b=0},
            BLUE = {r=0, g=0, b=255},
            YELLOW = {r=255, g=255, b=0},
            PURPLE = {r=255, g=0, b=255},
            CYAN = {r=0, g=255, b=255},
            ORANGE = {r=255, g=165, b=0},
            VIOLET = {r=238, g=130, b=238},
            SLATE = {r=112, g=128, b=144},
            UMBER = {r=139, g=69, b=19},
            AQUAMARINE = {r=127, g=255, b=212},
            LIGHT_BLUE = {r=173, g=216, b=230},
            LIGHT_GREEN = {r=144, g=238, b=144},
            LIGHT_RED = {r=255, g=182, b=193},
            DARK_GREEN = {r=0, g=100, b=0},
            DARK_BLUE = {r=0, g=0, b=139},
            GREY = {r=128, g=128, b=128},
            GOLD = {r=255, g=215, b=0},
            SILVER = {r=192, g=192, b=192},
            BROWN = {r=165, g=42, b=42},
            PINK = {r=255, g=192, b=203},
            ROYAL_BLUE = {r=65, g=105, b=225},
            STEEL_BLUE = {r=70, g=130, b=180},
            LIGHT_STEEL_BLUE = {r=176, g=196, b=222},
            ORCHID = {r=218, g=112, b=214},
            CRIMSON = {r=220, g=20, b=60},
            SALMON = {r=250, g=128, b=114},
            OLIVE_DRAB = {r=107, g=142, b=35},
            CADET_BLUE = {r=95, g=158, b=160}
        }, {
            __index = function(t, k) 
                return {r=255, g=255, b=255} -- Default color
            end
        }),
        
        -- Stats constants
        Stats = {
            STAT_STR = "str",
            STAT_DEX = "dex",
            STAT_CON = "con", 
            STAT_MAG = "mag",
            STAT_WIL = "wil",
            STAT_CUN = "cun",
            STAT_LCK = "lck"
        },
        
        -- DamageType - simple string constants only (no complex projector functions)
        DamageType = setmetatable({
            PHYSICAL = "PHYSICAL",
            FIRE = "FIRE",  -- Simple string to avoid complex projector function
            COLD = "COLD",
            LIGHTNING = "LIGHTNING",
            ACID = "ACID",
            NATURE = "NATURE",
            TEMPORAL = "TEMPORAL",
            ARCANE = "ARCANE",
            MIND = "MIND",
            DARKNESS = "DARKNESS",
            LIGHT = "LIGHT",
            BLIGHT = "BLIGHT",
            ICE = "ICE",
            DRAINLIFE = "DRAINLIFE",
            -- Additional damage types for completeness
            FIREBURN = "FIREBURN",
            FIRE_STUN = "FIRE_STUN", 
            FIRE_DRAIN = "FIRE_DRAIN",
            FLAMESHOCK = "FLAMESHOCK"
        }, {
            __index = function(t, k) 
                -- Always return simple strings for damage types
                return tostring(k)
            end
        }),
        
        -- Talents - comprehensive talent constants
        Talents = setmetatable({
            T_COMMAND_STAFF = "T_COMMAND_STAFF",
            T_MANATHRUST = "T_MANATHRUST",
            T_FLAME = "T_FLAME",
            T_LIGHTNING = "T_LIGHTNING",
            T_FIRE_BREATH = "T_FIRE_BREATH",
            T_ACID_BREATH = "T_ACID_BREATH",
            T_POISON_BREATH = "T_POISON_BREATH",
            T_LIGHTNING_BREATH_HYDRA = "T_LIGHTNING_BREATH_HYDRA",
            T_SHATTERING_BLOW = "T_SHATTERING_BLOW",
            T_CORROSIVE_WORM = "T_CORROSIVE_WORM",
            T_WORM_ROT = "T_WORM_ROT",
            T_BLOOD_GRASP = "T_BLOOD_GRASP",
            T_GRAVITY_SPIKE = "T_GRAVITY_SPIKE",
            T_IMPENDING_DOOM = "T_IMPENDING_DOOM",
            T_BONE_SPEAR = "T_BONE_SPEAR",
            T_FLARE = "T_FLARE",
            T_GUN_SUREKILL = "T_GUN_SUREKILL",
            T_INERTIAL_SHOT = "T_INERTIAL_SHOT",
            T_BLOCK = "T_BLOCK",
            T_SOUL_PURGE = "T_SOUL_PURGE"
        }, {
            __index = function(t, k)
                return tostring(k)
            end
        }),
        
        -- Elements - elemental type constants
        Element = setmetatable({
            FIRE = "FIRE",
            COLD = "COLD", 
            LIGHTNING = "LIGHTNING",
            ACID = "ACID",
            NATURE = "NATURE",
            ARCANE = "ARCANE",
            LIGHT = "LIGHT",
            DARKNESS = "DARKNESS"
        }, {
            __index = function(t, k)
                return tostring(k)
            end
        }),
        
        -- Effects - effect constants
        EFF_RECALL = "EFF_RECALL",
        
        -- Map constants
        Map = setmetatable({
            ACTOR = "ACTOR",
            TERRAIN = "TERRAIN",
            OBJECT = "OBJECT"
        }, {
            __index = function(t, k)
                return tostring(k)
            end
        }),
        
        -- Slot constants
        MAINHAND = "MAINHAND",
        OFFHAND = "OFFHAND",
        
        -- Engine stubs
        engine = setmetatable({
            interface = {
                ActorStats = {
                    STAT_STR = "str",
                    STAT_DEX = "dex",
                    STAT_CON = "con",
                    STAT_MAG = "mag",
                    STAT_WIL = "wil",
                    STAT_CUN = "cun",
                    STAT_LCK = "lck"
                },
                PartyLore = {
                    lore_defs = {}
                }
            }
        }, {
            __index = function(t, k)
                return {}
            end
        }),
        
        -- World stub
        world = {
            gainAchievement = function() end
        },
        
        -- Resolvers - more comprehensive resolver support
        resolvers = setmetatable({}, {
            __index = function(t, k)
                if k == "genericlast" then
                    return function(func) return function() end end
                elseif k == "rngrange" then
                    return function(min, max) return math.floor((min + max) / 2) end
                elseif k == "image_material" then
                    return function() return "default_image.png" end
                elseif k == "moddable_tile" then
                    return function() return "default_tile" end
                elseif k == "mbonus" then
                    return function(base, bonus) return base + bonus end
                elseif k == "rngavg" then
                    return function(min, max) return math.floor((min + max) / 2) end
                else
                    return function(...) 
                        return {resolver_type = k, args = {...}}
                    end
                end
            end
        }),
        
        -- RNG with comprehensive support
        rng = {
            range = function(min, max) return math.floor((min + max) / 2) end,
            percent = function(chance) return chance > 50 end,
            tableRemove = function(tbl) return tbl[1] or "default" end,
            table = function(tbl) return tbl[1] or tbl end
        },
        
        -- Damage type creation stub - prevent complex damage types from overriding our simple ones
        newDamageType = function(t)
            -- Ignore complex damage type definitions, keep our simple string constants
            return nil
        end,
        
        -- Entity creation function
        newEntity = function(t)
            if not t then return end
            
            -- Debug logging for specific items (disabled)
            -- if t.name and t.name:match("Everpyre") then
            --     print("DEBUG: Processing Everpyre - name:", t.name)
            --     print("  unique:", t.unique)
            --     print("  base:", t.base)
            --     print("  define_as:", t.define_as)
            -- end
            
            -- Wrap entity processing in pcall to continue on errors
            local success, result = pcall(function()
            
            -- Handle base inheritance
            local entity = {}
            if t.base and base_entities[t.base] then
                -- Copy all fields from base entity
                for k, v in pairs(base_entities[t.base]) do
                    if type(v) == "table" then
                        -- Deep copy tables
                        entity[k] = {}
                        for sub_k, sub_v in pairs(v) do
                            entity[k][sub_k] = sub_v
                        end
                    else
                        entity[k] = v
                    end
                end
            end
            
            -- Apply current entity fields (override base)
            -- Store the original define_as from the current entity
            local original_define_as = t.define_as
            
            for k, v in pairs(t) do
                entity[k] = v  -- Include base field for classification
            end
            
            -- Ensure define_as is not inherited from base entity
            entity.define_as = original_define_as
            
            -- Clean the entity data
            local cleaned = {}
            for k, v in pairs(entity) do
                if not config.exclude_fields[k] and type(v) ~= "function" then
                    if type(v) == "table" and not v.resolver_type then
                        -- Recursively clean tables
                        local cleaned_table = {}
                        local has_content = false
                        for sub_k, sub_v in pairs(v) do
                            if type(sub_v) ~= "function" then
                                cleaned_table[sub_k] = sub_v
                                has_content = true
                            end
                        end
                        if has_content then
                            cleaned[k] = cleaned_table
                        end
                    else
                        cleaned[k] = v
                    end
                end
            end
            
            -- Debug after cleaning (disabled)
            -- if cleaned.name and cleaned.name:match("Everpyre") then
            --     print("DEBUG: After cleaning Everpyre:")
            --     print("  cleaned.name:", cleaned.name)
            --     print("  cleaned.unique:", cleaned.unique)
            --     print("  cleaned.base:", cleaned.base)
            --     print("  cleaned.define_as:", cleaned.define_as)
            --     print("  type(cleaned.define_as):", type(cleaned.define_as))
            -- end
            
            -- Store entity
            if cleaned.define_as then
                if cleaned.define_as:match("^BASE_") then
                    base_entities[cleaned.define_as] = cleaned
                elseif cleaned.base or cleaned.unique then  -- Store if has base field OR is unique (artifact)
                    current_entities[#current_entities + 1] = cleaned
                end
            elseif cleaned.base or cleaned.unique then  -- Store if has base field OR is unique
                current_entities[#current_entities + 1] = cleaned
            end
            
            return cleaned
            
            end) -- end of pcall function
            
            if not success then
                -- Skip this entity if there's an error, but continue processing
                return nil
            else
                return result
            end
        end,
        
        -- Loading stubs
        load = function() end,
        loadIfNot = function() end,
        loaded = {},
        entity_mod = function() end,
        
        -- Game state with more comprehensive stubs
        game = {
            level = { 
                map = {},
                data = {}
            },
            player = {
                level = 1,
                faction = "allied"
            },
            state = {
                getWorldArtifacts = function() return {} end,
                birth = {}
            },
            zone = {},
            turn = 1
        },
        
        mod = setmetatable({}, {
            __index = function(t, k) return {} end
        }),
        
        -- Class stub
        class = {
            triggerHook = function() end
        },
        
        -- Require stub for constants - must return the same constants we define in Stats
        require = function(module)
            if module:match("ActorStats") then
                return {
                    STAT_STR = "str",
                    STAT_DEX = "dex", 
                    STAT_CON = "con",
                    STAT_MAG = "mag",
                    STAT_WIL = "wil",
                    STAT_CUN = "cun",
                    STAT_LCK = "lck"  -- Include STAT_LCK which was missing!
                }
            elseif module:match("DamageType") then
                -- Return our simple DamageType constants to avoid complex projector functions
                return env.DamageType
            elseif module:match("ActorTalents") then
                return setmetatable({}, {
                    __index = function(t, k) return k end  -- Return talent name as constant
                })
            else
                return {}
            end
        end,
        
        -- Additional stubs for missing functions
        importEntity = function(e) 
            -- Convert imported entity to newEntity call
            if e and e.name then
                env.newEntity(e)
            end
        end,
        
        -- Stub for interface access
        interface = setmetatable({}, {
            __index = function(t, k) return {} end
        }),
        
        -- Stub for Engine access
        Engine = setmetatable({}, {
            __index = function(t, k) return function() end end
        }),
        
        -- Generic function stubs
        getRandomSchematic = function() return {} end,
        getSchematics = function() return {} end
    }
    
    -- Set up Talents after environment creation
    -- (Stats are now defined earlier in environment creation)
    
    env.Talents = setmetatable({}, {
        __index = function(t, k) return k end  -- Return talent name as constant
    })
    
    -- Make env available within its own environment
    env.env = env
    
    return env
end

-- Find all object files to process
local function find_object_files(base_path)
    local files = {}
    local dirs_to_check = {
        base_path .. "/data/general/objects/",
        base_path .. "/data-ashes-urhrok/general/objects/",
        base_path .. "/data-orcs/general/objects/", 
        base_path .. "/data-possessors/general/objects/",
        base_path .. "/data-cults/general/objects/"
    }
    
    for _, dir in ipairs(dirs_to_check) do
        local handle = io.popen("find '" .. dir .. "' -name '*.lua' -type f 2>/dev/null")
        if handle then
            for file in handle:lines() do
                -- Skip ego files and random artifacts for now
                if not file:match("/egos/") and not file:match("/random%-artifacts/") then
                    table.insert(files, file)
                end
            end
            handle:close()
        end
    end
    
    return files
end

-- Parse a single Lua file safely
local function parse_file(filename)
    print("Processing: " .. filename)
    
    local file = io.open(filename, "r")
    if not file then
        print("  Warning: Could not open " .. filename)
        return
    end
    
    local content = file:read("*all")
    file:close()
    
    -- Create safe environment and execute
    local env = create_safe_env(current_entities, base_entities)
    local func, err = loadstring(content)
    
    if not func then
        print("  Error parsing " .. filename .. ": " .. (err or "unknown"))
        return
    end
    
    -- Execute in safe environment
    -- Also set env in global environment for any global env references
    _G.env = env
    
    setfenv(func, env)
    local success, exec_err = pcall(func)
    
    if not success then
        print("  Error executing " .. filename .. ": " .. (exec_err or "unknown"))
        
        -- Enhanced error reporting - try to extract more specific information
        if exec_err then
            -- Extract line number if available
            local line_match = exec_err:match(":(%d+):")
            if line_match then
                print("  Error on line: " .. line_match)
                
                -- Try to show the problematic line
                local lines = {}
                for line in content:gmatch("[^\r\n]+") do
                    table.insert(lines, line)
                end
                
                local line_num = tonumber(line_match)
                if line_num and lines[line_num] then
                    print("  Problematic line: " .. lines[line_num])
                    -- Show some context
                    if lines[line_num - 1] then print("  Line " .. (line_num-1) .. ": " .. lines[line_num - 1]) end
                    if lines[line_num + 1] then print("  Line " .. (line_num+1) .. ": " .. lines[line_num + 1]) end
                end
            end
            
            -- Look for specific patterns that might help identify the issue
            if exec_err:match("table index is nil") then
                print("  DETAILED ANALYSIS:")
                print("    Stats table exists?", env.Stats and "yes" or "no")
                print("    DamageType table exists?", env.DamageType and "yes" or "no")
                print("    Talents table exists?", env.Talents and "yes" or "no")
                
                -- Try to identify which table might be nil by looking at the error context
                if exec_err:match("Stats%.") then
                    print("    ERROR: Stats table access issue")
                    if env.Stats then
                        for k, v in pairs(env.Stats) do
                            print("      Stats." .. k .. " = " .. tostring(v))
                        end
                    end
                elseif exec_err:match("DamageType%.") then
                    print("    ERROR: DamageType table access issue")
                elseif exec_err:match("Talents%.") then
                    print("    ERROR: Talents table access issue")
                    if env.Talents then
                        print("      Talents metatable: " .. tostring(getmetatable(env.Talents)))
                    end
                else
                    print("    ERROR: Unknown table access issue")
                end
            elseif exec_err:match("attempt to index") then
                print("  INDEXING ERROR DETAILS:")
                -- Try to extract what was being indexed
                local indexed_match = exec_err:match("attempt to index (%w+)")
                if indexed_match then
                    print("    Attempting to index:", indexed_match)
                    print("    Value of", indexed_match, "in env:", env[indexed_match] and tostring(env[indexed_match]) or "nil")
                end
            end
        end
        return
    end
    
    print("  Found " .. #current_entities .. " entities")
end

-- Determine item category
local function categorize_item(item)
    local item_type = item.type or "misc"
    
    for category, types in pairs(config.categories) do
        for _, type_name in ipairs(types) do
            if item_type == type_name then
                return category
            end
        end
    end
    
    return "special"
end

-- Check if item should be skipped
local function should_skip_item(item)
    -- Skip base classes
    if item.define_as then
        for _, base_class in ipairs(config.skip_base_classes) do
            if item.define_as == base_class then
                return true
            end
        end
    end
    
    -- Skip items without names
    if not item.name or item.name == "" then
        return true
    end
    
    -- Skip quest/plot items
    if item.no_drop or item.plot then
        return true
    end
    
    -- Skip tinker components/templates
    if item.name and item.name:match("^%%s") then
        return true
    end
    
    if item.define_as and item.define_as:match("^TINKER_") and (not item.slot or item.slot == "none") then
        return true
    end
    
    return false
end

-- Main extraction function
local function extract_items()
    print("ToME Direct Item Extractor v1.0")
    print("Version: " .. config.version)
    print("Output: " .. config.output_dir)
    print()
    
    -- Create output directory
    os.execute("mkdir -p '" .. config.output_dir .. "'")
    
    -- Find and process all object files
    local base_path = config.version
    local object_files = find_object_files(base_path)
    
    print("Found " .. #object_files .. " object files to process")
    print()
    
    -- Process each file
    for _, file in ipairs(object_files) do
        parse_file(file)
    end
    
    print()
    print("Processing complete. Found " .. #current_entities .. " total entities")
    print("Found " .. #base_entities .. " base entities (will be skipped)")
    
    -- Debug: count what gets filtered
    local skipped_no_name = 0
    local skipped_plot = 0
    local skipped_base = 0
    
    for _, entity in ipairs(current_entities) do
        if not entity.name or entity.name == "" then
            skipped_no_name = skipped_no_name + 1
        elseif entity.no_drop or entity.plot then
            skipped_plot = skipped_plot + 1
        elseif entity.define_as then
            for _, base_class in ipairs(config.skip_base_classes) do
                if entity.define_as == base_class then
                    skipped_base = skipped_base + 1
                    break
                end
            end
        end
    end
    
    print("Debug filters:")
    print("  Skipped no name: " .. skipped_no_name)
    print("  Skipped plot items: " .. skipped_plot) 
    print("  Skipped base classes: " .. skipped_base)
    
    -- Categorize items
    local items_by_category = {}
    local total_items = 0
    
    -- Initialize categories
    for category, _ in pairs(config.categories) do
        items_by_category[category] = {}
    end
    
    -- Process each entity
    for _, entity in ipairs(current_entities) do
        if not should_skip_item(entity) then
            local category = categorize_item(entity)
            
            -- Add ID if missing
            if not entity.id then
                entity.id = entity.define_as or ("ITEM_" .. total_items)
            end
            
            table.insert(items_by_category[category], entity)
            total_items = total_items + 1
            
            if total_items <= 5 then
                print(string.format("Item %d: %s (%s) -> %s", total_items, entity.name or "unnamed", entity.type or "no_type", category))
            end
        end
    end
    
    print(string.format("Processed %d items total", total_items))
    
    -- Sort items within categories
    for category, items in pairs(items_by_category) do
        table.sort(items, function(a, b)
            local name_a = a.name or ""
            local name_b = b.name or ""
            return name_a:upper() < name_b:upper()
        end)
        print(string.format("Category %s: %d items", category, #items))
    end
    
    -- Generate JSON files
    print()
    print("Generating JSON files...")
    
    -- Main index file
    local items_index = {
        tag = "tome-" .. config.version,
        version = config.version,
        item_categories = {}
    }
    
    for category, _ in pairs(items_by_category) do
        table.insert(items_index.item_categories, category)
    end
    table.sort(items_index.item_categories)
    
    local index_file = io.open(config.output_dir .. "items.json", "w")
    index_file:write(json.encode(items_index))
    index_file:close()
    
    -- Category files
    for category, items in pairs(items_by_category) do
        if #items > 0 then
            local category_file = io.open(config.output_dir .. "items." .. category .. ".json", "w")
            category_file:write(json.encode(items))
            category_file:close()
        end
    end
    
    -- Also generate artifacts and special files for JavaScript compatibility
    local artifacts = {}
    local special = {}
    
    for category, items in pairs(items_by_category) do
        for _, item in ipairs(items) do
            if item.unique then
                table.insert(artifacts, item)
            else
                table.insert(special, item)
            end
        end
    end
    
    -- Sort artifacts and special items
    table.sort(artifacts, function(a, b) return (a.name or ""):upper() < (b.name or ""):upper() end)
    table.sort(special, function(a, b) return (a.name or ""):upper() < (b.name or ""):upper() end)
    
    -- Write artifacts file
    if #artifacts > 0 then
        local artifacts_file = io.open(config.output_dir .. "items.artifacts.json", "w")
        artifacts_file:write(json.encode(artifacts))
        artifacts_file:close()
    end
    
    -- Write special file  
    if #special > 0 then
        local special_file = io.open(config.output_dir .. "items.special.json", "w")
        special_file:write(json.encode(special))
        special_file:close()
    end
    
    -- Search index
    local search_items = {}
    for category, items in pairs(items_by_category) do
        for _, item in ipairs(items) do
            if item.name and item.name ~= "" then
                table.insert(search_items, {
                    name = item.name,
                    desc = string.format("%s/%s", item.type or "unknown", item.subtype or ""),
                    href = string.format("items/%s/%s", category, (item.name:lower():gsub("[^%w]", "_")))
                })
            end
        end
    end
    
    table.sort(search_items, function(a, b) return a.name < b.name end)
    
    local search_file = io.open(config.output_dir .. "search.items.json", "w")
    search_file:write(json.encode(search_items))
    search_file:close()
    
    print(string.format("✅ Generated %d category files with %d total items", #items_index.item_categories, total_items))
    print(string.format("   - Artifacts: %d", #artifacts))
    print(string.format("   - Special items: %d", #special))
end

-- Run the extraction
extract_items()