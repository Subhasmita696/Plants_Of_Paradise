import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api/catalog": {
        target: "http://127.0.0.1:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/catalog/, "/api/plants"),
      },
      "/api/inventory": {
        target: "http://127.0.0.1:3002",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/inventory/, "/api/inventory"),
      },
      "/api/orders": {
        target: "http://127.0.0.1:3003",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/orders/, "/api/orders"),
      },
      "/api/care-reminders": {
        target: "http://127.0.0.1:3004",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/care-reminders/, "/api/care-reminders"),
      },
    },
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
