"use client";
import SidebarAdmin from "@/components/admin/sidebar";
import Topbar from "@/components/admin/topbar";
import { useSidebarStore } from "@/store/useSidebarStore";
import { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: Readonly<DashboardLayoutProps>) {
  const { open, setOpen } = useSidebarStore();

  return (
    <div className="flex">
      <SidebarAdmin />
      <div
        className={`${!open ? "ml-[250px]" : "ml-[100px]"} w-full flex-col p-4`}
      >
        <Topbar />
        {children}
      </div>
    </div>
  );
}
