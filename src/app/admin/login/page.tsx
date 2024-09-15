import Signin from "@/components/login/signin";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AUTH_CONST } from "@/constants/login";

export default function Login() {
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
}
