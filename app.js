"use strict";
// Їмо разом — облік калорій і БЖВ на двох. Built-in base: [name, kcal, protein, fat, carbs per 100 g, grams per piece?]; ids are b<index>, append only.
const BUILTIN = [
["Гречка суха",343,12.6,3.3,62.1],["Гречка варена",110,4.2,1.1,21.3],["Рис білий сухий",344,6.7,0.7,78.9],["Рис варений",116,2.2,0.5,24.9],
["Вівсяні пластівці",366,12.3,6.2,61.8],["Вівсянка на воді",88,3,1.7,15],["Булгур сухий",342,12.3,1.3,57.6],["Макарони сухі",350,12,1.5,70],
["Макарони варені",112,3.5,0.4,23.2],["Кіноа суха",368,14.1,6.1,57.2],["Пшоно сухе",342,11.5,3.3,66.5],["Перлова крупа суха",320,9.3,1.1,66.9],
["Кукурудзяна крупа",337,8.3,1.2,71],["Картопля сира",77,2,0.1,17],["Картопля варена",82,2,0.4,16.7],["Картопляне пюре",106,2.5,4.2,14.5],
["Картопля смажена",192,2.8,9.5,23.4],["Картопля фрі",312,3.4,15,41],["Хліб білий",265,8.1,3.2,49,30],["Хліб житній",210,6.6,1.2,40,30],
["Батон",262,7.5,2.9,51,25],["Лаваш",277,9.1,1.1,56],["Хлібці цільнозернові",300,11,3,58,10],["Яйце куряче",155,12.6,10.6,1.1,55],
["Молоко 2,5%",52,2.8,2.5,4.7],["Молоко 3,2%",59,2.9,3.2,4.7],["Кефір 2,5%",51,2.9,2.5,4],["Сир кисломолочний 0%",71,16.5,0,1.3],
["Сир кисломолочний 5%",121,17.2,5,1.8],["Сир кисломолочний 9%",159,16.7,9,2],["Сметана 15%",158,2.6,15,3],["Сметана 20%",204,2.5,20,3.4],
["Йогурт грецький 2%",73,10,2,3.6],["Йогурт натуральний 2,5%",60,4.3,2.5,6],["Сир твердий (гауда)",356,25,27,2.2],["Моцарела",280,22,20,2.2],
["Бринза / фета",264,14,21,4],["Масло вершкове 82%",748,0.5,82.5,0.8],["Вершки 10%",118,3,10,4],["Куряче філе сире",110,23.1,1.2,0],
["Куряче філе варене",137,29.8,1.8,0],["Куряча грудка гриль",165,31,3.6,0],["Куряче стегно без шкіри",125,19.7,5,0],["Курячі гомілки",160,18,9.5,0],
["Індичка філе",114,23.6,1.5,0],["Свинина пісна",143,21,6.3,0],["Свинина шия",267,16,22,0],["Яловичина пісна",158,22.2,7.1,0],
["Фарш яловичий",254,17.2,20,0],["Фарш свинно-яловичий",263,17,21.5,0],["Печінка куряча",136,19.1,6.3,0.6],["Ковбаса варена",257,12.8,22.2,1.5],
["Сосиски",266,11,24,1.6,50],["Шинка",180,18,11,1.5],["Бекон",458,12,45,0],["Котлета смажена",260,15,19,8,80],
["Лосось / сьомга",208,20,13,0],["Тунець у власному соку",116,26,1,0],["Минтай",72,15.9,0.9,0],["Хек",86,16.6,2.2,0],
["Оселедець солоний",217,19.8,15.4,0],["Скумбрія",191,18,13.2,0],["Креветки",97,20.1,1.1,0],["Тофу",144,17.3,8.7,2.8],
["Сочевиця суха",352,24.6,1.1,63],["Нут сухий",364,19.3,6,61],["Квасоля консервована",99,6.7,0.3,17.4],["Горошок зелений консервований",55,3.6,0.1,9.8],
["Кукурудза консервована",82,2.7,1.2,14.6],["Огірок",15,0.8,0.1,2.8,120],["Помідор",18,0.9,0.2,3.9,120],["Перець болгарський",26,1.3,0.1,5.3,150],
["Капуста білокачанна",27,1.8,0.1,4.7],["Квашена капуста",19,1.8,0.1,3],["Броколі",34,2.8,0.4,5.2],["Морква",35,1.3,0.1,7,80],
["Цибуля",41,1.4,0.2,8.2,90],["Буряк варений",48,1.8,0,10.8],["Кабачок",24,0.6,0.3,4.6],["Баклажан",24,1.2,0.1,4.5],
["Салат листовий",15,1.4,0.2,2.3],["Шпинат",23,2.9,0.4,2],["Печериці",27,4.3,1,1],["Часник",149,6.4,0.5,30,5],
["Авокадо",160,2,14.7,1.8,150],["Банан",96,1.5,0.2,21.8,120],["Яблуко",52,0.3,0.2,12,180],["Апельсин",43,0.9,0.2,8.1,160],
["Мандарин",38,0.8,0.2,7.5,70],["Груша",47,0.4,0.3,10.3,170],["Виноград",69,0.6,0.6,15.4],["Ківі",61,1.1,0.5,12,75],
["Полуниця",32,0.7,0.3,7.7],["Чорниця",57,0.7,0.3,12],["Ананас",50,0.5,0.1,12],["Хурма",67,0.5,0.4,15.3,200],
["Гранат",83,1.7,1.2,18.7],["Кавун",30,0.6,0.2,7.5],["Диня",34,0.8,0.2,8],["Волоські горіхи",654,15.2,65.2,7],
["Мигдаль",579,21.2,49.9,9.5],["Арахіс",567,25.8,49.2,9.9],["Кеш'ю",553,18.2,43.8,30.2],["Насіння соняшнику",578,20.7,52.9,10.5],
["Арахісова паста",588,25,50,17],["Фініки",282,2.5,0.4,69,8],["Курага",241,3.4,0.5,55],["Родзинки",299,3.1,0.5,72],
["Олія соняшникова",899,0,99.9,0],["Олія оливкова",898,0,99.8,0],["Майонез 67%",627,0.4,67,3.9],["Кетчуп",100,1.2,0.1,23],
["Соєвий соус",53,6,0.1,7],["Мед",329,0.8,0,81.5],["Цукор",398,0,0,99.7],["Варення",265,0.4,0.2,65],
["Шоколад чорний 70%",580,8,42,36],["Шоколад молочний",545,7.6,31,57],["Печиво вівсяне",437,6.5,14.4,71.8,15],["Морозиво пломбір",232,3.2,15,20.8],
["Згущене молоко",320,7.2,8.5,56],["Круасан",406,8.2,21,45.8,60],["Гранола",450,10,18,62],["Протеїн сироватковий",380,75,6,8,30],
["Кава чорна",2,0.2,0,0.3],["Чай без цукру",1,0,0,0.2],["Сік апельсиновий",45,0.7,0.2,10.4],["Кола",42,0,0,10.6],
["Пиво світле",43,0.5,0,3.6],["Вино червоне сухе",85,0.1,0,2.6],["Борщ",49,1.1,2.2,6.7],["Вареники з картоплею",148,4.4,2.9,26],
["Пельмені",248,11.9,12.4,23],["Сирники",220,15,9.5,18,60],["Омлет",184,9.6,15.4,1.9],["Яєчня",196,13.6,15.3,0.9],
["Олів'є",198,5.4,16.5,7.8],["Піца",266,11,10,33],["Бургер",254,13,12,24,220],["Шаурма",220,10,10,22,350],
["Суші / роли",150,6,2.5,26],["Плов зі свининою",200,6.5,9,23],["Салат овочевий з олією",80,1,6,5]
];

