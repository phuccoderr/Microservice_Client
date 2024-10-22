"use client";
import { productSocket } from "@/api/socket";
import BreadCrumbMe from "@/components/home/bread-crumb";
import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import { useGetMe } from "@/hooks/query-customers/useGetMe";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { IoBagRemoveSharp } from "react-icons/io5";
import { toast } from "sonner";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: me } = useGetMe();
  const queryClient = useQueryClient();

  useEffect(() => {
    const notifyUpload = (email: any) => {
      if (me?.email == email) {
        toast(
          <div className="flex items-center gap-2">
            <IoBagRemoveSharp />
            <h1>Trạng thái hoá đơn của bạn đã được cập nhật</h1>
          </div>,
          {
            className: "bg-gray-200 text-black",
          },
        );
        queryClient.refetchQueries({ queryKey: ["orders-me"] });
      }
    };
    productSocket.on("order-status", notifyUpload);

    return () => {
      productSocket.off("order-status", notifyUpload);
    };
  }, [me]);
  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      <Header />
      <BreadCrumbMe />
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
