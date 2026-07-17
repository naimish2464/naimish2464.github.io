#!/usr/bin/env node
/**
 * Compresses large PNG assets in src/assets for better LCP / CLS.
 * Overwrites originals with optimized PNGs (keeps filenames for imports).
 * Run: node scripts/optimize-images.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.resolve(__dirname, '../src/assets');

const targets = [
  { file: 'profile.png', maxWidth: 512, photo: true },
  { file: 'desk.png', maxWidth: 800, photo: true },
  { file: 'airecruiter.png', maxWidth: 960 },
  { file: 'shiptime.png', maxWidth: 960 },
  { file: 'crescofy.png', maxWidth: 960 },
  { file: 'mundoprints.png', maxWidth: 960 },
  { file: 'candidateai.png', maxWidth: 960 },
  { file: 'blockandmortar.png', maxWidth: 960 },
];

for (const { file, maxWidth, photo } of targets) {
  const inputPath = path.join(assetsDir, file);
  if (!fs.existsSync(inputPath)) {
    console.warn(`Skip missing: ${file}`);
    continue;
  }

  const before = fs.statSync(inputPath).size;
  const pipeline = sharp(inputPath).resize({ width: maxWidth, withoutEnlargement: true });
  const buffer = photo
    ? await pipeline.png({ quality: 90, compressionLevel: 9 }).toBuffer()
    : await pipeline.png({ quality: 80, compressionLevel: 9, palette: true }).toBuffer();

  fs.writeFileSync(inputPath, buffer);
  const after = buffer.length;
  const saved = (((before - after) / before) * 100).toFixed(1);
  console.log(`${file}: ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB (−${saved}%)`);
}

console.log('Image optimization complete.');
