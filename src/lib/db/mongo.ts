import mongoose from "mongoose";
import { Db } from 'mongodb';

let isConnected: boolean = false;

// Connect to mongoDB
export const connectDB = async () => {
    // Using a 'do-while' loop to keep trying to connect until it succeeds.
    do {
        try {
            const conn = await mongoose.connect(process.env.MONGO_URI as string, {
                dbName: process.env.DB_NAME
            });
            isConnected = true;
            // console.log(`MongoDB Connected: ${conn.connection.host}`);
        } catch (error: any) {
            console.error(`Error: ${error.message}`);
            process.exit();
        }
    } while (!isConnected);
}

// Middleware function to attach db to req object
interface CustomNextApiRequest extends Request {
    formData(): Promise<any>; // Adjust the return type as per the actual return type of formData()
    db: Db;
}

// Attach db to req object
export const attachDB = async (req: CustomNextApiRequest) => {
    if (!isConnected) {
        await connectDB();
    }
    req.db = mongoose.connection.db;
}