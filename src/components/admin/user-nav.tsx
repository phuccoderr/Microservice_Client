"use client";
import { getRefreshToken } from "@/api/jwtClient";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { COMMONS_CONST } from "@/constants/commons";
import { useGetMeUser } from "@/hooks/query-users/useGetMeUser";
import { useLogoutUser } from "@/hooks/useLogout";
import { useToastMessage } from "@/hooks/useToastMessage";
import { CiUser, CiLogout } from "react-icons/ci";

export function UserNav() {
  const mutateLogout = useLogoutUser();
  const { toastLoading } = useToastMessage();
  const { data: user } = useGetMeUser();

  const handleLogout = () => {
    toastLoading(COMMONS_CONST.LOADING);
    const rfToken = getRefreshToken();
    mutateLogout.mutate(rfToken);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              <CiUser />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Log out
          <DropdownMenuShortcut>
            <CiLogout />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
