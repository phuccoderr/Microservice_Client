import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function useFormCategory(props: {
  id?: string;
  name: string;
  status: boolean;
  parent_id: string;
}) {
  const formSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    status: z.boolean(),
    parent_id: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: props,
  });

  return { formSchema, form };
}
