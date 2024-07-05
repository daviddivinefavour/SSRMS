'use client'
import React from 'react'
import Image from 'next/image'
import { LuBell } from 'react-icons/lu'
import { IoChevronDown } from 'react-icons/io5'
export const dummyAvatarUrl =
  'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png'

const Navbar = () => {
  return (
    <nav className="relative flex gap-5 max-sm:gap-4 items-center h-[88px] pl-[11px] pr-[80px] max-xl:pr-[11px] xl:bg-white border-b-[1px] border-solid border-[#EDEDED]">
      <div className="flex items-center xl:hidden gap-[6px]">
        {/* <button
          type="button"
          className="relative"
          onClick={() => setSidebarActive(true)}
        >
          <HiBars3 className="text-primary-main text-[24px]" />
          <span className="block absolute -top-0.5 -right-0.5 border-2 border-white h-3 w-3 rounded-full bg-primary-main"></span>
        </button> */}

        <Image src={'/#'} alt="logo" width={73} height={16} priority />
      </div>

      <div className="relative ml-auto">
        <LuBell className="text-[24px] text-gray-500" />
        <span className="block absolute top-0 right-0 border-[1px] border-white h-2 w-2 rounded-full bg-red-500"></span>
      </div>

      <button type="button" className="relative flex items-center gap-2">
        <div className="relative w-10 h-10 overflow-hidden rounded-full max-sm:h-6 max-sm:w-6">
          <Image
            src={dummyAvatarUrl}
            fill
            alt="avatar"
            className="object-cover object-center"
            sizes="40px"
          />
        </div>

        <div className="text-left max-sm:hidden">
          <h6 className="text-[#020B17] text-[12px] font-medium leading-[18px]">
            James Allen
          </h6>
          <p className="text-[#4B5460] text-[10px] font-medium leading-[15px]">
            HA19/1023
          </p>
        </div>

        <IoChevronDown className="text-base text-gray-400 max-sm:hidden" />
      </button>
    </nav>
  )
}

export default Navbar
