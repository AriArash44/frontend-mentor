import { create } from "zustand";

interface BillStore {
    bill: number | null;
    set: (billValue: number) => void;
    reset: () => void;
}

const useTipStore = create<BillStore>((set) => ({
    bill: null,
    set: (billValue) => set({ bill: billValue }),
    reset: () => set({ bill: null }),
}));

export default useTipStore;
