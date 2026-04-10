import sys
import re

claude_code_path = '/Users/dimitrisskarlatopoulos/Documents/FirePrez/Branding_Automation/claude_code/template.html'
claude_code_css = """
    .claude-code {
      max-width: 720px;
      margin: 0 auto;
      padding: var(--space-2xl);
      display: flex;
      flex-direction: column;
      gap: var(--space-xl);
    }

    .claude-code__title {
      margin: 0;
      font-size: clamp(32px, 4vw, 48px);
      font-weight: 200;
      font-family: var(--font-sans);
      color: var(--brand-dark-teal);
      letter-spacing: -0.02em;
      line-height: 1.2;
    }

    .claude-code__tabs {
      display: flex;
      gap: 0;
      border: var(--glass-border-light);
      border-radius: var(--radius-md);
      padding: 4px;
      background: var(--glass-bg-light);
      backdrop-filter: var(--glass-blur);
    }

    .claude-code__tab {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-sm);
      padding: var(--space-sm) var(--space-md);
      font-size: 11px;
      font-weight: 500;
      font-family: var(--font-mono);
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--brand-muted-gray);
      background: transparent;
      border: none;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: color 0.15s, background 0.15s;
    }

    .claude-code__tab:hover {
      color: var(--brand-dark-teal);
    }

    .claude-code__tab--active {
      background: var(--brand-cream);
      color: var(--brand-dark-teal);
      box-shadow: var(--shadow-soft);
      border: var(--glass-border-light);
    }

    .claude-code__terminal {
      background: var(--glass-bg-dark);
      backdrop-filter: var(--glass-blur);
      border-radius: var(--radius-md);
      overflow: hidden;
      border: var(--glass-border-dark);
      box-shadow: var(--shadow-card);
    }

    .claude-code__terminal-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      background: rgba(3, 44, 45, 0.4);
      border-bottom: var(--glass-border-dark);
    }

    .claude-code__terminal-dots {
      display: flex;
      gap: 6px;
    }

    .claude-code__terminal-dots span {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    .claude-code__terminal-dots span:nth-child(1) { background: #ff5f57; }
    .claude-code__terminal-dots span:nth-child(2) { background: #febc2e; }
    .claude-code__terminal-dots span:nth-child(3) { background: #28c840; }

    .claude-code__terminal-title {
      flex: 1;
      text-align: center;
      font-size: 11px;
      color: var(--brand-muted-gray);
      font-family: var(--font-mono);
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .claude-code__terminal-body {
      padding: var(--space-lg);
      font-family: var(--font-mono);
      font-size: 14px;
      line-height: 1.6;
      color: var(--brand-cream);
    }

    .claude-code__terminal-body .cmd { color: var(--brand-orange); font-weight: 500; }
    .claude-code__terminal-body .success { color: var(--brand-teal); }
    .claude-code__terminal-body .muted { color: var(--brand-muted-gray); }

    .claude-code__instructions {
      margin: 0;
      font-size: 15px;
      line-height: 1.55;
      font-family: var(--font-sans);
      font-weight: 300;
      color: var(--brand-dark-teal);
    }

    .claude-code__instructions strong {
      font-weight: 500;
      color: var(--brand-teal);
    }

    .claude-code__command-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-md);
      padding: var(--space-md) var(--space-lg);
      background: var(--glass-bg-dark);
      border: var(--glass-border-dark);
      color: var(--brand-cream);
      border-radius: var(--radius-md);
      font-family: var(--font-mono);
      font-size: 13px;
    }

    .claude-code__command-text {
      flex: 1;
      overflow-x: auto;
    }

    .claude-code__copy-btn {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background: rgba(250, 255, 239, 0.1);
      border: none;
      border-radius: var(--radius-sm);
      cursor: pointer;
      color: var(--brand-teal);
      transition: background 0.15s;
    }

    .claude-code__copy-btn:hover {
      background: rgba(250, 255, 239, 0.2);
    }

    .claude-code__copy-btn svg {
      width: 18px;
      height: 18px;
    }

    .claude-code__steps {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .claude-code__step {
      font-size: clamp(14px, 1.45vw, 18px);
      font-weight: 300;
      color: var(--brand-dark-teal);
      line-height: 1.5;
    }

    .claude-code__step::before {
      content: attr(data-step) " ";
      font-weight: 500;
      font-family: var(--font-mono);
      color: var(--brand-orange);
    }

    .claude-code__learn-more {
      font-size: 12px;
      font-family: var(--font-mono);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--brand-teal);
      font-weight: 500;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: opacity 0.15s;
    }

    .claude-code__learn-more:hover {
      opacity: 0.85;
    }
"""

with open(claude_code_path, 'r') as f:
    html = f.read()

# claude_code has <style>{{BRAND_CSS}}</style> then another <style>
# We replace the second style block.
html = re.sub(r'<style>.*?</style>', '<style>\n' + claude_code_css + '\n</style>', html, count=1, flags=re.DOTALL)
# Wait, re.sub without count=1 but finding the second style block?
# The above replaces the FIRST block which is {{BRAND_CSS}}. That's bad.
# Let's fix it by searching for <style> (with actual css inside)
