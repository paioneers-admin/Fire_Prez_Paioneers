import sys
import re

path = '/Users/dimitrisskarlatopoulos/Documents/FirePrez/Branding_Automation/proposal_deck/pitch_deck.html'
with open(path, 'r') as f:
    html = f.read()

# Replace hex primary color
html = html.replace('#C96442', '#F37C38')
html = html.replace('#c96442', '#F37C38')

# Replace rgba primary color (201, 100, 66) -> Orange (243, 124, 56)
html = html.replace('rgba(201, 100, 66', 'rgba(243, 124, 56')

# Replace ink hex
html = html.replace('#262624', '#032C2D')

# Replace glass-bg and ink rgba (38, 38, 36) -> Dark Teal (3, 44, 45)
html = html.replace('rgba(38, 38, 36', 'rgba(3, 44, 45')

# Replace fonts
# Out with Inter and Outfit, in with IBM Plex
html = html.replace("'Inter', system-ui, -apple-system, sans-serif", "'IBM Plex Sans', Arial, sans-serif")
html = html.replace("'Outfit', 'Inter', system-ui, sans-serif", "'IBM Plex Sans', Arial, sans-serif")

# Google fonts link
old_link = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@400;600;800&display=swap"
new_link = "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@200;300;400;500;600&display=swap"
html = html.replace(old_link, new_link)

# We want the display font to be extremely thin, like weight 200 or 300, as per the style guide.
# Let's replace the h1, h2, h3, h4 weights
html = html.replace("font-weight: 600;", "font-weight: 300;")

# The PAIONEERS text in the SVG logo
html = html.replace("font-family=\"'Outfit', sans-serif\" font-weight=\"800\"", "font-family=\"'IBM Plex Sans', sans-serif\" font-weight=\"300\"")

with open(path, 'w') as f:
    f.write(html)

print("Updated proposal_deck/pitch_deck.html successfully.")
