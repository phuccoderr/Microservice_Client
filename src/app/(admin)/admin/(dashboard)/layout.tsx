"use client";

import { productSocket } from "@/api/socket";
import { AppSidebar } from "@/components/admin/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
    productSocket.on("add-image", notifyUpload);

    return () => {
      productSocket.off("add-image", notifyUpload);
    };
  }, []);

  return (
    <AppSidebar>
      <main className="w-full">{children}</main>
    </AppSidebar>
  );
}
