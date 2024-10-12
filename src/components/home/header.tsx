import Account from "@/components/home/account";
import { Button } from "@/components/ui/button";
import {
  MenuIcon,
  ShoppingBag,
  ShoppingCartIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-green-600 p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold">EcoStore</h1>
        <div className="hidden space-x-4 md:flex">
          <Link href={"/"}>
            <Button variant="ghost">Home</Button>
          </Link>
          <Link href="/product">
            <Button variant="ghost">Products</Button>
          </Link>
          <Button variant="ghost">About</Button>
          <Button variant="ghost">Contact</Button>
        </div>
        <div className="flex items-center space-x-4">
          <Link href={"/cart"}>
            <Button variant="ghost" size="icon">
              <ShoppingCartIcon className="h-6 w-6" />
            </Button>
          </Link>
          <Account />
        </div>
      </div>
    </header>
  );
};

export default Header;
