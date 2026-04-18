def find_imbalance():
    with open('src/data/modules-full.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    braces = 0
    brackets = 0
    in_string = False
    string_char = ''
    i = 0
    lines = content.split('\n')
    line_no = 1
    
    for line in lines:
        for c in line:
            if in_string:
                if c == string_char:
                    # Check for backtick edge case (though my script uses `)
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
        
        if braces < 0 or brackets < 0:
            print(f"Negative balance at line {line_no}: braces={braces}, brackets={brackets}")
            return
        line_no += 1
    
    print(f"Final balance: braces={braces}, brackets={brackets}")

if __name__ == '__main__':
    find_imbalance()