// ---------- config
// Firebase config is public by design (access is controlled by Firestore rules). Fill in to enable sync.
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyB1nVDuIGm6PsHMWXWeyBgR91ysudoruGU",
  authDomain: "eatt-a2e91.firebaseapp.com",
  projectId: "eatt-a2e91",
  storageBucket: "eatt-a2e91.firebasestorage.app",
  messagingSenderId: "995134492839",
  appId: "1:995134492839:web:61a26bd25bfae6aefdcb82"
};
// tried in order; an overloaded or retired model falls through to the next
const MODELS_TEXT = ["gemini-3.5-flash-lite", "gemini-flash-lite-latest", "gemini-3.5-flash", "gemini-flash-latest"];
const MODELS_PHOTO = ["gemini-3.5-flash", "gemini-flash-latest", "gemini-3.5-flash-lite", "gemini-flash-lite-latest"];
const FB_VER = "10.12.2";

const PEOPLE = [{id:"vlad",name:"Влад"},{id:"vika",name:"Віка"}];
const MEALS = [["breakfast","Сніданок"],["lunch","Обід"],["dinner","Вечеря"],["snack","Перекус"]];
const MEAL_NAME = Object.fromEntries(MEALS);
const DEFAULT_SETTINGS = {goals:{vlad:{kcal:2500,p:150,f:80,c:290},vika:{kcal:1800,p:100,f:60,c:210}},ratio:70};
const MAC = [["p","Б","--protS"],["f","Ж","--fat"],["c","В","--carb"]];

