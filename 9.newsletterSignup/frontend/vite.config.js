import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/frontend-mentor/9.newsletterSignup/' : '/',
  plugins: [
    react(),
    tailwindcss()
  ],
}))