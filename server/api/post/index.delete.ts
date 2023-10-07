import Post from "~/server/database/models/post";
import User from "~/server/database/models/user";

export default defineEventHandler(async (event) => {
  const { slug } = await readBody(event);
  const post = await Post.findOne({ slug });
  const user = await User.findOne({ email: event.context.user.email });
  if ((String(post?.userId), String(user?._id))) {
    const updatedPost = await Post.deleteOne({ slug });
    return "Post deleted successful.";
  } else {
    setResponseStatus(event, 403)
    return "You are not authorized to modify this post. You are not the owner of it.";
  }
});