// ---------- helpers
const $ = s => document.querySelector(s);
const num = v => { const n = parseFloat(String(v ?? "").replace(",", ".")); return isFinite(n) ? n : 0; };
const r1 = n => Math.round(n * 10) / 10;
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const iso = d => { const z = n => String(n).padStart(2, "0"); return d.getFullYear() + "-" + z(d.getMonth() + 1) + "-" + z(d.getDate()); };
const norm = s => String(s || "").toLowerCase().replace(/[ʼ'’`]/g, "").replace(/ё/g, "е").replace(/\s+/g, " ").trim();
const rid = (n = 20) => { const a = crypto.getRandomValues(new Uint8Array(n)); return Array.from(a, b => "abcdefghijkmnpqrstuvwxyz23456789"[b % 32]).join(""); };
const LS = {
  get(k, d = null){ try { const v = localStorage.getItem("yr_" + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v){ try { localStorage.setItem("yr_" + k, JSON.stringify(v)); } catch {} },
  del(k){ try { localStorage.removeItem("yr_" + k); } catch {} }
};
function toast(msg){ const t = $("#toast"); t.textContent = msg; t.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => t.hidden = true, 2400); }
function defaultMeal(){ const h = new Date().getHours(); return h < 11 ? "breakfast" : h < 16 ? "lunch" : h < 21 ? "dinner" : "snack"; }
function aiErr(e){
  if (e && e.code === "nokey") return "Додайте ключ Gemini у «Налаштуваннях».";
  if (e && e.code === "rate") return "Ліміт Gemini на хвилину вичерпано. Спробуйте трохи пізніше.";
  if (e && e.code === "json") return "ШІ відповів незрозуміло. Спробуйте ще раз.";
  if (e && e.code === "api") return "Gemini: " + (e.message || "помилка").slice(0, 140);
  return "Немає зв'язку з ШІ. Перевірте інтернет і спробуйте ще раз.";
}

// ---------- AI (Gemini, key lives only on this device)
async function imageToB64(file){
  const bmp = await createImageBitmap(file).catch(() => null);
  if (!bmp) return {mime:file.type || "image/jpeg", data: await new Promise(r => { const fr = new FileReader(); fr.onload = () => r(String(fr.result).split(",")[1]); fr.readAsDataURL(file); })};
  const s = Math.min(1, 1280 / Math.max(bmp.width, bmp.height)), c = document.createElement("canvas");
  c.width = Math.round(bmp.width * s); c.height = Math.round(bmp.height * s);
  c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
  return {mime:"image/jpeg", data:c.toDataURL("image/jpeg", 0.85).split(",")[1]};
}
async function ai(prompt, image){
  const key = LS.get("gemini"); if (!key) throw {code:"nokey"};
  const parts = [{text:prompt}];
  if (image) { const im = await imageToB64(image); parts.push({inline_data:{mime_type:im.mime, data:im.data}}); }
  let d = null, lastErr = {code:"net"};
  for (const model of (image ? MODELS_PHOTO : MODELS_TEXT)) {
    let r;
    try {
      r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({contents:[{parts}], generationConfig:{responseMimeType:"application/json", temperature:0.2}})});
    } catch { lastErr = {code:"net"}; continue; }
    const body = await r.json().catch(() => ({}));
    if (r.ok) { d = body; break; }
    if (r.status === 400 || r.status === 401 || r.status === 403) throw {code:"api", message:body.error?.message};
    lastErr = r.status === 429 ? {code:"rate"} : {code:"api", message:body.error?.message};
  }
  if (!d) throw lastErr;
  const text = (d.candidates?.[0]?.content?.parts || []).filter(p => p.text && !p.thought).map(p => p.text).join("");
  try { return JSON.parse(text); } catch {}
  const m = text.match(/[\[{][\s\S]*[\]}]/); if (m) { try { return JSON.parse(m[0]); } catch {} }
  throw {code:"json"};
}

// ---------- Open Food Facts (packaged products)
async function offSearch(q){
  const fields = "code,product_name,product_name_uk,brands,nutriments";
  const tries = [
    `https://search.openfoodfacts.org/search?q=${encodeURIComponent(q)}&page_size=12&fields=${fields}`,
    `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(q)}&search_simple=1&json=1&page_size=12&fields=${fields}`
  ];
  if (/^\d{8,14}$/.test(q.trim())) tries.unshift(`https://world.openfoodfacts.org/api/v2/product/${q.trim()}.json?fields=${fields}`);
  for (const url of tries) {
    try {
      const r = await fetch(url); if (!r.ok) continue;
      const d = await r.json();
      const list = d.product ? [d.product] : (d.hits || d.products || []);
      const out = list.map(p => {
        const n = p.nutriments || {};
        const kcal = num(n["energy-kcal_100g"]) || num(n["energy_100g"]) / 4.184;
        const brand = Array.isArray(p.brands) ? p.brands[0] : String(p.brands || "").split(",")[0];
        const name = (p.product_name_uk || p.product_name || "").trim();
        return {name: name + (brand ? " (" + brand.trim() + ")" : ""), kcal:r1(kcal), p:r1(num(n.proteins_100g)), f:r1(num(n.fat_100g)), c:r1(num(n.carbohydrates_100g)), code:p.code};
      }).filter(p => p.name && p.kcal > 0);
      if (out.length || d.product) return out;
    } catch {}
  }
  throw {code:"off"};
}

// ---------- state
const S = { date: iso(new Date()), entries: [], over: {}, settings: structuredClone(DEFAULT_SETTINGS),
  sel: null, pending: [], photo: null, cloud: null };
const local = { entries: LS.get("entries", []), over: LS.get("over", {}), settings: LS.get("settings", null) };
if (local.settings) S.settings = {...structuredClone(DEFAULT_SETTINGS), ...local.settings};
S.over = local.over;

function products(){
  const out = [];
  BUILTIN.forEach((b, i) => {
    const id = "b" + i, base = {id, name:b[0], kcal:b[1], p:b[2], f:b[3], c:b[4], pc:b[5] || null, src:"base"};
    const o = S.over[id];
    if (o) { if (!o.hidden) out.push({...base, ...o, id, src:"edit", orig:base}); }
    else out.push(base);
  });
  for (const [id, o] of Object.entries(S.over)) if (id[0] !== "b" && !o.hidden) out.push({...o, id, src:o.src || "own"});
  return out;
}
const byName = name => { const n = norm(name); return products().find(p => norm(p.name) === n) || null; };
function search(q, limit = 8){
  const n = norm(q); if (!n) return [];
  const words = n.split(" ");
  return products().map(p => {
    const pn = norm(p.name); let s = 0;
    if (pn === n) s = 100; else if (pn.startsWith(n)) s = 80; else if (pn.includes(n)) s = 60;
    else if (words.every(w => pn.includes(w))) s = 40; else if (words.some(w => w.length > 2 && pn.includes(w))) s = 15;
    return [s, p];
  }).filter(x => x[0] > 0).sort((a, b) => b[0] - a[0] || a[1].name.length - b[1].name.length).slice(0, limit).map(x => x[1]);
}
function totals(person, list = S.entries){
  const t = {kcal:0, p:0, f:0, c:0};
  for (const e of list) { const g = num(e.g && e.g[person]); if (!g) continue;
    for (const k of ["kcal","p","f","c"]) t[k] += num(e.per && e.per[k]) * g / 100; }
  return t;
}

// ---------- persistence: cloud (Firestore) when paired, otherwise this device
const saveLocal = () => { LS.set("entries", local.entries); LS.set("over", local.over); };
function refreshLocal(){ S.entries = local.entries.filter(e => e.date === S.date); renderDay(); }
async function putEntry(id, data){
  if (S.cloud) return S.cloud.set("entries", id, data);
  const i = local.entries.findIndex(e => e.id === id), row = {id, ...data};
  i >= 0 ? local.entries[i] = row : local.entries.push(row); saveLocal(); refreshLocal();
}
async function delEntry(id){
  if (S.cloud) return S.cloud.del("entries", id);
  local.entries = local.entries.filter(e => e.id !== id); saveLocal(); refreshLocal();
}
async function putProduct(id, data){
  if (S.cloud) return S.cloud.set("products", id, data);
  local.over[id] = data; S.over = local.over; saveLocal(); renderBase(); renderSel();
}
async function delProduct(id){
  if (S.cloud) return S.cloud.del("products", id);
  delete local.over[id]; S.over = local.over; saveLocal(); renderBase(); renderSel();
}
async function putSettings(data){
  LS.set("settings", data);
  if (S.cloud) return S.cloud.set("meta", "settings", data);
  S.settings = {...structuredClone(DEFAULT_SETTINGS), ...data}; renderAll();
}
const newId = () => rid(16);
async function historyRows(){
  if (S.cloud) { try { return await S.cloud.recent(300); } catch {} }
  return [...local.entries].sort((a, b) => num(b.t) - num(a.t)).slice(0, 300);
}
function subscribeDay(){
  if (!S.cloud) return refreshLocal();
  S.entries = []; renderDay(true);
  S.cloud.watchDay(S.date, rows => { S.entries = rows; renderDay(); });
}
function banner(msg){ const b = $("#banner"); b.textContent = msg; b.hidden = !msg; }

async function connectCloud(){
  const code = LS.get("pair");
  if (!FIREBASE_CONFIG || !code) { updateSyncLabel(); return; }
  try {
    const base = `https://www.gstatic.com/firebasejs/${FB_VER}/`;
    const [{initializeApp}, {getAuth, signInAnonymously}, fs] = await Promise.all([
      import(base + "firebase-app.js"), import(base + "firebase-auth.js"), import(base + "firebase-firestore.js")]);
    const app = initializeApp(FIREBASE_CONFIG);
    await signInAnonymously(getAuth(app));
    const db = fs.initializeFirestore(app, {localCache: fs.persistentLocalCache()});
    const col = name => fs.collection(db, "h", code, name);
    let unsubDay = null;
    S.cloud = {
      set: (c, id, data) => fs.setDoc(fs.doc(col(c), id), data),
      del: (c, id) => fs.deleteDoc(fs.doc(col(c), id)),
      recent: async n => (await fs.getDocs(fs.query(col("entries"), fs.orderBy("t", "desc"), fs.limit(n)))).docs.map(d => d.data()),
      watchDay(date, cb){ if (unsubDay) unsubDay(); unsubDay = fs.onSnapshot(fs.query(col("entries"), fs.where("date", "==", date)),
        s => cb(s.docs.map(d => ({id:d.id, ...d.data()}))), e => banner("Синхронізація: " + e.code)); }
    };
    fs.onSnapshot(col("products"), s => { const o = {}; s.docs.forEach(d => o[d.id] = d.data()); S.over = o; renderBase(); renderSel(); });
    fs.onSnapshot(fs.doc(col("meta"), "settings"), s => { if (s.exists()) { S.settings = {...structuredClone(DEFAULT_SETTINGS), ...s.data()}; renderDay(); updateRatio(); } });
    // first pairing on this device: move what was stored locally into the shared space
    if (local.entries.length || Object.keys(local.over).length) {
      for (const e of local.entries) { const {id, ...d} = e; await S.cloud.set("entries", id, d); }
      for (const [id, d] of Object.entries(local.over)) await S.cloud.set("products", id, d);
      if (local.settings) await S.cloud.set("meta", "settings", local.settings);
      LS.set("backup_before_sync", {entries:local.entries, over:local.over});
      local.entries = []; local.over = {}; saveLocal();
    }
    banner(""); subscribeDay();
  } catch (e) {
    S.cloud = null; banner("Не вдалося підключити спільну базу (" + (e.code || e.message || "помилка") + "). Поки записи зберігаються на цьому телефоні.");
  }
  updateSyncLabel();
}
function updateSyncLabel(){ $("#syncState").textContent = S.cloud ? "спільно" : "лише цей телефон"; $("#syncState").className = "syncstate " + (S.cloud ? "on" : ""); }

// ---------- rendering
function ringSvg(pct, color, stroke){
  const r = 50 - stroke / 2 - 1, C = 2 * Math.PI * r;
  const main = Math.min(pct, 1), over = Math.max(0, Math.min(pct - 1, 1));
  return `<svg viewBox="0 0 100 100" aria-hidden="true"><g transform="rotate(-90 50 50)">
    <circle cx="50" cy="50" r="${r}" fill="none" stroke="var(--line)" stroke-width="${stroke}"/>
    <circle class="arc" cx="50" cy="50" r="${r}" fill="none" stroke="var(${color})" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${main * C} ${C}"/>
    ${over > 0 ? `<circle class="arc" cx="50" cy="50" r="${r}" fill="none" stroke="var(--over)" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${over * C} ${C}"/>` : ""}
  </g></svg>`;
}
function renderPeople(){
  $("#people").innerHTML = PEOPLE.map(pp => {
    const t = totals(pp.id), g = S.settings.goals[pp.id] || DEFAULT_SETTINGS.goals[pp.id];
    const pct = g.kcal ? t.kcal / g.kcal : 0, left = Math.round(g.kcal - t.kcal);
    return `<article class="person ${pp.id}">
      <header><h2>${pp.name}</h2></header>
      <div class="ring">${ringSvg(pct, "--" + pp.id, 9)}
        <div class="center"><div class="big num">${Math.round(t.kcal)}</div><div class="of num">з ${g.kcal} ккал</div>
        <div class="left num ${left < 0 ? "over" : ""}">${left >= 0 ? "ще " + left : "+" + (-left) + " понад"}</div></div></div>
      <div class="macros">${MAC.map(([k, L, col]) => {
        const gv = num(g[k]), v = t[k], pc = gv ? v / gv : 0;
        return `<div class="mac" title="${L}: ${r1(v)} з ${gv} г"><div class="mring">${ringSvg(pc, col, 12)}<b style="color:var(${col})">${L}</b></div>
          <div class="mv num"><strong>${Math.round(v)}</strong>/${gv} г</div></div>`;
      }).join("")}</div>
    </article>`;
  }).join("");
}
function renderLog(loading){
  const box = $("#log");
  if (loading) { box.innerHTML = `<div class="empty">Завантажую записи…</div>`; $("#logSum").textContent = ""; return; }
  if (!S.entries.length) {
    box.innerHTML = `<div class="empty">За цей день ще нічого. Додайте продукт угорі або вставте нотатку, і тут з'являться страви з порціями Влада й Віки.</div>`;
    $("#logSum").textContent = ""; return;
  }
  const sorted = [...S.entries].sort((a, b) => num(a.t) - num(b.t));
  box.innerHTML = MEALS.map(([m, label]) => {
    const list = sorted.filter(e => (e.meal || "snack") === m); if (!list.length) return "";
    const tv = totals("vlad", list).kcal, tk = totals("vika", list).kcal;
    return `<div class="meal"><h3><span>${label}</span><span class="num">${Math.round(tv)} · ${Math.round(tk)} ккал</span></h3>
      ${list.map(e => `<button class="item" data-edit="${esc(e.id)}"><span class="iname">${esc(e.name)}</span><span class="ipp">
        ${PEOPLE.map(pp => { const g = num(e.g && e.g[pp.id]); const k = num(e.per && e.per.kcal) * g / 100;
          return `<span class="pill ${pp.id} num ${g ? "" : "off"}">${pp.name} ${g ? Math.round(g) + " г · " + Math.round(k) + " ккал" : "—"}</span>`; }).join("")}
      </span></button>`).join("")}</div>`;
  }).join("");
  $("#logSum").textContent = S.entries.length + " поз.";
}
function renderDate(){
  const d = new Date(S.date + "T12:00:00"), today = iso(new Date());
  const y = new Date(); y.setDate(y.getDate() - 1);
  const label = d.toLocaleDateString("uk-UA", {day:"numeric", month:"long"});
  $("#dateLabel").textContent = S.date === today ? "Сьогодні, " + label : S.date === iso(y) ? "Вчора, " + label : d.toLocaleDateString("uk-UA", {weekday:"short", day:"numeric", month:"long"});
}
function renderDay(loading){ renderDate(); renderPeople(); renderLog(loading); }
function badge(p){ return p.src === "edit" ? `<span class="badge edit">змінено</span>` : p.src === "claude" || p.src === "ai" ? `<span class="badge claude">від ШІ</span>` : p.src === "off" ? `<span class="badge off">OFF</span>` : p.src === "own" ? `<span class="badge own">свій</span>` : ""; }
function renderBase(){
  const q = $("#baseSearch").value;
  const all = products();
  const list = q.trim() ? search(q, 60) : [...all.filter(p => p.src !== "base"), ...all.filter(p => p.src === "base")].slice(0, 25);
  $("#baseList").innerHTML = list.length ? list.map(p => `<button class="bitem" data-prod="${esc(p.id)}"><span class="bn">${esc(p.name)}${badge(p)}</span>
    <span class="bv num">${Math.round(p.kcal)} ккал · ${r1(p.p)}/${r1(p.f)}/${r1(p.c)}</span></button>`).join("")
    + (q.trim() ? "" : `<p class="hint" style="padding-top:8px">Показано ${list.length} з ${all.length}. Шукайте, щоб побачити решту.</p>`)
    : `<div class="empty">Нічого не знайдено. Додайте свій продукт або знайдіть у вкладці «Додати».</div>`;
}
function updateRatio(){ $("#ratioBtn").textContent = (S.settings.ratio || 70) + "%"; }
function renderAll(){ renderDay(); renderBase(); renderSel(); updateRatio(); }

