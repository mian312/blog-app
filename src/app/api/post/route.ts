import Post from "@/lib/model/Post.model";
import { connectDB } from "@/lib/db/mongo";

export const GET = async (req: Request): Promise<Response> => {
    try {
        await connectDB();

        const feedPosts = await Post.find()
            .populate("creator likes")
            .exec();

        return new Response(JSON.stringify(feedPosts), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response("Failed to fetch all Feed Posts", { status: 500 });
    }
};
