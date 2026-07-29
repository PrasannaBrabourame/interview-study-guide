const studied=new Set(JSON.parse(localStorage.getItem("study-progress")||"[]"));
const esc=s=>String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
const list=a=>`<ul>${a.map(x=>`<li>${x}</li>`).join("")}</ul>`;
const cards=document.getElementById("cards"),toc=document.getElementById("toc"),cat=document.getElementById("cat");
[...new Set(topics.map(x=>x.category))].sort().forEach(x=>cat.insertAdjacentHTML("beforeend",`<option>${x}</option>`));
cards.innerHTML=topics.map((t,i)=>`<article class="card" id="${t.id}" data-cat="${t.category}" data-search="${esc(JSON.stringify(t).toLowerCase())}">
<header class="head" tabindex="0" aria-expanded="false"><div class="num">${String(i+1).padStart(2,"0")}</div><div><h2>${t.title}</h2><p>${t.category}</p></div><div class="actions"><input class="check" type="checkbox" data-id="${t.id}" ${studied.has(t.id)?"checked":""} title="Mark studied"><button class="chev">⌄</button></div></header>
<div class="body"><div class="question">${t.question}</div><button class="btn reveal">Reveal answer</button><div class="grid">
<section class="box full"><h3>🧠 Technical answer</h3>${list(t.technical)}</section>
<section class="box layman"><h3>💡 In layman terms</h3><p>${t.layman}</p></section>
<section class="box"><h3>🛠 Practical use cases</h3>${list(t.usecases)}</section>
<div class="code"><button class="copy">Copy</button><pre><code>${esc(t.code)}</code></pre></div>
<section class="box"><h3>🎯 Follow-up interview checks</h3>${list(t.followups)}</section>
<section class="box bad"><h3>⚠ Red flags</h3>${list(t.redflags)}</section>
<section class="box full memo"><h3>📌 One-line memory aid</h3><p><b>${t.memory}</b></p></section>
</div></div></article>`).join("");
toc.innerHTML=topics.map((t,i)=>`<a href="#${t.id}">${String(i+1).padStart(2,"0")} · ${t.title}</a>`).join("");
function progress(){document.getElementById("ptext").textContent=`${studied.size} of ${topics.length} studied`;document.getElementById("fill").style.width=`${studied.size/topics.length*100}%`}
document.querySelectorAll(".head").forEach(h=>{const c=h.closest(".card");const go=()=>{c.classList.toggle("open");h.setAttribute("aria-expanded",c.classList.contains("open"))};h.onclick=e=>{if(!e.target.classList.contains("check"))go()};h.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();go()}}});
document.querySelectorAll(".check").forEach(x=>x.onchange=()=>{x.checked?studied.add(x.dataset.id):studied.delete(x.dataset.id);localStorage.setItem("study-progress",JSON.stringify([...studied]));progress()});
document.querySelectorAll(".copy").forEach(b=>b.onclick=async()=>{await navigator.clipboard.writeText(b.nextElementSibling.innerText);b.textContent="Copied";setTimeout(()=>b.textContent="Copy",1000)});
document.querySelectorAll(".reveal").forEach(b=>b.onclick=()=>{const c=b.closest(".card");c.classList.toggle("revealed");b.textContent=c.classList.contains("revealed")?"Hide answer":"Reveal answer"});
function filter(){const q=document.getElementById("msearch").value.toLowerCase().trim(),cv=cat.value;let n=0;document.querySelectorAll(".card").forEach(c=>{const show=(!q||c.dataset.search.includes(q))&&(cv==="all"||c.dataset.cat===cv);c.hidden=!show;if(show)n++});document.getElementById("empty").style.display=n?"none":"block"}
const ms=document.getElementById("msearch"),ss=document.getElementById("ssearch");ms.oninput=()=>{ss.value=ms.value;filter()};ss.oninput=()=>{ms.value=ss.value;filter()};cat.onchange=filter;
document.getElementById("expand").onclick=()=>document.querySelectorAll(".card:not([hidden])").forEach(c=>{c.classList.add("open");c.querySelector(".head").setAttribute("aria-expanded","true")});
document.getElementById("collapse").onclick=()=>document.querySelectorAll(".card").forEach(c=>{c.classList.remove("open");c.querySelector(".head").setAttribute("aria-expanded","false")});
document.getElementById("quiz").onclick=e=>{document.body.classList.toggle("quiz");document.querySelectorAll(".card").forEach(c=>c.classList.remove("revealed"));e.target.textContent=document.body.classList.contains("quiz")?"Exit quiz mode":"Quiz mode"};
if(localStorage.getItem("study-theme")==="dark"){document.documentElement.dataset.theme="dark";document.getElementById("theme").textContent="Light mode"}
document.getElementById("theme").onclick=e=>{const d=document.documentElement.dataset.theme==="dark";document.documentElement.dataset.theme=d?"light":"dark";localStorage.setItem("study-theme",d?"light":"dark");e.target.textContent=d?"Dark mode":"Light mode"};
document.getElementById("print").onclick=()=>window.print();document.getElementById("menu").onclick=()=>document.getElementById("side").classList.toggle("open");toc.onclick=e=>{if(e.target.tagName==="A")document.getElementById("side").classList.remove("open")};
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){document.querySelectorAll(".toc a").forEach(a=>a.classList.remove("active"));document.querySelector(`.toc a[href="#${e.target.id}"]`)?.classList.add("active")}}),{rootMargin:"-30% 0px -65% 0px"});
document.querySelectorAll(".card").forEach(c=>observer.observe(c));progress();
