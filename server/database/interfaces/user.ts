import { Document } from "mongoose"

interface IUser extends Document {
    username: string
    email: string
    password: string
    profileImage?: string
    created_at: Date;
    updated_at: Date;
    [key: string]: any;
}

export default IUser