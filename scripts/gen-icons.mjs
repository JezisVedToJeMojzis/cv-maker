import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const pub = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

const svg = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3b82f6"/>
      <stop offset="1" stop-color="#1d4ed8"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#bg)"/>
  <rect x="146" y="116" width="220" height="280" rx="22" fill="#ffffff"/>
  <circle cx="198" cy="176" r="26" fill="#2563eb"/>
  <rect x="240" y="160" width="98" height="15" rx="7" fill="#93c5fd"/>
  <rect x="240" y="186" width="72" height="12" rx="6" fill="#cbd5e1"/>
  <rect x="178" y="242" width="156" height="13" rx="6" fill="#e2e8f0"/>
  <rect x="178" y="272" width="156" height="13" rx="6" fill="#e2e8f0"/>
  <rect x="178" y="302" width="118" height="13" rx="6" fill="#e2e8f0"/>
  <rect x="178" y="340" width="156" height="13" rx="6" fill="#93c5fd"/>
</svg>`;

// Maskable: same art but padded into the safe zone on a solid field.
const maskable = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#1d4ed8"/>
  <g transform="translate(102 102) scale(0.6)">${svg.replace(/<\/?svg[^>]*>/g, '')}</g>
</svg>`;

writeFileSync(join(pub, 'favicon.svg'), svg);

const targets = [
  { name: 'pwa-192.png', size: 192, src: svg },
  { name: 'pwa-512.png', size: 512, src: svg },
  { name: 'maskable-512.png', size: 512, src: maskable },
  { name: 'apple-touch-icon.png', size: 180, src: svg },
  { name: 'favicon-48.png', size: 48, src: svg }
];

for (const t of targets) {
  await sharp(Buffer.from(t.src)).resize(t.size, t.size).png().toFile(join(pub, t.name));
  console.log('wrote', t.name);
}
