import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { BsFillCartFill, BsShop } from "react-icons/bs";
import { FaShoppingBag, FaUsers } from "react-icons/fa";
import { MdManageAccounts, MdOutlineSupportAgent } from "react-icons/md";
import { RiCoupon3Fill } from "react-icons/ri";
import { Separator } from "@/components/ui/separator";
import { Breadcrumbs } from "@/components/bread-crums";
import { UserNav } from "@/components/admin/user-nav";
import { MdReviews } from "react-icons/md";
import { usePathname } from "next/navigation";

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
  {
    title: "Reviews",
    icon: <MdReviews className="h-5 w-5" />,
    link: "/admin/reviews",
  },
];

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex gap-2 py-2 text-sidebar-accent-foreground">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <BsShop className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">NStore</span>
              <span className="truncate text-xs">bán đồ ăn siêu cay</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>NStore</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={pathname === item.link}
                      asChild
                    >
                      <Link href={item.link}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumbs />
          </div>
          <div className="flex items-center gap-2 px-4">
            <UserNav />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
