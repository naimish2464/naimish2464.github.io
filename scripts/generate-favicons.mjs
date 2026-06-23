#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import toIco from 'to-ico';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../public');
const svgPath = path.join(publicDir, 'favicon.svg');
const svgBuffer = fs.readFileSync(svgPath);

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
];

const icoBuffers = [];

for (const { name, size } of sizes) {
  const buffer = await sharp(svgBuffer).resize(size, size).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, name), buffer);

  if (size === 16 || size === 32) {
    icoBuffers.push(buffer);
  }
}

fs.writeFileSync(path.join(publicDir, 'favicon.ico'), await toIco(icoBuffers));
console.log('Favicon assets generated in public/');
