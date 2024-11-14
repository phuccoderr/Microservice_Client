"use client";

import ModalAddCart from "@/components/home/modal-add-cart";
import CategoryItem from "@/components/product/category-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGetAllCategoriesHome } from "@/hooks/query-categories/useGetAllCategoriesHome";
import { useGetAllProductsByCategory } from "@/hooks/query-products/useGetAllProductsByCategory";
import useDebounce from "@/hooks/useDebounce";
import { useProductStore } from "@/store/useProductStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import ImageEmpty from "@/public/images/product-empty.png";
import { calSale, formatVnd } from "@/utils/common";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const ProductPage = () => {
  const { data: categories } = useGetAllCategoriesHome();
  const [searchKeyword, setSearchKeyword] = useState("");
  const debounce = useDebounce(searchKeyword, 1000);
  const [categoryId, setCategoryId] = useState("");
  const { data: products } = useGetAllProductsByCategory({
    page: 1,
    limit: 100,
    sort: "asc",
    keyword: debounce,
    cate_id: categoryId,
    sort_field: "",
  });
  const router = useRouter();
  const { setModalAddCart } = useProductStore();

  const handleModalAddCart = (
    id: string,
    name: string,
    url: string,
    description: string,
  ) => {
    setModalAddCart(true, { id, name, url, description });
  };

  return (
    <>
      <div className="container flex gap-8 p-4">
        <div className="flex flex-col p-2">
          <Input
            type="search"
            placeholder="tìm kiếm..."
            className="border-stone-300"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <span className="mt-2 text-xl text-stone-300">Danh mục</span>
          <Separator className="bg-stone-300" />
          {categories?.map((category) => (
            <CategoryItem
              setCategoryId={setCategoryId}
              key={category.id}
              category={category}
              categoryId={categoryId}
            />
          ))}
        </div>

        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-wrap gap-4">
            {products !== undefined ? (
              products.entities.map((item) => (
                <Card
                  key={item.id}
                  className="flex w-[200px] flex-col rounded-none border-none bg-transparent text-black hover:shadow-xl"
                >
                  <CardContent className="flex flex-grow flex-col gap-2 p-0">
                    <Link href={`/product/${item.id}`}>
                      <div className="relative aspect-square w-[200px]">
                        <Image
                          src={item.url ?? ImageEmpty}
                          layout="fill"
                          objectFit="cover"
                          alt={item.name}
                        />
                      </div>
                    </Link>

                    <div className="p-2">
                      <Link href={`/product/${item.id}`}>
                        <h1 className="cursor-pointer font-bold hover:text-sky-500">
                          {item.name}
                        </h1>
                      </Link>
                      <h1 className="text-xs">{item.description}</h1>
                      {item.sale > 0 ? (
                        <div className="flex gap-2">
                          <h1 className="font-bold line-through">
                            {formatVnd(item.price)}
                          </h1>
                          <h1>{formatVnd(calSale(item.price, item.sale))} </h1>
                        </div>
                      ) : (
                        <h1 className="font-bold">{formatVnd(item.price)}</h1>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="mt-auto p-2">
                    <Button
                      onClick={() =>
                        handleModalAddCart(
                          item.id,
                          item.name,
                          item.url,
                          item.description,
                        )
                      }
                      className="group relative flex w-full cursor-pointer items-center overflow-hidden rounded-full"
                    >
                      <div className="absolute inset-0 translate-x-[-100%] transform bg-sky-300 transition-transform duration-300 group-hover:translate-x-0"></div>
                      <Button
                        variant={"ghost"}
                        className="relative rounded-full hover:bg-sky-300"
                        size={"icon"}
                      >
                        <TiShoppingCart />
                      </Button>
                      <h1 className="relative z-10 text-black">Đặt mua</h1>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <ModalAddCart />
    </>
  );
};

export default ProductPage;
