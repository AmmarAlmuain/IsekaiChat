import Post from "~/server/database/models/post";
import VPost from "~/server/database/validations/post";
import User from "~/server/database/models/user";
import _ from "lodash"

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { slug } = await readBody(event);
  const modifiedBody = _.omit(body, "slug")
  const post = await Post.findOne({ slug })
  const user = await User.findOne({ email: event.context.user.email });
  const { error } = VPost.validate({
    userId: String(user?._id),
    title: body.title,
    content: body.content,
  });
  if (error) {
    event.node.res.statusCode = 400;
    return error.message;
  } else {
    if(String(post?.userId), String(user?._id)) {
      const updatedPost = await Post.updateOne(
        { slug },
        { $set: body },
        { new: true }
      );
      event.node.res.statusCode = 200;
      return "Post updated successful.";
    } else {
      event.node.res.statusCode = 403;
      return "You are not authorized to modify this post. You are not the owner of it."
    }
  }
});
