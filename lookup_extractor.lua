#!/usr/bin/env luajit

-- Generic lookup table extractor for ToME game definitions
-- Usage: luajit lookup_extractor.lua <version> <lookup_type>
-- Currently supported: damage_types

-- Simple JSON encoder for our needs
local function json_encode_string(s)
    return '"' .. s:gsub('\\', '\\\\'):gsub('"', '\\"'):gsub('\n', '\\n'):gsub('\r', '\\r'):gsub('\t', '\\t') .. '"'
end

local function json_encode_table(t)
    local parts = {}
    for k, v in pairs(t) do
        local key = json_encode_string(k)
        local value
        if type(v) == "table" then
            value = json_encode_table(v)
        elseif type(v) == "string" then
            value = json_encode_string(v)
        else
            value = tostring(v)
        end
        table.insert(parts, key .. ":" .. value)
    end
    return "{" .. table.concat(parts, ",") .. "}"
end

-- Configuration
local version = arg[1] or "1.7.6"
local lookup_type = arg[2] or "damage_types"

-- Global stubs and game environment setup
_G.config = { settings = { cheat = false } }
_G.Map = { ACTOR = 1 }
_G.game = {
    level = {
        map = function(x, y, type) return nil end
    }
}

-- Translation stub - extracts the actual text
function _t(text, context)
    return text
end

-- DamageType system stubs
_G.DamageType = {
    initState = function(state)
        if state == nil then return {}
        elseif state == true or state == false then return {}
        else return state end
    end,
    useImplicitCrit = function(src, state) end,
    defaultProjector = function(src, x, y, type, dam, state) return dam end,
    get = function(self, type) 
        return { projector = function() end }
    end
}

-- Storage for extracted data
local damage_types = {}

-- Function to register new damage types
function newDamageType(def)
    if def.type and def.name then
        damage_types[def.type] = {
            name = def.name,
            text_color = def.text_color,
            type = def.type
        }
    end
end

-- Function to set default projector (stub)
function setDefaultProjector(func)
    -- Do nothing, just prevent errors
end

-- Create output directory
local output_dir = "html/data/" .. version .. "/lookups"
os.execute("mkdir -p " .. output_dir)

if lookup_type == "damage_types" then
    print("Extracting damage types for version " .. version .. "...")
    
    -- Load the damage types file
    local damage_file = version .. "/data/damage_types.lua"
    
    print("Loading " .. damage_file .. "...")
    dofile(damage_file)
    
    local count = 0
    for k,v in pairs(damage_types) do count = count + 1 end
    print("Found " .. count .. " damage types")
    
    -- Write JSON output
    local output_file = output_dir .. "/damage_types.json"
    local file = io.open(output_file, "w")
    if file then
        file:write(json_encode_table(damage_types))
        file:close()
        print("Damage types written to: " .. output_file)
    else
        print("Error: Could not write to " .. output_file)
        os.exit(1)
    end
    
    -- Print some examples
    print("\nExample mappings:")
    local count = 0
    for type_id, info in pairs(damage_types) do
        if count < 5 then
            print("  " .. type_id .. " -> " .. info.name)
            count = count + 1
        end
    end
    
else
    print("Error: Unsupported lookup type: " .. lookup_type)
    print("Supported types: damage_types")
    os.exit(1)
end

print("Extraction completed successfully!")