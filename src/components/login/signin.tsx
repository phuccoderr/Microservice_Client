"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
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
import { AUTH_CONST } from "@/constants/login";
import useFormLogin from "@/hook/useFormLogin";
import { useLoginMutation } from "@/hook/useLogin";
import { useToastMessage } from "@/hook/useToastMessage";
import { z } from "zod";

export default function Signin() {
  const { formSchema, form } = useFormLogin();
  const mutateLogin = useLoginMutation();
  const { toastLoading } = useToastMessage();
  const handleLogin = (values: z.infer<typeof formSchema>) => {
    toastLoading(COMMONS_CONST.LOADING);
    mutateLogin.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="m@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button
            disabled={mutateLogin.isPending}
            className="w-full"
            type="submit"
          >
            {AUTH_CONST.SIGN_IN.toUpperCase()}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
