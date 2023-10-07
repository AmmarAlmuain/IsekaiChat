<template>
    <div class="w-full h-full flex justify-center items-center" v-if="user">
        <div
            class="update-account-container w-[500px] flex justify-center items-center flex-col border-2 gap-y-6 p-8 max-sm:rounded-none max-sm:border-l-0 max-sm:border-r-0 max-sm:border-t max-sm:border-b rounded-md border-white/10 bg-[#1c1c1c]">
            <div class="w-11/12 flex justify-between items-center px-2 border-b border-white/10 pb-8">
                <div class="flex justify-start items-center gap-x-3">
                    <div class="account-image w-14 h-full flex justify-center items-center">
                        <img :src="imageDom || user.profileImage" alt="post-img" class="w-14 h-14 rounded-full"/>
                    </div>
                    <div class="account-username-and-email flex flex-col justify-center items-start">
                        <h5 class="text-base font-medium"> {{ user.username }} </h5>
                        <p class="text-sm font-light text-white/50"> {{ user.email }} </p>
                    </div>
                </div>
                <button
                    class="image-btn rounded-md cursor-pointer flex justify-end items-center hover:text-emerald-400 transition-all duration-300">
                    <input id="image-upload" type="file" class="hidden" @change="manageMedia" />
                    <label for="image-upload" class="cursor-pointer">
                        <IconsImage />
                    </label>
                </button>
            </div>
            <form class="px-3 w-full flex flex-col gap-y-4" @submit.prevent="manageProfile(image)">

                <CustomInput name="username" id="username" placeholder="John Doe" type="text" label="Username"
                    :value="user.username" @update:modelValue="onUsernameInput"/>

                <CustomInput name="email" id="email" placeholder="John@example.com" type="text" label="Email"
                    :value="user.email" @update:modelValue="onEmailInput" />

                <CustomInput name="password" id="password" placeholder="********" type="password" label="Password" 
                    @update:modelValue="onPasswordInput" />

                <div class="w-full py-6">
                    <button type="submit"
                        class="w-full h-10 bg-emerald-700 rounded-md border border-emerald-500 cursor-pointer hover:bg-emerald-600 transition-all duration-300">
                        <span id="save-profile-changes-process"> Save </span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">

    const user: any = useState("user")
    const { upload } = new useMedia()
    const { update: updateUser, get: getUser } = new useUser()

    let username: string
    let email: string
    let password = ""

    const onUsernameInput = (value: string) => {
        username = value
    }
    const onEmailInput = (value: string) => {
        email = value
    }
    const onPasswordInput = (value: string) => {
        password = value
    }

    const imageDom = ref('')
    let imageUrl: string;
    let image: File;

    const manageMedia = async (event: any) => {
        image = event.target.files[0]
        imageDom.value = URL.createObjectURL(image)
    }

    const manageProfile = async (image: File) => {

        if(image) {
            imageUrl = (await upload(image, generateUuid(), "profileImages")).url
        }

        const body = {
            ...(username && { username }),
            ...(email && { email }),
            ...(password && { password }),
            ...(imageUrl && { profileImage: imageUrl }),
        };

        const isUpdated = await updateUser(body)
        if(isUpdated) {
            user.value = await getUser()
        }
        

    }

</script>