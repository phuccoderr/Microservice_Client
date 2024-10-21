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
    <header className="bg-black p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon className="h-6 w-6" />
        </Button>
        <Link href={"/"}>
          <h1 className="text-2xl font-bold">EcoStore</h1>
        </Link>
        <div className="hidden space-x-4 md:flex">
          <Link href={"/"}>
            <Button className="text-lg" variant="ghost">
              Home
            </Button>
          </Link>
          <Link href="/product">
            <Button className="text-lg" variant="ghost">
              Products
            </Button>
          </Link>
          <Button className="text-lg" variant="ghost">
            About
          </Button>
          <Link href="/contact">
            <Button className="text-lg" variant="ghost">
              Contact
            </Button>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href={"/cart"}>
            <Button className="text-lg" variant="ghost" size="icon">
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
