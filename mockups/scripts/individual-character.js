const { createCanvas } = require('canvas');
const fs = require('fs');

const W = 1440;
const H = 3200;
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

function drawSectionDivider(y) {
  ctx.beginPath();
  ctx.moveTo(60, y);
  ctx.lineTo(W - 60, y);
  ctx.strokeStyle = cardBorder;
  ctx.lineWidth = 1;
  ctx.stroke();
}

// ----- Background -----
ctx.fillStyle = bg;
ctx.fillRect(0, 0, W, H);

// Character data
const character = {
  name: 'Elena Vasquez',
  role: 'Protagonist',
  emotion: 'Determined',
  goals: ['Find the artifact', 'Protect allies', 'Uncover the truth'],
  knowledge: ['Ancient map', 'Cipher key', 'Prophecy fragment'],
  appearances: [1, 2, 3, 4, 6, 7, 8, 9, 10, 11],
};

let curY = 40;

// ===== Page Header =====
drawText('← Back to Cast', 60, curY, { font: '13px sans-serif', color: accent });
curY += 30;
drawText(character.name, 60, curY, { font: 'bold 28px sans-serif', color: textPrimary });
curY += 38;
drawText('/stories/[...id]/insights/characters/' + encodeURIComponent(character.name), 60, curY, { font: '13px sans-serif', color: textSecondary });
curY += 40;

// ===== SECTION 1: Character Card (summary header) =====
const headerCardH = 180;
drawCard(60, curY, W - 120, headerCardH);

// Avatar placeholder
const avatarSize = 80;
roundRect(80, curY + 20, avatarSize, avatarSize, 40);
ctx.fillStyle = accent + '40';
ctx.fill();
ctx.strokeStyle = accent;
ctx.lineWidth = 2;
ctx.stroke();
drawText('EV', 80 + avatarSize / 2, curY + 20 + avatarSize / 2 - 12, { font: 'bold 24px sans-serif', color: accent, align: 'center' });

const infoX = 80 + avatarSize + 24;
drawText(character.name, infoX, curY + 20, { font: 'bold 22px sans-serif' });
drawBadge('RETURNING', infoX + ctx.measureText(character.name).width + 12, curY + 22, accent);
drawText(character.role, infoX, curY + 50, { font: '14px sans-serif', color: textSecondary });
drawText('Emotional State: ' + character.emotion, infoX, curY + 72, { font: '13px sans-serif', color: textSecondary });

// Goals inline
drawText('Goals:', infoX, curY + 100, { font: 'bold 12px sans-serif', color: textSecondary });
let tx = infoX + 50;
character.goals.forEach(g => { tx += drawTag(g, tx, curY + 96, accent); });

// Knowledge inline
drawText('Knowledge:', infoX, curY + 132, { font: 'bold 12px sans-serif', color: textSecondary });
tx = infoX + 80;
character.knowledge.forEach(k => { tx += drawTag(k, tx, curY + 128, green); });

// Appearances
drawText('Appears in: ' + character.appearances.map(a => `Ch ${a}`).join(', '), infoX + 400, curY + 20, { font: '12px sans-serif', color: textSecondary });
drawText(`${character.appearances.length}/12 chapters`, infoX + 400, curY + 38, { font: 'bold 14px sans-serif', color: accent });

curY += headerCardH + 40;

// ===== SECTION 2: Character Arc Table =====
drawText("Character Arc", 60, curY, { font: 'bold 20px sans-serif', color: textPrimary });
curY += 36;

const arcChapters = [
  { ch: 'Chapter 1', emotion: 'Curious', goals: ['Find the map'], knowledge: ['Village legends'] },
  { ch: 'Chapter 2', emotion: 'Alarmed', goals: ['Find the map', 'Escape guards'], knowledge: ['Village legends', 'Guard patrol routes'] },
  { ch: 'Chapter 3', emotion: 'Determined', goals: ['Decode the map'], knowledge: ['Ancient map', 'Cipher key'] },
  { ch: 'Chapter 4', emotion: 'Conflicted', goals: ['Find the artifact', 'Protect allies'], knowledge: ['Ancient map', 'Cipher key', 'Betrayal risk'] },
  { ch: 'Chapter 6', emotion: 'Resolute', goals: ['Find the artifact', 'Protect allies'], knowledge: ['Ancient map', 'Cipher key', 'Prophecy fragment'] },
  { ch: 'Chapter 7', emotion: 'Hopeful', goals: ['Find the artifact', 'Protect allies', 'Uncover the truth'], knowledge: ['Ancient map', 'Cipher key', 'Prophecy fragment'] },
];

