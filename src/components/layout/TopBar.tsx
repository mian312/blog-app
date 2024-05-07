"use client";

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Add, Search } from '@mui/icons-material'

const TopBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  return (
    <div className="flex justify-between items-center mt-6">
      <UserButton appearance={{ baseTheme: dark }} afterSignOutUrl="/sign-in" />

      <div className="relative">
        <input
          type="text"
          className="search-bar"
          placeholder="Search posts, people, ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search
          className="search-icon"
          onClick={() => router.push(`/search/posts/${search}`)}
        />
      </div>

      <button
        className="create-post-btn mx-2"
        onClick={() => router.push("/create-post")}
      >
        <Add /> <p>Create Post</p>
      </button>
    </div>
  )
}

export default TopBar
