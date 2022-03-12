import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({})],

  build: {
    outDir: "../api/src/build",
  },
  server: {
    host: true,
  },
});
