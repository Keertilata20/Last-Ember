const cv = document.getElementById('c'), g = cv.getContext('2d'), live = document.getElementById('live');
const R = Math.random, rr = (a, b) => a + R() * (b - a), D = (a, b, c, d) => Math.hypot(a - c, b - d);
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
let W, H, CX, CY, S, stars, decor, snow, ground, DPR = 1;
function fit() {
  DPR = Math.min(2, devicePixelRatio || 1); W = innerWidth; H = innerHeight; cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR); cv.style.width = W + 'px'; cv.style.height = H + 'px'; CX = W / 2; CY = H / 2;
  S = Math.max(.6, Math.min(1.2, Math.min(W, H) / 600));
  stars = Array.from({ length: 70 }, () => ({ x: R() * W, y: R() * H * .8, r: R() * 1.3 + .3, p: R() * 6 }));
  decor = Array.from({ length: 22 }, () => { const a = R() * 6.28, r = rr(.52, .75) * Math.hypot(W, H) / 2; return { x: CX + Math.cos(a) * r, y: CY + Math.sin(a) * r, t: R() < .72 ? 1 : 0, s: rr(.75, 1.35) }; });
  ground = Array.from({ length: 34 }, () => ({ x: R() * W, y: R() * H, w: rr(8, 22), h: rr(2, 6), a: rr(-.35, .35), kind: R() < .28 ? 1 : 0 }));
  snow = Array.from({ length: 45 }, () => ({ x: R() * W, y: R() * H, v: rr(10, 30), r: rr(.8, 1.8) }));
}
fit();
let best = 0; try { best = +localStorage.getItem('emberBest') || 0; } catch (e) {}
const say = m => { live.textContent = m; };

// ---- Sound: all synthesized with Web Audio, no files. Starts on the first tap or key press.
let AC, master, noiseBuf;
const VOL = [0, .32, .55, .8], ICON = ['🔇', '🔈', '🔉', '🔊'], VNAME = ['Off', 'Low', 'Medium', 'High']; let vi = 2, fireT = .15, stepT = 0;
try { const savedVolume = localStorage.getItem('emberVol'); if (savedVolume !== null) { const v = Number(savedVolume); if (Number.isInteger(v) && v >= 0 && v < VOL.length) vi = v; } } catch (e) {}
function audioInit() {
  if (AC) { if (AC.state === 'suspended') AC.resume(); return; }
  try {
    AC = new (window.AudioContext || window.webkitAudioContext)();
    master = AC.createGain(); master.gain.value = VOL[vi]; master.connect(AC.destination);
    noiseBuf = AC.createBuffer(1, AC.sampleRate * 2, AC.sampleRate);
    const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  } catch (e) { AC = null; }
}
function setVol(i) {
  vi = (i + 4) % 4; try { localStorage.setItem('emberVol', vi); } catch (e) {}
  if (master) master.gain.setTargetAtTime(VOL[vi], AC.currentTime, .02);
  const b = document.getElementById('mutebtn'); b.textContent = ICON[vi] + ' Sound: ' + VNAME[vi];
  b.setAttribute('aria-label', 'Sound volume ' + VNAME[vi] + '. Activate to change volume and preview.');
}
function tone(f0, f1, dur, type, vol, delay) {
  if (!AC) return;
  const t0 = AC.currentTime + (delay || 0), o = AC.createOscillator(), v = AC.createGain();
  o.type = type || 'sine'; o.frequency.setValueAtTime(f0, t0); o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t0 + dur);
  v.gain.setValueAtTime(.001, t0); v.gain.exponentialRampToValueAtTime(Math.max(.002, vol), t0 + Math.min(.018, dur * .22));
  v.gain.exponentialRampToValueAtTime(.001, t0 + dur);
  o.connect(v); v.connect(master); o.start(t0); o.stop(t0 + dur + .02);
}
function burst(dur, vol, freq) {
  if (!AC) return;
  const t0 = AC.currentTime, src = AC.createBufferSource(), f = AC.createBiquadFilter(), v = AC.createGain();
  src.buffer = noiseBuf; f.type = 'bandpass'; f.frequency.value = freq;
  v.gain.setValueAtTime(.001, t0); v.gain.exponentialRampToValueAtTime(Math.max(.002, vol), t0 + Math.min(.012, dur * .25));
  v.gain.exponentialRampToValueAtTime(.001, t0 + dur);
  src.connect(f); f.connect(v); v.connect(master); src.start(t0, Math.random()); src.stop(t0 + dur);
}
function sfx(n) {
  ({
    pick: () => { tone(690, 470, .12, 'triangle', .16); burst(.055, .09, 1900); },
    click: () => tone(480, 620, .075, 'sine', .07),
    preview: () => { tone(440, 440, .22, 'sine', .14); tone(660, 660, .26, 'sine', .12, .16); },
    feed: () => { burst(.32, .2, 650); tone(130, 205, .36, 'sine', .24); tone(330, 494, .3, 'triangle', .12, .06); },
    howl: () => { tone(220, 350, .9, 'sine', .17); tone(350, 250, .95, 'sine', .14, .82); burst(.38, .065, 420); },
    bite: () => { tone(105, 58, .24, 'triangle', .19); burst(.12, .12, 620); },
    low: () => { tone(310, 250, .17, 'triangle', .09); tone(310, 250, .17, 'triangle', .09, .3); },
    dawn: () => [392, 494, 587, 784].forEach((f, i) => { tone(f, f, .48, 'sine', .12, i * .18); tone(f * 2, f * 2, .32, 'sine', .035, i * .18); }),
    die: () => tone(196, 72, 1, 'triangle', .2),
    step: () => { burst(.075, .11, 850); tone(110, 75, .055, 'triangle', .07); },
    fire: () => burst(.05 + R() * .09, .045 + fuel / 100 * .045, 1200 + R() * 1700)
  }[n] || (() => {}))();
}
function soundTick(dt) {
  if (!AC || st !== 'play' || paused || vi === 0) return;
  fireT -= dt;
  if (fireT <= 0) { sfx('fire'); fireT = .35 + R() * .8; }
  if (pl.moving) {
    stepT -= dt;
    if (stepT <= 0) { sfx('step'); stepT = .38 / up.speed; }
  } else stepT = 0;
}

