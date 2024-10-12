"use client";
import { socket } from "@/api/socket";
import SidebarAdmin from "@/components/admin/sidebar";
import Topbar from "@/components/admin/topbar";
import { useGetMe } from "@/hooks/query-customers/useGetMe";
import { useGetMeUser } from "@/hooks/query-users/useGetMeUser";
import { useSidebarStore } from "@/store/useSidebarStore";
import { CookieUtils } from "@/utils/cookie-utils";
import { ReactNode, useEffect } from "react";
import { FaFileImage } from "react-icons/fa";
import { toast } from "sonner";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: Readonly<DashboardLayoutProps>) {
  const { open } = useSidebarStore();
  const { isError } = useGetMeUser();

  useEffect(() => {
    if (isError) {
      localStorage.removeItem("refresh_token");
      CookieUtils.remove("access_token");
      window.location.href = "/admin/login";
    }
  }, [isError]);

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
