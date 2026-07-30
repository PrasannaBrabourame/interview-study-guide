/* ============ state ============ */
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } },
  set(k, v) { localStorage.setItem(k, JSON.stringify(v)) }
};
const studied = new Set(store.get("study-progress", []));
const starred = new Set(store.get("study-starred", []));
const activity = store.get("study-activity", {});
let lastMilestone = store.get("study-milestone", 0);

const esc = s => String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const list = a => `<ul>${a.map(x => `<li>${x}</li>`).join("")}</ul>`;
const byId = new Map(topics.map(t => [t.id, t]));
const todayKey = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}` };

/* ============ category hues (golden-angle spacing by first appearance) ============ */
const categories = [...new Set(topics.map(t => t.category))];
const catHue = new Map(categories.map((c, i) => [c, Math.round(i * 137.508) % 360]));

/* ============ search index (id -> normalized lowercase haystack) ============ */
const norm = s => s.toLowerCase().replace(/[–—·]/g, " ");
const searchIndex = new Map(topics.map(t => [t.id,
  norm([t.title, t.category, t.question, ...t.technical, t.layman, ...t.usecases, t.code, ...t.followups, ...t.redflags, t.memory].join(" "))
]));

/* ============ tiny syntax highlighter (comments, strings, numbers, yaml keys, keywords) ============ */
const HLRX = /((?:^|[ \t])(?:#|\/\/)[^\n]*)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`[^`]*`)|(^[ \t-]*[\w.$-]+)(?=:(?:[ \t]|$))|\b(\d+(?:\.\d+)?)\b|\b(const|let|var|function|return|if|else|for|while|async|await|import|from|export|new|class|def|lambda|try|except|finally|with|as|pass|raise|True|False|None|null|true|false|SELECT|FROM|WHERE|AND|OR|NOT|NULL|GROUP BY|ORDER BY|JOIN|LEFT|INNER|ON|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|INDEX|LIMIT)\b/gm;
function hl(src) {
  return esc(src).replace(HLRX, (m, c, s, p, n, k) =>
    c ? `<i class="tk-c">${c}</i>` :
    s ? `<i class="tk-s">${s}</i>` :
    p ? `<i class="tk-p">${p}</i>` :
    n ? `<i class="tk-n">${n}</i>` :
        `<i class="tk-k">${k}</i>`);
}

/* ============ render cards ============ */
const cards = document.getElementById("cards"), toc = document.getElementById("toc"), cat = document.getElementById("cat");
categories.slice().sort().forEach(x => cat.insertAdjacentHTML("beforeend", `<option>${esc(x)}</option>`));
cards.innerHTML = topics.map((t, i) => `<article class="card" id="${t.id}" data-cat="${esc(t.category)}" style="--hue:${catHue.get(t.category)}">
<header class="head" tabindex="0" aria-expanded="false"><div class="num">${String(i + 1).padStart(2, "0")}</div><div><h2>${esc(t.title)}</h2><p>${esc(t.category)}</p></div><div class="actions"><button class="star${starred.has(t.id) ? " on" : ""}" data-id="${t.id}" title="Star for review" aria-pressed="${starred.has(t.id)}">★</button><input class="check" type="checkbox" data-id="${t.id}" ${studied.has(t.id) ? "checked" : ""} title="Mark studied"><button class="chev" aria-label="Expand">⌄</button></div></header>
<div class="body"><div class="bwrap"><div class="question">${t.question}</div><button class="btn reveal">Reveal answer</button><div class="grid">
<section class="box full"><h3>🧠 Technical answer</h3>${list(t.technical)}</section>
<section class="box layman"><h3>💡 In layman terms</h3><p>${t.layman}</p></section>
<section class="box"><h3>🛠 Practical use cases</h3>${list(t.usecases)}</section>
<div class="code"><button class="copy">Copy</button><pre><code>${hl(t.code)}</code></pre></div>
<section class="box"><h3>🎯 Follow-up interview checks</h3>${list(t.followups)}</section>
<section class="box bad"><h3>⚠ Red flags</h3>${list(t.redflags)}</section>
<section class="box full memo"><h3>📌 One-line memory aid</h3><p><b>${t.memory}</b></p></section>
</div></div></div></article>`).join("");

