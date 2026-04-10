import { services } from "orangeslice";

const DOMAIN = "recruitnow.nl";
const WEBSITE = "https://www.recruitnow.nl/";

console.log("🔍 Starting full-spectrum research on RecruitNow...\n");

// ═══════════════════════════════════════════════════════════
// PHASE 1: All independent lookups in parallel
// ═══════════════════════════════════════════════════════════

const [
  companyEnrich,
  websiteScrape,
  techStack,
  serpResults,
  batchSerpResults,
] = await Promise.all([

  // 1. Company LinkedIn enrichment by domain
  services.company.linkedin.enrich({ domain: DOMAIN })
    .then(r => { console.log("✅ Company LinkedIn enrichment done"); return r; })
    .catch(e => { console.log("❌ Company enrich failed:", e.message); return null; }),

  // 2. Scrape the website
  services.scrape.website({ url: WEBSITE })
    .then(r => { console.log("✅ Website scrape done"); return r; })
    .catch(e => { console.log("❌ Website scrape failed:", e.message); return null; }),

  // 3. BuiltWith tech stack
  services.builtWith.lookupDomain({ domain: DOMAIN })
    .then(r => { console.log("✅ BuiltWith tech stack done"); return r; })
    .catch(e => { console.log("❌ BuiltWith failed:", e.message); return null; }),

  // 4. Web SERP — main search
  services.web.search({ query: `"RecruitNow" recruitnow.nl` })
    .then(r => { console.log("✅ SERP search done"); return r; })
    .catch(e => { console.log("❌ SERP search failed:", e.message); return null; }),

  // 5. Batch SERP — news, reviews, competitors, jobs
  services.web.batchSearch({
    queries: [
      { query: `"RecruitNow" news OR funding OR acquisition`, tbs: "qdr:y" },
      { query: `"RecruitNow" recruitnow.nl review OR ervaringen` },
      { query: `site:linkedin.com/company "recruitnow"` },
      { query: `"RecruitNow" competitors OR alternatives ATS recruitment software` },
    ]
  })
    .then(r => { console.log("✅ Batch SERP done"); return r; })
    .catch(e => { console.log("❌ Batch SERP failed:", e.message); return null; }),
]);

// ═══════════════════════════════════════════════════════════
// PHASE 2: Use LinkedIn data to get employees
// ═══════════════════════════════════════════════════════════

console.log("\n--- Phase 2: Employee & Leadership lookup ---\n");

const linkedinUrl = companyEnrich?.linkedinUrl || companyEnrich?.url || null;
const companyName = companyEnrich?.name || "RecruitNow";

const [leadership, icEmployees] = await Promise.all([
  // C-Suite via web strategy
  services.company.getEmployeesFromLinkedin({
    companyName: companyName,
    companyDomain: DOMAIN,
    titles: ["CEO", "CTO", "CFO", "COO", "Managing Director", "Founder"],
    strategy: "web",
  })
    .then(r => { console.log("✅ Leadership lookup done"); return r; })
    .catch(e => { console.log("❌ Leadership lookup failed:", e.message); return null; }),

  // Sales/Marketing/Product leaders via database
  services.company.getEmployeesFromLinkedin({
    companyName: companyName,
    companyDomain: DOMAIN,
    titles: ["VP Sales", "Head of Sales", "Sales Director", "VP Marketing", "Head of Product", "Head of Engineering", "Director"],
    strategy: "database",
  })
    .then(r => { console.log("✅ IC/Director lookup done"); return r; })
    .catch(e => { console.log("❌ IC/Director lookup failed:", e.message); return null; }),
]);

// ═══════════════════════════════════════════════════════════
// OUTPUT EVERYTHING
// ═══════════════════════════════════════════════════════════

const output = {
  company: companyEnrich,
  website: websiteScrape,
  techStack,
  serp: serpResults,
  batchSerp: batchSerpResults,
  leadership,
  directors: icEmployees,
};

console.log("\n\n" + "═".repeat(60));
console.log("FULL RESEARCH OUTPUT");
console.log("═".repeat(60) + "\n");
console.log(JSON.stringify(output, null, 2));
