import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const API_KEY = process.env.FIREFLIES_API_KEY;
const API_URL = "https://api.fireflies.ai/graphql";

if (!API_KEY) {
  console.error("FIREFLIES_API_KEY environment variable is required");
  process.exit(1);
}

async function gql(query, variables = {}) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Fireflies API error: ${res.status} ${await res.text()}`);
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

const server = new McpServer({
  name: "fireflies",
  version: "1.0.0",
});

server.tool("list_transcripts", "List recent meeting transcripts with basic metadata", {
  limit: { type: "number", description: "Max results (default 10)" },
}, async ({ limit }) => {
  const data = await gql(`
    query ($limit: Int) {
      transcripts(limit: $limit) {
        id
        title
        date
        duration
        organizer_email
        participants
      }
    }
  `, { limit: limit || 10 });
  return { content: [{ type: "text", text: JSON.stringify(data.transcripts, null, 2) }] };
});

server.tool("get_transcript", "Get full transcript with sentences, summary, and action items", {
  id: { type: "string", description: "Transcript ID" },
}, async ({ id }) => {
  const data = await gql(`
    query ($id: String!) {
      transcript(id: $id) {
        id
        title
        date
        duration
        organizer_email
        participants
        sentences {
          index
          text
          speaker_name
          start_time
          end_time
        }
        summary {
          keywords
          action_items
          outline
          overview
          short_summary
          bullet_gist
        }
        meeting_attendees {
          displayName
          email
          name
        }
      }
    }
  `, { id });
  return { content: [{ type: "text", text: JSON.stringify(data.transcript, null, 2) }] };
});

server.tool("get_transcript_summary", "Get just the AI-generated summary and action items for a transcript", {
  id: { type: "string", description: "Transcript ID" },
}, async ({ id }) => {
  const data = await gql(`
    query ($id: String!) {
      transcript(id: $id) {
        id
        title
        date
        summary {
          keywords
          action_items
          overview
          short_summary
          bullet_gist
          outline
        }
      }
    }
  `, { id });
  return { content: [{ type: "text", text: JSON.stringify(data.transcript, null, 2) }] };
});

server.tool("search_transcripts", "Search transcripts by keyword in title or content", {
  keyword: { type: "string", description: "Search keyword" },
}, async ({ keyword }) => {
  const data = await gql(`
    query {
      transcripts(limit: 50) {
        id
        title
        date
        duration
        participants
      }
    }
  `);
  const filtered = data.transcripts.filter(
    (t) => t.title?.toLowerCase().includes(keyword.toLowerCase())
  );
  return { content: [{ type: "text", text: JSON.stringify(filtered, null, 2) }] };
});

const transport = new StdioServerTransport();
await server.connect(transport);
