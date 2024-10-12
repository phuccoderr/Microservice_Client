"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useDeleteCart } from "@/hooks/query-cart/useDeleteCart";
import { useGetCart } from "@/hooks/query-cart/useGetCart";
import { formatVnd, getTotal } from "@/utils/common";
import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { toast } from "sonner";
import { IoBagRemoveSharp } from "react-icons/io5";
import { useAddToCart } from "@/hooks/query-cart/useAddToCart";
import { Textarea } from "@/components/ui/textarea";

const CartPage = () => {
  const { data: carts } = useGetCart();
  const router = useRouter();
  const total = getTotal(carts ?? []);
  const mutationDeleteCart = useDeleteCart();
  const mutationAddCart = useAddToCart();

  const handleDeleteCart = (id: string) => {
    toast(
      <div className="flex items-center gap-2">
        <IoBagRemoveSharp />
        <h1>Xoá thực đơn thành công!</h1>
      </div>,
      {
        className: "bg-gray-200 text-black",
      },
    );
    mutationDeleteCart.mutate(id);
  };

  const handleAddToCart = (id: string, quantity: number) => {
    mutationAddCart.mutate({ product_id: id, quantity });
  };

  return (
    <div className="container my-8 flex flex-col items-center px-12">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl">Giỏ hàng của bạn</h1>

        {carts && <h1>Có {carts.length} sản phẩm trong giỏ hàng</h1>}
        <Separator className="my-4 w-[20%]" />
      </div>
      <div className="mx-8 flex gap-4">
        <div className="h-[400px] w-full">
          <ScrollArea className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              {carts?.map((item, id) => (
                <div key={id} className="flex gap-8">
                  <Image
                    src={item.product_image}
                    alt="Product Image"
                    width={100}
                    height={100}
                    className="h-[100px] rounded-lg"
                  />
                  <div className="flex flex-col gap-2">
                    <h1>{item.name}</h1>
                    <h1>{item.price}đ</h1>
                    <div className="flex items-center gap-4">
                      <Button
                        onClick={() => handleAddToCart(item.product_id, -1)}
                        size={"icon"}
                        variant={"outline"}
                      >
                        <MinusIcon />
                      </Button>
                      {item.quantity}
                      <Button
                        onClick={() => handleAddToCart(item.product_id, 1)}
                        size={"icon"}
                        variant={"outline"}
                      >
                        <PlusIcon />
                      </Button>
                    </div>
                  </div>
                  <div className="ml-auto flex flex-col gap-2">
                    <Button
                      onClick={() => handleDeleteCart(item.product_id)}
                      size={"icon"}
                      variant={"ghost"}
                    >
                      X
                    </Button>
                    <h1>{item.quantity * item.price}đ</h1>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="mt-[25%] flex gap-4">
            <div className="w-1/4">
              <h1>Ghi chú đơn hàng</h1>
              <Textarea className="bg-gray-400 text-black" rows={8} />
            </div>
            <div>
              <h1>Chính sách giao hàng</h1>
              <p>
                {" "}
                Phí vận chuyển 5k/km. Omega sẽ liên hệ báo phí vận chuyển cho
                bạn ngay khi bạn đặt đơn nhé!
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-1/3 flex-col gap-4 rounded-lg border p-6">
          <h1>Thông tin đơn hàng</h1>
          <Separator className="my-4" />
          <div className="flex justify-between">
            <h1>Phí Ship</h1>
            <p>{formatVnd(30000)}</p>
          </div>
          <div className="flex justify-between">
            <h1>Tổng tiền</h1>
            <p>{formatVnd(total + 30000)}</p>
          </div>
          <Separator className="my-4" />
          <p>
            Phí vận chuyển sẽ được tính ở trang thanh toán. Bạn cũng có thể nhập
            mã giảm giá ở trang thanh toán.
          </p>
          <Button className="float-right" variant={"destructive"}>
            Thanh toan
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => router.push("/product")}
            className="flex cursor-pointer gap-2 self-center"
          >
            <IoReturnUpBackOutline />
            <p>Tiếp tục mua hàng</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;