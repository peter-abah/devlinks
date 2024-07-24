"use client";

import Preview from "@/components/preview";
import ShareLinkButton from "@/components/share-link";
import { buttonVariants } from "@/components/ui/button";
import { PROFILE_BASE_URL } from "@/lib/utils";
import Link from "next/link";
import { useStoreContext } from "../store-context";

export default function Page() {
  const { serverLinks, serverProfile, user } = useStoreContext(
    ({ serverLinks, serverProfile, user }) => ({
      serverLinks,
      serverProfile,
      user,
    })
  );

  return (
    <div className="min-h-screen relative w-full max-w-screen-2xl mx-auto bg-white md:bg-transparent">
      <div className="hidden md:block p-6 w-full absolute 2xl:w-screen 2xl:fixed top-0 left-0 h-[357px] bg-primary rounded-b-[32px] -z-10"></div>
      <header className="px-6 pr-4 py-4 md:m-6 bg-white flex justify-between gap-4 rounded-xl">
        <Link href="/dashboard" className={buttonVariants({ variant: "outline" })}>
          Back to Editor
        </Link>
        <ShareLinkButton link={`${PROFILE_BASE_URL}/${user?.id}`} />
      </header>

      <Preview links={serverLinks || []} profile={serverProfile} />
    </div>
  );
}
