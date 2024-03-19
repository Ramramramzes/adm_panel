import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/admins": "http://localhost:3001",
      "/workers": "http://localhost:3001",
      "/set_adm_token": "http://localhost:3001",
      "/setWorker": "http://localhost:3001",
      "/delWorker": "http://localhost:3001",
      "/addComment": "http://localhost:3001",
      "/get-cookie": "http://localhost:3001",
      "/set-cookie": "http://localhost:3001",
    }
  }
})
