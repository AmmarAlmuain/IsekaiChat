<template>
    <div class="w-full h-full flex justify-center items-center" v-if="user">
        <div
            class="update-account-container w-[500px] flex justify-center items-center flex-col border-2 gap-y-6 p-8 max-sm:rounded-none max-sm:border-l-0 max-sm:border-r-0 max-sm:border-t max-sm:border-b rounded-md border-white/10 bg-[#1c1c1c]">
            <div class="w-11/12 flex justify-between items-center px-2 border-b border-white/10 pb-8">
                <div class="flex justify-start items-center gap-x-3">
                    <div class="account-image w-14 h-full flex justify-center items-center">
                        <img :src="imageDom || user.profileImage" alt="post-img" class="w-14 h-14 rounded-full"/>
                        <!-- <div class="w-14 h-14 rounded-full bg-gray-300"></div>  -->
                    </div>
                    <div class="account-username-and-email flex flex-col justify-center items-start">
                        <h5 class="text-base font-medium"> {{ user.username }} </h5>
                        <p class="text-sm font-light text-white/50"> {{ user.email }} </p>
                    </div>
                </div>
                <button
                    class="image-btn rounded-md cursor-pointer flex justify-end items-center hover:text-emerald-400 transition-all duration-300">
                    <input id="image-upload" type="file" class="hidden" @change="addImage" />
                    <label for="image-upload" class="cursor-pointer">
                        <IconsImage />
                    </label>
                </button>
            </div>
            <form class="px-3 w-full flex flex-col gap-y-4" @submit.prevent="saveProfile(image)">

                <CustomInput name="username" id="username" placeholder="John Doe" type="text" label="Username"
                    :value="user.username" @update:modelValue="onUsernameInput"/>

                <CustomInput name="email" id="email" placeholder="John@eample.com" type="text" label="Email"
                    :value="user.email" @update:modelValue="onEmailInput" />

                <CustomInput name="password" id="password" placeholder="********" type="password" label="Password" 
                    @update:modelValue="onPasswordInput" />

                <div class="w-full py-6">
                    <button type="submit"
                        class="w-full h-10 bg-emerald-700 rounded-md border border-emerald-500 cursor-pointer hover:bg-emerald-600 transition-all duration-300">
                        <span :class="inProcess ? 'loading loading-ring loading-xs' : ''"> Save </span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">

    import Cookies from "js-cookie";
    //@ts-ignore
    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';

    const user: any = useState("user")
    const config = useRuntimeConfig()

    let username: string
    let email: string
    let password = ""
    const inProcess = ref(false)

    if(user.value) {
        username = user.username
        email = user.email
    }

    const onUsernameInput = (value: string) => {
        username = value
    }
    const onEmailInput = (value: string) => {
        email = value
    }
    const onPasswordInput = (value: string) => {
        password = value
    }

    const CLOUD_NAME = config.cloudinaryName;
    const API_KEY = config.cloudinaryApi;

    const imageDom = ref('')
    let imageUrl: string;
    let image: File;

    const addImage = async (event: any) => {

        image = event.target.files[0]
        imageDom.value = URL.createObjectURL(image)
        
    }

    const saveProfile = async (image: File) => {

        inProcess.value = true

        if(image) {
            let formData = new FormData
            formData.append("file", image)
            const response = await $fetch('/api/uploadImage', {
                method: "POST",
                headers: { token: `${Cookies.get("token")}` }
            })
            const { data, error }: any = await useFetch(
                `https://api.cloudinary.com/v1_1/${'dpwqovqym'}/image/upload?api_key=${'858577468763162'}&timestamp=${response.timestamp}&signature=${response.signature}`,
                {
                    method: 'POST',
                    body: formData
                }
            );
            imageUrl = data.value.url
        }

        const body: any = {}

        if(username) {
            body["username"] = username
        }
        if(email) {
            body["email"] = email
        }
        if(password) {
            body["password"] = password
        }
        if(imageUrl) {
            body["profileImage"] = imageUrl
        }

        const { data: response, error }: any = await useFetch('/api/user', {
            method: 'PUT',
            body: {
                ...body
            },
            headers: { token: `${Cookies.get("token")}` }
        })

        if(error.value) {
            toast.error(`${error.value?.data}`, {
                theme: 'dark',
            })
            inProcess.value = false
        }

        else if(response) {
            const user = useState("user")
            user.value = response.value.user
            Cookies.set("token", response.value.token)
            inProcess.value = false
        }

    }

</script>