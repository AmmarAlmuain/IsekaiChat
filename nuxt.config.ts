import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", '@nuxtjs/algolia'],
  runtimeConfig: {
    mongoDbUri: process.env.mongoDbUri,
    jwtSecret: process.env.jwtSecret,
    cloudinaryName: process.env.cloudinaryName,
    cloudinaryApi: process.env.cloudinaryApi,
    cloudinarySecret: process.env.cloudinarySecret,
    algoliaAppId: process.env.algoliaAppId,
    algoliaApiKey: process.env.algoliaApiKey,
    algoliaIndexName: process.env.algoliaIndexName
  },
  nitro: {
    plugins: ["~/server/database/index.ts", "~/server/algolia/index.ts"],
  }
})
