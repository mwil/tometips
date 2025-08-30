-- Base extractor module with common functionality
-- All feature-specific extractors inherit from this

require 'tip.engine'
local json = require 'lib.json4lua.json.json'

local BaseExtractor = {}

-- Initialize the extractor with version and output settings
function BaseExtractor:new(version, feature_name)
    local extractor = {
        version = version or arg[1] or '1.7.6',
        feature = feature_name,
        output_dir = 'html/data/' .. (version or '1.7.6'),
        debug = false
    }
    setmetatable(extractor, { __index = self })
    return extractor
end

-- Ensure output directory exists
function BaseExtractor:ensure_output_dir()
    os.execute('mkdir -p ' .. self.output_dir)
end

-- Write JSON data to file
function BaseExtractor:write_json(filename, data)
    self:ensure_output_dir()
    local filepath = self.output_dir .. '/' .. filename
    
    if self.debug then
        print('Writing to: ' .. filepath)
    end
    
    local file = io.open(filepath, 'w')
    if not file then
        error('Could not open file for writing: ' .. filepath)
    end
    
    file:write(json.encode(data))
    file:close()
    
    print('✅ Generated ' .. filepath)
end

-- Common logging function
function BaseExtractor:log(message)
    if self.debug then
        print('[' .. (self.feature or 'EXTRACTOR') .. '] ' .. message)
    end
end

-- Common error handling
function BaseExtractor:error(message)
    error('[' .. (self.feature or 'EXTRACTOR') .. ' ERROR] ' .. message)
end

-- Load game modules and initialize engine
function BaseExtractor:init_game()
    self:log('Initializing game engine...')
    
    -- Load required modules
    local Actor = require 'mod.class.Actor'
    local Birther = require 'engine.Birther'
    
    -- Store commonly used objects
    self.Actor = Actor
    self.Birther = Birther
    self.world = Birther.birth_descriptor_def.world["Maj'Eyal"]
    
    self:log('Game engine initialized')
end

-- Helper function for image configuration
function BaseExtractor:img(file, w, h)
    return { file = 'npc/' .. file .. '.png', width = w, height = h }
end

-- Filter out blacklisted items
function BaseExtractor:is_blacklisted(item, blacklist)
    if not blacklist then return false end
    return blacklist[item] == true
end

-- Extract common properties from game objects
function BaseExtractor:extract_common_props(obj)
    return {
        id = obj.id or obj.name,
        name = obj.name,
        desc = obj.desc,
        image = obj.image
    }
end

-- Validation helper
function BaseExtractor:validate_required(obj, required_fields)
    for _, field in ipairs(required_fields) do
        if not obj[field] then
            self:error('Missing required field: ' .. field)
        end
    end
end

-- Main extraction method to be overridden by subclasses
function BaseExtractor:extract()
    error('extract() method must be implemented by subclass')
end

-- Main run method
function BaseExtractor:run()
    self:log('Starting ' .. (self.feature or 'base') .. ' extraction for version ' .. self.version)
    self:init_game()
    self:extract()
    self:log('Extraction completed successfully')
end

return BaseExtractor