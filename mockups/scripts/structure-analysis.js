const { createCanvas } = require('canvas');
const fs = require('fs');

const W = 1440;
const H = 5200;
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
drawText('Structure Analysis', 60, curY, { font: 'bold 28px sans-serif', color: textPrimary });
drawText('/stories/[...id]/insights/structure', 60, curY + 36, { font: '13px sans-serif', color: textSecondary });
curY += 90;

// ===================================================================
// SECTION 1: Structural Arc Tracker
// ===================================================================
curY = drawSectionTitle('Structural Arc', curY);

const roles = [
  { ch: 1, role: 'exposition', color: '#ff9933', bg: 'rgba(255,128,0,0.12)' },
  { ch: 2, role: 'exposition', color: '#ff9933', bg: 'rgba(255,128,0,0.12)' },
  { ch: 3, role: 'inciting incident', color: '#ff4d6a', bg: 'rgba(255,0,64,0.12)' },
  { ch: 4, role: 'rising action', color: '#33ddff', bg: 'rgba(0,212,255,0.12)' },
  { ch: 5, role: 'rising action', color: '#33ddff', bg: 'rgba(0,212,255,0.12)' },
  { ch: 6, role: 'rising action', color: '#33ddff', bg: 'rgba(0,212,255,0.12)' },
  { ch: 7, role: 'flashback', color: '#66ffff', bg: 'rgba(0,255,255,0.08)' },
  { ch: 8, role: 'rising action', color: '#33ddff', bg: 'rgba(0,212,255,0.12)' },
  { ch: 9, role: 'climax', color: '#ff3366', bg: 'rgba(255,0,64,0.2)' },
  { ch: 10, role: 'falling action', color: '#a64dff', bg: 'rgba(128,0,255,0.12)' },
  { ch: 11, role: 'resolution', color: '#33ff66', bg: 'rgba(0,255,65,0.12)' },
  { ch: 12, role: 'resolution', color: '#33ff66', bg: 'rgba(0,255,65,0.12)' },
];

const arcCardH = roles.length * 40 + 40;
drawCard(60, curY, W - 120, arcCardH);

roles.forEach((r, i) => {
  const ry = curY + 20 + i * 40;

  // Role badge
  const badgeText = r.role.toUpperCase();
  ctx.font = 'bold 11px monospace';
  const badgeW = ctx.measureText(badgeText).width + 20;
  roundRect(80, ry + 4, badgeW, 26, 6);
  ctx.fillStyle = r.bg;
  ctx.fill();
  ctx.strokeStyle = r.color + '40';
  ctx.lineWidth = 1;
  ctx.stroke();
  drawText(badgeText, 90, ry + 10, { font: 'bold 11px monospace', color: r.color });

  // Chapter link
  drawText(`Ch. ${r.ch}`, 80 + badgeW + 20, ry + 10, { font: '13px sans-serif', color: cyan });

  // Visual timeline bar
  const barX = 400;
  const barW = W - 500;
  const segW = barW / roles.length;
  const sx = barX + i * segW;
  roundRect(sx, ry + 8, segW - 4, 18, 4);
  ctx.fillStyle = r.bg;
  ctx.fill();
  ctx.strokeStyle = r.color + '30';
  ctx.lineWidth = 1;
  ctx.stroke();
});

curY += arcCardH + 40;

// ===================================================================
// SECTION 2: Pacing Curve Chart
// ===================================================================
curY = drawSectionTitle('Pacing Curve', curY);

const chartCardW = W - 120;
const pacingCardH = 360;
drawCard(60, curY, chartCardW, pacingCardH);
drawText('Pacing metrics across chapters', 80, curY + 16, { font: '12px sans-serif', color: textSecondary });

const chapters = 12;
const cX = 100, cY1 = curY + 50, cW = chartCardW - 100, cH = 260;

// Grid lines
for (let i = 0; i <= 4; i++) {
  const yy = cY1 + cH - (i / 4) * cH;
  ctx.beginPath(); ctx.moveTo(cX, yy); ctx.lineTo(cX + cW, yy);
  ctx.strokeStyle = '#1e1e2e'; ctx.lineWidth = 1; ctx.stroke();
  drawText(`${i * 25}%`, cX - 30, yy - 6, { font: '10px sans-serif', color: textSecondary });
}

