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
                <button v-if="mediaStatus"
                    class="image-upload-btn rounded-md cursor-pointer px-4 flex justify-end items-center hover:text-emerald-400 transition-all duration-300">
                    <input id="image-upload" type="file" class="hidden" @change="manageMediaStatus($event)" />
                    <label for="image-upload" class="cursor-pointer">
                        <IconsImage />
                    </label>
                </button>
                <button v-else
                    class="image-upload-btn rounded-md cursor-pointer px-4 flex justify-end items-center hover:text-emerald-400 transition-all duration-300">
                    <IconsXMark  @click="manageMediaStatus"/>
                </button>
                <button
                    class="up-right-arrow-btn rounded-md cursor-pointer flex justify-start px-4 items-center hover:text-emerald-400 transition-all duration-300">
                    <span id="create-post-process">
                        <IconsUpRightArrow @click="mediaByInput ? createPostWithMedia(mediaByInput) : createPost(content)"/>
                    </span>
                </button>
            </div>
        </div>
        <Post :user="post?.userId" :post="post" v-for="post in posts" :key="post"/>
    </div>
</template>

<script setup lang="ts">

    import io from 'socket.io-client'

    const user: any = useState("user"),
          { upload } = new useMedia(),
          { create: createPost, entirely: entirelyPost } = new usePost(),
          socket = io(`${import.meta.env.VITE_socketServerUrl}`)
    
    let mediaByInput = ref(),
        posts = ref(await entirelyPost()),
        mediaStatus = ref(true),
        content: string;

    const createPostWithMedia = async (mediaByInput: File) => {
        loadingAnimation("create-post-process", "start")
        createPost(content, (await upload(mediaByInput as File, generateUuid(), 'postImages')).url as string)
    }
        
    const manageMediaStatus = (event: any) => {
        if(!mediaByInput.value) {
            mediaStatus.value = false
            return mediaByInput.value = event.target.files[0]
        }
        mediaStatus.value = true
        return mediaByInput.value = undefined
    }

    socket.on("post:insert", (data) => {
        posts.value.unshift(data)
    })

    socket.on("post:delete", (data) => {
        posts.value = posts.value.filter( (el: { _id: string }) => String(el._id) != String(data)
        )
    })

    socket.on("post:update", (data) => {
        const index = posts.value.findIndex((el: { _id: string }) => el._id === data._id);
        posts.value[index] = data;
    })

</script>