// ---------- manual add
const mealSel = $("#meal");
mealSel.innerHTML = MEALS.map(([v, l]) => `<option value="${v}">${l}</option>`).join("");
mealSel.value = defaultMeal();
let suggIdx = -1;
function renderSugg(){
  const q = $("#q").value, box = $("#sugg");
  if (norm(q).length < 1) { box.hidden = true; return; }
  const res = search(q);
  const long = norm(q).length >= 2;
  box.innerHTML = res.map((p, i) => `<button type="button" data-pick="${esc(p.id)}" class="${i === suggIdx ? "hi" : ""}"><span>${esc(p.name)}${badge(p)}</span><small class="num">${Math.round(p.kcal)} ккал</small></button>`).join("")
    + (long ? `<button type="button" data-off="1" class="ask"><span>Шукати «${esc(q.trim())}» в Open Food Facts</span><small>магазинні продукти</small></button>
      <button type="button" data-ask="1" class="ask"><span>Запитати ШІ про «${esc(q.trim())}»</span><small>БЖВ на 100 г</small></button>` : "");
  box.hidden = false;
}
function pick(p){ S.sel = p; $("#q").value = p.name; $("#sugg").hidden = true; renderSel(); $("#gVlad").focus(); }
function renderSel(){
  const info = $("#selInfo"), chips = $("#pcChips");
  if (S.sel) S.sel = products().find(p => p.id === S.sel.id) || S.sel;
  const p = S.sel;
  if (!p) { info.innerHTML = "Оберіть продукт зі списку. Якщо його немає, знайдіть в Open Food Facts або запитайте ШІ."; chips.hidden = true; calc(); return; }
  info.innerHTML = `<strong>${esc(p.name)}</strong><span class="num">${Math.round(p.kcal)} ккал · Б ${r1(p.p)} · Ж ${r1(p.f)} · В ${r1(p.c)} на 100 г</span>
    ${p.pc ? `<span class="num">1 шт ≈ ${p.pc} г</span>` : ""}<button class="mini" type="button" data-prod="${esc(p.id)}">Поправити БЖВ</button>`;
  if (p.pc) { chips.innerHTML = `<button class="mini vlad-l" type="button" data-pc="gVlad">Влад +1 шт</button><button class="mini vika-l" type="button" data-pc="gVika">Віка +1 шт</button>`; chips.hidden = false; }
  else chips.hidden = true;
  calc();
}
function calc(){
  const p = S.sel, gv = num($("#gVlad").value), gk = num($("#gVika").value);
  $("#addBtn").disabled = !(p && (gv > 0 || gk > 0));
  if (!p) { $("#addCalc").innerHTML = ""; return; }
  $("#addCalc").innerHTML = [["Влад", gv, "vlad"], ["Віка", gk, "vika"]].filter(x => x[1] > 0)
    .map(([n, g, id]) => `<span class="num" style="color:var(--${id})">${n}: ${Math.round(p.kcal * g / 100)} ккал · Б ${r1(p.p * g / 100)} Ж ${r1(p.f * g / 100)} В ${r1(p.c * g / 100)}</span>`).join("");
}
$("#q").addEventListener("input", () => { S.sel = null; suggIdx = -1; renderSugg(); renderSel(); });
$("#q").addEventListener("focus", renderSugg);
$("#q").addEventListener("keydown", e => {
  const btns = [...$("#sugg").querySelectorAll("button")];
  if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); suggIdx = Math.max(0, Math.min(btns.length - 1, suggIdx + (e.key === "ArrowDown" ? 1 : -1))); renderSugg(); }
  else if (e.key === "Enter") { e.preventDefault(); (btns[Math.max(0, suggIdx)] || {}).click?.(); }
  else if (e.key === "Escape") $("#sugg").hidden = true;
});
document.addEventListener("click", e => { if (!e.target.closest(".search")) $("#sugg").hidden = true; });
$("#sugg").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  if (b.dataset.pick) pick(products().find(p => p.id === b.dataset.pick));
  else if (b.dataset.ask) askProduct($("#q").value.trim());
  else if (b.dataset.off) offPick($("#q").value.trim());
});
["gVlad", "gVika"].forEach(id => $("#" + id).addEventListener("input", calc));
$("#ratioBtn").addEventListener("click", () => { const v = num($("#gVlad").value); if (v) { $("#gVika").value = Math.round(v * (S.settings.ratio || 70) / 100); calc(); } });
$("#pcChips").addEventListener("click", e => { const b = e.target.closest("[data-pc]"); if (!b || !S.sel) return; const inp = $("#" + b.dataset.pc); inp.value = Math.round(num(inp.value) + S.sel.pc); calc(); });
$("#addBtn").addEventListener("click", async () => {
  const p = S.sel; if (!p) return;
  const data = { date:S.date, meal:mealSel.value, name:p.name, productId:p.id,
    per:{kcal:p.kcal, p:p.p, f:p.f, c:p.c}, g:{vlad:num($("#gVlad").value), vika:num($("#gVika").value)}, t:Date.now() };
  $("#addBtn").disabled = true;
  try { await putEntry(newId(), data); toast("Додано: " + p.name); $("#q").value = ""; $("#gVlad").value = ""; $("#gVika").value = ""; S.sel = null; renderSel(); }
  catch (e) { toast("Не збереглося: " + (e.code || "помилка")); calc(); }
});
async function saveNewProduct(data){
  const exists = byName(data.name); if (exists) return exists;
  const id = "c" + newId(); await putProduct(id, data); return {id, ...data};
}
async function askProduct(name){
  $("#sugg").hidden = true;
  const info = $("#selInfo"); info.innerHTML = `<span class="thinking">ШІ шукає «${esc(name)}»…</span>`;
  try {
    const r = await ai(`Дай типову харчову цінність на 100 г для продукту або страви: «${name}». Мається на увазі стан, у якому це зазвичай їдять в Україні (якщо назва не каже «сухий» чи «сирий»). Якщо це бренд чи упаковка, дай дані саме цього продукту або найближчий середній аналог.
Відповідай лише JSON: {"name":"коротка українська назва","kcal":число,"p":білки,"f":жири,"c":вуглеводи,"pc":вага 1 штуки в грамах або null}`);
    if (!r || !isFinite(num(r.kcal)) || !num(r.kcal)) throw {code:"json"};
    const p = await saveNewProduct({name:String(r.name || name).slice(0, 80), kcal:num(r.kcal), p:num(r.p), f:num(r.f), c:num(r.c), pc:num(r.pc) || null, src:"ai"});
    pick(p); toast("Є в базі. Перевірте БЖВ");
  } catch (e) { info.textContent = aiErr(e); }
}
async function offPick(q){
  $("#sugg").hidden = true;
  openModal(`<h3>Open Food Facts: «${esc(q)}»</h3><p class="thinking">Шукаю…</p>`);
  let list;
  try { list = await offSearch(q); } catch { $("#sheet").innerHTML = `<h3>Open Food Facts</h3><p>Сервіс зараз не відповідає. Спробуйте пізніше або запитайте ШІ.</p><button class="ghost" data-close>Закрити</button>`; return; }
  $("#sheet").innerHTML = `<h3>Open Food Facts: «${esc(q)}»</h3>` + (list.length
    ? `<div class="base">${list.map((p, i) => `<button class="bitem" data-offi="${i}"><span class="bn">${esc(p.name)}</span><span class="bv num">${Math.round(p.kcal)} ккал · ${p.p}/${p.f}/${p.c}</span></button>`).join("")}</div>`
    : `<p>Нічого не знайдено. Спробуйте іншу назву, штрихкод з упаковки або запитайте ШІ.</p>`) + `<p class="hint">Можна шукати за штрихкодом: введіть цифри з упаковки.</p><button class="ghost" data-close>Закрити</button>`;
  $("#sheet").querySelectorAll("[data-offi]").forEach(b => b.addEventListener("click", async () => {
    const o = list[+b.dataset.offi];
    const p = await saveNewProduct({name:o.name.slice(0, 80), kcal:o.kcal, p:o.p, f:o.f, c:o.c, pc:null, src:"off", code:o.code || null});
    closeModal(); pick(p); toast("Додано в базу");
  }));
}

