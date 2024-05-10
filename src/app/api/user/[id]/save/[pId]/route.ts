import Post from "@/lib/model/Post.model"
import User from "@/lib/model/User.model"
import { connectDB } from "@/lib/db/mongo"

export const POST = async (req: Request, { params }: any): Promise<Response> => {
    try {
        await connectDB()

        const userId = params.id
        const postId = params.pId

        const user = await User.findOne({ clerkId: userId }, { firstName: 0, lastName: 0 }).populate("posts savedPosts likedPosts following followers") //^ Skipping the check of 'firstName' and 'lastName' because though it is mentioned as required users creating accound through email do not have these field
        const post = await Post.findById(postId).populate("creator likes")

        if (!user) return new Response("User not found", { status: 404 })
        if (!post) return new Response("Post not found", { status: 404 })

        const isSaved = user.savedPosts.find((item: any) => item._id.toString() === postId)

        if (isSaved) {
            user.savedPosts = user.savedPosts.filter((item: any) => item._id.toString() !== postId)
        } else {
            user.savedPosts.push(post)
        }

        await user.save()

        return new Response(JSON.stringify(user), { status: 200 })
    } catch (err) {
        console.log(err)
        return new Response("Failed to save/unsave post", { status: 405 })
    }
}