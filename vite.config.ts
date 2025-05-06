import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  define: {
    'process.env': process.env, // Only if you have legacy code needing process.env
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Remove the direct date-fns alias as it's causing issues
    },
  },
  optimizeDeps: {
    include: [
      'date-fns'
    ],
    // Remove explicit excludes as they might interfere
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  }
}));