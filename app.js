"use strict";
// Їмо разом — облік калорій і БЖВ на двох.
// [name, kcal, protein g, fat g, carbs g, grams per piece|null, fiber g, sugars g, cholesterol mg, sodium mg, magnesium mg] per 100 g; ids are b<index>, append only
const BUILTIN = [
["Гречка суха",343,12.6,3.3,62.1,null,10.0,0.0,0.0,2.0,231.0],
["Гречка варена",110,4.2,1.1,21.3,null,2.7,0.0,0.0,1.0,51.0],
["Рис білий сухий",344,6.7,0.7,78.9,null,0.4,0.1,0.0,5.0,12.0],
["Рис варений",116,2.2,0.5,24.9,null,0.3,0.0,0.0,1.0,12.0],
["Вівсяні пластівці",366,12.3,6.2,61.8,null,10.6,0.9,0.0,2.0,177.0],
["Вівсянка на воді",88,3,1.7,15,null,1.7,0.5,0.0,2.0,29.0],
["Булгур сухий",342,12.3,1.3,57.6,null,8.0,0.4,0.0,6.0,75.0],
["Макарони сухі",350,12,1.5,70,null,3.2,0.6,0.0,6.0,22.0],
["Макарони варені",112,3.5,0.4,23.2,null,1.8,0.3,0.0,1.0,18.0],
["Кіноа суха",368,14.1,6.1,57.2,null,7.0,1.6,0.0,5.0,197.0],
["Пшоно сухе",342,11.5,3.3,66.5,null,8.5,0.7,0.0,3.0,114.0],
["Перлова крупа суха",320,9.3,1.1,66.9,null,8.1,0.8,0.0,9.0,37.0],
["Кукурудзяна крупа",337,8.3,1.2,71,null,7.3,0.6,0.0,7.0,93.0],
["Картопля сира",77,2,0.1,17,null,2.2,0.8,0.0,6.0,23.0],
["Картопля варена",82,2,0.4,16.7,null,1.8,0.8,0.0,5.0,20.0],
["Картопляне пюре",106,2.5,4.2,14.5,null,1.4,0.8,4.0,182.0,19.0],
["Картопля смажена",192,2.8,9.5,23.4,null,3.8,0.5,0.0,10.0,25.0],
["Картопля фрі",312,3.4,15,41,null,3.8,0.3,0.0,210.0,24.0],
["Хліб білий",265,8.1,3.2,49,30,2.7,5.0,0.0,490.0,27.0],
["Хліб житній",210,6.6,1.2,40,30,7.3,1.2,0.0,600.0,39.0],
["Батон",262,7.5,2.9,51,25,2.2,5.5,0.0,500.0,24.0],
["Лаваш",277,9.1,1.1,56,null,2.0,2.0,0.0,550.0,20.0],
["Хлібці цільнозернові",300,11,3,58,10,13.2,1.3,0.0,560.0,96.0],
["Яйце куряче",155,12.6,10.6,1.1,55,0.0,0.4,372.0,142.0,12.0],
["Молоко 2,5%",52,2.8,2.5,4.7,null,0.0,4.7,10.0,40.0,11.0],
["Молоко 3,2%",59,2.9,3.2,4.7,null,0.0,5.0,10.0,40.0,11.0],
["Кефір 2,5%",51,2.9,2.5,4,null,0.0,4.0,8.0,40.0,11.0],
["Сир кисломолочний 0%",71,16.5,0,1.3,null,0.0,1.8,1.0,36.0,10.0],
["Сир кисломолочний 5%",121,17.2,5,1.8,null,0.0,1.8,5.0,37.0,10.0],
["Сир кисломолочний 9%",159,16.7,9,2,null,0.0,1.5,12.0,38.0,10.0],
["Сметана 15%",158,2.6,15,3,null,0.0,3.5,58.0,35.0,11.0],
["Сметана 20%",204,2.5,20,3.4,null,0.0,3.4,75.0,33.0,11.0],
["Йогурт грецький 2%",73,10,2,3.6,null,0.0,4.2,8.0,46.0,12.0],
["Йогурт натуральний 2,5%",60,4.3,2.5,6,null,0.0,4.7,10.0,40.0,11.0],
["Сир твердий (гауда)",356,25,27,2.2,null,0.0,0.5,68.0,621.0,28.0],
["Моцарела",280,22,20,2.2,null,0.0,1.0,17.0,300.0,20.0],
["Бринза / фета",264,14,21,4,null,0.0,1.0,68.0,1200.0,21.0],
["Масло вершкове 82%",748,0.5,82.5,0.8,null,0.0,0.1,218.0,11.0,2.0],
["Вершки 10%",118,3,10,4,null,0.0,3.8,39.0,40.0,11.0],
["Куряче філе сире",110,23.1,1.2,0,null,0.0,0.0,58.0,74.0,29.0],
["Куряче філе варене",137,29.8,1.8,0,null,0.0,0.0,83.0,77.0,30.0],
["Куряча грудка гриль",165,31,3.6,0,null,0.0,0.0,85.0,75.0,31.0],
["Куряче стегно без шкіри",125,19.7,5,0,null,0.0,0.0,82.0,80.0,25.0],
["Курячі гомілки",160,18,9.5,0,null,0.0,0.0,90.0,95.0,23.0],
["Індичка філе",114,23.6,1.5,0,null,0.0,0.0,73.0,56.0,29.0],
["Свинина пісна",143,21,6.3,0,null,0.0,0.0,71.0,57.0,24.0],
["Свинина шия",267,16,22,0,null,0.0,0.0,78.0,59.0,23.0],
["Яловичина пісна",158,22.2,7.1,0,null,0.0,0.0,78.0,61.0,21.0],
["Фарш яловичий",254,17.2,20,0,null,0.0,0.0,80.0,65.0,22.0],
["Фарш свинно-яловичий",263,17,21.5,0,null,0.0,0.0,75.0,60.0,21.0],
["Печінка куряча",136,19.1,6.3,0.6,null,1.0,0.0,356.0,115.0,19.0],
["Ковбаса варена",257,12.8,22.2,1.5,null,0.0,1.0,50.0,950.0,12.0],
["Сосиски",266,11,24,1.6,50,0.0,1.0,70.0,850.0,15.0],
["Шинка",180,18,11,1.5,null,0.0,1.5,55.0,1100.0,20.0],
["Бекон",458,12,45,0,null,0.0,0.5,70.0,1700.0,20.0],
["Котлета смажена",260,15,19,8,80,1.2,0.5,65.0,450.0,22.0],
["Лосось / сьомга",208,20,13,0,null,0.0,0.0,55.0,60.0,27.0],
["Тунець у власному соку",116,26,1,0,null,0.0,0.0,35.0,35.0,37.0],
["Минтай",72,15.9,0.9,0,null,0.0,0.0,48.0,72.0,38.0],
["Хек",86,16.6,2.2,0,null,0.0,0.0,55.0,80.0,30.0],
["Оселедець солоний",217,19.8,15.4,0,null,0.0,0.0,65.0,3600.0,30.0],
["Скумбрія",191,18,13.2,0,null,0.0,0.0,95.0,400.0,30.0],
["Креветки",97,20.1,1.1,0,null,0.0,0.0,150.0,400.0,38.0],
["Тофу",144,17.3,8.7,2.8,null,0.4,0.5,0.0,7.0,30.0],
["Сочевиця суха",352,24.6,1.1,63,null,7.9,2.0,0.0,2.0,36.0],
["Нут сухий",364,19.3,6,61,null,12.2,2.1,0.0,3.0,48.0],
["Квасоля консервована",99,6.7,0.3,17.4,null,6.5,0.3,0.0,230.0,26.0],
["Горошок зелений консервований",55,3.6,0.1,9.8,null,2.9,2.0,0.0,230.0,12.0],
["Кукурудза консервована",82,2.7,1.2,14.6,null,1.5,3.5,0.0,200.0,10.0],
["Огірок",15,0.8,0.1,2.8,120,0.5,1.7,0.0,2.0,13.0],
["Помідор",18,0.9,0.2,3.9,120,1.2,2.6,0.0,5.0,11.0],
["Перець болгарський",26,1.3,0.1,5.3,150,2.1,2.6,0.0,4.0,15.0],
["Капуста білокачанна",27,1.8,0.1,4.7,null,2.5,2.2,0.0,18.0,17.0],
["Квашена капуста",19,1.8,0.1,3,null,3.0,1.7,0.0,650.0,15.0],
["Броколі",34,2.8,0.4,5.2,null,2.6,1.5,0.0,33.0,21.0],
["Морква",35,1.3,0.1,7,80,2.8,3.9,0.0,32.0,15.0],
["Цибуля",41,1.4,0.2,8.2,90,1.7,4.5,0.0,5.0,10.0],
["Буряк варений",48,1.8,0,10.8,null,2.0,6.8,0.0,78.0,43.0],
["Кабачок",24,0.6,0.3,4.6,null,1.7,3.6,0.0,20.0,18.0],
["Баклажан",24,1.2,0.1,4.5,null,2.5,3.2,0.0,5.0,22.0],
["Салат листовий",15,1.4,0.2,2.3,null,1.3,0.5,0.0,10.0,14.0],
["Шпинат",23,2.9,0.4,2,null,2.2,0.5,0.0,79.0,79.0],
["Печериці",27,4.3,1,1,null,1.0,1.9,0.0,5.0,9.0],
["Часник",149,6.4,0.5,30,5,1.2,0.5,0.0,1.0,32.0],
["Авокадо",160,2,14.7,1.8,150,6.7,0.7,0.0,7.0,29.0],
["Банан",96,1.5,0.2,21.8,120,2.6,12.2,0.0,1.0,27.0],
["Яблуко",52,0.3,0.2,12,180,2.4,10.0,0.0,1.0,9.0],
["Апельсин",43,0.9,0.2,8.1,160,2.2,9.4,0.0,0.0,11.0],
["Мандарин",38,0.8,0.2,7.5,70,1.8,9.4,0.0,0.0,11.0],
["Груша",47,0.4,0.3,10.3,170,2.4,9.8,0.0,1.0,9.0],
["Виноград",69,0.6,0.6,15.4,null,0.9,15.5,0.0,2.0,7.0],
["Ківі",61,1.1,0.5,12,75,3.0,9.0,0.0,3.0,30.0],
["Полуниця",32,0.7,0.3,7.7,null,2.0,4.9,0.0,1.0,13.0],
["Чорниця",57,0.7,0.3,12,null,2.4,7.4,0.0,2.0,22.0],
["Ананас",50,0.5,0.1,12,null,1.4,10.0,0.0,2.0,12.0],
["Хурма",67,0.5,0.4,15.3,200,1.6,12.6,0.0,1.0,15.0],
["Гранат",83,1.7,1.2,18.7,null,4.0,13.6,0.0,3.0,12.0],
["Кавун",30,0.6,0.2,7.5,null,0.6,6.0,0.0,2.0,10.0],
["Диня",34,0.8,0.2,8,null,0.4,8.1,0.0,1.0,11.0],
["Волоські горіхи",654,15.2,65.2,7,null,6.7,2.6,0.0,2.0,158.0],
["Мигдаль",579,21.2,49.9,9.5,null,12.2,4.4,0.0,1.0,268.0],
["Арахіс",567,25.8,49.2,9.9,null,8.5,4.7,0.0,18.0,168.0],
["Кеш'ю",553,18.2,43.8,30.2,null,5.2,5.9,0.0,12.0,292.0],
["Насіння соняшнику",578,20.7,52.9,10.5,null,8.6,2.6,0.0,3.0,325.0],
["Арахісова паста",588,25,50,17,null,11.6,6.1,0.0,16.0,190.0],
["Фініки",282,2.5,0.4,69,8,8.0,66.5,0.0,10.0,54.0],
["Курага",241,3.4,0.5,55,null,7.2,38.2,0.0,26.0,32.0],
["Родзинки",299,3.1,0.5,72,null,3.7,59.2,0.0,24.0,32.0],
["Олія соняшникова",899,0,99.9,0,null,0.0,0.0,0.0,0.0,0.0],
["Олія оливкова",898,0,99.8,0,null,0.0,0.0,0.0,0.0,0.0],
["Майонез 67%",627,0.4,67,3.9,null,0.0,1.5,68.0,650.0,4.0],
["Кетчуп",100,1.2,0.1,23,null,0.4,22.0,0.0,600.0,14.0],
["Соєвий соус",53,6,0.1,7,null,0.0,0.1,0.0,5600.0,50.0],
["Мед",329,0.8,0,81.5,null,0.2,82.1,0.0,4.0,1.0],
["Цукор",398,0,0,99.7,null,0.0,99.8,0.0,1.0,0.0],
["Варення",265,0.4,0.2,65,null,0.5,60.0,0.0,15.0,5.0],
["Шоколад чорний 70%",580,8,42,36,null,8.0,24.0,3.0,20.0,133.0],
["Шоколад молочний",545,7.6,31,57,null,6.5,48.0,20.0,120.0,80.0],
["Печиво вівсяне",437,6.5,14.4,71.8,15,3.5,25.0,0.0,350.0,55.0],
["Морозиво пломбір",232,3.2,15,20.8,null,0.0,20.0,105.0,80.0,25.0],
["Згущене молоко",320,7.2,8.5,56,null,0.0,55.0,50.0,120.0,30.0],
["Круасан",406,8.2,21,45.8,60,1.4,18.0,60.0,350.0,12.0],
["Гранола",450,10,18,62,null,5.0,12.0,0.0,250.0,90.0],
["Протеїн сироватковий",380,75,6,8,30,0.0,0.0,45.0,50.0,40.0],
["Кава чорна",2,0.2,0,0.3,null,0.0,0.0,0.0,2.0,5.0],
["Чай без цукру",1,0,0,0.2,null,0.0,0.0,0.0,5.0,2.0],
["Сік апельсиновий",45,0.7,0.2,10.4,null,0.2,8.4,0.0,1.0,11.0],
["Кола",42,0,0,10.6,null,0.0,10.0,0.0,35.0,8.0],
["Пиво світле",43,0.5,0,3.6,null,0.0,0.0,0.0,4.0,14.0],
["Вино червоне сухе",85,0.1,0,2.6,null,0.0,0.5,0.0,4.0,12.0],
["Борщ",49,1.1,2.2,6.7,null,1.8,1.5,0.0,450.0,25.0],
["Вареники з картоплею",148,4.4,2.9,26,null,1.2,2.5,30.0,280.0,18.0],
["Пельмені",248,11.9,12.4,23,null,1.0,1.2,45.0,420.0,16.0],
["Сирники",220,15,9.5,18,60,0.8,2.5,80.0,250.0,22.0],
["Омлет",184,9.6,15.4,1.9,null,0.0,0.5,115.0,180.0,19.0],
["Яєчня",196,13.6,15.3,0.9,null,0.0,0.5,145.0,195.0,22.0],
["Олів'є",198,5.4,16.5,7.8,null,1.8,1.8,55.0,480.0,18.0],
["Піца",266,11,10,33,null,2.0,2.0,25.0,520.0,35.0],
["Бургер",254,13,12,24,220,1.5,2.5,45.0,550.0,28.0],
["Шаурма",220,10,10,22,350,1.2,3.5,35.0,620.0,30.0],
["Суші / роли",150,6,2.5,26,null,0.8,1.5,30.0,450.0,32.0],
["Плов зі свининою",200,6.5,9,23,null,1.5,1.0,32.0,380.0,26.0],
["Салат овочевий з олією",80,1,6,5,null,1.2,2.2,0.0,220.0,24.0]
];

