"use client";
import { Button } from "@/components/ui/button";
import { useGetAllProductsIndex } from "@/hooks/query-products/useGetAllProductIndex";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SectionIndex = () => {
  const { data: products } = useGetAllProductsIndex({
    page: 1,
    limit: 3,
    sort: "asc",
    keyword: "",
    sort_field: "",
    cate_id: "",
  });

  return (
    <section className="w-full bg-gray-100 py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-5xl">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {products?.entities?.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-lg bg-white shadow-lg"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionIndex;
