import {fileURLToPath} from "node:url";
import path from "path"

import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'



const PORT = 8081;

// https://vite.dev/config/
export default defineConfig({
   plugins: [react(), tailwindcss()],
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
