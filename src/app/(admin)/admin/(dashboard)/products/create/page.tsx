"use client";
import ButtonBack from "@/components/button-back";
import TabDescription from "@/components/product/tab-description";
import TabImage from "@/components/product/tab-image";
import TabInfo from "@/components/product/tab-info";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { COMMONS_CONST } from "@/constants/commons";
import { PRODUCT_CONST } from "@/constants/products";
import { useGetAllCategories } from "@/hooks/query-categories/useGetAllCategories";
import { useCreateProduct } from "@/hooks/query-products/useCreateProduct";
import useFormProduct from "@/hooks/query-products/useFormProduct";
import { useToastMessage } from "@/hooks/useToastMessage";
import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/useCategoryStore";
import { InfoProduct } from "@/types/product.type";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

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

const CreateProductPage = () => {
  const [activeTab, setActiveTab] = useState<string>("info");
  const { form, formSchema } = useFormProduct({
    name: "",
    description: "",
    status: true,
    cost: 0,
    price: 0,
    sale: 0,
    stock: 0,
    category_id: "",
  });
  const [image, setImage] = useState<File>();
  const [extraImage, setExtraImage] = useState<File[]>([]);
  const { toastError, toastLoading } = useToastMessage();
  const mutate = useCreateProduct();

  const { setListCategory, listCategory } = useCategoryStore();
  const { data } = useGetAllCategories({
    page: 1,
    limit: 100,
    sort: "asc",
    keyword: "",
  });
  useEffect(() => {
    if (data) {
      setListCategory(data.entities ?? []);
    }
  }, [data]);

  const errorFields = Object.keys(form.formState.errors);
  useEffect(() => {
    if (errorFields.length > 0) {
      toastError("Vui lòng điền đầy đủ thông tin");
    }
  }, [form.formState.errors]);

  const handleCreate = (values: z.infer<typeof formSchema>) => {
    toastLoading(COMMONS_CONST.LOADING);
    mutate.mutate({
      product: values,
      main_image: image ?? null,
      extra_images: extraImage,
    });
  };

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">{PRODUCT_CONST.CREATE}</h1>
      <ButtonBack url="/admin/products" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCreate)}>
          <Tabs
            orientation="vertical"
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex gap-4"
          >
            <TabsList className="flex h-auto flex-col items-start justify-start gap-2 !bg-transparent pr-4">
              {tabData.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "w-full justify-start",
                    activeTab === tab.value
                      ? "!bg-green-800 !text-white"
                      : "hover:bg-green-500",
                  )}
                >
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="h-full flex-1">
              <TabInfo value="info" form={form} listCategory={listCategory} />
              <TabDescription value="description" form={form} />
              <TabImage
                value="image"
                image={image}
                setImage={setImage}
                extraImage={extraImage}
                setExtraImage={setExtraImage}
              />
            </div>
          </Tabs>
          <Button className="float-right">{PRODUCT_CONST.CREATE}</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateProductPage;
