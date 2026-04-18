import re

def clean_all_inline_styles():
    with open('src/data/modules-full.js', 'r', encoding='utf-8') as f:
        content = f.read()

    # Clean pre tags
    content = re.sub(
        r'<pre style="background: #f4f4f4; padding: 15px; border-radius: 5px;">',
        '<pre>',
        content
    )
    
    # Clean tables with white background
    content = re.sub(
        r'<tr style="background: #f4f4f4;">',
        '<tr>',
        content
    )
    
    # Standardize remaining divs that might have inline styles
    content = re.sub(
        r'<div style="background:[^"]*?border-left:[^"]*?">',
        '<div class="info-box">',
        content
    )

    with open('src/data/modules-full.js', 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == '__main__':
    clean_all_inline_styles()
