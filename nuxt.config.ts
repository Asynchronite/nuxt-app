import tailwindcss from "@tailwindcss/vite";
 
export default defineNuxtConfig({
  compatibilityDate: "2025-05-01",
 
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/ui"],
  ui: {
    prefix: 'Nuxt',
  },
 
  vite: {
    plugins: [tailwindcss()],
  },
});