/* ============ grouped TOC with per-category progress ============ */
const num = new Map(topics.map((t, i) => [t.id, String(i + 1).padStart(2, "0")]));
toc.innerHTML = categories.map(c => {
  const items = topics.filter(t => t.category === c);
  return `<div class="tgroup" data-cat="${esc(c)}" style="--hue:${catHue.get(c)}">
<button class="thead"><span class="tdot"></span><span class="tname">${esc(c)}</span><span class="tcount"></span><span class="tchev">⌄</span></button>
<div class="tbar"><i></i></div>
<div class="tlinks">${items.map(t => `<a href="#${t.id}">${num.get(t.id)} · ${esc(t.title)}</a>`).join("")}</div></div>`;
}).join("");
document.querySelectorAll(".thead").forEach(h => h.onclick = () => h.closest(".tgroup").classList.toggle("open"));

function tocProgress() {
  document.querySelectorAll(".tgroup").forEach(g => {
    const items = topics.filter(t => t.category === g.dataset.cat);
    const done = items.filter(t => studied.has(t.id)).length;
    g.querySelector(".tcount").textContent = `${done}/${items.length}`;
    g.querySelector(".tbar i").style.width = `${done / items.length * 100}%`;
  });
}

/* ============ progress + milestones ============ */
function progress() {
  document.getElementById("ptext").textContent = `${studied.size} of ${topics.length} studied`;
  document.getElementById("fill").style.width = `${studied.size / topics.length * 100}%`;
  tocProgress();
}
function checkMilestone() {
  const pct = studied.size / topics.length * 100;
  const hit = [100, 75, 50, 25].find(m => pct >= m) || 0;
  if (hit > lastMilestone) {
    lastMilestone = hit; store.set("study-milestone", hit);
    toast(hit === 100 ? "🏆 All topics studied. You're ready." : `🎉 ${hit}% of the guide studied!`);
    confetti();
  }
}
function markStudied(id, on) {
  on ? studied.add(id) : studied.delete(id);
  store.set("study-progress", [...studied]);
  const box = document.querySelector(`.check[data-id="${id}"]`);
  if (box) box.checked = on;
  if (on) { activity[todayKey()] = (activity[todayKey()] || 0) + 1; store.set("study-activity", activity); renderHeatmap(); }
  progress(); checkMilestone();
}

/* ============ toast + confetti ============ */
let toastTimer;
function toast(msg) {
  let el = document.getElementById("toast");
  if (!el) { el = document.createElement("div"); el.id = "toast"; document.body.appendChild(el); }
  el.textContent = msg; el.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("show"), 3500);
}
function confetti() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const cv = document.createElement("canvas"); cv.className = "confetti";
  cv.width = innerWidth; cv.height = innerHeight; document.body.appendChild(cv);
  const ctx = cv.getContext("2d"), colors = ["#3559d8", "#7b4de8", "#087a61", "#f2a600", "#e34948"];
  const ps = Array.from({ length: 90 }, () => ({ x: innerWidth / 2, y: innerHeight * .35, vx: (Math.random() - .5) * 13, vy: Math.random() * -11 - 3, r: Math.random() * 5 + 2, c: colors[Math.random() * colors.length | 0], a: Math.random() * Math.PI }));
  const t0 = performance.now();
  (function tick(now) {
    const dt = (now - t0) / 1600;
    ctx.clearRect(0, 0, cv.width, cv.height);
    ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .32; p.a += .1; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.globalAlpha = Math.max(0, 1 - dt); ctx.fillStyle = p.c; ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r); ctx.restore(); });
    dt < 1 ? requestAnimationFrame(tick) : cv.remove();
  })(t0);
}

