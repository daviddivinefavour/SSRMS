import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Image from 'next/image'
import { useAuth } from '@/context/auth.context'

export const metadata: Metadata = {
  title: 'KenPoly',
  description: 'Kenpoly project 2023/2024',
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <section className="grid grid-cols-2 max-xl:grid-cols-1 h-screen w-screen">
          <div className="relative h-full w-full max-xl:hidden">
            <Image
              src="/assets/images/login.jpg"
              layout="fill"
              className="object-cover"
              alt="auth bg"
            />
            <div className="absolute top-0 left-0 h-full w-full flex">
              <div className="mt-auto mx-auto h-64 max-w-[400px] w-full mb-14">
                {/* <AuthSlider /> */}
              </div>
            </div>
          </div>
          <div className="relative pl-[67px] pr-[120px] max-xl:px-4 py-[90px] max-xl:max-w-lg w-full max-xl:mx-auto h-full overflow-y-auto">
            <Image
              src="/assets/images/kenpoloyLogo.png"
              width={173}
              height={36}
              className="mb-[42px]"
              alt="auth bg"
            />
            {children}
          </div>
        </section>
      </body>
    </html>
  )
}