// ---------- tabs
function showTab(name){
  document.querySelectorAll(".tabs button").forEach(x => x.setAttribute("aria-selected", x.dataset.tab === name));
  for (const t of ["manual", "note", "photo"]) { const el = $("#tab-" + t); el.hidden = t !== name; el.style.display = t === name ? "flex" : ""; }
}
document.querySelectorAll(".tabs button").forEach(b => b.addEventListener("click", () => showTab(b.dataset.tab)));

// ---------- usual portions (for note & photo)
async function usualPortions(){
  const rows = await historyRows(), m = {};
  for (const e of rows) { const k = norm(e.name); (m[k] ||= {name:e.name, n:0, vlad:0, vika:0}); m[k].n++; m[k].vlad += num(e.g?.vlad); m[k].vika += num(e.g?.vika); }
  return Object.values(m).sort((a, b) => b.n - a.n).slice(0, 40)
    .map(x => `${x.name}: Влад ~${Math.round(x.vlad / x.n)} г, Віка ~${Math.round(x.vika / x.n)} г`).join("\n");
}
const ITEM_FORMAT = `Відповідай лише JSON-масивом об'єктів:
[{"name":"назва","match":"точна назва з бази або null","meal":"breakfast|lunch|dinner|snack","vlad_g":число,"vika_g":число,"kcal":число,"p":число,"f":число,"c":число}]
kcal/p/f/c — на 100 г у тому стані, як з'їли (варене, смажене тощо). Якщо продукт є в базі, вкажи його точну назву в "match".`;
const baseNames = () => products().map(p => p.name).join("; ");

