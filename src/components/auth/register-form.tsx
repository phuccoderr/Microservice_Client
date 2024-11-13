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
import { useState } from "react";
import { z } from "zod";
import { useRegisterCustomer } from "@/hooks/query-customers/useRegisterCustomer";
import { useToastMessage } from "@/hooks/useToastMessage";
import ShowHidePassword from "@/components/show-hide-password";
import { GiHotSpices } from "react-icons/gi";
import { AUTH_CONST } from "@/constants/auth";
import { IoArrowBack } from "react-icons/io5";

interface RegisterFormProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const RegisterForm = ({ setActiveTab }: RegisterFormProps) => {
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
          {AUTH_CONST.REGISTER} <GiHotSpices />
        </span>

        <div className="flex items-center justify-between gap-2">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>{COMMONS_CONST.FIRST_NAME}</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-none border border-x-0 border-t-0 border-stone-400 focus:border-t-0 focus-visible:ring-0"
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
              <FormItem className="flex-1">
                <FormLabel>{COMMONS_CONST.LAST_NAME}</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-none border border-x-0 border-t-0 border-stone-400 focus:border-t-0 focus-visible:ring-0"
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
                  className="rounded-none border border-x-0 border-t-0 border-stone-400 focus:border-t-0 focus-visible:ring-0"
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
                    placeholder="Password"
                    className="rounded-none border border-x-0 border-t-0 border-stone-400 focus:border-t-0 focus-visible:ring-0"
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
                    placeholder="confirm password"
                    className="rounded-none border border-x-0 border-t-0 border-stone-400 focus:border-t-0 focus-visible:ring-0"
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
          className="w-full bg-sky-500 text-white hover:bg-sky-300"
        >
          Register
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
