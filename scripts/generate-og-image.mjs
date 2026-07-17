
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../public');
const outPath = path.join(publicDir, 'og-image.jpg');

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#05070b"/>
      <stop offset="50%" stop-color="#0a1628"/>
      <stop offset="100%" stop-color="#05070b"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#22d3ee"/>
      <stop offset="100%" stop-color="#a78bfa"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="980" cy="120" r="180" fill="#22d3ee" opacity="0.08"/>
  <circle cx="200" cy="520" r="220" fill="#a78bfa" opacity="0.08"/>
  <rect x="72" y="72" width="1056" height="486" rx="24" fill="none" stroke="#ffffff" stroke-opacity="0.1" stroke-width="2"/>
  <text x="100" y="220" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="28" font-weight="600" fill="#22d3ee" letter-spacing="3">PORTFOLIO</text>
  <text x="100" y="310" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="72" font-weight="700" fill="#ffffff">Naimish K</text>
  <text x="100" y="380" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="36" font-weight="500" fill="url(#accent)">Full Stack Developer &amp; AI Engineer</text>
  <text x="100" y="460" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="24" fill="#94a3b8">React · Python · Django · FastAPI · AI Automation</text>
  <text x="100" y="520" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="22" fill="#64748b">nymiss.dev</text>
</svg>
`;

await sharp(Buffer.from(svg))
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(outPath);

console.log(`OG image written to ${outPath}`);
