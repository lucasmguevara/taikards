(() => {
 const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const grid=document.querySelector('#cards');
 if(grid){
  const cards=[...grid.children], search=document.querySelector('#search'),type=document.querySelector('#type'),sort=document.querySelector('#sort');
  const chips=[...document.querySelectorAll('[data-nature-filter]')];
  const params=new URLSearchParams(location.search);
  let nature=chips.some(c=>c.dataset.natureFilter===params.get('naturaleza'))?params.get('naturaleza'):'';
  search.value=params.get('buscar')||'';
  type.value=['Ataque','Defensa','Velocidad'].includes(params.get('tipo'))?params.get('tipo'):'';
  sort.value=params.get('orden')==='za'?'za':'az';
  function update(){
   let count=0;
   for(const card of cards){card.hidden=!(normalize(card.dataset.name).includes(normalize(search.value.trim()))&&(!nature||card.dataset.nature===nature)&&(!type.value||card.dataset.type===type.value));if(!card.hidden)count++;}
   for(const c of chips){const active=c.dataset.natureFilter===nature;c.classList.toggle('active',active);c.setAttribute('aria-pressed',String(active));}
   cards.sort((a,b)=>a.dataset.name.localeCompare(b.dataset.name,'es')*(sort.value==='za'?-1:1)).forEach(c=>grid.append(c));
   document.querySelector('#count').textContent=`Mostrando ${count} de 48 cartas`;
   document.querySelector('#empty').hidden=count>0;
   document.querySelector('#clear').hidden=!(nature||type.value||search.value);
   const p=new URLSearchParams();if(search.value)p.set('buscar',search.value);if(nature)p.set('naturaleza',nature);if(type.value)p.set('tipo',type.value);if(sort.value==='za')p.set('orden','za');
   try{history.replaceState(null,'',location.pathname+(p.size?'?'+p:'')+location.hash);}catch{}
  }
  function reset(){nature='';search.value='';type.value='';sort.value='az';update();}
  search.addEventListener('input',update);type.addEventListener('change',update);sort.addEventListener('change',update);
  chips.forEach(c=>c.addEventListener('click',()=>{nature=c.dataset.natureFilter;update();}));
  document.querySelectorAll('[data-pick-nature]').forEach(c=>c.addEventListener('click',()=>{reset();nature=c.dataset.pickNature;update();}));
  document.querySelector('#clear').addEventListener('click',reset);document.querySelector('#reset').addEventListener('click',reset);
  document.querySelector('[data-random]').addEventListener('click',()=>{location.href=cards[Math.floor(Math.random()*cards.length)].querySelector('a').href;});
  document.addEventListener('keydown',e=>{if(e.key==='/'&&!e.ctrlKey&&!e.metaKey&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){e.preventDefault();search.focus();}});
  update();
 }
 const zoom=document.querySelector('#zoom');
 if(zoom){document.querySelector('[data-zoom]').addEventListener('click',e=>{e.preventDefault();zoom.showModal();});zoom.querySelector('button').addEventListener('click',()=>zoom.close());zoom.addEventListener('click',e=>{if(e.target===zoom)zoom.close();});}
})();
