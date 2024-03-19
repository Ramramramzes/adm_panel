import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/admins": "http://localhost:3001",
      "/api/workers": "http://localhost:3001",
      "/api/set_adm_token": "http://localhost:3001",
      "/api/setWorker": "http://localhost:3001",
      "/api/delWorker": "http://localhost:3001",
      "/api/addComment": "http://localhost:3001",
      "/api/get-cookie": "http://localhost:3001",
      "/api/set-cookie": "http://localhost:3001",
    }
  }
})
