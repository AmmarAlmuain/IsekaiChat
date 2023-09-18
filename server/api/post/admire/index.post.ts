import Post from "~/server/database/models/post";
import User from "~/server/database/models/user";

export default defineEventHandler(async (event) => {
  const { slug } = await readBody(event);
  const post = await Post.findOne({ slug });
  const user = await User.findOne({ email: event.context.user.email });
  if (post) {
    const admireExist = post?.admire?.filter((el) => {
      return String(el.userId) === String(user?._id);
    });
    if (admireExist != undefined && admireExist.length > 0) {
      await Post.updateOne(
        { slug },
        { $pull: { admire: { userId: user?._id } } }
      );
      event.node.res.statusCode = 200;
      // return "Admire removed successfully.";
      return false
    }  else {
        const result = await Post.updateOne(
          { slug },
          { $push: { admire: { userId: user?._id } } }
        );
        event.node.res.statusCode = 200;
        // return "Admired successfully.";
        return true
      }
    } else {
    event.node.res.statusCode = 400;
    return "Post not found.";
  }
});
