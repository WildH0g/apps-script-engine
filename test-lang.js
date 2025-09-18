import path from 'path';
import { readFileSync, existsSync } from 'fs';

const lang = 'javascript';

const p =
  '/home/wildhog/Documents/1. PROJECTS 📅/my-tools/gas-engine/template/';

const configPath = path.join(p, '.config', lang);
console.warn('DEBUGPRINT[164]: test-lang.js:7: configPath=', configPath);
const configFiles = path.join(configPath, 'files/');
console.warn('DEBUGPRINT[165]: test-lang.js:9: configFiles=', configFiles);
const configScripts = path.join(configPath, 'config.js');
console.warn('DEBUGPRINT[166]: test-lang.js:11: configScripts=', configScripts);

console.warn(
  `DEBUGPRINT[EXISTS]: Does configScripts exist? ${existsSync(configScripts)}`
);

const config = readFileSync(configScripts, 'utf8');
console.warn('DEBUGPRINT[168]: test-lang.js:17: config=', config);
