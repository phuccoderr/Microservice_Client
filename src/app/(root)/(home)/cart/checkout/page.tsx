"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import useFormCheckout from "@/hooks/query-cart/useFormCheckOut";
import { useGetCart } from "@/hooks/query-cart/useGetCart";
import { useGetMe } from "@/hooks/query-customers/useGetMe";
import { calSale, formatVnd, getTotal } from "@/utils/common";
import React, { useEffect, useState } from "react";

const CheckOutPage = () => {
  const [discount, setDiscount] = useState("");
  const { form, formSchema } = useFormCheckout();
  const { data: carts } = useGetCart();
  const total = getTotal(carts ?? []);
  const { data: me } = useGetMe();

  useEffect(() => {
    form.setValue("address", me?.address ?? "");
    form.setValue("phone_number", me?.phone_number ?? "");
  }, [me]);

  return (
    <Form {...form}>
      <form className="container my-8 flex">
        <div className="mx-24 flex w-full">
          <div className="flex w-1/2 flex-col gap-4 self-end">
            <h1 className="text-lg">Thông tin giao hàng</h1>
            <Input value={me?.email ?? ""} disabled />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Địa chỉ" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Số điện thoại" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="payment_method"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ghi chú đơn hàng</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={10}
                      placeholder="Ghi nội dung ghi chú đơn hàng của bạn"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator
            className="mx-4 bg-black bg-opacity-20"
            orientation="vertical"
          />
          <div className="flex w-1/2 flex-col gap-4 p-4">
            {carts?.map((cart) => (
              <div className="flex items-center gap-4" key={cart.product_id.id}>
                <img
                  width={75}
                  src={cart.product_id.url}
                  alt={cart.product_id.alias}
                  className="h-[75px] rounded-xl object-cover"
                />
                <div className="flex flex-col">
                  <h1 className="font-bold">{cart.product_id.name}</h1>
                  <h1 className="text-sm">x {cart.quantity}</h1>
                </div>
                <h1 className="ml-auto">
                  {formatVnd(
                    calSale(cart.product_id.price, cart.product_id.sale),
                  )}
                </h1>
              </div>
            ))}
            <Separator className="mx-4 bg-black bg-opacity-20" />
            <div className="flex gap-2">
              <Input
                className="ml-4 border-stone-400 focus:border-blue-300"
                placeholder="Mã giảm giá"
                onChange={(e) => setDiscount(e.target.value)}
              />
              <Button
                disabled={!discount}
                className={` ${discount ? "bg-sky-600 text-white" : "bg-black bg-opacity-15"}`}
              >
                Sử dụng
              </Button>
            </div>
            <Separator className="mx-4 bg-black bg-opacity-20" />
            <div className="mx-4 flex justify-between">
              <h1>Phí Ship</h1>
              <p>{formatVnd(30000)}</p>
            </div>
            <div className="mx-4 flex justify-between">
              <h1>Mã giảm giá</h1>
              <h1>-</h1>
            </div>
            <Separator className="mx-4 bg-black bg-opacity-20" />
            <div className="mx-4 flex justify-between">
              <h1>Tổng cộng</h1>
              <h1>{formatVnd(total + 30000)}</h1>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CheckOutPage;
