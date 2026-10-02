/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="112" fill="#261C16"/>
  <rect x="16" y="16" width="480" height="480" rx="96" fill="none" stroke="#DBC5A6" stroke-width="6" stroke-opacity="0.25"/>
  
  <!-- Architectural Celosia Breeze Block Motif -->
  <g transform="translate(256, 120)" fill="#DBC5A6">
    <polygon points="-40,28 0,-40 40,28" fill-opacity="0.95"/>
    <polygon points="-20,24 0,-16 20,24" fill="#261C16"/>
  </g>

  <!-- Typography Monogram G&R in Playfair/Serif style -->
  <text x="256" y="315" text-anchor="middle" font-family="Georgia, 'Playfair Display', serif" font-size="168" font-weight="bold" fill="#F8F5EE" letter-spacing="-3">G&amp;R</text>

  <!-- Cafe Subtitle -->
  <text x="256" y="395" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="38" font-weight="700" fill="#DBC5A6" letter-spacing="14">CAFE</text>
</svg>`.trim();

fs.writeFileSync(path.join(__dirname, '../public/icon.svg'), svgIcon);
fs.writeFileSync(path.join(__dirname, '../src/app/icon.svg'), svgIcon);
console.log('✓ icon.svg written to public/ and src/app/');

async function buildIcons() {
  const iconBuffer = Buffer.from(svgIcon);

  // 1. Apple Touch Icon (180x180)
  await sharp(iconBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(__dirname, '../public/apple-touch-icon.png'));
  await sharp(iconBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(__dirname, '../src/app/apple-icon.png'));
  console.log('✓ apple-touch-icon.png (180x180) created');

  // 2. Standard 192x192 Web App Icon
  await sharp(iconBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(__dirname, '../public/icon-192.png'));
  console.log('✓ icon-192.png created');

  // 3. High-res 512x512 Web App Icon
  await sharp(iconBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(__dirname, '../public/icon-512.png'));
  console.log('✓ icon-512.png created');

  // 4. Standard 32x32 Favicon PNG
  const png32Buf = await sharp(iconBuffer)
    .resize(32, 32)
    .png()
    .toBuffer();

  await sharp(iconBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(__dirname, '../public/favicon-32x32.png'));

  // 5. Standard Windows/Browser ICO file containing 32x32 PNG
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = ICO
  header.writeUInt16LE(1, 4); // 1 image

  const entry = Buffer.alloc(16);
  entry.writeUInt8(32, 0); // width
  entry.writeUInt8(32, 1); // height
  entry.writeUInt8(0, 2);  // color palette
  entry.writeUInt8(0, 3);  // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png32Buf.length, 8); // size of image data
  entry.writeUInt32LE(22, 12); // offset (6 + 16 = 22)

  const ico = Buffer.concat([header, entry, png32Buf]);
  fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), ico);
  fs.writeFileSync(path.join(__dirname, '../src/app/favicon.ico'), ico);
  console.log('✓ favicon.ico created');
}

buildIcons().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
