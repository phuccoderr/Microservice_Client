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
import { AUTH_CONST } from "@/constants/auth";
import { COMMONS_CONST } from "@/constants/commons";
import { useForgotPassword } from "@/hooks/query-customers/useForgotPassword";
import useFormEmail from "@/hooks/query-customers/useFormEmail";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useState } from "react";
import { GiHotSpices } from "react-icons/gi";
import { IoArrowBack } from "react-icons/io5";
import { z } from "zod";

interface ForgotPasswordFormProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const ForgotPasswordForm = ({ setActiveTab }: ForgotPasswordFormProps) => {
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
        <span className="flex items-center gap-2 text-xl font-semibold">
          <Button
            type="button"
            variant={"ghost"}
            size={"icon"}
            onClick={() => setActiveTab("login")}
            className="hover:bg-transparent hover:text-sky-300"
          >
            <IoArrowBack size={20} />
          </Button>
          {AUTH_CONST.FORGOT_PASSWORD} <GiHotSpices />
        </span>
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
          className="w-full bg-sky-500 text-white hover:bg-sky-300"
        >
          Reset Password
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
