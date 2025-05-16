import ngrok from 'ngrok';
import fs from 'fs';
import { exec } from 'child_process';

(async () => {
  const url = await ngrok.connect(5173);
  console.log('Ngrok public URL:', url);

  const envPath = './.env.local';
  const envKey = 'VITE_NGROK_URL';

  let envContent = '';
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    const updatedLines = lines.map(line =>
      line.startsWith(`${envKey}=`) ? `${envKey}=${url}` : line
    );
    if (!updatedLines.some(line => line.startsWith(`${envKey}=`))) {
      updatedLines.push(`${envKey}=${url}`);
    }
    envContent = updatedLines.join('\n');
  } else {
    envContent = `${envKey}=${url}`;
  }

  fs.writeFileSync(envPath, envContent, 'utf-8');
  console.log(`Updated ${envPath} with ${envKey}=${url}`);
  
  const child = exec('npm run dev');

  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
})();
