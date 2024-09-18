import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import useFormCategory from "@/hook/query-categories/useFormCategory";
import { useUpdateCategory } from "@/hook/query-categories/useUpdateCategory";
import { useToastMessage } from "@/hook/useToastMessage";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useEffect } from "react";
import { z } from "zod";

const ModalUpdateCategory = () => {
  const {
    modalUpdate,
    setModalUpdate,
    id,
    name,
    status,
    parent_id,
    listCategory,
  } = useCategoryStore();
  const { toastLoading } = useToastMessage();
  const mutate = useUpdateCategory();
  const { formSchema, form } = useFormCategory({ name, status, parent_id });

  useEffect(() => {
    form.setValue("name", name);
    form.setValue("status", status);
    form.setValue("parent_id", parent_id ?? "");
  }, [id]);

  const handleUpdate = (values: z.infer<typeof formSchema>) => {
    toastLoading(COMMONS_CONST.LOADING);
    mutate.mutate({ id, data: values });
  };

  return (
    <Dialog open={modalUpdate} onOpenChange={setModalUpdate}>
      <DialogContent className="bg-black sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {CATEGORIES_CONST.UPDATE_CATEGORY}: {name}
          </DialogTitle>
          <DialogDescription>
            {CATEGORIES_CONST.UPDATE_DESCRIPTION}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)}>
            <div className="grid gap-4 py-4">
              <div className="gird-gap-2 grid">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{COMMONS_CONST.NAME}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div className="gird-gap-2 grid">
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
                ></FormField>
              </div>
              <div className="gird-gap-2 grid">
                <FormField
                  control={form.control}
                  name="parent_id"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormLabel>Danh mục cha</FormLabel>
                      <FormMessage />
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value ?? ""}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={CATEGORIES_CONST.SELECT_PARENT}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {listCategory
                            .filter((item) => item.id !== id)
                            .map((item) => (
                              <SelectItem key={item.id} value={item.id}>
                                {item.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                ></FormField>
              </div>
            </div>

            <DialogFooter>
              <Button type="submit">{COMMONS_CONST.SAVE}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateCategory;
