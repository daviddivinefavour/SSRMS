import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaBell } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="relative bg-white flex items-center h-[104px] pl-[18px] pr-[101px] border-b-[1px] border-solid border-[#EDEDED]">
      <div className="flex gap-[5px] items-center border-[1px] border-[#CBD5E0] border-solid rounded-[14px] w-[582px] h-[40px] overflow-hidden">
        <AiOutlineSearch className="text-[18px] w-[37px] text-center shrink-0" />
        <input
          type="text"
          placeholder="Search date or transaction"
          className="w-full h-full placeholder:text-[#A0AEC0] text-[12px] font-[400] leading-[18px] focus:outline-0"
        />
      </div>
      <a
        href="#"
        className="ml-auto flex w-[24px] h-[24px] justify-center items-center rounded-[6px] bg-[#E2E8F0]"
      >
        <FaBell className="text-[12px] text-[#718096]" />
      </a>
    </nav>
  );
};

export default Navbar;
