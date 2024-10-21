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
import { COMMONS_CONST } from "@/constants/commons";
import useFormCheckout from "@/hooks/query-cart/useFormCheckOut";
import { useGetCart } from "@/hooks/query-cart/useGetCart";
import { usePlaceOrder } from "@/hooks/query-cart/usePlaceOrder";
import { useGetMe } from "@/hooks/query-customers/useGetMe";
import { useApplyCode } from "@/hooks/query-discounts/useApplyCode";
import { useCheckDiscount } from "@/hooks/query-discounts/useCheckDiscount";
import { useToastMessage } from "@/hooks/useToastMessage";
import { calSale, formatVnd, getTotal } from "@/utils/common";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { z } from "zod";

const CheckOutPage = () => {
  const [discount, setDiscount] = useState("");
  const [code, setCode] = useState("");
  const [sale, setSale] = useState(0);
  const { form, formSchema } = useFormCheckout();
  const { data: carts } = useGetCart();
  const total = getTotal(carts ?? []);
  const { data: me } = useGetMe();
  const { toastLoading } = useToastMessage();
  const mutationCheckDiscount = useCheckDiscount();
  const mutationPlaceOrder = usePlaceOrder();
  const mutationApplyCode = useApplyCode();

  const router = useRouter();

  const handleCheckout = () => {
    mutationCheckDiscount.mutate(discount, {
      onSuccess: (data) => {
        setSale(data.sale);
        setCode(data.code);
      },
    });
  };

  useEffect(() => {
    if (carts == null) {
      router.push("/");
    }
  }, [carts]);

  useEffect(() => {
    form.setValue("address", me?.address ?? "");
    form.setValue("phone_number", me?.phone_number ?? "");
    form.setValue("sale", sale ?? 0);
  }, [me, sale]);

  const handleApplyDiscount = (values: z.infer<typeof formSchema>) => {
    toastLoading(COMMONS_CONST.LOADING);
    mutationPlaceOrder.mutate(values);
    code && mutationApplyCode.mutate(code);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleApplyDiscount)}
        className="container my-8 flex"
      >
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
                type="button"
                onClick={handleCheckout}
                disabled={!discount || mutationCheckDiscount.isPending}
                className={` ${discount ? "bg-sky-600 text-white hover:bg-sky-800" : "bg-black bg-opacity-15"}`}
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
              {sale <= 0 ? <h1>-</h1> : <h1>{sale}%</h1>}
            </div>
            <Separator className="mx-4 bg-black bg-opacity-20" />
            <div className="mx-4 flex justify-between">
              <h1>Tổng cộng</h1>
              {sale <= 0 ? (
                <h1>{formatVnd(total + 30000)}</h1>
              ) : (
                <h1>{formatVnd(calSale(total, sale) + 30000)}</h1>
              )}
            </div>
            <Button
              disabled={mutationPlaceOrder.isPending}
              variant={"destructive"}
            >
              Thanh toán
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CheckOutPage;
