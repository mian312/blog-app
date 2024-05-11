"use client"

import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import Posting from "@/components/form/Posting";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

const EditPost: React.FC = () => {
    const router = useRouter();
    const {user, isLoaded} = useUser();
    const { id } = useParams();

    const [loading, setLoading] = useState<boolean>(true);
    const [postData, setPostData] = useState<any>({});

    const getPost = async () => {
        try {
            const response = await fetch(`/api/post/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setPostData(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching post:", error);
        }
    };

    useEffect(() => {
        if (id) {
            getPost();
        }
    }, [id]);

    const postInfo = {
        creatorId: postData?.creator?._id,
        caption: postData?.caption,
        tag: postData?.tag,
        postPhoto: postData?.postPhoto,
    };

    useEffect(() => {
        if (!user) router.push('/sign-in')
    }, [user])

    return loading || !isLoaded ? (
        <Loader />
    ) : (
        <div className="pt-6">
            <Posting post={postInfo} apiEndpoint={`/api/post/${id}`} />
        </div>
    );
};

export default EditPost;
