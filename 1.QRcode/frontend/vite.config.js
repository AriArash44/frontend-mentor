import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
    base: mode === 'development' ? '/' : '/frontend-mentor/1.QRcode/',
    server: mode === 'development' ? {
        proxy: {
            '/api': {
                target: 'http://api.qrserver.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    } : {}
}));