// ---------- config
// Firebase web config is public by design; access is limited by Firestore rules (h/{code}/** for signed-in, code >= 20 chars).
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyB1nVDuIGm6PsHMWXWeyBgR91ysudoruGU",
  authDomain: "eatt-a2e91.firebaseapp.com",
  projectId: "eatt-a2e91",
  storageBucket: "eatt-a2e91.firebasestorage.app",
  messagingSenderId: "995134492839",
  appId: "1:995134492839:web:61a26bd25bfae6aefdcb82"
};
const FB_VER = "10.12.2";
// tried in order; an overloaded or retired model falls through to the next
const MODELS_TEXT = ["gemini-3.5-flash-lite", "gemini-flash-lite-latest", "gemini-3.5-flash", "gemini-flash-latest"];
const MODELS_PHOTO = ["gemini-3.5-flash", "gemini-flash-latest", "gemini-3.5-flash-lite", "gemini-flash-lite-latest"];

const PEOPLE = [{id:"vlad",name:"Влад"},{id:"vika",name:"Віка"}];
const MEALS = [["breakfast","Сніданок"],["lunch","Обід"],["dinner","Вечеря"],["snack","Перекуси/Інше"]];
const MEAL_NAME = Object.fromEntries(MEALS);
const MEAL_ICON = {
  breakfast:`<svg viewBox="0 0 32 32"><path d="M6 22a10 10 0 0 1 20 0z" fill="#F2B233"/><path d="M3 25h26M7 28h18" stroke="#F2B233" stroke-width="2" stroke-linecap="round"/><path d="M16 4v4M6 9l2.5 2.5M26 9l-2.5 2.5M2 17h3M27 17h3" stroke="#F2B233" stroke-width="2" stroke-linecap="round"/></svg>`,
  lunch:`<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="7" fill="#3B9BEF"/><path d="M16 2v4M16 26v4M2 16h4M26 16h4M6 6l3 3M23 23l3 3M26 6l-3 3M9 23l-3 3" stroke="#3B9BEF" stroke-width="2" stroke-linecap="round"/></svg>`,
  dinner:`<svg viewBox="0 0 32 32"><path d="M7 21a9 9 0 0 1 18 0z" fill="#EE8A6A"/><path d="M3 24h26M7 27h18M9 30h14" stroke="#EE8A6A" stroke-width="2" stroke-linecap="round"/><path d="M16 5v4M7 10l2.5 2.5M25 10l-2.5 2.5" stroke="#EE8A6A" stroke-width="2" stroke-linecap="round"/></svg>`,
  snack:`<svg viewBox="0 0 32 32"><path d="M20 4a12 12 0 1 0 8 19A10 10 0 0 1 20 4z" fill="#8B5CF6"/></svg>`
};
const PLUS_SVG = `<svg viewBox="0 0 32 32"><path d="M16 5v22M5 16h22" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>`;
const DEFAULT_SETTINGS = {goals:{vlad:{kcal:2500,p:150,f:80,c:290},vika:{kcal:1800,p:100,f:60,c:210}},ratio:70};
const MAC = [["p","Б","--protS"],["f","Ж","--fat"],["c","В","--carb"]];
const EXTRA = [["fib","Клітковина","г"],["sug","Цукри","г"],["chol","Холестерин","мг"],["na","Натрій","мг"],["magn","Магній","мг"]];
const BASEK = ["kcal","p","f","c"], ALLK = [...BASEK, ...EXTRA.map(x => x[0])];
const DOW = ["П","В","С","Ч","П","С","Н"];

