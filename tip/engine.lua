tip = tip or {}
tip.version = arg[1]
package.path = package.path..(';%s/?.lua;./%s/thirdparty/?.lua'):format(tip.version, tip.version)

-- Stub for internationalization function
_t = function(text) return text end

-- Stub for text formatting function
tformat = function(text, ...) 
    -- Simple string formatting replacement
    local args = {...}
    if type(args[1]) == "table" then
        args = args[1]
    end
    local result = text
    for k, v in pairs(args) do
        result = result:gsub("#"..k.."#", tostring(v))
        result = result:gsub("@"..k.."@", tostring(v))
    end
    return result
end

-- Add tformat as a string method
local string_mt = getmetatable("")
string_mt.__index.tformat = function(self, ...)
    return tformat(self, ...)
end

-- Stub for campaign checking function
for_campaign = function(campaign_name)
    -- For spoiler generation, we assume all content is valid
    return true
end

-- Stub socket modules since we don't need networking for spoiler generation
package.preload['socket.http'] = function()
    return {
        request = function() return nil, "socket disabled in spoiler mode" end
    }
end
package.preload['socket.url'] = function()
    return {
        parse = function(url) return {} end,
        build = function(t) return "" end
    }
end
package.preload['socketcore'] = function()
    return {}
end

require 'versions'

tip.outputDir = function()
    local output_dir = (arg[2] or 'html/data/'..tip.version) .. '/'
    print("OUTPUT DIRECTORY: " .. output_dir)
    os.execute('mkdir -p ' .. output_dir)
    return output_dir
end

require 'tip.utils'

-- T-Engine's C core.  Unimplemented as much as possible.
local surface_metatable = { __index = {} }
local font_metatable = { __index = {} }
__uids = {}
core = {
    display = {
        newSurface = function(x, y)
            local result = {}
            setmetatable(result, surface_metatable)
            return result
        end,
        newFont = function(font, size, no_cache)
            local result = { size = function(s) return 1 end, lineSkip = function() return 1 end }
            setmetatable(result, font_metatable)
            return result
        end,
    },
    fov = {},
    game = {},
    shader = {},
}
fs = {
    exists = function(path)
        --io.stderr:write(string.format("fs.exists(%s)\n", path))
        return false
    end,
    list = function(path)
        --io.stderr:write(string.format("fs.list(%s)\n", path))
        return {}
    end,
}

-- rng functions.  Shouldn't be needed (descriptions should be static), but
-- bugs and exceptions exist.
rng = {
    percent = function(chance) tip.util.logError('bad function rng.percent called') return false end,
    avg = function(min, max, size) tip.util.logError('bad function rng.avg called') return (min + max) / 2 end,
    float = function(min, max) return (min + max) / 2 end, -- Return middle value for reproducible results
    range = function(min, max) return math.floor((min + max) / 2) end,
    dice = function(nb, sides) return math.floor(nb * sides / 2) end,
}

game = {
    state = {
        birth = {
            -- For orcs DLC - this causes orc content to load into the main campaign, I think.
            merge_tinkers_data = true,
        },
        unlockTalentCheck = function(tid, who) return false end,
    },
    level = {
        data = {},
        entities = {},
    },
    party = {
        hasMember = function(actor) return false end,
        known_tinkers = {},
    },
    
    -- Add missing methods needed by DLC hooks
    isCampaign = function(self, campaign_name) 
        -- For spoiler generation, return false since we're not running a specific campaign
        return false 
    end,
}

profile = {
    mod = {
        allow_build = {
            -- For orcs DLC - allows steam classes, steam stuff for Adventurer
            orcs_tinker_eyal = true
        }
    }
}

-- Load init.lua and get version number.  Based on Module.lua.
local mod = { config={ settings={} } }
local mod_def = loadfile(tip.version .. '/mod/init.lua')
if mod_def then
    setfenv(mod_def, mod)
    mod_def()
else
    error("Could not load " .. tip.version .. '/mod/init.lua')
end

