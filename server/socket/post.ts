import Post from "../database/models/post";
import Pusher from "pusher";

const retrievePostById = async (postId: string) => {
    const post = await Post.findOne({ _id: postId }).populate({
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

export default async () => {

    const config = useRuntimeConfig()

    const pusher = new Pusher({
        appId: config.pusherId,
        key: config.pusherKey,
        secret: config.pusherSecret,
        cluster: config.pusherCluster,
        useTLS: true
    });


    const changeStream = Post.watch()

    changeStream.on('change', async (change) => {
        const { operationType, documentKey } = change,
                { _id: postId } = documentKey

        if(operationType === "insert") {
            pusher.trigger("awake-soul-807", "post:insert", await retrievePostById(postId));
        }

        if(operationType === "delete") {
            pusher.trigger("awake-soul-807", "post:delete", postId);
        }

        if (operationType === 'update') {
            pusher.trigger("awake-soul-807", "post:update", await retrievePostById(postId));
        }
    })

}
