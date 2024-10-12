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
import { TimePickerDemo } from "@/components/ui/date-time-picker-demo";
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

const CreateDiscountPage = () => {
  const { formSchema, form } = useFormDiscount({
    name: "",
    code: "",
    sale: 0,
    expiry_date: new Date(),
    quantity: 0,
  });

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">{DISCOUNT_CONST.CREATE}</h1>
      <DateTimePicker />
      <ButtonBack url="/admin/discounts" />
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {DISCOUNT_CONST.CREATE}
          </CardTitle>
        </CardHeader>
        <Form {...form}>
          <form>
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
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="sale"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>% giảm giá</FormLabel>

                      <FormControl>
                        <Input type="number" {...field} />
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
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                123
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default CreateDiscountPage;
