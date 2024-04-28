import mongoose, { Document, Schema, Model, Types } from "mongoose";

interface IPost extends Document {
  creator: Types.ObjectId;
  caption: string;
  postPhoto: string;
  tag: string;
  likes: Types.ObjectId[];
  createdAt: Date;
}

const PostSchema: Schema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  postPhoto: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  likes: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;
