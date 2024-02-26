import { connectDB } from "@/lib/db/mongo"
import UserModel from "@/lib/model/User.model";


export const GET = async (req: Request, { params }: any) => {
    try {
        await connectDB();

        // const { id } = params;
        const user = await UserModel.findOne({ clerkId: params.id }).populate("followers following").exec();

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