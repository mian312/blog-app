"use client";

import Posting from '@/components/form/Posting';
import React from 'react'
import { useUser } from "@clerk/nextjs";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

interface PostData {
  creatorId: string;
  caption: string;
  tag: string;
  postPhoto: FileList | string;
}


const CreatePost = () => {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const [loading, setLoading] = useState(true);


  const [postData, setPostData] = useState<PostData>({
    creatorId: `${null}`,
    caption: "",
    tag: "",
    postPhoto: "",
  });

  const getUser = async () => {
    const response = await fetch(`/api/user/${user?.id}`);
    const data = await response.json();
    setPostData(prevData => ({
      ...prevData,
      creatorId: data?._id
    }))
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      getUser();
      // console.log(postData);
    } else {
      router.push('/sign-in')
    }
  }, [user, loading]);

  return loading && !isLoaded ? (
    <Loader />
  ) : (
    <div className="pt-6">
      <Posting post={postData} apiEndpoint={"/api/post/new"} />
    </div>
  );
};


export default CreatePost;
