// ---------- UTIL ----------
const $ = (sel) => document.querySelector(sel);
function shuffle(arr){ for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]] } return arr; }

// ---------- BODY RESET TASKS ----------
const BODY_RESETS = [
  "box breathing 4-4-4-4 for 1 minute",
  "drink a full glass of water (slow sips)",
  "shoulder rolls x10 + neck circles x5 each side",
  "wiggle break: hands/feet/face for 30 seconds",
  "2 minutes of calf raises + ankle circles",
  "look 20 ft away for 20 seconds (20-20-20)",
  "hand stretch: finger fans x10, wrist circles x10",
  "inhale 4s → exhale 6s (1 minute)",
  "stand up, shake it out for 30 seconds",
  "palming: rub hands warm, cover eyes for 20 seconds"
];

// ---------- MOODS (emoji set + playful desc + mood-specific journal prompt) ----------
const MOODS = {
  tomato: { emoji:"🍅", name:"Pomodoro Tomato", desc:"sauce is bubbling; 25/5 then snack.", tag:"micro-bursts",
    prompt:"What single 5-minute task would move the needle today?" },
  juice:  { emoji:"🧃", name:"Juice Box Optimist", desc:"insert silly straw slurp—tiny sugar hope.", tag:"gratitude",
    prompt:"Who/what gave me +1% energy? How can I thank it/them?" },
  snail:  { emoji:"🐌", name:"Cozy Snail", desc:"moving, but with blanket. slow = speed.", tag:"slow-move",
    prompt:"If I honor a slow pace, what still matters (and what can wait)?" },
  germ:   { emoji:"🦠", name:"Brain Germ (Overwhelm)", desc:"mental static detected; quarantine the tabs.", tag:"grounding",
    prompt:"Which 3 things can leave my brain right now (park, delete, or delegate)?" },
  vhs:    { emoji:"📼", name:"VHS Nostalgia", desc:"minecraft ost anyone?", tag:"nostalgia",
    prompt:"Borrow one comfy memory—what detail can I recreate tonight?" },
  octo:   { emoji:"🐙", name:"Octopus Ideas", desc:"eight tabs, eight dreams—pick one tentacle.", tag:"single-focus",
    prompt:"List today’s ideas—circle **one** to explore for 10 minutes." },
  exting: { emoji:"🧯", name:"Little Fire Extinguisher", desc:"cool down the spicy thoughts (pssst… sip water).", tag:"cool-down",
    prompt:"Name the flame (what emotion?) and what outcome I actually want." },
  pin:    { emoji:"📌", name:"Grounded Pin", desc:"pinned to Now Board™. one thing at a time.", tag:"present",
    prompt:"What are my Top 3 for tomorrow (Must / Important / Nice)?" },
  puzzle: { emoji:"🧩", name:"Puzzle Piece", desc:"something’s missing? it’s probably in the couch.", tag:"clarity",
    prompt:"What information am I missing? What’s the smallest next step to find it?" },
  spoon:  { emoji:"🥄", name:"Tiny Spoon", desc:"spoons: limited edition—guard your energy.", tag:"rest",
    prompt:"What can I drop, delay, or delegate so Future Me has a spoon left?" }
};

