"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CATEGORIES_CONST from "@/constants/categories";
import { COMMONS_CONST } from "@/constants/commons";
import { useCreateCategory } from "@/hook/query-categories/useCreateCategory";
import useFormCategory from "@/hook/query-categories/useFormCategory";
import { useToastMessage } from "@/hook/useToastMessage";
import { useCategoryStore } from "@/store/useCategoryStore";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
import { z } from "zod";

const CreatePage = () => {
  const { listCategory } = useCategoryStore();
  const { toastLoading } = useToastMessage();
  const mutate = useCreateCategory();
  const { formSchema, form } = useFormCategory({
    name: "",
    status: true,
    parent_id: "",
  });

  const handleCreate = (values: z.infer<typeof formSchema>) => {
    toastLoading(COMMONS_CONST.LOADING);
    mutate.mutate(values);
  };

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Tạo danh mục</h1>
      <Link href={"/admin/categories"}>
        <Button className="min-w-[10%] max-w-[10%]">
          <IoMdArrowRoundBack className="mr-2 h-4 w-4" /> {COMMONS_CONST.BACK}
        </Button>
      </Link>
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Tạo danh mục</CardTitle>
          <CardDescription>Nhập đầy đủ</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={COMMONS_CONST.ENTER_NAME}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Trạng thái của danh mục</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="parent_id"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormLabel>Danh mục cha</FormLabel>
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
            </CardContent>
            <CardFooter>
              <Button
                disabled={mutate.isPending}
                className="w-full"
                type="submit"
              >
                {COMMONS_CONST.SAVE}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};
export default CreatePage;
