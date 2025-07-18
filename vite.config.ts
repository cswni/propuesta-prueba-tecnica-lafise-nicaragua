import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import {fileURLToPath} from "node:url";

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
  },
  server: {
    allowedHosts: [
      'premas.officenet.pro',
    ],
    port: PORT,
    host: true
  },
})
