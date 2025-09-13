#!/usr/bin/env python3
"""
Update the talent icons in the React component from the generated mapping.
"""
import re
import sys
import os

def main():
    if len(sys.argv) != 3:
        print("Usage: update_talent_component.py <mapping_file> <component_file>")
        sys.exit(1)
    
    mapping_file = sys.argv[1]
    component_file = sys.argv[2]
    
    # Read the generated mapping
    try:
        with open(mapping_file, 'r') as f:
            mapping_content = f.read()
    except FileNotFoundError:
        print(f'❌ Mapping file not found: {mapping_file}')
        sys.exit(1)
    
    # Extract just the mapping object (handle both 'const' and 'export const')
    mapping_match = re.search(r'(?:export )?const TALENT_ICON_MAP[^{]*{([^}]+)};', mapping_content, re.DOTALL)
    if not mapping_match:
        print(f'❌ Could not extract mapping from {mapping_file}')
        sys.exit(1)
    
    mapping_entries = mapping_match.group(1).strip()
    
    # Read the React component
    try:
        with open(component_file, 'r') as f:
            component_content = f.read()
    except FileNotFoundError:
        print(f'❌ React component not found at {component_file}')
        sys.exit(1)
    
    # Replace the TALENT_ICON_MAP content
    new_content = re.sub(
        r'(const TALENT_ICON_MAP: Record<string, string> = {)[^}]+(};)',
        r'\1\n' + mapping_entries + '\n  \2',
        component_content,
        flags=re.DOTALL
    )
    
    # Write back the updated component
    with open(component_file, 'w') as f:
        f.write(new_content)
    
    print('✅ Updated talent icons in React component')

if __name__ == '__main__':
    main()