import re

def extract_objects(text):
    pattern = re.compile(r'\{\s*id:\s*(\d+),', re.MULTILINE)
    starts = [m.start() for m in pattern.finditer(text)]
    ends = []
    
    for i in range(len(starts)):
        if i < len(starts) - 1:
            ends.append(starts[i+1])
        else:
            last_brace = text.rfind('}')
            ends.append(last_brace + 1 if last_brace != -1 else len(text))
    
    objects = []
    for s, e in zip(starts, ends):
        obj_text = text[s:e].strip()
        temp_text = obj_text
        if temp_text.endswith(','): temp_text = temp_text[:-1].strip()
        last_right_brace = temp_text.rfind('}')
        if last_right_brace != -1:
             obj_text = temp_text[:last_right_brace+1]
        objects.append(obj_text)
    return objects

def merge():
    with open('cleaned_1_2.js', 'r', encoding='utf-8') as f:
        m58_text = f.read()
    
    with open('cleaned_2.js', 'r', encoding='utf-8') as f:
        m910_text = f.read()
        
    with open('scratch/modules_11_12.js', 'r', encoding='utf-8') as f:
        m1112_text = f.read()
        
    with open('scratch/modules_13_16.js', 'r', encoding='utf-8') as f:
        m1316_text = f.read()

    # Fixed cutoff for Module 10
    if m910_text.strip().endswith('Execution Model:'):
        m910_text += ' ECN/STP accounts are preferred over Market Maker accounts to minimize conflict of interest and ensure better execution quality during volatility.'
        m910_text += '\n          </ul>\n        `,\n        quiz: [\n          {\n            question: \"Which execution model is generally preferred for high-impact news trading to minimize conflict of interest?\",\n            options: [\"Market Maker (B-Book)\", \"ECN/STP (A-Book)\", \"Standard Account\", \"Social Trading Platform\"],\n            answer: 1,\n            explanation: \"ECN (Electronic Communication Network) or STP (Straight-Through Processing) models route orders directly to liquidity providers, reducing the conflict of interest inherent in Market Maker models and often providing better fills during high volatility.\"\n          }\n        ]\n      }\n    ]\n  }'

    all_raw_objects = []
    all_raw_objects.extend(extract_objects(m58_text))
    all_raw_objects.extend(extract_objects(m910_text))
    all_raw_objects.extend(extract_objects(m1112_text))
    all_raw_objects.extend(extract_objects(m1316_text))

    modules_dict = {}
    for obj_text in all_raw_objects:
        match = re.search(r'id:\s*(\d+),', obj_text)
        if match:
            mid = int(match.group(1))
            if mid in modules_dict:
                if len(obj_text) > len(modules_dict[mid]):
                    modules_dict[mid] = obj_text
            else:
                modules_dict[mid] = obj_text

    images = {
        5: "https://images.unsplash.com/photo-1611974717482-959aa9960b4f?auto=format&fit=crop&q=80&w=1000",
        6: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1000",
        7: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&q=80&w=1000",
        8: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80&w=1000",
        9: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
        10: "https://images.unsplash.com/photo-1504711432814-07d400938682?auto=format&fit=crop&q=80&w=1000",
        11: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
        12: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1000",
        13: "https://images.unsplash.com/photo-1591696208162-a93c12643a6d?auto=format&fit=crop&q=80&w=1000",
        14: "https://images.unsplash.com/photo-1611974717482-959aa9960b4f?auto=format&fit=crop&q=80&w=1000",
        15: "https://images.unsplash.com/photo-1518186239747-4f8101683907?auto=format&fit=crop&q=80&w=1000",
        16: "https://images.unsplash.com/photo-1553484771-047a44eee27b?auto=format&fit=crop&q=80&w=1000",
    }

    final_sorted_blocks = []
    for mid in sorted(modules_dict.keys()):
        block = modules_dict[mid]
        if mid in images:
            img_url = images[mid]
            img_tag = f'\\n          <img src=\"{img_url}\" alt=\"Market Analysis\" style=\"width:100%; border-radius:12px; margin-bottom:20px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);\" />\\n'
            block = re.sub(r'(content:\s*`)', r'\1' + img_tag, block, count=1)
        final_sorted_blocks.append(block)

    with open('src/data/modules-full.js', 'r', encoding='utf-8') as f:
        original = f.read()
    
    header_end_match = re.search(r'\}\s*,\s*\{\s*id:\s*5,', original)
    if header_end_match:
        header = original[:header_end_match.start() + 1].strip()
    else:
        split_match = re.search(r'id:\s*5,', original)
        header = original[:original.rfind('{', 0, split_match.start())].strip()

    final_content = header + ",\n  " + ",\n  ".join(final_sorted_blocks) + "\n];\n"
    
    with open('src/data/modules-full.js', 'w', encoding='utf-8') as f:
        f.write(final_content)

if __name__ == '__main__':
    merge()
