"use client";

import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import Loader from '@/components/Loader';
import PostCard from '@/components/card/PostCard';

function Home() {
    const { user, isLoaded } = useUser();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | unknown>(null);

    const [feedPost, setFeedPost] = useState<any[]>([]);

    const getFeedPost = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/post');
            const data = await response.json();
            setFeedPost(data);
        } catch (error: any) {
            setError(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        getFeedPost();
    }, [])

    return loading || !isLoaded
        ? <Loader />
        : (
            <div className="h-screen">
                <div className="flex flex-col gap-10">
                    {feedPost.map((post) => (
                        <PostCard
                            key={post._id}
                            post={post}
                            creator={post.creator}
                            loggedInClerkID={user?.id}
                            update={getFeedPost}
                        />
                    ))}
                </div>

            </div>
        )
}

export default Home;
