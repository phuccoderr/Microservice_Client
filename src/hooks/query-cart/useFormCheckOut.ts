import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function useFormCheckout() {
  const formSchema = z.object({
    payment_method: z.string(),
    address: z.string(),
    phone_number: z.string(),
    note: z.string(),
    sale: z.number(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      payment_method: "COD",
      address: "",
      phone_number: "",
      note: "",
      sale: 0,
    },
    resolver: zodResolver(formSchema),
  });

  return { formSchema, form };
}
