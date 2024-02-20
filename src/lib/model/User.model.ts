import mongoose, { Schema, Document } from "mongoose";
import { EmailAddressJSON } from "@clerk/nextjs/server";

interface User extends Document {
    clerkId: string;
    firstName: string;
    lastName: string;
    username: string;
    email: EmailAddressJSON[];
    profilePhoto: string;
    posts: mongoose.Schema.Types.ObjectId[];
    savedPosts: mongoose.Schema.Types.ObjectId[];
    likedPosts: mongoose.Schema.Types.ObjectId[];
    followers: mongoose.Schema.Types.ObjectId[];
    following: mongoose.Schema.Types.ObjectId[];
    createdAt: Date;
}

const UserSchema = new Schema<User>({
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: [Object],
        required: true,
    },
    profilePhoto: {
        type: String,
        required: true,
    },
    posts: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        default: [],
    },
    savedPosts: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        default: [],
    },
    likedPosts: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        default: [],
    },
    followers: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        default: [],
    },
    following: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const UserModel = mongoose.models.User || mongoose.model<User>("User", UserSchema);

export default UserModel;
