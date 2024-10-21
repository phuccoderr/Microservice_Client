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
import { getFullName } from "@/utils/common";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

const Account = () => {
  const { data } = useGetMe();
  const { toastLoading } = useToastMessage();
  const mutate = useLogoutCustomer();

  const handleLogout = () => {
    toastLoading(COMMONS_CONST.LOADING);
    mutate.mutate(getRefreshToken());
  };

  return data ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={data.avatar} alt="@shadcn" />
            <AvatarFallback>
              <FaUser />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
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
        <DropdownMenuSeparator />
        <Link href={"/profile"}>
          <DropdownMenuItem>
            <FaUser className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <IoLogOutOutline className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Link
      className="font-medium underline-offset-4 hover:underline"
      href="/login"
    >
      <Button className="text-lg" variant="ghost">
        Đăng nhập
      </Button>
    </Link>
  );
};

export default Account;
