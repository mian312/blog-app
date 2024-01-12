import React from 'react'
import { UserButton } from '@clerk/nextjs'

function Home() {
    return (
        <div className="h-screen">
            <UserButton afterSignOutUrl="/" />
        </div>
    )
}

export default Home;
