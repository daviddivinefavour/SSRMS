"use client";
import { useEffect, useState } from "react";
import Navbar from "../_components/molecules/Navbar";
import Sidebar from "../_components/molecules/Sidebar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth.context";

const PortalTemplate = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [sidebar, setSidebar] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  const { checkAuthUser } = useAuth();
  useEffect(() => {
    const checkUser = async () => {
      const user = await checkAuthUser();
      if (!user) {
        router.push("/");
      }
      setIsAuthenticated(true);
    };
    checkUser();
  }, [router, checkAuthUser]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }
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
