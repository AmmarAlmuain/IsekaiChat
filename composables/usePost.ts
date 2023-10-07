export class usePost {

    async entirely() {
        const { data: response, error }: any = await useFetch('/api/post/entirely', {
            method: 'POST'
        })
        return error.value ? error.value?.data : response.value
    }

    async create(content: string, mediaUrl: string | undefined = undefined) {
        loadingAnimation("create-post-process", "start")
        const { data: response, error }: any = await useFetch('/api/post', {
            method: 'POST',
            body: {
                content: content, media: mediaUrl || ''
            },
            headers: { token: `${cookieOperations("get", "token")}` }
        })
        loadingAnimation("create-post-process")
        return error.value ? checkError(error.value?.data) : response.value
    }

    async delete(slug: string) {
        loadingAnimation("delete-post-process", "start")
        const { data: response, error } = await useFetch('/api/post', {
            method: 'DELETE',
            body: {
                slug
            },
            headers: { token: `${cookieOperations("get", "token")}` }
        })
        loadingAnimation("delete-post-process")
        return error.value ? checkError(error.value.data) : response.value
    }

    async comment(content: string, slug: string) {
        loadingAnimation("create-comment-process", "start")
        const { data: response, error } = await useFetch('/api/post/comment', {
            method: 'POST',
            body: {
                content,
                slug
            },
            headers: { token: `${cookieOperations("get", "token")}` }
        })
        loadingAnimation("create-comment-process")
        return error.value ? checkError(error.value.data) : response.value
    }

    async manageAdmire(slug: string) {
        const { data: response, error } = await useFetch('/api/post/admire', {
            method: 'POST',
            body: {
                slug
            },
            headers: { token: `${cookieOperations("get", "token")}` }
        })
        return error.value ? checkError(error.value.data) : response.value
    }

}