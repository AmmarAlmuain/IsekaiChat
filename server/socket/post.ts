import Post from "../database/models/post";
import { Server } from "socket.io"
import mongoose from "mongoose";
import { createServer } from "http"
import express from "express"
import cors from "cors"

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
    const port = config.port || 5000
    const app = express();
    app.use(cors())
    const httpServer = createServer(app);
    const io = new Server(httpServer, {
        cors: {
            origin: "*"
        }
    });
    
    io.on("connection", (socket) => {
      // ...
      console.log(httpServer.address())
    });
    
    httpServer.listen(port, () => {
        const serverAddress = httpServer.address();

        const serverUrl = `http://${serverAddress?.address}:${serverAddress?.port}`;
      
        console.log(`Server is running on URL: ${serverUrl}`);
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
