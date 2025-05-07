import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'ie >= 11'],  // Targets modern browsers and IE11
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],  // Adds necessary polyfills for IE11
    })
  ]
})
