"use client";
import ButtonBack from "@/components/button-back";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DISCOUNT_CONST } from "@/constants/discounts";
import useFormDiscount from "@/hooks/query-discounts/useFormDiscount";
import React, { useState } from "react";
import { z } from "zod";
import { vi } from "react-day-picker/locale";
import { useToastMessage } from "@/hooks/useToastMessage";
import { COMMONS_CONST } from "@/constants/commons";
import { useCreateDiscount } from "@/hooks/query-discounts/useCreateDiscount";

const CreateDiscountPage = () => {
  const { formSchema, form } = useFormDiscount({
    name: "",
    code: "",
    sale: 0,
    quantity: 0,
    expiry_date: undefined,
  });
  const { toastLoading } = useToastMessage();
  const mutation = useCreateDiscount();

  const handleCreate = (values: z.infer<typeof formSchema>) => {
    toastLoading(COMMONS_CONST.LOADING);
    mutation.mutate(values);
  };

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">{DISCOUNT_CONST.CREATE}</h1>

      <ButtonBack url="/admin/discounts" />
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {DISCOUNT_CONST.CREATE}
          </CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)}>
            <CardContent className="flex flex-col space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sự kiện giảm giá</FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mã giảm giá</FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between gap-2">
                <FormField
                  control={form.control}
                  name="sale"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>% giảm giá</FormLabel>

                      <FormControl>
                        <Input
                          {...field}
                          onChange={(event) => {
                            const value = +event.target.value;
                            if (value >= 0 && value <= 100) {
                              field.onChange(value);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số lượng mã</FormLabel>

                      <FormControl>
                        <Input
                          {...field}
                          onChange={(event) => {
                            const value = +event.target.value;
                            if (value >= 0) {
                              field.onChange(value);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="expiry_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel htmlFor="datetime">Hạn mã khuyến mãi</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        customDisabled={(date: Date) => date < new Date()}
                        locale={vi}
                        placeholder="Chọn hạn ngày giảm giá"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                {COMMONS_CONST.CREATE}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default CreateDiscountPage;
