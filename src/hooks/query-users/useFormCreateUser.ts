import { COMMONS_CONST } from "@/constants/commons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function useFormCreateUser() {
  const RoleEnum = z.enum(["USER", "ADMIN"]);
  const formSchema = z.object({
    email: z.string().email({ message: COMMONS_CONST.INVALID_EMAIL }),
    name: z.string(),
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
    status: z.boolean(),
    roles: z.array(RoleEnum),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      status: true,
      roles: ["USER"],
    },
  });

  return { formSchema, form };
}
