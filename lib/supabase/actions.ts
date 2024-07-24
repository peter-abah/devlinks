"use server";

import { LinksFormData } from "@/components/links-form";
import { createClient, protectRoute } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LoginFormData, SignupFormData } from "../../app/(auth)/schema";
import { WithRequired } from "../types";
import { TablesInsert, TablesUpdate } from "../types/supabase";

export const signIn = async ({ email, password }: LoginFormData) => {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // TODO: different messsages for different errors
    return [{ field: "root.server", message: "Unable to login" }];
  }

  return redirect("/dashboard");
};

export const signUp = async ({ email, password }: SignupFormData) => {
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

export const updateLinks = async ({ links, deletedLinksIDs }: LinksFormData) => {
  const client = createClient();
  const {
    data: { user },
  } = await client.auth.getUser();
  if (!user) {
    return redirect("/login");
  }

  const dbLinks = links.filter(({ id }) => !!id) as Array<
    WithRequired<TablesUpdate<"links">, "id">
  >;
  const newLinks = links
    .filter(({ id }) => !id)
    .map((link) => ({ ...link, user_id: user.id })) as Array<TablesInsert<"links">>;

  const insertPromise = client.from("links").insert(newLinks);
  const updatePromises = Promise.all(
    dbLinks.map(async (link) => {
      return client.from("links").update(link).eq("id", link.id);
    })
  );
  const deletedPromises = Promise.all(
    deletedLinksIDs.map(async ({ id }) => {
      return client.from("links").delete().eq("id", id);
    })
  );

  const [insertData, updatedData, deletedData] = await Promise.all([
    insertPromise,
    updatePromises,
    deletedPromises,
  ]);

  const isUpdateError = updatedData.some(({ error }) => !!error);
  const isDeleteError = deletedData.some(({ error }) => !!error);
  if (insertData.error || isUpdateError || isDeleteError) {
    return { error: { message: "An error occured" } };
  }

  const { data: linksFromDB } = await client.from("links").select().eq("user_id", user.id);
  return { data: linksFromDB };
};

export const getLinks = async () => {
  const user = await protectRoute();
  const client = createClient();
  const { data, error } = await client.from("links").select().eq("user_id", user.id);
  if (error) {
    throw Error;
  }
  return { data };
};
