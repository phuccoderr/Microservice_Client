"use client";
import { getLocalRefreshToken } from "@/api/jwtClient";
import Signin from "@/components/admin/signin";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AUTH_CONST } from "@/constants/login";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const token = getLocalRefreshToken();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/admin/users");
    }
  }, []);
  return (
    <div className="flex justify-center">
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Card className="w-[350px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">{AUTH_CONST.SIGN_IN}</CardTitle>
            <CardDescription>{AUTH_CONST.DESCRIPTION_LOGIN}</CardDescription>
          </CardHeader>
          <Signin />
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
