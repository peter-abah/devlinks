import { Tables } from "@/lib/types/supabase";
import { User } from "@supabase/supabase-js";
import { createStore as createZustandStore } from "zustand";
import { persist } from "zustand/middleware";

export interface StoreProps {
  links: Partial<Tables<"links">>[];
  profile: Partial<Tables<"profiles"> & { profilePicture: { name: string; url: string } | File }>;
  serverLinks?: Tables<"links">[];
  serverProfile?: Tables<"profiles"> & { profilePicture: { name: string; url: string } };
  isLinksChanged: boolean;
  user?: User;
  _hasHydrated: boolean;
}

export interface StoreState extends StoreProps {
  updateLinks: (links: StoreProps["links"]) => void;
  updateProfile: (profile: StoreProps["profile"]) => void;
  updateState: <T extends StoreProps[Key], Key extends keyof StoreProps>(
    key: Key,
    state: T
  ) => void;
  setHasHydrated: (value: boolean) => void;
}

export type Store = ReturnType<typeof createStore>;

export const createStore = (initProps?: Partial<StoreProps>) => {
  const DEFAULT_PROPS: StoreProps = {
    links: [],
    profile: {},
    isLinksChanged: false,
    _hasHydrated: false,
  };
  return createZustandStore<StoreState>()(
    persist(
      (set) => ({
        ...DEFAULT_PROPS,
        ...initProps,
        updateLinks: (links) => set(() => ({ links })),
        updateProfile: (profile) => set((state) => ({ profile: { ...state.profile, ...profile } })),
        updateState: (key, data) =>
          set((state) => {
            return { ...state, [key]: data };
          }),
        setHasHydrated: (value) => set({ _hasHydrated: value }),
      }),
      {
        name: "app-store",
      }
    )
  );
};