tip.git_tag = tip.version == 'master' and tip.version or ('tome-%s'):format(tip.version)
if not tip.git_tag then
    io.stderr:write(('Unable to determine Git tag from requested version "%s"\n'):format(tip.version))
    os.exit(1)
end

local old_loadfile = loadfile
loadfile = function(file)
    return old_loadfile(tip.version .. file)
end

function loadfile_and_execute(file)
    f = loadfile(file)
    assert(f)
    f()
end
load = loadfile_and_execute

local old_dofile = dofile
dofile = function(file)
    return old_dofile(tip.version .. file)
end

require 'engine.dialogs.Chat'

require 'engine.utils'
local class = require "engine.class"
local DamageType = require "engine.DamageType"
local ActorStats = require "engine.interface.ActorStats"
local ActorResource = require "engine.interface.ActorResource"
local ActorTalents = require 'engine.interface.ActorTalents'
local ActorTemporaryEffects = require "engine.interface.ActorTemporaryEffects"
local ActorInventory = require "engine.interface.ActorInventory"
local Birther = require 'engine.Birther'


-- FIXME: Figure out where these should go and what they should do
resolvers = {
    calc = {
    },

    racials_defs = {
    },

    racials_visuals_defs = {
      Giant={},
    },

    equip = function() end,
    inscriptions = function() end,
    levelup = function() end,
    mbonus = function() end,
    nice_tile = function() end,
    racial = function() end,
    rngavg = function() end,
    sustains_at_birth = function() end,
    tactic = function() end,
    talents = function() end,
    tmasteries = function() end,
    generic = function() end,
    genericlast = function() end,

    -- For race and class descriptors - may be useful to process these
    -- to show starting inventory
    inscription = function() end,
    inventory = function() end,
    equipbirth = function() end,
    inventorybirth = function() end,
    attachtinkerbirth = function() end,
    birth_extra_tier1_zone = function() end,
    auto_equip_filters = function() end,
    
    -- Campaign-specific resolvers
    for_campaign = function(campaign_name, func)
        -- For spoiler generation, we assume all campaigns are valid
        -- and we want to execute the function if it exists
        if func and type(func) == "function" then
            return func
        end
        return function() end
    end,
    
    -- Callback registration for event handling
    register_callbacks = function(callbacks)
        -- For spoiler generation, we don't need to actually register callbacks
        return function() end
    end,
}

config.settings.tome = {}

function setDefaultProjector()
end

load("/engine/colors.lua")

