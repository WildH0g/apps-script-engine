import { execSync } from 'child_process';

export function applyScripts(dir = '.', npmScripts = []) {
  const buildCmd = (name, cmd) => `cd ${dir} && npm pkg set "scripts.${name}"="${cmd}"`;
  const commands = npmScripts.map((script) =>
    buildCmd(script.name, script.cmd)
  );
  commands.forEach(execSync);
  return commands;
}

export function installDeps(dir = '.', cmd = null) {
  if(!cmd) return;
  const command = `cd ${dir} && ${cmd}`;
  execSync(command);
  return command;
}
