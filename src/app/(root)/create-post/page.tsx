"use client";

import Posting from '@/components/form/Posting';
import React from 'react'
import { useUser } from "@clerk/nextjs";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";


// interface UserData {
//   _id: string;
//   clerkId: string;
// }

interface PostData {
  creatorId: string;
  caption: string;
  tag: string;
  postPhoto: FileList | string;
}


const CreatePost = () => {
  const { user, isLoaded } = useUser();

  const [loading, setLoading] = useState(true);

  // const [userData, setUserData] = useState<UserData>({
  //   _id: `${null}`, clerkId: `${user?.id}`
  // });

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
