import { AUTH_CONST } from "@/constants/auth";
import { COMMONS_CONST } from "@/constants/commons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function useFormRegister() {
  const formSchema = z
    .object({
      first_name: z.string().min(1, { message: "Name is required" }),
      last_name: z.string().min(1, { message: "Name is required" }),
      email: z.string().email({ message: AUTH_CONST.INVALID_EMAIL }),
      password: z
        .string()
        .regex(/[A-Z]/, {
          message: COMMONS_CONST.UPPERCASE_PASSWORD,
        })
        .regex(/[a-z]/, {
          message: COMMONS_CONST.LOWERCASE_PASSWORD,
        })
        .regex(/\d/, { message: COMMONS_CONST.NUMBER_PASSWORD })
        .regex(/[\W_]/, {
          message: COMMONS_CONST.SPECIAL_PASSWORD,
        }),
      confirm_password: z.string(),
    })
    .refine(({ password, confirm_password }) => password === confirm_password, {
      message: AUTH_CONST.PASSWORD_NOTMATCH,
      path: ["confirm_password"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  return { formSchema, form };
}
