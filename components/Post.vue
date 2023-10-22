<template>
    <div class="max-w-[600px] w-full flex justify-center items-center border-[#27272A] border gap-y-4 flex-col max-sm:rounded-none max-sm:border-l-0 max-sm:border-r-0 max-sm:border-t max-sm:border-b rounded-md border-white/10 bg-[#151415] p-6">
        <div class="author w-full flex justify-between items-center">
            <div class="flex justify-start items-center gap-x-2">
                <div class="img-side w-10 h-full flex justify-center items-center">
                    <img :src="props.user.profileImage" alt="post-img"
                        class="w-10 h-10 rounded-full" />
                </div>
                <div class="user-username-and-time-side flex flex-col justify-center items-start">
                    <h5 class="text-base font-medium"> {{ props.user.username}} </h5>
                    <div class="flex justify-center items-center text-sm font-light text-white/50">
                        <p> 
                            {{ formatDate(props.post.createdAt) }}
                        </p>
                        <p v-if="user.username == props.user.username">・</p>
                        <span v-if="user.username == props.user.username" :id="`delete-comment-process-${index}`" class="hover:text-rose-500 cursor-pointer duration-300 transition-all" @click="deletePost(`delete-comment-process-${index}`, props.post.slug)"> delete post</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="post-content text-sm text-white w-full text-left">
            {{  props.post.content }}
        </div>
        <div class="post-media" v-if="props.post.media">
            <img :src="props.post.media" alt="post-media" class="rounded-md" />
        </div>
        <div class="post-current-likes-counter w-full flex justify-start items-center gap-x-2">
            <button class="heart-btn" v-if="!isAdmired" @click="manageAdmireFunctionResponse(props.post.slug)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
                    class="w-8 h-8 cursor-pointer text-[#303332] hover:text-rose-300 duration-300 transition-all">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
            </button>
            <button v-else @click="manageAdmireFunctionResponse(props.post.slug)"
                class="heart-btn-active">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#f43f5e" viewBox="0 0 24 24"
                    class="w-8 h-8 cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
            </button>
            <p class="text-white/75"> {{ `${props.post.admires.length}  .` }} people like this </p>
        </div>
        <div class="post-comments flex justify-start w-full">
            <div> <p class="text-emerald-500"> Comments: </p> </div>
        </div>
        <div class="post-add-comment px-4 w-full h-16 flex justify-center items-center bg-[#30333260] rounded-md">
            <div class="comment-user-pfp h-full flex justify-center items-center">
                <img :src="user.profileImage" alt="post-img"
                    class="w-8 h-8 rounded-full min-w-fit min-h-fit" />
            </div>
            <div class="comment-inputs w-full flex justify-center items-center">
                <input type="text"
                    class="w-full h-8 bg-transparent text-sm px-4 outline-none border-none placeholder:text-white/30"
                    placeholder="Add your comment..." v-model="commentContent">
                <button @click="comment(`create-comment-process-${index}`, commentContent, props.post.slug)"
                    class="create-comment-btn rounded-md cursor-pointer flex justify-center px-6 py-1.5 bg-emerald-500 hover:bg-emerald-600 items-center transition-all duration-300">
                    <span :id="`create-comment-process-${index}`"> Comment  </span>
                </button>
            </div>
        </div>
        <div class="all-comments w-full h-full flex flex-col gap-y-1" v-if="$props.post.comments.length != 0">
            <div class="comment w-full gap-x-4 h-full items-center flex rounded-md justify-start px-4 text-left py-2 bg-[#30333260]" v-for="comment in props.post.comments">
                <div class="w-6 h-full flex justify-start items-center">
                    <img :src="comment.userId.profileImage"
                        alt="commented-user-pfp" class="w-6 h-6 rounded-full min-w-fit">
                </div>
                <div class="flex justify-start items-center max-w-[440px] flex-grow text-sm font-normal">
                    <p class=""> {{ `${comment.userId.username} ` }} <br/>
                        <span class="text-white/50">
                            {{ comment.content }}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

    const user: any = useState("user")
    const { delete: deletePost, comment, manageAdmire } = new usePost()
    let isAdmired = ref(manageAdmireStatus()),
        commentContent: string;
    const currentPostUuid = generateUuid()
    
    const props = defineProps({
        user: {
            type: Object,
            required: true
        },
        post: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    })

    function manageAdmireStatus() {
        if(props.post.admires) {
            const admireExist = props.post.admires?.filter((el: any) => {
                return String(el.userId.username) === String(user?.value.username);
            });
            if(admireExist != undefined && admireExist.length > 0) {
                return true
            } else {
                return false
            }
        }
    }

    async function manageAdmireFunctionResponse(slug: string) {
        const admireFunctionResponse = await manageAdmire(slug)
        if(typeof(admireFunctionResponse) === "boolean") {
            isAdmired.value = admireFunctionResponse
        }
    }

</script>
