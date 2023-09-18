import Post from "~/server/database/models/post";
import User from "~/server/database/models/user";

export default defineEventHandler(async (event) => {
  const { slug, content } = await readBody(event);
  const post = await Post.findOne({ slug });
  const user = await User.findOne({ email: event.context.user.email });
  if (post) {
    if(content && content.length >= 3 && content.length <= 500 && typeof(content) === "string") {
      await Post.updateOne(
        { slug },
        { $push: { comment: { userId: user?._id, content: content } } }
      );
      event.node.res.statusCode = 200;
      return "Commented successfully.";
    } else {
      event.node.res.statusCode = 404;
      return `Content field can't be empty or less then 3 character.`
    }
  } else {
    event.node.res.statusCode = 400;
    return "Post not found.";
  }
});