-- Body parts - copied from ToME's load.lua
ActorInventory:defineInventory("MAINHAND", "In main hand", true, "Most weapons are wielded in the main hand.", nil, {equipdoll_back="ui/equipdoll/mainhand_inv.png"})
ActorInventory:defineInventory("OFFHAND", "In off hand", true, "You can use shields or a second weapon in your off-hand, if you have the talents for it.", nil, {equipdoll_back="ui/equipdoll/offhand_inv.png"})
ActorInventory:defineInventory("PSIONIC_FOCUS", "Psionic focus", true, "Object held in your telekinetic grasp. It can be a weapon or some other item to provide a benefit to your psionic powers.", nil, {equipdoll_back="ui/equipdoll/psionic_inv.png", etheral=true})
ActorInventory:defineInventory("FINGER", "On fingers", true, "Rings are worn on fingers.", nil, {equipdoll_back="ui/equipdoll/ring_inv.png"})
ActorInventory:defineInventory("NECK", "Around neck", true, "Amulets are worn around the neck.", nil, {equipdoll_back="ui/equipdoll/amulet_inv.png"})
ActorInventory:defineInventory("LITE", "Light source", true, "A light source allows you to see in the dark places of the world.", nil, {equipdoll_back="ui/equipdoll/light_inv.png"})
ActorInventory:defineInventory("BODY", "Main armor", true, "Armor protects you from physical attacks. The heavier the armor the more it hinders the use of talents and spells.", nil, {equipdoll_back="ui/equipdoll/body_inv.png"})
ActorInventory:defineInventory("CLOAK", "Cloak", true, "A cloak can simply keep you warm or grant you wondrous powers should you find a magical one.", nil, {equipdoll_back="ui/equipdoll/cloak_inv.png"})
ActorInventory:defineInventory("HEAD", "On head", true, "You can wear helmets or crowns on your head.", nil, {equipdoll_back="ui/equipdoll/head_inv.png"})
ActorInventory:defineInventory("BELT", "Around waist", true, "Belts are worn around your waist.", nil, {equipdoll_back="ui/equipdoll/belt_inv.png"})
ActorInventory:defineInventory("HANDS", "On hands", true, "Various gloves can be worn on your hands.", nil, {equipdoll_back="ui/equipdoll/hands_inv.png"})
ActorInventory:defineInventory("FEET", "On feet", true, "Sandals or boots can be worn on your feet.", nil, {equipdoll_back="ui/equipdoll/boots_inv.png"})
ActorInventory:defineInventory("TOOL", "Tool", true, "This is your readied tool, always available immediately.", nil, {equipdoll_back="ui/equipdoll/tool_inv.png"})
ActorInventory:defineInventory("QUIVER", "Quiver", true, "Your readied ammo.", nil, {equipdoll_back="ui/equipdoll/ammo_inv.png"})
ActorInventory:defineInventory("GEM", "Socketed Gems", true, "Socketed gems.", nil, {equipdoll_back="ui/equipdoll/gem_inv.png"})
ActorInventory:defineInventory("QS_MAINHAND", "Second weapon set: In main hand", false, "Weapon Set 2: Most weapons are wielded in the main hand. Press 'x' to switch weapon sets.", true)
ActorInventory:defineInventory("QS_OFFHAND", "Second weapon set: In off hand", false, "Weapon Set 2: You can use shields or a second weapon in your off-hand, if you have the talents for it. Press 'x' to switch weapon sets.", true)
ActorInventory:defineInventory("QS_PSIONIC_FOCUS", "Second weapon set: psionic focus", false, "Weapon Set 2: Object held in your telekinetic grasp. It can be a weapon or some other item to provide a benefit to your psionic powers. Press 'x' to switch weapon sets.", true)
ActorInventory:defineInventory("QS_QUIVER", "Second weapon set: Quiver", false, "Weapon Set 2: Your readied ammo.", true)
ActorInventory.equipdolls = {
	default = { w=48, h=48, itemframe="ui/equipdoll/itemframe48.png", itemframe_sel="ui/equipdoll/itemframe-sel48.png", ix=3, iy=3, iw=42, ih=42, doll_x=116, doll_y=168+64, doll_w=128, doll_h=128,
	list={
	}},
}


-- Copied from ToME's load.lua
DamageType:loadDefinition("/data/damage_types.lua")
ActorTalents:loadDefinition("/data/talents.lua")
ActorTemporaryEffects:loadDefinition("/data/timed_effects.lua")

-- Actor resources - copied from ToME's load.lua
ActorResource:defineResource("Air", "air", nil, "air_regen", "Air capacity in your lungs. Entities that need not breath are not affected.")
ActorResource:defineResource("Stamina", "stamina", ActorTalents.T_STAMINA_POOL, "stamina_regen", "Stamina represents your physical fatigue. Each physical ability used reduces it.")
ActorResource:defineResource("Mana", "mana", ActorTalents.T_MANA_POOL, "mana_regen", "Mana represents your reserve of magical energies. Each spell cast consumes mana and each sustained spell reduces your maximum mana.")
ActorResource:defineResource("Equilibrium", "equilibrium", ActorTalents.T_EQUILIBRIUM_POOL, "equilibrium_regen", "Equilibrium represents your standing in the grand balance of nature. The closer it is to 0 the more balanced you are. Being out of equilibrium will negatively affect your ability to use Wild Gifts.", 0, false)
ActorResource:defineResource("Vim", "vim", ActorTalents.T_VIM_POOL, "vim_regen", "Vim represents the amount of life energy/souls you have stolen. Each corruption talent requires some.")
ActorResource:defineResource("Positive", "positive", ActorTalents.T_POSITIVE_POOL, "positive_regen", "Positive energy represents your reserve of positive power. It slowly decreases.")
ActorResource:defineResource("Negative", "negative", ActorTalents.T_NEGATIVE_POOL, "negative_regen", "Negative energy represents your reserve of negative power. It slowly decreases.")
ActorResource:defineResource("Hate", "hate", ActorTalents.T_HATE_POOL, "hate_regen", "Hate represents the level of frenzy of a cursed soul.")
ActorResource:defineResource("Paradox", "paradox", ActorTalents.T_PARADOX_POOL, "paradox_regen", "Paradox represents how much damage you've done to the space-time continuum. A high Paradox score makes Chronomancy less reliable and more dangerous to use but also amplifies the effects.", 0, false)
ActorResource:defineResource("Psi", "psi", ActorTalents.T_PSI_POOL, "psi_regen", "Psi represents the power available to your mind.")
ActorResource:defineResource("Soul", "soul", ActorTalents.T_SOUL_POOL, "soul_regen", "Soul fragments you have extracted from your foes.", 0, 10)

