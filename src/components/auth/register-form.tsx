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
import useFormRegister from "@/hooks/query-customers/useFormRegister";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { z } from "zod";
import { useRegisterCustomer } from "@/hooks/query-customers/useRegisterCustomer";
import { useToastMessage } from "@/hooks/useToastMessage";
import { AUTH_CONST } from "@/constants/auth";
import ShowHidePassword from "@/components/show-hide-password";

const RegisterForm = () => {
  const { form, formSchema } = useFormRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toastLoading } = useToastMessage();
  const mutate = useRegisterCustomer();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRegister = (values: z.infer<typeof formSchema>) => {
    toastLoading(COMMONS_CONST.LOADING);
    const { confirm_password, ...data } = values;
    mutate.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4">
        <div className="flex items-center gap-2">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{COMMONS_CONST.FIRST_NAME}</FormLabel>
                <FormControl>
                  <Input
                    className="border border-gray-700"
                    placeholder="Nguyen Van"
                    required
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{COMMONS_CONST.LAST_NAME}</FormLabel>
                <FormControl>
                  <Input
                    className="border border-gray-700"
                    placeholder="A"
                    required
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
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
              <FormMessage />
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
                    type={showPassword ? "text" : "password"}
                    className="border border-gray-700"
                    {...field}
                  />
                  <div className="absolute right-0 top-0 flex h-full w-10 cursor-pointer items-center justify-center">
                    <ShowHidePassword
                      showPassword={showPassword}
                      handleShowPassword={handleShowPassword}
                    />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{COMMONS_CONST.CONFIRM_PASSWORD}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    className="border border-gray-700"
                    {...field}
                  />
                  <div className="absolute right-0 top-0 flex h-full w-10 cursor-pointer items-center justify-center">
                    <ShowHidePassword
                      showPassword={showConfirmPassword}
                      handleShowPassword={handleShowConfirmPassword}
                    />
                  </div>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-black text-white hover:bg-gray-600"
        >
          Register
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
