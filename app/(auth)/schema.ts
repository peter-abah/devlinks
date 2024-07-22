import isEmail from "validator/lib/isEmail";
import * as z from "zod";

export const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Can't be empty" })
    .refine(isEmail, { message: "Enter valid email" }),
  password: z.string().min(1, { message: "Can't be empty" }),
});

export type FormSchema = z.infer<typeof formSchema>;