const UPS = [
  { i: '🎒', n: 'Bigger pack', d: u => `Carry ${u.pack} → ${u.pack + 1} logs`, f: u => u.pack++ },
  { i: '👟', n: 'Fast boots', d: () => 'Move 20% faster', f: u => u.speed *= 1.2 },
  { i: '🧱', n: 'Slow burn', d: () => 'Fire burns 15% slower', f: u => u.burn *= .85 },
  { i: '🪵', n: 'Dry wood', d: u => `Log ${u.fuel} → ${u.fuel + 5} fuel`, f: u => u.fuel += 5 },
  { i: '🏮', n: 'Lantern', d: u => u.lamp ? `Wolf-free zone ${u.lamp} → ${u.lamp + 20}` : 'Wolves keep away', f: u => u.lamp = u.lamp ? u.lamp + 20 : 45 },
  { i: '🔥', n: 'Fresh kindling', d: () => 'Fire +30 right now', f: () => { fuel = Math.min(100, fuel + 30); } },
  { i: '🧥', n: 'Thick coat', d: u => `Health ${u.max} → ${u.max + 1}`, f: u => u.max++ }
];
let st = 'title', night, t, len, fuel, pl, up, logs, wolves, parts, offer, tgt, sL, sW, flash, deadT = 0, why, clock = 0, press = 0;
let stat = { logs: 0, bites: 0 }, paused = 0, conf = 0, fed = 0, shake = 0, flare = 0, fxs = [], isOut = 0, lowSaid = 0;
const keys = {};
function resizeWorld() {
  const ox = CX, oy = CY; fit();
  const dx = CX - ox, dy = CY - oy;
  if (pl) { pl.x = Math.max(8, Math.min(W - 8, pl.x + dx)); pl.y = Math.max(8, Math.min(H - 8, pl.y + dy)); }
  for (const group of [logs, wolves, parts, fxs]) if (group) for (const o of group) { o.x += dx; o.y += dy; }
  if (tgt) { tgt.x += dx; tgt.y += dy; }
}
addEventListener('resize', resizeWorld);
const rad = () => fuel > 0 ? (40 + fuel * 1.5) * S : 0;
const hit = (r, p) => p.x > r.x && p.x < r.x + r.w && p.y > r.y && p.y < r.y + r.h;
const PB = () => ({ x: W - 46, y: 12, w: 34, h: 34 });
const pbtn = i => ({ x: CX - 90, y: CY - 30 + i * 60, w: 180, h: 48 });
const card = i => { const w = Math.min(180, W * .44); return { x: CX + (i ? 10 : -w - 10), y: CY - 70, w, h: 190 }; };

function newGame() {
  night = 1; fuel = 60; fed = 0; stat = { logs: 0, bites: 0 }; paused = 0; conf = 0;
  up = { pack: 3, speed: 1, burn: 1, fuel: 14, lamp: 0, max: 3 }; pl = { x: 0, y: 0, carry: 0, hp: 3, inv: 0 };
  startNight(); cv.focus();
}
function startNight() {
  t = 0; len = Math.min(80, 40 + night * 4); logs = []; wolves = []; parts = []; fxs = []; sL = 0; sW = night === 1 ? 20 : 6;
  pl.carry = 0; pl.x = CX + 50 * S; pl.y = CY; pl.dir = 1; pl.moving = 0; tgt = null; flash = 0; lowSaid = 0; st = 'play';
  say('Night ' + night + '. Keep the fire alive until dawn.');
}
function sv() { try { localStorage.setItem('emberBest', best); } catch (e) {} }
function die(m) {
  st = 'dead'; why = m; deadT = 0; flash = .5; sfx('die'); if (night - 1 > best) { best = night - 1; sv(); }
  say(m + '. You survived ' + (night - 1) + ' nights.');
}
function dawn() {
  st = 'dawn'; wolves = []; fxs = []; sfx('dawn'); if (night > best) { best = night; sv(); }
  pl.hp = Math.min(up.max, pl.hp + 1); offer = [...UPS].sort(() => R() - .5).slice(0, 2); if (fuel < 35 && !offer.some(o => o.n === 'Fresh kindling')) offer[0] = UPS.find(o => o.n === 'Fresh kindling');
  say('Dawn. Night ' + night + ' survived. Choose an upgrade: 1, ' + offer[0].n + ', or 2, ' + offer[1].n + '.');
}
function pick(i) { sfx('click'); const m = up.max; offer[i].f(up); if (up.max > m) pl.hp++; night++; startNight(); }
function ring(x, y) { fxs.push({ k: 'r', x, y, l: .5 }); }
function float(x, y, s) { fxs.push({ k: 't', x, y, s, l: 1 }); }