/* ============ study-streak heatmap (14 weeks, GitHub-style) ============ */
function renderHeatmap() {
  const hm = document.getElementById("heatmap"); if (!hm) return;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const start = new Date(today); start.setDate(start.getDate() - start.getDay() - 13 * 7);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let html = "";
  for (const d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const n = activity[key] || 0;
    const lvl = n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n <= 4 ? 3 : 4;
    html += `<i class="hcell l${lvl}" title="${n} topic${n === 1 ? "" : "s"} · ${days[d.getDay()]} ${d.getDate()}/${d.getMonth() + 1}"></i>`;
  }
  hm.innerHTML = html;
  let streak = 0; const cur = new Date(today);
  if (!activity[todayKey()]) cur.setDate(cur.getDate() - 1);
  for (; ;) {
    const key = `${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, "0")}-${String(cur.getDate()).padStart(2, "0")}`;
    if (activity[key]) { streak++; cur.setDate(cur.getDate() - 1); } else break;
  }
  document.getElementById("streaktext").textContent = streak ? `🔥 ${streak}-day streak` : "Study a topic to start a streak";
}

/* ============ card interactions ============ */
document.querySelectorAll(".head").forEach(h => {
  const c = h.closest(".card");
  const go = () => { c.classList.toggle("open"); h.setAttribute("aria-expanded", c.classList.contains("open")); if (c.classList.contains("open")) store.set("study-last", c.id); };
  h.onclick = e => { if (!e.target.classList.contains("check") && !e.target.classList.contains("star")) go() };
  h.onkeydown = e => { if ((e.key === "Enter" || e.key === " ") && e.target === h) { e.preventDefault(); go() } };
});
document.querySelectorAll(".check").forEach(x => x.onchange = () => markStudied(x.dataset.id, x.checked));
document.querySelectorAll(".star").forEach(b => b.onclick = () => {
  const id = b.dataset.id;
  starred.has(id) ? starred.delete(id) : starred.add(id);
  b.classList.toggle("on", starred.has(id)); b.setAttribute("aria-pressed", starred.has(id));
  store.set("study-starred", [...starred]);
});
document.querySelectorAll(".copy").forEach(b => b.onclick = async () => { await navigator.clipboard.writeText(b.nextElementSibling.innerText); b.textContent = "Copied"; setTimeout(() => b.textContent = "Copy", 1000) });
document.querySelectorAll(".reveal").forEach(b => b.onclick = () => { const c = b.closest(".card"); c.classList.toggle("revealed"); b.textContent = c.classList.contains("revealed") ? "Hide answer" : "Reveal answer" });

/* ============ filter (search + category + state) with title match highlight ============ */
const stateSel = document.getElementById("state");
function highlightTitle(card, q) {
  const t = byId.get(card.id).title, h2 = card.querySelector("h2");
  if (!q) { h2.innerHTML = esc(t); return; }
  const i = norm(t).indexOf(q);
  h2.innerHTML = i < 0 ? esc(t) : `${esc(t.slice(0, i))}<mark>${esc(t.slice(i, i + q.length))}</mark>${esc(t.slice(i + q.length))}`;
}
function filter() {
  const q = norm(document.getElementById("msearch").value).trim(), cv = cat.value, sv = stateSel.value;
  let n = 0;
  document.querySelectorAll(".card").forEach(c => {
    const okQ = !q || searchIndex.get(c.id).includes(q);
    const okCat = cv === "all" || c.dataset.cat === cv;
    const okState = sv === "all" || (sv === "studied" ? studied.has(c.id) : sv === "unstudied" ? !studied.has(c.id) : starred.has(c.id));
    const show = okQ && okCat && okState;
    c.hidden = !show;
    if (show) { n++; highlightTitle(c, q); }
  });
  document.getElementById("empty").style.display = n ? "none" : "block";
}
const ms = document.getElementById("msearch"), ss = document.getElementById("ssearch");
ms.oninput = () => { ss.value = ms.value; filter() };
ss.oninput = () => { ms.value = ss.value; filter() };
cat.onchange = filter; stateSel.onchange = filter;

