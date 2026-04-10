import os, re

base_dir = '/Users/dimitrisskarlatopoulos/Documents/FirePrez/Branding_Automation'

# 1. pitch_deck.html
pd_path = os.path.join(base_dir, 'proposal_deck/pitch_deck.html')
ht = open(pd_path).read()
ht = re.sub(r'<svg viewBox="0 0 300 150".*?</svg>', '<img src="../brand/logo_white.png" alt="Paioneers Logo" style="height: 32px; width: auto;" />', ht, flags=re.DOTALL)
open(pd_path, 'w').write(ht)

# 2. standard templates 
for t in ['invoice/template.html', 'pricing/template.html', 'meeting_followup/template.html', 'proposal_deck/template.html']:
    path = os.path.join(base_dir, t)
    if os.path.exists(path):
        ht = open(path).read()
        ht = ht.replace('{{LOGO_INLINE}}', '<img src="../brand/logo_white.png" alt="Paioneers Logo" style="height: 44px; width: auto;" />')
        ht = ht.replace('<div class="footer-meta">', '<div class="footer-meta">\n        <img src="../brand/logoblack.png" style="height: 16px; opacity: 0.5;" alt="Paioneers Logo" />')
        open(path, 'w').write(ht)

# 3. call_analysis/template.html
ca_path = os.path.join(base_dir, 'call_analysis/template.html')
if os.path.exists(ca_path):
    ht = open(ca_path).read()
    ht = re.sub(r'<svg xmlns="http://www.w3.org/2000/svg".*?</svg>', '<img src="../brand/logo_white.png" alt="Paioneers Logo" style="height: 44px; width: auto;" />', ht, flags=re.DOTALL)
    ht = ht.replace('<div class="footer-meta">', '<div class="footer-meta">\n        <img src="../brand/logoblack.png" style="height: 16px; opacity: 0.5;" alt="Paioneers Logo" />')
    open(ca_path, 'w').write(ht)

# 4. samples 
samples_dir = os.path.join(base_dir, 'samples')
if os.path.exists(samples_dir):
    for f in os.listdir(samples_dir):
        if not f.endswith('.html'): continue
        path = os.path.join(samples_dir, f)
        ht = open(path).read()
        ht = re.sub(r'<svg xmlns="http://www.w3.org/2000/svg".*?</svg>', '<img src="../brand/logo_white.png" alt="Paioneers Logo" style="height: 44px; width: auto;" />', ht, flags=re.DOTALL)
        if 'footer-meta">\n        <img' not in ht:
            ht = ht.replace('<div class="footer-meta">', '<div class="footer-meta">\n        <img src="../brand/logoblack.png" style="height: 16px; opacity: 0.5;" alt="Paioneers Logo" />')
        open(path, 'w').write(ht)

print("Logos updated successfully.")
