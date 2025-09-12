import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // Ensure environment variables are available in build
    __DEV__: mode === 'development',
  },
  build: {
    sourcemap: false, // Disable source maps in production for security
    rollupOptions: {
      external: (id) => {
        // Only prevent bundling of Node.js built-in modules, not npm packages or file paths
        return id.startsWith('node:') || 
               (id === 'fs' || id === 'path' || id === 'crypto' || id === 'os' || id === 'util');
      }
    }
  }
}));
