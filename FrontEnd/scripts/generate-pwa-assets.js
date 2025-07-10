import { generateAssets } from '@vite-pwa/assets-generator/config';

generateAssets({
  head: true,
  preset: {
    transparent: {
      sizes: [64, 192, 512],
      favicons: [[64, 'favicon.ico']],
    },
    maskable: {
      sizes: [512],
    },
    apple: {
      sizes: [180],
    },
  },
  images: ['public/logo.png'], // Make sure to add your logo here
}); 