import { create } from "zustand";

interface UserState {
  user: any;
  setUser: (user: any) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => {
    console.log("Setting user:", user);
    set({ user });
  },
  clearUser: () => {
    console.log("Clearing user");
    set({ user: null });
  },
}));

export default useUserStore;
