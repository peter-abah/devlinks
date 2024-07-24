"use client";

import { SignupFormSchema, signupFormSchema } from "@/app/(auth)/schema";
import Lock from "@/components/icons/lock";
import Mail from "@/components/icons/mail";
import { SubmitButton } from "@/components/submit-button";
import InputWithIcon from "@/components/ui/input-with-icon";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/supabase/actions";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Spinner from "./spinner";

export default function SignupForm() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
  } = useForm<SignupFormSchema>({ resolver: zodResolver(signupFormSchema) });

  const onSubmit = async (data: SignupFormSchema) => {
    if (isSubmitting) return;

    const errors = await signUp(data);
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
        <h1 className="font-bold text-2xl sm:text-[2rem]">Create account</h1>
        <p className="text-gray">Let’s get you started sharing your links!</p>
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
            Create password
          </Label>
          <InputWithIcon
            icon={<Lock />}
            id="password"
            type="password"
            placeholder="At least 8 characters"
            errorMessage={errors.password ? errors.password.message : undefined}
            {...register("password")}
          />
        </div>

        <div className="w-full space-y-1">
          <Label
            htmlFor="confirm-password"
            className={cn({ "text-destructive": !!errors.confirmPassword })}
          >
            Confirm password
          </Label>
          <InputWithIcon
            icon={<Lock />}
            id="confirm-password"
            type="password"
            placeholder="At least 8 characters"
            errorMessage={errors.confirmPassword ? errors.confirmPassword.message : undefined}
            {...register("confirmPassword")}
          />
        </div>

        <p className="text-xs text-gray w-full">Password must contains at least 8 characters</p>

        <div className="stack w-full items-center gap-4">
          <SubmitButton
            aria-disabled={isSubmitting}
            disabled={isSubmitting}
            className="w-full font-semibold flex gap-2 items-center py-3 px-7 text-base hover:bg-primary-light disabled:bg-primary-lightest disabled:cursor-not-allowed disabled:hover:bg-primary-lightest"
          >
            {isSubmitting && <Spinner />}
            Create new account
          </SubmitButton>

          {errors.root?.server && (
            <p className="text-sm text-destructive">{errors.root?.server.message}</p>
          )}
        </div>

        <p className="text-gray stack items-center sm:block">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}
