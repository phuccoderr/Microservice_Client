"use client";

import { useState } from "react";
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

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  const handleSocialLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <Card className="w-[350px] border-gray-700 bg-gray-800 text-gray-200">
        <CardHeader>
          <CardTitle className="text-green-500">
            {COMMONS_CONST.WELCOME}
          </CardTitle>
          <CardDescription className="text-gray-400">
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
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                {AUTH_CONST.SIGN_IN}
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
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
              className="mt-2 p-0 text-green-400 hover:text-green-300"
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
