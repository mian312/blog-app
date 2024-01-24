import mongoose from "mongoose";

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
            console.log(`MongoDB Connected: ${conn.connection.host}`);
        } catch (error: any) {
            console.error(`Error: ${error.message}`);
            process.exit();
        }
    } while (!isConnected);
}