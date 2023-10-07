export const generateSignature = async () => {
    const { data: response, error } = await useFetch('/api/media/upload', {
        method: 'POST',
        headers: { token: `${cookieOperations("get", "token")}` }
    })
    return error.value ? checkError(error.value?.data) : response.value
}