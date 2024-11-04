import { AUTH_CONST } from "@/constants/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function useFormFeedback() {
  const formSchema = z.object({
    name: z.string().min(1),
    email: z.string().email({ message: AUTH_CONST.INVALID_EMAIL }),
    message: z.string().min(1),
    phone_number: z.string().min(10),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      phone_number: "",
    },
  });

  return { formSchema, form };
}
