"use client";
import { useState } from "react";
import Navbar from "../_components/molecules/Navbar";
import Sidebar from "../_components/molecules/Sidebar";

const PortalTemplate = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [sidebar, setSidebar] = useState<boolean>(false);
  return (
    <section className="relative">
      <Sidebar {...{ sidebarActive: sidebar, setSidebarActive: setSidebar }} />
      <main className="relative pl-[268px] max-xl:pl-0">
        <Navbar />
        <section className="relative pl-[32px] pr-[40px] max-xl:px-[11px] py-[28px] bg-[#F7FAFC]">
          {children}
        </section>
      </main>
    </section>
  );
};

export default PortalTemplate;
