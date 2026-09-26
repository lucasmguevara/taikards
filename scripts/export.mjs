import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist');
await fs.mkdir(output, {recursive:true});
// Explicit allowlist: never publish source scripts or browser review profiles.
const files = ['index.html', 'styles.css', 'kids.css', 'app.js', 'assets', 'yokai'];
for (const file of files) {
  await fs.cp(path.join(root, file), path.join(output, file), {recursive:true});
}
console.log('Sitio estático listo en dist/.');
