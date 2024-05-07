import Post from "@/lib/model/Post.model";
import { connectDB } from "@/lib/db/mongo";
import { NextApiRequest } from "next";

export const GET = async (_req: NextApiRequest, { params }: any) => {
    try {
        await connectDB();

        const post = await Post.findById(params?.id)
            .populate("creator likes")
            .exec();

        if (!post) {
            return new Response("Post not found", { status: 404 })
        }

        return new Response(JSON.stringify(post), { status: 200 })
    } catch (err) {
        console.error(err);
        return new Response("Failed to get post by id", { status: 404 })
    }
};

interface CustomNextApiRequest extends Request {
    formData(): Promise<any>;
}

export const POST = async (req: CustomNextApiRequest, { params }: any) => {
    try {
        await connectDB();

        const data = await req.formData();

        if (!data || !params?.id) {
            return new Response("Invalid request data", { status: 400 })
        }

        const caption = data.get('caption') as string;
        const tag = data.get('tag') as string;

        const post = await Post.findByIdAndUpdate(
            params.id,
            {
                $set: {
                    caption: caption,
                    tag: tag,
                },
            },
            { new: true }
        );

        if (!post) {
            return new Response("Post not found", { status: 404 });
        }

        return new Response(JSON.stringify(post), { status: 200 })
    } catch (err: any) {
        console.error(err);
        return new Response(err.message || "Failed to update post", { status: 500 });
    }
};