// ---------- QUESTION BANK (30 eclectic Qs; 4 options each -> scores) ----------
const BANK = [
  { q:"today felt like…", a:[
    {t:"warm cup of water", s:["pin","spoon"]},
    {t:"strawberry milk",  s:["juice","vhs"]},
    {t:"a soft-boiled egg",s:["pin","snail"]},
    {t:"an old pen",       s:["vhs","puzzle"]},
  ]},
  { q:"choose a sky (・ω・)", a:[
    {t:"overcast", s:["pin"]},
    {t:"neon dusk", s:["vhs","octo"]},
    {t:"glitter stars", s:["juice","puzzle"]},
    {t:"scrolling clouds", s:["tomato","germ"]},
  ]},
  { q:"energy meter", a:[
    {t:"sleepy", s:["spoon"]},
    {t:"steady", s:["pin"]},
    {t:"buzzy", s:["tomato","germ"]},
    {t:"sprouty", s:["juice"]},
  ]},
  { q:"pain pings live in my…", a:[
    {t:"knee", s:["tomato"]},
    {t:"heart", s:["puzzle"]},
    {t:"hands", s:["octo"]},
    {t:"eyes", s:["germ"]},
  ]},
  { q:"pick a travel seat", a:[
    {t:"window", s:["vhs","juice"]},
    {t:"aisle", s:["pin"]},
    {t:"front row", s:["tomato"]},
    {t:"standing, headphones on", s:["octo","germ"]},
  ]},
  { q:"keyboard sound today", a:[
    {t:"clack clack", s:["tomato"]},
    {t:"tap… pause… tap", s:["pin"]},
    {t:"silent (nope)", s:["spoon"]},
    {t:"rhythm game", s:["juice","octo"]},
  ]},
  { q:"tiny treat?", a:[
    {t:"citrus slice", s:["juice"]},
    {t:"old song", s:["vhs"]},
    {t:"cat video", s:["juice"]},
    {t:"5-min leg stretch", s:["pin","spoon"]},
  ]},
  { q:"inbox is", a:[
    {t:"haunting me", s:["germ"]},
    {t:"manageable", s:["pin"]},
    {t:"ignored on purpose", s:["spoon"]},
    {t:"sorted into piles", s:["puzzle"]},
  ]},
  { q:"choose a sticker", a:[
    {t:"🧃", s:["juice"]},
    {t:"🍅", s:["tomato"]},
    {t:"🐌", s:["snail"]},
    {t:"📼", s:["vhs"]},
  ]},
  { q:"brain texture", a:[
    {t:"mossy", s:["snail"]},
    {t:"static-y", s:["germ"]},
    {t:"bouncy", s:["juice"]},
    {t:"smooth", s:["pin"]},
  ]},
  { q:"pick a kaomoji", a:[
    {t:"(˘︶˘).｡*", s:["snail","spoon"]},
    {t:"(•̀ᴗ•́)و", s:["tomato"]},
    {t:"(¬_¬ )", s:["germ"]},
    {t:"(＾▽＾)", s:["juice"]},
  ]},
  { q:"conversation luck", a:[
    {t:"replied perfectly", s:["puzzle"]},
    {t:"typed/erased x5", s:["germ"]},
    {t:"avoided, guilt-free", s:["spoon"]},
    {t:"shared a meme", s:["juice"]},
  ]},
  { q:"my vibe color", a:[
    {t:"pumpkin orange", s:["juice"]},
    {t:"electric pink", s:["tomato","germ"]},
    {t:"sage", s:["pin"]},
    {t:"indigo", s:["vhs"]},
  ]},
  { q:"time felt", a:[
    {t:"molasses", s:["spoon"]},
    {t:"flow", s:["pin"]},
    {t:"sprint", s:["tomato"]},
    {t:"loop", s:["vhs"]},
  ]},
  { q:"background noise", a:[
    {t:"old playlist", s:["vhs"]},
    {t:"podcast friends", s:["puzzle"]},
    {t:"office/traffic", s:["germ"]},
    {t:"rain sounds", s:["snail"]},
  ]},
  { q:"body check", a:[
    {t:"jaw tight", s:["germ"]},
    {t:"shoulders heavy", s:["spoon"]},
    {t:"hands fidgety", s:["octo"]},
    {t:"breath deep", s:["pin"]},
  ]},
  { q:"if today was a house", a:[
    {t:"wonky cottage", s:["juice","snail"]},
    {t:"neon loft", s:["germ"]},
    {t:"library nook", s:["vhs","puzzle"]},
    {t:"sunroom", s:["snail","pin"]},
  ]},
  { q:"snack logic", a:[
    {t:"fruit bowl", s:["juice"]},
    {t:"nostalgia cereal", s:["vhs"]},
    {t:"whatever’s closest", s:["germ"]},
    {t:"tea first", s:["pin","spoon"]},
  ]},
  { q:"choose a side quest", a:[
    {t:"organize 5 mins", s:["pin"]},
    {t:"draw a doodle", s:["juice"]},
    {t:"google rabbit hole", s:["octo","germ"]},
    {t:"text a friend", s:["puzzle"]},
  ]},
  { q:"weather outside / mood inside", a:[
    {t:"both drizzly", s:["spoon"]},
    {t:"rain outside / glow inside", s:["snail"]},
    {t:"sunny but glare", s:["germ"]},
    {t:"breezy & clear", s:["pin"]},
  ]},
  { q:"screen time truth", a:[
    {t:"don’t ask", s:["germ"]},
    {t:"ok today", s:["pin"]},
    {t:"needed the scroll", s:["spoon"]},
    {t:"music only", s:["vhs"]},
  ]},
  { q:"meeting style", a:[
    {t:"camera off, blanket on", s:["spoon"]},
    {t:"host mode", s:["tomato"]},
    {t:"lurking listener", s:["vhs"]},
    {t:"emoji reactor", s:["juice","puzzle"]},
  ]},
  { q:"desk talisman", a:[
    {t:"old ticket stub", s:["vhs"]},
    {t:"tiny plant", s:["snail"]},
    {t:"sticky notes grid", s:["pin"]},
    {t:"mystery cable", s:["germ"]},
  ]},
  { q:"micro-habit tonight", a:[
    {t:"stretch 2 mins", s:["pin"]},
    {t:"wash cup", s:["tomato"]},
    {t:"message someone", s:["puzzle"]},
    {t:"play a 90s track", s:["vhs"]},
  ]},
  { q:"dream portal", a:[
    {t:"train window", s:["vhs"]},
    {t:"forest tunnel", s:["snail"]},
    {t:"pixel archway", s:["germ","octo"]},
    {t:"beaded doorway", s:["juice"]},
  ]},
  { q:"work style today", a:[
    {t:"frog-eating first", s:["tomato"]},
    {t:"slow simmer", s:["pin","spoon"]},
    {t:"side quests!", s:["octo","juice"]},
    {t:"tab tornado", s:["germ"]},
  ]},
  { q:"friend for the evening", a:[
    {t:"book", s:["vhs","pin"]},
    {t:"sketchbook", s:["juice"]},
    {t:"youtube", s:["germ"]},
    {t:"voice note", s:["puzzle"]},
  ]},
  { q:"brain wallpaper", a:[
    {t:"gingham", s:["pin"]},
    {t:"star stickers", s:["juice"]},
    {t:"glossy gradients", s:["germ"]},
    {t:"sun-faded posters", s:["vhs"]},
  ]},
  { q:"secret superpower today", a:[
    {t:"showing up anyway", s:["pin"]},
    {t:"finishing a thing", s:["tomato"]},
    {t:"noticing tiny joys", s:["juice"]},
    {t:"remembering a song", s:["vhs"]},
  ]},
  { q:"final kaomoji vibe", a:[
    {t:"( ˘ ³˘)♡", s:["puzzle","snail"]},
    {t:"(ง •̀_•́)ง", s:["tomato"]},
    {t:"(╯°□°）╯︵ ┻━┻", s:["germ"]},
    {t:"(｡•̀ᴗ-)✧", s:["juice","pin"]},
  ]},
];

