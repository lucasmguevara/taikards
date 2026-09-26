import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {cards} from '../data.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
assert.equal(cards.length,48);assert.equal(new Set(cards.map(c=>c.slug)).size,48);
for(const [nature,total] of Object.entries({Fuego:9,Agua:7,Bosque:10,Espíritu:14,Guardián:8}))assert.equal(cards.filter(c=>c.nature===nature).length,total,nature);
for(const c of cards){assert.ok(c.story.length>200,c.name);assert.ok(c.activity);assert.ok(['Ataque','Defensa','Velocidad'].includes(c.type));}
for(const name of ['SHISA VERDE','TAMESHISAWARI VERDE'])assert.equal(cards.find(c=>c.name===name).type,'Defensa');
let links=0;
for(const file of ['index.html','instrucciones.html',...cards.map(c=>`yokai/${c.slug}.html`)]){
 const html=await fs.readFile(path.join(root,file),'utf8');assert.ok(html.includes('lang="es-AR"'));assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
 for(const [,url] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(/^(https?:|#|data:)/.test(url))continue;
  const target=path.resolve(root,path.dirname(file),url.split(/[?#]/)[0]);await fs.access(target);links++;
 }
}
console.log(`OK: 48 cartas, clasificación, historias, 50 páginas y ${links} enlaces/recursos locales.`);
