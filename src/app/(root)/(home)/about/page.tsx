import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

const AboutPage = () => {
  return (
    <div className="container mx-auto flex max-w-[1200px] gap-4 p-4">
      <Card className="w-[350px] border-stone-300 bg-transparent text-stone-500">
        <CardHeader>
          <CardTitle className="uppercase">Danh mục trang</CardTitle>
        </CardHeader>
        <CardContent>
          <Link href={"/"}>
            <Button className="text-lg text-stone-500" variant="link">
              Trang chủ
            </Button>
          </Link>
          <Separator className="bg-stone-300" />
          <Link href="/product">
            <Button className="text-lg text-stone-500" variant="link">
              Sản phẩm
            </Button>
          </Link>
          <Separator className="bg-stone-300" />
          <Link href="/about">
            <Button className="text-lg text-stone-500" variant="link">
              Về chúng tôi
            </Button>
          </Link>
          <Separator className="bg-stone-300" />
          <Link href="/contact">
            <Button className="text-lg text-stone-500" variant="link">
              Liên hệ
            </Button>
          </Link>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Giới thiệu</h1>
        Cay - không chỉ là vị,
        <span>
          mà là trải nghiệm Bước chân vào NStore, bạn sẽ lập tức cảm nhận được
          sự khác biệt. Không gian bên trong cuốn hút với thiết kế hiện đại, trẻ
          trung nhưng vẫn ấm cúng. Những chùm đèn lung linh, bức tranh graffiti
          độc đáo khiến bạn có cảm giác được lạc vào một thế giới đầy màu sắc.
          Đó chính là thế giới mỳ cay theo phong cách NStore.
        </span>{" "}
        <span>
          Cay ở đây không đơn thuần chỉ là vị. Cay là trải nghiệm. Bảng thực đơn
          với 7 cấp độ cay từ nhẹ đến "cực phẩm" sẽ thử thách bạn, xem bạn có
          thể chinh phục đến mức nào.
        </span>{" "}
        <span>
          Đừng vội nghĩ rằng đó chỉ đơn giản là những món mì cay, ớt bình
          thường. Không đâu! Ngay từ cấp 1 - cấp dành cho người mới - bạn đã có
          thể cảm nhận được sự khác biệt. Nước lèo đậm vị quyện cùng hương thơm
          đặc trưng của ớt, tạo nên một "cú nổ" mạnh mẽ ngay từ lần đầu tiên.
        </span>{" "}
        <span>
          Còn nếu bạn đủ "dạn dày" để chinh phục cấp cao nhất của NStore - trải
          nghiệm sẽ còn mãnh liệt gấp bội. Hương vị cay xé nồng sẽ cuốn bạn vào
          một cơn lốc khó tả. Nó kích thích từng giác quan, khiến bạn vừa muốn
          dừng lại, vừa không thể ngừng ăn. Đó chính là sức hấp dẫn từ "cay"
          theo cách làm của riêng NStore.
        </span>{" "}
        <span>
          Nhưng NStore không chỉ dừng lại ở cay. Chất lượng món ăn cũng được đầu
          tư, nâng tầm. Từ nguyên liệu tươi ngon đến khâu chế biến tinh tế, tất
          cả tạo nên những tô mì hoàn hảo: sợi mì dai, giòn; thịt, hải sản được
          ướp gia vị đậm đà; rau củ tươi mát; cho đến nước lèo đậm vị.
        </span>{" "}
        <span>
          Điểm nhấn khác biệt của NStore chính là dịch vụ. Khách hàng là trọng
          tâm, và mỗi nhân viên Omega đều hiểu rõ điều đó. Họ sẽ đồng hành, trở
          thành "người cổ vũ" bên cạnh bạn, sẵn sàng giúp bạn chinh phục từng
          cấp độ cay một cách trọn vẹn nhất.
        </span>{" "}
        Vậy đó, NStore không đơn thuần là mỳ cay. Đó là cả một hành trình trải
        nghiệm đáng nhớ xoay quanh cay - vị của sự thách thức và khám phá!
      </div>
    </div>
  );
};

export default AboutPage;
