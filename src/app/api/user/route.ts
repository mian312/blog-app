import User from "@/lib/model/User.model"
import { connectDB } from "@/lib/db/mongo"

export const GET = async (req: Request) => {
    try {
        await connectDB()

        const allUsers = await User.find().populate("posts savedPosts likedPosts followers following").exec()

        return new Response(JSON.stringify(allUsers), { status: 200 })
    } catch (err) {
        return new Response("Failed to get all users", { status: 500 })
    }
}