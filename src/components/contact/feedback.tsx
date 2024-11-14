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
import React from "react";
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
        <Separator className="bg-stone-300" />
        <h1>Gửi thắc mắc cho chúng tôi</h1>
        <Separator className="bg-stone-300" />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="rounded-none border border-x-0 border-t-0 border-stone-400 focus:border-t-0 focus-visible:ring-0"
                  placeholder="Tên của bạn"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="rounded-none border border-x-0 border-t-0 border-stone-400 focus:border-t-0 focus-visible:ring-0"
                  placeholder="Mail của bạn"
                  {...field}
                />
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
                <Input
                  className="rounded-none border border-x-0 border-t-0 border-stone-400 focus:border-t-0 focus-visible:ring-0"
                  placeholder="Số điện thoại của bạn"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Nội dung của bạn" {...field} rows={10} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={mutation.isPending}
          type="submit"
          className="bg-sky-300 text-white hover:bg-sky-500"
        >
          Gửi thắc mắc
        </Button>
      </form>
    </Form>
  );
};

export default ContactFeedback;
