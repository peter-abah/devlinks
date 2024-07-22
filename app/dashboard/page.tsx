import { protectRoute } from "@/lib/supabase/server";

export default async function Dashboard() {
  await protectRoute();

  return <main>Dashboard</main>;
}