function update(dt) {
  t += dt; fuel -= dt * Math.min(5, 2 + night * .2) * up.burn;
  if (fuel <= 0) { fuel = 0; return die('The fire went out'); }
  if (fuel < 25 && !lowSaid) { lowSaid = 1; say('Fire low. Bring wood.'); sfx('low'); }
  if (t >= len) return dawn();
  let dx = (keys.arrowright || keys.d ? 1 : 0) - (keys.arrowleft || keys.a ? 1 : 0);
  let dy = (keys.arrowdown || keys.s ? 1 : 0) - (keys.arrowup || keys.w ? 1 : 0);
  if (dx || dy) tgt = null;
  else if (tgt) { const d = D(tgt.x, tgt.y, pl.x, pl.y); if (d < 6) tgt = null; else { dx = (tgt.x - pl.x) / d; dy = (tgt.y - pl.y) / d; } }
  const m = Math.hypot(dx, dy) || 1, sp = 150 * S * up.speed;
  pl.moving = !!(dx || dy); if (dx) pl.dir = dx > 0 ? 1 : -1;
  pl.x = Math.min(W - 8, Math.max(8, pl.x + dx / m * sp * dt)); pl.y = Math.min(H - 8, Math.max(8, pl.y + dy / m * sp * dt));
  pl.inv = Math.max(0, pl.inv - dt); flash = Math.max(0, flash - dt); shake = Math.max(0, shake - dt); flare = Math.max(0, flare - dt * 2);
  logs = logs.filter(l => {
    if (pl.carry < up.pack && D(l.x, l.y, pl.x, pl.y) < 20 * S) { pl.carry++; ring(l.x, l.y); sfx('pick'); return false; }
    return true;
  });
  if (pl.carry && D(pl.x, pl.y, CX, CY) < 36 * S) {
    const b = fuel; fuel = Math.min(100, fuel + pl.carry * up.fuel); fed++; flare = 1; sfx('feed'); stat.logs += pl.carry; lowSaid = fuel < 25 ? 1 : 0;
    float(CX, CY - 40 * S, '+' + Math.round(fuel - b));
    for (let i = 0; i < 14; i++) parts.push({ x: CX, y: CY - 10, vx: rr(-60, 60), vy: rr(-140, -40), l: 1 });
    pl.carry = 0;
  }
  sL -= dt;
  if (sL <= 0 && logs.length < 6) {
    const a = rr(0, 6.28), r = rr(.35, .95) * Math.min(W, H) * .48;
    logs.push({ x: CX + Math.cos(a) * r, y: CY + Math.sin(a) * r, a: rr(0, 3) }); sL = rr(1, 2);
  }
  sW -= dt;
  if (sW <= 0 && wolves.length < (night === 1 ? 1 : Math.min(6, 1 + Math.floor(night * .7)))) {
    const a = rr(0, 6.28), r = Math.hypot(W, H) / 2 + 20;
    wolves.push({ x: CX + Math.cos(a) * r, y: CY + Math.sin(a) * r, fl: 0, hunt: 0 });
    sW = Math.max(3.2, 9 - night * .6) + rr(0, 2); say('A wolf is approaching.'); sfx('howl');
  }
  const rd = rad(); isOut = D(pl.x, pl.y, CX, CY) > rd;
  for (const w of wolves) {
    let tx, ty; w.hunt = 0;
    if (w.fl > 0) { w.fl -= dt; tx = w.x * 2 - pl.x; ty = w.y * 2 - pl.y; }
    else if (D(w.x, w.y, CX, CY) < rd) { tx = w.x * 2 - CX; ty = w.y * 2 - CY; }
    else if (up.lamp && D(w.x, w.y, pl.x, pl.y) < up.lamp * S) { tx = w.x * 2 - pl.x; ty = w.y * 2 - pl.y; }
    else if (isOut) { tx = pl.x; ty = pl.y; w.hunt = 1; }
    else { const a = Math.atan2(w.y - CY, w.x - CX) + .5; tx = CX + Math.cos(a) * (rd + 25 * S); ty = CY + Math.sin(a) * (rd + 25 * S); }
    let ax = 0, ay = 0;
    for (const other of wolves) if (other !== w) {
      const sx = w.x - other.x, sy = w.y - other.y, sd = Math.hypot(sx, sy);
      if (sd > 0 && sd < 34 * S) { const push = (34 * S - sd) / (34 * S); ax += sx / sd * push; ay += sy / sd * push; }
    }
    tx += ax * 35 * S; ty += ay * 35 * S;
    const d = D(tx, ty, w.x, w.y) || 1, sp2 = Math.min(130, 70 + night * 5) * S;
    w.dir = tx >= w.x ? 1 : -1; w.x += (tx - w.x) / d * sp2 * dt; w.y += (ty - w.y) / d * sp2 * dt;
    if (!pl.inv && D(w.x, w.y, pl.x, pl.y) < 16 * S) {
      pl.hp--; pl.inv = 1.5; flash = .35; shake = .35; w.fl = 1.5; sfx('bite'); stat.bites++; say('Bitten. Health ' + Math.max(0, pl.hp) + '.');
      if (pl.hp <= 0) return die('The wolves got you');
    }
  }
  for (const p of parts) { p.x += p.vx * dt; p.y += p.vy * dt; p.l -= dt; }
  parts = parts.filter(p => p.l > 0);
  for (const f of fxs) { f.l -= dt; if (f.k === 't') f.y -= 30 * dt; }
  fxs = fxs.filter(f => f.l > 0);
  if (R() < dt * 8) parts.push({ x: CX + rr(-8, 8), y: CY - 14, vx: rr(-15, 15), vy: rr(-50, -20), l: rr(.5, 1) });
}

