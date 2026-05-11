import os
import re

components_dir = 'components'
src_dir = 'vhg-app/src'

os.makedirs(f'{src_dir}/components', exist_ok=True)
os.makedirs(f'{src_dir}/pages', exist_ok=True)

# CSS files mapping
css_files = ['styles.css', 'about.css', 'pages.css']
for css in css_files:
    if os.path.exists(css):
        os.system(f'cp "{css}" "{src_dir}/"')

# Component to Page mapping
page_components = {
    'About.jsx': 'AboutPage',
    'Contact.jsx': 'ContactPage',
    'Insights.jsx': 'InsightsPage',
    'Partners.jsx': 'PartnersPage',
    'Properties.jsx': 'PropertiesPage'
}

for file in os.listdir(components_dir):
    if not file.endswith('.jsx'): continue
    
    with open(f'{components_dir}/{file}', 'r') as f:
        content = f.read()
    
    # Remove standard Babel creation logic
    content = re.sub(r'ReactDOM\.createRoot\(document\.getElementById\(".*?"\)\)\.render\(<.*?/>\);?', '', content)
    
    # Add imports
    imports = "import React, { useState, useEffect, useRef } from 'react';\n"
    if 'Nav' in content and file not in ['Nav.jsx']:
        imports += "import Nav from '../components/Nav';\n"
    if 'Footer' in content and file not in ['Footer.jsx']:
        imports += "import Footer from '../components/Footer';\n"
        
    # Handling specific component deps
    if file == 'Contact.jsx':
        pass # add specific imports?
        
    # Replace React.Fragment with standard <></> or keep React.Fragment.
    content = content.replace("const { useState: useStateC } = React;", "")
    content = content.replace("useStateC", "useState")
    
    content = content.replace("const { useState, useEffect, useRef } = React;", "")
    content = content.replace("const { useState } = React;", "")
    
    # Extract function name for export
    func_match = re.search(r'function\s+([A-Z]\w+)\s*\(', content)
    export_stmt = ""
    if func_match:
        export_stmt = f"\nexport default {func_match.group(1)};\n"
    
    # Determine destination
    if file in page_components:
        dest = f'{src_dir}/pages/{file}'
        if 'import Nav' in imports:
            imports = imports.replace('../components/Nav', '../components/Nav')
    else:
        dest = f'{src_dir}/components/{file}'
        if 'import Nav' in imports:
            imports = imports.replace('../components/Nav', './Nav')
        if 'import Footer' in imports:
            imports = imports.replace('../components/Footer', './Footer')
            
    with open(dest, 'w') as f:
        f.write(imports + content + export_stmt)

# Also handle app.jsx (Home page)
if os.path.exists('app.jsx'):
    with open('app.jsx', 'r') as f:
        content = f.read()
    
    content = re.sub(r'ReactDOM\.createRoot.*', '', content)
    imports = """import React from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Sections from '../components/Sections';
import Tweaks from '../components/Tweaks';
// Sections might contain inner components
"""
    # Wait, app.jsx has Hero, Achievements, Projects, Value, Founder, Testimonials, Insights, Connect, CtaBand.
    # Where are they defined? Let's check Sections.jsx
    if 'Sections' not in content:
        imports += "import { Achievements, Projects, Value, Founder, Testimonials, HomeInsights, Connect, CtaBand } from '../components/Sections';\n"
    
    # Replace Insights with HomeInsights if needed to avoid clash
    content = content.replace("<Insights />", "<HomeInsights />")
    
    with open(f'{src_dir}/pages/Home.jsx', 'w') as f:
        f.write(imports + "\n" + content + "\nexport default App;\n")