// Table header
const tableW = W - 120;
const colWidths = [120, 120, 340, 400];
const tableX = 60;

drawCard(tableX, curY, tableW, 40);
ctx.fillStyle = '#14141e';
roundRect(tableX, curY, tableW, 40, 12);
ctx.fill();

const headers = ['Chapter', 'Emotion', 'Goals', 'Knowledge Gained'];
let hx = tableX + 16;
headers.forEach((h, i) => {
  drawText(h, hx, curY + 12, { font: 'bold 12px sans-serif', color: textSecondary });
  hx += colWidths[i];
});
curY += 40;

// Table rows
arcChapters.forEach((row, ri) => {
  const rowH = 50;
  const ry = curY + ri * rowH;

  if (ri % 2 === 0) {
    roundRect(tableX, ry, tableW, rowH, 0);
    ctx.fillStyle = '#14141e';
    ctx.fill();
  }

  let rx = tableX + 16;

  // Chapter
  drawText(row.ch, rx, ry + 16, { font: '13px sans-serif', color: accent });
  rx += colWidths[0];

  // Emotion
  const emotionColors = { Curious: blue, Alarmed: red, Determined: orange, Conflicted: red, Resolute: green, Hopeful: green };
  drawTag(row.emotion, rx, ry + 12, emotionColors[row.emotion] || accent);
  rx += colWidths[1];

  // Goals
  let gx = rx;
  row.goals.forEach(g => { gx += drawTag(g, gx, ry + 12, accent); });
  rx += colWidths[2];

  // Knowledge
  let kx = rx;
  row.knowledge.forEach(k => { kx += drawTag(k, kx, ry + 12, green); });
});

curY += arcChapters.length * 50 + 40;

// ===== SECTION 3: Goal Timeline =====
drawText("Elena Vasquez's Goals", 60, curY, { font: 'bold 20px sans-serif', color: textPrimary });
curY += 36;

const goalTimeline = [
  { ch: 'Chapter 1', goals: ['Find the map'] },
  { ch: 'Chapter 2', goals: ['Find the map', 'Escape guards'] },
  { ch: 'Chapter 3', goals: ['Decode the map'] },
  { ch: 'Chapter 4', goals: ['Find the artifact', 'Protect allies'] },
  { ch: 'Chapter 6', goals: ['Find the artifact', 'Protect allies'] },
  { ch: 'Chapter 7', goals: ['Find the artifact', 'Protect allies', 'Uncover the truth'] },
];

const tlCardH = goalTimeline.length * 64 + 40;
drawCard(60, curY, W - 120, tlCardH);

