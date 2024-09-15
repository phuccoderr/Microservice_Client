"use client";
import { Button } from "@/components/ui/button";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { IoMdMenu } from "react-icons/io";
import { useState } from "react";
import { HomeIcon } from "@radix-ui/react-icons";
import { FaUsers } from "react-icons/fa";
import Link from "next/link";

const SidebarAdmin = () => {
  const [collapse, setCollapse] = useState<boolean>(false);

  const toggleSidebar = () => {
    setCollapse(!collapse);
  };

  return (
    <div className="flex fixed">
      <Sidebar
        collapsed={collapse}
        className="h-screen border-r"
        rootStyles={{
          background: "white",
          color: "#333",
        }}
      >
        <div className="flex items-center justify-between p-4">
          {!collapse && <h1 className="text-xl font-semibold">PhucStore</h1>}
          <Button
            onClick={toggleSidebar}
            variant="outline"
            size="icon"
            className="ml-auto"
          >
            <IoMdMenu className="h-4 w-4" />
          </Button>
        </div>
        <Menu
          className="flex-grow"
          menuItemStyles={{
            button: ({ level, active }) => {
              return {
                backgroundColor: active ? "#ecfdf5" : undefined,
                color: active ? "#047857" : "#333",
                "&:hover": {
                  backgroundColor: "#ecfdf5",
                  color: "#047857",
                },
                [`&.active`]: {
                  backgroundColor: "red",
                  color: "#b6c8d9",
                },
              };
            },
          }}
        >
          <MenuItem
            icon={<HomeIcon className="h-5 w-5" />}
            component={<Link href={"/admin"} />}
          >
            Home
          </MenuItem>
          <MenuItem
            icon={<FaUsers className="h-5 w-5" />}
            component={<Link href={"/admin/users"} />}
          >
            User
          </MenuItem>
          <MenuItem> Calendar </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarAdmin;
