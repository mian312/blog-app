import User from "@/lib/model/User.model"
import { connectDB } from "@/lib/db/mongo"

export const POST = async (req: Request, { params }: any): Promise<Response> => {
    try {
        await connectDB()

        const userId = params.id
        const followId = params.followId

        const user = await User.findOne({ clerkId: userId }, {firstName: 0, lastName: 0}).populate("posts savedPosts likedPosts followers following") //^ Skipping the check of 'firstName' and 'lastName' because though it is mentioned as required users creating accound through email do not have these field
        const personToFollow = await User.findById(followId).populate("posts savedPosts likedPosts followers following")

        if (!user || !personToFollow) {
            return new Response('User or person to follow not found', { status: 404 });
        }

        const isFollowing = user?.following.find((item: any) => item._id.toString() === followId)

        if (isFollowing) {
            user.following = user.following.filter((item: any) => item._id.toString() !== followId)
            personToFollow.followers = personToFollow.followers.filter((item: any) => item._id.toString() !== user._id.toString())
        } else {
            user.following.push(personToFollow)
            personToFollow.followers.push(user)
        }

        await user.save()
        await personToFollow.save()

        return new Response(JSON.stringify(user), { status: 200 })
    } catch (err) {
        console.log(err)
        return new Response("Failed to follow/unfollow user", { status: 405 })
    }
}