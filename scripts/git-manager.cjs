const fs = require('fs');
const path = require('path');
const git = require('isomorphic-git');

const dir = path.resolve(__dirname, '..');

async function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    if (file === '.git' || file === 'node_modules' || file === '.next' || file === 'coverage' || file === '.vercel') {
      continue;
    }
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = await getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.relative(dir, fullPath).replace(/\\/g, '/'));
    }
  }

  return arrayOfFiles;
}

async function run() {
  const gitDir = path.join(dir, '.git');
  const exists = fs.existsSync(gitDir);
  
  if (!exists) {
    console.log('Initializing git repository...');
    await git.init({ fs, dir });
  } else {
    console.log('Git repository already initialized.');
  }

  console.log('Gathering project files...');
  const files = await getAllFiles(dir);
  console.log(`Found ${files.length} project files.`);

  console.log('Staging files...');
  for (const filepath of files) {
    await git.add({ fs, dir, filepath });
  }

  console.log('Committing changes...');
  const sha = await git.commit({
    fs,
    dir,
    author: {
      name: 'Nitish Kumar',
      email: 'knr74488@gmail.com',
    },
    message: 'feat: modern personal portfolio with video intro, mobile responsiveness & whatsapp contact',
  });

  console.log(`Commit created successfully! SHA: ${sha}`);
}

run().catch((err) => {
  console.error('Git error:', err);
  process.exit(1);
});