// ---------- STATE ----------
let chosen = [];
let step = 0;
let scores = {};

// ---------- CORE ----------
function pickTen(){ const idx=[...Array(BANK.length).keys()]; shuffle(idx); return idx.slice(0,10).map(i=>BANK[i]); }
function renderQuestion(){
  const q = chosen[step];
  $("#qNum").textContent = `Question ${step+1}/10`;
  $("#qText").textContent = q.q;
  const form = $("#answers"); form.innerHTML="";
  q.a.forEach((opt, i)=>{
    const id=`q${step}a${i}`;
    const label=document.createElement("label"); label.className="ans";
    label.innerHTML = `<input type="radio" name="a" id="${id}"><span>${opt.t}</span>`;
    form.appendChild(label);
  });
  $("#bar").style.width = `${(step/10)*100}%`;
  $("#prevBtn").disabled = step===0;
}
function getSelectedIndex(){
  const radios = $("#answers").querySelectorAll("input[type=radio]");
  let index=-1; radios.forEach((r,i)=>{ if(r.checked) index=i; });
  return index;
}
function applyScore(ans){ ans.s.forEach(k=>{ scores[k]=(scores[k]||0)+1; }); }
function computeResult(){
  let top=-Infinity, winners=[];
  for(const k in scores){
    if(scores[k]>top){ top=scores[k]; winners=[k]; }
    else if(scores[k]===top){ winners.push(k); }
  }
  const key = winners[Math.floor(Math.random()*winners.length)];
  return { key, ...MOODSKey(key) };
}
function MOODSKey(k){
  const map = { tomato:"tomato", juice:"juice", snail:"snail", germ:"germ", vhs:"vhs",
                octo:"octo", exting:"exting", pin:"pin", puzzle:"puzzle", spoon:"spoon" };
  return MOODS[ map[k] ];
}
function show(sel){ document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active")); $(sel).classList.add("active"); }

// ---------- EVENTS ----------
$("#startBtn").addEventListener("click", ()=>{
  chosen = pickTen(); step=0; scores={}; show("#quiz"); renderQuestion();
});
$("#prevBtn").addEventListener("click", ()=>{ if(step>0){ step--; renderQuestion(); } });
$("#nextBtn").addEventListener("click", ()=>{
  const idx=getSelectedIndex(); if(idx===-1){ alert("choose an option (｡•́︿•̀｡)"); return; }
  applyScore(chosen[step].a[idx]);
  if(step<9){ step++; renderQuestion(); }
  else{
    const r = computeResult();
    $("#rEmoji").textContent = r.emoji;
    $("#rName").textContent  = r.name;
    $("#rDesc").textContent  = r.desc;
    // tags
    const tags=$("#tags"); tags.innerHTML="";
    Object.keys(scores).sort((a,b)=>scores[b]-scores[a]).slice(0,3).forEach(k=>{
      const mood=MOODSKey(k);
      const span=document.createElement("span"); span.className="pill";
      span.textContent = `${mood.emoji} ${mood.tag}`;
      tags.appendChild(span);
    });
    // random body reset
    $("#bodyReset").textContent = BODY_RESETS[Math.floor(Math.random()*BODY_RESETS.length)];
    // stash the mood-specific journal question on the copy button
    $("#copyPromptBtn").dataset.prompt = `${r.emoji} ${r.name} — ${r.prompt || "What do I need most right now?"}`;
    $("#bar").style.width="100%";
    show("#result");
  }
});
$("#againBtn").addEventListener("click", ()=> show("#start"));
$("#shareBtn").addEventListener("click", async ()=>{
  const text = `today's mood: ${$("#rEmoji").textContent} ${$("#rName").textContent}\n${$("#rDesc").textContent}\nBody reset: ${$("#bodyReset").textContent}`;
  try{ await navigator.clipboard.writeText(text); }
  catch{ prompt("copy this:", text); }
});
$("#copyPromptBtn").addEventListener("click", async (e)=>{
  const promptText = e.currentTarget.dataset.prompt || "What do I need most right now?";
  try{ await navigator.clipboard.writeText(promptText); }
  catch{ prompt("copy this:", promptText); }
});
