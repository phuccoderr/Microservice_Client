import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { COMMONS_CONST } from "@/constants/commons";
import { useForgotPassword } from "@/hooks/query-customers/useForgotPassword";
import useFormEmail from "@/hooks/query-customers/useFormEmail";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useState } from "react";
import { z } from "zod";

const ForgotPasswordForm = () => {
  const { toastLoading } = useToastMessage();
  const { form, formSchema } = useFormEmail();

  const mutate = useForgotPassword();

  const handleForgotPassword = (values: z.infer<typeof formSchema>) => {
    toastLoading(COMMONS_CONST.LOADING);
    mutate.mutate(values.email);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleForgotPassword)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="border border-gray-700"
                  required
                  placeholder="m@example.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-green-600 text-white hover:bg-green-700"
        >
          Reset Password
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
