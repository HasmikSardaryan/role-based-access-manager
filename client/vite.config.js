import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    origin: 'http://localhost:5173',
    cors: true,
    hmr: {
      protocol: 'wss',
      host: 'localhost',
    },
    allowedHosts: ['.ngrok-free.app', 'localhost'],
  }
})
