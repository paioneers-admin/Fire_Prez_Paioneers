/**
 * Paioneers — Call Analysis HTML Generator
 * ==========================================
 * Drop this into the n8n "Build HTML" Code node.
 * Input:  merged JSON from the "Merge Agent Outputs" node
 * Output: { json: { html: '<complete document string>', fileName: 'YYYY-MM-DD — Title.pdf' } }
 *
 * No external files. No env variables. Fully self-contained.
 */

const d = $input.first().json;

// ─── Helpers ───────────────────────────────────────────────────────────────
const esc = s => s == null ? '' : String(s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const or = (val, fallback = '—') => (val && String(val).trim()) ? esc(val) : `<span class="muted">${fallback}</span>`;

const list = (arr, fallback = '') =>
  arr && arr.length
    ? `<ul>${arr.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`
    : fallback;

const sentimentClass = s => ({
  positive: 'sentiment-positive',
  negative: 'sentiment-negative',
  mixed:    'sentiment-mixed',
  neutral:  'sentiment-neutral'
}[s] || 'sentiment-neutral');

// ─── Data Aliases ───────────────────────────────────────────────────────────
const meta      = d.meeting_meta || {};
const prospect  = d.prospect || {};
const pain      = d.pain_points || [];
const obj       = d.objections || [];
const quotes    = d.key_quotes || [];
const actions   = d.action_items || [];
const sentiment = d.overall_sentiment || 'neutral';
const fileName  = `${meta.date || 'undated'} — ${meta.title || 'Call Analysis'}.pdf`;

// ─── PAIONEERS LOGO (inline SVG) ───────────────────────────────────────────
const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="400" zoomAndPan="magnify" viewBox="0 0 300 149.999998" height="200" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><g/><clipPath id="a"><path d="M 23.480469 43.363281 L 77.480469 43.363281 L 77.480469 106.363281 L 23.480469 106.363281 Z M 23.480469 43.363281" clip-rule="nonzero"/></clipPath><clipPath id="b"><rect x="0" width="196" y="0" height="59"/></clipPath></defs><rect x="-30" width="360" fill="#c96442" y="-15" height="179.999997" fill-opacity="1"/><g clip-path="url(#a)"><path fill="#c96442" d="M 23.480469 43.367188 L 77.691406 43.367188 L 77.691406 106.628906 L 23.480469 106.628906 Z" fill-opacity="1" fill-rule="nonzero"/></g><path fill="#262624" d="M 40.167969 94.515625 L 34.230469 94.515625 L 33.757812 94.324219 L 33.238281 93.523438 L 33.238281 92.957031 L 33.945312 92.0625 L 40.074219 91.96875 L 40.875 91.449219 L 41.066406 91.074219 L 41.066406 90.320312 L 40.546875 89.613281 L 34.230469 89.613281 L 33.523438 89.1875 L 33.238281 88.621094 L 33.238281 87.867188 L 33.757812 87.066406 L 40.359375 86.972656 L 41.066406 86.171875 L 41.066406 85.414062 L 40.875 85.039062 L 40.640625 84.804688 L 34.039062 84.804688 L 33.238281 83.90625 L 33.238281 82.964844 L 33.757812 82.164062 L 40.453125 82.164062 L 41.066406 81.457031 L 41.066406 80.609375 L 40.734375 80.089844 L 39.886719 79.710938 L 34.136719 79.710938 L 33.332031 79.003906 L 33.238281 78.15625 L 33.429688 77.777344 L 34.230469 77.167969 L 40.359375 77.070312 L 41.066406 76.269531 L 41.066406 75.515625 L 40.59375 74.855469 L 40.167969 74.621094 L 34.230469 74.621094 L 33.429688 74.007812 L 33.238281 73.066406 L 33.664062 72.359375 L 34.605469 71.980469 L 40.261719 71.980469 L 41.066406 71.179688 L 41.066406 70.332031 L 40.261719 69.53125 L 34.324219 69.53125 L 33.523438 69.011719 L 33.238281 68.445312 L 33.238281 67.972656 L 33.570312 67.359375 L 34.324219 66.890625 L 40.167969 66.890625 L 40.96875 66.277344 L 41.066406 65.238281 L 40.640625 64.628906 L 39.980469 64.34375 L 34.136719 64.34375 L 33.523438 63.921875 L 33.238281 63.355469 L 33.238281 62.789062 L 33.429688 62.410156 L 34.136719 61.796875 L 40.359375 61.703125 L 41.066406 60.902344 L 41.066406 60.148438 L 40.546875 59.441406 L 40.074219 59.253906 L 34.230469 59.253906 L 33.429688 58.640625 L 33.238281 57.699219 L 33.523438 57.132812 L 34.136719 56.707031 L 40.261719 56.613281 L 40.875 56.1875 L 41.160156 54.964844 L 41.867188 54.160156 L 51.671875 54.160156 L 52.238281 54.445312 L 52.660156 55.152344 L 52.660156 55.625 L 52.378906 56.285156 L 51.859375 56.613281 L 42.054688 56.707031 L 41.160156 57.507812 L 41.160156 58.359375 L 41.582031 58.96875 L 42.148438 59.253906 L 60.628906 59.253906 L 61.003906 59.441406 L 61.523438 60.148438 L 61.617188 60.621094 L 61.429688 61.1875 L 60.628906 61.796875 L 42.242188 61.796875 L 41.582031 62.082031 L 41.160156 62.695312 L 41.160156 63.449219 L 41.347656 63.824219 L 42.054688 64.34375 L 62.890625 64.34375 L 63.785156 65.144531 L 63.785156 66.183594 L 62.703125 66.984375 L 41.960938 66.984375 L 41.160156 67.785156 L 41.253906 68.824219 L 41.960938 69.433594 L 62.703125 69.433594 L 63.785156 70.238281 L 63.785156 71.273438 L 62.890625 72.074219 L 41.773438 72.167969 L 41.160156 72.972656 L 41.160156 73.726562 L 41.488281 74.242188 L 42.242188 74.621094 L 60.722656 74.621094 L 61.523438 75.421875 L 61.523438 76.269531 L 60.628906 77.167969 L 42.242188 77.167969 L 41.488281 77.542969 L 41.160156 78.0625 L 41.160156 78.816406 L 42.054688 79.710938 L 51.578125 79.710938 L 52.472656 80.324219 L 52.660156 80.984375 L 52.472656 81.644531 L 51.578125 82.257812 L 42.527344 82.257812 L 41.160156 83.625 L 42.148438 84.519531 L 47.429688 84.519531 L 48.136719 85.039062 L 48.324219 85.511719 L 47.429688 86.972656 L 41.867188 87.160156 L 41.160156 87.960938 L 42.148438 89.421875 L 47.429688 89.421875 L 48.324219 90.882812 L 47.710938 91.78125 L 47.050781 91.96875 L 41.867188 92.0625 L 41.160156 92.863281 L 40.96875 93.902344 Z" fill-opacity="1" fill-rule="evenodd"/><g transform="matrix(1,0,0,1,74,48)"><g clip-path="url(#b)"><g fill="#262624" fill-opacity="1"><g transform="translate(0.670791,41.148702)"><g><path d="M 3.015625 0 L 3.015625 -30.609375 L 14.8125 -30.609375 C 16.53125 -30.609375 18.101562 -30.425781 19.53125 -30.0625 C 20.96875 -29.695312 22.207031 -29.125 23.25 -28.34375 C 24.289062 -27.570312 25.09375 -26.570312 25.65625 -25.34375 C 26.226562 -24.113281 26.515625 -22.632812 26.515625 -20.90625 C 26.515625 -18.625 26.066406 -16.707031 25.171875 -15.15625 C 24.285156 -13.613281 23.023438 -12.453125 21.390625 -11.671875 C 19.753906 -10.890625 17.8125 -10.5 15.5625 -10.5 L 9.296875 -10.5 L 9.296875 0 Z M 9.296875 -15.453125 L 14.890625 -15.453125 C 16.546875 -15.453125 17.789062 -15.921875 18.625 -16.859375 C 19.46875 -17.796875 19.890625 -19.128906 19.890625 -20.859375 C 19.890625 -22.035156 19.675781 -22.972656 19.25 -23.671875 C 18.820312 -24.367188 18.226562 -24.867188 17.46875 -25.171875 C 16.71875 -25.472656 15.835938 -25.625 14.828125 -25.625 L 9.296875 -25.625 Z"/></g></g></g><g fill="#262624" fill-opacity="1"><g transform="translate(26.197652,41.148702)"><g><path d="M 8.484375 0.65625 C 6.972656 0.65625 5.675781 0.398438 4.59375 -0.109375 C 3.519531 -0.628906 2.695312 -1.351562 2.125 -2.28125 C 1.5625 -3.207031 1.28125 -4.285156 1.28125 -5.515625 C 1.28125 -6.609375 1.53125 -7.554688 2.03125 -8.359375 C 2.539062 -9.171875 3.25 -9.847656 4.15625 -10.390625 C 5.070312 -10.929688 6.148438 -11.363281 7.390625 -11.6875 C 8.628906 -12.019531 9.988281 -12.257812 11.46875 -12.40625 C 12.957031 -12.550781 14.515625 -12.632812 16.140625 -12.65625 L 16.140625 -14.1875 C 16.140625 -15.507812 15.8125 -16.550781 15.15625 -17.3125 C 14.507812 -18.082031 13.40625 -18.46875 11.84375 -18.46875 C 10.71875 -18.46875 9.789062 -18.148438 9.0625 -17.515625 C 8.332031 -16.890625 7.90625 -15.878906 7.78125 -14.484375 L 2.515625 -15.0625 C 2.722656 -16.5625 3.21875 -17.875 4 -19 C 4.78125 -20.132812 5.867188 -21.015625 7.265625 -21.640625 C 8.671875 -22.273438 10.394531 -22.59375 12.4375 -22.59375 C 15.738281 -22.59375 18.191406 -21.828125 19.796875 -20.296875 C 21.398438 -18.765625 22.203125 -16.421875 22.203125 -13.265625 L 22.203125 -4.953125 C 22.203125 -4.316406 22.304688 -3.835938 22.515625 -3.515625 C 22.722656 -3.191406 23.0625 -3.03125 23.53125 -3.03125 C 23.851562 -3.03125 24.15625 -3.066406 24.4375 -3.140625 L 25.09375 -0.25 C 24.914062 -0.15625 24.632812 -0.0351562 24.25 0.109375 C 23.863281 0.253906 23.425781 0.378906 22.9375 0.484375 C 22.457031 0.597656 21.960938 0.65625 21.453125 0.65625 C 20.085938 0.644531 19.035156 0.316406 18.296875 -0.328125 C 17.554688 -0.972656 17.175781 -2.109375 17.15625 -3.734375 C 16.953125 -4.585938 16.316406 -3.257812 15.453125 -2.25 C 14.597656 -1.238281 13.570312 -0.5 12.375 -0.03125 C 11.1875 0.425781 9.890625 0.65625 8.484375 0.65625 Z M 10.046875 -3.15625 C 10.679688 -3.15625 11.351562 -3.316406 12.0625 -3.640625 C 12.78125 -3.972656 13.445312 -4.425781 14.0625 -5 C 14.675781 -5.570312 15.175781 -6.21875 15.5625 -6.9375 C 15.957031 -7.65625 16.15625 -8.40625 16.15625 -9.1875 L 16.15625 -9.515625 C 14.445312 -9.441406 12.929688 -9.289062 11.609375 -9.0625 C 10.296875 -8.84375 9.269531 -8.484375 8.53125 -7.984375 C 7.789062 -7.492188 7.421875 -6.773438 7.421875 -5.828125 C 7.421875 -5.085938 7.644531 -4.457031 8.09375 -3.9375 C 8.539062 -3.414062 9.191406 -3.15625 10.046875 -3.15625 Z"/></g></g></g><g fill="#262624" fill-opacity="1"><g transform="translate(50.036782,41.148702)"><g><path d="M 2.75 -24.984375 L 2.75 -30.609375 L 9.015625 -30.609375 L 9.015625 -24.984375 Z M 2.84375 0 L 2.84375 -21.921875 L 8.953125 -21.921875 L 8.953125 0 Z"/></g></g></g><g fill="#262624" fill-opacity="1"><g transform="translate(59.925454,41.148702)"><g><path d="M 12.453125 0.65625 C 10.117188 0.65625 8.101562 0.1875 6.40625 -0.75 C 4.71875 -1.6875 3.410156 -3.023438 2.484375 -4.765625 C 1.566406 -6.503906 1.109375 -8.570312 1.109375 -10.96875 C 1.109375 -13.351562 1.566406 -15.414062 2.484375 -17.15625 C 3.410156 -18.894531 4.722656 -20.234375 6.421875 -21.171875 C 8.117188 -22.117188 10.128906 -22.59375 12.453125 -22.59375 C 14.773438 -22.59375 16.785156 -22.117188 18.484375 -21.171875 C 20.179688 -20.234375 21.492188 -18.898438 22.421875 -17.171875 C 23.347656 -15.441406 23.8125 -13.378906 23.8125 -10.984375 C 23.8125 -8.585938 23.347656 -6.515625 22.421875 -4.765625 C 21.503906 -3.023438 20.195312 -1.6875 18.5 -0.75 C 16.8125 0.1875 14.796875 0.65625 12.453125 0.65625 Z M 12.453125 -3.734375 C 14.003906 -3.734375 15.234375 -4.304688 16.140625 -5.453125 C 17.054688 -6.609375 17.515625 -8.453125 17.515625 -10.984375 C 17.515625 -13.503906 17.0625 -15.335938 16.15625 -16.484375 C 15.257812 -17.628906 14.023438 -18.203125 12.453125 -18.203125 C 10.890625 -18.203125 9.648438 -17.625 8.734375 -16.46875 C 7.828125 -15.320312 7.375 -13.488281 7.375 -10.96875 C 7.375 -8.445312 7.832031 -6.609375 8.75 -5.453125 C 9.664062 -4.304688 10.898438 -3.734375 12.453125 -3.734375 Z"/></g></g></g></g></g></svg>`;

// ─── CSS ────────────────────────────────────────────────────────────────────
const CSS = `
:root {
  --p: #c96442; --ink: #262624; --light: #e1e1e1;
  --neutral: #888; --white: #fff;
  --xs:6px; --sm:10px; --md:16px; --lg:24px; --xl:36px; --xxl:56px;
  --r-sm:8px; --r-md:14px; --r-lg:22px;
  --sh-card:0 16px 34px rgba(0,0,0,.18); --sh-soft:0 8px 20px rgba(0,0,0,.12);
}
*{box-sizing:border-box}
body{margin:0;padding:var(--xl);font-family:Arial,"Helvetica Neue",Helvetica,sans-serif;
  color:var(--ink);background:linear-gradient(135deg,#f6f2ef 0%,#ebe4df 100%)}
.deck{max-width:1560px;margin:0 auto;display:grid;gap:var(--lg)}
.slide{border-radius:var(--r-lg);background:var(--white);box-shadow:var(--sh-card);
  min-height:640px;padding:var(--xxl);position:relative;overflow:hidden;
  border:1px solid rgba(38,38,36,.08)}
.slide::after{content:"";position:absolute;top:0;right:0;width:220px;height:220px;
  background:radial-gradient(circle at top right,rgba(201,100,66,.22),transparent 68%);
  pointer-events:none}
.cover{display:grid;align-content:center;gap:var(--lg);
  background:linear-gradient(160deg,var(--ink) 0%,#373734 60%,var(--p) 100%);
  color:var(--light)}
.cover h1{margin:0;font-size:clamp(36px,5vw,72px);letter-spacing:.02em}
.brand-mark{display:inline-flex;align-items:center;gap:var(--md);
  font-weight:700;letter-spacing:.04em;text-transform:uppercase;font-size:13px}
.logo-inline{width:120px;max-height:44px;display:inline-flex;align-items:center}
.logo-inline svg{width:100%;height:auto;display:block}
.kicker{margin:0;text-transform:uppercase;letter-spacing:.08em;font-size:12px;
  color:var(--p);font-weight:700}
.cover .kicker{color:rgba(255,255,255,.55)}
h2{margin:var(--sm) 0 var(--md);font-size:clamp(26px,3.4vw,44px);line-height:1.15}
h3{margin:0 0 var(--sm);font-size:clamp(18px,2vw,26px)}
p{margin:0;line-height:1.45;font-size:clamp(15px,1.6vw,20px);color:var(--ink)}
.muted{color:var(--neutral);font-style:italic}
.grid-2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--lg)}
.grid-3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--md)}
.card{border-radius:var(--r-md);border:1px solid rgba(38,38,36,.1);padding:var(--lg);
  background:linear-gradient(180deg,#fff 0%,#faf7f5 100%);box-shadow:var(--sh-soft)}
.card--hi{border-color:rgba(201,100,66,.4);outline:2px solid rgba(201,100,66,.18)}
ul,ol{margin:0;padding-left:1.25rem;display:grid;gap:var(--sm)}
li{line-height:1.4;font-size:clamp(13px,1.4vw,18px)}
.meta-strip{display:flex;flex-wrap:wrap;gap:var(--sm) var(--lg);margin-top:var(--sm)}
.meta-item{display:flex;flex-direction:column;gap:2px}
.meta-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:rgba(255,255,255,.45)}
.meta-val{font-size:clamp(13px,1.4vw,17px);color:#f1efed}
.badge{display:inline-block;padding:3px 12px;border-radius:999px;font-size:12px;
  font-weight:700;letter-spacing:.05em;text-transform:uppercase}
.s-positive{background:rgba(34,197,94,.15);color:#166534}
.s-negative{background:rgba(239,68,68,.15);color:#991b1b}
.s-mixed{background:rgba(234,179,8,.15);color:#713f12}
.s-neutral{background:rgba(148,163,184,.18);color:#334155}
.sig-card{border-radius:var(--r-md);border:1px solid rgba(38,38,36,.1);padding:var(--lg);
  background:linear-gradient(180deg,#fff 0%,#faf7f5 100%);box-shadow:var(--sh-soft)}
.sig-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:var(--p);margin-bottom:var(--xs)}
.sig-val{font-size:clamp(13px,1.35vw,17px);line-height:1.45;color:var(--ink)}
.quote{border-left:4px solid var(--p);padding:var(--md) var(--lg);margin:0;
  background:rgba(201,100,66,.05);border-radius:0 var(--r-sm) var(--r-sm) 0;
  font-size:clamp(13px,1.4vw,18px);line-height:1.5;color:var(--ink);font-style:italic}
.table-wrap{overflow-x:auto;border-radius:var(--r-md);border:1px solid rgba(38,38,36,.12)}
table{width:100%;border-collapse:collapse;font-size:clamp(12px,1.3vw,17px)}
thead th{text-align:left;background:rgba(201,100,66,.14);color:var(--ink);
  font-weight:700;padding:11px 13px}
tbody td{padding:11px 13px;border-top:1px solid rgba(38,38,36,.1);vertical-align:top}
.footer-meta{position:absolute;bottom:var(--lg);left:var(--xxl);right:var(--xxl);
  display:flex;justify-content:space-between;align-items:center;color:var(--neutral);
  font-size:11px;letter-spacing:.04em;text-transform:uppercase}
@media(max-width:1100px){
  .grid-2,.grid-3{grid-template-columns:1fr}
  .footer-meta{position:static;margin-top:var(--lg);flex-direction:column;gap:var(--xs)}}
`;

// ─── Section Builders ────────────────────────────────────────────────────────

const slide1_cover = () => `
<section class="slide cover">
  <div class="brand-mark">
    <span class="logo-inline">${LOGO_SVG}</span>
  </div>
  <p class="kicker">Call Analysis</p>
  <h1>${esc(meta.title || 'Call Analysis')}</h1>
  <div class="meta-strip">
    <div class="meta-item"><span class="meta-label">Date</span><span class="meta-val">${esc(meta.date)}</span></div>
    <div class="meta-item"><span class="meta-label">Duration</span><span class="meta-val">${esc(String(meta.duration_minutes || '—'))} min</span></div>
    <div class="meta-item"><span class="meta-label">Organizer</span><span class="meta-val">${esc(meta.organizer)}</span></div>
    <div class="meta-item"><span class="meta-label">Sentiment</span><span class="meta-val"><span class="badge ${sentimentClass(sentiment)}">${sentiment}</span></span></div>
  </div>
  <div class="footer-meta">
    <span>${esc(prospect.company_name || '')}</span>
    <span>Prepared by Paioneers B.V.</span>
  </div>
</section>`;

const slide2_summary = () => `
<section class="slide">
  <p class="kicker">Summary</p>
  <h2>What Happened on This Call</h2>
  <div class="card card--hi">
    <p>${esc(d.executive_summary)}</p>
  </div>
</section>`;

const slide3_prospect = () => `
<section class="slide">
  <p class="kicker">Prospect Intelligence</p>
  <h2>Who We Spoke To</h2>
  <div class="grid-2" style="margin-bottom:var(--lg)">
    <div class="card">
      <h3>Contact</h3>
      <ul>
        <li><strong>Name:</strong> ${or(prospect.contact_name)}</li>
        <li><strong>Role:</strong> ${or(prospect.role)}</li>
        <li><strong>Company:</strong> ${or(prospect.company_name)}</li>
        <li><strong>Industry:</strong> ${or(prospect.industry)}</li>
        <li><strong>Size:</strong> ${or(prospect.company_size)}</li>
      </ul>
    </div>
    <div class="card">
      <h3>Attendees</h3>
      ${list(meta.attendees, '<p class="muted">No attendees listed.</p>')}
    </div>
  </div>
  <div class="grid-3">
    <div class="sig-card"><div class="sig-label">Current Solution</div><div class="sig-val">${or(d.current_solution, 'Not mentioned')}</div></div>
    <div class="sig-card"><div class="sig-label">Budget Signal</div><div class="sig-val">${or(d.budget_signals, 'Not mentioned')}</div></div>
    <div class="sig-card"><div class="sig-label">Timeline Signal</div><div class="sig-val">${or(d.timeline_signals, 'Not mentioned')}</div></div>
  </div>
</section>`;

const slide4_discovery = () => `
<section class="slide">
  <p class="kicker">Discovery Intelligence</p>
  <h2>Pain Points &amp; Objections</h2>
  <div class="grid-2">
    <div class="card">
      <h3>Pain Points</h3>
      ${list(pain, '<p class="muted">None extracted.</p>')}
    </div>
    <div class="card">
      <h3>Objections</h3>
      ${list(obj, '<p class="muted">No objections recorded.</p>')}
    </div>
  </div>
</section>`;

const slide5_quotes = () => quotes.length ? `
<section class="slide">
  <p class="kicker">Voice of Prospect</p>
  <h2>Key Quotes</h2>
  <div style="display:grid;gap:var(--md)">
    ${quotes.map(q => `<blockquote class="quote">&ldquo;${esc(q)}&rdquo;</blockquote>`).join('')}
  </div>
</section>` : '';

const slide6_actions = () => `
<section class="slide">
  <p class="kicker">Execution</p>
  <h2>Action Items</h2>
  ${actions.length
    ? `<div class="table-wrap"><table>
        <thead><tr><th>Owner</th><th>Action</th><th>Due Date</th></tr></thead>
        <tbody>${actions.map(a =>
          `<tr><td>${esc(a.owner)}</td><td>${esc(a.action)}</td><td>${a.due_date ? esc(a.due_date) : '<span class="muted">TBD</span>'}</td></tr>`
        ).join('')}</tbody>
       </table></div>`
    : '<div class="card"><p class="muted">No explicit action items recorded.</p></div>'
  }
</section>`;

const slide7_strategy = () => `
<section class="slide">
  <p class="kicker">Strategic Read</p>
  <h2>Assessment &amp; Next Move</h2>
  <div class="grid-2">
    <div class="card">
      <h3>Strategic Assessment</h3>
      <p>${esc(d.strategic_assessment)}</p>
    </div>
    <div class="card card--hi">
      <h3>Recommended Approach</h3>
      <p>${esc(d.recommended_approach)}</p>
      ${d.next_steps ? `<p style="margin-top:var(--md);font-weight:700;color:var(--p)">Agreed Next Step: ${esc(d.next_steps)}</p>` : ''}
    </div>
  </div>
  <div class="footer-meta">
    <span>www.paioneers.nl</span>
    <span>Prepared by Paioneers B.V. · Confidential</span>
  </div>
</section>`;

// ─── Assemble Document ───────────────────────────────────────────────────────
const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Call Analysis — ${esc(meta.title || '')}</title>
  <style>${CSS}</style>
</head>
<body>
  <main class="deck">
    ${slide1_cover()}
    ${slide2_summary()}
    ${slide3_prospect()}
    ${slide4_discovery()}
    ${slide5_quotes()}
    ${slide6_actions()}
    ${slide7_strategy()}
  </main>
</body>
</html>`;

return [{ json: { html, fileName } }];
