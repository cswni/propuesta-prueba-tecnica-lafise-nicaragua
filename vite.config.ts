import {fileURLToPath} from "node:url";
import path from "path"

import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

const PORT = 8081;

// https://vite.dev/config/
export default defineConfig({
   plugins: [
     react(),
     tailwindcss(),
     VitePWA({
       registerType: 'autoUpdate',
       includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
       manifest: {
         name: 'Lafise Transfer App',
         short_name: 'LafiseApp',
         description: 'Transferencias y banca digital Lafise',
         theme_color: '#3B8668',
         background_color: '#ffffff',
         display: 'standalone',
         start_url: '/',
         icons: [
           {
             src: '/icons/icon-192x192.png',
             sizes: '192x192',
             type: 'image/png',
           },
           {
             src: '/icons/icon-512x512.png',
             sizes: '512x512',
             type: 'image/png',
           },
           {
             src: '/icons/icon-512x512.png',
             sizes: '512x512',
             type: 'image/png',
             purpose: 'any maskable',
           },
         ],
       },
       workbox: {
         runtimeCaching: [
           {
             urlPattern: /^https:\/\/.+\.(?:js|css|html|png|svg|jpg|jpeg|webp|woff2?)$/,
             handler: 'CacheFirst',
             options: {
               cacheName: 'assets-cache',
               expiration: {
                 maxEntries: 100,
                 maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
               },
             },
           },
           {
             urlPattern: /^https:\/\/.+\/api\//,
             handler: 'NetworkFirst',
             options: {
               cacheName: 'api-cache',
               networkTimeoutSeconds: 10,
               expiration: {
                 maxEntries: 50,
                 maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
               },
             },
           },
         ],
       },
     })
   ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "lucide-react/icons": fileURLToPath(
          new URL("./node_modules/lucide-react/dist/esm/icons", import.meta.url)
      ),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json','.svg', '.css'],
  },
  server: {
    allowedHosts: [
      'premas.officenet.pro',
    ],
    port: PORT,
    host: true
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendors': [
            'react',
            'react-dom',
            'react-router-dom',
            'react-redux',
            'react-hook-form',
            '@hookform/resolvers',
          ],
          'redux': [
            '@reduxjs/toolkit',
          ],
          'tanstack': [
            '@tanstack/react-table',
          ],
          'icons': [
            'lucide-react',
          ],
          'zod': [
            'zod',
          ],
          'sonner': [
            'sonner',
          ],
          'vaul': [
            'vaul',
          ],
          'classnames': [
            'clsx',
            'class-variance-authority',
            'tailwind-merge',
          ],
          'next-themes': [
            'next-themes',
          ],
          'radix-ui': [
            '@radix-ui/react-checkbox',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-label',
            '@radix-ui/react-select',
            '@radix-ui/react-separator',
            '@radix-ui/react-slot',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toggle',
            '@radix-ui/react-toggle-group',
            '@radix-ui/react-tooltip',
          ],
        }
      }
    }
    }
  })
