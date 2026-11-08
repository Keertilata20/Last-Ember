const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const source = path.join(root, 'last-ember-extension');
const output = path.join(root, 'last-ember-pwa');
const files = [
  'index.html',
  'style.css',
  'game.js',
  'pwa-register.js',
  'pwa-worker.js',
  'manifest.webmanifest',
  'icon16.png',
  'icon48.png',
  'icon128.png',
  'icon192.png',
  'icon512.png'
];

fs.mkdirSync(output, { recursive: true });
for (const file of files) {
  const from = path.join(source, file);
  if (!fs.existsSync(from)) throw new Error(`Missing PWA source file: ${from}`);
  fs.copyFileSync(from, path.join(output, file));
}
process.stdout.write(`Built ${files.length} offline PWA files in ${output}\n`);
