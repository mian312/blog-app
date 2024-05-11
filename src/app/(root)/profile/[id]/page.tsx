"use client"

import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation';
import ProfileCard from '@/components/card/ProfileCard'
import Loader from '@/components/Loader';
import PostCard from '@/components/card/PostCard';
import { useUser } from '@clerk/nextjs';
import UserCard from '@/components/card/UserCard';
import { useRouter } from 'next/navigation';

const Posts = ({ posts, clerkID, update }:
  { posts: any[], clerkID: string | undefined, update: () => void }) => {
  return (
    <div className='gap-10'>
      {posts?.map((post) => (
        <PostCard key={post._id} post={post} creator={post.creator} loggedInClerkID={clerkID} update={update} />
      ))}
    </div>
  )
}

const Followers = ({ followers, update }: { followers: any[], update: () => void }) => {
  return (
    <div>
      {followers?.map((person) => (
        <UserCard key={person._id} userData={person} update={update} />
      ))}
    </div>
  );
};

const Followings = ({ followings, update }: { followings: any[], update: () => void }) => {
  return (
    <div>
      {followings?.map((person) => (
        <UserCard key={person._id} userData={person} update={update} />
      ))}
    </div>
  );
};


const Profile = () => {
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const q = searchParams.get('q') as string;

  const { user, isLoaded } = useUser();

  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState({
    _id: '',
    clerkId: '',
    firstName: '',
    lastName: '',
    username: '',
    profilePhoto: '',
    posts: [],
    followers: [],
    following: [],
  });

  const getUser = async () => {
    const response = await fetch(`/api/user/profile/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setUserData(data);
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, [id]);

  useEffect(() => {
    if (!user) router.push('/sign-in')
}, [user])

  const renderContent = () => {
    switch (q) {
      case 'posts':
        return <Posts posts={userData.posts} clerkID={user?.id} update={getUser} />;
      case 'followers':
        return <Followers followers={userData.followers} update={getUser} />;
      case 'followings':
        return <Followings followings={userData.following} update={getUser} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <h3 className="text-2xl font-bold mb-4">Oops!</h3>
            <p className="text-gray-600 text-center">
              It looks like you have requested an invalid page. Please check the URL
              and try again.
            </p>
          </div>
        );
    }
  };

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-9">
      <ProfileCard userData={userData} activeTab={q} />
      <div className='flex flex-col gap-9'>{renderContent()}</div>
    </div>
  )
}

export default Profile
