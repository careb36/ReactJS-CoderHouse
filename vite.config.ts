import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    // Fast Refresh habilitado por defecto; opcionalmente forzamos
    jsxImportSource: undefined,
  })],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    hmr: { overlay: true },
  },
})
