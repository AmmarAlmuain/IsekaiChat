<template>
    <section class="h-screen text-white flex p-4 max-sm:p-0 justify-center items-center relative">
        <div
            class="login-form-wrapper w-full max-w-[500px] border rounded-md max-sm:rounded-none max-sm:border-l-0 max-sm:border-r-0 max-sm:border-t max-sm:border-b border-white/10 p-8 flex flex-col justify-center items-center bg-[#1c1c1c]">
            <form class="login-form flex flex-col w-full justify-center max-w-[384px] items-center gap-y-4" @submit.prevent="loginEmailPassword(email, password)">
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

                <CustomInput name="email" id="email" placeholder="John@example.com" type="text" label="Email"
                    @update:modelValue="onEmailInput" />

                <CustomInput name="password" id="password" placeholder="********" type="password" label="Password"
                    @update:modelValue="onPasswordInput" />

                <div class="w-full py-6">
                    <button type="submit" class="w-full h-10 bg-emerald-700 rounded-md border border-emerald-500 cursor-pointer hover:bg-emerald-600 transition-all duration-300">
                        <span id="login-process"> Login </span>
                    </button>
                </div>
            </form>
        </div>
    </section>
</template>

<script setup lang="ts">

    const email = ref("");
    const password = ref("");

    const onEmailInput = (value: string) => {
        email.value = value
    }
    const onPasswordInput = (value: string) => {
        password.value = value
    }

    const { loginEmailPassword } = new useAuth()

    definePageMeta({
        layout: "empty"
    })

</script>
