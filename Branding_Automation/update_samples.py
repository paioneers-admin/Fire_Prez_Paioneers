import os, re

base_dir = '/Users/dimitrisskarlatopoulos/Documents/FirePrez/Branding_Automation'
brand = open(os.path.join(base_dir, 'brand/brand.css')).read()
samples_dir = os.path.join(base_dir, 'samples')

# 1. Update standard samples
for f in ['invoice_sample.html', 'pricing_sample.html', 'meeting_followup_sample.html', 'proposal_deck_sample.html']:
    path = os.path.join(samples_dir, f)
    if os.path.exists(path):
        ht = open(path).read()
        ht = re.sub(r'<style>.*?</style>', '<style>\n' + brand + '\n</style>', ht, count=1, flags=re.DOTALL)
        open(path, 'w').write(ht)

# 2. Update claude_code_sample.html
cc_template = open(os.path.join(base_dir, 'claude_code/template.html')).read()
# Extract the custom CSS using regex between the end of first style and end of second
match = re.search(r'</style>\s*<style>(.*?)</style>', cc_template, re.DOTALL)
if match:
    cc_custom = match.group(1)
    cc_path = os.path.join(samples_dir, 'claude_code_sample.html')
    if os.path.exists(cc_path):
        ht = open(cc_path).read()
        # Replace first block
        ht = re.sub(r'<style>.*?</style>', '<style>\n' + brand + '\n</style>', ht, count=1, flags=re.DOTALL)
        # Replace second block
        ht = re.sub(r'(</style>\s*<style>).*?(</style>)', r'\1' + cc_custom + r'\2', ht, count=1, flags=re.DOTALL)
        open(cc_path, 'w').write(ht)

print("Samples updated.")
