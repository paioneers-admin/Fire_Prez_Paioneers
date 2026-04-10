# Presentation_Templates

Brand-locked HTML deck templates for Paioneers B.V. presentation generation.

## Included templates
- `meeting_followup/template.html`
- `pricing/template.html`
- `proposal_deck/template.html`
- `invoice/template.html`
- `claude_code/template.html` — Claude Code + Orange Slice integration component

## Brand source
Assets were derived from `docs/Paioneers_Design` and normalized into reusable tokens:
- Primary: `#C96442`
- Ink/Dark: `#262624`
- Light: `#E1E1E1`
- Neutral: `#888888`
- Typeface: `Arial` (with system sans fallback)
- Invoice layout fields aligned to `docs/Paioneers_Design/Invoice/1. Invoice-Template.xlsx`

## Architecture
Templates are deterministic and only accept structured data.
The backend (`packages/ontology-core/src/api/prez.py`) maps AI JSON output into these templates.

## Files
- `brand/brand.tokens.json`: canonical design tokens
- `brand/brand.css`: shared CSS for all templates
- `brand/guidelines.md`: usage notes
- `schemas/*.schema.json`: expected JSON payload shape per template

## Samples
Rendered mock decks for visual review:
- `samples/meeting_followup_sample.html`
- `samples/pricing_sample.html`
- `samples/proposal_deck_sample.html`
- `samples/invoice_sample.html`
- `samples/claude_code_sample.html`
