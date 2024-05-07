import { connectDB } from "@/lib/db/mongo";
import User from "@/lib/model/User.model";

export const GET = async (request: Request, { params }: any): Promise<Response> => {
    const { query } = params;

    try {
        await connectDB();

        if (!query) {
            console.log(query);
            return new Response('No query provided', { status: 400 });
        }

        const searchedUsers = await User.find({
            $or: [
                { username: { $regex: query, $options: "i" } },
                { firstName: { $regex: query, $options: "i" } },
                { lastName: { $regex: query, $options: "i" } },
            ],
        })
            .populate("posts savedPosts likedPosts followers following")
            .exec();

        return new Response(JSON.stringify(searchedUsers), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response('Failed to search posts', { status: 405 });
    }
};
