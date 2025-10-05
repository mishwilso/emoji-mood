// ---------- UTIL ----------
const $ = (sel) => document.querySelector(sel);
function shuffle(arr){ for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]] } return arr; }

// ---------- MOODS (your emoji set + silly notes + meditation links) ----------
/*
video: a YouTube search URL to copy. (You can replace with exact videos anytime.)
*/
const MOODS = {
  tomato: { emoji:"🍅", name:"Pomodoro Tomato", desc:"sauce is bubbling; 25/5 then snack.", tag:"micro-bursts", video:"https://www.youtube.com/results?search_query=10+minute+focus+breathing" },
  juice:  { emoji:"🧃", name:"Juice Box Optimist", desc:"insert silly straw slurp—tiny sugar hope.", tag:"gratitude", video:"https://www.youtube.com/results?search_query=5+minute+gratitude+meditation" },
  snail:  { emoji:"🐌", name:"Cozy Snail", desc:"moving, but with blanket. slow = speed.", tag:"slow-move", video:"https://www.youtube.com/results?search_query=10+minute+body+scan+meditation" },
  germ:   { emoji:"🦠", name:"Brain Germ (Overwhelm)", desc:"mental static detected; quarantine the tabs.", tag:"grounding", video:"https://www.youtube.com/results?search_query=5+minute+grounding+anxiety+meditation" },
  vhs:    { emoji:"📼", name:"VHS Nostalgia", desc:"minecraft ost anyone?", tag:"nostalgia", video:"https://www.youtube.com/results?search_query=10+minute+nostalgic+lofi+breathing" },
  octo:   { emoji:"🐙", name:"Octopus Ideas", desc:"eight tabs, eight dreams—pick one tentacle.", tag:"single-focus", video:"https://www.youtube.com/results?search_query=10+minute+single+point+focus+meditation" },
  exting:{ emoji:"🧯", name:"Little Fire Extinguisher", desc:"cool down the spicy thoughts (pssst… sip water).", tag:"cool-down", video:"https://www.youtube.com/results?search_query=sitali+cooling+breath+guided" },
  pin:    { emoji:"📌", name:"Grounded Pin", desc:"pinned to Now Board™. one thing at a time.", tag:"present", video:"https://www.youtube.com/results?search_query=5+minute+grounding+meditation" },
  puzzle: { emoji:"🧩", name:"Puzzle Piece", desc:"something’s missing? it’s probably in the couch.", tag:"clarity", video:"https://www.youtube.com/results?search_query=10+minute+clarity+meditation" },
  spoon:  { emoji:"🥄", name:"Tiny Spoon", desc:"spoons: limited edition—guard your energy.", tag:"rest", video:"https://www.youtube.com/results?search_query=10+minute+yoga+nidra+guided" }
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
function MOODSKey(k){ // map shorthand keys used in BANK to MOODS keys
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
    const tags=$("#tags"); tags.innerHTML="";
    Object.keys(scores).sort((a,b)=>scores[b]-scores[a]).slice(0,3).forEach(k=>{
      const mood=MOODSKey(k);
      const span=document.createElement("span"); span.className="pill";
      span.textContent = `${mood.emoji} ${mood.tag}`;
      tags.appendChild(span);
    });
    $("#bar").style.width="100%";
    // store meditation link for copy button
    $("#copyMeditationBtn").dataset.link = r.video;
    show("#result");
  }
});
$("#againBtn").addEventListener("click", ()=> show("#start"));
$("#shareBtn").addEventListener("click", async ()=>{
  const text = `today's mood: ${$("#rEmoji").textContent} ${$("#rName").textContent}\n${$("#rDesc").textContent}`;
  try{ await navigator.clipboard.writeText(text); alert("copied to clipboard ✨"); }
  catch{ prompt("copy this:", text); }
});
$("#copyMeditationBtn").addEventListener("click", async (e)=>{
  const link = e.currentTarget.dataset.link || "https://www.youtube.com/results?search_query=10+minute+breathing+meditation";
  try{ await navigator.clipboard.writeText(link); alert("meditation link copied 🧘✨"); }
  catch{ prompt("copy this:", link); }
});
