"use client";
// TODO: style toast, diff style for error toast
import Preview from "@/components/preview";
import { Button, buttonVariants } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { defaultUrl } from "@/lib/utils";
import Link from "next/link";
import { useStoreContext } from "../store-context";

const PREVIEW_BASE_URL = `${defaultUrl}/preview`;

export default function Page() {
  const { toast } = useToast();
  const { serverLinks, serverProfile, user } = useStoreContext(
    ({ serverLinks, serverProfile, user }) => ({
      serverLinks,
      serverProfile,
      user,
    })
  );

  const shareLink = () => {
    console.log({ user });
    if (!user) {
      toast({ description: "You have to login" });
      return;
    }
    navigator.clipboard.writeText(`${PREVIEW_BASE_URL}/${user.id}`);
    toast({ description: "The link has been copied to your clipboard!" });
  };
  return (
    <div className="min-h-screen relative w-full max-w-screen-2xl mx-auto bg-white md:bg-transparent">
      <div className="hidden md:block p-6 w-full absolute 2xl:w-screen 2xl:fixed top-0 left-0 h-[357px] bg-primary rounded-b-[32px] -z-10"></div>
      <header className="px-6 pr-4 py-4 md:m-6 bg-white flex justify-between gap-4 rounded-xl">
        <Link href="/dashboard" className={buttonVariants({ variant: "outline" })}>
          Back to Editor
        </Link>
        <Button type="button" onClick={shareLink}>
          Share Link
        </Button>
      </header>

      <Preview links={serverLinks || []} profile={serverProfile} />
    </div>
  );
}