function T(s, x, y, sz, c, al) { g.font = sz + 'px Georgia,serif'; g.textAlign = al || 'center'; g.fillStyle = c || '#eadfc8'; g.fillText(s, x, y); }
function arc(x, y, r, a0, a1) { g.beginPath(); g.arc(x, y, r, a0, a1); }

function hud(pr) {
  const low = fuel < 25 && Math.floor(clock * 5) % 2;
  g.lineWidth = 5; g.strokeStyle = 'rgba(255,255,255,.15)'; arc(30, 44, 16, 0, 7); g.stroke();
  g.strokeStyle = low ? '#ff5a4a' : '#ffb347'; arc(30, 44, 16, -1.57, -1.57 + fuel / 100 * 6.28); g.stroke();
  T('🔥', 30, 50, 15);
  for (let i = 0; i < up.pack; i++) {
    g.strokeStyle = '#8a5a30'; g.lineWidth = 1.5; g.fillStyle = '#8a5a30';
    if (i < pl.carry) g.fillRect(58 + i * 15, 38, 11, 14); else g.strokeRect(58 + i * 15, 38, 11, 14);
  }
  T('Night ' + night, 58, 70, 13, '#a39a85', 'left');
  for (let i = 0; i < up.max; i++) {
    const x = W - 62 - i * 20; g.lineWidth = 2; g.strokeStyle = '#e0533f'; g.fillStyle = '#e0533f'; arc(x, 30, 6, 0, 7);
    if (i < pl.hp) g.fill(); else g.stroke();
  }
  const b = PB(); g.strokeStyle = '#a39a85'; g.lineWidth = 2; g.strokeRect(b.x, b.y, b.w, b.h);
  g.fillStyle = '#a39a85'; g.fillRect(b.x + 10, b.y + 8, 5, 18); g.fillRect(b.x + 19, b.y + 8, 5, 18);
  g.fillStyle = 'rgba(255,255,255,.15)'; g.fillRect(0, 0, W, 4); g.fillStyle = '#ffb347'; g.fillRect(0, 0, W * pr, 4);
  if (night === 1 && t < 14) {
    g.globalAlpha = Math.min(1, (14 - t) / 3);
    T('Fire', 30, 74, 11, '#ffd27a'); T('Wood carried', 58, 33, 11, '#ffd27a', 'left'); T('Health', W - 62 - (up.max - 1) * 10, 52, 11, '#ffd27a'); T('Time to dawn', CX, 20, 11, '#ffd27a');
    g.globalAlpha = 1;
  }
}

