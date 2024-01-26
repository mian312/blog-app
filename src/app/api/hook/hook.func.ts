import { createUser, deleteUser, updateUser } from "@/lib/function/User.func";
import { EmailAddressJSON } from "@clerk/nextjs/server";


type Data = {
    id: string | undefined;
    first_name: string;
    last_name: string;
    image_url: string;
    username: string | null;
    email_addresses: EmailAddressJSON[];
}

// Function to handle createUser
export const create_user = async (data: Data) => {
    if (!data) {
        return {
            status: 404,
            message: "Data not found",
        };
    }

    try {
        await createUser({
            id: data.id,
            details: {
                first_name: data.first_name,
                last_name: data.last_name,
                image_url: data.image_url,
                user_name: data.username,
                email: data.email_addresses
            }
        });

        // Return the success response
        return {
            status: 200,
            message: "User created successfully",
        };
    } catch (error: any) {
        // Return an error response
        return {
            status: 400,
            message: "Failed to create user",
            error: error.message
        };
    }
};


// Function to handle updateUser
export const update_user = async (data: Data) => {
    if (!data) {
        return {
            status: 404,
            message: "Data not found",
        };
    }

    try {
        await updateUser({
            id: data.id,
            details: {
                first_name: data.first_name,
                last_name: data.last_name,
                image_url: data.image_url,
                user_name: data.username,
                email: data.email_addresses
            }
        });

        // Return the success response
        return {
            status: 200,
            message: "User updated successfully",
        };
    } catch (error: any) {
        // Return an error response
        return {
            status: 400,
            message: "Failed to update user",
            error: error.message
        };
    }
}


// Function to handle delete user
export const delete_user = async (id: string | undefined) => {
    if (!id) {
        return {
            status: 404,
            message: "ID not found",
        };
    }

    try {
        await deleteUser(id);

        // Return an success response
        return {
            status: 200,
            message: "User deleted successfully",
        };
    } catch (error: any) {
        // Return an error response
        return {
            status: 400,
            message: error.message,
        };
    }
}