import Post from "~/server/database/models/post";

export default defineEventHandler( async (event) => {
    const posts = (await Post.find().populate("userId").populate("comment.userId").populate("admire.userId")).reverse()
    return posts
})