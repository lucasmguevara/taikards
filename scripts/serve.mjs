import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.svg':'image/svg+xml'};
const port=Number(process.env.PORT||5188);
http.createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost');
  let name=decodeURIComponent(url.pathname);if(name.endsWith('/'))name+='index.html';
  const target=path.resolve(root,'.'+name);
  if(!target.startsWith(root)||!['.html','.css','.js','.webp','.svg'].includes(path.extname(target))){res.writeHead(404);return res.end('No encontrado');}
  const data=await fs.readFile(target);res.writeHead(200,{'Content-Type':mime[path.extname(target)],'Cache-Control':'no-cache'});res.end(data);
 }catch{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end('<h1>Esta carta todavía se esconde.</h1><a href="/index.html">Volver a TAIKARDS</a>');}
}).listen(port,'127.0.0.1',()=>console.log(`TAIKARDS disponible en http://localhost:${port}`));
