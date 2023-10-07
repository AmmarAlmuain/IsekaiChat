import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    mongoDbUri: process.env.mongoDbUri,
    jwtSecret: process.env.jwtSecret,
    socketClientUrl: process.env.VITE_socketClientUrl,
    imageKitPublicKey: process.env.imageKitPublicKey,
    imageKitPrivateKey: process.env.imageKitPrivateKey,
    imageKitUrlEndpoint: process.env.imageKitUrlEndpoint
  },
  nitro: {
    plugins: ["~/server/database/index.ts", "~/server/socket/post.ts"],
  },
  imports: {
    dirs: [
      'composables/**'
    ]
  },
})