const pacingLines = {
  'Action':        { color: '#ff0040', data: [15, 25, 10, 35, 40, 20, 5, 30, 55, 60, 30, 15], dash: [] },
  'Dialogue':      { color: '#00d4ff', data: [30, 20, 35, 25, 15, 30, 40, 25, 15, 10, 25, 35], dash: [] },
  'Introspection': { color: '#8000ff', data: [25, 20, 30, 15, 10, 25, 35, 20, 10, 5, 15, 20], dash: [] },
  'Exposition':    { color: '#ff8000', data: [30, 35, 25, 15, 10, 20, 15, 10, 5, 5, 10, 20], dash: [] },
  'Tension':       { color: '#00ff41', data: [20, 30, 25, 45, 55, 35, 20, 50, 75, 90, 50, 30], dash: [5, 5] },
};

Object.entries(pacingLines).forEach(([name, { color, data, dash }]) => {
  ctx.beginPath();
  ctx.setLineDash(dash);
  data.forEach((v, i) => {
    const px = cX + (i / (chapters - 1)) * cW;
    const py = cY1 + cH - (v / 100) * cH;
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  });
  ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
  ctx.setLineDash([]);

  data.forEach((v, i) => {
    const px = cX + (i / (chapters - 1)) * cW;
    const py = cY1 + cH - (v / 100) * cH;
    ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill();
  });
});

// X labels
for (let i = 0; i < chapters; i++) {
  const px = cX + (i / (chapters - 1)) * cW;
  drawText(`${i + 1}`, px - 4, cY1 + cH + 8, { font: '10px sans-serif', color: textSecondary });
}

