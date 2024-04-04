import Navbar from "./_components/molecules/Navbar";
import Sidebar from "./_components/molecules/Sidebar";

const PortalLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="clearfix relative bg-[#F7FAFC] w-screen h-screen overflow-auto">
      <Sidebar />
      <div className="relative pl-[255px]">
        <Navbar />
        <main className="py-[58px] pl-[18px] pr-[83px]">{children}</main>
      </div>
    </div>
  );
};

export default PortalLayout;
