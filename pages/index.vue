<template>
    <div class="gap-6 flex flex-col w-full justify-center items-center" v-if="user && posts">
        <div
            class="create-post w-full max-w-[600px] h-auto bg-[#151415] border-[#27272A]  border p-6 rounded-md flex justify-center items-center my-2">
            <div class="w-full h-full gap-y-4 flex flex-col">
                <div class="flex gap-x-4 justify-center items-start">
                    <img :src="user.profileImage" alt="post-img"
                        class="w-10 h-10 rounded-full mt-2" />
                    <div contenteditable="true" ref="contentFromDiv" @input="manageContent($event)" class="creat-post cursor-text hover:bg-[#30333275] duration-300 transition-all p-4 bg-[#30333260] rounded-md w-full resize-none overflow-y-auto outline-none" data-placeholder="Where you at? What are you doing?">
                    </div>
                </div>
                <div class="post-media" v-if="mediaUrl">
                    <img :src="mediaUrl" alt="post-media" class="rounded-md w-full" />
                </div>
                <div class="w-full flex items-end gap-x-4 rounded-md">
                    <div>
                        <input id="image-upload" type="file" class="hidden" @change="manageMediaStatus($event)" />
                        <label for="image-upload" class="cursor-pointer">
                            <div class="image-upload-btn rounded-md hover:bg-emerald-300/20 active:bg-emerald-500 cursor-pointer flex gap-x-2 justify-center px-6 border border-white/10 py-2 items-center transition-all duration-300">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M2.66992 18.95L7.59992 15.64C8.38992 15.11 9.52992 15.17 10.2399 15.78L10.5699 16.07C11.3499 16.74 12.6099 16.74 13.3899 16.07L17.5499 12.5C18.3299 11.83 19.5899 11.83 20.3699 12.5L21.9999 13.9" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <p> Photo ・ Gif </p>
                            </div>
                        </label>
                    </div>
                    <button @click="mediaByInput ? createPostWithMedia(mediaByInput) : createPost(content)"
                        class="rounded-md cursor-pointer flex gap-x-2 justify-center px-6 hover:bg-emerald-300/20 active:bg-emerald-500 border border-white/10 py-2 items-center transition-all duration-300">
                        <span id="create-post-process"> Share </span>
                    </button>
                </div>
            </div>
        </div>
        <Post :user="post?.userId" :post="post" v-for="post in posts" :key="post"/>
    </div>
</template>

<script setup lang="ts">

    import Pusher from 'pusher-js'

    var pusher = new Pusher(import.meta.env.VITE_pusherKey, {
        cluster: import.meta.env.VITE_pusherCluster
    });

    var channel = pusher.subscribe(import.meta.env.VITE_pusherChannel);

    const user: any = useState("user"),
          { upload } = new useMedia(),
          { create: createPost, entirely: entirelyPost } = new usePost()
    
    let mediaByInput = ref(),
        mediaUrl = ref(),
        posts = ref(await entirelyPost()),
        mediaStatus = ref(true),
        contentFromDiv: any = ref(null),
        content: string;

    const manageContent = (event: any) => {
        content = contentFromDiv?.value?.innerText as string
        console.log(content)
    }

    const createPostWithMedia = async (mediaByInputFunc: File) => {
        loadingAnimation("create-post-process", "start")
        createPost(content, (await upload(mediaByInputFunc as File, generateUuid(), 'postImages')).url as string)
        mediaStatus.value = true
        mediaUrl.value = null
        mediaByInput.value = undefined
        contentFromDiv.value.innerText = ''
        content = ''
    }
        
    const manageMediaStatus = (event: any) => {
        if(!mediaByInput.value) {
            mediaStatus.value = false
            mediaByInput.value = event.target.files[0]
            mediaUrl.value = URL.createObjectURL(mediaByInput.value)
            return mediaByInput
        }
        mediaStatus.value = true
        mediaUrl.value = null
        return mediaByInput.value = undefined
    }

    channel.bind("post:insert", (data: any) => {
        posts.value.unshift(data)
    })

    channel.bind("post:delete", (data: any) => {
        posts.value = posts.value.filter( (el: { _id: string }) => String(el._id) != String(data)
        )
    })

    channel.bind("post:update", (data: any) => {
        const index = posts.value.findIndex((el: { _id: string }) => el._id === data._id);
        posts.value[index] = data;
    })

</script>