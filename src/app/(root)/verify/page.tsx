"use client";

import { Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AUTH_CONST } from "@/constants/auth";
import { useRouter } from "next/navigation";

export default function RegistrationSuccess() {
  const router = useRouter();
  const handleBackToHome = () => {
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <Card className="w-[350px] border-gray-700 bg-black text-white">
        <CardHeader>
          <CardTitle className="flex items-center justify-center text-center text-2xl font-bold">
            <Mail className="mr-2" />
            {AUTH_CONST.REGISTER_SUCCESS}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mt-4 text-center text-gray-300">
            {AUTH_CONST.REGISTER_SUCCESS_DES}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={handleBackToHome}
            className="bg-gray-700 text-white hover:bg-gray-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> {AUTH_CONST.BACK_TO_LOGIN}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
