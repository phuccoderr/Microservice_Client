"use client";
import { ConnectSocket } from "@/api/socket";
import SidebarAdmin from "@/components/admin/sidebar";
import Topbar from "@/components/admin/topbar";
import URL_CONST from "@/constants/api";
import { useSidebarStore } from "@/store/useSidebarStore";
import { ReactNode } from "react";
import { toast } from "sonner";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: Readonly<DashboardLayoutProps>) {
  const { open } = useSidebarStore();
  const socket = ConnectSocket(URL_CONST.PRODUCT_SOCKET);
  socket.on("add-image", (data) => {
    toast.success(data);
  });

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
