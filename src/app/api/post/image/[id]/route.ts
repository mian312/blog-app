import { connectDB, attachDB } from "@/lib/db/mongo";
import { GridFSBucket, Db } from 'mongodb';

// Define a custom type that extends NextApiRequest and adds db property
interface CustomNextApiRequest extends Request {
    formData(): Promise<any>;
    db: Db;
}

export const GET = async (req: CustomNextApiRequest,
    { params }: any): Promise<Response> => {
    try {
        // Connect to the database
        await connectDB();
        await attachDB(req);

        const filename = params?.id;

        const bucket = new GridFSBucket(req.db);

        const image = await bucket.find({ filename: filename }).toArray();

        if (!image || image.length === 0) {
            return new Response("Image not found", { status: 404 });
        }

        const [imageData] = image;

        // Create a stream to read the image data
        const stream = bucket.openDownloadStream(imageData._id);

        // Handle errors gracefully
        stream.on('error', (error) => {
            console.error(error);
            return new Response("Error fetching image", { status: 400 });
        });

        return new Response(stream as any, { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response("Error fetching image", { status: 404 });
    }
};
