"use client";

import { getRefreshToken } from "@/api/jwtClient";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { COMMONS_CONST } from "@/constants/commons";
import { useGetMe } from "@/hooks/query-customers/useGetMe";
import { useLogoutCustomer } from "@/hooks/query-customers/useLogoutCustomer";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useAuthStore } from "@/store/useAuthStore";
import { getFullName } from "@/utils/common";
import Link from "next/link";
import { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

const Account = () => {
  const { data } = useGetMe();
  const { toastLoading } = useToastMessage();
  const mutate = useLogoutCustomer();

  const { setCustomerId } = useAuthStore();
  useEffect(() => {
    setCustomerId(data?._id ?? "");
  }, [data]);

  const handleLogout = () => {
    toastLoading(COMMONS_CONST.LOADING);
    mutate.mutate(getRefreshToken());
  };

  return data ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="relative h-8 w-8 rounded-full border-stone-300 hover:bg-sky-300 hover:text-white"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={data.avatar} alt="@shadcn" />
            <AvatarFallback className="bg-transparent">
              <FaUser />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 border-stone-300 bg-white text-black shadow-2xl"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {getFullName(data.first_name, data.last_name)}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {data.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-stone-300" />
        <Link href={"/profile"}>
          <DropdownMenuItem className="cursor-pointer focus:bg-sky-500 focus:text-white">
            <FaUser className="mr-2 h-4 w-4" />
            <span>Thông tin</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator className="bg-stone-300" />
        <DropdownMenuItem
          className="cursor-pointer focus:bg-sky-500 focus:text-white"
          onClick={handleLogout}
        >
          <IoLogOutOutline className="mr-2 h-4 w-4" />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Link
      className="font-medium underline-offset-4 hover:underline"
      href="/login"
    >
      <Button className="text-lg text-black hover:text-sky-300" variant="link">
        Đăng nhập
      </Button>
    </Link>
  );
};

export default Account;