$("#parseBtn").addEventListener("click", async () => {
  const text = $("#noteText").value.trim(); if (!text) { toast("Вставте текст нотатки"); return; }
  const st = $("#noteStatus"), btn = $("#parseBtn"); st.textContent = "ШІ читає нотатку…"; btn.disabled = true;
  try {
    const usual = await usualPortions();
    const r = await ai(`Ти розбираєш нотатку про їжу двох людей, Влада і Віки. Вони часто їдять одне й те саме, але різні порції.
Правила:
- Кожен продукт чи страва окремим рядком. Штуки, ложки, тарілки, шматки переведи в грами за середньою вагою.
- Якщо сказано лише про одного — інший 0. Якщо не сказано, чия порція, вважай, що їли обоє: Віці ${S.settings.ratio || 70}% від Владової порції.
- Якщо порцію не вказано, візьми звичну порцію з історії нижче, а якщо її немає — середню порцію.
- Прийом їжі визнач з тексту, інакше за змістом.

Звичні порції з історії:
${usual || "(історії ще немає)"}

База продуктів: ${baseNames()}

Нотатка:
"""${text.slice(0, 6000)}"""

${ITEM_FORMAT}`);
    showPreview(Array.isArray(r) ? r : (r && Array.isArray(r.items) ? r.items : [])); st.textContent = "";
  } catch (e) { st.textContent = aiErr(e); }
  btn.disabled = false;
});

