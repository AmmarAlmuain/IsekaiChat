import Post from "~/server/database/models/post";

export default defineEventHandler( async (event) => {
    const posts = (await Post.find().populate({
        path: "userId",
        select: "username email profileImage",
      }).populate({
        path: "comments.userId",
        select: "username profileImage",
      }).populate({
        path: "admires.userId",
        select: "email",
      })).reverse()
    return posts
})