<template>
    <div class="gap-6 flex flex-col w-full justify-center items-center" v-if="user && posts">
        <div
            class="create-post w-full max-w-[600px] h-auto bg-[#151415] border-[#27272A]  border p-6 rounded-md flex justify-center items-center my-2">
            <div class="w-full h-full gap-y-4 flex flex-col">
                <div class="p-4 bg-[#30333260] rounded-md">
                    <div class="contenteditable-textarea resize-none overflow-y-auto outline-none" contenteditable="true" data-placeholder="Type your text here...">
                    </div>
                </div>
                <div class="post-media" v-if="mediaUrl">
                    <img :src="mediaUrl" alt="post-media" class="rounded-md w-full" />
                </div>
                <div class="w-full flex justify-end gap-x-4 rounded-md">
                    <button v-if="mediaStatus"
                        class="image-upload-btn rounded-md cursor-pointer hover:text-emerald-400 transition-all duration-300">
                        <input id="image-upload" type="file" class="hidden" @change="manageMediaStatus($event)" />
                        <label for="image-upload" class="cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                            </svg>

                        </label>
                    </button>
                    <button v-else
                    class="image-upload-btn rounded-md cursor-pointer hover:text-emerald-400 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" @click="manageMediaStatus" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <button @click="mediaByInput ? createPostWithMedia(mediaByInput) : createPost(content)"
                        class="rounded-md cursor-pointer flex justify-center px-6 py-1.5 bg-emerald-500 hover:bg-emerald-600 items-center transition-all duration-300">
                        Share
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
        content: string;

    const createPostWithMedia = async (mediaByInput: File) => {
        loadingAnimation("create-post-process", "start")
        createPost(content, (await upload(mediaByInput as File, generateUuid(), 'postImages')).url as string)
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