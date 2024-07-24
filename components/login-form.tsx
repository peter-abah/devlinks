"use client";

import { LoginFormSchema, loginFormSchema } from "@/app/(auth)/schema";
import Lock from "@/components/icons/lock";
import Mail from "@/components/icons/mail";
import { SubmitButton } from "@/components/submit-button";
import InputWithIcon from "@/components/ui/input-with-icon";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/supabase/actions";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
  } = useForm<LoginFormSchema>({ resolver: zodResolver(loginFormSchema) });

  const onSubmit = async (data: LoginFormSchema) => {
    if (isSubmitting) return;

    const errors = await signIn(data);
    if (!errors) return;

    errors.forEach(({ field, message }: { field: any; message: string }) => {
      setError(field, { message, type: "custom" });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white sm:p-10 space-y-10 sm:rounded-xl sm:w-[476px]"
    >
      <header className="space-y-2">
        <h1 className="font-bold text-2xl sm:text-[2rem]">Login</h1>
        <p className="text-gray">Add your details below to get back into the app</p>
      </header>

      <div className="stack items-center gap-6">
        <div className="w-full space-y-1">
          <Label htmlFor="email" className={cn({ "text-destructive": !!errors.email })}>
            Email address
          </Label>
          <InputWithIcon
            icon={<Mail />}
            id="email"
            placeholder="e.g. alex@email.com"
            errorMessage={errors.email ? errors.email.message : undefined}
            {...register("email")}
          />
        </div>

        <div className="w-full space-y-1">
          <Label htmlFor="password" className={cn({ "text-destructive": !!errors.password })}>
            Password
          </Label>
          <InputWithIcon
            icon={<Lock />}
            id="password"
            type="password"
            placeholder="Enter your password"
            errorMessage={errors.password ? errors.password.message : undefined}
            {...register("password")}
          />
        </div>

        <div className="stack w-full items-center gap-4">
          <SubmitButton
            aria-disabled={isSubmitting}
            disabled={isSubmitting}
            className="w-full font-semibold py-3 px-7 text-base hover:bg-primary-light disabled:cursor-not-allowed disabled:hover:bg-primary-lightest"
          >
            Login
          </SubmitButton>

          {errors.root?.server && (
            <p className="text-sm text-destructive">{errors.root?.server.message}</p>
          )}
        </div>

        <p className="text-gray stack items-center sm:block">
          Don't have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </form>
  );
}
