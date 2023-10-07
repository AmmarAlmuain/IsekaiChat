import Post from "~/server/database/models/post";
import User from "~/server/database/models/user";

export default defineEventHandler(async (event) => {
  const { slug } = await readBody(event);
  const post = await Post.findOne({ slug });
  const user = await User.findOne({ email: event.context.user.email });
  if (!post) {
    setResponseStatus(event, 400)
    return "Post not found.";
  }
  const admireExist = post?.admires?.filter((el) => {
    return String(el.userId) === String(user?._id);
  });
  if (admireExist != undefined && admireExist.length > 0) {
    await Post.updateOne(
      { slug },
      { $pull: { admires: { userId: user?._id } } }
    );
    return false
  } 
  const result = await Post.updateOne(
    { slug },
    { $push: { admires: { userId: user?._id } } }
  );
  return true
});
