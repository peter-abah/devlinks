import Navbar from "@/components/navbar";
import { protectRoute } from "@/lib/supabase/server";
import { ReactNode } from "react";

export default async function Dashboard({ children }: { children: ReactNode }) {
  await protectRoute();

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
