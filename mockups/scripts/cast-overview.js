const { createCanvas } = require('canvas');
const fs = require('fs');

const W = 1440;
const H = 2800;
const canvas = createCanvas(W, H);
const ctx = canvas.getContext('2d');

// ----- Color palette (dark theme) -----
const bg = '#0f0f13';
const cardBg = '#1a1a24';
const cardBorder = '#2a2a3a';
const textPrimary = '#e8e8ef';
const textSecondary = '#8888a0';
const accent = '#7c6ef0';
const accentDim = '#5a50b0';
const chartLine = '#7c6ef0';
const chartArea = 'rgba(124,110,240,0.15)';
const green = '#3ecf8e';
const orange = '#f0a050';
const red = '#e05050';
const heatmapOn = '#7c6ef0';
const heatmapOff = '#1e1e2e';

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

function drawText(text, x, y, { font = '14px sans-serif', color = textPrimary, align = 'left' } = {}) {
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

// ----- Background -----
ctx.fillStyle = bg;
ctx.fillRect(0, 0, W, H);

// ===== Page Header =====
let curY = 40;
drawText('Characters', 60, curY, { font: 'bold 28px sans-serif', color: textPrimary });
drawText('/stories/[...id]/insights/characters', 60, curY + 36, { font: '13px sans-serif', color: textSecondary });
curY += 90;

// ===== SECTION: Character Grid (CharacterGrid + CharacterCard) =====
drawText('Cast Overview', 60, curY, { font: 'bold 20px sans-serif', color: textPrimary });
curY += 36;

const characters = [
  { name: 'Elena Vasquez', role: 'Protagonist', badge: 'RETURNING', badgeColor: accent, emotion: 'Determined', goals: ['Find the artifact', 'Protect allies'], knowledge: ['Ancient map', 'Cipher key'] },
  { name: 'Marcus Cole', role: 'Antagonist', badge: 'RETURNING', badgeColor: accent, emotion: 'Calculating', goals: ['Seize power', 'Eliminate rivals'], knowledge: ['Secret passage', 'Betrayal plan'] },
  { name: 'Dr. Amara Osei', role: 'Mentor', badge: 'RETURNING', badgeColor: accent, emotion: 'Concerned', goals: ['Guide Elena', 'Preserve knowledge'], knowledge: ['Prophecy text', 'Herb lore'] },
  { name: 'Jin Park', role: 'Ally', badge: 'NEW', badgeColor: green, emotion: 'Anxious', goals: ['Prove loyalty', 'Survive'], knowledge: ['Guard routes'] },
  { name: 'Lyra Thorne', role: 'Ally', badge: 'RETURNING', badgeColor: accent, emotion: 'Hopeful', goals: ['Reunite family'], knowledge: ['Village history', 'Hidden trail'] },
  { name: 'The Watcher', role: 'Mysterious', badge: 'NEW', badgeColor: green, emotion: 'Enigmatic', goals: ['Observe events'], knowledge: ['Everything?'] },
];

const cardW = 410;
const cardH = 210;
const gap = 20;
const cols = 3;

characters.forEach((ch, i) => {
  const col = i % cols;
  const row = Math.floor(i / cols);
  const cx = 60 + col * (cardW + gap);
  const cy = curY + row * (cardH + gap);

  drawCard(cx, cy, cardW, cardH);

  // Name + badge
  drawText(ch.name, cx + 20, cy + 18, { font: 'bold 16px sans-serif' });
  drawBadge(ch.badge, cx + 20 + ctx.measureText(ch.name).width + 10, cy + 18, ch.badgeColor);

  // Role + emotion
  drawText(ch.role, cx + 20, cy + 46, { font: '13px sans-serif', color: textSecondary });
  drawText('Emotional State: ' + ch.emotion, cx + 20, cy + 66, { font: '12px sans-serif', color: textSecondary });

  // Goals
  drawText('Goals', cx + 20, cy + 94, { font: 'bold 12px sans-serif', color: textSecondary });
  let tx = cx + 20;
  ch.goals.forEach(g => {
    tx += drawTag(g, tx, cy + 112, accent);
  });

  // Knowledge
  drawText('Knowledge', cx + 20, cy + 148, { font: 'bold 12px sans-serif', color: textSecondary });
  tx = cx + 20;
  ch.knowledge.forEach(k => {
    tx += drawTag(k, tx, cy + 166, green);
  });
});

curY += Math.ceil(characters.length / cols) * (cardH + gap) + 30;

// ===== SECTION: Character Presence Heatmap =====
drawText('Character Presence Heatmap', 60, curY, { font: 'bold 20px sans-serif', color: textPrimary });
curY += 36;

const heatmapCardW = W - 120;
const chapters = ['Ch 1', 'Ch 2', 'Ch 3', 'Ch 4', 'Ch 5', 'Ch 6', 'Ch 7', 'Ch 8', 'Ch 9', 'Ch 10', 'Ch 11', 'Ch 12'];
const charNames = characters.map(c => c.name);
const presenceData = [
  [1,1,1,1,0,1,1,1,1,1,1,1],
  [0,1,0,1,1,1,0,1,1,1,1,1],
  [1,1,1,0,0,0,1,1,0,1,0,1],
  [0,0,0,0,0,0,1,1,1,1,1,1],
  [1,1,0,0,1,1,1,0,0,1,1,1],
  [0,0,0,1,0,0,0,0,1,0,0,1],
];

const hmH = charNames.length * 36 + 50;
drawCard(60, curY, heatmapCardW, hmH);

const cellW = 60;
const labelW = 160;
const hmX = 60 + 20 + labelW;
const hmY = curY + 20;

// Chapter headers
chapters.forEach((ch, i) => {
  drawText(ch, hmX + i * cellW + 10, hmY, { font: '11px sans-serif', color: textSecondary });
});

// Rows
charNames.forEach((name, ri) => {
  const ry = hmY + 30 + ri * 36;
  drawText(name, 80, ry + 4, { font: '13px sans-serif', color: textPrimary });
  chapters.forEach((_, ci) => {
    const cx = hmX + ci * cellW + 4;
    roundRect(cx, ry, cellW - 8, 28, 4);
    ctx.fillStyle = presenceData[ri][ci] ? heatmapOn : heatmapOff;
    ctx.fill();
    if (presenceData[ri][ci]) {
      ctx.strokeStyle = heatmapOn;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  });
});

curY += hmH + 40;

// ===== SECTION: Character Density Chart (AreaChart) =====
drawText('Cast Density', 60, curY, { font: 'bold 20px sans-serif', color: textPrimary });
curY += 36;

const densityCardH = 320;
drawCard(60, curY, (W - 140) / 2, densityCardH);

const densityData = [3, 4, 3, 4, 3, 4, 5, 4, 4, 5, 4, 6];
const chartX = 100;
const chartY = curY + 50;
const chartW2 = (W - 140) / 2 - 80;
const chartH2 = 220;

// Y axis
for (let i = 0; i <= 6; i++) {
  const yy = chartY + chartH2 - (i / 6) * chartH2;
  ctx.beginPath();
  ctx.moveTo(chartX, yy);
  ctx.lineTo(chartX + chartW2, yy);
  ctx.strokeStyle = '#1e1e2e';
  ctx.lineWidth = 1;
  ctx.stroke();
  drawText(String(i), chartX - 20, yy - 6, { font: '11px sans-serif', color: textSecondary });
}

// Area fill
ctx.beginPath();
ctx.moveTo(chartX, chartY + chartH2);
densityData.forEach((v, i) => {
  const px = chartX + (i / (densityData.length - 1)) * chartW2;
  const py = chartY + chartH2 - (v / 6) * chartH2;
  ctx.lineTo(px, py);
});
ctx.lineTo(chartX + chartW2, chartY + chartH2);
ctx.closePath();
const grad = ctx.createLinearGradient(0, chartY, 0, chartY + chartH2);
grad.addColorStop(0, 'rgba(124,110,240,0.3)');
grad.addColorStop(1, 'rgba(124,110,240,0.02)');
ctx.fillStyle = grad;
ctx.fill();

// Line
ctx.beginPath();
densityData.forEach((v, i) => {
  const px = chartX + (i / (densityData.length - 1)) * chartW2;
  const py = chartY + chartH2 - (v / 6) * chartH2;
  if (i === 0) ctx.moveTo(px, py);
  else ctx.lineTo(px, py);
});
ctx.strokeStyle = chartLine;
ctx.lineWidth = 2.5;
ctx.stroke();

// Dots
densityData.forEach((v, i) => {
  const px = chartX + (i / (densityData.length - 1)) * chartW2;
  const py = chartY + chartH2 - (v / 6) * chartH2;
  ctx.beginPath();
  ctx.arc(px, py, 4, 0, Math.PI * 2);
  ctx.fillStyle = chartLine;
  ctx.fill();
});

// X labels
densityData.forEach((_, i) => {
  const px = chartX + (i / (densityData.length - 1)) * chartW2;
  drawText(`Ch ${i + 1}`, px - 10, chartY + chartH2 + 8, { font: '10px sans-serif', color: textSecondary });
});

drawText('Characters per chapter', chartX, curY + 22, { font: '12px sans-serif', color: textSecondary });

// ===== SECTION: Character Introductions Line Chart =====
const chart2X = 60 + (W - 140) / 2 + 20;
drawCard(chart2X, curY, (W - 140) / 2, densityCardH);

const introData = [3, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1];
const c2X = chart2X + 40;
const c2W = (W - 140) / 2 - 80;

drawText('New character introductions per chapter', c2X, curY + 22, { font: '12px sans-serif', color: textSecondary });

// Y axis
for (let i = 0; i <= 4; i++) {
  const yy = chartY + chartH2 - (i / 4) * chartH2;
  ctx.beginPath();
  ctx.moveTo(c2X, yy);
  ctx.lineTo(c2X + c2W, yy);
  ctx.strokeStyle = '#1e1e2e';
  ctx.lineWidth = 1;
  ctx.stroke();
  drawText(String(i), c2X - 20, yy - 6, { font: '11px sans-serif', color: textSecondary });
}

// Line
ctx.beginPath();
introData.forEach((v, i) => {
  const px = c2X + (i / (introData.length - 1)) * c2W;
  const py = chartY + chartH2 - (v / 4) * chartH2;
  if (i === 0) ctx.moveTo(px, py);
  else ctx.lineTo(px, py);
});
ctx.strokeStyle = orange;
ctx.lineWidth = 2.5;
ctx.stroke();

// Dots
introData.forEach((v, i) => {
  const px = c2X + (i / (introData.length - 1)) * c2W;
  const py = chartY + chartH2 - (v / 4) * chartH2;
  ctx.beginPath();
  ctx.arc(px, py, 4, 0, Math.PI * 2);
  ctx.fillStyle = orange;
  ctx.fill();
});

// X labels
introData.forEach((_, i) => {
  const px = c2X + (i / (introData.length - 1)) * c2W;
  drawText(`Ch ${i + 1}`, px - 10, chartY + chartH2 + 8, { font: '10px sans-serif', color: textSecondary });
});

drawText('Character Introductions by Chapter', chart2X + 20, curY + 16, { font: 'bold 14px sans-serif' });

curY += densityCardH + 40;

// ===== SECTION: Cast Management Report Card =====
drawText('Cast Management Report', 60, curY, { font: 'bold 20px sans-serif', color: textPrimary });
curY += 36;

const reportCardW = W - 120;
const reportCardH = 220;
drawCard(60, curY, reportCardW, reportCardH);

const reportLines = [
  'The story maintains a well-balanced cast of 6 characters across 12 chapters.',
  '',
  '  • Elena Vasquez appears in 10/12 chapters — strong protagonist presence.',
  '  \u2022 Marcus Cole\u2019s introduction in Ch 2 and escalating presence builds tension effectively.',
  '  • The Watcher appears sparingly (3 chapters) which preserves mystery.',
  '  • Jin Park is introduced late (Ch 7) — consider foreshadowing earlier.',
  '  • Cast density peaks at 6 in the finale — manageable but near the upper limit.',
  '',
  'Overall: Good cast management. Consider giving Lyra Thorne a stronger arc in Act 2.',
];

reportLines.forEach((line, i) => {
  drawText(line, 80, curY + 18 + i * 22, { font: '13px sans-serif', color: i === 0 ? textPrimary : textSecondary });
});

curY += reportCardH + 40;

// ===== Footer =====
drawText('Page: /stories/[...id]/insights/characters', 60, curY, { font: '12px sans-serif', color: textSecondary });
drawText('Components: CharacterGrid, CharacterCard, CharacterPresenceHeatmap, CharacterDensityChart, CharacterCountLineChart, CastManagementReportCard', 60, curY + 20, { font: '11px sans-serif', color: textSecondary });

// ===== Save =====
const buf = canvas.toBuffer('image/png');
fs.writeFileSync(__dirname + '/../characters-cast-overview.png', buf);
console.log('Saved characters-cast-overview.png');
