import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Ensure PostCSS processing for TailwindCSS
export default defineConfig({
  plugins: [
    react(),
  ],
});
