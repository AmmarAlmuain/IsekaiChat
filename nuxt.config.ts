import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      script: [{
        src: "https://js.pusher.com/8.2.0/pusher.min.js"
      }]
    }
  },
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    mongoDbUri: process.env.mongoDbUri,
    jwtSecret: process.env.jwtSecret,
    imageKitPublicKey: process.env.imageKitPublicKey,
    imageKitPrivateKey: process.env.imageKitPrivateKey,
    imageKitUrlEndpoint: process.env.imageKitUrlEndpoint,
    pusherId: process.env.pusherId,
    pusherKey: process.env.pusherKey,
    pusherSecret: process.env.pusherSecret,
    pusherCluster: process.env.pusherCluster
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
