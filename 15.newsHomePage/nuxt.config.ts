export default defineNuxtConfig({
  ssr: true,
  nitro: { preset: 'static' },
  modules: ['@nuxtjs/tailwindcss'],
  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/main.css'
  ],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    baseURL: process.env.NODE_ENV === 'development'
      ? '/'
      : '/frontend-mentor/15.newsHomePage',
    head: {
      title: 'newsHomePage | Frontend-mentor',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      meta: [
        { name: 'author', content: 'Arash' },
        { name: 'description', content: 'A training project from Frontend Mentor developed using Nuxt.' },
        { name: 'keywords', content: 'news, homepage, web development, frontend mentor, Nuxt, training project, Web 3.0, tech news' },
        { property: 'og:title', content: 'The Bright Future of Web 3.0?' },
        { property: 'og:description', content: 'A training project from Frontend Mentor developed using Nuxt.' },
        { property: 'og:image', content: '/images/image-web-3-desktop.jpg' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : 'https://yourdomain.com/frontend-mentor/15.newsHomePage' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'The Bright Future of Web 3.0?' },
        { name: 'twitter:description', content: 'A training project from Frontend Mentor developed using Nuxt.' },
        { name: 'twitter:image', content: '/images/image-web-3-desktop.jpg' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api'
        : '/api'
    }
  }
})