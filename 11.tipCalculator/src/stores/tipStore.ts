import { create } from "zustand";

interface TipStore {
    tip: number | null;
    set: (tipValue: number) => void;
    reset: () => void;
}

const useTipStore = create<TipStore>((set) => ({
    tip: null,
    set: (tipValue) => set({ tip: tipValue }),
    reset: () => set({ tip: null }),
}));

export default useTipStore;
