import SidebarAdmin from "@/components/admin/sidebar";
import Topbar from "@/components/admin/topbar";
import { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: Readonly<DashboardLayoutProps>) {
  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="w-full flex-col p-4 ml-[250px]">
        <Topbar />
        {children}
      </div>
    </div>
  );
}
