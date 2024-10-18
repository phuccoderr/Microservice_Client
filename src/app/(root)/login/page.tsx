"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { COMMONS_CONST } from "@/constants/commons";
import { AUTH_CONST } from "@/constants/auth";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";
import LoginForm from "@/components/auth/login-form";
import RegisterForm from "@/components/auth/register-form";
import { useRouter } from "next/navigation";
import { useGetMe } from "@/hooks/query-customers/useGetMe";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const { data } = useGetMe();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      router.push("/");
    }
  }, [data]);

  const handleSocialLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <Card className="w-[350px] border-gray-700 bg-slate-300 text-black">
        <CardHeader>
          <CardTitle>{COMMONS_CONST.WELCOME}</CardTitle>
          <CardDescription className="text-gray-600">
            {AUTH_CONST.SIGN_IN_DES}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 bg-gray-700">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-gray-600 data-[state=active]:text-white"
              >
                {AUTH_CONST.SIGN_IN}
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="data-[state=active]:bg-gray-600 data-[state=active]:text-white"
              >
                {AUTH_CONST.SIGN_UP}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
          {activeTab === "login" && (
            <Button
              variant="link"
              className="mt-2 p-0 text-black"
              onClick={() => setActiveTab("forgot-password")}
            >
              {AUTH_CONST.FORGOT_PASSWORD}
            </Button>
          )}
          {activeTab === "forgot-password" && <ForgotPasswordForm />}
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            className="w-full bg-gray-700 text-white hover:bg-gray-600"
            onClick={() => handleSocialLogin("google")}
          >
            <FaGoogle className="mr-2" /> Login with Google
          </Button>
          <Button
            className="w-full bg-gray-700 text-white hover:bg-gray-600"
            onClick={() => handleSocialLogin("facebook")}
          >
            <FaFacebook className="mr-2" /> Login with Facebook
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
