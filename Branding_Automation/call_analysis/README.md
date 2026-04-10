# Call Analysis Pipeline

Automatically generates a branded PDF call analysis report from every Fireflies.ai recording, delivered to Google Drive and Slack.

## Files

| File | Purpose |
|---|---|
| `renderer.js` | **Paste into n8n "Build HTML" Code node** — generates the full HTML document programmatically |
| `n8n_workflow.json` | Importable n8n workflow — all 11 nodes |
| `template.html` | Human-readable reference version of the template (not used directly by n8n) |
| `../schemas/call_analysis.schema.json` | JSON schema for Claude's output |

## Setup

### 1. Install the Community Node
In n8n → Settings → Community Nodes, install:
```
n8n-nodes-html-to-pdf
```

### 2. Set Environment Variables in n8n
| Variable | Description |
|---|---|
| `FIREFLIES_API_KEY` | Your Fireflies.ai API key (Developer settings) |
| `FIREFLIES_WEBHOOK_SECRET` | Secret key for HMAC signature verification |
| `GOOGLE_DRIVE_FOLDER_ID` | ID of the Drive folder to save PDFs |
| `SLACK_CHANNEL_ID` | Slack channel for delivery notifications |

> No template file env variable needed — `renderer.js` generates HTML programmatically.

### 3. Configure OpenRouter Credential
In n8n Credentials, create an **OpenAI API** credential but use:
- Base URL: `https://openrouter.ai/api/v1`
- API Key: your OpenRouter key (`OPENROUTER_API_KEY` from `.env.local`)

Name it exactly: `OpenRouter (via OpenAI compat)`

### 4. Import the Workflow
In n8n → Workflows → Import from file → select `n8n_workflow.json`

### 5. Replace the "Build HTML" Node Code
Open the workflow → find the **Build HTML** Code node → paste the full contents of `renderer.js`

### 6. Configure Fireflies Webhook
In Fireflies.ai → Integrations → Webhooks:
- URL: `https://paioneers.app.n8n.cloud/webhook/fireflies-transcript-complete`
- Event: Transcription Completed
- Copy the secret key → set as `FIREFLIES_WEBHOOK_SECRET` in n8n

## Pipeline Flow

```
Fireflies fires webhook (meetingId only)
  → Validate HMAC signature
  → Fetch full transcript via GraphQL API (sentences + speakers)
  → Format speaker-labelled transcript string
  → Agent 1 (Claude Haiku via OpenRouter): Extract facts → strict JSON
  → Validate & Parse JSON gate
  → Agent 2 (Claude Sonnet via OpenRouter): Write narrative blocks
  → Merge both agent outputs
  → renderer.js → Full HTML document (no external file)
  → Render PDF (headless Chromium via n8n-nodes-html-to-pdf)
  → Upload to Google Drive
  → Slack notification with Drive link
     or on error → Slack alert with node name + meeting ID
```

## PDF Sections
1. **Cover** — Meeting title, date, duration, organizer, sentiment badge
2. **Executive Summary** — AI narrative, 2-3 sentences
3. **Prospect Intelligence** — Contact card + budget/timeline/current-solution signals
4. **Pain Points & Objections**
5. **Key Quotes** (conditional — hidden if none extracted)
6. **Action Items** table (owner / action / due date)
7. **Strategic Assessment & Recommended Approach**
