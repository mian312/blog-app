"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Loader from "@/components/Loader";
import Link from "next/link";
import { useParams } from "next/navigation";
import UserCard from "@/components/card/UserCard";

const SearchPeople: React.FC = () => {
    const { query } = useParams();

    const [loading, setLoading] = useState(true);
    // const [searchedPosts, setSearchedPosts] = useState<any[]>([]);
    const [searchedPeople, setSearchedPeople] = useState<any[]>([]);

    const { user, isLoaded } = useUser();

    const getSearchedPeople = async () => {
        try {
            const response = await fetch(`/api/user/search/${query}`);
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            const data = await response.json();
            setSearchedPeople(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching searched users:', error);
            // Handle the error, e.g., display an error message to the user
        }
    };


    useEffect(() => {
        getSearchedPeople();
    }, [query]);

    return loading || !isLoaded ? (
        <Loader />
    ) : (
        <div className="flex flex-col gap-10">
            <div className="flex gap-6">
                <Link className="tab bg-dark-2" href={`/search/posts/${query}`}>
                    Posts
                </Link>
                <Link className="tab bg-purple-1" href={`/search/people/${query}`}>
                    People
                </Link>
            </div>

            {searchedPeople.map((person) => (
                <UserCard
                    key={person._id}
                    userData={person}
                    update={getSearchedPeople}
                />
            ))}
        </div>
    );
};

export default SearchPeople;
