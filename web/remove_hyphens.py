import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Remove the decorative em-dash completely
    new_content = content.replace("— ", "")
    new_content = new_content.replace(" — ", " ")
    new_content = new_content.replace("—", "")
    
    # Optional: if the user also means standard hyphens in text, 
    # we can replace ' - ' with ' '. But we shouldn't replace all '-' 
    # because of HTML classes. We'll stick to ' - '.
    new_content = new_content.replace(" - ", " ")

    if content != new_content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.jsx'):
            process_file(os.path.join(root, file))
