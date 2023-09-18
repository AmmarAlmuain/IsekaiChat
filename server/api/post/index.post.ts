import Post from "~/server/database/models/post";
import VPost from "~/server/database/validations/post";
import User from "~/server/database/models/user";
import { uuidv7 } from "uuidv7";
import post from "~/server/database/models/post";

export default defineEventHandler(async (event) => {
  const { content } = await readBody(event);
  const { media } = await readBody(event);
  const user = await User.findOne({ email: event.context.user.email });
  const stringToSlug = (str: string) => {
    return str
        .toLowerCase()
        .replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]+/g, '-')
        .replace(/^-+|-+$/g, '');
  }
  const slug = `${uuidv7()}`
  const { error } = VPost.validate({
    userId: String(user?._id),
    content,
  });
  if (error) {
    event.node.res.statusCode = 400;
    return error.message;
  } else {
    if(!content) {
      event.node.res.statusCode = 400;
      return "Content field can't be empty."
    }
    const post = new Post({
      userId: user?._id,
      slug,
      content,
      media: media || "",
    });
    await post.save();
    event.node.res.statusCode = 200;
    // return "Post created successful.";
    if(post) {
      const post = await Post.findOne({ slug }).populate("userId").populate("comment.userId").populate("admire.userId")
      return post
    }
  }
});
