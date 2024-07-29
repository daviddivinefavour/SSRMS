'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { sidebarItems } from '../../_constants/navmenu'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import { LuLogOut } from 'react-icons/lu'
import LogOutButton from './LogoutButton'

const Sidebar = ({ sidebarActive, setSidebarActive }: any) => {
  const pathname = usePathname()

  const { students } = sidebarItems
  return (
    <>
      <div
        className={`fixed z-40 flex flex-col gap-3 h-screen w-[268px] bg-white p-[32px] animate overflow-y-auto max-xl:-left-[300px] max-xl:[&.active]:left-0 border-r-[1px] border-solid border-[#EDEDED] ${
          sidebarActive ? 'active' : ''
        }`}
      >
        <Image
          src="/assets/images/kenpoloyLogo.png"
          alt="logo"
          className="mb-[30px]"
          priority
          width={150}
          height={100}
        />
        {/* <h1 className="font-bold text-xl mb-2">Student Portal</h1> */}
        {students.map((item) => {
          return (
            <Link
              href={item.url}
              key={item.url}
              as={item.url}
              className={`flex w-full rounded-lg items-center text-[.85rem] font-medium text-[#ADBCD0] 
              px-4 py-2 gap-2  hover:text-black animate 
              ${pathname === item.url ? 'active' : ''} 
              
              [&.active]:bg-main-primary-main/10 [&.active]:text-main-primary-main  hover:text-main-primary-main ${
                item.special
              }
            `}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          )
        })}
        <LogOutButton />
      </div>

      {/* {sidebarActive && (
        <a
          href="#"
          className="fixed z-30 w-screen h-screen bg-black/20 animate"
          onClick={() => setSidebarActive(false)}
        ></a>
      )} */}
    </>
  )
}

export default Sidebar
