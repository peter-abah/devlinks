import Navbar from "@/components/navbar";
import PhonePreview from "@/components/phone-preview";
import { protectRoute } from "@/lib/supabase/server";
import { ReactNode } from "react";

export default async function Dashboard({ children }: { children: ReactNode }) {
  await protectRoute();

  return (
    <div>
      <Navbar />
      <div className="px-6 flex gap-6">
        <PhonePreview />
        {children}
      </div>
    </div>
  );
}