// Legend
let lx = 80;
const ly = curY + pacingCardH - 28;
Object.entries(pacingLines).forEach(([name, { color, dash }]) => {
  ctx.beginPath();
  ctx.setLineDash(dash);
  ctx.moveTo(lx, ly + 6); ctx.lineTo(lx + 16, ly + 6);
  ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
  ctx.setLineDash([]);
  ctx.beginPath(); ctx.arc(lx + 8, ly + 6, 3, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill();
  drawText(name, lx + 22, ly, { font: '11px sans-serif', color: textSecondary });
  lx += ctx.measureText(name).width + 40;
});

curY += pacingCardH + 40;

// ===================================================================
// SECTION 3: Charts Row (Emotional Beats + Scene Type Distribution)
// ===================================================================
curY = drawSectionTitle('Beats & Scenes', curY);

const halfW = (W - 140) / 2;
const chartH = 340;

// --- Emotional Beats (left, stacked bar) ---
drawCard(60, curY, halfW, chartH);
drawText('Emotional Beats', 80, curY + 16, { font: 'bold 14px sans-serif' });
drawText('Beat intensity per chapter', 80, curY + 36, { font: '12px sans-serif', color: textSecondary });

const beatsData = [
  { strong: 2, moderate: 3, weak: 1 },
  { strong: 3, moderate: 4, weak: 2 },
  { strong: 1, moderate: 2, weak: 3 },
  { strong: 5, moderate: 2, weak: 1 },
  { strong: 4, moderate: 3, weak: 1 },
  { strong: 2, moderate: 4, weak: 2 },
  { strong: 1, moderate: 2, weak: 4 },
  { strong: 4, moderate: 3, weak: 1 },
  { strong: 6, moderate: 2, weak: 0 },
  { strong: 7, moderate: 3, weak: 0 },
  { strong: 3, moderate: 4, weak: 1 },
  { strong: 2, moderate: 3, weak: 2 },
];

const ebX = 100, ebY = curY + 60, ebW = halfW - 80, ebH = 230;
const maxBeats = 12;
const barW = ebW / chapters - 6;

// Grid
for (let i = 0; i <= 3; i++) {
  const yy = ebY + ebH - (i / 3) * ebH;
  ctx.beginPath(); ctx.moveTo(ebX, yy); ctx.lineTo(ebX + ebW, yy);
  ctx.strokeStyle = '#1e1e2e'; ctx.lineWidth = 1; ctx.stroke();
  drawText(String(Math.round(maxBeats * i / 3)), ebX - 20, yy - 6, { font: '10px sans-serif', color: textSecondary });
}

const beatColors = { strong: cyan, moderate: orange, weak: '#666666' };
beatsData.forEach((d, i) => {
  const bx = ebX + i * (ebW / chapters) + 3;
  let by = ebY + ebH;

  ['weak', 'moderate', 'strong'].forEach(key => {
    const h = (d[key] / maxBeats) * ebH;
    by -= h;
    roundRect(bx, by, barW, h, 2);
    ctx.fillStyle = beatColors[key];
    ctx.fill();
  });
  drawText(`${i + 1}`, bx + barW / 2 - 4, ebY + ebH + 6, { font: '10px sans-serif', color: textSecondary });
});

// Legend
let blx = 80;
const bly = curY + chartH - 28;
Object.entries(beatColors).forEach(([name, color]) => {
  roundRect(blx, bly, 12, 12, 3);
  ctx.fillStyle = color;
  ctx.fill();
  drawText(name.charAt(0).toUpperCase() + name.slice(1), blx + 18, bly, { font: '11px sans-serif', color: textSecondary });
  blx += ctx.measureText(name).width + 40;
});

// --- Scene Type Distribution (right, stacked bar) ---
const stX = 60 + halfW + 20;
drawCard(stX, curY, halfW, chartH);
drawText('Scene Type Distribution', stX + 20, curY + 16, { font: 'bold 14px sans-serif' });
drawText('Scene types per chapter', stX + 20, curY + 36, { font: '12px sans-serif', color: textSecondary });

const sceneTypes = {
  action:        { color: '#ff0040', data: [1, 2, 0, 3, 3, 1, 0, 2, 4, 5, 2, 1] },
  dialogue:      { color: '#00d4ff', data: [2, 1, 3, 2, 1, 2, 3, 2, 1, 1, 2, 3] },
  introspection: { color: '#8000ff', data: [1, 1, 2, 1, 0, 1, 3, 1, 0, 0, 1, 1] },
  exposition:    { color: '#ff8000', data: [2, 2, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1] },
  transition:    { color: '#00ff41', data: [0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0] },
};

const stBX = stX + 40, stBY = curY + 60, stBW = halfW - 80, stBH = 230;
const maxScenes = 10;
const stBarW = stBW / chapters - 6;

// Grid
for (let i = 0; i <= 4; i++) {
  const yy = stBY + stBH - (i / 4) * stBH;
  ctx.beginPath(); ctx.moveTo(stBX, yy); ctx.lineTo(stBX + stBW, yy);
  ctx.strokeStyle = '#1e1e2e'; ctx.lineWidth = 1; ctx.stroke();
  drawText(String(Math.round(maxScenes * i / 4)), stBX - 20, yy - 6, { font: '10px sans-serif', color: textSecondary });
}

for (let ch = 0; ch < chapters; ch++) {
  const bx = stBX + ch * (stBW / chapters) + 3;
  let by = stBY + stBH;

  Object.entries(sceneTypes).forEach(([type, { color, data }]) => {
    const h = (data[ch] / maxScenes) * stBH;
    by -= h;
    if (h > 0) {
      roundRect(bx, by, stBarW, h, 2);
      ctx.fillStyle = color;
      ctx.fill();
    }
  });
  drawText(`${ch + 1}`, bx + stBarW / 2 - 4, stBY + stBH + 6, { font: '10px sans-serif', color: textSecondary });
}

// Legend
let slx = stX + 20;
const sly = curY + chartH - 28;
Object.entries(sceneTypes).forEach(([name, { color }]) => {
  roundRect(slx, sly, 12, 12, 3);
  ctx.fillStyle = color;
  ctx.fill();
  const label = name.charAt(0).toUpperCase() + name.slice(1);
  drawText(label, slx + 18, sly, { font: '11px sans-serif', color: textSecondary });
  slx += ctx.measureText(label).width + 32;
});

curY += chartH + 40;

// ===================================================================
// SECTION 4: POV Balance + Theme Distribution (side by side)
// ===================================================================
curY = drawSectionTitle('POV & Themes', curY);

// --- POV Balance (left, stacked bar) ---
drawCard(60, curY, halfW, chartH);
drawText('POV Balance', 80, curY + 16, { font: 'bold 14px sans-serif' });
drawText('Scenes per POV character by chapter', 80, curY + 36, { font: '12px sans-serif', color: textSecondary });

const povChars = {
  'Elena':  { color: '#00d4ff', data: [3, 2, 4, 3, 2, 3, 0, 2, 3, 4, 3, 3] },
  'Marcus': { color: '#ff0040', data: [1, 2, 0, 2, 2, 1, 0, 2, 1, 1, 1, 0] },
  'Jin':    { color: '#00ff41', data: [0, 0, 1, 1, 1, 1, 4, 1, 1, 0, 1, 2] },
  'Dr. Osei': { color: '#8000ff', data: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0] },
};

