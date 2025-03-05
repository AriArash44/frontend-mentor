import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
    base: mode === 'development' ? '/' : '/frontend-mentor/1.QRcode/',
    server: {
        proxy: {
            '/api': {
                target: 'https://api.qr-code-generator.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
}));
