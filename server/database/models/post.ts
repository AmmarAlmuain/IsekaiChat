import mongoose from "mongoose";
import IPost from "../interfaces/post";

const Admire = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
}, { timestamps: true } )

const Reject = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
}, { timestamps: true } )

const Comment = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    content: { type: String, required: true },
}, { timestamps: true } )

const Post = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    slug: String,
    content: { type: String, required: true },
    media: { type: String },
    admire: [Admire],
    reject: [Reject],
    comment: [Comment]
}, { timestamps: true } )

export default mongoose.model<IPost>("Post", Post)