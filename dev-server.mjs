import { spawn } from 'node:child_process';
import path from 'node:path';

const rawArgs = process.argv.slice(2);
const cleanedArgs = [];

for (let i = 0; i < rawArgs.length; i++) {
  const arg = rawArgs[i];
  if (arg === '--host') {
    cleanedArgs.push('-H');
    if (i + 1 < rawArgs.length) {
      cleanedArgs.push(rawArgs[++i]);
    }
  } else if (arg.startsWith('--host=')) {
    cleanedArgs.push('-H', arg.slice('--host='.length));
  } else {
    cleanedArgs.push(arg);
  }
}

if (!cleanedArgs.includes('-p') && !cleanedArgs.includes('--port')) {
  cleanedArgs.push('-p', '3000');
}
if (!cleanedArgs.includes('-H') && !cleanedArgs.includes('--hostname')) {
  cleanedArgs.push('-H', '0.0.0.0');
}

const nextBin = path.resolve('node_modules/.bin/next');
const child = spawn(nextBin, ['dev', ...cleanedArgs], {
  stdio: 'inherit',
  env: process.env,
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 0);
  }
});

process.on('SIGINT', () => child.kill('SIGINT'));
process.on('SIGTERM', () => child.kill('SIGTERM'));
