import Link from "next/link";
import React from "react";
import { GiHotSpices } from "react-icons/gi";

const Footer = () => {
  return (
    <footer className="mt-auto flex w-full justify-around border-t border-t-stone-300 p-8">
      <div className="flex w-1/4 flex-col gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">NStore</h1>
          <GiHotSpices size={24} />
        </div>
        <span className="text-xs">
          chúng tôi tự hào mang đến những món ăn cay đặc trưng từ nhiều nền ẩm
          thực khác nhau, với các cấp độ cay tùy chỉnh để phù hợp với mọi sở
          thích. Dù bạn là người mới thử cảm giác cay nồng hay một tín đồ cay
          chính hiệu, chúng tôi đều có những món ăn độc đáo để thỏa mãn vị giác
          của bạn.
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">Links</h1>
        <p>Trang chủ</p>
        <p>Shop</p>
        <p>Liên hệ</p>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">Thông tin chúng tôi</h1>
        <p>Quy trình làm việc</p>
        <p>Về chúng tôi</p>
        <p>Bảo trì</p>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">Chăm sóc khách hàng</h1>
        <p>FAQ</p>
        <p>Hỗ trợ 24/7</p>
        <p>Chính sách riêng tư</p>
      </div>
    </footer>
  );
};

export default Footer;
