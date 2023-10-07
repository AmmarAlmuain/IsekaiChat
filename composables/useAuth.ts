export class useAuth {

    setTokenAndRedirect = (token: string) => {
        cookieOperations("set", "token", token)
        navigateTo("/")
    }

    loginEmailPassword = async (email: string, password: string) => {
        loadingAnimation("login-process", "start")
        const { data: response, error } = await useFetch('/api/auth/login', {
            method: 'POST',
            body: {
                email,
                password
            }
        })
        loadingAnimation("login-process")
        return error.value ? checkError(error.value?.data) : this.setTokenAndRedirect(response.value as string)
    }

    register = async (username: string, email: string, password: string) => {
        loadingAnimation("register-process", "start")
        const { data: response, error } = await useFetch('/api/auth/register', {
            method: 'POST',
            body: {
                username,
                email,
                password
            }
        })
        loadingAnimation("register-process")
        return error.value ? checkError(error.value?.data) : this.setTokenAndRedirect(response.value as string)
    }

    logout = () => {
        cookieOperations("remove", "token")
        const user = useState("user")
        user.value = null
        navigateTo("/login")
    }

}