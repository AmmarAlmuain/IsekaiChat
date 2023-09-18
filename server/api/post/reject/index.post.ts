import Post from "~/server/database/models/post";
import User from "~/server/database/models/user";

export default defineEventHandler(async (event) => {
  const { slug } = await readBody(event);
  const post = await Post.findOne({ slug });
  const user = await User.findOne({ email: event.context.user.email });
  if (post) {
    const rejectExist = post?.reject?.filter((el) => {
      return String(el.userId) === String(user?._id);
    });
    if (rejectExist != undefined && rejectExist.length > 0) {
      await Post.updateOne(
        { slug },
        { $pull: { reject: { userId: user?._id } } }
      );
      event.node.res.statusCode = 200;
      return "Reject removed successfully.";
    } else {
      const admireExist = post?.admire?.filter((el) => {
        return String(el.userId) === String(user?._id);
      });
      if (admireExist != undefined && admireExist.length > 0) {
        await Post.updateOne(
          { slug },
          { $pull: { admire: { userId: user?._id } } }
        );
        await Post.updateOne(
          { slug },
          { $push: { reject: { userId: user?._id } } }
        );
        event.node.res.statusCode = 200;
        return "Rejected successfully.";
      } else {
        await Post.updateOne(
          { slug },
          { $push: { reject: { userId: user?._id } } }
        );
        event.node.res.statusCode = 200;
        return "Rejected successfully.";
      }
    }
  } else {
    event.node.res.statusCode = 400;
    return "Post not found.";
  }
});
