// magorg.hu dashboard infografikák — MINDEN ADAT MINTAADAT
(function(){
const R=(a,b)=>a+Math.random()*(b-a);
const D={
 pyr:{l:['18–24','25–34','35–44','45–54','55–64','65–74','75+'],m:[118,190,228,206,190,150,88],f:[112,185,222,210,214,190,157]},
 region:{l:['Közép-Mo.','Észak-Alföld','Dél-Alföld','Észak-Mo.','Közép-Dunántúl','Nyugat-Dunántúl','Dél-Dunántúl'],v:[31,14,12,11,11,10,9]},
 settle:{l:['Budapest','Megyeszékhely','Más város','Község'],v:[18,20,33,29]},
 edu:{l:['Alapfok','Szakmunkás','Érettségi','Diploma'],v:[22,24,32,22]},
 inc:{l:['<200e Ft','200–350e','350–500e','500–750e','750e+'],v:[14,27,29,19,11]},
 words:[['drága',46],['végre',30],['megint',34],['rezsi',28],['fizetés',24],['jó ötlet',22],['Budapest',18],['vidék',20],['kormány',16],['nyugdíj',22],['benzin',38],['bizonytalan',15],['munka',14],['gyerekek',17],['spórolni',26],['infláció',30],['értelmetlen',12],['hasznos',19],['közlekedés',13],['bolt',11]]
};
function heat(n){const t=['#1e3a5f','#155e75','#0e7490','#0891b2','#22d3ee','#a5f3fc'];return t[Math.min(5,Math.floor(n/17))]}
function map(el,T){
 fetch('../hu.geojson').then(r=>r.json()).then(g=>{
  const w=el.clientWidth||600,h=w*0.62;
  const svg=d3.select(el).append('svg').attr('viewBox',`0 0 ${w} ${h}`).attr('class','w-full');
  const pr=d3.geoMercator().fitSize([w,h],g),pa=d3.geoPath(pr);
  const sc=T.heat||heat;
  const tip=d3.select(el).append('div').attr('class','mg-tip').style('position','absolute').style('pointer-events','none').style('font-size','12px').style('padding','4px 8px').style('border-radius','6px').style('background','rgba(0,0,0,.8)').style('color','#fff').style('opacity',0);
  el.style.position='relative';
  const p=svg.selectAll('path').data(g.features).join('path').attr('d',pa).attr('stroke',T.stroke||'#0b1220').attr('stroke-width',1)
   .each(function(d){d.v=Math.round(R(10,95))}).attr('fill',d=>sc(d.v))
   .on('mousemove',(e,d)=>{const b=el.getBoundingClientRect();tip.style('opacity',1).style('left',(e.clientX-b.left+10)+'px').style('top',(e.clientY-b.top)+'px').text(`${d.properties.name}: ${d.v}% egyetért (Mintaadat)`)}).on('mouseleave',()=>tip.style('opacity',0));
  svg.selectAll('text').data(g.features.filter(f=>f.properties.name.length<9)).join('text').attr('transform',d=>`translate(${pa.centroid(d)})`).attr('text-anchor','middle').attr('font-size',9).attr('fill',T.mapText||'#fff').attr('opacity',.8).text(d=>d.properties.name);
  setInterval(()=>p.each(d=>{d.v=Math.max(5,Math.min(98,d.v+Math.round(R(-12,12))))}).transition().duration(1400).attr('fill',d=>sc(d.v)),2600);
 });
}
function cj(el,cfg){const c=document.createElement('canvas');el.appendChild(c);return new Chart(c,cfg)}
const C={
 pyr:(el,T)=>cj(el,{type:'bar',data:{labels:D.pyr.l,datasets:[{label:'Férfi',data:D.pyr.m.map(x=>-x),backgroundColor:T.p[0]},{label:'Nő',data:D.pyr.f,backgroundColor:T.p[1]}]},options:{indexAxis:'y',scales:{x:{stacked:true,ticks:{callback:v=>Math.abs(v)}},y:{stacked:true}},plugins:{tooltip:{callbacks:{label:c=>c.dataset.label+': '+Math.abs(c.raw)+' avatar'}}}}}),
 region:(el,T)=>cj(el,{type:'doughnut',data:{labels:D.region.l,datasets:[{data:D.region.v,backgroundColor:T.p,borderWidth:0}]},options:{cutout:'62%',plugins:{legend:{position:'right',labels:{boxWidth:10,font:{size:10}}}}}}),
 settle:(el,T)=>cj(el,{type:'doughnut',data:{labels:D.settle.l,datasets:[{data:D.settle.v,backgroundColor:T.p.slice(2),borderWidth:0}]},options:{cutout:'62%',plugins:{legend:{position:'right',labels:{boxWidth:10,font:{size:10}}}}}}),
 edu:(el,T)=>cj(el,{type:'bar',data:{labels:D.edu.l,datasets:[{label:'%',data:D.edu.v,backgroundColor:T.p[0],borderRadius:4}]},options:{plugins:{legend:{display:false}}}}),
 inc:(el,T)=>cj(el,{type:'bar',data:{labels:D.inc.l,datasets:[{label:'% (nettó háztartási/fő, Mintaadat)',data:D.inc.v,backgroundColor:T.p[1],borderRadius:4}]},options:{indexAxis:'y',plugins:{legend:{display:false}}}}),
 sent:(el,T)=>{const l=Array.from({length:13},(_,i)=>(6+i)+':00');cj(el,{type:'line',data:{labels:l,datasets:[{label:'Negatív',data:[8,22,41,55,61,58,54,52,49,47,46,44,43],borderColor:T.neg||'#f43f5e',backgroundColor:(T.neg||'#f43f5e')+'33',fill:true,tension:.35},{label:'Pozitív',data:[5,9,12,14,15,17,18,19,21,22,22,23,24],borderColor:T.pos||'#10b981',backgroundColor:(T.pos||'#10b981')+'33',fill:true,tension:.35}]},options:{plugins:{title:{display:true,text:'„Emelkedik az üzemanyagár” — reakció óránként (%)'}}}})},
 ba:(el,T)=>cj(el,{type:'bar',data:{labels:['Ismertség','Szimpátia','Vásárlási szándék','Ajánlás'],datasets:[{label:'Kampány előtt',data:[22,31,14,9],backgroundColor:T.p[3]||'#94a3b8'},{label:'Kampány után',data:[48,44,27,19],backgroundColor:T.p[0]}]},options:{}}),
 price:(el,T)=>{const x=[1990,2990,3990,4990,5990,6990,7990,8990];cj(el,{type:'line',data:{labels:x.map(v=>v.toLocaleString('hu-HU')+' Ft'),datasets:[{label:'Túl olcsó',data:[62,40,22,11,6,3,2,1],borderColor:T.p[2],tension:.4},{label:'Olcsó',data:[80,66,48,30,18,10,6,3],borderColor:T.p[0],tension:.4},{label:'Drága',data:[3,8,18,37,58,74,85,92],borderColor:T.p[1],tension:.4},{label:'Túl drága',data:[1,3,7,16,33,52,70,84],borderColor:T.neg||'#f43f5e',tension:.4}]},options:{plugins:{title:{display:true,text:'Árérzékenység (Van Westendorp-stílus)'}}}})},
};
function words(el,T){el.innerHTML=D.words.map(([w,n],i)=>`<span style="font-size:${10+n*.7}px;color:${T.p[i%T.p.length]};opacity:${.55+n/100};margin:2px 8px;display:inline-block;font-weight:${n>25?700:400}">${w}</span>`).join('')}
function funnel(el,T){const s=[['Látta a hirdetést',100],['Rákattintott',38],['Elolvasta az ajánlatot',24],['Kosárba tette',11],['Megvásárolta',6]];el.innerHTML=s.map(([l,v],i)=>`<div style="width:${40+v*.6}%;background:${T.p[i%T.p.length]};margin:4px auto;padding:8px 12px;border-radius:6px;color:#fff;font-size:13px;display:flex;justify-content:space-between"><span>${l}</span><b>${v}%</b></div>`).join('')}
function cmp(el){el.innerHTML=`<table class="w-full text-sm"><thead><tr class="text-left opacity-70"><th class="py-2">Szempont</th><th>Hagyományos kutatás</th><th>magorg.hu avatar-panel</th></tr></thead><tbody>${[['Átfutási idő','3–6 hét','1–3 nap'],['Költség (példa)','1,5–4 millió Ft','49–190 ezer Ft'],['Minta','1000 fő','3000 avatar'],['Hírreakció','napok','~1 óra'],['Ismételhetőség','újabb terepmunka','azonnal'],['Valós emberek','igen','nem — szintetikus, kiegészítő eszköz']].map(r=>`<tr class="border-t border-current/10" style="border-top:1px solid rgba(127,127,127,.25)"><td class="py-2">${r[0]}</td><td>${r[1]}</td><td><b>${r[2]}</b></td></tr>`).join('')}</tbody></table><p class="text-xs opacity-60 mt-2">Példa / Mintaadat — tájékoztató összehasonlítás, nem árajánlat.</p>`}
function counters(){document.querySelectorAll('[data-c]').forEach(e=>{let t=+e.dataset.c,s=0;let i=setInterval(()=>{s+=t/50;if(s>=t){s=t;clearInterval(i)}e.textContent=Math.round(s).toLocaleString('hu-HU')},25)})}
window.MG={render(T,lazy){
 Chart.defaults.color=T.fg;Chart.defaults.borderColor=T.grid;Chart.defaults.font.family=T.font||'sans-serif';Chart.defaults.maintainAspectRatio=true;
 const run=el=>{if(el.dataset.done)return;el.dataset.done=1;const k=el.dataset.chart;
  if(k==='map')map(el,T);else if(k==='words')words(el,T);else if(k==='funnel')funnel(el,T);else if(k==='cmp')cmp(el);else C[k](el,T)};
 const els=document.querySelectorAll('[data-chart]');
 if(lazy){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.closest('.reveal')?.classList.add('in');run(e.target)}}),{threshold:.25});els.forEach(e=>io.observe(e))}else els.forEach(run);
 counters();
 const tk=document.getElementById('tick');if(tk)tk.innerHTML+=tk.innerHTML;
 const d=document.getElementById('d');if(d)d.textContent=new Date().toLocaleDateString('hu-HU',{year:'numeric',month:'long',day:'numeric'});
}};
})();
