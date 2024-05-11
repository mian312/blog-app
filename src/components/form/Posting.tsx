"use client";

import React from "react";
import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface PostData {
    creatorId: string;
    caption: string;
    tag: string;
    postPhoto: FileList | string;
}

interface PostingProps {
    post: PostData;
    apiEndpoint: string;
}

const Posting: React.FC<PostingProps> = ({ post, apiEndpoint }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<PostData>({
        defaultValues: post,
    });

    const router = useRouter();

    const handlePublish = async (data: PostData) => {
        try {
            const postForm = new FormData();

            postForm.append("creatorId", post?.creatorId || "");
            postForm.append("caption", data?.caption || "");
            postForm.append("tag", data?.tag || "");

            if (typeof data?.postPhoto !== "string" && data?.postPhoto?.length > 0) {
                postForm.append("postPhoto", data?.postPhoto[0]);
            } else if (typeof data.postPhoto === "string") {
                postForm.append("postPhoto", data?.postPhoto);
            }

            const response = await fetch(apiEndpoint, {
                method: "POST",
                body: postForm,
            });

            if (response.ok) {
                router.push(`/profile/${post?.creatorId}?q=posts`)
                console.log("Post published successfully!");
            } else {
                console.error("Failed to publish the post. Server returned status:", response.status);
                // Handle error response appropriately
            }
        } catch (err) {
            console.error("An error occurred while publishing the post:", err);
            // Handle error appropriately
        }
    };


    return (
        <form
            className="flex flex-col gap-7 pb-24"
            onSubmit={handleSubmit(handlePublish)}
        >
            <label
                htmlFor="photo"
                className="flex gap-4 items-center text-body-bold  cursor-pointer"
            >
                {watch("postPhoto") ? (
                    // Check profile photo is a string or a file
                    typeof watch("postPhoto") === "string" ? (
                        <Image
                            src={watch("postPhoto") as string}
                            alt="post"
                            width={250}
                            height={200}
                            className="object-cover rounded-lg"
                        />
                    ) : (
                        <Image
                            src={URL.createObjectURL(watch("postPhoto")[0] as any)}
                            alt="post"
                            width={250}
                            height={200}
                            className="object-cover rounded-lg"
                        />
                    )
                ) : (
                    <AddPhotoAlternateOutlined
                        sx={{ fontSize: "100px" }}
                    />
                )}
                <p>Upload a photo</p>
            </label>
            <input
                {...register("postPhoto", {
                    validate: (value) => {
                        if (
                            value === null ||
                            (Array.isArray(value) && value.length === 0) ||
                            value === undefined || value.length === 0
                        ) {
                            return "A photo is required!";
                        }
                        return true;
                    },
                })}
                id="photo"
                type="file"
                style={{ display: "none" }}
            />
            {errors.postPhoto && (
                <p className="text-red-500">{errors.postPhoto.message}</p>
            )}

            <div>
                <label htmlFor="caption" className=" text-body-bold ">
                    Caption
                </label>
                <textarea
                    {...register("caption", {
                        required: "Caption is required",
                        validate: (value) => {
                            if (value.length < 3) {
                                return "Caption must be more than 2 characters";
                            }
                        },
                    })}
                    rows={5}
                    placeholder="What's on your mind?"
                    className="w-full h-1/3 input"
                    id="caption"
                />

                {errors.caption && (
                    <p className="text-red-500">{errors.caption.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="tag" className=" text-body-bold ">
                    Tag
                </label>
                <input
                    {...register("tag", { required: "Tag is required" })}
                    type="text"
                    placeholder="#tag"
                    className="w-full input"
                />

                {errors.tag && <p className="text-red-500">{errors.tag.message}</p>}
            </div>

            <button
                type="submit"
                className="py-2.5 rounded-lg mt-10 bg-purple-500 hover:bg-purple-600 text-white text-body-bold "
            >
                Publish
            </button>
        </form>
    );
};

export default Posting;
