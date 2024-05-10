import Post from "@/lib/model/Post.model"
import User from "@/lib/model/User.model"
import { connectDB } from "@/lib/db/mongo"

export const POST = async (req: Request, { params }: any): Promise<Response> => {
    try {
        await connectDB()

        const userId = params.id
        const postId = params.pId

        const user = await User.findOne({ clerkId: userId }, { firstName: 0, lastName: 0 }).populate("posts savedPosts following followers").populate({
            path: "likedPosts",
            model: "Post",
            populate: {
                path: "creator",
                model: "User",
            },
        })  //^ Skipping the check of 'firstName' and 'lastName' because though it is mentioned as required users creating accound through email do not have these field

        const post = await Post.findById(postId).populate("creator likes")

        if (!user) return new Response("User not found", { status: 404 })
        if (!post) return new Response("Post not found", { status: 404 })

        const isLiked = user.likedPosts.find((item: any) => item._id.toString() === postId)

        if (isLiked) {
            user.likedPosts = user.likedPosts.filter((item: any) => item._id.toString() !== postId)
            post.likes = post.likes.filter((item: any) => item._id.toString() !== user._id.toString())
        } else {
            user.likedPosts.push(post?._id)
            post.likes.push(user._id)
        }

        await user.save()
        await post.save()

        return new Response(JSON.stringify(user), { status: 200 })
    } catch (err) {
        console.log(err)
        return new Response("Failed to like/dislike post", { status: 405 })
    }
}