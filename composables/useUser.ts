export class useUser {

    replaceToken= (token: string) => {
        cookieOperations("set", "token", token)
        return cookieOperations("get", "token")
    }

    get = async () => {
        const { logout } = new useAuth()
        const { data: response, error } = await useFetch(`/api/user`, {
            method: 'POST',
            headers: { token: `${cookieOperations("get", "token")}` }
        })
        return error.value ? checkError(error.value?.data) : response.value
    }

    update = async (body: Object) => {
        const { data: response, error }: any = await useFetch('/api/user', {
            method: 'PUT',
            body: {
                ...body
            },
            headers: { token: `${cookieOperations("get", "token")}` }
        })
        return error.value ? checkError(error.value?.data) : { token: this.replaceToken(response.value.token as string), user: response.value.user }
    }

}