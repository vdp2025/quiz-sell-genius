
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Fixing PostCSS configuration
  css: {
    postcss: {
      plugins: [],
    },
    devSourcemap: true,
  },
  server: {
    port: 8080
  }
});
