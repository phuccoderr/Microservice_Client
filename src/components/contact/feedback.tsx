"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import useFormFeedback from "@/hooks/query-mail/useFormFeedback";
import { useSendFeedback } from "@/hooks/query-mail/useSendFeedback";
import { Feedback } from "@/types/feedback.type";
import React, { useState } from "react";
import { z } from "zod";

const ContactFeedback = () => {
  const mutation = useSendFeedback();
  const { form, formSchema } = useFormFeedback();

  const handleFeedback = (values: z.infer<typeof formSchema>) => {
    console.log("values", values);
    mutation.mutate(values, {
      onSuccess: () => {
        form.reset();
      },
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFeedback)}
        className="flex w-1/2 flex-col gap-4"
      >
        <h1>Liên hệ</h1>
        <Separator />
        <h1>Gửi thắc mắc cho chúng tôi</h1>
        <Separator />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Tên của bạn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Mail của bạn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Số điện thoại của bạn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Nội dung của bạn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-black text-white hover:bg-stone-500"
        >
          Gửi thắc mắc
        </Button>
      </form>
    </Form>
  );
};

export default ContactFeedback;
