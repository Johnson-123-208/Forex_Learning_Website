def find_module_imbalance():
    with open('src/data/modules-full.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We'll split the file by module markers to isolate the issue
    import re
    pattern = re.compile(r'\{\s*id:\s*(\d+),', re.MULTILINE)
    matches = list(pattern.finditer(content))
    
    for i in range(len(matches)):
        start = matches[i].start()
        end = matches[i+1].start() if i < len(matches) - 1 else len(content)
        block = content[start:end]
        
        braces = 0
        brackets = 0
        in_string = False
        string_char = ''
        j = 0
        while j < len(block):
            c = block[j]
            if in_string:
                if c == string_char: in_string = False
            else:
                if c in ['"', "'", '`']:
                    in_string = True
                    string_char = c
                elif c == '{': braces += 1
                elif c == '}': braces -= 1
                elif c == '[': brackets += 1
                elif c == ']': brackets -= 1
            j += 1
        
        # Each module block should end with braces=0 and brackets=0
        # (Actually braces might be 1 if it doesn't include the closing brace of the previous module... wait)
        print(f"Module {matches[i].group(1)} Balance: braces={braces}, brackets={brackets}")

if __name__ == '__main__':
    find_module_imbalance()
