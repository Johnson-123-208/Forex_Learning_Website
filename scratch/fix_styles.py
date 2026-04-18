import re

def fix_content_styles():
    with open('src/data/modules-full.js', 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace specific inline styles with classes
    # Blue border -> info-box
    content = re.sub(
        r'<div style="background:#f9f9f9; padding:15px; margin:20px 0; border-left:4px solid #2563eb;">',
        '<div class="info-box">',
        content
    )
    # Red border -> warning-box
    content = re.sub(
        r'<div style="background:#f9f9f9; padding:15px; margin:20px 0; border-left:4px solid #dc2626;">',
        '<div class="warning-box">',
        content
    )
    # Green border -> info-box (or we can add success-box if we want, but info-box is already blue-ish)
    content = re.sub(
        r'<div style="background:#f9f9f9; padding:15px; margin:20px 0; border-left:4px solid #16a34a;">',
        '<div class="info-box">',
        content
    )
    # General gray box -> info-box
    content = re.sub(
        r'<div style="background:#f9f9f9; padding:15px; margin:20px 0;">',
        '<div class="info-box">',
        content
    )
    # Sometimes it might have slightly different spacing
    content = re.sub(
        r'<div style="background:\s*#f9f9f9;.*?">',
        '<div class="info-box">',
        content
    )

    with open('src/data/modules-full.js', 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == '__main__':
    fix_content_styles()