// ---------- helpers
const $ = s => document.querySelector(s);
const num = v => { const n = parseFloat(String(v ?? "").replace(",", ".")); return isFinite(n) ? n : 0; };
const numOrNull = v => { if (v === null || v === undefined || String(v).trim() === "") return null; const n = parseFloat(String(v).replace(",", ".")); return isFinite(n) ? n : null; };
const r1 = n => Math.round(n * 10) / 10;
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const iso = d => { const z = n => String(n).padStart(2, "0"); return d.getFullYear() + "-" + z(d.getMonth() + 1) + "-" + z(d.getDate()); };
const dateOf = s => new Date(s + "T12:00:00");
const addDays = (s, n) => { const d = dateOf(s); d.setDate(d.getDate() + n); return iso(d); };
const monday = s => { const d = dateOf(s); return addDays(s, -((d.getDay() + 6) % 7)); };
const norm = s => String(s || "").toLowerCase().replace(/[ʼ'’`]/g, "").replace(/ё/g, "е").replace(/\s+/g, " ").trim();
const rid = (n = 16) => { const a = crypto.getRandomValues(new Uint8Array(n)); return Array.from(a, b => "abcdefghijkmnpqrstuvwxyz23456789"[b % 32]).join(""); };
const LS = {
  get(k, d = null){ try { const v = localStorage.getItem("yr_" + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v){ try { localStorage.setItem("yr_" + k, JSON.stringify(v)); } catch {} }
};
function toast(msg){ const t = $("#toast"); t.textContent = msg; t.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => t.hidden = true, 2400); }
function defaultMeal(){ const h = new Date().getHours(); return h < 11 ? "breakfast" : h < 16 ? "lunch" : h < 21 ? "dinner" : "snack"; }
function perOf(p){ const o = {}; for (const k of ALLK) { const v = numOrNull(p[k]); if (k === "kcal" || k === "p" || k === "f" || k === "c") o[k] = v ?? 0; else if (v !== null) o[k] = v; } return o; }
function fmt(v, unit){ return unit === "мг" || unit === "ккал" ? Math.round(v) : r1(v); }
function aiErr(e){
  if (e && e.code === "nokey") return "Додайте ключ Gemini у «Налаштуваннях».";
  if (e && e.code === "rate") return "Ліміт Gemini на хвилину вичерпано. Спробуйте трохи пізніше.";
  if (e && e.code === "json") return "ШІ відповів незрозуміло. Спробуйте ще раз.";
  if (e && e.code === "api") return "Gemini: " + (e.message || "помилка").slice(0, 140);
  return "Немає зв'язку з ШІ. Перевірте інтернет і спробуйте ще раз.";
}

// ---------- AI (Gemini; the key lives only on this device)
async function blobToB64(blob){
  const bmp = await createImageBitmap(blob).catch(() => null);
  if (!bmp) return {mime:blob.type || "image/jpeg", data: await new Promise(r => { const fr = new FileReader(); fr.onload = () => r(String(fr.result).split(",")[1]); fr.readAsDataURL(blob); })};
  const s = Math.min(1, 1280 / Math.max(bmp.width, bmp.height)), c = document.createElement("canvas");
  c.width = Math.round(bmp.width * s); c.height = Math.round(bmp.height * s);
  c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
  return {mime:"image/jpeg", data:c.toDataURL("image/jpeg", 0.85).split(",")[1]};
}
async function ai(prompt, images = []){
  const key = LS.get("gemini"); if (!key) throw {code:"nokey"};
  const parts = [{text:prompt}];
  for (const im of images) { const b = await blobToB64(im); parts.push({inline_data:{mime_type:b.mime, data:b.data}}); }
  let d = null, lastErr = {code:"net"};
  for (const model of (images.length ? MODELS_PHOTO : MODELS_TEXT)) {
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
const NUT_JSON = `"kcal":ккал,"p":білки г,"f":жири г,"c":вуглеводи г,"fib":клітковина г,"sug":цукри г,"chol":холестерин мг,"na":натрій мг,"magn":магній мг`;

// ---------- Open Food Facts online (packaged products worldwide)
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
        const n = p.nutriments || {}, g = k => numOrNull(n[k + "_100g"]);
        const kcal = num(n["energy-kcal_100g"]) || num(n["energy_100g"]) / 4.184;
        const brand = Array.isArray(p.brands) ? p.brands[0] : String(p.brands || "").split(",")[0];
        const name = (p.product_name_uk || p.product_name || "").trim();
        const na = g("sodium") ?? (g("salt") !== null ? g("salt") / 2.5 : null);
        return {name: name + (brand ? " (" + brand.trim() + ")" : ""), kcal:r1(kcal), p:r1(num(n.proteins_100g)), f:r1(num(n.fat_100g)), c:r1(num(n.carbohydrates_100g)),
          fib:g("fiber"), sug:g("sugars"), chol:g("cholesterol") !== null ? g("cholesterol") * 1000 : null, na: na !== null ? na * 1000 : null,
          magn:g("magnesium") !== null ? g("magnesium") * 1000 : null, code:p.code};
      }).filter(p => p.name && p.kcal > 0);
      if (out.length || d.product) return out;
    } catch {}
  }
  throw {code:"off"};
}

// ---------- Ukrainian store products (Open Food Facts, ODbL), loaded on first search
const UA = {rows:null, idx:null, loading:null};
function loadUA(){
  if (UA.loading) return UA.loading;
  UA.loading = fetch("ua.json").then(r => r.json()).then(rows => {
    UA.rows = rows; UA.idx = rows.map(r => norm(r[0] + " " + r[1])); if (!$("#adder").hidden) renderResults();
  }).catch(() => { UA.loading = null; });
  return UA.loading;
}
const uaItem = i => { const r = UA.rows[i]; return {ua:i, name:r[0] + (r[1] ? " (" + r[1] + ")" : ""), kcal:r[2], p:r[3], f:r[4], c:r[5], code:r[6],
  fib:r[7] ?? null, sug:r[8] ?? null, chol:r[9] ?? null, na:r[10] ?? null, magn:r[11] ?? null}; };
