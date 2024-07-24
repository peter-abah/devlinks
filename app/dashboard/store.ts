import { Tables } from "@/lib/types/supabase";
import { User } from "@supabase/supabase-js";
import { createStore as createZustandStore } from "zustand";

export interface StoreProps {
  links: Partial<Tables<"links">>[];
  profile: Partial<Tables<"profiles"> & { profilePicture: { name: string; url: string } | File }>;
  serverLinks?: Tables<"links">[];
  serverProfile?: Tables<"profiles"> & { profilePicture: { name: string; url: string } };
  isLinksChanged: boolean;
  user?: User;
}

export interface StoreState extends StoreProps {
  updateLinks: (links: StoreProps["links"]) => void;
  updateProfile: (profile: StoreProps["profile"]) => void;
  updateState: <T extends StoreProps[Key], Key extends keyof StoreProps>(
    key: Key,
    state: T
  ) => void;
}

export type Store = ReturnType<typeof createStore>;

export const createStore = (initProps?: Partial<StoreProps>) => {
  const DEFAULT_PROPS: StoreProps = {
    links: [],
    profile: {},
    isLinksChanged: false,
  };
  return createZustandStore<StoreState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    updateLinks: (links) => set(() => ({ links })),
    updateProfile: (profile) => set((state) => ({ profile: { ...state.profile, ...profile } })),
    updateState: (key, data) => set(() => ({ [key]: data })),
  }));
};
