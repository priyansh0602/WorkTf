import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

/**
 * Vite configuration for WorkTF AI web app.
 * Path aliases are kept in sync with tsconfig.json.
 *
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@store": path.resolve(__dirname, "src/store"),
      "@lib": path.resolve(__dirname, "src/lib"),
      "@types": path.resolve(__dirname, "src/types"),
      "@styles": path.resolve(__dirname, "src/styles"),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
