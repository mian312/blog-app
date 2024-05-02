import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bookmark,
  BookmarkBorder,
  BorderColor,
  Delete,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  profilePhoto: string;
  clerkId: string;
  savedPosts?: any[];
  likedPosts?: any[]; 
}

interface Post {
  _id: string;
  caption: string;
  postPhoto: string;
  tag: string;
  likes: any[];
}

interface Props {
  post: Post;
  creator: User;
  loggedInClerkID: string | undefined;
  update: () => void;
}

const PostCard: React.FC<Props> = ({ post, creator, loggedInClerkID, update }) => {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`/api/user/${loggedInClerkID}`);
      const data = await response.json();
      setUserData(data);
    };
    getUser();
  }, [loggedInClerkID]);

  const isSaved = userData?.savedPosts?.find((item) => item._id === post?._id);
  const isLiked = userData?.likedPosts?.find((item) => item._id === post?._id);

  const handleSave = async () => {
    const response = await fetch(
      `/api/user/${loggedInClerkID}/save/${post?._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setUserData(data);
    update();
  };

  const handleLike = async () => {
    const response = await fetch(
      `/api/user/${loggedInClerkID}/like/${post?._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setUserData(data);
    update();
  };

  const handleDelete = async () => {
    await fetch(`/api/post/${post?._id}/${userData?._id}`, {
      method: "DELETE",
    });
    update();
  };

  return (
    <div className="w-full max-w-xl rounded-lg flex flex-col gap-4 bg-slate-200 p-5 max-sm:gap-2">
      <div className="flex justify-between">
        <Link href={`/profile/${creator?._id}/posts`}>
          <div className="flex gap-3 items-center">
            <Image
              src={creator?.profilePhoto}
              alt="profile photo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="flex flex-col gap-1">
              <p className="text-small-semibold">
                {creator?.firstName} {creator?.lastName}
              </p>
              <p className="text-subtle-medium text-light-3">
                @{creator?.username}
              </p>
            </div>
          </div>
        </Link>

        {loggedInClerkID === creator?.clerkId && (
          <Link href={`/edit-post/${post?._id}`}>
            <BorderColor sx={{ color: "black", cursor: "pointer" }} />
          </Link>
        )}
      </div>

      <p className="text-body-normal max-sm:text-small-normal">
        {post?.caption}
      </p>

      <Image
        src={`${post?.postPhoto}`}
        alt="post photo"
        width={200}
        height={150}
        className="rounded-lg w-full"
      />

      <p className="text-base-semibold text-purple-1 max-sm:text-small-normal">
        {post?.tag}
      </p>

      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          {!isLiked ? (
            <FavoriteBorder
              sx={{ color: "red", cursor: "pointer" }}
              onClick={handleLike}
            />
          ) : (
            <Favorite
              sx={{ color: "red", cursor: "pointer" }}
              onClick={handleLike}
            />
          )}
          <p className="">{post?.likes.length}</p>
        </div>

        {loggedInClerkID !== creator?.clerkId && (
          <>
            {isSaved ? (
              <Bookmark
                sx={{ color: "black", cursor: "pointer" }}
                onClick={handleSave}
              />
            ) : (
              <BookmarkBorder
                sx={{ color: "black", cursor: "pointer" }}
                onClick={handleSave}
              />
            )}
          </>
        )}

        {loggedInClerkID === creator?.clerkId && (
          <Delete
            sx={{ color: "black", cursor: "pointer" }}
            onClick={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default PostCard;
