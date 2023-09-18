<template>
    <div class="overflow-hidden">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">

    import Cookies from "js-cookie";

    const user = useState("user")
    const post = useState("posts")

    if(Cookies.get("token")) {
        const { data: user, error } = await useFetch(`/api/user/`, {
            method: 'POST',
            headers: { "token": `${Cookies.get("token")}` },
            onResponseError({ request, options, error }) {
                const logout = () => {
                Cookies.remove('token')
                const user = useState("user")
                user.value = undefined
                navigateTo("/login")
                }
                logout()
            }
        })
        if(user) {
            useState("user", () => {
                return user
            })
        }
        
        const { data: post } = await useFetch('/api/post/entirely', {
            method: 'POST',
            headers: { token: `${Cookies.get("token")}` }
        })
        
        if(post) {
            useState("posts", () => {
                return post
            })
        }
    }

</script>
