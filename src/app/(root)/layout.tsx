import { Inter } from 'next/font/google'
import '../globals.css'
import LeftBar from '@/components/layout/LeftBar'
import RightBar from '@/components/layout/RightBar'
import BottomBar from '@/components/layout/BottomBar'
import MainContainer from '@/components/layout/container/MainContainer'

const inter = Inter({ subsets: ['latin'] })

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
