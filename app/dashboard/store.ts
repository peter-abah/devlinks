import { Tables } from "@/lib/types/supabase";
import { createStore as createZustandStore } from "zustand";

interface StoreProps {
  links: Partial<Tables<"links">>[];
}

export interface StoreState extends StoreProps {
  updateLinks: (links: StoreProps["links"]) => void;
}

export type Store = ReturnType<typeof createStore>;

export const createStore = (initProps?: Partial<StoreProps>) => {
  const DEFAULT_PROPS: StoreProps = {
    links: [],
  };
  return createZustandStore<StoreState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    updateLinks: (links) => set(() => ({ links })),
  }));
};
