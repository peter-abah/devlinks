import Navbar from "@/components/navbar";
import PhonePreview from "@/components/phone-preview";
import { protectRoute } from "@/lib/supabase/server";
import { ReactNode } from "react";

export default async function Dashboard({ children }: { children: ReactNode }) {
  await protectRoute();

  return (
    <div className="min-h-screen w-full max-w-screen-2xl mx-auto stack">
      <Navbar />
      <div className="px-4 pb-4 md:px-6 md:pb-6 flex gap-6 grow">
        <PhonePreview />
        {children}
      </div>
    </div>
  );
}
