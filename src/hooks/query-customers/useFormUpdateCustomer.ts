import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useFormCustomer = () => {
  const formSchema = z.object({
    first_name: z.string().min(1, { message: "Name is required" }),
    last_name: z.string(),
    address: z.string(),
    phone_number: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      first_name: "",
      last_name: "",
      address: "",
      phone_number: "",
    },
    resolver: zodResolver(formSchema),
  });

  return { form, formSchema };
};
