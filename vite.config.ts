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
  // Desabilitando PostCSS temporariamente para debug
  css: {
    postcss: false,
    devSourcemap: true,
  },
  server: {
    port: 8080
  }
});
