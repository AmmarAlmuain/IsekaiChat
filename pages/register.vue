<template>
    <section class="h-screen text-white flex p-4 max-sm:p-0 justify-center items-center relative">
        <div
            class="register-form-wrapper w-full max-w-[500px] border max-sm:rounded-none max-sm:border-l-0 max-sm:border-r-0 max-sm:border-t max-sm:border-b rounded-md border-white/10 p-8 flex flex-col justify-center items-center bg-[#1c1c1c]">
            <form class="register-form flex flex-col w-full justify-center max-w-[384px] items-center gap-y-4"
                @submit.prevent="register(username, email, password)">
                <div class="form-message flex justify-start items-start flex-col gap-y-2 mb-6 w-full">
                    <h1 class="main-message text-3xl font-semibold text-white">Join the fun</h1>
                    <p class="sub-message text-[#bbb] text-sm font-semibold">
                        Create your account today
                    </p>
                    <NuxtLink to="/login">
                        <span class="to-login text-sm font-semibold text-emerald-400 cursor-pointer">
                            Already have account
                        </span>
                    </NuxtLink>
                </div>

                <CustomInput name="username" id="username" placeholder="John Doe" type="text" label="Username"
                    @update:modelValue="onUsernameInput" />

                <CustomInput name="email" id="email" placeholder="John@example.com" type="text" label="Email"
                    @update:modelValue="onEmailInput" />

                <CustomInput name="password" id="password" placeholder="********" type="password" label="Password"
                    @update:modelValue="onPasswordInput" />

                <div class="w-full flex flex-col gap-y-2">
                    <button type="submit" class="w-full h-10 bg-emerald-700 rounded-md border border-emerald-500 cursor-pointer hover:bg-emerald-600 transition-all duration-300">
                        <span id="register-process"> Register </span>
                    </button>
                    <div class="divider text-xs text-white/75 mt-2 mb-2">OR</div>
                    <div class="flex w-ful justify-between items-center gap-x-2">
                        <div @click="loginGoogle"
                            class="google-login-btn flex-1 h-10 text-white text-sm hover:bg-white/20 active:text-[#151415] active:bg-white border border-white/10 py-2 rounded-md flex justify-center items-center gap-x-4 cursor-pointer transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 18 18" fill="none"
                                role="img" class="icon ">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M17.64 9.20419C17.64 8.56601 17.5827 7.95237 17.4764 7.36328H9V10.8446H13.8436C13.635 11.9696 13.0009 12.9228 12.0477 13.561V15.8192H14.9564C16.6582 14.2524 17.64 11.9451 17.64 9.20419Z"
                                    fill="#4285F4"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M8.99976 18C11.4298 18 13.467 17.1941 14.9561 15.8195L12.0475 13.5613C11.2416 14.1013 10.2107 14.4204 8.99976 14.4204C6.65567 14.4204 4.67158 12.8372 3.96385 10.71H0.957031V13.0418C2.43794 15.9831 5.48158 18 8.99976 18Z"
                                    fill="#34A853"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M3.96409 10.7098C3.78409 10.1698 3.68182 9.59301 3.68182 8.99983C3.68182 8.40664 3.78409 7.82983 3.96409 7.28983V4.95801H0.957273C0.347727 6.17301 0 7.54755 0 8.99983C0 10.4521 0.347727 11.8266 0.957273 13.0416L3.96409 10.7098Z"
                                    fill="#FBBC05"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M8.99976 3.57955C10.3211 3.57955 11.5075 4.03364 12.4402 4.92545L15.0216 2.34409C13.4629 0.891818 11.4257 0 8.99976 0C5.48158 0 2.43794 2.01682 0.957031 4.95818L3.96385 7.29C4.67158 5.16273 6.65567 3.57955 8.99976 3.57955Z"
                                    fill="#EA4335"></path>
                            </svg> <span> Sign in with Google </span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </section>
</template>

<script setup lang="ts">

    const username = ref("");
    const email = ref("");
    const password = ref("");

    const onUsernameInput = (value: string) => {
        username.value = value
    }
    const onEmailInput = (value: string) => {
        email.value = value
    }
    const onPasswordInput = (value: string) => {
        password.value = value
    }

    const { register, loginGoogle } = new useAuth()

    definePageMeta({
        layout: "empty"
    })

</script>
