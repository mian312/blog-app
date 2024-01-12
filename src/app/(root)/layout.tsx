import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import LeftBar from '@/components/layout/LeftBar'
import RightBar from '@/components/layout/RightBar'
import BottomBar from '@/components/layout/BottomBar'
import MainContainer from '@/components/layout/container/MainContainer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Blog-Sphere 2',
    description: 'A Social Media App',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-purple-2 text-light-1`}>
                <main className="flex flex-row">
                    <LeftBar />
                    <MainContainer>
                        {children}
                    </MainContainer>
                    <RightBar />
                </main>
                <BottomBar />
            </body>
        </html>
    )
}
