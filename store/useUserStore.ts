import { create } from "zustand";
import { User } from "@supabase/supabase-js";
import { persist } from "zustand/middleware";

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => {
        console.log("Setting user:", user);
        set({ user });
      },
      clearUser: () => {
        console.log("Clearing user");
        set({ user: null });
      },
    }),
    {
      name: "slipshare-user-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useUserStore;
