import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
  },
  preview: {
    port: 4173,
  },
  build: {
    target: 'esnext',
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    VitePWA({
      includeAssets: ['**/*.{js,css,html,jpg,ico,png,ttf,woff2}'],
    }),
    quasar({
      sassVariables: 'src/quasar-variables.sass',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  envDir: './',
});
