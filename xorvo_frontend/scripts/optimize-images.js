import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const optimizeImages = async () => {
  const publicDir = path.join(process.cwd(), 'public');
  const imagesDir = path.join(publicDir, 'images');
  const optimizedDir = path.join(publicDir, 'optimized');

  // Create optimized directory if it doesn't exist
  if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir, { recursive: true });
  }

  // Large images that need optimization
  const largeImages = [
    'modern-equipped-computer-lab.jpg',
    'franz-hajak-LmmmhFhWA7k-unsplash.jpg',
    'pexels-divinetechygirl-1181354.jpg',
    'about_us_homepage.webm',
    '3130182-uhd_3840_2160_30fps (1).webm'
  ];

  for (const image of largeImages) {
    const inputPath = path.join(publicDir, image);
    const outputPath = path.join(optimizedDir, image);

    try {
      if (fs.existsSync(inputPath)) {
        await sharp(inputPath)
          .resize(1920, 1080, { 
            fit: 'inside',
            withoutEnlargement: true 
          })
          .jpeg({ 
            quality: 80,
            progressive: true 
          })
          .toFile(outputPath.replace(/\.[^/.]+$/, '.jpg'));
        
        console.log(`Optimized: ${image}`);
      }
    } catch (error) {
      console.error(`Error optimizing ${image}:`, error.message);
    }
  }
};

optimizeImages().catch(console.error);
