import { connectDB } from "@/lib/db/mongo";
import Post from "@/lib/model/Post.model";

export const GET = async (request: Request, { params }: any): Promise<Response> => {
    const { query } = params

    try {
        await connectDB();

        if (!query) {
            console.log(query);
            return new Response('No query provided', { status: 400 });
        }

        const searchedPosts = await Post.find({
            $or: [
                { caption: { $regex: String(query), $options: 'i' } },
                { tag: { $regex: String(query), $options: 'i' } },
            ],
        })
            .populate('creator likes')
            .exec();

        return new Response(JSON.stringify(searchedPosts), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response('Failed to search posts', { status: 405 });
    }
};
