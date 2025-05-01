import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [
        react(),
    ],
    test: {
      globals: true,
      environment: 'jsdon',
      setupFiles: './test/setup.js',
  },
    server: {
        port: 8080
    }
})
