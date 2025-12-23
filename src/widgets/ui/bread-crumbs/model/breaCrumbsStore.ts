// shared/model/breadcrumbStore.ts
import { create } from 'zustand';
type BreadCrumbsItem = {
  label: string;
  href?: string;
};

interface BreadcrumbState {
  items: BreadCrumbsItem[];
  setItems: (items: BreadCrumbsItem[]) => void;
  pushItem: (item: BreadCrumbsItem) => void;
  popItem: () => void;
  clear: () => void;
}

export const useBreadcrumbStore = create<BreadcrumbState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  pushItem: (item) => set((state) => ({ items: [...state.items, item] })),
  popItem: () => set((state) => ({ items: state.items.slice(0, -1) })),
  clear: () => set({ items: [] }),
}));
