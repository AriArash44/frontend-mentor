import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/6.fourCard/' : '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
}))
