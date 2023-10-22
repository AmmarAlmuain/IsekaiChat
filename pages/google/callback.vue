<template>
</template>

<script setup lang="ts">
    import { defineRouteRules } from 'nuxt/dist/pages/runtime';

    const route = useRoute()
    const params = new URLSearchParams(`${route.hash.substring(1)}`)
    const accessToken = params.get("access_token"),
          idToken = params.get("id_token")
    
    const { data: response, error } = await useFetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`)
    console.log({ user: response.value })

    definePageMeta({
        layout: "empty"
    })
    
</script>