function searchUA(q, limit){
  if (!UA.rows) return [];
  const n = norm(q); if (n.length < 2) return [];
  if (/^\d{8,14}$/.test(n)) { const i = UA.rows.findIndex(r => r[6] === n); return i >= 0 ? [uaItem(i)] : []; }
  const words = n.split(" "), hits = [];
  for (let i = 0; i < UA.idx.length && hits.length < 300; i++) if (words.every(w => UA.idx[i].includes(w))) hits.push(i);
  hits.sort((a, b) => (UA.idx[b].startsWith(n) - UA.idx[a].startsWith(n)) || a - b);
  return hits.slice(0, limit).map(uaItem);
}

// ---------- state
const S = { date: iso(new Date()), weekEntries: [], entries: [], over: {}, settings: structuredClone(DEFAULT_SETTINGS),
  sel: null, pending: [], photos: [], cloud: null, view: "diary", offList: null, added: [] };
const local = { entries: LS.get("entries", []), over: LS.get("over", {}), settings: LS.get("settings", null) };
if (local.settings) S.settings = {...structuredClone(DEFAULT_SETTINGS), ...local.settings};
S.over = local.over;

function products(){
  const out = [];
  BUILTIN.forEach((b, i) => {
    const id = "b" + i, base = {id, name:b[0], kcal:b[1], p:b[2], f:b[3], c:b[4], pc:b[5] || null, fib:b[6], sug:b[7], chol:b[8], na:b[9], magn:b[10], src:"base"};
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
  const t = {miss:{}}; ALLK.forEach(k => t[k] = 0);
  for (const e of list) { const g = num(e.g && e.g[person]); if (!g) continue;
    for (const k of ALLK) { const v = e.per ? numOrNull(e.per[k]) : null; if (v === null) { if (!BASEK.includes(k)) t.miss[k] = (t.miss[k] || 0) + 1; } else t[k] += v * g / 100; } }
  return t;
}

// ---------- persistence: cloud (Firestore) when paired, otherwise this device
const saveLocal = () => { LS.set("entries", local.entries); LS.set("over", local.over); };
function refreshLocal(){ const a = monday(S.date), b = addDays(a, 6); S.weekEntries = local.entries.filter(e => e.date >= a && e.date <= b); dayFromWeek(); }
function dayFromWeek(){ S.entries = S.weekEntries.filter(e => e.date === S.date); renderDiary(); }
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
  local.over[id] = data; S.over = local.over; saveLocal(); renderBase();
}
async function delProduct(id){
  if (S.cloud) return S.cloud.del("products", id);
  delete local.over[id]; S.over = local.over; saveLocal(); renderBase();
}
async function putSettings(data){
  LS.set("settings", data);
  if (S.cloud) return S.cloud.set("meta", "settings", data);
  S.settings = {...structuredClone(DEFAULT_SETTINGS), ...data}; renderDiary();
}
const newId = () => rid(16);
async function historyRows(){
  if (S.cloud) { try { return await S.cloud.recent(300); } catch {} }
  return [...local.entries].sort((a, b) => num(b.t) - num(a.t)).slice(0, 300);
}
let watchedWeek = null;
function subscribeWeek(force){
  const a = monday(S.date);
  if (!S.cloud) { watchedWeek = a; return refreshLocal(); }
  if (a === watchedWeek && !force) return dayFromWeek();
  watchedWeek = a; S.weekEntries = []; S.entries = []; renderDiary(true);
  S.cloud.watchRange(a, addDays(a, 6), rows => { S.weekEntries = rows; dayFromWeek(); });
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
    let unsub = null;
    S.cloud = {
      set: (c, id, data) => fs.setDoc(fs.doc(col(c), id), JSON.parse(JSON.stringify(data))),
      del: (c, id) => fs.deleteDoc(fs.doc(col(c), id)),
      recent: async n => (await fs.getDocs(fs.query(col("entries"), fs.orderBy("t", "desc"), fs.limit(n)))).docs.map(d => d.data()),
      watchRange(a, b, cb){ if (unsub) unsub(); unsub = fs.onSnapshot(fs.query(col("entries"), fs.where("date", ">=", a), fs.where("date", "<=", b)),
        s => cb(s.docs.map(d => ({id:d.id, ...d.data()}))), e => banner("Синхронізація: " + e.code)); }
    };
    fs.onSnapshot(col("products"), s => { const o = {}; s.docs.forEach(d => o[d.id] = d.data()); S.over = o; renderBase(); });
    fs.onSnapshot(fs.doc(col("meta"), "settings"), s => { if (s.exists()) { S.settings = {...structuredClone(DEFAULT_SETTINGS), ...s.data()}; renderDiary(); if (S.view === "goals") renderGoals(); } });
    if (local.entries.length || Object.keys(local.over).length) {
      for (const e of local.entries) { const {id, ...d} = e; await S.cloud.set("entries", id, d); }
      for (const [id, d] of Object.entries(local.over)) await S.cloud.set("products", id, d);
      if (local.settings) await S.cloud.set("meta", "settings", local.settings);
      LS.set("backup_before_sync", {entries:local.entries, over:local.over});
      local.entries = []; local.over = {}; saveLocal();
    }
    banner(""); subscribeWeek(true);
  } catch (e) {
    S.cloud = null; banner("Не вдалося підключити спільну базу (" + (e.code || e.message || "помилка") + "). Поки записи зберігаються на цьому телефоні.");
  }
  updateSyncLabel();
}
function updateSyncLabel(){ const el = $("#syncState"); el.textContent = S.cloud ? "спільно" : "лише цей телефон"; el.className = "syncstate " + (S.cloud ? "on" : ""); }

