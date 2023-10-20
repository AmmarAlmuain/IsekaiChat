<template>

    <div class="w-full flex text-white">

        <div class="fixed w-screen h-0 bg-[#111] z-50 hidden opacity-0" id="mobileMenuAnimation">
            <div class="relative w-full">
                <div class="w-full pr-10 pt-6 absolute flex justify-end right-0" @click="removeMobileMenuAnimation">
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" class="cursor-pointer hover:text-rose-600 duration-300 transition-all text-white">
                        <path d="M23 1.69098V3.69098H22V4.69098H21V5.69098H20V6.69098H19V7.69098H18V8.69098H17V9.69098H16V10.691H15V11.691H14V13.691H15V14.691H16V15.691H17V16.691H18V17.691H19V18.691H20V19.691H21V20.691H22V21.691H23V23.691H22V22.691H21V21.691H20V20.691H19V19.691H18V18.691H17V17.691H16V16.691H15V15.691H14V14.691H13V13.691H11V14.691H10V15.691H9V16.691H8V17.691H7V18.691H6V19.691H5V20.691H4V21.691H3V22.691H2V23.691H1V21.691H2V20.691H3V19.691H4V18.691H5V17.691H6V16.691H7V15.691H8V14.691H9V13.691H10V11.691H9V10.691H8V9.69098H7V8.69098H6V7.69098H5V6.69098H4V5.69098H3V4.69098H2V3.69098H1V1.69098H2V2.69098H3V3.69098H4V4.69098H5V5.69098H6V6.69098H7V7.69098H8V8.69098H9V9.69098H10V10.691H11V11.691H13V10.691H14V9.69098H15V8.69098H16V7.69098H17V6.69098H18V5.69098H19V4.69098H20V3.69098H21V2.69098H22V1.69098H23Z" fill="currentColor"/>
                    </svg>
                </div>
            </div>
            <div class="w-full h-full flex flex-col gap-x-2 justify-center items-center">
                <div class="nav-element-wrapper py-2 px-4">
                    <div class="nav-element translate-y-full opacity-0">
                        <NuxtLink to="/" @click="removeMobileMenuAnimation">
                            <p class="text-6xl font-semibold hover:text-emerald-400 transition-all duration-300 cursor-pointer">
                                SEKKA 
                            </p>
                        </NuxtLink>
                    </div>
                </div>
                <div class="nav-element-wrapper py-2 px-4 flex flex-col justify-center items-center text-center">
                    <div class="nav-element translate-y-full opacity-0">
                            <NuxtLink to="/">
                            <p class="text-5xl mt-4 text-white/30 cursor-pointer flex justify-center items-center gap-x-1">
                                GUILDS. <br>
                            </p>
                            <span class="text-xs"> comming soon </span>
                        </NuxtLink>
                    </div>
                </div>
                <div class="nav-element-wrapper py-2 px-4 flex flex-col justify-center items-center text-center">
                    <div class="nav-element translate-y-full opacity-0">
                        <NuxtLink to="/">
                            <p class="text-5xl mt-4 text-white/30 cursor-pointer">
                                STORY.
                            </p>
                            <span class="text-xs"> comming soon </span>
                        </NuxtLink>
                    </div>
                </div>
                <div class="nav-element-wrapper py-2 px-4">
                    <div class="nav-element translate-y-full opacity-0">
                        <NuxtLink to="/account" @click="removeMobileMenuAnimation">
                            <p class="text-5xl mt-4 text-white py-2 px-6 hover:bg-[#80808033] transition-all duration-300 cursor-pointer rounded-md">
                                Account
                            </p>
                        </NuxtLink>
                    </div>
                </div>
                <div class="nav-element-wrapper py-2 px-4" @click="logout">
                    <div class="nav-element translate-y-full opacity-0">
                        <p class="text-5xl mt-4 text-white py-2 px-6 hover:bg-[#80808033] transition-all duration-300 cursor-pointer rounded-md">
                            Logout
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full h-full flex flex-col">
            <div
                class="nav-bar w-full h-20 min-h-[48px] border-b bg-[#151415] border-[#27272A] px-4 flex justify-between items-center">
                <div class="flex gap-x-2 justify-center items-center">
                    <div class="py-2 px-4">
                        <NuxtLink to="/">
                            <p class="text-4xl font-semibold hover:text-emerald-400 transition-all duration-300 cursor-pointer">
                                SEKKA 
                            </p>
                        </NuxtLink>
                    </div>
                    <div class="py-2 px-4 max-md:hidden">
                        <NuxtLink to="/">
                            <p class="text-2xl text-white/30 cursor-pointer flex justify-center items-center gap-x-1 tooltip tooltip-bottom" data-tip="coming soon">
                                GUILDS.
                            </p>
                        </NuxtLink>
                    </div>
                    <div class="py-2 px-4 max-md:hidden">
                        <NuxtLink to="/">
                            <p class="text-2xl text-white/30 cursor-pointer tooltip tooltip-bottom" data-tip="coming soon">
                                STORY.
                            </p>
                        </NuxtLink>
                    </div>
                </div>
                <div @click="mobileMenuAnimation" class="humburger cursor-pointer px-3 py-3 relative rounded-2xl max-md:flex hidden text-white bg-[#80808033]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>
                <div class="flex py-2 px-4 max-md:hidden">
                    <div
                        class="group px-4 py-2 relative rounded-md max-sm:hidden flex justify-start items-center bg-[#80808033]" @click="menuAnimation()">
                        <div class="account-dropdown-btn">
                            <div class="flex justify-center items-center gap-x-2 cursor-pointer">
                                <p> {{ user?.username }} </p>
                                <div>
                                    <div id="toggle-nav-menu">
                                        <IconsDownArrow />
                                    </div>
                                </div>
                            </div>
                            <div class="absolute top-0 right-0 opacity-0" id="account-dropdown">
                                <div class="account-dropdown p-2 flex flex-col relative bg-[#292929] translate-y-12">
                                    <span class="absolute h-1 w-full bg-emerald-400 top-0 right-0 rounded-full"></span>
                                    <NuxtLink to="/account">
                                        <div
                                            class="w-48 mr-2 ml-2 mt-3 mb-1 hover:bg-[#80808033] transition-all duration-300 cursor-pointer rounded-md">
                                            <p class="py-2 px-4"> Account </p>
                                        </div>
                                    </NuxtLink>
                                    <div @click="logout"
                                        class="w-48 mr-2 ml-2 mb-2 mt-1 hover:bg-[#80808033] transition-all duration-300 cursor-pointer rounded-md">
                                        <p class="py-2 px-4" @click="logout"> Logout </p>
                                    </div>
                                </div>
                            </div>
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

    import { gsap } from "gsap"
    const type = ref("start")

    const mobileMenuAnimation = () => {
        const element = document.getElementById("mobileMenuAnimation") as HTMLDivElement
        const navEles = document.getElementsByClassName("nav-element")
        const tl = gsap.timeline()
        tl.to(element, {
            display: "block",
            opacity: 1,
            height: "100%",
            duration: 0.3
        })
        tl.to(navEles, {
            y: 0,
            duration: 0.6,
            opacity: 1
        })
    }

    const removeMobileMenuAnimation = () => {
        const element = document.getElementById("mobileMenuAnimation") as HTMLDivElement
        const navEles = document.getElementsByClassName("nav-element")
        const tl = gsap.timeline()
        tl.to(element, {
            display: "none",
            opacity: 0,
            height: "0%",
            duration: 0.3
        })
        tl.to(navEles, {
            y: "100%",
            duration: 0.6,
            opacity: 0
        })
    }



    const menuAnimation = () => {
        const element = document.getElementById("account-dropdown") as HTMLDivElement
        const arrowIcon = document.getElementById("toggle-nav-menu") as HTMLDivElement
        let animation = gsap.fromTo(element, {
            opacity: 0,
            y: 0,
            duration: 0.3,
        }, {
            opacity: 1,
            y: 10,
            duration: 0.3
        })
        let flipIcon = gsap.to(arrowIcon, {
            rotate: 180,
            duration: 0.3
        })
        if(type.value === "start") {
            flipIcon.play()
            animation.play()
            type.value = "end"
        } else {
            animation = gsap.fromTo(element, {
                opacity: 1,
                y: 10,
                duration: 0.3,
            }, {
                opacity: 0,
                y: 0,
                duration: 0.3
            })
            let flipIcon = gsap.to(arrowIcon, {
                rotate: 0,
                duration: 0.3
            })
            flipIcon.play()
            animation.play()
            type.value = "start"
        }
    }

    const { logout } = new useAuth()
    const user = useState("user")

</script>