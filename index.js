#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { parseFlags } from './handlers/parse-flags.js';
import { applyScripts, installDeps } from './handlers/apply-config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const REPO = 'https://github.com/WildH0g/apps-script-engine-template.git';

const COMMANDS = {
  gitClone(dir = '') {
    console.log(`⏳ Initiating Apps Script Engine in directory "${dir}"`);
    const localDevDir = process.env.DEV_MODE_DIR;
    if (!localDevDir || !fs.existsSync(localDevDir))
      return `git clone --depth 1 ${REPO} "${dir}"`;
    console.log(`Copying from local DEV directory: ${localDevDir}`);
    return `cp -r "${localDevDir}/." "${dir}"`;
  },
  gitInit(dir = '.') {
    console.log(`⏳ Initiating git repository in ${dir}`);
    const commands = [
      `cd "${dir}"`,
      'git init',
      'npm i',
      'npm run install:husky',
      'git add .',
      'git commit -m "Install Apps Script Engine template"',
    ];
    return commands.join(' && ');
  },
};

const { dir, flags } = parseFlags(process.argv);
let lang = 'javascript';
for (const flag of flags) {
  if ('ts' === flag.name && true === flag.value) lang = 'typescript';
}

(async () => {
  try {
    execSync(COMMANDS.gitClone(dir));

    const folderPath = path.join(process.cwd(), dir);

    fs.rmSync(path.join(folderPath, '.git'), { recursive: true, force: true });

    fs.renameSync(
      path.join(folderPath, 'README.md'),
      path.join(folderPath, 'INSTRUCTIONS.md')
    );
    fs.truncateSync(path.join(folderPath, 'HISTORY.md'));

    console.log('Applying language config...');
    const configPath = path.join(folderPath, `.config/${lang}`);
    const configFiles = path.join(configPath, 'files/');
    const configScripts = path.join(configPath, 'config.js');

    console.log('Copying language files...');
    fs.cpSync(configFiles, folderPath, { recursive: true });

    console.log('Applying NPM scripts...');
    const { npmScripts, deps } = await import(configScripts);
    applyScripts(dir, npmScripts);

    console.log('Installing dependencies...');
    installDeps(dir, deps);

    fs.rmSync(path.join(folderPath, '.config'), {
      recursive: true,
      force: true,
    });

    execSync(COMMANDS.gitInit(folderPath));

    console.log('✅ Success!');
  } catch (err) {
    console.error(`❌ Something went wrong: ${err}`);
  }
})();
