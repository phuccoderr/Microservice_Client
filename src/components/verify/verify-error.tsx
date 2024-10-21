import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AUTH_CONST } from "@/constants/auth";
import { IoIosWarning } from "react-icons/io";

interface VerifyErrorProps {
  handleGoToLogin: () => void;
}

const VerifyError = ({ handleGoToLogin }: VerifyErrorProps) => {
  return (
    <Card className="w-[500px] border-gray-700 bg-black text-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center justify-center text-center text-2xl font-bold text-yellow-500">
          <IoIosWarning className="mr-2" />
          {AUTH_CONST.EMAIL_VERIFY_FAIL}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center text-gray-300">
          {AUTH_CONST.EMAIL_VERIFY_FAIL_DES}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button
          onClick={handleGoToLogin}
          className="w-full bg-sky-600 text-white hover:bg-sky-800"
        >
          {AUTH_CONST.GO_TO_LOGIN}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerifyError;