function draw() {
  const startBtn = document.getElementById('startbtn'), shouldHideStart = st !== 'title';
  if (startBtn.hidden !== shouldHideStart) startBtn.hidden = shouldHideStart;
  g.setTransform(DPR, 0, 0, DPR, 0, 0);
  const pr = st === 'play' ? t / len : st === 'dawn' ? 1 : 0, q = pr * pr;
  g.fillStyle = `rgb(${11 + q * 90 | 0},${13 + q * 50 | 0},${20 + q * 30 | 0})`; g.fillRect(0, 0, W, H);
  g.fillStyle = '#fff';
  for (const s of stars) { g.globalAlpha = (1 - q) * (.35 + .25 * Math.sin(clock * 2 + s.p)); g.fillRect(s.x, s.y, s.r, s.r); }
  g.globalAlpha = 1;
  g.fillStyle = 'rgba(255,255,255,.06)';
  for (const d of ground) {
    g.save(); g.translate(d.x, d.y); g.rotate(d.a); g.fillStyle = d.kind ? 'rgba(122,145,163,.10)' : 'rgba(220,230,238,.075)';
    g.beginPath(); g.ellipse(0, 0, d.w * S, d.h * S, 0, 0, 7); g.fill();
    if (!d.kind) { g.strokeStyle = 'rgba(220,230,238,.11)'; g.lineWidth = S; g.beginPath(); g.moveTo(-d.w * .55 * S, 0); g.lineTo(d.w * .55 * S, 0); g.stroke(); }
    g.restore();
  }
  g.save(); if (shake > 0 && !RM) g.translate(rr(-1, 1) * shake * 14, rr(-1, 1) * shake * 14);
  for (const d of decor) {
    if (d.t) {
      g.fillStyle = '#332b29'; g.fillRect(d.x - 4 * d.s * S, d.y - 3 * d.s * S, 8 * d.s * S, 18 * d.s * S);
      for (let tier = 0; tier < 3; tier++) {
        const y = d.y - (20 + tier * 15) * d.s * S, half = (24 - tier * 5) * d.s * S;
        g.fillStyle = ['#182923','#1d332d','#263c33'][tier];
        g.beginPath(); g.moveTo(d.x, y - 24 * d.s * S); g.lineTo(d.x - half, y + 10 * d.s * S); g.lineTo(d.x + half, y + 10 * d.s * S); g.closePath(); g.fill();
        g.strokeStyle = 'rgba(150,180,157,.18)'; g.lineWidth = S; g.beginPath(); g.moveTo(d.x, y - 18 * d.s * S); g.lineTo(d.x - half * .65, y + 5 * d.s * S); g.stroke();
      }
    } else {
      g.fillStyle = '#30353a'; g.beginPath(); g.moveTo(d.x - 16 * d.s * S, d.y + 12 * d.s * S); g.lineTo(d.x - 12 * d.s * S, d.y - 3 * d.s * S); g.lineTo(d.x + 1 * d.s * S, d.y - 14 * d.s * S); g.lineTo(d.x + 15 * d.s * S, d.y - 5 * d.s * S); g.lineTo(d.x + 19 * d.s * S, d.y + 12 * d.s * S); g.closePath(); g.fill();
      g.strokeStyle = 'rgba(205,215,220,.22)'; g.lineWidth = S; g.stroke();
    }
  }
  const rd = rad(), fl = RM ? 0 : Math.sin(clock * 13) * .5 + Math.sin(clock * 7.3) * .5;
  if (rd > 0) {
    const gr = g.createRadialGradient(CX, CY, 5, CX, CY, rd);
    gr.addColorStop(0, 'rgba(255,150,60,.4)'); gr.addColorStop(1, 'rgba(255,150,60,0)');
    g.fillStyle = gr; arc(CX, CY, rd, 0, 7); g.fill();
    g.strokeStyle = 'rgba(255,190,100,.3)'; g.setLineDash([6, 8]); g.lineWidth = 2; arc(CX, CY, rd, 0, 7); g.stroke(); g.setLineDash([]);
  }
  g.fillStyle = '#3a2415'; g.fillRect(CX - 16 * S, CY - 2, 32 * S, 7 * S);
  if (fuel > 0) {
    const h = (14 + fuel * .4 + fl * 3) * S * (1 + flare * .35), w = (9 + fuel * .12) * S * (1 + flare * .2);
    for (const [c, k] of [['#ff7a2e', 1], ['#ffd27a', .55]]) {
      g.fillStyle = c; g.beginPath(); g.moveTo(CX - w * k, CY);
      g.quadraticCurveTo(CX - w * k * 1.2, CY - h * k * .6, CX + fl * 2, CY - h * k);
      g.quadraticCurveTo(CX + w * k * 1.2, CY - h * k * .6, CX + w * k, CY); g.fill();
    }
  }
  for (const l of logs) {
    const lit = D(l.x, l.y, CX, CY) < rd, lw = 24 * S, lh = 10 * S;
    if (!lit) { g.fillStyle = 'rgba(255,200,120,.18)'; arc(l.x, l.y, (19 + Math.sin(clock * 4 + l.a) * 2) * S, 0, 7); g.fill(); }
    g.save(); g.translate(l.x, l.y); g.rotate(l.a);
    g.fillStyle = lit ? '#b17b45' : '#a06a3b'; g.fillRect(-lw / 2, -lh / 2, lw, lh);
    g.strokeStyle = lit ? '#f1d3a2' : 'rgba(255,225,175,.85)'; g.lineWidth = 1.8; g.strokeRect(-lw / 2, -lh / 2, lw, lh);
    g.fillStyle = '#d9b27a'; arc(lw / 2, 0, lh / 2, 0, 7); g.fill();
    g.strokeStyle = '#4a2f18'; g.lineWidth = 1; arc(lw / 2, 0, lh / 4, 0, 7); g.stroke();
    g.restore();
  }
  for (const w of wolves) {
    const lit = D(w.x, w.y, CX, CY) < rd + 10 || D(w.x, w.y, pl.x, pl.y) < 45 * S, k = S;
    g.save(); g.translate(w.x, w.y); g.scale(w.dir || 1, 1);
    g.fillStyle = lit ? '#737985' : '#39414b'; g.strokeStyle = lit ? 'rgba(255,242,218,.48)' : 'rgba(199,211,220,.5)'; g.lineWidth = 1.5;
    const gait = RM ? 0 : Math.sin(clock * 11 + w.x * .02) * 2 * k;
    g.lineCap = 'round'; g.lineWidth = 3 * k;
    g.beginPath(); g.moveTo(-12 * k, -1 * k); g.quadraticCurveTo(-22 * k, -10 * k, -27 * k, -5 * k + gait); g.stroke();
    for (const [x, phase] of [[-10, 1], [-3, -1], [8, -1], [13, 1]]) {
      const leg = gait * phase;
      g.strokeStyle = lit ? '#aab0b6' : '#59636d'; g.lineWidth = 2.5 * k;
      g.beginPath(); g.moveTo(x * k, 3 * k); g.lineTo((x + leg) * k, 10 * k); g.lineTo((x + leg + 2) * k, 11 * k); g.stroke();
    }
    g.lineWidth = 1.5;
    g.beginPath(); g.moveTo(-13 * k, -5 * k); g.quadraticCurveTo(-4 * k, -11 * k, 8 * k, -7 * k); g.quadraticCurveTo(13 * k, -6 * k, 15 * k, 0); g.quadraticCurveTo(5 * k, 8 * k, -10 * k, 5 * k); g.closePath(); g.fill(); g.stroke();
    g.beginPath(); g.moveTo(10 * k, -5 * k); g.quadraticCurveTo(14 * k, -12 * k, 21 * k, -8 * k); g.lineTo(28 * k, -3 * k); g.lineTo(25 * k, 2 * k); g.quadraticCurveTo(18 * k, 2 * k, 13 * k, 1 * k); g.closePath(); g.fill(); g.stroke();
    g.beginPath(); g.moveTo(15 * k, -9 * k); g.lineTo(16 * k, -17 * k); g.lineTo(21 * k, -10 * k); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#c5ccd0'; arc(28 * k, -2 * k, 1.7 * k, 0, 7); g.fill();
    g.strokeStyle = 'rgba(25,27,30,.8)'; g.lineWidth = .8 * k; g.beginPath(); g.moveTo(20 * k, 3 * k); g.lineTo(26 * k, 3 * k); g.stroke();
    g.fillStyle = w.hunt ? '#ff5548' : '#f5cf6b'; arc(20 * k, -6 * k, (w.hunt ? 2.6 : 2) * k, 0, 7); g.fill();
    g.restore();
  }
  if (st === 'play' || st === 'dawn') {
    const lr = Math.max(34, up.lamp) * S, gr = g.createRadialGradient(pl.x, pl.y, 2, pl.x, pl.y, lr);
    gr.addColorStop(0, 'rgba(255,200,120,.3)'); gr.addColorStop(1, 'rgba(255,200,120,0)');
    g.fillStyle = gr; arc(pl.x, pl.y, lr, 0, 7); g.fill();
    if (!(pl.inv > 0 && Math.floor(clock * 14) % 2)) {
      const gait = pl.moving && !RM ? Math.sin(clock * 13) * 2 * S : 0;
      g.save(); g.translate(pl.x, pl.y); g.scale(pl.dir || 1, 1);
      g.fillStyle = 'rgba(5,7,10,.5)'; g.beginPath(); g.ellipse(0, 9 * S, 9 * S, 3 * S, 0, 0, 7); g.fill();
      // Small bedroll and pack separate the silhouette from the cloak.
      g.fillStyle = '#65452f'; g.strokeStyle = '#d0a878'; g.lineWidth = 1.2 * S;
      g.fillRect(-9 * S, -8 * S, 6 * S, 10 * S); g.strokeRect(-9 * S, -8 * S, 6 * S, 10 * S);
      g.fillStyle = '#292b32';
      g.beginPath(); g.moveTo(-3 * S, 5 * S); g.lineTo(-2 * S, 1 * S); g.lineTo(-1 * S, 7 * S); g.lineTo(-4 * S, 10 * S); g.closePath(); g.fill();
      g.beginPath(); g.moveTo(2 * S, 5 * S); g.lineTo(4 * S, 1 * S); g.lineTo(5 * S, 7 * S); g.lineTo(2 * S, 10 * S); g.closePath(); g.fill();
      g.fillStyle = '#547e78'; g.strokeStyle = '#bfd2bd'; g.lineWidth = 1.3 * S;
      g.beginPath(); g.moveTo(-5 * S, -8 * S); g.lineTo(-1 * S, -10 * S); g.lineTo(4 * S, -8 * S); g.lineTo(7 * S, 3 * S); g.lineTo(4 * S, 7 * S); g.lineTo(-5 * S, 7 * S); g.lineTo(-7 * S, 1 * S); g.closePath(); g.fill(); g.stroke();
      g.strokeStyle = '#dfb07b'; g.lineWidth = 2.2 * S; g.lineCap = 'round';
      g.beginPath(); g.moveTo(-5 * S, -5 * S); g.lineTo(-8 * S, gait); g.moveTo(5 * S, -5 * S); g.lineTo(8 * S, -1 * S - gait); g.stroke();
      g.fillStyle = '#bd6547'; g.fillRect(-4 * S, -7 * S, 8 * S, 2.5 * S);
      g.fillStyle = '#392f2b'; arc(0, -13 * S, 6.5 * S, 0, 7); g.fill();
      g.fillStyle = '#d6b78e'; arc(1.5 * S, -13 * S, 4.1 * S, 0, 7); g.fill();
      g.fillStyle = '#ded0b2'; g.beginPath(); g.moveTo(-6 * S, -14 * S); g.lineTo(-4 * S, -21 * S); g.lineTo(4 * S, -20 * S); g.lineTo(7 * S, -14 * S); g.closePath(); g.fill();
      g.restore();
    }
    for (let i = 0; i < pl.carry; i++) { g.fillStyle = '#8a5a30'; g.fillRect(pl.x - 8 * S, pl.y - 20 * S - i * 5 * S, 16 * S, 4 * S); }
  }
  g.fillStyle = '#ffb347';
  for (const p of parts) { g.globalAlpha = Math.max(0, p.l); g.fillRect(p.x, p.y, 2.5, 2.5); }
  g.globalAlpha = 1;
  for (const f of fxs) {
    if (f.k === 'r') { g.strokeStyle = `rgba(255,230,160,${f.l * 2})`; g.lineWidth = 2; arc(f.x, f.y, (28 - f.l * 30) * S, 0, 7); g.stroke(); }
    else { g.globalAlpha = Math.min(1, f.l * 1.5); T(f.s, f.x, f.y, 22, '#ffd27a'); g.globalAlpha = 1; }
  }
  if (tgt && st === 'play') { g.strokeStyle = 'rgba(255,255,255,.35)'; g.lineWidth = 2; arc(tgt.x, tgt.y, 8 * S, 0, 7); g.stroke(); }
  g.restore();
  if (!RM) for (const s of snow) { g.fillStyle = 'rgba(220,230,245,.25)'; g.fillRect(s.x, s.y, s.r, s.r); }
  if (st === 'play') {
    if (isOut && wolves.length) {
      const v = g.createRadialGradient(CX, CY, Math.min(W, H) * .3, CX, CY, Math.hypot(W, H) / 2);
      v.addColorStop(0, 'rgba(255,55,38,0)'); v.addColorStop(1, `rgba(255,55,38,${.14 + .04 * Math.sin(clock * 6)})`);
      g.fillStyle = v; g.fillRect(0, 0, W, H);
    }
    for (const w of wolves) if (w.x < 0 || w.x > W || w.y < 0 || w.y > H) {
      const ex = Math.min(W - 24, Math.max(24, w.x)), ey = Math.min(H - 24, Math.max(24, w.y)), a = Math.atan2(w.y - CY, w.x - CX), s = 12 + 3 * Math.sin(clock * 10);
      g.save(); g.translate(ex, ey); g.rotate(a); g.fillStyle = '#ff5a4a'; g.beginPath(); g.moveTo(s, 0); g.lineTo(-s * .7, -s * .8); g.lineTo(-s * .7, s * .8); g.fill(); g.restore();
    }
    hud(pr);
    let cap = '', hx, hy;
    if (night === 1) {
      if (fed < 2) {
        if (pl.carry) { cap = 'Bring it to the fire'; hx = CX; hy = CY; }
        else if (logs.length) {
          const n = logs.reduce((a, b) => D(a.x, a.y, pl.x, pl.y) < D(b.x, b.y, pl.x, pl.y) ? a : b);
          cap = t < 5 ? 'Tap to move' : 'Grab the wood'; hx = n.x; hy = n.y;
        }
      }
      if (wolves.length) { cap = isOut ? 'Back into the light!' : 'Wolves stay out of the light'; if (isOut) { hx = CX; hy = CY; } }
    }
    if (hx != null) { g.strokeStyle = '#ffd27a'; g.lineWidth = 2; arc(hx, hy, (18 + (clock * 30 % 14)) * S, 0, 7); g.stroke(); }
    if (cap) T(cap, CX, H - 30, 18);
  }
  if (flash > 0 && st === 'play') { g.fillStyle = `rgba(200,30,20,${flash * .45})`; g.fillRect(0, 0, W, H); }
  if (st === 'play' && paused) {
    g.fillStyle = 'rgba(0,0,0,.6)'; g.fillRect(0, 0, W, H); T('Paused', CX, CY - 60, 28);
    [['Resume'], [conf ? 'Tap again to restart' : 'Restart']].forEach((b, i) => {
      const r = pbtn(i); g.fillStyle = '#262a36'; g.fillRect(r.x, r.y, r.w, r.h); g.strokeStyle = i && conf ? '#ff5a4a' : '#ff8a3d'; g.lineWidth = 2; g.strokeRect(r.x, r.y, r.w, r.h); T(b[0], CX, r.y + 31, 18);
    });
  }
  if (st === 'dawn') {
    g.fillStyle = 'rgba(0,0,0,.5)'; g.fillRect(0, 0, W, H);
    T('Night ' + night + ' survived', CX, CY - 120, 26); T('Fire ' + Math.round(fuel) + ' / 100 · choose one', CX, CY - 94, 15, '#a39a85');
    offer.forEach((o, i) => {
      const c = card(i); g.fillStyle = '#262a36'; g.fillRect(c.x, c.y, c.w, c.h);
      g.strokeStyle = '#ff8a3d'; g.lineWidth = 2; g.strokeRect(c.x, c.y, c.w, c.h);
      T(o.i, c.x + c.w / 2, c.y + 70, 52); T(o.n, c.x + c.w / 2, c.y + 112, 18); T(o.d(up), c.x + c.w / 2, c.y + 142, 13, '#ffd27a'); T(String(i + 1), c.x + 12, c.y + 22, 14, '#a39a85', 'left');
    });
  }
  if (st === 'title') {
    T('Last Ember', CX, CY - 120, 46); T('Keep the fire alive until dawn', CX, CY - 86, 17, '#a39a85');
    T('Gather wood. Return to the light.', CX, CY + 38, 16, '#d0b894'); if (best) T('Best: ' + best + ' nights', CX, CY + 150, 15, '#a39a85');
  }
  if (st === 'dead') {
    g.fillStyle = 'rgba(0,0,0,.5)'; g.fillRect(0, 0, W, H);
    T(why, CX, CY - 70, 22); T('You survived ' + (night - 1) + ' nights', CX, CY - 36, 28); T('Best: ' + best, CX, CY - 8, 16, '#a39a85'); T('Logs delivered ' + stat.logs + ' · Bites taken ' + stat.bites, CX, CY + 18, 14, '#a39a85');
    if (deadT > .6) T('Tap to try again', CX, CY + 50, 20, '#ffb347');
  }
}

