import Account from "@/components/home/account";
import { Button } from "@/components/ui/button";
import { MenuIcon, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { GiHotSpices } from "react-icons/gi";

const Header = () => {
  return (
    <header className="border border-x-0 border-t-0 border-b-stone-300 p-4 text-black">
      <div className="container mx-auto flex items-center justify-between">
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon className="h-6 w-6" />
        </Button>
        <Link href={"/"}>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-sky-500">NStore</h1>
            <GiHotSpices size={24} color="#0ea5e9" />
          </div>
        </Link>
        <div className="hidden space-x-4 md:flex">
          <Link href={"/"}>
            <Button
              className="text-lg text-black hover:text-sky-300"
              variant="link"
            >
              Trang chủ
            </Button>
          </Link>
          <Link href="/product">
            <Button
              className="text-lg text-black hover:text-sky-300"
              variant="link"
            >
              Sản phẩm
            </Button>
          </Link>
          <Link href="/about">
            <Button
              className="text-lg text-black hover:text-sky-300"
              variant="link"
            >
              Về chúng tôi
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              className="text-lg text-black hover:text-sky-300"
              variant="link"
            >
              Liên hệ
            </Button>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href={"/cart"}>
            <Button
              className="bg-transparent text-lg shadow-none hover:bg-transparent hover:text-sky-500"
              variant="ghost"
              size="icon"
            >
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
