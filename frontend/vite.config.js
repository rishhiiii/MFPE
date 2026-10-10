import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  // Compresses raster/SVG assets at build time (lovell/sharp + SVGO) so large
  // source photos don't ship as-is. The plugin's own default JPEG quality is
  // 100, which only re-encodes already-compressed photos larger — 75 is the
  // standard "no visible difference, real savings" target instead.
  plugins: [
    react(),
    ViteImageOptimizer({
      jpeg: { quality: 75 },
      jpg: { quality: 75 },
    }),
  ],
  server: {
    port: 3000,
  },
})
