export function parseFlags(args) {
  let dir = 'apps-script-project';
  const flags = {};
  const processedArgs = args.slice(2);
  let dirFound = false;

  for (const arg of processedArgs) {
    if (arg.startsWith('--')) {
      const parts = arg.slice(2).split('=');
      const flagName = parts[0];

      if (flagName === '') continue; // Skip invalid flag format like --=value

      let flagValue = true;
      if (parts.length > 1) {
        flagValue = parts[1];
        if (flagValue === 'true') flagValue = true;
        if (flagValue === 'false') flagValue = false;
      }
      flags[flagName] = flagValue;
      continue;
    }

    // If it doesn't start with '--' and a directory hasn't been found yet, it's the directory
    if (!dirFound) {
      dir = arg;
      dirFound = true;
    }
  }

  const flagArray = Object.keys(flags).map(name => ({ name, value: flags[name] }));

  return { dir, flags: flagArray };
}
