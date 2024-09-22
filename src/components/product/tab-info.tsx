import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { UseFormReturn } from "react-hook-form";

interface TabInfoProps {
  value: string;
  form: UseFormReturn<
    {
      name: string;
      description: string;
      status: boolean;
      cost: number;
      price: number;
      sale: number;
      stock: number;
      category_id: string;
      id?: string | undefined;
    },
    any,
    undefined
  >;
}

const TabInfo = ({ value, form }: TabInfoProps) => {
  return (
    <TabsContent value={value}>
      <h2 className="mb-4 text-2xl font-bold">Nhập thông tin sản phẩm</h2>
      <div className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên</FormLabel>
              <FormControl>
                <Input placeholder="Tên" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between gap-2">
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Giá gốc ( VND )</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Giá bán ( VND )</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <FormField
            control={form.control}
            name="sale"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Giảm giá ( % VND )</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    max={100}
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Tồn kho </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
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
      </div>
    </TabsContent>
  );
};

export default TabInfo;