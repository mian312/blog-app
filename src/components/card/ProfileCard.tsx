"use client"

import { useUser } from "@clerk/nextjs";
import Loader from "@/components/Loader";
import { PersonAddAlt, PersonPin, PersonRemove } from "@mui/icons-material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { tabs } from "@/constants";
import Link from "next/link";

interface UserData {
    _id: string;
    clerkId: string;
    firstName: string;
    lastName: string;
    username: string;
    profilePhoto: string;
    posts: any[];
    followers: any[];
    following: any[];
}

interface Props {
    userData: UserData;
    activeTab: string;
}

const ProfileCard: React.FC<Props> = ({ userData, activeTab }) => {
    const { user, isLoaded } = useUser();

    const [loading, setLoading] = useState(true);

    const [userInfo, setUserInfo] = useState<UserData>({
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
        const response = await fetch(`/api/user/${user?.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        setUserInfo(data);
        setLoading(false);
    };

    useEffect(() => {
        if (user) {
            getUser();
        }
    }, [user]);

    const isFollowing = userInfo?.following?.find(
        (item) => item._id === userData._id
    );

    const handleFollow = async () => {
        const response = await fetch(
            `/api/user/${user?.id}/follow/${userData._id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        setUserInfo(data);
    };

    return loading || !isLoaded ? (
        <Loader />
    ) : (
        <div className="flex flex-col gap-9">
            <div className="flex justify-between items-start">
                <div className="flex gap-5 items-start">
                    <Image
                        src={userData.profilePhoto}
                        alt="profile photo"
                        width={100}
                        height={100}
                        className="rounded-full md:max-lg:hidden"
                    />

                    <div className="flex flex-col gap-3">
                        <p className=" text-heading3-bold max-sm:text-heading4-bold">
                            {userData.firstName} {userData.lastName}
                        </p>
                        <p className="text-light-3 text-subtle-semibold">
                            {userData.username}
                        </p>
                        <div className="flex gap-7 text-small-bold max-sm:gap-4">
                            <div className="flex max-sm:flex-col gap-2 items-center max-sm:gap-0.5">
                                <p className="text-purple-1">{userData?.posts.length}</p>
                                <p className="">Posts</p>
                            </div>
                            <div className="flex max-sm:flex-col gap-2 items-center max-sm:gap-0.5">
                                <p className="text-purple-1">{userData.followers.length}</p>
                                <p className="">Followers</p>
                            </div>
                            <div className="flex max-sm:flex-col gap-2 items-center max-sm:gap-0.5">
                                <p className="text-purple-1">{userData.following.length}</p>
                                <p className="">Following</p>
                            </div>
                        </div>
                    </div>
                </div>

                {user?.id === userData.clerkId
                    ? <PersonPin
                        sx={{ color: "#7857FF", cursor: "pointer", fontSize: 35 }}
                    />
                    : (isFollowing ? (
                        <PersonRemove
                            sx={{ color: "#7857FF", cursor: "pointer", fontSize: 35 }}
                            onClick={handleFollow}
                        />
                    ) : (
                        <PersonAddAlt
                            sx={{ color: "#7857FF", cursor: "pointer", fontSize: 35 }}
                            onClick={handleFollow}
                        />
                    ))}
            </div>

            <div className="flex gap-6">
                {tabs.map((tab, index) => (
                    <Link
                        key={index}
                        className={`tab ${activeTab === tab?.link ? "bg-purple-1" : "bg-dark-2"
                            }`}
                        href={`/profile/${userData._id}?q=${tab.link}`}
                    >
                        {tab.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProfileCard;