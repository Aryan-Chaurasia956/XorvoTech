#!/usr/bin/env node
// Compress images in public/, src/components/, and src/assets/ to reduce KB size.
// Uses sharp to re-encode JPEG/PNG/WebP with reasonable quality and strip metadata.

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const roots = [
  path.resolve('public'),
  path.resolve('src/components'),
  path.resolve('src/assets'),
];

const exts = new Set(['.jpg', '.jpeg', '.png', '.webp']);

async function walk(dir) {
  const out = [];
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...(await walk(full)));
    } else if (exts.has(path.extname(e.name).toLowerCase())) {
      out.push(full);
    }
  }
  return out;
}

function fmtKB(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function compressOne(file) {
  const before = (await fs.promises.stat(file)).size;
  const ext = path.extname(file).toLowerCase();
  let img = sharp(file, { failOn: 'none' }).withMetadata({ orientation: 1 });

  const meta = await img.metadata();
  // Heuristic: cap very large images to 1600px, otherwise 1920px.
  const targetWidth = meta.width && meta.width > 2400 ? 1600 : (meta.width && meta.width > 1920 ? 1920 : undefined);

  if (targetWidth) img = img.resize({ width: targetWidth });

  if (ext === '.jpg' || ext === '.jpeg') {
    // Aggressive for big assets: lower quality when original size is large
    const bigAsset = before > 300 * 1024; // >300KB
    img = img.jpeg({ quality: bigAsset ? 65 : 72, mozjpeg: true, progressive: true, trellisQuantisation: true, overshootDeringing: true });
  } else if (ext === '.png') {
    // Skip micro PNGs to avoid size increases
    if (before < 20 * 1024) {
      return console.log(`${file}  ${fmtKB(before)} -> ${fmtKB(before)}  skipped (small PNG)`);
    }
    // Optimize PNGs (logos) while keeping format; avoid palette for some logos to prevent artifacts
    img = img.png({ compressionLevel: 9, adaptiveFiltering: true, palette: false });
  } else if (ext === '.webp') {
    img = img.webp({ quality: 70 });
  }

  const tmp = `${file}.tmp`;
  await img.toFile(tmp);
  const afterTmp = (await fs.promises.stat(tmp)).size;
  if (afterTmp >= before) {
    await fs.promises.unlink(tmp);
    return console.log(`${file}  ${fmtKB(before)} -> ${fmtKB(before)}  skipped (no gain)`);
  }
  await fs.promises.rename(tmp, file);
  const after = (await fs.promises.stat(file)).size;
  const saved = before - after;
  console.log(`${file}  ${fmtKB(before)} -> ${fmtKB(after)}  saved ${fmtKB(saved)}`);
}

async function run() {
  const allFiles = [];
  for (const root of roots) {
    if (fs.existsSync(root)) {
      allFiles.push(...(await walk(root)));
    }
  }
  if (allFiles.length === 0) {
    console.log('No images found to compress.');
    return;
  }
  console.log(`Found ${allFiles.length} images. Compressing...`);
  let failures = 0;
  for (const f of allFiles) {
    try {
      await compressOne(f);
    } catch (err) {
      failures++;
      console.warn(`Failed to compress ${f}:`, err.message);
    }
  }
  console.log(`Compression complete. Failures: ${failures}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});