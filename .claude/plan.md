# Paioneers GTM Plan — ROI-First Sales Motion
> Version 1.0 | Target: Sales Managers & RevOps at SMBs | Stack: Clay + Make.com + n8n + Fireflies

---

## The One Rule
**Never pitch a solution. Always pitch a number.**

Not: "We automate your lead enrichment."
But: "Your reps are spending 45 minutes researching every inbound lead. We cut that to 90 seconds. At 20 leads a week, that's 14 hours of selling time back — per rep."

Every conversation starts with their pain in their numbers. Not our technology.

---

## Phase 0 — Pre-Call Intelligence (Before Every Prospect Touchpoint)

Before any call or outreach, run the prospect through Clay:
- Enrich their domain: headcount, industry, tech stack, CRM platform, growth signals
- Identify whether they use HubSpot / Salesforce / Pipedrive
- Check LinkedIn for their sales team size and titles
- Identify the economic buyer (Sales Manager, RevOps Lead, VP Sales)
- Pull any recent company news, funding, or hiring signals

**Output:** A 5-bullet briefing on the prospect loaded into your CRM before you open the call.
**Goal:** Walk in knowing their pain before they tell you.

---

## Phase 1 — The ROI Anchor (First 10 Minutes of Every Conversation)

### The 3-Question Framework
Ask these in order. Never skip to the solution.

1. **Volume question:** "How many [leads / calls / accounts] does your team handle per week?"
2. **Time question:** "How long does it take a rep to [research / update / prepare for] each one today?"
3. **Cost question:** "What's the fully loaded cost of a sales rep hour at your company?"

### The Live Math
Do the calculation out loud, in front of them:

```
[Volume] × [Time per unit] × [Hourly rate] = Weekly waste
Weekly waste × 52 = Annual cost of the problem
```

**Example:**
> "20 leads a week × 45 min research × €60/hr = €900/week.
> That's €46,800 a year in rep time spent on research that delivers zero pipeline."

Then: "We fix that for a fraction of that number."

---

## Phase 2 — The Solution Catalog (What We Sell)

### Tier 1 — Fast Cash, Immediate ROI

| # | Solution | Stack | Time to Build | ROI Hook |
|---|---|---|---|---|
| 1 | Inbound Lead Enrichment + Auto-Demo Booking | Clay + Make + HubSpot | 3–5 days | First response in 5 min vs 47hr industry avg |
| 2 | Post-Call AI Summary + CRM Auto-Update | Fireflies + Make + HubSpot | 2–3 days | 20–30 min saved per call, per rep |
| 3 | On-Demand CRM Account Enrichment | Clay + Make + HubSpot | 3–4 days | Clean data = better segmentation, better targeting |

### Tier 2 — Bigger Ticket, Stronger Stickiness

| # | Solution | Stack | Time to Build | ROI Hook |
|---|---|---|---|---|
| 4 | AI Proposal Deck Generator | Fireflies + Claude + Gamma + Make | 1–2 weeks | Discovery to proposal in 2 hours, not 2 days |
| 5 | Pipeline Health Monitor | HubSpot + n8n + Slack | 4–6 days | Catch slipping deals before they're lost |
| 6 | Pre-Call Meeting Briefing | Clay + HubSpot + Make + Slack | 4–5 days | Every rep walks in prepared like a senior AE |

### Tier 3 — Retention & Expansion (Existing Customers Only)

- Outbound sequence builder (Clay + HubSpot/Lemlist)
- Win/Loss analysis from transcripts (Fireflies + Claude + HubSpot)
- Territory & account prioritization scoring (Clay + n8n + HubSpot)

---

## Phase 3 — The Demo (The Wow Moment)

### Rules of the Live Demo
1. **Use their data.** Pre-enrich their domain in Clay before the call. They see their own company, not ACME Corp.
2. **Show one thing, not everything.** Trigger one workflow live. Watch it complete together.
3. **Narrate the ROI, not the tech.** "See how it just found the tech stack, mapped the persona, and drafted the message — in 12 seconds. That's what your rep would have spent 40 minutes doing."
4. **Never show the full Make scenario unprompted.** Only go deep if they ask. Keep it clean.

### Demo Script (90 Seconds)
> "I'm going to submit this form right now — with your company name and domain."
> [submit]
> "Watch what happens in HubSpot..."
> [CRM updates live, Slack fires, enrichment appears]
> "That's it. That's what we just replaced."

---

## Phase 4 — The Pitch Stack (What You Send Them)

### During the call
- Screen share: Make.com scenario (clean, running live)
- Visual reference: Notion one-pager for the relevant solution

### After the call (within 1 hour)
Send three things only:
1. **Notion one-pager** — the solution they saw, with ROI numbers personalized to their situation
2. **Loom video** — 90-second replay of the demo
3. **One CTA** — "Does Thursday or Friday work for a 30-min implementation scoping call?"

### Leave-behind (for internal champions to share upward)
The Notion one-pager is built to be forwarded. It contains:
- The problem in one sentence
- The ROI in three numbers
- How it works in 4 steps
- What's needed to implement
- A booking link

---

## Phase 5 — Pricing Logic

### The ROI Pricing Rule
**Price = 10–20% of the annual value we create.**

If the solution saves €46,800/year → price it at €3,000–€6,000 setup + €500–€800/month.

Never discount. Instead, reduce scope. Never compete on price. Compete on ROI certainty.

### Delivery Models
| Model | When to Use | Pricing |
|---|---|---|
| Black box (plug API keys, we run it) | Buyer wants outcome, not ownership | Monthly retainer |
| Done-with-you | Buyer wants to learn + own it | Setup fee + handover session |
| Done-for-you | High complexity, high value | Project fee + optional retainer |

### Non-Negotiables
- Setup fee is always required (qualifies serious buyers, protects onboarding time)
- Month 1 is always paid upfront
- Free pilots only for strategic logos or referral sources

---

## Phase 6 — The Acquisition Loop

```
Cold outreach (using our own Clay workflows)
        ↓
ROI anchor conversation (3-question framework)
        ↓
Live demo with their data
        ↓
Notion one-pager + Loom sent within 1 hour
        ↓
Implementation scoping call
        ↓
Delivery (3–10 days)
        ↓
Champion shares internally → referral or upsell
```

**The meta-point:** We use our own product to acquire customers. Every cold outreach is enriched, personalized, and automated through Clay + Make. We are the case study.

---

## KPIs That Matter

| Metric | Target |
|---|---|
| Time from lead to enriched contact | < 5 minutes |
| Demo-to-scoping call conversion | > 40% |
| Scoping call to paid conversion | > 50% |
| Time to first value delivery | < 7 days |
| Net Revenue Retention (month 3+) | > 110% |

---

## What We Do NOT Do

- ❌ Build dashboards nobody asked for
- ❌ Pitch tools (Clay, Make, n8n) — we pitch outcomes
- ❌ Start implementation without a setup fee
- ❌ Demo with fake data when we can use their real data
- ❌ Send decks without a specific next step attached
