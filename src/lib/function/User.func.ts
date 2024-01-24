import { connectDB } from "@/lib/db/mongo";
import User from "@/lib/model/User.model";
import { EmailAddressJSON } from "@clerk/nextjs/server";

// Define types for better code readability
type Id = string | undefined;
type UserDetails = {
    first_name: string;
    last_name: string;
    image_url: string;
    user_name: string | null;
    email: EmailAddressJSON[];
};

/**
 * Create a new user in the database.
 * @param id - User ID
 * @param details - User details
 * @returns Created user object
 */
export const createUser = async ({ id, details }: { id: Id; details: UserDetails }) => {
    try {
        await connectDB();

        const { first_name, last_name, image_url, email, user_name } = details;

        const user = new User({
            clerkId: id,
            firstName: first_name,
            lastName: last_name,
            profilePhoto: image_url,
            username: user_name,
            email: email,
        });

        await user.save();
        return user;
    } catch (error: any) {
        console.error(error.message);
    }
};

/**
 * Update an existing user in the database.
 * @param id - User ID
 * @param details - Updated user details
 * @returns Updated user object
 */
export const updateUser = async ({ id, details }: { id: Id; details: UserDetails }) => {
    try {
        await connectDB();

        const { first_name, last_name, image_url, email, user_name } = details;

        const user = await User.findOneAndUpdate(
            { clerkId: id },
            {
                $set: {
                    clerkId: id,
                    firstName: first_name,
                    lastName: last_name,
                    profilePhoto: image_url,
                    username: user_name,
                    email: email,
                },
            },
            { new: true }
        );

        return user;
    } catch (error: any) {
        console.error(error.message);
    }
};

/**
 * Delete a user from the database.
 * @param id - User ID
 * @returns Deleted user object
 */
export const deleteUser = async (id: Id) => {
    try {
        await connectDB();

        const user = await User.findOneAndDelete({ clerkId: id });
        return user;
    } catch (error: any) {
        console.error(error.message);
    }
};
