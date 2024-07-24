import { Tables } from "@/lib/types/supabase";
import { createStore as createZustandStore } from "zustand";

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: File;
}

export interface StoreProps {
  links: Partial<Tables<"links">>[];
  profile: Partial<Profile>;
}
export interface StoreState extends StoreProps {
  updateLinks: (links: StoreProps["links"]) => void;
  updateProfile: (profile: StoreProps["profile"]) => void;
}

export type Store = ReturnType<typeof createStore>;

export const createStore = (initProps?: Partial<StoreProps>) => {
  const DEFAULT_PROPS: StoreProps = {
    links: [],
    profile: {},
  };
  return createZustandStore<StoreState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    updateLinks: (links) => set(() => ({ links })),
    updateProfile: (profile) => set((state) => ({ profile: { ...state.profile, ...profile } })),
  }));
};