goalTimeline.forEach((item, i) => {
  const iy = curY + 20 + i * 64;

  // Timeline dot + line
  const dotX = 100;
  ctx.beginPath();
  ctx.arc(dotX, iy + 14, 6, 0, Math.PI * 2);
  ctx.fillStyle = accent;
  ctx.fill();

  if (i < goalTimeline.length - 1) {
    ctx.beginPath();
    ctx.moveTo(dotX, iy + 22);
    ctx.lineTo(dotX, iy + 64);
    ctx.strokeStyle = cardBorder;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Chapter label
  drawText(item.ch, dotX + 20, iy + 6, { font: 'bold 13px sans-serif', color: accent });

  // Goal tags
  let gx = dotX + 20;
  item.goals.forEach(g => {
    gx += drawTag(g, gx, iy + 28, accent);
  });
});

curY += tlCardH + 40;

// ===== SECTION 4: Knowledge Timeline =====
drawText("Elena Vasquez's Knowledge", 60, curY, { font: 'bold 20px sans-serif', color: textPrimary });
curY += 36;

const knowledgeTimeline = [
  { ch: 'Chapter 1', items: ['Village legends'] },
  { ch: 'Chapter 2', items: ['Village legends', 'Guard patrol routes'] },
  { ch: 'Chapter 3', items: ['Ancient map', 'Cipher key'] },
  { ch: 'Chapter 4', items: ['Ancient map', 'Cipher key', 'Betrayal risk'] },
  { ch: 'Chapter 6', items: ['Ancient map', 'Cipher key', 'Prophecy fragment'] },
];

const ktCardH = knowledgeTimeline.length * 64 + 40;
drawCard(60, curY, W - 120, ktCardH);

knowledgeTimeline.forEach((item, i) => {
  const iy = curY + 20 + i * 64;

  // Timeline dot + line
  const dotX = 100;
  ctx.beginPath();
  ctx.arc(dotX, iy + 14, 6, 0, Math.PI * 2);
  ctx.fillStyle = green;
  ctx.fill();

  if (i < knowledgeTimeline.length - 1) {
    ctx.beginPath();
    ctx.moveTo(dotX, iy + 22);
    ctx.lineTo(dotX, iy + 64);
    ctx.strokeStyle = cardBorder;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Chapter label
  drawText(item.ch, dotX + 20, iy + 6, { font: 'bold 13px sans-serif', color: green });

  // Knowledge tags
  let kx = dotX + 20;
  item.items.forEach(k => {
    kx += drawTag(k, kx, iy + 28, green);
  });
});

curY += ktCardH + 40;

// ===== SECTION 5: Knowledge Snapshot =====
drawText("Knowledge Snapshot", 60, curY, { font: 'bold 20px sans-serif', color: textPrimary });
drawText('Knowledge as of Chapter 6', 60, curY + 28, { font: '13px sans-serif', color: textSecondary });
curY += 60;

const snapshotCardH = 100;
drawCard(60, curY, W - 120, snapshotCardH);

const snapshotItems = ['Ancient map', 'Cipher key', 'Prophecy fragment', 'Village legends', 'Guard patrol routes', 'Betrayal risk'];
tx = 80;
let ty = curY + 20;
snapshotItems.forEach((item, i) => {
  const w = drawTag(item, tx, ty, green);
  tx += w;
  if (tx > W - 200) {
    tx = 80;
    ty += 34;
  }
});

curY += snapshotCardH + 40;

// ===== SECTION 6: Consistency Report Card =====
drawText("Elena Vasquez's Consistency Report", 60, curY, { font: 'bold 20px sans-serif', color: textPrimary });
curY += 36;

const reportH = 260;
drawCard(60, curY, W - 120, reportH);

// Score badge
roundRect(80, curY + 20, 80, 80, 40);
ctx.fillStyle = green + '30';
ctx.fill();
ctx.strokeStyle = green;
ctx.lineWidth = 2;
ctx.stroke();
drawText('92', 120, curY + 38, { font: 'bold 30px sans-serif', color: green, align: 'center' });
drawText('/100', 120, curY + 72, { font: '12px sans-serif', color: textSecondary, align: 'center' });

const reportX = 190;
const reportLines = [
  { text: 'Overall Consistency: Excellent', color: green, bold: true },
  { text: '', color: textSecondary },
  { text: '✓  Character voice remains consistent across all 10 appearances.', color: textPrimary },
  { text: '✓  Goals evolve logically: map → artifact → truth.', color: textPrimary },
  { text: '✓  Emotional progression follows story beats appropriately.', color: textPrimary },
  { text: '', color: textSecondary },
  { text: '⚠  Minor inconsistency: Knowledge of "Betrayal risk" in Ch 4 but no reaction until Ch 7.', color: orange },
  { text: '⚠  Consider: Elena doesn\'t appear in Ch 5 — provide off-screen justification.', color: orange },
  { text: '', color: textSecondary },
  { text: 'Recommendation: Add a brief reference in Ch 5 to maintain protagonist continuity.', color: textSecondary },
];

reportLines.forEach((line, i) => {
  drawText(line.text, reportX, curY + 20 + i * 22, {
    font: line.bold ? 'bold 14px sans-serif' : '13px sans-serif',
    color: line.color,
  });
});

curY += reportH + 40;

// ===== Footer =====
drawText('Page: /stories/[...id]/insights/characters/[characterName]', 60, curY, { font: '12px sans-serif', color: textSecondary });
drawText('Components: CharacterCard, CharacterArcTable, CharacterGoalTimeline, CharacterKnowledgeTimeline, CharacterKnowledgeSnapshot, CharacterReportCard', 60, curY + 20, { font: '11px sans-serif', color: textSecondary });

// ===== Save =====
const buf = canvas.toBuffer('image/png');
fs.writeFileSync(__dirname + '/../characters-individual.png', buf);
console.log('Saved characters-individual.png');
