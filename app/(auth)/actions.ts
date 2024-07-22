"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { FormSchema } from "./schema";

export const signIn = async ({ email, password }: FormSchema) => {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // TODO: different messsages for different errors
    console.log({ error });
    return [{ field: "root.server", message: "Unable to login" }];
  }

  return redirect("/dashboard");
};

export const signUp = async ({ email, password }: FormSchema) => {
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    // TODO: different messsages for different errors
    return [{ field: "root.server", message: "Unable to login" }];
  }

  return redirect("/dashboard");
};
