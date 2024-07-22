import isEmail from "validator/lib/isEmail";
import * as z from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Can't be empty" })
    .refine(isEmail, { message: "Enter valid email" }),
  password: z.string().min(1, { message: "Can't be empty" }),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
export type LoginFormData = LoginFormSchema;

export const signupFormSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Can't be empty" })
      .refine(isEmail, { message: "Enter valid email" }),
    password: z.string().min(8, { message: "Must contain at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Please check again",
    path: ["password",], // path of error
  });

export type SignupFormSchema = z.infer<typeof signupFormSchema>;
export type SignupFormData = Omit<SignupFormSchema, "confirmPassword">;
