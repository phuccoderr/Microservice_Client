"use client";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useGetAllProductsIndex } from "@/hooks/query-products/useGetAllProductIndex";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import { LiaPepperHotSolid } from "react-icons/lia";

const SectionIndex = () => {
  const { data: products } = useGetAllProductsIndex({
    page: 1,
    limit: 10,
    sort: "desc",
    keyword: "",
    sort_field: "date",
    cate_id: "",
  });

  return (
    <div className="w-full bg-gray-100 py-12">
      <div className="mx-auto mb-12 flex items-center justify-center text-red-500">
        <h2 className="text-3xl font-bold">Sản phẩm vừa mới ra mắt</h2>
        <LiaPepperHotSolid size={50} />
      </div>
      <div className="container px-4 md:px-6">
        <Carousel
          opts={{
            loop: true,
          }}
          plugins={[AutoScroll({ playOnInit: true, speed: 2 })]}
        >
          <CarouselContent>
            {products?.entities?.map((item) => (
              <CarouselItem
                key={item.id}
                className="rounded-lg bg-white shadow-lg md:basis-1/2 lg:basis-1/3"
              >
                <Image
                  src={item.url ?? ""}
                  width={400}
                  height={300}
                  alt={`${item.name}`}
                  className="h-[200px] w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold">{item.name}</h3>
                  <p className="mb-4 text-gray-600">{item.description}</p>
                  <Link href={`/product/${item.id}`}>
                    <Button className="w-full bg-sky-500 hover:bg-sky-700">
                      Add to Cart
                    </Button>
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default SectionIndex;
