const { createCanvas } = require('canvas');
const fs = require('fs');

const W = 1440;
const H = 3800;
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
const cyan = '#00d4ff';
const purple = '#8000ff';

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

function drawBadge(text, x, y, color) {
  ctx.font = 'bold 10px sans-serif';
  const tw = ctx.measureText(text).width + 12;
  roundRect(x, y, tw, 20, 10);
  ctx.fillStyle = color;
  ctx.fill();
  drawText(text, x + 6, y + 5, { font: 'bold 10px sans-serif', color: '#fff' });
  return tw;
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

function drawSectionTitle(text, y) {
  drawText(text, 60, y, { font: 'bold 20px sans-serif', color: textPrimary });
  return y + 36;
}

// ----- Background -----
ctx.fillStyle = bg;
ctx.fillRect(0, 0, W, H);

let curY = 40;

// ===== Page Header =====
drawText('World Analysis', 60, curY, { font: 'bold 28px sans-serif', color: textPrimary });
drawText('/stories/[...id]/insights/world', 60, curY + 36, { font: '13px sans-serif', color: textSecondary });
curY += 90;

// ===================================================================
// SECTION 1: Fact Density Chart
// ===================================================================
curY = drawSectionTitle('Fact Density', curY);

const chartCardW = W - 120;
const chartCardH = 320;
const chapters = 12;
drawCard(60, curY, chartCardW, chartCardH);
drawText('World-building facts introduced per chapter', 80, curY + 16, { font: '12px sans-serif', color: textSecondary });

const factData = [8, 12, 6, 4, 3, 7, 10, 5, 2, 3, 4, 2];
const cX = 100, cY1 = curY + 50, cW = chartCardW - 100, cH = 230;
const maxFacts = 14;

// Grid lines
for (let i = 0; i <= 4; i++) {
  const yy = cY1 + cH - (i / 4) * cH;
  ctx.beginPath(); ctx.moveTo(cX, yy); ctx.lineTo(cX + cW, yy);
  ctx.strokeStyle = '#1e1e2e'; ctx.lineWidth = 1; ctx.stroke();
  drawText(String(Math.round(maxFacts * i / 4)), cX - 22, yy - 6, { font: '10px sans-serif', color: textSecondary });
}

// Area fill
ctx.beginPath();
ctx.moveTo(cX, cY1 + cH);
factData.forEach((v, i) => {
  ctx.lineTo(cX + (i / (chapters - 1)) * cW, cY1 + cH - (v / maxFacts) * cH);
});
ctx.lineTo(cX + cW, cY1 + cH);
ctx.closePath();
const grad = ctx.createLinearGradient(0, cY1, 0, cY1 + cH);
grad.addColorStop(0, 'rgba(0,212,255,0.25)');
grad.addColorStop(1, 'rgba(0,212,255,0.02)');
ctx.fillStyle = grad;
ctx.fill();

// Line
ctx.beginPath();
factData.forEach((v, i) => {
  const px = cX + (i / (chapters - 1)) * cW;
  const py = cY1 + cH - (v / maxFacts) * cH;
  i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
});
ctx.strokeStyle = cyan; ctx.lineWidth = 2.5; ctx.stroke();

// Dots + x labels
factData.forEach((v, i) => {
  const px = cX + (i / (chapters - 1)) * cW;
  const py = cY1 + cH - (v / maxFacts) * cH;
  ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fillStyle = cyan; ctx.fill();
  drawText(`${i + 1}`, px - 4, cY1 + cH + 8, { font: '10px sans-serif', color: textSecondary });
});

curY += chartCardH + 40;

// ===================================================================
// SECTION 2: World Facts Table (with EntityFactCard tooltip)
// ===================================================================
curY = drawSectionTitle('World Facts', curY);

const entities = [
  { entity: 'Velmara', facts: [
    { attr: 'TYPE', val: 'City-state' },
    { attr: 'CLIMATE', val: 'Arid subtropical' },
    { attr: 'POPULATION', val: '~45,000' },
    { attr: 'GOVERNMENT', val: 'Theocratic council' },
    { attr: 'CURRENCY', val: 'Sun discs' },
  ]},
  { entity: 'The Sunken Library', facts: [
    { attr: 'TYPE', val: 'Ruin / dungeon' },
    { attr: 'LOCATION', val: 'Beneath Velmara\u2019s eastern quarter' },
    { attr: 'ACCESS', val: 'Sealed, requires three sigils' },
  ]},
  { entity: 'Ashfolk', facts: [
    { attr: 'TYPE', val: 'Ethnic group' },
    { attr: 'CUSTOMS', val: 'Fire-walking rituals at solstice' },
    { attr: 'LANGUAGE', val: 'Ashik (tonal)' },
    { attr: 'TERRITORY', val: 'The Scorchlands, south of Velmara' },
  ]},
  { entity: 'Moonstone', facts: [
    { attr: 'TYPE', val: 'Magical material' },
    { attr: 'PROPERTIES', val: 'Glows under starlight, amplifies divination' },
    { attr: 'RARITY', val: 'Extremely rare, found only in deep caves' },
  ]},
  { entity: 'The Accord of Tides', facts: [
    { attr: 'TYPE', val: 'Treaty / historical event' },
    { attr: 'DATE', val: '~200 years before story events' },
    { attr: 'SIGNATORIES', val: 'Velmara, Ashfolk, the Sea Clans' },
    { attr: 'TERMS', val: 'Shared access to coastal trade routes' },
  ]},
  { entity: 'The Veil', facts: [
    { attr: 'TYPE', val: 'Magical phenomenon' },
    { attr: 'EFFECT', val: 'Barrier between physical and spirit realm' },
    { attr: 'STATUS', val: 'Weakening, especially near ruins' },
  ]},
];

// Flatten all facts for the table
const allFacts = entities.flatMap(e => e.facts.map(f => ({ entity: e.entity, ...f })));
const rowH = 36;
const tableHeaderH = 36;
const tableCardH = tableHeaderH + allFacts.length * rowH + 20;
drawCard(60, curY, W - 120, tableCardH);

// Table headers
const colWidths = { entity: 200, attr: 160, val: 0 }; // val takes remaining
drawText('ENTITY', 80, curY + 12, { font: 'bold 11px monospace', color: textSecondary });
drawText('ATTRIBUTE', 280, curY + 12, { font: 'bold 11px monospace', color: textSecondary });
drawText('VALUE', 440, curY + 12, { font: 'bold 11px monospace', color: textSecondary });
drawText('', 80, curY + tableHeaderH - 2, {}); // separator
ctx.beginPath();
ctx.moveTo(70, curY + tableHeaderH);
ctx.lineTo(W - 70, curY + tableHeaderH);
ctx.strokeStyle = 'rgba(255,255,255,0.08)';
ctx.lineWidth = 1;
ctx.stroke();

let prevEntity = '';
allFacts.forEach((f, i) => {
  const ry = curY + tableHeaderH + i * rowH;

  // Alternating row bg
  if (i % 2 === 0) {
    roundRect(60, ry, W - 120, rowH, 0);
    ctx.fillStyle = '#14141e';
    ctx.fill();
  }

  // Subtle row border
  if (i > 0) {
    ctx.beginPath();
    ctx.moveTo(70, ry);
    ctx.lineTo(W - 70, ry);
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Only show entity name when it changes
  if (f.entity !== prevEntity) {
    drawText(f.entity, 80, ry + 10, { font: '600 13px sans-serif', color: textPrimary });
    prevEntity = f.entity;
  }

  drawText(f.attr, 280, ry + 10, { font: '11px monospace', color: textSecondary });
  drawText(f.val, 440, ry + 10, { font: '13px sans-serif', color: textSecondary });

  // Hover hint on first row of each entity
  if (f === entities.find(e => e.entity === f.entity)?.facts.map(ff => ({ entity: f.entity, ...ff }))[0]) {
    // We'll put a hover hint here
  }
});

// Draw "Hover for details" hint on first entity
drawText('Hover for details \u2192', W - 240, curY + tableHeaderH + 10, { font: '12px sans-serif', color: accent });

// --- EntityFactCard tooltip overlaid on "Velmara" ---
const tooltipX = W - 460;
const tooltipY = curY + tableHeaderH + rowH * 2;
const tooltipW = 380;
const tooltipH = 220;

// Shadow
ctx.shadowColor = 'rgba(0,0,0,0.5)';
ctx.shadowBlur = 20;
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 4;
roundRect(tooltipX, tooltipY, tooltipW, tooltipH, 12);
ctx.fillStyle = '#22223a';
ctx.fill();
ctx.strokeStyle = cyan;
ctx.lineWidth = 1;
ctx.stroke();
ctx.shadowColor = 'transparent';
ctx.shadowBlur = 0;

drawText('Velmara', tooltipX + 16, tooltipY + 12, { font: 'bold 15px sans-serif', color: textPrimary });

// Fact rows inside tooltip
const tooltipFacts = entities[0].facts;
tooltipFacts.forEach((f, i) => {
  const fy = tooltipY + 40 + i * 30;
  // Attribute label
  drawText(f.attr, tooltipX + 16, fy + 4, { font: 'bold 10px monospace', color: textSecondary });
  // Value
  drawText(f.val, tooltipX + 130, fy + 4, { font: '13px sans-serif', color: textPrimary });

  // Separator
  if (i < tooltipFacts.length - 1) {
    ctx.beginPath();
    ctx.moveTo(tooltipX + 16, fy + 26);
    ctx.lineTo(tooltipX + tooltipW - 16, fy + 26);
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
});

// Tooltip annotation
drawText('\u2190 EntityFactCard as tooltip', tooltipX + tooltipW + 12, tooltipY + tooltipH / 2 - 6, { font: 'italic 12px sans-serif', color: accent });

curY += tableCardH + 40;

// ===================================================================
// SECTION 3: Entity Timeline tooltip (separate mockup below table)
// ===================================================================
curY = drawSectionTitle('Entity Timeline (tooltip on click)', curY);

const tlTooltipW = 520;
const tlTooltipH = 240;
const tlTooltipX = 60;
const tlTooltipY = curY;

ctx.shadowColor = 'rgba(0,0,0,0.5)';
ctx.shadowBlur = 20;
roundRect(tlTooltipX, tlTooltipY, tlTooltipW, tlTooltipH, 12);
ctx.fillStyle = '#22223a';
ctx.fill();
ctx.strokeStyle = accent;
ctx.lineWidth = 1;
ctx.stroke();
ctx.shadowColor = 'transparent';
ctx.shadowBlur = 0;

drawText('Velmara \u2014 Fact Timeline', tlTooltipX + 16, tlTooltipY + 12, { font: 'bold 14px sans-serif', color: textPrimary });

const chapterFacts = [
  { ch: 1, facts: ['TYPE: City-state', 'CLIMATE: Arid subtropical'] },
  { ch: 2, facts: ['POPULATION: ~45,000'] },
  { ch: 4, facts: ['GOVERNMENT: Theocratic council'] },
  { ch: 7, facts: ['CURRENCY: Sun discs'] },
];

// Timeline line
const tlLineX = tlTooltipX + 16;
const tlLineY = tlTooltipY + 45;
const tlLineW = tlTooltipW - 32;
const dotSpacing = tlLineW / (chapters - 1);

ctx.beginPath();
ctx.moveTo(tlLineX, tlLineY + 25);
ctx.lineTo(tlLineX + tlLineW, tlLineY + 25);
ctx.strokeStyle = cardBorder;
ctx.lineWidth = 2;
ctx.stroke();

// Chapter dots
const chFactMap = {};
chapterFacts.forEach(cf => { chFactMap[cf.ch] = cf.facts; });

for (let i = 1; i <= chapters; i++) {
  const dx = tlLineX + (i - 1) * dotSpacing;
  const hasFacts = chFactMap[i];
  const dotColor = hasFacts ? cyan : '#2a2a3a';
  const dotR = hasFacts ? 8 : 5;

  ctx.beginPath();
  ctx.arc(dx, tlLineY + 25, dotR, 0, Math.PI * 2);
  ctx.fillStyle = dotColor;
  ctx.fill();

  drawText(`Ch ${i}`, dx - 10, tlLineY + 40, { font: '9px sans-serif', color: textSecondary });

  // Show fact count above dots with facts
  if (hasFacts) {
    drawText(`${hasFacts.length}`, dx - 3, tlLineY + 8, { font: 'bold 11px sans-serif', color: cyan });
  }
}

// Show detail for chapter 1 as example
const detailY = tlTooltipY + 120;
drawText('Ch 1 facts:', tlTooltipX + 16, detailY, { font: 'bold 11px sans-serif', color: cyan });
chapterFacts[0].facts.forEach((f, i) => {
  drawText(`\u2022 ${f}`, tlTooltipX + 32, detailY + 18 + i * 18, { font: '12px sans-serif', color: textPrimary });
});

drawText('Ch 2 facts:', tlTooltipX + 16, detailY + 60, { font: 'bold 11px sans-serif', color: cyan });
chapterFacts[1].facts.forEach((f, i) => {
  drawText(`\u2022 ${f}`, tlTooltipX + 32, detailY + 78 + i * 18, { font: '12px sans-serif', color: textPrimary });
});

// Chapter links
drawText('Open in editor \u2192', tlTooltipX + 350, detailY + 18, { font: '11px sans-serif', color: blue });
drawText('Open in editor \u2192', tlTooltipX + 350, detailY + 78, { font: '11px sans-serif', color: blue });

// Annotation
drawText('\u2190 EntityTimeline as tooltip (click entity name in table)', tlTooltipX + tlTooltipW + 16, tlTooltipY + tlTooltipH / 2 - 6, { font: 'italic 12px sans-serif', color: accent });

curY += tlTooltipH + 50;

// ===================================================================
// SECTION 4: Contradiction Tracker
// ===================================================================
curY = drawSectionTitle('Contradictions', curY);

const contradictions = [
  { entity: 'Velmara', attribute: 'POPULATION', occurrences: [
    { ch: 2, value: '~45,000' },
    { ch: 9, value: '~30,000 (after siege)' },
  ]},
  { entity: 'The Veil', attribute: 'STATUS', occurrences: [
    { ch: 3, value: 'Stable but thinning' },
    { ch: 6, value: 'Failing rapidly' },
    { ch: 8, value: 'Stable (narrator states)' },
  ]},
  { entity: 'Moonstone', attribute: 'PROPERTIES', occurrences: [
    { ch: 4, value: 'Amplifies divination only' },
    { ch: 10, value: 'Amplifies all magic' },
  ]},
];

contradictions.forEach((c) => {
  const entryH = 40 + c.occurrences.length * 30 + 10;
  drawCard(60, curY, W - 120, entryH);

  // Red-tinted background
  roundRect(60, curY, W - 120, entryH, 12);
  ctx.fillStyle = 'rgba(255,0,64,0.03)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,0,64,0.1)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Header: entity + attribute badge
  drawText(c.entity, 80, curY + 14, { font: '600 14px sans-serif', color: textPrimary });

  ctx.font = 'bold 10px monospace';
  const attrW = ctx.measureText(c.attribute).width + 14;
  roundRect(80 + ctx.measureText(c.entity).width + 12, curY + 12, attrW, 20, 10);
  ctx.fillStyle = 'rgba(255,128,0,0.12)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,128,0,0.3)';
  ctx.lineWidth = 1;
  ctx.stroke();
  drawText(c.attribute, 80 + ctx.measureText(c.entity).width + 19, curY + 17, { font: 'bold 10px monospace', color: '#ff9933' });

  // Left border for occurrences
  ctx.beginPath();
  ctx.moveTo(96, curY + 38);
  ctx.lineTo(96, curY + 38 + c.occurrences.length * 30 - 10);
  ctx.strokeStyle = 'rgba(255,0,64,0.2)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Occurrences
  c.occurrences.forEach((o, i) => {
    const oy = curY + 40 + i * 30;
    drawText(o.value, 110, oy + 2, { font: '13px sans-serif', color: textSecondary });

    // Chapter link pill
    const chLabel = `Ch. ${o.ch}`;
    ctx.font = '11px monospace';
    const chW = ctx.measureText(chLabel).width + 14;
    roundRect(W - 180, oy, chW, 22, 6);
    ctx.fillStyle = 'rgba(0,128,255,0.08)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,128,255,0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();
    drawText(chLabel, W - 173, oy + 5, { font: '11px monospace', color: blue });
  });

  curY += entryH + 12;
});

curY += 28;

// ===================================================================
// SECTION 5: World Consistency Report
// ===================================================================
curY = drawSectionTitle('World Consistency Report', curY);

const reportW = W - 120;
const reportH = 300;
drawCard(60, curY, reportW, reportH);

const reportLines = [
  'The world of Velmara is richly developed with strong internal logic.',
  '',
  '\u2022 World-Building Density: Facts are front-loaded in the first three chapters',
  '  (26 of 66 total facts). Consider spreading introductions more evenly.',
  '\u2022 Contradictions: 3 contradictions detected. The Veil\u2019s status is described',
  '  inconsistently across chapters 3, 6, and 8 \u2014 clarify whether it\u2019s stable',
  '  or failing. Moonstone\u2019s power scope changes between Ch 4 and Ch 10.',
  '\u2022 Entity Coverage: Velmara and Ashfolk are well-covered. The Accord of',
  '  Tides is mentioned but underexplored \u2014 consider expanding in Act 2.',
  '\u2022 Consistency Strengths: Ashfolk customs and language are referenced',
  '  consistently throughout. The Sunken Library\u2019s rules are maintained.',
  '\u2022 Recommendations: Resolve the Veil contradiction before Ch 9. Add a',
  '  scene establishing Moonstone\u2019s full properties earlier if the broader',
  '  power scope is intentional.',
];

reportLines.forEach((line, i) => {
  const isHeader = line.startsWith('\u2022');
  drawText(line, 80, curY + 16 + i * 19, {
    font: isHeader ? 'bold 13px sans-serif' : '13px sans-serif',
    color: isHeader ? textPrimary : textSecondary,
  });
});

curY += reportH + 40;

// ===== Save =====
const out = fs.createWriteStream('mockups/world-analysis.png');
const stream = canvas.createPNGStream();
stream.pipe(out);
out.on('finish', () => console.log('Saved world-analysis.png'));
