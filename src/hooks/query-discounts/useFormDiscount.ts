import { CreateDiscount } from "@/types/discount.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function useFormDiscount(props: CreateDiscount) {
  const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    code: z.string().min(1, { message: "Code is required" }),
    expiry_date: z.date().refine((date) => date >= new Date(), {
      message: "Expiry date phải từ ngày hiện tại trở lên",
    }),
    sale: z.number().min(0, { message: "Sale must be greater than 0" }),
    quantity: z.number(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: props,
  });

  return { formSchema, form };
}