/* ============ toolbar ============ */
document.getElementById("expand").onclick = () => document.querySelectorAll(".card:not([hidden])").forEach(c => { c.classList.add("open"); c.querySelector(".head").setAttribute("aria-expanded", "true") });
document.getElementById("collapse").onclick = () => document.querySelectorAll(".card").forEach(c => { c.classList.remove("open"); c.querySelector(".head").setAttribute("aria-expanded", "false") });
document.getElementById("quiz").onclick = e => { document.body.classList.toggle("quiz"); document.querySelectorAll(".card").forEach(c => c.classList.remove("revealed")); e.target.textContent = document.body.classList.contains("quiz") ? "Exit quiz mode" : "Quiz mode" };
if (store.get("study-theme", "light") === "dark") { document.documentElement.dataset.theme = "dark"; document.getElementById("theme").textContent = "Light mode" }
document.getElementById("theme").onclick = e => { const d = document.documentElement.dataset.theme === "dark"; document.documentElement.dataset.theme = d ? "light" : "dark"; store.set("study-theme", d ? "light" : "dark"); e.target.textContent = d ? "Dark mode" : "Light mode" };
document.getElementById("print").onclick = () => window.print();
document.getElementById("menu").onclick = () => document.getElementById("side").classList.toggle("open");
toc.onclick = e => { if (e.target.tagName === "A") document.getElementById("side").classList.remove("open") };

/* ============ scrollspy: open active group, keep link visible ============ */
const observer = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  document.querySelectorAll(".toc a").forEach(a => a.classList.remove("active"));
  const link = document.querySelector(`.toc a[href="#${e.target.id}"]`);
  if (!link) return;
  link.classList.add("active");
  link.closest(".tgroup").classList.add("open");
  link.scrollIntoView({ block: "nearest" });
  if (booted) store.set("study-last", e.target.id);
}), { rootMargin: "-30% 0px -65% 0px" });
document.querySelectorAll(".card").forEach(c => observer.observe(c));
let booted = false; setTimeout(() => booted = true, 1500);

/* ============ reading progress bar ============ */
const readbar = document.getElementById("readbar");
addEventListener("scroll", () => { readbar.style.width = `${scrollY / (document.body.scrollHeight - innerHeight) * 100}%` }, { passive: true });

/* ============ jump to a topic (used by palette, resume, flashcards) ============ */
function jumpTo(id) {
  const card = document.getElementById(id); if (!card) return;
  if (card.hidden) { ms.value = ss.value = ""; cat.value = "all"; stateSel.value = "all"; filter(); }
  card.classList.add("open"); card.querySelector(".head").setAttribute("aria-expanded", "true");
  card.scrollIntoView({ block: "start" });
  card.classList.add("flash"); setTimeout(() => card.classList.remove("flash"), 1300);
  store.set("study-last", id);
}

/* ============ resume chip ============ */
const lastId = store.get("study-last", null);
if (lastId && byId.has(lastId)) {
  const chip = document.createElement("div"); chip.id = "resume";
  chip.innerHTML = `<button class="rgo">↩ Resume: ${esc(byId.get(lastId).title)}</button><button class="rx" aria-label="Dismiss">✕</button>`;
  document.body.appendChild(chip);
  chip.querySelector(".rgo").onclick = () => { jumpTo(lastId); chip.remove() };
  chip.querySelector(".rx").onclick = () => chip.remove();
}

