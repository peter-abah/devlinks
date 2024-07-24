import Navbar from "@/components/navbar";
import PhonePreview from "@/components/phone-preview";
import { getLinks } from "@/lib/supabase/actions";
import { protectRoute } from "@/lib/supabase/server";
import { ReactNode } from "react";
import { StoreProvider } from "./store-context";

// TODO: Error and notfound state
export default async function Dashboard({ children }: { children: ReactNode }) {
  await protectRoute();
  const { data: links } = await getLinks();

  return (
    <StoreProvider links={links}>
      <div className="max-h-[984px] min-h-screen overflow-hidden w-full max-w-screen-2xl mx-auto stack">
        <Navbar />
        <div className="px-4 pb-4 md:px-6 md:pb-6 flex gap-6 max-h-full grow">
          <PhonePreview />
          {children}
        </div>
      </div>
    </StoreProvider>
  );
}
