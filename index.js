#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
const REPO = 'git@github.com:WildH0g/apps-script-engine-template.git';

const COMMANDS = {
  gitClone(dir = '') {
    return `git clone ${REPO} ${dir}`;
  },
};

const dir = process.argv[2] || 'apps-script-project';
try {
  console.log(`Initiating Apps Script Engine in directory "${dir}"`);
  execSync(COMMANDS.gitClone(dir));

  const folderPath = path.join(process.cwd(), dir);

  fs.rm(
    path.join(folderPath, '.git'),
    { recursive: true, force: true },
    () => {}
  );

  fs.renameSync(
    path.join(folderPath, 'README.md'),
    path.join(folderPath, 'INSTRUCTIONS.md')
  );
  fs.rmSync(path.join(folderPath, 'HISTORY.md'));

  console.log('✅ Success!');
} catch (err) {
  console.error(`❌ Something went wrong: ${err}`);
}
