import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { COMMONS_CONST } from "@/constants/commons";
import { useFormCustomer } from "@/hooks/query-customers/useFormUpdateCustomer";
import { useGetMe } from "@/hooks/query-customers/useGetMe";
import { useUpdateCustomer } from "@/hooks/query-customers/useUpdateCustomer";
import { useToastMessage } from "@/hooks/useToastMessage";
import { useEffect } from "react";
import { z } from "zod";

interface TabInfoProps {
  value: string;
  form?: any;
}

function TabInfo(props: TabInfoProps) {
  const { form, formSchema } = useFormCustomer();
  const { data: customer } = useGetMe();
  const { toastLoading } = useToastMessage();
  const mutation = useUpdateCustomer();

  useEffect(() => {
    form.setValue("first_name", customer?.first_name ?? "");
    form.setValue("last_name", customer?.last_name ?? "");
    form.setValue("address", customer?.address ?? "");
    form.setValue("phone_number", customer?.phone_number ?? "");
  }, [customer]);

  function handleUpdate(data: z.infer<typeof formSchema>) {
    toastLoading("Vui lòng đợi!");
    mutation.mutate(data);
  }

  return (
    <TabsContent
      value={props.value}
      className="flex w-full flex-col items-center gap-2"
    >
      <h1 className="text-2xl font-bold">{COMMONS_CONST.PROFILE}</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdate)}
          className="flex w-96 flex-col gap-2"
        >
          <Label>Email</Label>
          <Input value={customer?.email} disabled />
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{COMMONS_CONST.FIRST_NAME}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{COMMONS_CONST.LAST_NAME}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{COMMONS_CONST.ADDRESS}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{COMMONS_CONST.PHONE_NUMBER}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="self-end">{COMMONS_CONST.SAVE}</Button>
        </form>
      </Form>
    </TabsContent>
  );
}

export default TabInfo;
