import ImageDeleteIcon from "@/components/image-delete-icon";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import CATEGORIES_CONST from "@/constants/categories";
import { COMMONS_CONST } from "@/constants/commons";
import { useGetAllCategories } from "@/hooks/query-categories/useGetAllCategories";
import { useAddImage } from "@/hooks/query-products/useAddImage";
import useFormProduct from "@/hooks/query-products/useFormProduct";
import { useGetProduct } from "@/hooks/query-products/useGetProduct";
import { useUpdateProduct } from "@/hooks/query-products/useUpdateProduct";
import { useToastMessage } from "@/hooks/useToastMessage";
import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useProductStore } from "@/store/useProductStore";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
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

const SheetUpdateProduct = () => {
  const [activeTab, setActiveTab] = useState<string>("info");
  const { sheetUpdate, setSheetUpdate, id } = useProductStore();
  const { setListCategory, listCategory } = useCategoryStore();
  const { toastLoading } = useToastMessage();

  const mutateImage = useAddImage();
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    toastLoading(COMMONS_CONST.LOADING);
    file && mutateImage.mutate({ id, data: file });
  };

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
  const { data: product } = useGetProduct(id);
  useEffect(() => {
    if (product) {
      const {
        name,
        description,
        cost,
        price,
        sale,
        stock,
        status,
        category_id,
      } = product;
      form.setValue("name", name ?? "");
      form.setValue("description", description ?? "");
      form.setValue("cost", cost);
      form.setValue("price", price);
      form.setValue("sale", sale);
      form.setValue("stock", stock);
      form.setValue("status", status ?? true);
      form.setValue("category_id", category_id ?? "");
    }
  }, [product]);

  const { data: categories } = useGetAllCategories({
    page: 1,
    limit: 100,
    sort: "asc",
    keyword: "",
  });
  useEffect(() => {
    if (categories) {
      setListCategory(categories.entities ?? []);
    }
  }, [categories]);

  const mutateInfo = useUpdateProduct();
  const handleUpdate = (values: z.infer<typeof formSchema>) => {
    toastLoading(COMMONS_CONST.LOADING);
    mutateInfo.mutate({ id, data: values });
  };

  return (
    <Sheet open={sheetUpdate} onOpenChange={setSheetUpdate}>
      <SheetTrigger>OPEN</SheetTrigger>

      <SheetContent className="bg-black">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)}>
            <SheetHeader>
              <SheetTitle>Cập nhật sản phẩm</SheetTitle>
              <SheetDescription>
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
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{COMMONS_CONST.NAME}</FormLabel>
                            <FormControl>
                              <Input placeholder="Tên" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="cost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{COMMONS_CONST.COST}</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{COMMONS_CONST.PRICE}</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="sale"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{COMMONS_CONST.SALE}</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{COMMONS_CONST.STOCK}</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="category_id"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormLabel>{COMMONS_CONST.CATEGORY}</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={CATEGORIES_CONST.SELECT_PARENT}
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {listCategory.map((item) => (
                                  <SelectItem key={item.id} value={item.id}>
                                    {item.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-2">
                            <FormLabel>{COMMONS_CONST.STATUS}</FormLabel>
                            <FormControl>
                              <Switch
                                checkedIcon={<FaCheck />}
                                unCheckedIcon={<RxCross2 />}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="description">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mô tả sản phẩm</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={25}
                              placeholder="Mô tả"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  <TabsContent value="image">
                    <div className="flex items-center gap-2">
                      <div>
                        <h1>{COMMONS_CONST.MAIN_IMAGE}</h1>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                          <Label htmlFor="picture">Picture</Label>
                          <Button
                            disabled={mutateImage.isPending}
                            type="button"
                            onClick={() =>
                              document
                                .getElementById("hiddenFileInput")
                                ?.click()
                            }
                          >
                            Thay đổi ảnh
                          </Button>
                          <Input
                            onChange={handleChangeImage}
                            id="hiddenFileInput"
                            type="file"
                            className="hidden"
                          />
                        </div>
                      </div>
                      {product?.url && (
                        <Image
                          src={product?.url}
                          alt=""
                          width={100}
                          height={100}
                          className="rounded-lg object-cover"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="">
                        <h1>{COMMONS_CONST.EXTRA_IMAGES}</h1>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                          <Label htmlFor="picture">Picture</Label>
                          <Input id="picture" type="file" />
                        </div>
                      </div>
                      <ScrollArea className="h-[300px] w-full border">
                        <div className="flex flex-wrap items-center justify-between gap-2 p-2">
                          {product?.extra_images?.map((image) => (
                            <ImageDeleteIcon key={image.id} image={image} />
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </TabsContent>
                </Tabs>
              </SheetDescription>
              <SheetFooter>
                <Button
                  className={`${activeTab === "image" && "hidden"}`}
                  disabled={mutateInfo.isPending}
                >
                  {COMMONS_CONST.SAVE}
                </Button>
              </SheetFooter>
            </SheetHeader>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default SheetUpdateProduct;
