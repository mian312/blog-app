"use client";

import { useUser } from "@clerk/nextjs";
import Loader from "@/components/Loader";
import { PersonAddAlt, PersonPin, PersonRemove } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface UserData {
  _id: string;
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  profilePhoto: string;
  following?: { _id: string }[];
}

interface UserCardProps {
  userData: UserData;
  update: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ userData, update }) => {
  const { user, isLoaded } = useUser();

  const [loading, setLoading] = useState(true);

  const [userInfo, setUserInfo] = useState<UserData>({
    _id: "",
    clerkId: "",
    firstName: "",
    lastName: "",
    username: "",
    profilePhoto: "",
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
    update();
  };

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className="flex justify-between items-center rounded-lg bg-slate-200 p-5">
      <Link
        className="flex gap-4 items-center"
        href={`/profile/${userData._id}?q=posts`}
      >
        <Image
          src={userData.profilePhoto}
          alt="profile photo"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="flex flex-col gap-1">
          <p className="text-base-bold">
            {userData.firstName} {userData.lastName}
          </p>
          <p className="text-subtle-medium text-light-3">
            @{userData.username}
          </p>
        </div>
      </Link>

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
  );
};

export default UserCard;
