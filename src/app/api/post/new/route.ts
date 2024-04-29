import { attachDB, connectDB } from '@/lib/db/mongo';
import Post from '@/lib/model/Post.model';
import User from '@/lib/model/User.model';
import { v4 as uuidv4 } from 'uuid';
import { GridFSBucket, Db } from 'mongodb';

// Define a custom type that extends NextApiRequest and adds formData and db properties
interface CustomNextApiRequest extends Request {
  formData(): Promise<any>; // Adjust the return type as per the actual return type of formData()
  db: Db;
}

export const POST = async (req: CustomNextApiRequest): Promise<Response> => {
  try {
    await connectDB();
    await attachDB(req)

    const data = await req.formData();

    const caption = data.get('caption') as string;
    const postPhoto = data.get('postPhoto') as File;
    const tag = data.get('tag') as string;
    const creatorId = data.get('creatorId') as string;

    if (!caption || !postPhoto || !tag || !creatorId) {
      throw new Error('Required fields are missing in the request body');
    }

    const bytes = await postPhoto.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const imageId = uuidv4(); // Generate a unique identifier for the image
    const imageURL = `/api/post/image/${imageId}`;

    // Create a GridFSBucket instance using the MongoDB connection
    const bucket = new GridFSBucket(req.db);

    // Create an upload stream to store the image data in the GridFS bucket
    const uploadStream = bucket.openUploadStream(imageId, {
      // Content Type of any type of image
      contentType: 'image/*',
      metadata: {
        caption: caption,
        tag: tag,
        creatorId: creatorId,
      },
    });

    // Write the image data to the upload stream
    uploadStream.write(buffer);
    uploadStream.end();

    // Save the metadata of the image in the Post collection
    const newPost = await Post.create({
      creator: creatorId,
      caption: caption,
      tag: tag,
      postPhoto: imageURL,
    });

    // Update the user's posts array
    await User.findByIdAndUpdate(
      creatorId,
      { $push: { posts: newPost._id } },
      { new: true, useFindAndModify: false }
    );

    return new Response(JSON.stringify(newPost), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response('Failed to create a new post', { status: 500 });
  }
};