-- Actor stats - copied from ToME's load.lua
ActorStats:defineStat("Strength",     "str", 10, 1, 100, "Strength defines your character's ability to apply physical force. It increases your melee damage, damage done with heavy weapons, your chance to resist physical effects, and carrying capacity.")
ActorStats:defineStat("Dexterity",    "dex", 10, 1, 100, "Dexterity defines your character's ability to be agile and alert. It increases your chance to hit, your ability to avoid attacks, and your damage with light or ranged weapons.")
ActorStats:defineStat("Magic",        "mag", 10, 1, 100, "Magic defines your character's ability to manipulate the magical energy of the world. It increases your spell power, and the effect of spells and other magic items.")
ActorStats:defineStat("Willpower",    "wil", 10, 1, 100, "Willpower defines your character's ability to concentrate. It increases your mana, stamina and PSI capacity, and your chance to resist mental attacks.")
ActorStats:defineStat("Cunning",      "cun", 10, 1, 100, "Cunning defines your character's ability to learn, think, and react. It allows you to learn many worldly abilities, and increases your mental capabilities and chance of critical hits.")
ActorStats:defineStat("Constitution", "con", 10, 1, 100, "Constitution defines your character's ability to withstand and resist damage. It increases your maximum life and physical resistance.")
-- Luck is hidden and starts at half max value (50) which is considered the standard
ActorStats:defineStat("Luck",         "lck", 50, 1, 100, "Luck defines your character's fortune when dealing with unknown events. It increases your critical strike chance, your chance of random encounters, ...")

-- Factions - copied from ToME's load.lua
dofile("/data/factions.lua")

-- Birther descriptor - copied from ToME's load.lua
Birther:loadDefinition("/data/birth/descriptors.lua")

-- Hook the T-Engine's various new... functions to track where items are from
local function hookNew(module, name)
    local old_new = module[name]
    module[name] = function(self, t)
        t._dlc = tip.util.getDlc()
        return old_new(self, t)
    end
end
hookNew(Birther, 'newBirthDescriptor')
hookNew(ActorTalents, 'newTalent')
hookNew(ActorTalents, 'newTalentType')
ActorTalents['callTalent'] = function (self, tid, name, ...)
    if (type(tid)=='table') then tid = tid.id end
    local t = self.talents_def[tid]
    if (not t) then t = game.player.talents_def[tid] end
    if (not t) then return nil end
    name = name or "trigger"
    if t[name] then return t[name](self, t, ...) end
end

