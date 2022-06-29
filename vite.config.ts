import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";
// const path = require('path')


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/components": path.resolve(__dirname, "./src/components"),
      // "@/models": path.resolve(__dirname, "./src/models/*"),
      // "@/public": path.resolve(__dirname, "./public/*"),
      // "@/use": path.resolve(__dirname, "./src/use/*"),
      // "@/redux": path.resolve(__dirname, "./src/redux/*"),
      // "@/ctx": path.resolve(__dirname, "./src/context/*"),
      // "@/api": path.resolve(__dirname, "./src/api/*"),
      // "@/utils": path.resolve(__dirname, "./src/utils/*")
    }
  }
})
