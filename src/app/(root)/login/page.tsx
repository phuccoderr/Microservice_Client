"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AUTH_CONST } from "@/constants/auth";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";
import LoginForm from "@/components/auth/login-form";
import RegisterForm from "@/components/auth/register-form";
import { useRouter } from "next/navigation";
import { useGetMe } from "@/hooks/query-customers/useGetMe";
import Banner from "@/public/images/food.png";
import Image from "next/image";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const { data } = useGetMe();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      router.push("/");
    }
  }, [data]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f8f8]">
      <Card className="w-[900px] border-0 bg-transparent p-4 text-black shadow-2xl">
        <CardContent>
          <div className="flex gap-4">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsContent value="login">
                <LoginForm setActiveTab={setActiveTab} />
              </TabsContent>
              <TabsContent value="register">
                <RegisterForm setActiveTab={setActiveTab} />
              </TabsContent>
              <TabsContent value="forgot-password">
                <ForgotPasswordForm setActiveTab={setActiveTab} />
              </TabsContent>
            </Tabs>
            <Image src={Banner} width={350} height={400} alt="logo" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
