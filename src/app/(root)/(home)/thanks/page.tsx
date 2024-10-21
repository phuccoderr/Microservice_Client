"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";
import { RiMailSendLine } from "react-icons/ri";
import { IoReturnUpBack } from "react-icons/io5";
import party from "party-js";

const ThanksPage = () => {
  useEffect(() => {
    // Hiệu ứng khi trang được tải
    party.confetti(document.body, {
      count: party.variation.range(20, 80),
    });
  }, []);

  return (
    <div className="mx-24 flex flex-col items-center gap-4 p-8">
      <h1 className="text-2xl">Cảm ơn bạn đã đặt hàng từ shop chúng tôi.</h1>
      <h1 className="text-xl">Đơn hàng của bạn đã được xác nhận hoàn tất</h1>
      <div className="mt-16 flex w-[800px] justify-center gap-4">
        <RiMailSendLine size={90} className="w-[120px]" />
        <h1 className="text-2xl">
          Biên nhận qua email chứa thông tin chi tiết về đơn đặt hàng của bạn đã
          được gửi đến địa chỉ email được cung cấp.
        </h1>
      </div>
      <Link className="mt-8" href="/">
        <Button className="flex gap-2 bg-stone-800 text-white hover:bg-stone-900">
          <IoReturnUpBack />
          Quay lại trang chủ
        </Button>
      </Link>
    </div>
  );
};

export default ThanksPage;