let last = 0;
function loop(ts) {
  const dt = Math.min(.05, (ts - last) / 1000 || 0); last = ts; clock += dt;
  if (st === 'play' && !paused) update(dt);
  soundTick(dt);
  if (st === 'dead') { deadT += dt; flash = Math.max(0, flash - dt * 1.5); }
  if (!RM && !paused) for (const s of snow) { s.y += s.v * dt; s.x += Math.sin(clock + s.v) * .2; if (s.y > H) { s.y = -4; s.x = R() * W; } }
  draw(); requestAnimationFrame(loop);
}
const pt = e => { const r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
cv.addEventListener('pointerdown', e => { audioInit();
  const p = pt(e);
  if (st === 'title') return newGame();
  if (st === 'dead') { if (deadT > .6) newGame(); return; }
  if (st === 'dawn') { offer.forEach((o, i) => { if (hit(card(i), p)) pick(i); }); return; }
  if (paused) {
    if (hit(pbtn(0), p)) { paused = 0; conf = 0; }
    else if (hit(pbtn(1), p)) { if (conf) newGame(); else conf = 1; }
    return;
  }
  if (hit(PB(), p)) { paused = 1; return; }
  press = 1; tgt = p;
});
cv.addEventListener('pointermove', e => { if (press && st === 'play' && !paused) tgt = pt(e); });
addEventListener('pointerup', () => press = 0);
const howEl = document.getElementById('how');
const toggleHow = open => { howEl.hidden = !open; if (open && st === 'play') paused = 1; if (open) document.getElementById('howclose').focus(); else cv.focus(); };
document.getElementById('helpbtn').addEventListener('click', () => toggleHow(howEl.hidden));
document.getElementById('howclose').addEventListener('click', () => toggleHow(false));
document.addEventListener('visibilitychange', () => { if (document.hidden && st === 'play') paused = 1; });
addEventListener('blur', () => { if (st === 'play') paused = 1; });
addEventListener('keydown', e => {
  const k = e.key.toLowerCase(); keys[k] = 1; audioInit(); if (k === 'm') setVol(vi + 1);
  if (k === 'escape' && !howEl.hidden) { toggleHow(false); return; }
  if ((k === 'p' || k === 'escape') && st === 'play') { paused = !paused; conf = 0; }
  else if (paused && st === 'play' && k === 'r') { if (conf) newGame(); else conf = 1; }
  if ((k === ' ' || k === 'enter') && (st === 'title' || (st === 'dead' && deadT > .6)) && document.activeElement === cv) newGame();
  if (st === 'dawn' && (k === '1' || k === '2')) pick(+k - 1);
  if (document.activeElement === cv && (k.startsWith('arrow') || k === ' ')) e.preventDefault();
});
addEventListener('keyup', e => { keys[e.key.toLowerCase()] = 0; });
document.getElementById('startbtn').addEventListener('click', () => { audioInit(); if (st === 'title') newGame(); });
document.getElementById('mutebtn').addEventListener('click', e => { audioInit(); setVol(vi + 1); sfx('preview'); e.currentTarget.blur(); });
setVol(vi);
newGame(); st = 'title'; requestAnimationFrame(loop);
