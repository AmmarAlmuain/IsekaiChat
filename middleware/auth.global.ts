export default defineNuxtRouteMiddleware( async (to, from) => {
    const token = useCookie("token").value
    if(token) {
        const user = await retrieveUser(token as string)
        const userState = useState("user")
        userState.value = user
    }
})