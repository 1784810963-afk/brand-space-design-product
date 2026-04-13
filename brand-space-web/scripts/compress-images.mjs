// 批量压缩 public/project-images 下所有图片
// 运行：node scripts/compress-images.mjs

import sharp from 'sharp';
import { readdir, stat, rename } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT_DIR = join(__dirname, '../public/project-images');

// 压缩参数
const MAX_WIDTH = 1920;   // 最大宽度（px）
const QUALITY = 82;       // JPEG 质量（0-100）

async function formatSize(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + ' MB';
}

async function compressImages() {
  const files = await readdir(INPUT_DIR);
  const images = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

  console.log(`找到 ${images.length} 张图片，开始压缩...\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of images) {
    const filePath = join(INPUT_DIR, file);
    const backupPath = join(INPUT_DIR, file + '.bak');
    const info = await stat(filePath);
    const sizeBefore = info.size;
    totalBefore += sizeBefore;

    try {
      // 读取并压缩
      const buffer = await sharp(filePath)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .jpeg({ quality: QUALITY, progressive: true })
        .toBuffer();

      // 只有压缩后更小才替换
      if (buffer.length < sizeBefore) {
        // 备份原文件
        await rename(filePath, backupPath);
        // 写入压缩后的文件
        await sharp(buffer).jpeg({ quality: QUALITY }).toFile(filePath);
        // 删除备份
        const { unlink } = await import('fs/promises');
        await unlink(backupPath);

        totalAfter += buffer.length;
        const ratio = ((1 - buffer.length / sizeBefore) * 100).toFixed(0);
        console.log(`✓ ${file}`);
        console.log(`  ${await formatSize(sizeBefore)} → ${await formatSize(buffer.length)} (减少 ${ratio}%)`);
      } else {
        totalAfter += sizeBefore;
        console.log(`- ${file} (已最优，跳过)`);
      }
    } catch (err) {
      totalAfter += sizeBefore;
      console.error(`✗ ${file}: ${err.message}`);
    }
  }

  console.log('\n─────────────────────────────');
  console.log(`总计：${await formatSize(totalBefore)} → ${await formatSize(totalAfter)}`);
  console.log(`节省：${await formatSize(totalBefore - totalAfter)} (${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%)`);
}

compressImages().catch(console.error);
