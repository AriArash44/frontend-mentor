import { create } from "zustand";

interface PeopleStore {
    people: number | null;
    set: (peopleValue: number) => void;
    reset: () => void;
}

const useTipStore = create<PeopleStore>((set) => ({
    people: null,
    set: (peopleValue) => set({ people: peopleValue }),
    reset: () => set({ people: null }),
}));

export default useTipStore;
