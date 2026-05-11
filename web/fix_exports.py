import os
import re

pages_dir = '/Users/uk_sivagurunathan/Documents/VHG/web/src/pages'
pages = {
    'About.jsx': 'AboutPage',
    'Contact.jsx': 'ContactPage',
    'Insights.jsx': 'InsightsPage',
    'Partners.jsx': 'PartnersPage',
    'Properties.jsx': 'PropertiesPage'
}

for file, expected_export in pages.items():
    filepath = os.path.join(pages_dir, file)
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            content = f.read()
        
        # Replace the final export default X; with export default expected_export;
        content = re.sub(r'export default [A-Za-z0-9_]+;', f'export default {expected_export};', content)
        
        with open(filepath, 'w') as f:
            f.write(content)