// ---------- photo
$("#photoFile").addEventListener("change", e => {
  const f = e.target.files[0]; S.photo = f || null;
  const img = $("#photoPrev"); if (f) { img.src = URL.createObjectURL(f); img.hidden = false; } else img.hidden = true;
  $("#photoBtn").disabled = !f;
});
$("#photoBtn").addEventListener("click", async () => {
  if (!S.photo) return;
  const who = $("#photoWho").value, st = $("#photoStatus"), btn = $("#photoBtn");
  st.textContent = "ШІ розглядає фото…"; btn.disabled = true;
  const whoText = who === "both" ? `Це їжа для обох. Розділи кожну позицію: Віці ${S.settings.ratio || 70}% від Владової порції (сума = те, що на фото).`
    : who === "vlad" ? "Це порція лише Влада (vika_g = 0)." : "Це порція лише Віки (vlad_g = 0).";
  try {
    const usual = await usualPortions();
    const about = $("#photoNote").value.trim().slice(0, 1500);
    const r = await ai(`На фото їжа. Визнач кожну страву чи продукт і оціни вагу в грамах за розміром посуду, видимим об'ємом і середніми порціями. ${whoText}
${about ? `Пояснення від нас до фото (довіряй йому більше, ніж своїй здогадці: назви, склад, вага, хто скільки з'їв):\n"""${about}"""\n` : ""}
Звичні порції цієї пари з історії (використовуй, щоб уточнити оцінку):
${usual || "(історії ще немає)"}
Прийом їжі: ${MEAL_NAME[defaultMeal()]} (meal="${defaultMeal()}"), якщо з фото не очевидно інше.
База продуктів: ${baseNames()}

${ITEM_FORMAT}`, S.photo);
    showPreview(Array.isArray(r) ? r : (r && Array.isArray(r.items) ? r.items : [])); st.textContent = "";
  } catch (e) { st.textContent = aiErr(e); }
  btn.disabled = false;
});

// ---------- preview (note & photo results)
function showPreview(items){
  S.pending = items.filter(x => x && x.name).map(x => {
    const m = (x.match && byName(x.match)) || byName(x.name);
    return { name: m ? m.name : String(x.name).slice(0, 80), productId: m ? m.id : null,
      meal: MEAL_NAME[x.meal] ? x.meal : "snack", vlad: Math.round(num(x.vlad_g)), vika: Math.round(num(x.vika_g)),
      kcal: m ? m.kcal : num(x.kcal), p: m ? m.p : num(x.p), f: m ? m.f : num(x.f), c: m ? m.c : num(x.c) };
  });
  if (!S.pending.length) { toast("Не знайшов їжі"); return; }
  renderPreview();
}
function readPreview(){
  document.querySelectorAll(".prow").forEach(row => {
    const it = S.pending[+row.dataset.i]; if (!it) return;
    row.querySelectorAll("[data-k]").forEach(inp => { const k = inp.dataset.k; it[k] = (k === "name" || k === "meal") ? inp.value : num(inp.value); });
    if (it.productId && byName(it.name)?.id !== it.productId) it.productId = byName(it.name)?.id || null;
  });
}
function renderPreview(){
  const box = $("#preview");
  if (!S.pending.length) { box.hidden = true; box.innerHTML = ""; return; }
  const inp = (k, v, ph) => `<input data-k="${k}" value="${esc(v)}" placeholder="${ph}" inputmode="decimal" aria-label="${ph}" class="num">`;
  box.innerHTML = `<div class="sechead"><h2>Розпізнано: перевірте</h2><span class="hint">грами й БЖВ на 100 г можна правити</span></div>
    ${S.pending.map((it, i) => `<div class="prow" data-i="${i}"><div class="pfull">
      <div class="pmain"><input data-k="name" value="${esc(it.name)}" aria-label="Назва"><select data-k="meal" aria-label="Прийом їжі">${MEALS.map(([v, l]) => `<option value="${v}" ${v === it.meal ? "selected" : ""}>${l}</option>`).join("")}</select></div>
      <div class="pg"><label class="field"><span class="tag vlad-l">Влад, г</span>${inp("vlad", it.vlad, "Влад, г")}</label><label class="field"><span class="tag vika-l">Віка, г</span>${inp("vika", it.vika, "Віка, г")}</label></div>
      <div class="p100">${[["kcal","ккал"],["p","Б"],["f","Ж"],["c","В"]].map(([k, l]) => `<label class="field"><span class="tag">${l}/100 г</span>${inp(k, r1(it[k]), l)}</label>`).join("")}</div>
      <span class="tag">${it.productId ? "з бази продуктів" : "новий: збережеться в базу з позначкою «від ШІ»"}</span>
    </div><button class="xbtn" data-rm="${i}" aria-label="Прибрати">×</button></div>`).join("")}
    <div class="btnrow"><button id="addAll" class="primary">Додати все (${S.pending.length})</button><button id="cancelPrev" class="ghost">Скасувати</button></div>`;
  box.hidden = false;
  box.scrollIntoView({behavior:"smooth", block:"nearest"});
}
$("#preview").addEventListener("click", async e => {
  const rm = e.target.closest("[data-rm]");
  if (rm) { readPreview(); S.pending.splice(+rm.dataset.rm, 1); renderPreview(); return; }
  if (e.target.id === "cancelPrev") { S.pending = []; renderPreview(); return; }
  if (e.target.id === "addAll") {
    readPreview(); e.target.disabled = true;
    try {
      const t0 = Date.now(); let i = 0;
      for (const it of S.pending) {
        if (!(it.vlad > 0 || it.vika > 0)) continue;
        let pid = it.productId;
        if (!pid) pid = (await saveNewProduct({name:it.name, kcal:it.kcal, p:it.p, f:it.f, c:it.c, pc:null, src:"ai"})).id;
        await putEntry(newId(), {date:S.date, meal:it.meal, name:it.name, productId:pid,
          per:{kcal:it.kcal, p:it.p, f:it.f, c:it.c}, g:{vlad:it.vlad, vika:it.vika}, t:t0 + i++});
      }
      toast("Додано позицій: " + i); S.pending = []; renderPreview(); $("#noteText").value = ""; $("#photoNote").value = "";
    } catch (err) { toast("Не все збереглося: " + (err.code || "помилка")); e.target.disabled = false; }
  }
});

// ---------- modals
function openModal(html){ $("#sheet").innerHTML = html; $("#modal").hidden = false; const f = $("#sheet").querySelector("input,select,button"); f && f.focus({preventScroll:true}); }
function closeModal(){ $("#modal").hidden = true; $("#sheet").innerHTML = ""; }
$("#modal").addEventListener("click", e => { if (e.target.id === "modal" || e.target.closest("[data-close]")) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("#modal").hidden) closeModal(); });
const fld = (id, label, v, cls = "", mode = "decimal") => `<div class="field"><label for="${id}" class="${cls}">${label}</label><input id="${id}" value="${esc(v)}" inputmode="${mode}" class="num"></div>`;
const per100 = (pre, p) => `<div class="grid4">${fld(pre + "kcal", "ккал / 100 г", r1(p.kcal))}${fld(pre + "p", "Білки, г", r1(p.p))}${fld(pre + "f", "Жири, г", r1(p.f))}${fld(pre + "c", "Вуглеводи, г", r1(p.c))}</div>
  <p class="hint" id="${pre}chk"></p>`;
function kcalCheck(pre){
  const k = num($("#" + pre + "kcal").value), est = num($("#" + pre + "p").value) * 4 + num($("#" + pre + "f").value) * 9 + num($("#" + pre + "c").value) * 4;
  $("#" + pre + "chk").textContent = `За БЖВ виходить ≈ ${Math.round(est)} ккал` + (k && Math.abs(est - k) > Math.max(25, k * 0.15) ? ". Розходиться з ккал, перевірте цифри." : ".");
}
function readPer(pre){ return {kcal:num($("#" + pre + "kcal").value), p:num($("#" + pre + "p").value), f:num($("#" + pre + "f").value), c:num($("#" + pre + "c").value)}; }

function editEntry(id){
  const e = S.entries.find(x => x.id === id); if (!e) return;
  openModal(`<h3>${esc(e.name)}</h3>
    <div class="grid2"><div class="field"><label for="eName">Назва</label><input id="eName" value="${esc(e.name)}"></div>
      <div class="field"><label for="eMeal">Прийом їжі</label><select id="eMeal">${MEALS.map(([v, l]) => `<option value="${v}" ${v === e.meal ? "selected" : ""}>${l}</option>`).join("")}</select></div></div>
    <div class="grid2">${fld("eVlad", "Влад, г", num(e.g?.vlad), "vlad-l")}${fld("eVika", "Віка, г", num(e.g?.vika), "vika-l")}</div>
    ${per100("e", e.per || {})}
    <label class="btnrow hint"><input type="checkbox" id="eToBase" style="width:auto"> Зберегти ці БЖВ і в базі продуктів</label>
    <div class="btnrow"><button class="primary" id="eSave">Зберегти</button><button class="ghost" data-close>Скасувати</button><span style="flex:1"></span><button class="ghost danger" id="eDel">Видалити</button></div>`);
  kcalCheck("e"); ["ekcal", "ep", "ef", "ec"].forEach(i => $("#" + i).addEventListener("input", () => kcalCheck("e")));
  $("#eDel").addEventListener("click", async ev => {
    if (ev.target.dataset.sure !== "1") { ev.target.dataset.sure = "1"; ev.target.textContent = "Точно видалити?"; return; }
    try { await delEntry(id); closeModal(); toast("Видалено"); } catch (err) { toast("Не вдалося: " + (err.code || "помилка")); }
  });
  $("#eSave").addEventListener("click", async () => {
    const per = readPer("e"), name = $("#eName").value.trim() || e.name;
    const data = {...e, name, meal:$("#eMeal").value, per, g:{vlad:num($("#eVlad").value), vika:num($("#eVika").value)}}; delete data.id;
    try {
      if ($("#eToBase").checked) {
        const pid = (e.productId && products().some(p => p.id === e.productId)) ? e.productId : "c" + newId();
        const cur = products().find(p => p.id === pid);
        await putProduct(pid, {name, ...per, pc:cur?.pc || null, src: pid[0] === "b" ? "edit" : (cur?.src || "own")});
        data.productId = pid;
      }
      await putEntry(id, data); closeModal(); toast("Збережено");
    } catch (err) { toast("Не збереглося: " + (err.code || "помилка")); }
  });
}
function editProduct(id){
  const isNew = !id, p = isNew ? {name:"", kcal:"", p:"", f:"", c:"", pc:""} : products().find(x => x.id === id); if (!p) return;
  openModal(`<h3>${isNew ? "Свій продукт" : esc(p.name)}</h3>
    <div class="grid2"><div class="field"><label for="pName">Назва</label><input id="pName" value="${esc(p.name)}"></div>${fld("pPc", "Вага 1 шт, г (необов'язково)", p.pc || "")}</div>
    ${per100("p", p)}
    ${p.orig ? `<p class="hint">Стандарт: ${p.orig.kcal} ккал · ${p.orig.p}/${p.orig.f}/${p.orig.c}</p>` : ""}
    <div class="btnrow"><button class="primary" id="pSave">Зберегти</button><button class="ghost" data-close>Скасувати</button><span style="flex:1"></span>
      ${p.src === "edit" ? `<button class="ghost" id="pReset">Повернути стандарт</button>` : ""}${!isNew ? `<button class="ghost danger" id="pHide">Прибрати з бази</button>` : ""}</div>
    <p class="hint">Зміни діють на нові записи. Уже з'їдене за минулі дні не перераховується.</p>`);
  kcalCheck("p"); ["pkcal", "pp", "pf", "pc"].forEach(i => $("#" + i).addEventListener("input", () => kcalCheck("p")));
  $("#pSave").addEventListener("click", async () => {
    const name = $("#pName").value.trim(); if (!name) { $("#pName").focus(); return; }
    const pid = id || "c" + newId();
    const src = pid[0] === "b" ? "edit" : (isNew ? "own" : p.src);
    try { await putProduct(pid, {name, ...readPer("p"), pc:num($("#pPc").value) || null, src}); closeModal(); toast("Збережено в базі"); }
    catch (err) { toast("Не збереглося: " + (err.code || "помилка")); }
  });
  $("#pReset")?.addEventListener("click", async () => { try { await delProduct(id); closeModal(); toast("Повернуто стандарт"); } catch { toast("Не вдалося"); } });
  $("#pHide")?.addEventListener("click", async ev => {
    if (ev.target.dataset.sure !== "1") { ev.target.dataset.sure = "1"; ev.target.textContent = "Точно прибрати?"; return; }
    try { await putProduct(id, {name:p.name, kcal:p.kcal, p:p.p, f:p.f, c:p.c, pc:p.pc || null, src:p.src, hidden:true}); if (S.sel?.id === id) S.sel = null; closeModal(); toast("Прибрано з бази"); }
    catch { toast("Не вдалося"); }
  });
}
function editGoals(){
  const G = S.settings.goals;
  openModal(`<h3>Цілі на день</h3>
    ${PEOPLE.map(pp => { const g = G[pp.id] || DEFAULT_SETTINGS.goals[pp.id]; return `<div class="goalbox ${pp.id}"><h4>${pp.name}</h4>
      <div class="grid4">${fld(pp.id + "kcal", "ккал", g.kcal)}${fld(pp.id + "p", "Білки, г", g.p)}${fld(pp.id + "f", "Жири, г", g.f)}${fld(pp.id + "c", "Вуглеводи, г", g.c)}</div>
      <p class="hint" id="${pp.id}chk"></p></div>`; }).join("")}
    ${fld("ratio", "Порція Віки від Владової, % (для кнопки, нотаток і фото)", S.settings.ratio || 70)}
    <div class="btnrow"><button class="primary" id="gSave">Зберегти</button><button class="ghost" data-close>Скасувати</button></div>`);
  PEOPLE.forEach(pp => { kcalCheck(pp.id); ["kcal", "p", "f", "c"].forEach(k => $("#" + pp.id + k).addEventListener("input", () => kcalCheck(pp.id))); });
  $("#gSave").addEventListener("click", async () => {
    const goals = {}; PEOPLE.forEach(pp => goals[pp.id] = readPer(pp.id));
    try { await putSettings({goals, ratio:Math.max(10, Math.min(200, num($("#ratio").value) || 70))}); closeModal(); toast("Цілі збережено"); }
    catch (err) { toast("Не збереглося: " + (err.code || "помилка")); }
  });
}
function editSettings(){
  const code = LS.get("pair"), link = code ? location.origin + location.pathname + "#pair=" + code : "";
  openModal(`<h3>Налаштування</h3>
    <div class="field"><label for="sKey">Ключ Gemini (для нотаток, фото й пошуку через ШІ)</label>
      <input id="sKey" type="password" autocomplete="off" placeholder="${LS.get("gemini") ? "збережено на цьому телефоні" : "вставте ключ"}"></div>
    <p class="hint">Ключ зберігається лише на цьому пристрої й нікуди не публікується. Безкоштовний ключ: aistudio.google.com → Get API key.</p>
    <div class="goalbox vlad"><h4>Спільні дані для двох телефонів</h4>
      ${!FIREBASE_CONFIG ? `<p class="hint">Спільна база ще не підключена. Поки кожен телефон зберігає записи в себе.</p>`
        : code ? `<p class="hint">Це посилання підключає другий телефон до ваших записів. Надішліть його Віці або Владу:</p>
          <div class="btnrow"><input id="sLink" value="${esc(link)}" readonly><button class="ghost" id="sCopy">Копіювати</button></div>`
        : `<p class="hint">Створіть спільний простір на цьому телефоні, потім надішліть посилання на другий.</p><button class="ghost" id="sPair">Створити спільний простір</button>`}
      <p class="hint">Стан: <span class="num">${S.cloud ? "синхронізовано" : "лише цей телефон"}</span></p></div>
    <div class="btnrow"><button class="ghost" id="sExport">Копія даних (JSON)</button></div>
    <div class="btnrow"><button class="primary" id="sSave">Зберегти</button><button class="ghost" data-close>Закрити</button></div>`);
  $("#sSave").addEventListener("click", () => { const k = $("#sKey").value.trim(); if (k) LS.set("gemini", k); closeModal(); toast(k ? "Ключ збережено" : "Збережено"); });
  $("#sPair")?.addEventListener("click", () => { LS.set("pair", rid(24)); closeModal(); connectCloud().then(editSettings); });
  $("#sCopy")?.addEventListener("click", () => { const i = $("#sLink"); navigator.clipboard?.writeText(i.value).then(() => toast("Скопійовано"), () => { i.select(); }); });
  $("#sExport").addEventListener("click", async () => {
    const rows = S.cloud ? await historyRows() : local.entries;
    const blob = new Blob([JSON.stringify({entries:rows, products:S.over, settings:S.settings}, null, 1)], {type:"application/json"});
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "yimo-razom-" + iso(new Date()) + ".json"; a.click();
  });
}
document.addEventListener("click", e => {
  const ed = e.target.closest("[data-edit]"); if (ed) return editEntry(ed.dataset.edit);
  const pr = e.target.closest("[data-prod]"); if (pr && !e.target.closest("#sheet")) return editProduct(pr.dataset.prod);
});
$("#newProduct").addEventListener("click", () => editProduct(null));
$("#goalsBtn").addEventListener("click", editGoals);
$("#settingsBtn").addEventListener("click", editSettings);
$("#baseSearch").addEventListener("input", renderBase);
function shiftDay(n){ const d = new Date(S.date + "T12:00:00"); d.setDate(d.getDate() + n); S.date = iso(d); subscribeDay(); }
$("#prevDay").addEventListener("click", () => shiftDay(-1));
$("#nextDay").addEventListener("click", () => shiftDay(1));

// ---------- boot
(function readUrl(){
  const h = new URLSearchParams(location.hash.slice(1));
  if (h.get("pair") && h.get("pair").length >= 20) { LS.set("pair", h.get("pair")); toast("Телефон підключено до спільних записів"); }
  const q = new URLSearchParams(location.search), shared = [q.get("title"), q.get("text"), q.get("url")].filter(Boolean).join("\n");
  if (shared) { showTab("note"); $("#noteText").value = shared; }
  if (h.get("pair") || shared) history.replaceState(null, "", location.pathname);
})();
renderAll(); refreshLocal(); connectCloud();
if (!LS.get("gemini")) banner("Щоб розбирати нотатки й фото, додайте безкоштовний ключ Gemini в «Налаштуваннях». Ручний облік працює й без нього.");
if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
