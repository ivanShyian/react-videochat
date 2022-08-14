import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";
import svgr from 'vite-plugin-svgr'
// const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    drop: ['console', 'debugger']
  },
  plugins: [
    react(),
    svgr()
  ],
  resolve: {
    alias: {
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/api": path.resolve(__dirname, "./src/api"),
      "@/use": path.resolve(__dirname, "./src/use"),
      "@/models": path.resolve(__dirname, "./src/models"),
      "@/store": path.resolve(__dirname, "./src/store"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@/assets": path.resolve(__dirname, "./src/assets"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      // "@/ctx": path.resolve(__dirname, "./src/context/*"),
    }
  }
})
