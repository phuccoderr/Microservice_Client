import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AUTH_CONST } from "@/constants/auth";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface VerifySuccessProps {
  handleGoToLogin: () => void;
}

const VerifySuccess = ({ handleGoToLogin }: VerifySuccessProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="w-[350px] border-gray-700 bg-gray-800 text-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-center text-center text-2xl font-bold text-green-500">
          <CheckCircle className="mr-2" />
          {AUTH_CONST.EMAIL_VERIFY_SUCCESS}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progress} className="w-full bg-gray-700">
          <div
            className="h-full bg-green-500 transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </Progress>
        <p className="text-center text-gray-300">
          {AUTH_CONST.EMAIL_VERIFY_SUCCESS_DES}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button
          onClick={handleGoToLogin}
          className="w-full bg-green-600 text-white hover:bg-green-700"
        >
          {AUTH_CONST.GO_TO_LOGIN}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerifySuccess;
