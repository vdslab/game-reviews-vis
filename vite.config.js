import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://store.steampowered.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/steamspy': {
        target: 'https://steamspy.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/steamspy/, ''),
      },
    },
  },
});
