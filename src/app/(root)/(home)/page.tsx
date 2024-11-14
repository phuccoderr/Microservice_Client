import Footer from "@/components/home/footer";
import SectionIndex from "@/components/home/section-index";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <div className="star-rating-container"></div>
      <main className="flex-1">
        <div className="relative h-[600px] bg-banner bg-cover bg-center p-36">
          <div className="absolute flex w-1/2 flex-col gap-4">
            <h1 className="text-3xl font-semibold">
              Chào mừng bạn đến với NStore
            </h1>
            <span>
              Nền tảng trực tuyến được thiết kế để cung cấp các món ăn cay phong
              phú, từ ẩm thực địa phương đến quốc tế, dành cho những người yêu
              thích vị cay
            </span>
            <Link href={"/product"}>
              <Button
                variant={"default"}
                className="w-24 bg-sky-300 hover:bg-sky-500"
              >
                Shop
              </Button>
            </Link>
          </div>
        </div>
        <SectionIndex />
      </main>
    </div>
  );
}
