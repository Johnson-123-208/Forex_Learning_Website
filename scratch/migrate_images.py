import re

def migrate_images():
    with open('src/data/modules-full.js', 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern to find lessons and their content
    # Note standard quotes " and backticks `
    
    new_content = re.sub(
        r'(content:\s*`)\s*(<img src="(.*?)" alt="Market Analysis" style=".*?" />)\s*',
        r'image: "\3",\n        \1',
        content,
        flags=re.DOTALL
    )
    
    # We might need to handle the whitespace better to ensure it lands inside the lesson object
    # The lesson object looks like:
    # {
    #   id: "5.1",
    #   title: "...",
    #   content: `
    
    # Let's try to match the whole lesson block for better safety
    new_content = re.sub(
        r'\{\s*id:\s*"([0-9.]+)",\s*title:\s*"(.*?)",\s*content:\s*`\s*<img src="(.*?)" alt="Market Analysis" style=".*?" />\s*',
        r'{\n        id: "\1",\n        title: "\2",\n        image: "\3",\n        content: `\n',
        content,
        flags=re.DOTALL
    )

    with open('src/data/modules-full.js', 'w', encoding='utf-8') as f:
        f.write(new_content)

if __name__ == '__main__':
    migrate_images()
