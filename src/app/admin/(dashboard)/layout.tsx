"use client";
import { socket } from "@/api/socket";
import SidebarAdmin from "@/components/admin/sidebar";
import Topbar from "@/components/admin/topbar";
import URL_CONST from "@/constants/api";
import { useSidebarStore } from "@/store/useSidebarStore";
import { ReactNode, useEffect, useState } from "react";
import { FaFileImage } from "react-icons/fa";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: Readonly<DashboardLayoutProps>) {
  const { open } = useSidebarStore();

  useEffect(() => {
    const notifyUpload = (data: any) => {
      toast.success("Upload Image 🚀", {
        icon: <FaFileImage />,
        description: data,
        closeButton: true,
      });
    };
    socket.on("add-image", notifyUpload);

    return () => {
      socket.off("add-image", notifyUpload);
    };
  }, []);

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
