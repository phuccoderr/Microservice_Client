import { AUTH_CONST } from "@/constants/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function useFormLogin() {
  const formSchema = z.object({
    email: z.string().email({ message: AUTH_CONST.INVALID_EMAIL }),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return { formSchema, form };
}
