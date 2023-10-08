<template>
    <div class="max-w-[500px] w-full flex justify-center items-center flex-col border-2 max-sm:rounded-none max-sm:border-l-0 max-sm:border-r-0 max-sm:border-t max-sm:border-b rounded-md border-white/10 bg-[#1c1c1c] py-3">
        <div class="author w-full flex justify-between items-center px-3">
            <div class="flex justify-start items-center gap-x-2">
                <div class="img-side w-10 h-full flex justify-center items-center">
                    <img :src="props.user.profileImage" alt="post-img"
                        class="w-10 h-10 rounded-full" />
                </div>
                <div class="user-username-and-time-side flex flex-col justify-center items-start">
                    <h5 class="text-base font-medium"> {{ props.user.username}} </h5>
                    <p class="text-sm font-light text-white/50"> {{ formatDate(props.post.createdAt) }} </p>
                </div>
            </div>
            <div v-if="user.username == props.user.username"> 
                <div class="post-dropdown dropdown dropdown-end">
                    <label tabindex="0" class="three-dot-btn hover:text-emerald-400 outline-none transition-all duration-300 flex justify-center items-center gap-x-2 cursor-pointer">
                        <IconsThreeDot />
                    </label>
                    <ul tabindex="0"
                        class="dropdown-content z-[1] menu mt-6 shadow bg-[#1c1c1c] border border-white/10 rounded-md w-52">
                        <li @click="() => { deletePost(props.post.slug) }"><div class="flex justify-center items-center"> <span id="delete-post-process"> Delete </span> </div></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="post-content text-sm text-white pt-4 px-3 w-full text-left" :class="props.post.media ? '' : 'pb-2'">
            {{  props.post.content }}
        </div>
        <div class="post-media pt-4" v-if="props.post.media">
            <img :src="props.post.media" alt="post-media" class="" />
        </div>
        <div class="post-add-comment w-full h-12 flex justify-center items-center my-2 border-t border-b border-white/10">
            <div class="comment-user-pfp px-4 h-full flex justify-center items-center border-r border-white/10">
                <img :src="user.profileImage" alt="post-img"
                    class="w-8 h-8 rounded-full min-w-fit min-h-fit" />
            </div>
            <div class="comment-inputs w-full flex">
                <input type="text"
                    class="w-full h-8 bg-transparent text-sm px-4 outline-none border-none placeholder:text-white/30"
                    placeholder="Add your comment..." v-model="commentContent">
                <button v-if="!isAdmired" @click="manageAdmireFunctionResponse(props.post.slug)"
                    class="heart-btn rounded-md cursor-pointer flex justify-start px-4 items-center hover:text-emerald-400 transition-all duration-300">
                    <IconsHeart />
                </button>
                <button v-else @click="manageAdmireFunctionResponse(props.post.slug)"
                    class="heart-btn-active rounded-md cursor-pointer flex justify-start px-4 text-transparent items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#34d399"
                        class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" fill="#34d399" 
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                </button>
                <button
                    class="up-right-arrow-btn rounded-md cursor-pointer flex justify-start px-4 items-center hover:text-emerald-400 transition-all duration-300">
                    <span id="create-comment-process"> <IconsUpRightArrow @click="comment(commentContent, props.post.slug)"/> </span>
                </button>
            </div>
        </div>
        <div class="all-comments w-full px-3 h-full">
            <div class="comment w-full gap-x-2 h-full items-stretch flex justify-center text-left py-2" v-for="comment in props.post.comments">
                <div class="w-6 h-full flex justify-start items-center">
                    <img :src="comment.userId.profileImage"
                        alt="commented-user-pfp" class="w-6 h-6 rounded-full min-w-fit">
                </div>
                <div class="flex justify-start items-center max-w-[440px] flex-grow text-xs font-normal">
                    <p class=""> {{ `${comment.userId.username} : ` }}
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
    
    const props = defineProps({
        user: {
            type: Object,
            required: true
        },
        post: {
            type: Object,
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
