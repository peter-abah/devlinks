"use server";

import { LoginFormData, SignupFormData } from "@/app/(auth)/schema";
import { LinksFormData } from "@/components/links-form";
import { ProfileFormData } from "@/components/profile-form";
import { createClient, protectRoute } from "@/lib/supabase/server";
import { WithRequired } from "@/lib/types";
import { Tables, TablesInsert, TablesUpdate } from "@/lib/types/supabase";
import { redirect } from "next/navigation";

export const signIn = async ({ email, password }: LoginFormData) => {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return [{ field: "root.server", message: "Unable to login, password or email incorrect" }];
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
    return [{ field: "root.server", message: "Unable to signup." }];
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

export const updateProfile = async (formData: ProfileFormData) => {
  const user = await protectRoute();
  const client = createClient();
  let res;

  if (formData.id) {
    res = await client.from("profiles").update(formData).select();
    if (res.error) {
      return { error: { message: "An error occured, could not update profile." } };
    }
  } else {
    res = await client
      .from("profiles")
      .insert({ ...formData, user_id: user.id })
      .select();
    if (res.error) {
      return { error: { message: "An error occured, could not create profile." } };
    }
  }
  const profile = await transFormProfile(res.data[0]);
  return { data: profile };
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

export const getProfile = async () => {
  const user = await protectRoute();
  const client = createClient();
  const { data, error } = await client.from("profiles").select().eq("user_id", user.id);
  if (error) {
    throw Error;
  }

  const profile = data ? await transFormProfile(data[0]) : data;
  return { data: profile };
};

export const transFormProfile = async (profile: Tables<"profiles">) => {
  const client = createClient();
  const {
    data: { publicUrl },
  } = await client.storage.from("profile_images").getPublicUrl(profile.profile_image_path);
  return { ...profile, profilePicture: { url: publicUrl, name: "" } };
};
