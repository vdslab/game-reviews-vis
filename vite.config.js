import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/steamapi": {
        target: "https://api.steampowered.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/steamapi/, ""),
      },
    },
  },
});
