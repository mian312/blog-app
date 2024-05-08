"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { useUser } from '@clerk/nextjs';


const LeftBar = () => {
  const { user, isLoaded } = useUser();
  const pathname = usePathname();

  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState({
    posts: [0], followers: [0], following: [0],
  });

  const getUserData = async () => {
    try {
      const response = await fetch(`/api/user/${user?.id}`);
      const data = await response.json();
      setUserData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  useEffect(() => {
    getUserData();
    console.log(userData);
    // console.log(user);
  }, [user])

  return (
    <div className="h-screen bg-stone-800 left-0 top-0 sticky overflow-auto px-10 py-6 flex flex-col gap-6 max-md:hidden 2xl:w-[30vw] pr-20 custom-scrollbar">
      <Link href="/" className='self-center'>
        <Image src="/assets/logo.png" className='rounded-full'
          alt="logo" width={100} height={100} />
      </Link>

      <div className="flex flex-col gap-2">
        <h3 className={`text-center text-base-bold min-h-6 w-full text-light-1 ${loading ? 'animate-pulse bg-slate-500' : ''}`}>
          {user?.username}
        </h3>
        <div className="flex text-light-1 justify-between">
          <div className="flex flex-col items-center">
            <p className={`text-base-bold w-full text-center min-h-4 ${loading ? 'animate-pulse bg-slate-500' : ''}`}>{userData?.posts?.length}</p>
            <p className="text-tiny-medium">Posts</p>
          </div>
          <div className="flex flex-col items-center">
            <p className={`text-base-bold w-full text-center min-h-4 ${loading ? 'animate-pulse bg-slate-500' : ''}`}>{userData?.followers?.length}</p>
            <p className="text-tiny-medium">Followers</p>
          </div>
          <div className="flex flex-col items-center">
            <p className={`text-base-bold w-full text-center min-h-4 ${loading ? 'animate-pulse bg-slate-500' : ''}`}>{userData?.following?.length}</p>
            <p className="text-tiny-medium">Following</p>
          </div>
        </div>
      </div>

      <hr />

      <hr />

      <div className="flex gap-2 items-center">
        <div className="flex flex-col gap-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.route;

            return (
              <Link
                key={link.label}
                href={link.route}
                className={`flex gap-4 justify-start rounded-lg py-2 px-4 ${isActive && "bg-purple-1"
                  }`}
              >
                {link.icon} <p className="text-light-1">{link.label}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default LeftBar
