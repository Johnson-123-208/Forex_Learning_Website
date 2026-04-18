import re

def clean_file(filename, output_filename):
    with open(filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    cleaned_lines = []
    for line in lines:
        match = re.match(r'^\s*\d+:\s?(.*)', line)
        if match:
            cleaned_lines.append(match.group(1) + '\n')
        else:
            cleaned_lines.append(line)
            
    with open(output_filename, 'w', encoding='utf-8') as f:
        f.writelines(cleaned_lines)

clean_file('response1-2.txt', 'cleaned_1_2.js')
clean_file('response2.txt', 'cleaned_2.js')
clean_file('response3.txt', 'cleaned_3.js')
