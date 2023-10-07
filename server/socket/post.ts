import Post from "../database/models/post";
import { Server } from "socket.io"
import mongoose from "mongoose";
import http from "http"

const retrievePostById = async (postId: string) => {
    const post = await Post.findOne({ _id: postId }).populate({
        path: "userId",
        select: "username email profileImage",
    }).populate({
        path: "comments.userId",
        select: "username profileImage",
    }).populate({
        path: "admires.userId",
        select: "email",
    })
    return post
}

export default async () => {

    const config = useRuntimeConfig()
    const server = http.createServer();
    
    const io = new Server(server, {
        cors: {
            origin: `${config.socketClientUrl}`
        }
    });

    server.listen(3001, "::", () => {
        const address = server.address();
        const serverUrl = `http://[${address?.address}]:${address?.port}`;
    
        console.log(`Socket server is running at: ${serverUrl}`);
    });

    const changeStream = Post.watch()
    
    io.on("connection", (socket) => {
        changeStream.on('change', async (change) => {
            const { operationType, documentKey } = change,
                  { _id: postId } = documentKey

            if(operationType === "insert") {
                socket.emit("post:insert", await retrievePostById(postId))
            }

            if(operationType === "delete") {
                socket.emit("post:delete", postId)
            }

            if (operationType === 'update') {
                socket.emit("post:update", await retrievePostById(postId))
            }
        });
    })

}