const pvX = 100, pvY = curY + 60, pvW = halfW - 80, pvH = 230;
const maxPov = 7;
const pvBarW = pvW / chapters - 6;

for (let i = 0; i <= 3; i++) {
  const yy = pvY + pvH - (i / 3) * pvH;
  ctx.beginPath(); ctx.moveTo(pvX, yy); ctx.lineTo(pvX + pvW, yy);
  ctx.strokeStyle = '#1e1e2e'; ctx.lineWidth = 1; ctx.stroke();
  drawText(String(Math.round(maxPov * i / 3)), pvX - 20, yy - 6, { font: '10px sans-serif', color: textSecondary });
}

for (let ch = 0; ch < chapters; ch++) {
  const bx = pvX + ch * (pvW / chapters) + 3;
  let by = pvY + pvH;

  Object.entries(povChars).forEach(([name, { color, data }]) => {
    const h = (data[ch] / maxPov) * pvH;
    by -= h;
    if (h > 0) {
      roundRect(bx, by, pvBarW, h, 2);
      ctx.fillStyle = color;
      ctx.fill();
    }
  });
  drawText(`${ch + 1}`, bx + pvBarW / 2 - 4, pvY + pvH + 6, { font: '10px sans-serif', color: textSecondary });
}

let plx = 80;
const ply = curY + chartH - 28;
Object.entries(povChars).forEach(([name, { color }]) => {
  roundRect(plx, ply, 12, 12, 3);
  ctx.fillStyle = color;
  ctx.fill();
  drawText(name, plx + 18, ply, { font: '11px sans-serif', color: textSecondary });
  plx += ctx.measureText(name).width + 32;
});

// --- Theme Distribution (right, horizontal bar) ---
const thX = 60 + halfW + 20;
drawCard(thX, curY, halfW, chartH);
drawText('Theme Distribution', thX + 20, curY + 16, { font: 'bold 14px sans-serif' });
drawText('Occurrences across the story', thX + 20, curY + 36, { font: '12px sans-serif', color: textSecondary });

const themes = [
  { theme: 'Betrayal & Trust', count: 18 },
  { theme: 'Power & Corruption', count: 14 },
  { theme: 'Discovery & Knowledge', count: 12 },
  { theme: 'Sacrifice', count: 9 },
  { theme: 'Identity', count: 7 },
  { theme: 'Family & Legacy', count: 6 },
  { theme: 'Justice', count: 4 },
];

const thBX = thX + 160, thBY = curY + 60;
const thBW = halfW - 200;
const thBarH = 24;
const thBarGap = 8;
const maxTheme = 20;

themes.forEach((t, i) => {
  const ty = thBY + i * (thBarH + thBarGap);
  // Label
  drawText(t.theme, thX + 20, ty + 5, { font: '12px sans-serif', color: textSecondary });
  // Bar bg
  roundRect(thBX, ty, thBW, thBarH, 4);
  ctx.fillStyle = '#1e1e2e';
  ctx.fill();
  // Bar fill
  const barFillW = (t.count / maxTheme) * thBW;
  roundRect(thBX, ty, barFillW, thBarH, 4);
  ctx.fillStyle = cyan;
  ctx.fill();
  // Count label
  drawText(String(t.count), thBX + barFillW + 8, ty + 5, { font: 'bold 12px sans-serif', color: cyan });
});

curY += chartH + 40;

// ===================================================================
// SECTION 5: Weak Scenes Tracker
// ===================================================================
curY = drawSectionTitle('Weak Scenes', curY);

