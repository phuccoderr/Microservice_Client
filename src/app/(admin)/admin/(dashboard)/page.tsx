"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminPageRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/users");
  }, []);
  return null;
};

export default AdminPageRedirect;
