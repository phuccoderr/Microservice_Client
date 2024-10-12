"use client";

import ModalAddCart from "@/components/home/modal-add-cart";
import CategoryItem from "@/components/product/category-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGetAllCategoriesHome } from "@/hooks/query-categories/useGetAllCategoriesHome";
import { useGetAllProductsByCategory } from "@/hooks/query-products/useGetAllProductsByCategory";
import useDebounce from "@/hooks/useDebounce";
import { useProductStore } from "@/store/useProductStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TiShoppingCart } from "react-icons/ti";

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
      <div className="container mx-auto flex flex-col gap-8 p-4 md:flex-row">
        <div className="flex flex-col gap-2 p-2">
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
          <Input
            type="search"
            placeholder="Search products..."
            className="w-[400px]"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <div className="flex flex-wrap gap-4">
            {products !== undefined ? (
              products.entities.map((item) => (
                <Card key={item.id} className="w-[200px]">
                  <CardContent className="flex flex-col gap-2 p-4">
                    <div className="min-h-[150px] self-center">
                      <Image
                        src={item.url}
                        width={150}
                        height={100}
                        alt={item.name}
                        className="h-[150px] rounded-md object-cover"
                      />
                    </div>

                    <h1
                      className="cursor-pointer"
                      onClick={() => router.push(`/product/${item.id}`)}
                    >
                      {item.name}
                    </h1>
                    <h2>{item.description}</h2>
                    <h1 className="">{item.price} đ</h1>
                    <div
                      onClick={() =>
                        handleModalAddCart(
                          item.id,
                          item.name,
                          item.url,
                          item.description,
                        )
                      }
                      className="group relative flex cursor-pointer items-center gap-4 overflow-hidden rounded-full"
                    >
                      <div className="absolute inset-0 translate-x-[-100%] transform bg-green-600 transition-transform duration-300 group-hover:translate-x-0"></div>
                      <Button className="relative rounded-full" size={"icon"}>
                        <TiShoppingCart />
                      </Button>
                      <h1 className="relative z-10">Đặt mua</h1>
                    </div>
                  </CardContent>
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