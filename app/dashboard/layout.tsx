import { getLinks, getProfile } from "@/lib/supabase/actions";
import { protectRoute } from "@/lib/supabase/server";
import { ReactNode } from "react";
import { StoreProvider } from "./store-context";

// TODO: Error and notfound state
// TODO: favicon and site data
export default async function Dashboard({ children }: { children: ReactNode }) {
  const user = await protectRoute();
  const [{ data: links }, { data: profile }] = await Promise.all([getLinks(), getProfile()]);

  return (
    <StoreProvider serverLinks={links} serverProfile={profile} user={user}>
      {children}
    </StoreProvider>
  );
}
