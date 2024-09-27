"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useFormPassword from "@/hooks/query-customers/useFormPassword";
import { COMMONS_CONST } from "@/constants/commons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ShowHidePassword from "@/components/show-hide-password";
import { useToastMessage } from "@/hooks/useToastMessage";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPassword } from "@/hooks/query-customers/useResetPassword";
import { AUTH_CONST } from "@/constants/auth";

export default function PasswordReset() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { form, formSchema } = useFormPassword();
  const { toastLoading } = useToastMessage();
  const searchParams = useSearchParams();
  const mutate = useResetPassword();
  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  const handleResetPassword = (values: z.infer<typeof formSchema>) => {
    toastLoading(COMMONS_CONST.LOADING);
    const { password } = values;
    const token = searchParams.get("token") as string;
    mutate.mutate({ token, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <Card className="w-[350px] border-gray-700 bg-gray-800 text-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-center text-center text-2xl font-bold text-green-500">
            <Lock className="mr-2" />
            {COMMONS_CONST.RESET_PASSWORD}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleResetPassword)}
              className="space-y-4"
            >
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
                className="w-full bg-green-600 text-white hover:bg-green-700"
              >
                {COMMONS_CONST.RESET_PASSWORD}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="link"
            className="text-green-400 hover:text-green-300"
            onClick={handleBackToLogin}
          >
            {AUTH_CONST.BACK_TO_LOGIN}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
