<template>
    <div class="h-screen text-white flex p-4 max-sm:p-0 justify-center items-center relative">
        <section
            class="login-form w-full max-w-[500px] border rounded-md max-sm:rounded-none max-sm:border-l-0 max-sm:border-r-0 max-sm:border-t max-sm:border-b border-white/10 p-8 flex flex-col justify-center items-center bg-[#1c1c1c]">
            <form class="flex flex-col w-full justify-center max-w-[384px] items-center gap-y-4" @submit.prevent="login(email, password)">
                <div class="form-message flex justify-start items-start flex-col gap-y-2 mb-6 w-full">
                    <h1 class="main-message text-3xl font-semibold">Welcome back</h1>
                    <p class="sub-message text-[#bbb] text-sm font-semibold">
                        Log in to your account
                    </p>
                    <NuxtLink to="/register">
                        <span class="to-register text-sm font-semibold text-emerald-400 cursor-pointer">
                            Create New Account
                        </span>
                    </NuxtLink>
                </div>

                <CustomInput name="email" id="email" placeholder="John@eample.com" type="text" label="Email"
                    @update:modelValue="onEmailInput" />

                <CustomInput name="password" id="password" placeholder="********" type="password" label="Password"
                    @update:modelValue="onPasswordInput" />

                <div class="w-full py-6">
                    <button type="submit" class="w-full h-10 bg-emerald-700 rounded-md border border-emerald-500 cursor-pointer hover:bg-emerald-600 transition-all duration-300">
                        <span :class="inProcess ? 'loading loading-ring loading-xs' : ''"> Login </span>
                    </button>
                </div>
            </form>
        </section>
    </div>
</template>

<script setup lang="ts">

    //@ts-ignore
    import previousTuesday from 'date-fns/esm/previousTuesday';
import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';

    definePageMeta({
        layout: "empty"
    })

    const email = ref("");
    const password = ref("");
    const error = ref("");
    const inProcess = ref(false)

    const onEmailInput = (value: string) => {
        email.value = value
    }
    const onPasswordInput = (value: string) => {
        password.value = value
    }
    
    const login = async (email: string, password: string) => {
        inProcess.value = true
        const { data: response, error } = await useFetch('/api/auth/login', {
            method: 'POST',
            body: {
                email,
                password
            }
        })
        if(error.value) {
            toast.error(`${error.value?.data}`, {
                theme: 'dark',
            })
            inProcess.value = false
        } else {
            const token = useCookie("token")
            if(token.value) {
            } else {
                document.cookie = `token=${String(response.value)};`
            }
            const { data: user } = await useFetch(`/api/user/`, {
                method: 'POST',
                headers: { "token": `${response.value}` }
            })
            const { data: posts, error }: any = await useFetch('/api/post/entirely', {
                method: 'POST',
                headers: { token: `${response.value}` }
            })
            if(user) {
                useState("user", () => {
                    return user
                })
            }
            if(posts) {
                useState("posts", () => {
                    return posts
                })
            }
            inProcess.value = false
            navigateTo("/")
        }
    }

</script>
