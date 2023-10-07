<template>
    <div class="w-full flex text-white">

        <div class="w-full h-full flex flex-col">
            <div class="nav-bar w-full h-12 min-h-[48px] border-b border-white/10 px-4 max-md:justify-center flex justify-between items-center">
                <div
                    class="current-route-name max-md:hidden w-full max-w-fit flex justify-start items-center text-xs border border-white/10 py-1 px-3 text-white bg-neutral-700/50 rounded-md">
                    <p v-if="$route.path != '/'" class="tracking-widest"> IsekaiChat ー {{ `${$route.path.substring(1,
                        2).toUpperCase()}${$route.path.substring(2)}` }} </p>
                    <p v-if="$route.path === '/'" class="tracking-widest"> IsekaiChat ー Home </p>
                </div>
                <div class="flex h-full max-sm:flex-col max-sm:flex max-sm:justify-center max-sm:items-center">
                    <div class="w-full max-w-[384px] h-full flex justify-start items-center px-4 border-l border-r border-white/10">
                        <div class="w-full flex">
                            <input type="text" name="search" id="search" placeholder="Search is disabled..."
                                class="w-full h-8 bg-transparent outline-none px-4 placeholder:text-white/30" />
                            <button type="submit"
                                class="search-btn rounded-md cursor-pointer flex justify-start px-4 items-center hover:text-emerald-400 transition-all duration-300">
                                <IconsMagnifyingGlass />
                            </button>
                            <div
                                class="rounded-md cursor-pointer sm:hidden flex justify-start px-4 items-center">
                                <div class="user-dropdown dropdown dropdown-end">
                                    <label tabindex="0" class="flex justify-center items-center gap-x-2 cursor-pointer">
                                        <div class="hover:text-emerald-400 transition-all duration-300">
                                            <IconsDownArrow />
                                        </div>
                                    </label>
                                    <ul tabindex="0"
                                        class="dropdown-content z-[1] menu mt-6 shadow bg-[#1c1c1c] border border-white/10 rounded-md w-52">
                                        <li v-if="$route.path != '/account'" @click="navigateTo('/account')"><a> Account
                                            </a></li>
                                        <li v-else @click="navigateTo('/')"><a> Home </a></li>
                                        <li @click="logout()"><a> Logout </a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        class="w-64 h-full max-w-[256px] max-sm:hidden flex justify-start items-center px-4 border-l border-r border-white/10">
                        <div class="user-dropdown dropdown dropdown-end">
                            <label tabindex="0" class="flex justify-center items-center gap-x-2 cursor-pointer">
                                {{ user?.username }}
                                <div class="hover:text-emerald-400 transition-all duration-300">
                                    <IconsDownArrow />
                                </div>
                            </label>
                            <ul tabindex="0"
                                class="dropdown-content z-[1] menu mt-6 shadow bg-[#1c1c1c] border border-white/10 rounded-md w-52">
                                <li v-if="$route.path != '/account'" @click="navigateTo('/account')"><a> Account </a></li>
                                <li v-else @click="navigateTo('/')"><a> Home </a></li>
                                <li @click="logout()"><a> Logout </a></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            <div class="body-content w-full h-full flex justify-center items-center py-8">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

    const { logout } = new useAuth()
    const user = useState("user")

</script>