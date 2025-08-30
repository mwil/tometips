-- Classes data extractor
-- Extracts character class and subclass information from ToME data

local BaseExtractor = require 'tools/extractors/base-extractor'
local ClassesExtractor = BaseExtractor:new(arg[1], 'classes')

-- Blacklisted subclasses that shouldn't appear in the output
local BLACKLIST_SUBCLASSES = { Psion = true }

-- Manually configured images for each subclass
-- These are curated to match the class theme and appearance
local SUBCLASS_IMAGES = {
    ALCHEMIST = { 'humanoid_human_master_alchemist', 'alchemist_golem' },
    ADVENTURER = { 'hostile_humanoid_adventurers_party' },
    ANORITHIL = { 'patrol_sunwall_anorithil_patrol' },
    ARCANE_BLADE = { 'humanoid_human_arcane_blade' },
    ARCHER = { 'humanoid_thalore_thalore_hunter', 'humanoid_halfling_halfling_slinger' },
    ARCHMAGE = { 
        { 'humanoid_shalore_elven_tempest-resized', 64, 80 }, 
        { 'humanoid_human_pyromancer-cropped', 64, 80 } 
    },
    BERSERKER = { 'humanoid_dwarf_norgan' },
    BRAWLER = { 'humanoid_human_slave_combatant' },
    BULWARK = { 'humanoid_human_last_hope_guard' },
    CORRUPTOR = { 'humanoid_shalore_elven_corruptor', 'humanoid_shalore_elven_blood_mage' },
    CURSED = { 'humanoid_human_ben_cruthdar__the_cursed' },
    DEMONOLOGIST = { 'humanoid_shalore_elven_warrior', 'demon_minor_fire_imp' },
    DOOMBRINGER = { { 'demon_major_champion_of_urh_rok-cropped', 64, 106 } },
    DOOMED = { 'shadow-caster' },
    GUNSLINGER = { 'humanoid_orc_orc_gunslinger' },
    MARAUDER = { { 'humanoid_human_rej_arkatis-cropped', 64, 78 } },
    MINDSLAYER = { { 'humanoid_yeek_yeek_mindslayer-cropped', 64, 85 } },
    NECROMANCER = { 'humanoid_human_necromancer', 'undead_lich_lich-cropped' },
    OOZEMANCER = { 'vermin_oozes_bloated_ooze', 'humanoid_dwarf_dwarven_summoner' },
    PARADOX_MAGE = { 'humanoid_elf_high_chronomancer_zemekkys' },
    REAVER = { 'humanoid_human_reaver' },
    ROGUE = { 'humanoid_human_rogue' },
    SAWBUTCHER = { 'humanoid_orc_orc_guard' },
    SHADOWBLADE = { 'humanoid_human_shadowblade' },
    SKIRMISHER = { 'humanoid_human_high_slinger' },
    SOLIPSIST = { 'humanoid_yeek_yeek_psionic' },
    SUMMONER = { 'humanoid_thalore_ziguranth_summoner', 'summoner_ritch' },
    SUN_PALADIN = { 'humanoid_human_sun_paladin_guren' },
    TEMPORAL_WARDEN = { 'humanoid_elf_star_crusader', 'humanoid_elf_elven_archer' },
    WYRMIC = { 'humanoid_human_fire_wyrmic', 'humanoid_human_multihued_wyrmic' },
    WRITHING_ONE = { 'vermin_oozes_writhing_one' }
}

-- Get image configuration for a subclass
function ClassesExtractor:get_subclass_image(subclass_name)
    local images = SUBCLASS_IMAGES[subclass_name]
    if not images then
        return nil
    end
    
    -- Pick first image (could be randomized in future)
    local first_image = images[1]
    if type(first_image) == 'table' then
        return self:img(first_image[1], first_image[2], first_image[3])
    else
        return self:img(first_image)
    end
end

-- Extract class data with enhanced structure
function ClassesExtractor:extract_class(class_name, class_data)
    self:log('Processing class: ' .. class_name)
    
    local extracted_class = {
        id = class_name,
        name = class_data.display_name or class_data.name,
        description = class_data.description,
        subclasses = {},
        stats = {}
    }
    
    -- Extract subclasses
    if class_data.subclasses then
        for subclass_name, subclass_data in pairs(class_data.subclasses) do
            if not self:is_blacklisted(subclass_name, BLACKLIST_SUBCLASSES) then
                local subclass = {
                    id = subclass_name,
                    name = subclass_data.display_name or subclass_data.name,
                    description = subclass_data.description,
                    short_description = subclass_data.short_description,
                    stats = subclass_data.stats or {},
                    talents = subclass_data.talents or {},
                    image = self:get_subclass_image(subclass_name)
                }
                
                table.insert(extracted_class.subclasses, subclass)
            end
        end
        
        -- Sort subclasses by name for consistent output
        table.sort(extracted_class.subclasses, function(a, b)
            return a.name < b.name
        end)
    end
    
    self:log('  - Found ' .. #extracted_class.subclasses .. ' subclasses')
    return extracted_class
end

-- Main extraction method
function ClassesExtractor:extract()
    local classes = {}
    
    if not self.world.birth_descriptors or not self.world.birth_descriptors.class then
        self:error('Could not find class data in game world')
    end
    
    -- Process each class
    for class_name, class_data in pairs(self.world.birth_descriptors.class) do
        if type(class_data) == 'table' and class_data.display_name then
            classes[class_name] = self:extract_class(class_name, class_data)
        end
    end
    
    -- Generate metadata
    local metadata = {
        generated_at = os.date('%Y-%m-%d %H:%M:%S'),
        version = self.version,
        extractor = 'classes-extractor',
        total_classes = 0,
        total_subclasses = 0
    }
    
    for _, class_data in pairs(classes) do
        metadata.total_classes = metadata.total_classes + 1
        metadata.total_subclasses = metadata.total_subclasses + #class_data.subclasses
    end
    
    -- Write output
    local output = {
        metadata = metadata,
        classes = classes
    }
    
    self:write_json('classes.json', output)
    self:log('Generated classes data: ' .. metadata.total_classes .. ' classes, ' .. 
             metadata.total_subclasses .. ' subclasses')
end

-- Run the extraction
ClassesExtractor:run()