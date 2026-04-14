const { createCanvas } = require('canvas');
const fs = require('fs');

const W = 1440;
const H = 4400;
const canvas = createCanvas(W, H);
const ctx = canvas.getContext('2d');

// ----- Color palette (dark theme) -----
const bg = '#0f0f13';
const cardBg = '#1a1a24';
const cardBorder = '#2a2a3a';
const textPrimary = '#e8e8ef';
const textSecondary = '#8888a0';
const accent = '#7c6ef0';
const green = '#3ecf8e';
const orange = '#f0a050';
const red = '#e05050';
const blue = '#50a0e0';
const yellow = '#e0d050';
const pink = '#e06090';
const teal = '#40c0b0';

// ----- Helpers -----
function roundRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawCard(x, y, w, h) {
  roundRect(x, y, w, h, 12);
  ctx.fillStyle = cardBg;
  ctx.fill();
  ctx.strokeStyle = cardBorder;
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawText(text, x, y, opts = {}) {
  const { font = '14px sans-serif', color = textPrimary, align = 'left' } = opts;
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = 'top';
  ctx.fillText(text, x, y);
}

function drawTag(text, x, y, color = accent) {
  ctx.font = '11px sans-serif';
  const tw = ctx.measureText(text).width + 16;
  roundRect(x, y, tw, 24, 12);
  ctx.fillStyle = color + '25';
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();
  drawText(text, x + 8, y + 6, { font: '11px sans-serif', color });
  return tw + 6;
}

function drawBadge(text, x, y, color) {
  ctx.font = 'bold 10px sans-serif';
  const tw = ctx.measureText(text).width + 12;
  roundRect(x, y, tw, 20, 10);
  ctx.fillStyle = color;
  ctx.fill();
  drawText(text, x + 6, y + 5, { font: 'bold 10px sans-serif', color: '#fff' });
  return tw;
}

function drawSectionTitle(text, y) {
  drawText(text, 60, y, { font: 'bold 20px sans-serif', color: textPrimary });
  return y + 36;
}

// ----- Background -----
ctx.fillStyle = bg;
ctx.fillRect(0, 0, W, H);

let curY = 40;

// ===== Page Header =====
drawText('Plot Analysis', 60, curY, { font: 'bold 28px sans-serif', color: textPrimary });
drawText('/stories/[...id]/insights/plot', 60, curY + 36, { font: '13px sans-serif', color: textSecondary });
curY += 90;

// ===================================================================
// SECTION 1: Charts (side by side)
// ===================================================================
curY = drawSectionTitle('Plot Overview', curY);

const chartCardW = (W - 140) / 2;
const chartCardH = 320;
const chapters = 12;

// --- Event Density Chart (left) ---
drawCard(60, curY, chartCardW, chartCardH);
drawText('Event Density', 80, curY + 16, { font: 'bold 14px sans-serif' });
drawText('Events per chapter', 80, curY + 36, { font: '12px sans-serif', color: textSecondary });

const edData = [5, 8, 4, 12, 6, 3, 9, 11, 7, 14, 10, 16];
const cX1 = 100, cY1 = curY + 70, cW1 = chartCardW - 80, cH1 = 210;
const maxEd = 18;

// Grid lines
for (let i = 0; i <= 4; i++) {
  const yy = cY1 + cH1 - (i / 4) * cH1;
  ctx.beginPath(); ctx.moveTo(cX1, yy); ctx.lineTo(cX1 + cW1, yy);
  ctx.strokeStyle = '#1e1e2e'; ctx.lineWidth = 1; ctx.stroke();
  drawText(String(Math.round(maxEd * i / 4)), cX1 - 22, yy - 6, { font: '10px sans-serif', color: textSecondary });
}

// Area fill
ctx.beginPath();
ctx.moveTo(cX1, cY1 + cH1);
edData.forEach((v, i) => {
  ctx.lineTo(cX1 + (i / (chapters - 1)) * cW1, cY1 + cH1 - (v / maxEd) * cH1);
});
ctx.lineTo(cX1 + cW1, cY1 + cH1);
ctx.closePath();
const grad1 = ctx.createLinearGradient(0, cY1, 0, cY1 + cH1);
grad1.addColorStop(0, 'rgba(124,110,240,0.3)');
grad1.addColorStop(1, 'rgba(124,110,240,0.02)');
ctx.fillStyle = grad1;
ctx.fill();

// Line
ctx.beginPath();
edData.forEach((v, i) => {
  const px = cX1 + (i / (chapters - 1)) * cW1;
  const py = cY1 + cH1 - (v / maxEd) * cH1;
  i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
});
ctx.strokeStyle = accent; ctx.lineWidth = 2.5; ctx.stroke();

// Dots + x labels
edData.forEach((v, i) => {
  const px = cX1 + (i / (chapters - 1)) * cW1;
  const py = cY1 + cH1 - (v / maxEd) * cH1;
  ctx.beginPath(); ctx.arc(px, py, 3.5, 0, Math.PI * 2); ctx.fillStyle = accent; ctx.fill();
  drawText(`${i + 1}`, px - 4, cY1 + cH1 + 8, { font: '10px sans-serif', color: textSecondary });
});

// --- Chapter Distribution Line Chart (right) ---
const chart2X = 60 + chartCardW + 20;
drawCard(chart2X, curY, chartCardW, chartCardH);
drawText('Chapter Plot Distribution', chart2X + 20, curY + 16, { font: 'bold 14px sans-serif' });
drawText('Plot elements across chapters', chart2X + 20, curY + 36, { font: '12px sans-serif', color: textSecondary });

const plotLines = {
  'Setups': { color: blue, data: [3, 4, 2, 5, 1, 0, 2, 1, 0, 0, 1, 0] },
  'Payoffs': { color: green, data: [0, 0, 1, 1, 2, 1, 2, 3, 2, 3, 4, 5] },
  'Twists': { color: orange, data: [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1] },
  'Reveals': { color: pink, data: [0, 0, 0, 0, 1, 0, 0, 1, 1, 2, 1, 2] },
};
const cX2 = chart2X + 40, cY2 = curY + 70, cW2 = chartCardW - 80, cH2 = 210;
const maxDist = 6;

// Grid
for (let i = 0; i <= 3; i++) {
  const yy = cY2 + cH2 - (i / 3) * cH2;
  ctx.beginPath(); ctx.moveTo(cX2, yy); ctx.lineTo(cX2 + cW2, yy);
  ctx.strokeStyle = '#1e1e2e'; ctx.lineWidth = 1; ctx.stroke();
  drawText(String(Math.round(maxDist * i / 3)), cX2 - 20, yy - 6, { font: '10px sans-serif', color: textSecondary });
}

// Lines
Object.entries(plotLines).forEach(([name, { color, data }]) => {
  ctx.beginPath();
  data.forEach((v, i) => {
    const px = cX2 + (i / (chapters - 1)) * cW2;
    const py = cY2 + cH2 - (v / maxDist) * cH2;
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  });
  ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
  data.forEach((v, i) => {
    const px = cX2 + (i / (chapters - 1)) * cW2;
    const py = cY2 + cH2 - (v / maxDist) * cH2;
    ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill();
  });
});

// X labels
for (let i = 0; i < chapters; i++) {
  const px = cX2 + (i / (chapters - 1)) * cW2;
  drawText(`${i + 1}`, px - 4, cY2 + cH2 + 8, { font: '10px sans-serif', color: textSecondary });
}

// Legend
let lx = chart2X + 20;
const ly = curY + chartCardH - 30;
Object.entries(plotLines).forEach(([name, { color }]) => {
  ctx.beginPath();
  ctx.moveTo(lx, ly + 6); ctx.lineTo(lx + 16, ly + 6);
  ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
  ctx.beginPath(); ctx.arc(lx + 8, ly + 6, 3, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill();
  drawText(name, lx + 22, ly, { font: '11px sans-serif', color: textSecondary });
  lx += ctx.measureText(name).width + 40;
});

curY += chartCardH + 40;

// ===================================================================
// SECTION 2: Plot Threads Tracker (with hover tooltip mockup)
// ===================================================================
curY = drawSectionTitle('Plot Threads', curY);

const threads = [
  { name: 'The Lost Artifact', status: 'ACTIVE', importance: 'High', mustResolve: true, color: green },
  { name: 'Marcus\u2019s Betrayal', status: 'ACTIVE', importance: 'High', mustResolve: true, color: green },
  { name: 'The Prophecy', status: 'ACTIVE', importance: 'Medium', mustResolve: true, color: blue },
  { name: 'Elena & Jin Alliance', status: 'INTRODUCED', importance: 'Medium', mustResolve: false, color: blue },
  { name: 'The Watcher\u2019s Identity', status: 'ACTIVE', importance: 'High', mustResolve: true, color: green },
  { name: 'Village Uprising', status: 'RESOLVED', importance: 'Low', mustResolve: false, color: textSecondary },
  { name: 'Ancient Cipher', status: 'RESOLVED', importance: 'Medium', mustResolve: true, color: textSecondary },
  { name: 'Guard Conspiracy', status: 'DORMANT', importance: 'Medium', mustResolve: false, color: orange },
];

const statusColors = { ACTIVE: green, INTRODUCED: blue, RESOLVED: textSecondary, DORMANT: orange };
const threadCardH = threads.length * 44 + 50;
drawCard(60, curY, W - 120, threadCardH);

// Header row
const thColWidths = [300, 120, 120, 120, 200];
const thHeaders = ['Thread Name', 'Status', 'Importance', 'Must Resolve', ''];
let thx = 80;
thHeaders.forEach((h, i) => {
  drawText(h, thx, curY + 16, { font: 'bold 12px sans-serif', color: textSecondary });
  thx += thColWidths[i];
});

threads.forEach((t, ri) => {
  const ry = curY + 44 + ri * 44;

  if (ri % 2 === 0) {
    roundRect(60, ry, W - 120, 44, 0);
    ctx.fillStyle = '#14141e';
    ctx.fill();
  }

  let rx = 80;
  drawText(t.name, rx, ry + 14, { font: '14px sans-serif', color: textPrimary });
  rx += thColWidths[0];

  drawBadge(t.status, rx, ry + 12, statusColors[t.status]);
  rx += thColWidths[1];

  drawText(t.importance, rx, ry + 14, { font: '13px sans-serif', color: t.color });
  rx += thColWidths[2];

  drawText(t.mustResolve ? 'Yes' : 'No', rx, ry + 14, { font: '13px sans-serif', color: t.mustResolve ? orange : textSecondary });
  rx += thColWidths[3];

  drawText('Hover for timeline \u2192', rx, ry + 14, { font: '12px sans-serif', color: accent });
});

// --- Tooltip mockup overlaid on "The Lost Artifact" row ---
const tooltipX = 700;
const tooltipY = curY + 44 + 0 * 44 - 10;
const tooltipW = 480;
const tooltipH = 200;

// Shadow
ctx.shadowColor = 'rgba(0,0,0,0.5)';
ctx.shadowBlur = 20;
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 4;
roundRect(tooltipX, tooltipY, tooltipW, tooltipH, 12);
ctx.fillStyle = '#22223a';
ctx.fill();
ctx.strokeStyle = accent;
ctx.lineWidth = 1;
ctx.stroke();
ctx.shadowColor = 'transparent';
ctx.shadowBlur = 0;

drawText('The Lost Artifact \u2014 Timeline', tooltipX + 16, tooltipY + 12, { font: 'bold 13px sans-serif', color: textPrimary });

// Mini timeline inside tooltip
const tlStates = [
  { ch: 1, status: 'Introduced' },
  { ch: 2, status: 'Active' },
  { ch: 3, status: 'Active' },
  { ch: 4, status: 'Active' },
  { ch: 6, status: 'Active' },
  { ch: 7, status: 'Active' },
  { ch: 8, status: 'Escalated' },
  { ch: 9, status: 'Active' },
  { ch: 10, status: 'Climax' },
];

const tlX = tooltipX + 16;
const tlY = tooltipY + 40;
const tlW = tooltipW - 32;
const dotSpacing = tlW / (chapters - 1);

// Horizontal line
ctx.beginPath();
ctx.moveTo(tlX, tlY + 30);
ctx.lineTo(tlX + tlW, tlY + 30);
ctx.strokeStyle = cardBorder;
ctx.lineWidth = 2;
ctx.stroke();

// Chapter dots
const stateMap = {};
tlStates.forEach(s => { stateMap[s.ch] = s.status; });
const stateColors = { Introduced: blue, Active: green, Escalated: orange, Climax: red };

for (let i = 1; i <= chapters; i++) {
  const dx = tlX + (i - 1) * dotSpacing;
  const state = stateMap[i];
  const dotColor = state ? (stateColors[state] || accent) : '#2a2a3a';
  const dotR = state ? 8 : 5;

  ctx.beginPath();
  ctx.arc(dx, tlY + 30, dotR, 0, Math.PI * 2);
  ctx.fillStyle = dotColor;
  ctx.fill();
  if (state) {
    ctx.strokeStyle = dotColor;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  drawText(`Ch ${i}`, dx - 10, tlY + 46, { font: '9px sans-serif', color: textSecondary });

  if (state && state !== 'Active') {
    drawText(state, dx - 14, tlY + 8, { font: 'bold 9px sans-serif', color: stateColors[state] });
  }
}

// Legend inside tooltip
const legendItems = [
  { label: 'Introduced', color: blue },
  { label: 'Active', color: green },
  { label: 'Escalated', color: orange },
  { label: 'Climax', color: red },
  { label: 'Absent', color: '#2a2a3a' },
];
let llx = tlX;
const lly = tooltipY + tooltipH - 30;
legendItems.forEach(({ label, color }) => {
  ctx.beginPath();
  ctx.arc(llx + 5, lly + 5, 4, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  drawText(label, llx + 14, lly - 1, { font: '10px sans-serif', color: textSecondary });
  llx += ctx.measureText(label).width + 30;
});

// Tooltip label
drawText('\u2190 ThreadTimelineTracker as tooltip', tooltipX + tooltipW + 12, tooltipY + tooltipH / 2 - 6, { font: 'italic 12px sans-serif', color: accent });

curY += threadCardH + 40;

// ===================================================================
// SECTION 3: Dormant Thread Tracker
// ===================================================================
curY = drawSectionTitle('Dormant Threads', curY);

const dormantThreads = [
  { name: 'Guard Conspiracy', importance: 'Medium', dormantSince: 'Ch 5', chaptersDormant: 7, mustResolve: false },
];

const dormCardH = 100;
drawCard(60, curY, W - 120, dormCardH);

dormantThreads.forEach((dt, i) => {
  const dy = curY + 20 + i * 50;
  drawText(dt.name, 80, dy, { font: 'bold 14px sans-serif', color: orange });
  drawBadge('DORMANT', 80 + ctx.measureText(dt.name).width + 12, dy + 2, orange);

  drawText(`Importance: ${dt.importance}`, 80, dy + 26, { font: '12px sans-serif', color: textSecondary });
  drawText(`Dormant since: ${dt.dormantSince}`, 280, dy + 26, { font: '12px sans-serif', color: textSecondary });
  drawText(`${dt.chaptersDormant} chapters dormant`, 480, dy + 26, { font: '12px sans-serif', color: orange });
  drawText(`Must Resolve: ${dt.mustResolve ? 'Yes' : 'No'}`, 660, dy + 26, { font: '12px sans-serif', color: textSecondary });

  // Warning icon
  drawText('\u26A0 Consider revisiting or resolving this thread', 80, dy + 48, { font: '12px sans-serif', color: orange });
});

curY += dormCardH + 40;

// ===================================================================
// SECTION 4: Setups & Payoffs
// ===================================================================
curY = drawSectionTitle('Setups & Payoffs', curY);

const setups = [
  { setup: 'Ancient map discovered in library', ch: 'Ch 1', emphasis: 'High', mustPayOff: true, payoffs: [
    { desc: 'Map leads to hidden temple entrance', ch: 'Ch 7', resolution: 'Full' },
  ]},
  { setup: 'Elena overhears guards mention "the vault"', ch: 'Ch 2', emphasis: 'Medium', mustPayOff: true, payoffs: [
    { desc: 'Vault referenced again by Marcus', ch: 'Ch 4', resolution: 'Reminder' },
    { desc: 'Vault discovered and entered', ch: 'Ch 10', resolution: 'Full' },
  ]},
  { setup: 'Dr. Osei warns about the curse', ch: 'Ch 3', emphasis: 'High', mustPayOff: true, payoffs: [
    { desc: 'Curse effect witnessed on minor character', ch: 'Ch 6', resolution: 'Partial' },
  ]},
  { setup: 'Jin carries a mysterious locket', ch: 'Ch 7', emphasis: 'Low', mustPayOff: false, payoffs: [] },
  { setup: 'Strange symbol on temple wall', ch: 'Ch 8', emphasis: 'Medium', mustPayOff: true, payoffs: [] },
];

const resolutionColors = { Full: green, Partial: orange, Reminder: blue };

setups.forEach((s, si) => {
  const hasPayoffs = s.payoffs.length > 0;
  const setupH = 60 + (hasPayoffs ? s.payoffs.length * 30 + 20 : 0);
  drawCard(60, curY, W - 120, setupH);

  // Setup row
  drawText('\u2699 Setup:', 80, curY + 16, { font: 'bold 12px sans-serif', color: textSecondary });
  drawText(s.setup, 160, curY + 16, { font: '14px sans-serif', color: textPrimary });

  const metaX = W - 380;
  drawTag(s.ch, metaX, curY + 12, accent);
  drawText(`Emphasis: ${s.emphasis}`, metaX + 70, curY + 16, { font: '12px sans-serif', color: textSecondary });
  if (s.mustPayOff) {
    drawBadge('MUST PAY OFF', metaX + 200, curY + 14, red);
  }

  // Payoff rows
  if (hasPayoffs) {
    s.payoffs.forEach((p, pi) => {
      const py = curY + 50 + pi * 30;
      drawText('  \u2192 Payoff:', 100, py, { font: 'bold 12px sans-serif', color: green });
      drawText(p.desc, 200, py, { font: '13px sans-serif', color: textPrimary });
      drawTag(p.ch, metaX, py - 4, green);
      drawBadge(p.resolution.toUpperCase(), metaX + 70, py - 2, resolutionColors[p.resolution]);
    });
  } else {
    drawText('  \u26A0 No payoff yet', 100, curY + 38, { font: '12px sans-serif', color: orange });
  }

  curY += setupH + 12;
});

curY += 28;

// ===================================================================
// SECTION 5: Story Questions
// ===================================================================
curY = drawSectionTitle('Story Questions', curY);

const questions = [
  { q: 'What is the artifact\u2019s true power?', status: 'RAISED', importance: 'High' },
  { q: 'Who is The Watcher?', status: 'RAISED', importance: 'High' },
  { q: 'Will Marcus betray Elena?', status: 'RAISED', importance: 'High' },
  { q: 'What happened to Elena\u2019s parents?', status: 'RAISED', importance: 'Medium' },
  { q: 'Why were the guards at the library?', status: 'ANSWERED', importance: 'Low' },
  { q: 'Is the ancient map authentic?', status: 'ANSWERED', importance: 'Medium' },
];

const qCardH = questions.length * 40 + 40;
drawCard(60, curY, W - 120, qCardH);

// Headers
drawText('Question', 80, curY + 14, { font: 'bold 12px sans-serif', color: textSecondary });
drawText('Status', W - 380, curY + 14, { font: 'bold 12px sans-serif', color: textSecondary });
drawText('Importance', W - 240, curY + 14, { font: 'bold 12px sans-serif', color: textSecondary });

questions.forEach((q, i) => {
  const qy = curY + 40 + i * 40;

  if (i % 2 === 0) {
    roundRect(60, qy, W - 120, 40, 0);
    ctx.fillStyle = '#14141e';
    ctx.fill();
  }

  drawText(q.q, 80, qy + 12, { font: '13px sans-serif', color: textPrimary });
  drawBadge(q.status, W - 380, qy + 10, q.status === 'RAISED' ? orange : green);
  drawText(q.importance, W - 240, qy + 12, { font: '13px sans-serif', color: q.importance === 'High' ? orange : q.importance === 'Medium' ? blue : textSecondary });
});

curY += qCardH + 40;

// ===================================================================
// SECTION 6: Deus Ex Machina Tracker
// ===================================================================
curY = drawSectionTitle('Contrivance Risks', curY);

const risks = [
  { problem: 'Elena finds the exact tool she needs hidden in a wall cavity with no prior setup', risk: 8, priorSetup: false },
  { problem: 'Marcus conveniently overhears a private conversation while passing by', risk: 5, priorSetup: true },
  { problem: 'A sudden storm prevents the guards from pursuing the group', risk: 6, priorSetup: false },
];

const riskCardH = risks.length * 56 + 30;
drawCard(60, curY, W - 120, riskCardH);

risks.forEach((r, i) => {
  const ry = curY + 16 + i * 56;

  // Risk score bar
  const barW = 60;
  const barH = 8;
  const barX = 80;
  const barY = ry + 6;
  roundRect(barX, barY, barW, barH, 4);
  ctx.fillStyle = '#1e1e2e';
  ctx.fill();
  roundRect(barX, barY, barW * (r.risk / 10), barH, 4);
  ctx.fillStyle = r.risk >= 7 ? red : r.risk >= 4 ? orange : green;
  ctx.fill();

  drawText(`${r.risk}/10`, barX + barW + 8, ry + 2, { font: 'bold 12px sans-serif', color: r.risk >= 7 ? red : orange });
  drawText(r.problem, 170, ry + 2, { font: '13px sans-serif', color: textPrimary });

  // Prior setup
  const setupLabel = r.priorSetup ? '\u2713 Has prior setup' : '\u2717 No prior setup';
  const setupColor = r.priorSetup ? green : red;
  drawText(setupLabel, 170, ry + 24, { font: '12px sans-serif', color: setupColor });

  if (!r.priorSetup) {
    drawText('\u2192 Consider adding foreshadowing in an earlier chapter', 400, ry + 24, { font: '12px sans-serif', color: textSecondary });
  }
});

curY += riskCardH + 40;

// ===================================================================
// SECTION 7: Plot Reports (side by side)
// ===================================================================
curY = drawSectionTitle('Reports', curY);

const reportW = (W - 140) / 2;
const reportH = 280;

// --- Plot Structural Report (left) ---
drawCard(60, curY, reportW, reportH);
drawText('Plot Structure Report', 80, curY + 16, { font: 'bold 14px sans-serif' });

const structLines = [
  'The story follows a classic three-act structure with well-defined turning points.',
  '',
  '\u2022 Act 1 (Ch 1-4): Strong setup with escalating stakes. Multiple threads',
  '  introduced organically through character discovery.',
  '\u2022 Act 2 (Ch 5-9): Good midpoint reversal in Ch 7. Pacing dips slightly',
  '  in Ch 5-6 \u2014 consider tightening.',
  '\u2022 Act 3 (Ch 10-12): Strong convergence of threads. Event density',
  '  builds appropriately toward climax.',
  '',
  '5 of 8 threads resolved or approaching resolution.',
  '2 setups still awaiting payoff \u2014 ensure these land by Ch 12.',
];

structLines.forEach((line, i) => {
  drawText(line, 80, curY + 42 + i * 20, { font: '12px sans-serif', color: i === 0 ? textPrimary : textSecondary });
});

// --- Plot Rhythm Report (right) ---
const report2X = 60 + reportW + 20;
drawCard(report2X, curY, reportW, reportH);
drawText('Plot Rhythm Report', report2X + 20, curY + 16, { font: 'bold 14px sans-serif' });

const rhythmLines = [
  'Pacing analysis across 12 chapters:',
  '',
  '\u2022 Tension curve follows an effective rise-fall-rise pattern.',
  '\u2022 Ch 5-6 form a deliberate "valley" \u2014 good for character development',
  '  but risks losing momentum if scenes lack urgency.',
  '\u2022 Ch 8 spike (11 events) is well-placed as a midpoint escalation.',
  '\u2022 Final 3 chapters maintain high density (10, 14, 16 events) \u2014',
  '  strong drive toward resolution.',
  '',
  'Recommendation: Add a minor revelation or confrontation in Ch 5',
  'to maintain reader engagement through the mid-story valley.',
];

rhythmLines.forEach((line, i) => {
  drawText(line, report2X + 20, curY + 42 + i * 20, { font: '12px sans-serif', color: i === 0 ? textPrimary : textSecondary });
});

curY += reportH + 40;

// ===== Footer =====
drawText('Page: /stories/[...id]/insights/plot', 60, curY, { font: '12px sans-serif', color: textSecondary });
drawText(
  'Components: EventDensityChart, ChapterDistributionLineChart, PlotThreadsTracker, ThreadTimelineTracker (tooltip),',
  60, curY + 20, { font: '11px sans-serif', color: textSecondary }
);
drawText(
  'DormantThreadTracker, SetupPayoffTracker, SetupTracker, StoryQuestionsTracker, DeusExMachinaTracker, PlotReportCard, PlotRhythmReportCard',
  60, curY + 36, { font: '11px sans-serif', color: textSecondary }
);

// ===== Save =====
const buf = canvas.toBuffer('image/png');
fs.writeFileSync(__dirname + '/../plot-analysis.png', buf);
console.log('Saved plot-analysis.png');
