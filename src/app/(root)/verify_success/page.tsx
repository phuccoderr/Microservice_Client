"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useVerifyEmailCustomer } from "@/hooks/query-customers/useVerifyEmailCustomer";
import VerifySuccess from "@/components/verify/verify-success";
import VerifyError from "@/components/verify/verify-error";

export default function EmailAuthSuccess() {
  const router = useRouter();

  const searchParams = useSearchParams();
  console.log("param", searchParams.get("token"));
  const { isSuccess } = useVerifyEmailCustomer(
    searchParams.get("token") as string,
  );

  const handleGoToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      {isSuccess ? (
        <VerifySuccess handleGoToLogin={handleGoToLogin} />
      ) : (
        <VerifyError handleGoToLogin={handleGoToLogin} />
      )}
    </div>
  );
}
