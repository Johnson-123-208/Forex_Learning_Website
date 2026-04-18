def check_balance():
    with open('src/data/modules-full.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    braces = 0
    brackets = 0
    in_string = False
    string_char = ''
    i = 0
    while i < len(content):
        c = content[i]
        if in_string:
            if c == string_char and content[i-1] != '\\':
                in_string = False
        else:
            if c in ['"', "'", '`']:
                in_string = True
                string_char = c
            elif c == '{':
                braces += 1
            elif c == '}':
                braces -= 1
            elif c == '[':
                brackets += 1
            elif c == ']':
                brackets -= 1
        i += 1
    
    print(f"Braces balance: {braces}")
    print(f"Brackets balance: {brackets}")

if __name__ == '__main__':
    check_balance()
