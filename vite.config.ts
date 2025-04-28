
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && {
      name: 'inject-gptengineer-script',
      transformIndexHtml(html: string) {
        return html.replace(
          '</head>',
          `<script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script></head>`
        );
      }
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
