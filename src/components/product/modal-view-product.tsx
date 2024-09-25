import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { COMMONS_CONST } from "@/constants/commons";
import { PRODUCT_CONST } from "@/constants/products";
import { useGetProduct } from "@/hooks/query-products/useGetProduct";
import { cn } from "@/lib/utils";
import { useProductStore } from "@/store/useProductStore";
import { formatDate } from "@/utils/common";
import Image from "next/image";
import { useEffect, useState } from "react";
import ImageDefault from "@/public/images/product-empty.png";
import { useGetCategories } from "@/hooks/query-categories/useGetCategories";
import ImageDeleteIcon from "@/components/image-delete-icon";

const tabData = [
  {
    value: "info",
    title: "Thông tin",
    content: "Manage your account settings and preferences.",
  },
  {
    value: "description",
    title: "Mô tả sản phẩm",
    content: "Change your password and security settings.",
  },
  {
    value: "image",
    title: "Ảnh sản phẩm",
  },
];

const ModalViewProduct = () => {
  const [activeTab, setActiveTab] = useState<string>("info");
  const { modalView, setModalView, id, category_id } = useProductStore();
  const { data } = useGetProduct(id);
  const { data: category } = useGetCategories(category_id);
  return (
    <Dialog open={modalView} onOpenChange={setModalView}>
      <DialogContent className="bg-black">
        <DialogHeader>
          <DialogTitle>
            {COMMONS_CONST.INFORMATION} {data?.name}
          </DialogTitle>
          <DialogDescription>
            {PRODUCT_CONST.VIEW_DESCRIPTION}
          </DialogDescription>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex h-auto items-start gap-2 !bg-transparent pr-4">
            {tabData.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  activeTab === tab.value
                    ? "!bg-green-800 !text-white"
                    : "hover:bg-green-500",
                )}
              >
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="info">
            <div className="flex flex-col gap-2 font-mono">
              <h1>
                {COMMONS_CONST.NAME}: {data?.name}
              </h1>
              <div className="flex">
                <div className="flex w-1/2 flex-col gap-2">
                  <h1>
                    {COMMONS_CONST.COST}: {data?.cost}
                  </h1>
                  <h1>
                    {COMMONS_CONST.PRICE}: {data?.price}
                  </h1>
                </div>
                <div className="flex w-1/2 flex-col gap-2">
                  <h1>
                    {COMMONS_CONST.SALE}: {data?.sale} %
                  </h1>
                  <h1>
                    {COMMONS_CONST.STOCK}: {data?.stock}
                  </h1>
                </div>
              </div>
              <h1>
                {COMMONS_CONST.CATEGORY}: {category?.name}
              </h1>
              <h1>
                {COMMONS_CONST.CREATE_DATE}:{" "}
                {data?.created_at && formatDate(data.created_at)}
              </h1>
            </div>
          </TabsContent>
          <TabsContent value="description">
            <Textarea
              placeholder="mô tả sản phẩm"
              rows={10}
              value={data?.description}
              readOnly
            />
          </TabsContent>
          <TabsContent value="image">
            <div className="flex flex-col gap-2">
              <div>
                <h1>{COMMONS_CONST.MAIN_IMAGE}</h1>
                <Image
                  alt="Anh san pham"
                  src={data?.url || ImageDefault}
                  width={100}
                  height={100}
                  className="rounded-md object-cover"
                />
              </div>
              <div>
                <h1>{COMMONS_CONST.EXTRA_IMAGES}</h1>
                <ScrollArea className="h-[200px] w-full border">
                  <div className="flex flex-wrap items-center justify-between gap-2 p-2">
                    {data?.extra_images?.map((image) => (
                      <Image
                        key={image.id}
                        alt="Anh san pham"
                        src={image.url}
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ModalViewProduct;