-- Load DLC
tip.dlc = {}
local all_dlc = versions[tip.version]
for i, v in ipairs(all_dlc) do
    local dlc = 'dlc/tome-' .. v
    print(("Loading %s"):format(dlc))

    local dlcname = v:sub(1, string.find(v, "-[^-]*$") - 1)
    os.execute ('ln -sf ../'..dlc..'/data '..tip.version..'/data-'..dlcname)

    tip.dlc[v] = {}
    local dlc_def = old_loadfile(dlc .. '/init.lua')
    if dlc_def then
        setfenv(dlc_def, tip.dlc[v])
        dlc_def()
    else
        print(("Warning: Could not load %s"):format(dlc .. '/init.lua'))
    end

    -- The "right" thing to do is to process init.lua to check for
    -- hooks, overload, and superload.  For our purposes, we can assume
    -- hooks and overload are enabled and can hard-code needed
    -- superload modules.
    package.path = package.path..(';%s/overload/?.lua;%s/?.lua'):format(dlc, dlc)
    class:setCurrentHookDir('/../'..dlc..'/hooks')
    local hooks_load = old_loadfile(('%s/hooks/load.lua'):format(dlc))
    if hooks_load then
        hooks_load()
    else
        print(("Warning: Could not load %s"):format(('%s/hooks/load.lua'):format(dlc)))
    end

    -- Hack: Hard-code loading Combat.lua.
    -- We run after mod.class.Actor, so pass that in loadPrevious
    local f = old_loadfile(('%s/superload/mod/class/interface/Combat.lua'):format(dlc))
    if f ~= nil then
        setfenv(f, setmetatable({
                            loadPrevious = function()
                return require 'mod.class.Actor'
                            end
                    }, {__index=_G}))
        f()
    end

    -- Hack: Further patches for specific DLC
    if v:sub(1,4) == 'orcs' then
        local ok, PartyTinker = pcall(require, 'mod.class.interface.PartyTinker')
        if ok and PartyTinker then
            game.party.__tinkers_ings = PartyTinker.__tinkers_ings
            game.party.knowTinker = PartyTinker.knowTinker
        else
            print(("Warning: PartyTinker module not found for DLC %s"):format(v))
        end
        local ok2, Actor = pcall(require, 'mod.class.Actor')
        if ok2 and Actor then
            Actor.T_METALSTAR = 'T_METALSTAR'
        end
    end

end
class:triggerHook({'ToME:load'})

tip.raw_resources = {'mana', 'soul', 'stamina', 'equilibrium', 'vim', 'positive', 'negative', 'hate', 'paradox', 'psi', 'feedback', 'fortress_energy', 'sustain_mana', 'sustain_stamina', 'sustain_equilibrium', 'sustain_vim', 'drain_vim', 'sustain_positive', 'sustain_negative', 'sustain_hate', 'sustain_paradox', 'sustain_psi', 'sustain_feedback', 'steam', 'sustain_steam', 'insanity', 'sustain_insanity' }

tip.resources = {}
for i, v in ipairs(tip.raw_resources) do
    tip.resources[v] = v
    tip.resources[v] = tip.resources[v]:gsub("sustain_", "")
    tip.resources[v] = tip.resources[v]:gsub("_", " ")
    tip.resources[v] = tip.resources[v]:gsub("positive", "positive energy")
    tip.resources[v] = tip.resources[v]:gsub("negative", "negative energy")
end

local Actor = require 'mod.class.Actor'
local player = Actor.new{
    combat_mindcrit = 0, -- Shouldn't be needed; see http://forums.te4.org/viewtopic.php?f=42&t=39888
    body = { INVEN = 1000, QS_MAINHAND = 1, QS_OFFHAND = 1, MAINHAND = 1, OFFHAND = 1, FINGER = 2, NECK = 1, LITE = 1, BODY = 1, HEAD = 1, CLOAK = 1, HANDS = 1, BELT = 1, FEET = 1, TOOL = 1, QUIVER = 1, QS_QUIVER = 1 },
    wards = {},
    preferred_paradox = 0,
}
game.player = player
game.getPlayer = function(main) return game.player end

-- Dummy map coordinates.  Talents such as Stealth need this.
player.x = 0
player.y = 0

-- table.mapv was added in newer versions of T-Engine's utils.lua.
-- Copy its implementation and add it to older versions if needed.
if not table.mapv then
    -- Make a new table with each k, v = k, f(v) in the original.
    function table.mapv(f, source)
        local result = {}
        for k, v in pairs(source) do
            result[k] = f(v)
        end
        return result
    end
end

