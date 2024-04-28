// import { connectDB } from "@/lib/db/mongo"
// import UserModel from "@/lib/model/User.model";

// export const GET = async (req: Request) => {
//     try {
//         await connectDB();

//         const allUser = await UserModel.find()
//             .populate("posts savedPosts likedPosts followers following")
//             .exec();

//         return new Response(JSON.stringify(allUser), {
//             status: 200,
//             statusText: "Successfully fetched all users"
//         });
//     } catch (error) {
//         console.log(error)
//         return new Response("Fetch User Error", {
//             status: 500,
//             statusText: "Internal Server Error",
//         })
//     }
// }