const weakScenes = [
  { ch: 3, scenes: [
    { type: 'exposition', goal: 'Introduce backstory of the ancient city', issue: 'Heavy info-dump with no character interaction' },
    { type: 'transition', goal: 'Move characters to next location', issue: 'Lacks tension or dramatic purpose' },
  ]},
  { ch: 6, scenes: [
    { type: 'dialogue', goal: 'Elena & Marcus discuss plans', issue: 'Dialogue feels expository, not natural' },
  ]},
  { ch: 7, scenes: [
    { type: 'introspection', goal: 'Jin reflects on past', issue: 'Flashback disrupts pacing, can be shortened' },
  ]},
];

const wsRows = weakScenes.reduce((s, c) => s + c.scenes.length, 0);
const wsCardH = wsRows * 60 + weakScenes.length * 30 + 30;
drawCard(60, curY, W - 120, wsCardH);

let wsY = curY + 16;
const typeColors = {
  action: '#ff0040', dialogue: '#00d4ff', introspection: '#8000ff',
  exposition: '#ff8000', transition: '#00ff41',
};

weakScenes.forEach((chGroup) => {
  drawText(`Chapter ${chGroup.ch}`, 80, wsY, { font: 'bold 14px sans-serif', color: orange });
  drawBadge(`${chGroup.scenes.length} weak`, 190, wsY + 2, orange);
  wsY += 28;

  chGroup.scenes.forEach((s) => {
    // Type badge
    const typeLabel = s.type.toUpperCase();
    ctx.font = 'bold 10px sans-serif';
    const typeBadgeW = ctx.measureText(typeLabel).width + 12;
    roundRect(100, wsY, typeBadgeW, 20, 10);
    ctx.fillStyle = (typeColors[s.type] || textSecondary) + '25';
    ctx.fill();
    ctx.strokeStyle = (typeColors[s.type] || textSecondary);
    ctx.lineWidth = 1;
    ctx.stroke();
    drawText(typeLabel, 106, wsY + 5, { font: 'bold 10px sans-serif', color: typeColors[s.type] || textSecondary });

    // Goal
    drawText(`Goal: ${s.goal}`, 100 + typeBadgeW + 12, wsY + 3, { font: '12px sans-serif', color: textPrimary });
    wsY += 24;

    // Issue
    drawText(`\u26A0 ${s.issue}`, 100, wsY + 2, { font: '12px sans-serif', color: red });
    wsY += 32;
  });
});

curY += wsCardH + 40;

// ===================================================================
// SECTION 6: Scene Index (grid of SceneCards)
// ===================================================================
curY = drawSectionTitle('Scene Index', curY);

const scenes = [
  { ch: 1, type: 'exposition', location: 'Ancient Library', pov: 'Elena', goal: 'Discover map', conflict: 'Restricted access', outcome: 'Map found', words: 1200 },
  { ch: 1, type: 'dialogue', location: 'Library Hall', pov: 'Elena', goal: 'Recruit Marcus', conflict: 'Marcus hesitant', outcome: 'Tentative agreement', words: 980 },
  { ch: 1, type: 'action', location: 'Library Basement', pov: 'Elena', goal: 'Evade guards', conflict: 'Patrol discovered', outcome: 'Narrow escape', words: 750 },
  { ch: 2, type: 'introspection', location: 'Elena\u2019s Room', pov: 'Elena', goal: 'Process discovery', conflict: 'Self-doubt', outcome: 'Resolves to continue', words: 1100 },
  { ch: 2, type: 'dialogue', location: 'Market Square', pov: 'Marcus', goal: 'Gather intel', conflict: 'Suspicious vendor', outcome: 'Lead obtained', words: 890 },
  { ch: 3, type: 'exposition', location: 'Old Temple', pov: 'Elena', goal: 'Study inscriptions', conflict: 'Deciphering difficulty', outcome: 'Partial decode', words: 1350 },
  { ch: 3, type: 'action', location: 'Temple Courtyard', pov: 'Jin', goal: 'Defend position', conflict: 'Ambush', outcome: 'Repelled attackers', words: 920 },
  { ch: 4, type: 'dialogue', location: 'Camp', pov: 'Elena', goal: 'Plan next move', conflict: 'Disagreement on path', outcome: 'Compromise reached', words: 1050 },
];

const sceneCardW = (W - 140 - 20) / 3;
const sceneCardH = 200;
const sceneRows = Math.ceil(scenes.length / 3);

