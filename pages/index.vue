<template>
    <div class="gap-6 flex flex-col w-full justify-center items-center" v-if="user && posts">
        <div
            class="create-post w-full max-w-[500px] h-12 flex justify-center items-center my-2 border border-white/10">
            <div class="current-user-image px-4 h-full flex justify-center items-center border-r border-white/10">
                <img :src="user.profileImage" alt="current-user-image" class="w-8 h-8 rounded-full min-w-fit min-h-fit" />
            </div>
            <div class="post-content-input w-full flex">
                <input type="text"
                    class="w-full h-8 bg-transparent text-sm px-4 outline-none border-none placeholder:text-white/30"
                    placeholder="What are you up to today?" v-model="content">
                <button
                    class="image-btn rounded-md cursor-pointer px-4 flex justify-end items-center hover:text-emerald-400 transition-all duration-300">
                    <input id="image-upload" type="file" class="hidden" @change="addImage" />
                    <label for="image-upload" class="cursor-pointer">
                        <IconsImage />
                    </label>
                </button>
                <button
                    class="up-right-arrow-btn rounded-md cursor-pointer flex justify-start px-4 items-center hover:text-emerald-400 transition-all duration-300">
                    <IconsUpRightArrow v-if="!inProcess" @click="createPost(imageByInput as File)"/>
                    <span v-else :class="inProcess ? 'loading loading-ring loading-xs' : ''"></span>
                </button>
            </div>
        </div>
        <Post :user="post.userId" :comments="post.comment" :media="post.media" :content="post.content" :date="post.createdAt" :admires="post.admire" :slug="post.slug"  v-for="post in posts" :key="post" v-if="!searchedPosts"/>
        <Post :user="searchedPost.userId" :comments="searchedPost.comment" :media="searchedPost.media" :content="searchedPost.content" :date="searchedPost.createdAt" :admires="searchedPost.admire" :slug="searchedPost.slug"  v-for="searchedPost in searchedPosts" :key="searchedPost" v-else/>
    </div>
</template>

<script setup lang="ts">

    import Cookies from "js-cookie";
    //@ts-ignore
    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';

    const user: any = useState("user")
    const posts: any = useState("posts")
    const searchedPosts: any = useState("searchedPosts")
    const config = useRuntimeConfig()

    const CLOUD_NAME = config.cloudinaryName;
    const API_KEY = config.cloudinaryApi;

    let imageByInput: File | undefined,
        imageUrl: string,
        content: string;

    const inProcess = ref(false)
        

    const addImage = (event: any) => {
        imageByInput = event.target.files[0]
    }

    const createPost = async (image: File) => {
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
            if(error.value) {
                toast.error(`${error.value?.data}`, {
                    theme: 'dark',
                })
                inProcess.value = false
            } 
            imageUrl = data.value.url
        }
        const { data: response, error }: any = await useFetch('/api/post', {
            method: 'POST',
            body: {
                content: content, media: imageUrl || ''
            },
            headers: { token: `${Cookies.get("token")}` }
        })

        if(error.value) {
            toast.error(`${error.value?.data}`, {
                theme: 'dark',
            })
            inProcess.value = false
        } 
        
        if(response) {
            content = ''
            imageByInput = undefined
            imageUrl = ''
            inProcess.value = false
            posts.value.unshift(response.value)
        }
    }

</script>