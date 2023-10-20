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

    loginGoogle = () => {
        const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=${import.meta.env.VITE_scope}&response_type=${import.meta.env.VITE_responseType}&redirect_uri=${import.meta.env.VITE_redirectUri}&client_id=${import.meta.env.VITE_clientId}`
        navigateTo(url, { external: true })
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