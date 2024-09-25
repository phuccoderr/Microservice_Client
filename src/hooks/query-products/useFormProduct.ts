import { InfoProduct } from "@/types/product.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function useFormProduct(props: InfoProduct) {
  const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Des is required" }),
    status: z.boolean(),
    cost: z.number(),
    price: z.number(),
    sale: z.number(),
    stock: z.number(),
    category_id: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: props,
  });

  return { formSchema, form };
}
