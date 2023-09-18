import mongoose from "mongoose";
//@ts-ignore
import bcrypt from "mongoose-bcrypt";
import IUser from "../interfaces/user";

const User = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, bcrypt: true },
    profileImage: { type: String },
}, { timestamps: true } )

User.plugin(bcrypt)

export default mongoose.model<IUser>("User", User)