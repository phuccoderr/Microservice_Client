import { Checkout } from "@/types/checkout.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function useFormCheckout(props: Checkout) {
  const formSchema = z.object({
    payment_method: z.string(),
    address: z.string(),
    phone_number: z.string(),
    note: z.string(),
    sale: z.number(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: props,
  });

  return { formSchema, form };
}
