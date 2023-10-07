import Post from "~/server/database/models/post";
import User from "~/server/database/models/user";

export default defineEventHandler(async (event) => {
  const { slug, content } = await readBody(event);
  const post = await Post.findOne({ slug });
  const user = await User.findOne({ email: event.context.user.email });
  if (!post) {
    setResponseStatus(event, 400)
    return "Post not found.";
  }
  if(content && content.length >= 3 && content.length <= 500 && typeof(content) === "string") {
    await Post.updateOne(
      { slug },
      { $push: { comments: { userId: user?._id, content: content } } }
    );
    return "Commented successfully.";
  }
  setResponseStatus(event, 404)
  return `Content field can't be empty or less then 3 character.`
});