// ---------- diary rendering
function ringSvg(pct, color, stroke){
  const r = 50 - stroke / 2 - 1, C = 2 * Math.PI * r;
  const main = Math.min(pct, 1), over = Math.max(0, Math.min(pct - 1, 1));
  return `<svg viewBox="0 0 100 100" aria-hidden="true"><g transform="rotate(-90 50 50)">
    <circle cx="50" cy="50" r="${r}" fill="none" stroke="var(--line)" stroke-width="${stroke}"/>
    <circle class="arc" cx="50" cy="50" r="${r}" fill="none" stroke="var(${color})" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${main * C} ${C}"/>
    ${over > 0 ? `<circle class="arc" cx="50" cy="50" r="${r}" fill="none" stroke="var(--over)" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${over * C} ${C}"/>` : ""}
  </g></svg>`;
}
function renderWeek(){
  const a = monday(S.date), today = iso(new Date()), has = new Set(S.weekEntries.map(e => e.date));
  $("#week").innerHTML = `<button class="arr" data-week="-7" aria-label="Попередній тиждень">‹</button>`
    + DOW.map((l, i) => { const d = addDays(a, i);
      return `<button class="day ${d === S.date ? "sel" : ""} ${has.has(d) ? "has" : ""} ${d === today ? "today" : ""}" data-day="${d}" aria-label="${dateOf(d).toLocaleDateString("uk-UA", {weekday:"long", day:"numeric", month:"long"})}">
        <span class="dot num">${has.has(d) && d !== S.date ? "✓" : dateOf(d).getDate()}</span><span class="lbl">${l}</span></button>`; }).join("")
    + `<button class="arr" data-week="7" aria-label="Наступний тиждень">›</button>`;
  const y = addDays(today, -1), label = dateOf(S.date).toLocaleDateString("uk-UA", {day:"numeric", month:"long"});
  $("#dayTitle").textContent = S.date === today ? "Сьогодні, " + label : S.date === y ? "Вчора, " + label : dateOf(S.date).toLocaleDateString("uk-UA", {weekday:"long", day:"numeric", month:"long"});
  $("#todayBtn").hidden = S.date === today;
}
function renderPeople(){
  $("#people").innerHTML = PEOPLE.map(pp => {
    const t = totals(pp.id), g = S.settings.goals[pp.id] || DEFAULT_SETTINGS.goals[pp.id];
    const pct = g.kcal ? t.kcal / g.kcal : 0, left = Math.round(g.kcal - t.kcal);
    return `<article class="person ${pp.id}"><h3>${pp.name}</h3>
      <div class="ring">${ringSvg(pct, "--" + pp.id, 9)}
        <div class="center"><div class="big num">${Math.round(t.kcal)}</div><div class="of num">з ${g.kcal} ккал</div>
        <div class="left num ${left < 0 ? "over" : ""}">${left >= 0 ? "залишилось " + left : "+" + (-left) + " понад"}</div></div></div>
      <div class="macros">${MAC.map(([k, L, col]) => {
        const gv = num(g[k]), v = t[k], pc = gv ? v / gv : 0;
        return `<div class="mac" title="${L}: ${r1(v)} з ${gv} г"><div class="mring">${ringSvg(pc, col, 12)}<b style="color:var(${col})">${L}</b></div>
          <div class="mv num"><strong>${Math.round(v)}</strong>/${gv} г</div></div>`;
      }).join("")}</div></article>`;
  }).join("");
}
function renderSummary(){
  const T = Object.fromEntries(PEOPLE.map(pp => [pp.id, totals(pp.id)]));
  const cell = (pid, k, unit) => { const t = T[pid]; const v = fmt(t[k], unit); return `${v}${t.miss[k] ? "*" : ""}`; };
  const row = (label, k, unit, sub) => `<tr class="${sub ? "sub" : ""}"><td>${label}, ${unit}</td><td class="num">${cell("vlad", k, unit)}</td><td class="num">${cell("vika", k, unit)}</td></tr>`;
  const anyMiss = PEOPLE.some(pp => Object.keys(T[pp.id].miss).length);
  const split = pid => { const t = T[pid], e = t.p * 4 + t.f * 9 + t.c * 4;
    if (!e) return `<div class="split"></div><span class="num">—</span>`;
    const P = t.p * 4 / e * 100, F = t.f * 9 / e * 100, C = 100 - P - F;
    return `<div class="split"><i style="width:${C}%;background:var(--carb)"></i><i style="width:${F}%;background:var(--fat)"></i><i style="width:${P}%;background:var(--protS)"></i></div><span class="num">${Math.round(C)}/${Math.round(F)}/${Math.round(P)}%</span>`; };
  $("#summary").innerHTML = `<div class="sechead"><h2>Підсумок дня</h2></div>
    <div style="overflow-x:auto"><table class="ntable"><thead><tr><th></th><th class="vl">Влад</th><th class="vk">Віка</th></tr></thead><tbody>
      ${row("Калорії", "kcal", "ккал")}${row("Жири", "f", "г")}${row("Вуглеводи", "c", "г")}${row("Клітковина", "fib", "г", 1)}${row("Цукри", "sug", "г", 1)}
      ${row("Білки", "p", "г")}${row("Холестерин", "chol", "мг")}${row("Натрій", "na", "мг")}${row("Магній", "magn", "мг")}
    </tbody></table></div>
    <div class="splitrow"><span class="vlad-l" style="font-weight:700">Влад</span>${split("vlad")}</div>
    <div class="splitrow"><span class="vika-l" style="font-weight:700">Віка</span>${split("vika")}</div>
    <div class="legend"><span style="--c:var(--carb)">Вугл.</span><span style="--c:var(--fat)">Жири</span><span style="--c:var(--protS)">Білки</span><span>частка калорій</span></div>
    ${anyMiss ? `<p class="hint">* частина продуктів без цього показника, тож сума може бути неповною. Додати можна, натиснувши продукт.</p>` : ""}`;
}
function renderMeals(loading){
  const sorted = [...S.entries].sort((a, b) => num(a.t) - num(b.t));
  $("#meals").innerHTML = MEALS.map(([m, label]) => {
    const list = sorted.filter(e => (e.meal || "snack") === m);
    const tv = totals("vlad", list).kcal, tk = totals("vika", list).kcal;
    return `<section class="meal"><div class="mealhead">${MEAL_ICON[m]}<div><h3>${label}</h3>
        ${list.length ? `<div class="mk num"><span class="vl">Влад ${Math.round(tv)}</span><span class="vk">Віка ${Math.round(tk)} ккал</span></div>` : loading ? `<div class="mk">завантажую…</div>` : ""}</div>
        <button class="plus" data-add="${m}" aria-label="Додати в ${label}">${PLUS_SVG}</button></div>
      ${list.length ? `<div class="mitems">${list.map(e => `<button class="item" data-edit="${esc(e.id)}"><span class="iname">${esc(e.name)}</span><span class="ipp">
        ${PEOPLE.map(pp => { const g = num(e.g && e.g[pp.id]); const k = num(e.per && e.per.kcal) * g / 100;
          return `<span class="pill ${pp.id} num ${g ? "" : "off"}">${pp.name} ${g ? Math.round(g) + " г · " + Math.round(k) + " ккал" : "—"}</span>`; }).join("")}
      </span></button>`).join("")}</div>` : ""}</section>`;
  }).join("");
}
function renderDiary(loading){ renderWeek(); renderPeople(); renderSummary(); renderMeals(loading); }

// ---------- views (bottom tabs)
function showView(v){
  S.view = v;
  document.querySelectorAll(".tabbar button").forEach(b => b.dataset.view === v ? b.setAttribute("aria-current", "page") : b.removeAttribute("aria-current"));
  for (const x of ["diary", "base", "goals", "settings"]) $("#view-" + x).hidden = x !== v;
  if (v === "base") renderBase(); if (v === "goals") renderGoals(); if (v === "settings") renderSettings();
  window.scrollTo(0, 0);
}
document.querySelectorAll(".tabbar button").forEach(b => b.addEventListener("click", () => showView(b.dataset.view)));

function badge(p){ return p.src === "edit" ? `<span class="badge edit">змінено</span>` : p.src === "claude" || p.src === "ai" ? `<span class="badge claude">від ШІ</span>` : p.src === "off" ? `<span class="badge off">магазин</span>` : p.src === "own" ? `<span class="badge own">свій</span>` : ""; }
function renderBase(){
  if (S.view !== "base") return;
  const q = $("#baseSearch").value, all = products();
  const list = q.trim() ? search(q, 80) : [...all.filter(p => p.src !== "base"), ...all.filter(p => p.src === "base")].slice(0, 30);
  $("#baseList").innerHTML = list.length ? list.map(p => `<button class="res" data-prod="${esc(p.id)}"><span class="rn">${esc(p.name)}${badge(p)}</span>
    <small class="num">${Math.round(p.kcal)} ккал · ${r1(p.p)}/${r1(p.f)}/${r1(p.c)}</small></button>`).join("")
    + (q.trim() ? "" : `<p class="hint" style="padding-top:8px">Показано ${list.length} з ${all.length} ваших і базових продуктів. Магазинні шукайте через «+» у щоденнику.</p>`)
    : `<div class="empty">Нічого не знайдено. Додайте свій продукт.</div>`;
}
$("#baseSearch").addEventListener("input", renderBase);
$("#newProduct").addEventListener("click", () => editProduct(null));

// ---------- add sheet
const mealSel = $("#meal");
mealSel.innerHTML = MEALS.map(([v, l]) => `<option value="${v}">${l}</option>`).join("");
function openAdder(meal, tab = "search"){
  mealSel.value = meal || defaultMeal(); S.sel = null; S.offList = null; S.added = [];
  $("#q").value = ""; $("#addedHere").textContent = ""; renderSel(); renderResults();
  $("#adder").hidden = false; document.body.style.overflow = "hidden"; showTab(tab); loadUA();
  if (tab === "search") setTimeout(() => $("#q").focus(), 50);
}
function closeAdder(){ $("#adder").hidden = true; document.body.style.overflow = ""; }
$("#adder").addEventListener("click", e => { if (e.target.id === "adder" || e.target.closest("[data-close-adder]")) closeAdder(); });
function showTab(name){
  document.querySelectorAll("#adder .tabs button").forEach(x => x.setAttribute("aria-selected", x.dataset.tab === name));
  for (const t of ["search", "note", "photo"]) { const el = $("#tab-" + t); el.hidden = t !== name; el.style.display = t === name ? "flex" : ""; }
}
document.querySelectorAll("#adder .tabs button").forEach(b => b.addEventListener("click", () => showTab(b.dataset.tab)));

function recentProducts(){
  const seen = new Set(), out = [];
  for (const e of [...S.weekEntries].sort((a, b) => num(b.t) - num(a.t))) {
    const k = norm(e.name); if (seen.has(k)) continue; seen.add(k);
    out.push(products().find(p => p.id === e.productId) || {id:null, name:e.name, ...e.per});
    if (out.length >= 12) break;
  }
  return out;
}
function resBtn(attr, p, extra = ""){ return `<button class="res" ${attr}><span class="rn">${esc(p.name)}${extra}</span><small class="num">${Math.round(p.kcal)} ккал</small></button>`; }
function renderResults(){
  const box = $("#results"); if (S.sel) { box.innerHTML = ""; return; }
  const q = $("#q").value.trim();
  if (!q) {
    const rec = recentProducts();
    box.innerHTML = rec.length ? `<div class="grp">Нещодавні</div>` + rec.map((p, i) => resBtn(`data-recent="${i}"`, p)).join("")
      : `<div class="empty">Почніть вводити назву. Шукаємо у вашій базі, серед магазинних продуктів України, а якщо немає — запитаємо ШІ.</div>`;
    S.recent = rec; return;
  }
  const own = search(q, 6), ua = searchUA(q, 12);
  box.innerHTML = (own.length ? `<div class="grp">Ваша база</div>` + own.map(p => resBtn(`data-pick="${esc(p.id)}"`, p, badge(p))).join("") : "")
    + (ua.length ? `<div class="grp">Магазини України</div>` + ua.map(p => resBtn(`data-ua="${p.ua}"`, p)).join("") : !UA.rows && norm(q).length >= 2 ? `<div class="grp">Завантажую базу магазинів…</div>` : "")
    + (S.offList ? `<div class="grp">Open Food Facts онлайн</div>` + (S.offList.length ? S.offList.map((p, i) => resBtn(`data-offi="${i}"`, p)).join("") : `<div class="empty">Онлайн нічого не знайшлось.</div>`) : "")
    + (norm(q).length >= 2 ? `<div class="grp">Не знайшли?</div>
      ${S.offList ? "" : `<button class="res ask" data-off="1"><span>Шукати «${esc(q)}» онлайн</span><small>світова база</small></button>`}
      <button class="res ask" data-ask="1"><span>Запитати ШІ про «${esc(q)}»</span><small>БЖВ на 100 г</small></button>` : "");
}
$("#q").addEventListener("input", () => { S.sel = null; S.offList = null; renderSel(); renderResults(); });
$("#results").addEventListener("click", async e => {
  const b = e.target.closest("button"); if (!b) return;
  const q = $("#q").value.trim();
  if (b.dataset.pick) pick(products().find(p => p.id === b.dataset.pick));
  else if (b.dataset.recent) { const p = S.recent[+b.dataset.recent]; p.id ? pick(p) : pick(await saveNewProduct({...perOf(p), name:p.name, pc:null, src:"own"})); }
  else if (b.dataset.ua) pick(await saveNewProduct({...perOf(uaItem(+b.dataset.ua)), name:uaItem(+b.dataset.ua).name.slice(0, 90), pc:null, src:"off", code:uaItem(+b.dataset.ua).code || null}));
  else if (b.dataset.offi) { const o = S.offList[+b.dataset.offi]; pick(await saveNewProduct({...perOf(o), name:o.name.slice(0, 90), pc:null, src:"off", code:o.code || null})); }
  else if (b.dataset.off) { b.innerHTML = `<span class="thinking">Шукаю онлайн…</span>`; try { S.offList = await offSearch(q); } catch { S.offList = []; } renderResults(); }
  else if (b.dataset.ask) askProduct(q, b);
});
async function saveNewProduct(data){
  const exists = byName(data.name); if (exists) return exists;
  const id = "c" + newId(); await putProduct(id, data); return {id, ...data};
}
async function askProduct(name, btn){
  btn.innerHTML = `<span class="thinking">ШІ шукає «${esc(name)}»…</span>`;
  try {
    const r = await ai(`Дай типову харчову цінність на 100 г для продукту або страви: «${name}». Мається на увазі стан, у якому це зазвичай їдять в Україні (якщо назва не каже «сухий» чи «сирий»). Якщо це бренд чи упаковка, дай дані саме цього продукту або найближчий середній аналог.
Відповідай лише JSON: {"name":"коротка українська назва",${NUT_JSON},"pc":вага 1 штуки в грамах або null}`);
    if (!r || !num(r.kcal)) throw {code:"json"};
    pick(await saveNewProduct({...perOf(r), name:String(r.name || name).slice(0, 80), pc:num(r.pc) || null, src:"ai"}));
  } catch (e) { btn.innerHTML = `<span class="danger">${esc(aiErr(e))}</span>`; }
}
function pick(p){ if (!p) return; S.sel = p; renderSel(); renderResults(); setTimeout(() => $("#gVlad")?.focus(), 30); }
function renderSel(){
  const card = $("#selCard"), p = S.sel;
  if (!p) { card.hidden = true; card.innerHTML = ""; return; }
  card.hidden = false;
  card.innerHTML = `<div><div class="t">${esc(p.name)}</div><div class="v num">${Math.round(p.kcal)} ккал · Б ${r1(p.p)} · Ж ${r1(p.f)} · В ${r1(p.c)} на 100 г${p.pc ? ` · 1 шт ≈ ${p.pc} г` : ""}</div></div>
    <div class="grid2"><div class="field"><label for="gVlad" class="vlad-l">Влад, г</label><input id="gVlad" inputmode="decimal" placeholder="0" class="num"></div>
      <div class="field"><label for="gVika" class="vika-l">Віка, г <button id="ratioBtn" class="mini" type="button">${S.settings.ratio || 70}%</button></label><input id="gVika" inputmode="decimal" placeholder="0" class="num"></div></div>
    ${p.pc ? `<div class="chips"><button class="mini vlad-l" type="button" data-pc="gVlad">Влад +1 шт</button><button class="mini vika-l" type="button" data-pc="gVika">Віка +1 шт</button></div>` : ""}
    <div id="addCalc" class="calc"></div>
    <div class="btnrow"><button id="addBtn" class="primary" disabled>Додати</button><button class="ghost" id="selCancel">Інший продукт</button>${p.id ? `<button class="ghost" type="button" data-prod="${esc(p.id)}">Поправити БЖВ</button>` : ""}</div>`;
  calc();
}
function calc(){
  const p = S.sel; if (!p) return;
  const gv = num($("#gVlad").value), gk = num($("#gVika").value);
  $("#addBtn").disabled = !(gv > 0 || gk > 0);
  $("#addCalc").innerHTML = [["Влад", gv, "vlad"], ["Віка", gk, "vika"]].filter(x => x[1] > 0)
    .map(([n, g, id]) => `<span class="num" style="color:var(--${id})">${n}: ${Math.round(p.kcal * g / 100)} ккал · Б ${r1(p.p * g / 100)} Ж ${r1(p.f * g / 100)} В ${r1(p.c * g / 100)}</span>`).join("");
}
$("#selCard").addEventListener("input", calc);
$("#selCard").addEventListener("click", async e => {
  const t = e.target;
  if (t.id === "ratioBtn") { const v = num($("#gVlad").value); if (v) { $("#gVika").value = Math.round(v * (S.settings.ratio || 70) / 100); calc(); } }
  else if (t.dataset.pc) { const inp = $("#" + t.dataset.pc); inp.value = Math.round(num(inp.value) + S.sel.pc); calc(); }
  else if (t.id === "selCancel") { S.sel = null; renderSel(); renderResults(); $("#q").focus(); }
  else if (t.id === "addBtn") {
    const p = S.sel; t.disabled = true;
    const data = {date:S.date, meal:mealSel.value, name:p.name, productId:p.id || null, per:perOf(p), g:{vlad:num($("#gVlad").value), vika:num($("#gVika").value)}, t:Date.now()};
    try { await putEntry(newId(), data); S.added.push(p.name); toast("Додано: " + p.name);
      $("#addedHere").textContent = "Додано в " + MEAL_NAME[mealSel.value] + ": " + S.added.join(", ");
      S.sel = null; $("#q").value = ""; renderSel(); renderResults(); $("#q").focus(); }
    catch (err) { toast("Не збереглося: " + (err.code || "помилка")); calc(); }
  }
});

// ---------- usual portions (for note & photo)
async function usualPortions(){
  const rows = await historyRows(), m = {};
  for (const e of rows) { const k = norm(e.name); (m[k] ||= {name:e.name, n:0, vlad:0, vika:0}); m[k].n++; m[k].vlad += num(e.g?.vlad); m[k].vika += num(e.g?.vika); }
  return Object.values(m).sort((a, b) => b.n - a.n).slice(0, 40)
    .map(x => `${x.name}: Влад ~${Math.round(x.vlad / x.n)} г, Віка ~${Math.round(x.vika / x.n)} г`).join("\n");
}
const ITEM_FORMAT = () => `Відповідай лише JSON-масивом об'єктів:
[{"name":"назва","match":"точна назва з бази або null","meal":"breakfast|lunch|dinner|snack","vlad_g":число,"vika_g":число,${NUT_JSON}}]
Усі поживні значення — на 100 г у тому стані, як з'їли (варене, смажене тощо). Якщо продукт є в базі, вкажи його точну назву в "match".
Якщо прийом їжі не випливає з тексту чи фото, став "${mealSel.value}".`;
const baseNames = () => products().map(p => p.name).join("; ");
const parseItems = r => Array.isArray(r) ? r : (r && Array.isArray(r.items) ? r.items : []);

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

Звичні порції з історії:
${usual || "(історії ще немає)"}

База продуктів: ${baseNames()}

Нотатка:
"""${text.slice(0, 6000)}"""

${ITEM_FORMAT()}`);
    showPreview(parseItems(r)); st.textContent = "";
  } catch (e) { st.textContent = aiErr(e); }
  btn.disabled = false;
});

