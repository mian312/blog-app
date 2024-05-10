import { connectDB } from "@/lib/db/mongo"
import Post from "@/lib/model/Post.model";
import User from "@/lib/model/User.model";


export const GET = async (req: Request, { params }: any) => {
    try {
        await connectDB();

        // const { id } = params;
        const user = await User.findOne({ clerkId: params.id })
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

        return new Response(JSON.stringify(user), {
            status: 200,
            statusText: "OK",
        });
    } catch (error: any) {
        console.log(error.message);
        return new Response(JSON.stringify(error), {
            status: 404,
            statusText: "GET User Error",
        })
    }
}