/* ============ command palette (Cmd/Ctrl+K) ============ */
const pal = document.createElement("div"); pal.id = "palette"; pal.hidden = true;
pal.innerHTML = `<div class="pal" role="dialog" aria-modal="true" aria-label="Jump to topic"><input type="search" placeholder="Jump to a topic…"><div class="plist"></div></div>`;
document.body.appendChild(pal);
const pinput = pal.querySelector("input"), plist = pal.querySelector(".plist");
let psel = 0, pmatches = [];
const palNorm = s => s.toLowerCase().replace(/[–—·-]/g, " ");
function palScore(qWords, t) {
  const title = palNorm(t.title), cat = palNorm(t.category), all = title + " " + cat;
  if (!qWords.every(w => all.includes(w))) return -1;
  let s = 0;
  for (const w of qWords) { if (title.startsWith(w)) s += 3; else if (title.includes(w)) s += 2; else s += 1 }
  return s;
}
function palRender() {
  const q = palNorm(pinput.value).trim();
  const qWords = q.split(/\s+/).filter(Boolean);
  pmatches = !q ? topics.slice(0, 12) :
    topics.map(t => ({ t, s: palScore(qWords, t) }))
      .filter(x => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 12).map(x => x.t);
  psel = Math.min(psel, Math.max(0, pmatches.length - 1));
  plist.innerHTML = pmatches.map((t, i) => `<button class="prow${i === psel ? " sel" : ""}" data-id="${t.id}"><b>${num.get(t.id)}</b> ${esc(t.title)}<span>${esc(t.category)}</span></button>`).join("") || `<div class="pempty">No matches</div>`;
}
function palOpen() { pal.hidden = false; pinput.value = ""; psel = 0; palRender(); pinput.focus() }
function palClose() { pal.hidden = true }
pinput.oninput = () => { psel = 0; palRender() };
pinput.onkeydown = e => {
  if (e.key === "ArrowDown") { e.preventDefault(); psel = Math.min(psel + 1, pmatches.length - 1); palRender() }
  else if (e.key === "ArrowUp") { e.preventDefault(); psel = Math.max(psel - 1, 0); palRender() }
  else if (e.key === "Enter" && pmatches[psel]) { palClose(); jumpTo(pmatches[psel].id) }
  else if (e.key === "Escape") palClose();
};
plist.onclick = e => { const r = e.target.closest(".prow"); if (r) { palClose(); jumpTo(r.dataset.id) } };
pal.onclick = e => { if (e.target === pal) palClose() };