// ---------- photos: several, each can be cropped
function renderPhotos(){
  $("#photos").innerHTML = S.photos.map((ph, i) => `<div class="ph"><img src="${ph.url}" alt="Фото ${i + 1}"><div class="pa">
      <button type="button" data-crop="${i}">Обрізати</button><button type="button" data-delph="${i}" aria-label="Прибрати фото">×</button></div></div>`).join("")
    + (S.photos.length < 6 ? `<button type="button" class="addph" id="addPhoto">+ Фото<br><small>${S.photos.length ? "ще одне" : "камера або галерея"}</small></button>` : "");
  $("#photoBtn").disabled = !S.photos.length;
}
$("#photos").addEventListener("click", e => {
  const t = e.target.closest("button"); if (!t) return;
  if (t.id === "addPhoto") $("#photoFile").click();
  else if (t.dataset.delph) { const [ph] = S.photos.splice(+t.dataset.delph, 1); URL.revokeObjectURL(ph.url); renderPhotos(); }
  else if (t.dataset.crop) cropPhoto(+t.dataset.crop);
});
$("#photoFile").addEventListener("change", e => {
  for (const f of [...e.target.files].slice(0, 6 - S.photos.length)) S.photos.push({blob:f, url:URL.createObjectURL(f)});
  e.target.value = ""; renderPhotos();
});
function cropPhoto(i){
  if (!window.Cropper) { toast("Обрізка не завантажилась. Перевірте інтернет."); return; }
  const ph = S.photos[i];
  openModal(`<h3>Обрізати фото</h3><div class="cropbox"><img id="cropImg" src="${ph.url}" alt="Фото для обрізки"></div>
    <div class="btnrow"><button class="primary" id="cropDone">Готово</button><button class="ghost" id="cropRot">Повернути</button><button class="ghost" data-close>Скасувати</button></div>`);
  const cr = new Cropper($("#cropImg"), {viewMode:1, autoCropArea:0.9, background:false, responsive:true});
  S.cropper = cr;
  $("#cropRot").addEventListener("click", () => cr.rotate(90));
  $("#cropDone").addEventListener("click", () => {
    cr.getCroppedCanvas({maxWidth:1600, maxHeight:1600}).toBlob(b => {
      if (!b) { toast("Не вдалося обрізати"); return; }
      URL.revokeObjectURL(ph.url); S.photos[i] = {blob:b, url:URL.createObjectURL(b)}; closeModal(); renderPhotos();
    }, "image/jpeg", 0.9);
  });
}
$("#photoBtn").addEventListener("click", async () => {
  if (!S.photos.length) return;
  const who = $("#photoWho").value, st = $("#photoStatus"), btn = $("#photoBtn");
  st.textContent = "ШІ розглядає фото…"; btn.disabled = true;
  const whoText = who === "both" ? `Це їжа для обох. Розділи кожну позицію: Віці ${S.settings.ratio || 70}% від Владової порції (сума = те, що на фото).`
    : who === "vlad" ? "Це порція лише Влада (vika_g = 0)." : "Це порція лише Віки (vlad_g = 0).";
  try {
    const usual = await usualPortions(), about = $("#photoNote").value.trim().slice(0, 1500);
    const r = await ai(`На ${S.photos.length > 1 ? S.photos.length + " фото та сама їжа з різних ракурсів або різні тарілки одного прийому їжі; не рахуй одну й ту саму страву двічі" : "фото їжа"}. Визнач кожну страву чи продукт і оціни вагу в грамах за розміром посуду, видимим об'ємом і середніми порціями. ${whoText}
${about ? `Пояснення від нас до фото (довіряй йому більше, ніж своїй здогадці: назви, склад, вага, хто скільки з'їв):\n"""${about}"""\n` : ""}Звичні порції цієї пари з історії (використовуй, щоб уточнити оцінку):
${usual || "(історії ще немає)"}
База продуктів: ${baseNames()}

${ITEM_FORMAT()}`, S.photos.map(p => p.blob));
    showPreview(parseItems(r)); st.textContent = "";
  } catch (e) { st.textContent = aiErr(e); }
  btn.disabled = false;
});

// ---------- preview (note & photo results)
function showPreview(items){
  S.pending = items.filter(x => x && x.name).map(x => {
    const m = (x.match && byName(x.match)) || byName(x.name), src = m || x;
    return { name: m ? m.name : String(x.name).slice(0, 80), productId: m ? m.id : null,
      meal: MEAL_NAME[x.meal] ? x.meal : mealSel.value, vlad: Math.round(num(x.vlad_g)), vika: Math.round(num(x.vika_g)), ...perOf(src) };
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
        const per = perOf(it);
        let pid = it.productId;
        if (!pid) pid = (await saveNewProduct({...per, name:it.name, pc:null, src:"ai"})).id;
        await putEntry(newId(), {date:S.date, meal:it.meal, name:it.name, productId:pid, per, g:{vlad:it.vlad, vika:it.vika}, t:t0 + i++});
      }
      toast("Додано позицій: " + i); S.pending = []; renderPreview();
      $("#noteText").value = ""; $("#photoNote").value = ""; S.photos.forEach(p => URL.revokeObjectURL(p.url)); S.photos = []; renderPhotos();
      closeAdder();
    } catch (err) { toast("Не все збереглося: " + (err.code || "помилка")); e.target.disabled = false; }
  }
});

// ---------- modals
function openModal(html){ $("#sheet").innerHTML = html; $("#modal").hidden = false; }
function closeModal(){ if (S.cropper) { S.cropper.destroy(); S.cropper = null; } $("#modal").hidden = true; $("#sheet").innerHTML = ""; }
$("#modal").addEventListener("click", e => { if (e.target.id === "modal" || e.target.closest("[data-close]")) closeModal(); });
document.addEventListener("keydown", e => { if (e.key !== "Escape") return; if (!$("#modal").hidden) closeModal(); else if (!$("#adder").hidden) closeAdder(); });
const fld = (id, label, v, cls = "") => `<div class="field"><label for="${id}" class="${cls}">${label}</label><input id="${id}" value="${esc(v ?? "")}" inputmode="decimal" class="num"></div>`;
const per100 = (pre, p) => `<div class="grid4">${fld(pre + "kcal", "ккал / 100 г", r1(num(p.kcal)))}${fld(pre + "p", "Білки, г", r1(num(p.p)))}${fld(pre + "f", "Жири, г", r1(num(p.f)))}${fld(pre + "c", "Вуглеводи, г", r1(num(p.c)))}</div>
  <p class="hint" id="${pre}chk"></p>
  <details class="more"><summary class="toggle">Ще показники на 100 г</summary><div class="grid5" style="margin-top:8px">
    ${EXTRA.map(([k, l, u]) => fld(pre + k, `${l}, ${u}`, numOrNull(p[k]) === null ? "" : fmt(p[k], u))).join("")}</div></details>`;
function kcalCheck(pre){
  const k = num($("#" + pre + "kcal").value), est = num($("#" + pre + "p").value) * 4 + num($("#" + pre + "f").value) * 9 + num($("#" + pre + "c").value) * 4;
  $("#" + pre + "chk").textContent = `За БЖВ виходить ≈ ${Math.round(est)} ккал` + (k && Math.abs(est - k) > Math.max(25, k * 0.15) ? ". Розходиться з ккал, перевірте цифри." : ".");
}
function readPer(pre){ const o = {}; for (const k of ALLK) { const el = $("#" + pre + k); if (!el) continue; const v = numOrNull(el.value); if (BASEK.includes(k)) o[k] = v ?? 0; else if (v !== null) o[k] = v; } return o; }

function editEntry(id){
  const e = S.entries.find(x => x.id === id); if (!e) return;
  openModal(`<h3>${esc(e.name)}</h3>
    <div class="grid2"><div class="field"><label for="eName">Назва</label><input id="eName" value="${esc(e.name)}"></div>
      <div class="field"><label for="eMeal">Прийом їжі</label><select id="eMeal">${MEALS.map(([v, l]) => `<option value="${v}" ${v === e.meal ? "selected" : ""}>${l}</option>`).join("")}</select></div></div>
    <div class="grid2">${fld("eVlad", "Влад, г", num(e.g?.vlad), "vlad-l")}${fld("eVika", "Віка, г", num(e.g?.vika), "vika-l")}</div>
    ${per100("e", e.per || {})}
    <label class="btnrow hint"><input type="checkbox" id="eToBase" style="width:auto"> Зберегти ці значення і в базі продуктів</label>
    <div class="btnrow"><button class="primary" id="eSave">Зберегти</button><button class="ghost" data-close>Скасувати</button><span style="flex:1"></span><button class="ghost danger" id="eDel">Видалити</button></div>`);
  kcalCheck("e"); BASEK.forEach(k => $("#e" + k).addEventListener("input", () => kcalCheck("e")));
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
  kcalCheck("p"); BASEK.forEach(k => $("#p" + k).addEventListener("input", () => kcalCheck("p")));
  $("#pSave").addEventListener("click", async () => {
    const name = $("#pName").value.trim(); if (!name) { $("#pName").focus(); return; }
    const pid = id || "c" + newId(), src = pid[0] === "b" ? "edit" : (isNew ? "own" : p.src);
    try { await putProduct(pid, {name, ...readPer("p"), pc:num($("#pPc").value) || null, src}); if (S.sel?.id === pid) { S.sel = products().find(x => x.id === pid); renderSel(); } closeModal(); toast("Збережено в базі"); }
    catch (err) { toast("Не збереглося: " + (err.code || "помилка")); }
  });
  $("#pReset")?.addEventListener("click", async () => { try { await delProduct(id); closeModal(); toast("Повернуто стандарт"); } catch { toast("Не вдалося"); } });
  $("#pHide")?.addEventListener("click", async ev => {
    if (ev.target.dataset.sure !== "1") { ev.target.dataset.sure = "1"; ev.target.textContent = "Точно прибрати?"; return; }
    try { await putProduct(id, {...perOf(p), name:p.name, pc:p.pc || null, src:p.src, hidden:true}); if (S.sel?.id === id) { S.sel = null; renderSel(); } closeModal(); toast("Прибрано з бази"); }
    catch { toast("Не вдалося"); }
  });
}
function renderGoals(){
  const G = S.settings.goals;
  $("#view-goals").innerHTML = `<div class="sechead"><h2>Цілі на день</h2></div>
    ${PEOPLE.map(pp => { const g = G[pp.id] || DEFAULT_SETTINGS.goals[pp.id]; return `<div class="goalbox ${pp.id}"><h4>${pp.name}</h4>
      <div class="grid4">${fld(pp.id + "kcal", "ккал", g.kcal)}${fld(pp.id + "p", "Білки, г", g.p)}${fld(pp.id + "f", "Жири, г", g.f)}${fld(pp.id + "c", "Вуглеводи, г", g.c)}</div>
      <p class="hint" id="${pp.id}chk"></p></div>`; }).join("")}
    ${fld("ratio", "Порція Віки від Владової, % (для кнопки, нотаток і фото)", S.settings.ratio || 70)}
    <div class="btnrow"><button class="primary" id="gSave">Зберегти цілі</button></div>`;
  PEOPLE.forEach(pp => { kcalCheck(pp.id); BASEK.forEach(k => $("#" + pp.id + k).addEventListener("input", () => kcalCheck(pp.id))); });
  $("#gSave").addEventListener("click", async () => {
    const goals = {}; PEOPLE.forEach(pp => { const g = readPer(pp.id); goals[pp.id] = {kcal:g.kcal, p:g.p, f:g.f, c:g.c}; });
    try { await putSettings({goals, ratio:Math.max(10, Math.min(200, num($("#ratio").value) || 70))}); toast("Цілі збережено"); }
    catch (err) { toast("Не збереглося: " + (err.code || "помилка")); }
  });
}
function renderSettings(){
  const code = LS.get("pair"), link = code ? location.origin + location.pathname + "#pair=" + code : "";
  $("#view-settings").innerHTML = `<div class="sechead"><h2>Налаштування</h2></div>
    <div class="field"><label for="sKey">Ключ Gemini (для нотаток, фото й пошуку через ШІ)</label>
      <input id="sKey" type="password" autocomplete="off" placeholder="${LS.get("gemini") ? "збережено на цьому телефоні" : "вставте ключ"}"></div>
    <div class="btnrow"><button class="primary" id="sSave">Зберегти ключ</button></div>
    <p class="hint">Ключ зберігається лише на цьому пристрої й нікуди не публікується. Безкоштовний ключ: aistudio.google.com → Get API key.</p>
    <div class="goalbox vlad"><h4>Спільні записи для двох телефонів</h4>
      ${code ? `<p class="hint">Це посилання підключає другий телефон до ваших записів. Надсилайте лише одне одному:</p>
          <div class="btnrow"><input id="sLink" value="${esc(link)}" readonly><button class="ghost" id="sCopy">Копіювати</button></div>`
        : `<p class="hint">Створіть спільний простір на цьому телефоні, потім надішліть посилання на другий.</p><button class="ghost" id="sPair">Створити спільний простір</button>`}
      <p class="hint">Стан: ${S.cloud ? "синхронізовано" : "лише цей телефон"}</p></div>
    <div class="btnrow"><button class="ghost" id="sExport">Зберегти копію даних (JSON)</button></div>`;
  $("#sSave").addEventListener("click", () => { const k = $("#sKey").value.trim(); if (!k) { $("#sKey").focus(); return; } LS.set("gemini", k); banner(""); toast("Ключ збережено"); renderSettings(); });
  $("#sPair")?.addEventListener("click", () => { LS.set("pair", rid(24)); connectCloud().then(renderSettings); });
  $("#sCopy")?.addEventListener("click", () => { const i = $("#sLink"); navigator.clipboard?.writeText(i.value).then(() => toast("Скопійовано"), () => i.select()); });
  $("#sExport").addEventListener("click", async () => {
    const rows = S.cloud ? await historyRows() : local.entries;
    const blob = new Blob([JSON.stringify({entries:rows, products:S.over, settings:S.settings}, null, 1)], {type:"application/json"});
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "yimo-razom-" + iso(new Date()) + ".json"; a.click();
  });
}

// ---------- global clicks
document.addEventListener("click", e => {
  const ad = e.target.closest("[data-add]"); if (ad) return openAdder(ad.dataset.add);
  const ed = e.target.closest("[data-edit]"); if (ed) return editEntry(ed.dataset.edit);
  const pr = e.target.closest("[data-prod]"); if (pr && !e.target.closest("#sheet")) return editProduct(pr.dataset.prod);
  const dy = e.target.closest("[data-day]"); if (dy) { S.date = dy.dataset.day; return subscribeWeek(); }
  const wk = e.target.closest("[data-week]"); if (wk) { S.date = addDays(S.date, +wk.dataset.week); return subscribeWeek(); }
});
$("#todayBtn").addEventListener("click", () => { S.date = iso(new Date()); subscribeWeek(); });

// ---------- boot
(function readUrl(){
  const h = new URLSearchParams(location.hash.slice(1));
  if (h.get("pair") && h.get("pair").length >= 20) { LS.set("pair", h.get("pair")); toast("Телефон підключено до спільних записів"); }
  const q = new URLSearchParams(location.search), shared = [q.get("title"), q.get("text"), q.get("url")].filter(Boolean).join("\n");
  if (h.get("pair") || shared) history.replaceState(null, "", location.pathname);
  if (shared) setTimeout(() => { openAdder(defaultMeal(), "note"); $("#noteText").value = shared; }, 0);
})();
renderPhotos(); refreshLocal(); connectCloud();
if (!LS.get("gemini")) banner("Щоб розбирати нотатки й фото, додайте безкоштовний ключ Gemini в «Налаштуваннях». Ручний облік працює й без нього.");
if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