scenes.forEach((s, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  const sx = 60 + col * (sceneCardW + 10);
  const sy = curY + row * (sceneCardH + 10);

  drawCard(sx, sy, sceneCardW, sceneCardH);

  // Header: type badge + chapter
  const typeLabel = s.type.toUpperCase();
  ctx.font = 'bold 10px sans-serif';
  const tw = ctx.measureText(typeLabel).width + 12;
  roundRect(sx + 12, sy + 12, tw, 20, 10);
  ctx.fillStyle = (typeColors[s.type] || accent) + '25';
  ctx.fill();
  ctx.strokeStyle = typeColors[s.type] || accent;
  ctx.lineWidth = 1;
  ctx.stroke();
  drawText(typeLabel, sx + 18, sy + 17, { font: 'bold 10px sans-serif', color: typeColors[s.type] || accent });

  // Chapter pill
  const chLabel = `Ch. ${s.ch}`;
  ctx.font = '11px sans-serif';
  const chW = ctx.measureText(chLabel).width + 12;
  roundRect(sx + sceneCardW - chW - 12, sy + 12, chW, 20, 10);
  ctx.fillStyle = cyan + '15';
  ctx.fill();
  ctx.strokeStyle = cyan + '40';
  ctx.lineWidth = 1;
  ctx.stroke();
  drawText(chLabel, sx + sceneCardW - chW - 6, sy + 17, { font: '11px sans-serif', color: cyan });

  // Body labels
  const fields = [
    ['LOCATION', s.location],
    ['POV', s.pov],
    ['GOAL', s.goal],
    ['CONFLICT', s.conflict],
    ['OUTCOME', s.outcome],
  ];

  fields.forEach(([label, value], fi) => {
    const fy = sy + 42 + fi * 24;
    drawText(label, sx + 12, fy, { font: 'bold 9px monospace', color: textSecondary });
    drawText(value, sx + 80, fy, { font: '12px sans-serif', color: textPrimary });
  });

  // Footer: word count
  drawText(`${s.words.toLocaleString()} words`, sx + 12, sy + sceneCardH - 24, { font: '11px sans-serif', color: textSecondary });
});

curY += sceneRows * (sceneCardH + 10) + 30;

// ===================================================================
// SECTION 7: Developmental Report Card
// ===================================================================
curY = drawSectionTitle('Developmental Report', curY);

const reportW = W - 120;
const reportH = 320;
drawCard(60, curY, reportW, reportH);

const reportLines = [
  'The story demonstrates a well-structured narrative arc with clear escalation.',
  '',
  '\u2022 Structural Arc: Classic three-act structure is evident. The inciting incident',
  '  (Ch 3) arrives at a strong point. Rising action chapters build tension effectively.',
  '\u2022 Pacing: Action peaks during climax (Ch 9-10) as expected. Chapters 5-6 show',
  '  slight pacing dips \u2014 consider tightening introspective passages.',
  '\u2022 POV Balance: Elena dominates with 60% of POV scenes. Consider giving',
  '  Marcus and Jin more POV time in mid-story to deepen their arcs.',
  '\u2022 Emotional Beats: Beat intensity correlates well with structural arc.',
  '  Weak beats in Ch 7 (flashback) may be intentional for pacing variety.',
  '\u2022 Scene Construction: 4 weak scenes flagged across 3 chapters. The exposition',
  '  scenes in Ch 3 and Ch 7 need work \u2014 integrate backstory more naturally.',
  '\u2022 Themes: "Betrayal & Trust" is the dominant theme. Good thematic consistency.',
  '  Consider surfacing "Justice" earlier to build toward the resolution.',
];

reportLines.forEach((line, i) => {
  const isHeader = line.startsWith('\u2022');
  drawText(line, 80, curY + 16 + i * 20, {
    font: isHeader ? 'bold 13px sans-serif' : '13px sans-serif',
    color: isHeader ? textPrimary : textSecondary,
  });
});

curY += reportH + 40;

// ===== Save =====
const out = fs.createWriteStream('mockups/structure-analysis.png');
const stream = canvas.createPNGStream();
stream.pipe(out);
out.on('finish', () => console.log('Saved structure-analysis.png'));
