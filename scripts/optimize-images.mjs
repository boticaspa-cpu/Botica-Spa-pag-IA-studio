import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const publicDir = '/Users/mariawignall/Desktop/botica spa pag web github/Botica-Spa-pag-IA-studio/public';

// Target widths and quality by image type
const configs = {
  // Blog hero images: max 1200px wide, quality 80
  blog: { width: 1200, quality: 80 },
  // Gallery images: max 1400px wide, quality 82
  galeria: { width: 1400, quality: 82 },
  // Service images (masaje-*): max 900px wide, quality 82
  masaje: { width: 900, quality: 82 },
  // Spa interior/detail: max 1400px wide, quality 82
  spa: { width: 1400, quality: 82 },
  // og-image: keep as is, just compress
  og: { width: 1200, quality: 85 },
};

function getConfig(filename) {
  if (filename.startsWith('blog-')) return configs.blog;
  if (filename.startsWith('galeria-')) return configs.galeria;
  if (filename.startsWith('masaje-')) return configs.masaje;
  if (filename.startsWith('spa-')) return configs.spa;
  if (filename.startsWith('og-')) return configs.og;
  return { width: 1200, quality: 80 };
}

const files = await readdir(publicDir);
const images = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f) && f !== 'logo.png');

let totalBefore = 0;
let totalAfter = 0;

for (const file of images) {
  const inputPath = join(publicDir, file);
  const outputName = basename(file, extname(file)) + '.webp';
  const outputPath = join(publicDir, outputName);

  const { size: sizeBefore } = await stat(inputPath);
  const cfg = getConfig(file);

  try {
    const info = await sharp(inputPath)
      .resize(cfg.width, null, { withoutEnlargement: true, fit: 'inside' })
      .webp({ quality: cfg.quality, effort: 6 })
      .toFile(outputPath);

    const { size: sizeAfter } = await stat(outputPath);
    const savings = ((sizeBefore - sizeAfter) / sizeBefore * 100).toFixed(1);
    console.log(`✓ ${file} → ${outputName}  ${(sizeBefore/1024/1024).toFixed(1)}MB → ${(sizeAfter/1024).toFixed(0)}KB  (-${savings}%)`);
    totalBefore += sizeBefore;
    totalAfter += sizeAfter;
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`);
  }
}

console.log(`\nTotal: ${(totalBefore/1024/1024).toFixed(1)}MB → ${(totalAfter/1024/1024).toFixed(1)}MB`);
