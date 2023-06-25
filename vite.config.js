import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgrPlugin()],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".vue"],
  },
  server: {
    host: true,
    open: true,
    port: 5001,
  },
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 1600,
    minify: false,
  },
});
