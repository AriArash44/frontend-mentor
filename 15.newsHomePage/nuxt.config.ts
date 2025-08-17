export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'newsHomePage | Frontend-mentor',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      meta: []
    }
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api'
        : 'https://api.myapp.com'
    }
  }
})