/* ============ flashcard mode ============ */
const fc = document.createElement("div"); fc.id = "flashcards"; fc.hidden = true;
fc.innerHTML = `<div class="fctop"><span class="fccount"></span><span class="fcspacer"></span><button class="btn fcshuffle">🔀 Shuffle</button><button class="btn fcexit">✕ Exit (esc)</button></div>
<div class="fccard" role="dialog" aria-modal="true"><div class="fccat"></div><h2 class="fctitle"></h2><p class="fcq"></p>
<div class="fcanswer" hidden><div class="box layman"><h3>💡 In layman terms</h3><p class="fclay"></p></div><div class="box"><h3>🧠 Technical answer</h3><div class="fctech"></div></div><div class="box memo"><h3>📌 Memory aid</h3><p class="fcmem"></p></div></div></div>
<div class="fcctl"><button class="btn primary fcreveal">Reveal (space)</button><span class="fcjudge" hidden><button class="btn fcagain">↻ Again (a)</button><button class="btn fcgot">✓ Got it (g)</button><button class="btn fcskip">Skip →</button></span></div>`;
document.body.appendChild(fc);
let deck = [], fcMissed = [], fcDone = 0, fcGot = 0;
const $fc = s => fc.querySelector(s);
function fcRender() {
  const t = deck[0];
  if (!t) {
    $fc(".fccat").textContent = ""; $fc(".fctitle").textContent = "Deck complete 🎉";
    $fc(".fcq").textContent = `${fcGot} got it · ${fcMissed.length} to revisit`;
    $fc(".fcanswer").hidden = true; $fc(".fcreveal").hidden = true;
    $fc(".fcjudge").hidden = false;
    $fc(".fcagain").textContent = fcMissed.length ? `↻ Review missed (${fcMissed.length})` : "↻ Restart deck";
    $fc(".fcgot").hidden = true; $fc(".fcskip").hidden = true;
    $fc(".fccount").textContent = "";
    return;
  }
  $fc(".fcgot").hidden = false; $fc(".fcskip").hidden = false; $fc(".fcreveal").hidden = false;
  $fc(".fccat").textContent = t.category; $fc(".fccat").style.setProperty("--hue", catHue.get(t.category));
  $fc(".fctitle").textContent = t.title; $fc(".fcq").textContent = t.question;
  $fc(".fclay").textContent = t.layman; $fc(".fcmem").textContent = t.memory;
  $fc(".fctech").innerHTML = list(t.technical);
  $fc(".fcanswer").hidden = true; $fc(".fcjudge").hidden = true;
  $fc(".fcreveal").textContent = "Reveal (space)";
  $fc(".fccount").textContent = `${fcDone + 1} of ${fcDone + deck.length}${studied.has(t.id) ? " · studied" : ""}`;
}
function fcOpen() {
  deck = topics.filter(t => !document.getElementById(t.id).hidden);
  if (!deck.length) deck = topics.slice();
  fcMissed = []; fcDone = 0; fcGot = 0;
  fc.hidden = false; document.body.style.overflow = "hidden"; fcRender();
}
function fcClose() { fc.hidden = true; document.body.style.overflow = "" }
function fcReveal() { const a = $fc(".fcanswer"); a.hidden = !a.hidden; $fc(".fcjudge").hidden = a.hidden; $fc(".fcreveal").textContent = a.hidden ? "Reveal (space)" : "Hide (space)" }
function fcNext() { deck.shift(); fcDone++; fcRender() }
$fc(".fcexit").onclick = fcClose;
$fc(".fcreveal").onclick = fcReveal;
$fc(".fcskip").onclick = fcNext;
$fc(".fcgot").onclick = () => { fcGot++; markStudied(deck[0].id, true); fcNext() };
$fc(".fcagain").onclick = () => {
  if (!deck.length) { deck = fcMissed.length ? fcMissed.slice() : topics.filter(t => !document.getElementById(t.id).hidden); fcMissed = []; fcDone = 0; fcGot = 0; fcRender(); return }
  const t = deck.shift(); deck.push(t); if (!fcMissed.includes(t)) fcMissed.push(t); fcRender();
};
$fc(".fcshuffle").onclick = () => { for (let i = deck.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0;[deck[i], deck[j]] = [deck[j], deck[i]] } fcRender(); toast("Deck shuffled") };
document.getElementById("flash").onclick = fcOpen;

/* ============ keyboard shortcuts ============ */
function visibleCards() { return [...document.querySelectorAll(".card:not([hidden])")] }
function currentCardIndex(cs) {
  let best = 0;
  cs.forEach((c, i) => { if (c.getBoundingClientRect().top <= 100) best = i });
  return best;
}
addEventListener("keydown", e => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); pal.hidden ? palOpen() : palClose(); return }
  if (!fc.hidden) {
    if (e.key === "Escape") fcClose();
    else if (e.key === " ") { e.preventDefault(); fcReveal() }
    else if (e.key === "ArrowRight") fcNext();
    else if (e.key.toLowerCase() === "g" && deck.length) { fcGot++; markStudied(deck[0].id, true); fcNext() }
    else if (e.key.toLowerCase() === "a") $fc(".fcagain").click();
    return;
  }
  if (!pal.hidden) { if (e.key === "Escape") palClose(); return }
  if (/^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName)) { if (e.key === "Escape") e.target.blur(); return }
  const k = e.key.toLowerCase();
  if (k === "/") { e.preventDefault(); ms.focus() }
  else if (k === "j" || k === "k") {
    const cs = visibleCards(); if (!cs.length) return;
    const i = currentCardIndex(cs);
    const next = cs[Math.min(Math.max(i + (k === "j" ? 1 : -1), 0), cs.length - 1)];
    next.scrollIntoView({ block: "start" });
  }
  else if (k === "f") fcOpen();
  else if (k === "q") document.getElementById("quiz").click();
  else if (k === "d") document.getElementById("theme").click();
  else if (k === "?") toast("Shortcuts: / search · j/k next/prev · f flashcards · q quiz · d dark · ⌘K jump");
});

/* ============ boot ============ */
progress(); renderHeatmap();
