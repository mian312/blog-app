import Post from "@/lib/model/Post.model";
import User from "@/lib/model/User.model";
import { connectDB } from "@/lib/db/mongo";

export const GET = async (req: Request, { params }: any): Promise<Response> => {
    try {
        await connectDB();

        if (!params.pId) return new Response("Missing Profile Id", { status: 400 });

        const user = await User.findById(params.pId)
            .populate({
                path: "posts savedPosts likedPosts",
                model: Post,
                populate: {
                    path: "creator",
                    model: User,
                },
            })
            .populate({
                path: "followers following",
                model: User,
                populate: {
                    path: "posts savedPosts likedPosts",
                    model: Post,
                },
            })
            .exec();

        return new Response(JSON.stringify(user), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response("Failed to get user", { status: 405 });
    }
};