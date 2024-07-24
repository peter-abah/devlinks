"use client";
import { PropsWithChildren, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import { Store, StoreState, createStore } from "./store";

export const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: PropsWithChildren) {
  const storeRef = useRef<Store>();
  if (!storeRef.current) {
    storeRef.current = createStore();
  }
  return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>;
}

export function useStoreContext<T>(selector: (state: StoreState) => T): T {
  const store = useContext(StoreContext);
  if (!store) throw new Error("Missing StoreContext.Provider in the tree");
  return useStore(store, selector);
}
