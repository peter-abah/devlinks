import Preview from "@/components/preview";
import ShareLinkButton from "@/components/share-link";
import { transFormProfile } from "@/lib/supabase/actions";
import { createClient } from "@/lib/supabase/server";
import { PROFILE_BASE_URL } from "@/lib/utils";
import { notFound } from "next/navigation";
import { isUUID } from "validator";

export default async function Page({ params }: { params: { user_id: string } }) {
  const { user_id } = params;

  // Supabase returns an error for uuid fields if a normal string is passed
  if (!isUUID(user_id)) {
    return notFound();
  }

  const client = createClient();
  const [{ data: profileRes, error: profileError }, { data: links, error: linksError }] =
    await Promise.all([
      client.from("profiles").select().eq("user_id", user_id),
      client.from("links").select().eq("user_id", user_id),
    ]);

  if (profileError || linksError) {
    throw { profileError, linksError };
  }

  if (!profileRes?.[0]) {
    notFound();
  }
  // TODO: loading indicator for changing routes
  const profile = await transFormProfile(profileRes[0]);

  return (
    <div className="min-h-screen relative w-full max-w-screen-2xl mx-auto bg-white md:bg-transparent">
      <div className="hidden md:block p-6 w-full absolute 2xl:w-screen 2xl:fixed top-0 left-0 h-[357px] bg-primary rounded-b-[32px] -z-10"></div>
      <header className="px-6 pr-4 py-4 md:m-6 bg-white flex justify-end gap-4 rounded-xl">
        <ShareLinkButton link={`${PROFILE_BASE_URL}/${user_id}`} />
      </header>

      <Preview links={links || []} profile={profile} />
    </div>
  );
}
