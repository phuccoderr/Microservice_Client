import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const ContactPage = () => {
  return (
    <div className="container w-full p-8">
      <div className="mx-12 flex gap-8">
        <div className="w-1/2">Map</div>
        <div className="flex w-1/2 flex-col gap-4">
          <h1>Liên hệ</h1>
          <Separator />
          <h1>Gửi thắc mắc cho chúng tôi</h1>
          <Separator />
          <Input placeholder="Tên của bạn" />
          <div className="flex justify-between">
            <Input placeholder="Email" />
            <Input placeholder="Số điện thoại của bạn" />
          </div>
          <Textarea placeholder="Noidung" />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
