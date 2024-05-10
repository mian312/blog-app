import Post from "@/lib/model/Post.model";
import User from "@/lib/model/User.model";
import { connectDB } from "@/lib/db/mongo";

export const DELETE = async (req: Request, { params }: any) => {
    try {
        await connectDB();

        await Post.findByIdAndDelete(params.id);

        const user = await User.findByIdAndUpdate(
            params.cId,
            { $pull: { posts: params.id } },
            { new: true, useFindAndModify: false }
        )
            .populate("posts savedPosts likedPosts followers following")
            .exec();

        return new Response(JSON.stringify(user), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response("Failed to delete the post", { status: 500 });
    }
};