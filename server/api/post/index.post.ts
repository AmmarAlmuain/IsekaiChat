import Post from "~/server/database/models/post";
import VPost from "~/server/database/validations/post";
import User from "~/server/database/models/user";
import { generateUuid } from "~/utils/generateUuid";

export default defineEventHandler(async (event) => {
  const { content, media } = await readBody(event);
  const user = await User.findOne({ email: event.context.user.email });
  const slug = generateUuid()
  const { error } = VPost.validate({
    userId: String(user?._id),
    content,
  });
  if (error) {
    setResponseStatus(event, 400)
    return error.message;
  }
  if(!content) {
    setResponseStatus(event, 400)
    return "Content field can't be empty."
  }
  const post = new Post({
    userId: user?._id,
    slug,
    content,
    media: media || "",
  });
  await post.save();
  if(post) {
    const post = await Post.findOne({ slug }).populate({
      path: "userId",
      select: "username profileImage",
    }).populate({
      path: "comments.userId",
      select: "username profileImage",
    }).populate({
      path: "admires.userId",
      select: "username",
    })
    return post
  }
});
