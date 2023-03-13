import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import vue from '@vitejs/plugin-vue';

import manifest from './manifest';

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
    sourcemap: true,
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    VitePWA({
      includeAssets: ['**/*.{js,css,xml,html,jpg,ico,png,ttf,woff2,webmanifest}'],
      manifest,
      strategies: 'generateSW',
      workbox: {
        mode: 'development',
        runtimeCaching: [
          {
            urlPattern: /https:\/\/api.openweathermap.org\/data\/2.5\/(weather|forecast|air_pollution)\?lat=\d{2}\.\d*&lon=\d{2}\.\d*&appid=[a-zA-Z0-9]*(&units=metric)?/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'weatherData',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 1,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
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
