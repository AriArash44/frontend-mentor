import { create } from "zustand";

const useTipStore = create((set) => ({
    tip: null,
    set: (tipValue: number) => set({ tip: tipValue }),
    reset: () => set({ tip: null}),
}));

export default useTipStore;