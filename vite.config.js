import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://45.76.191.227",
        changeOrigin: true,
        secure: false, 
        rewrite: (path) => path.replace(/^\/api/, ""), 
      },
    },
  },
});
