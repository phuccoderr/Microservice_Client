import { AUTH_CONST } from "@/constants/auth";
import { COMMONS_CONST } from "@/constants/commons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function useFormPassword() {
  const formSchema = z
    .object({
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
      password: "",
      confirm_password: "",
    },
  });

  return { formSchema, form };
}
