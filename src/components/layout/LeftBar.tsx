"use client";

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";


const LeftBar = () => {
  const pathname = usePathname();
  const [userData, setUserData] = useState({
    firstName: "User", lastName: "Name",
    posts: [],followers: [],following: [],
  });

  return (
    <div className="h-screen bg-stone-800 left-0 top-0 sticky overflow-auto px-10 py-6 flex flex-col gap-6 max-md:hidden 2xl:w-[30vw] pr-20 custom-scrollbar">
      <Link href="/" className='self-center'>
        <Image src="/assets/logo.png" className='rounded-full'
          alt="logo" width={100} height={100} />
      </Link>

      <div className="flex flex-col gap-2">
        <h3 className="text-center text-base-bold text-light-1">
          {userData?.firstName} {userData?.lastName}
        </h3>
        <div className="flex text-light-1 justify-between">
          <div className="flex flex-col items-center">
            <p className="text-base-bold">{userData?.posts?.length}</p>
            <p className="text-tiny-medium">Posts</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-base-bold">{userData?.followers?.length}</p>
            <p className="text-tiny-medium">Followers</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-base-bold">{userData?.following?.length}</p>
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
