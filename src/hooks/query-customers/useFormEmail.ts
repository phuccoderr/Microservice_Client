import { AUTH_CONST } from "@/constants/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function useFormEmail() {
  const formSchema = z.object({
    email: z.string().email({ message: AUTH_CONST.INVALID_EMAIL }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  return { formSchema, form };
}
