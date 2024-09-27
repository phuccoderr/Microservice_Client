import ShowHidePassword from "@/components/show-hide-password";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AUTH_CONST } from "@/constants/auth";
import { COMMONS_CONST } from "@/constants/commons";
import { useLoginCustomer } from "@/hooks/query-customers/useLoginCustomer";
import useFormLogin from "@/hooks/useFormLogin";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useState } from "react";
import { z } from "zod";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { form, formSchema } = useFormLogin();
  const { toastLoading, toastError } = useToastMessage();
  const mutate = useLoginCustomer();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = (values: z.infer<typeof formSchema>) => {
    toastLoading(COMMONS_CONST.LOADING);
    mutate.mutate(values);
  };

  if (mutate.isError) {
    const error = mutate.error;
    if (error?.statusCode === 404) {
      toastError(AUTH_CONST.EMAIL_NOTFOUND);
    }
    if (error?.statusCode === 403) {
      toastError(AUTH_CONST.LOCK_ACCOUNT);
    }
    if (error?.statusCode === 401) {
      toastError(AUTH_CONST.LOGIN_FAILED);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignIn)} className="space-y-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="border border-gray-700"
                    placeholder="m@example.com"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{COMMONS_CONST.PASSWORD}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="border border-gray-700"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                    <ShowHidePassword
                      showPassword={showPassword}
                      handleShowPassword={handleShowPassword}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-green-600 text-white hover:bg-green-700"
          disabled={mutate.isPending}
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
