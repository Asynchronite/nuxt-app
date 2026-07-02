import tailwindcss from "@tailwindcss/vite";
 
export default defineNuxtConfig({
  compatibilityDate: "2025-05-01",
 
  css: ["~/assets/css/main.css"],

  modules: ["@nuxt/ui", "@nuxt/icon", "nuxt-auth-utils"],
  
  ui: {
    prefix: 'Nuxt',
  },

  routeRules: {
    "/": { prerender: true },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },
  
  vite: {
    plugins: [tailwindcss()],
  },
});