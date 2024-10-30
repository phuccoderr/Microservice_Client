"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

const menuItems = [
  {
    title: "Home",
    link: "/admin",
  },
  {
    title: "Users",
    link: "/admin/users",
  },
  {
    title: "Categories",
    link: "/admin/categories",
  },
  {
    title: "Products",
    link: "/admin/products",
  },
  {
    title: "Discounts",
    link: "/admin/discounts",
  },
  {
    title: "Customers",
    link: "/admin/customers",
  },
  {
    title: "Orders",
    link: "/admin/orders",
  },
  {
    title: "Support",
    link: "/admin/supports",
  },
];

type BreadcrumbItem = {
  title: string;
  link: string;
};

// This allows to add custom title as well
const routeMapping: Record<string, BreadcrumbItem[]> = {
  "/admin": [{ title: "admin", link: "/admin" }],
  "/admin/users": [
    { title: "admin", link: "/admin" },
    { title: "Users", link: "/admin/users" },
  ],
  "/admin/categories": [
    { title: "admin", link: "/admin" },
    { title: "Categories", link: "/admin/categories" },
  ],
  "/admin/products": [
    { title: "admin", link: "/admin" },
    { title: "Products", link: "/admin/products" },
  ],
  // Add more custom mappings as needed
};

export function useBreadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    // Check if we have a custom mapping for this exact path
    if (routeMapping[pathname]) {
      return routeMapping[pathname];
    }

    // If no exact match, fall back to generating breadcrumbs from the path
    const segments = pathname.split("/").filter(Boolean);
    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join("/")}`;
      return {
        title: segment.charAt(0).toUpperCase() + segment.slice(1),
        link: path,
      };
    });
  }, [pathname]);

  return breadcrumbs;
}
