"use client";
import { Button } from "@/components/ui/button";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { IoMdMenu } from "react-icons/io";
import { HomeIcon } from "@radix-ui/react-icons";
import { BiSolidCategoryAlt } from "react-icons/bi";
import Link from "next/link";
import { useSidebarStore } from "@/store/useSidebarStore";
import { FaShoppingBag, FaUsers } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { RiCoupon3Fill } from "react-icons/ri";
import { BsFillCartFill } from "react-icons/bs";
import { MdOutlineSupportAgent } from "react-icons/md";

const menuItems = [
  {
    title: "Home",
    icon: <HomeIcon className="h-5 w-5" />,
    link: "/admin",
  },
  {
    title: "Users",
    icon: <MdManageAccounts className="h-5 w-5" />,
    link: "/admin/users",
  },
  {
    title: "Categories",
    icon: <BiSolidCategoryAlt className="h-5 w-5" />,
    link: "/admin/categories",
  },
  {
    title: "Products",
    icon: <FaShoppingBag className="h-5 w-5" />,
    link: "/admin/products",
  },
  {
    title: "Discounts",
    icon: <RiCoupon3Fill className="h-5 w-5" />,
    link: "/admin/discounts",
  },
  {
    title: "Customers",
    icon: <FaUsers className="h-5 w-5" />,
    link: "/admin/customers",
  },
  {
    title: "Orders",
    icon: <BsFillCartFill className="h-5 w-5" />,
    link: "/admin/orders",
  },
  {
    title: "Support",
    icon: <MdOutlineSupportAgent className="h-5 w-5" />,
    link: "/admin/supports",
  },
];

const SidebarAdmin = () => {
  const { open, setOpen } = useSidebarStore();

  return (
    <div className="fixed flex">
      <Sidebar
        collapsed={open}
        className="h-screen border-r"
        rootStyles={{
          background: "white",
          color: "#333",
        }}
      >
        <div className="flex items-center justify-between p-4">
          {!open && <h1 className="text-xl font-semibold">PhucStore</h1>}
          <Button
            onClick={() => setOpen(!open)}
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
          {menuItems.map((item) => (
            <MenuItem
              key={item.title}
              icon={item.icon}
              component={<Link href={item.link} />}
            >
              {item.title}
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarAdmin;
