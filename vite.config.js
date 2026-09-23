import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // host: true binds 0.0.0.0 so other devices on the same Wi-Fi can reach it
  server:  { port: 5190, host: true },
  preview: { port: 5190, host: true },
})
