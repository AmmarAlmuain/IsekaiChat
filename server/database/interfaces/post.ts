import mongoose, { Document } from "mongoose";

interface IAdmire extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
}

interface IReject extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
}

interface IComment extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  content: string;
}

interface IPost extends Document {
  userId: mongoose.Types.ObjectId;
  slug: string;
  content: string;
  media?: string;
  admire?: IAdmire[];
  reject?: IReject[];
  comment?: IComment[];
  created_at: Date;
  updated_at: Date;
  [key: string]: any;
}

export default IPost;
