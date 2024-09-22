import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

interface TabDescriptionProps {
  value: string;
  form: any;
}

const TabDescription = ({ value, form }: TabDescriptionProps) => {
  return (
    <TabsContent value={value}>
      <h2 className="mb-4 text-2xl font-bold">Nhập mô tả sản phẩm</h2>
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mô tả sản phẩm</FormLabel>
            <FormControl>
              <Textarea rows={10} placeholder="Tên" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </TabsContent>
  );
};

export default TabDescription;
