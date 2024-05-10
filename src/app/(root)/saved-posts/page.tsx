"use client";

import React, { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import Loader from '@/components/Loader'
import PostCard from '@/components/card/PostCard'

const SavedPosts = () => {
    const { user, isLoaded } = useUser()

    const [loading, setLoading] = useState<Boolean>(true)

    const [userData, setUserData] = useState<any>({})

    const getUser = async () => {
        const response = await fetch(`/api/user/${user?.id}`)
        const data = await response.json()
        setUserData(data)
        setLoading(false)
    }

    useEffect(() => {
        if (user) {
            getUser()
        }
    }, [user])

    return loading || !isLoaded ? <Loader /> : (
        <div className='flex flex-col gap-9'>
            {userData?.savedPosts?.map((post: any) => (
                <PostCard key={post._id} post={post} creator={post.creator} loggedInClerkID={user?.id} update={getUser} />
            ))}
        </div>
    )
}

export default SavedPosts