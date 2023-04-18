// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  googleFonts: {
    families: {
      'Fira Code': true
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts", 'nuxt-icon', "nuxt-lodash"],
  // buildModules: ["@nuxtjs/google-fonts"],
  nitro: {
    preset: "cloudflare",
  },
});
