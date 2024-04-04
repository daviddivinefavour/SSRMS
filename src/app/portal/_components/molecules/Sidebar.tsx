import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { BsWallet2 } from "react-icons/bs";
import { HiOutlineCog } from "react-icons/hi";

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="fixed left-0 top-0 bg-white z-20 w-[255px] h-screen flex flex-col border-r-[1px] border-solid border-[#EDEDED]">
      {/* Header */}
      <div className="flex gap-[11px] py-[30px] px-[28px] w-full h-[104px] border-b-[1px] border-solid border-[#EDEDED]">
        <Image
          src="/assets/images/avatar.svg"
          alt="logo"
          width={24}
          height={24}
        />

        <div>
          <h6 className="text-[#121212] text-[16px] font-[600] leading-[19.5px]">
            Emeka Okafor
          </h6>
          <span className="text-[#A1A1A1] text-[14px] font-[400] leading-[19.5px]">
            emekaokafor1@gmail.com
          </span>
        </div>
      </div>

      {/* Navbar */}
      <div className="pl-[28px] pr-[17px] py-[32px]">
        <ul className="flex flex-col gap-[26px]">
          <li className="w-full">
            <Link
              href="/dashboard"
              className={`flex items-center py-[6px] px-[0px] gap-[10px] ${
                router.pathname == "/dashboard"
                  ? "text-[#2586AE] bg-[#F4F9FF]"
                  : "text-[#121212]"
              }`}
            >
              <BiSolidDashboard className="text-[24px]" />
              <span className="text-[14px] font-[700] leading-[19.5px]">
                Dashboard
              </span>
              {router.pathname == "/dashboard" && (
                <span className="block bg-[#2586AE] w-[4px] h-[24px] rounded-[3px] ml-auto"></span>
              )}
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="/dashboard/wallet"
              className={`flex items-center py-[6px] px-[0px] gap-[10px] ${
                router.pathname == "/dashboard/wallet"
                  ? "text-[#2586AE] bg-[#F4F9FF]"
                  : "text-[#121212]"
              }`}
            >
              <BsWallet2 className="text-[24px]" />
              <span className="text-[14px] font-[500] leading-[19.5px]">
                Wallet
              </span>
              {router.pathname == "/dashboard/wallet" && (
                <span className="block bg-[#2586AE] w-[4px] h-[24px] rounded-[3px] ml-auto"></span>
              )}
            </Link>
          </li>
          <li className="w-full">
            <a
              href="#"
              className="flex items-center text-[#121212] py-[6px] px-[0px] gap-[10px]"
            >
              <HiOutlineCog className="text-[24px]" />
              <span className="text-[14px] font-[500] leading-[19.5px]">
                Settings
              </span>
            </a>
          </li>
        </ul>
      </div>

      {/* Logo */}
      <div className="flex gap-[17px] mt-auto justify-center mb-[61px]">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={41}
          height={43}
        />

        <div>
          <h6 className="text-[#000] text-[20px] font-[800] leading-[19.5px]">
            KenPoly
          </h6>
          <span className="text-[#898B8C] text-[15px] font-[400] leading-[19.5px]">
            Manage your finance
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
