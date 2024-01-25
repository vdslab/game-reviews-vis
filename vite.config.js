import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/foo': 'https://superb-kataifi-8ae845.netlify.app',
      '/steam': {
        target: 'https://store.steampowered.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/steam/, ''),
      },
      // '/steamv2': {
      //   target: 'https://api.steampowered.com',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/steamv2/, ''),
      // },
      // '/steamspy': {
      //   target: 'https://steamspy.com',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/steamspy/, ''),
      // },
    },
  },
});
