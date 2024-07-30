import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface IUser {
  user_id: string;
  email: string;
}

interface IStore {
  accessToken: string | null;
  user: IUser | null;
  setUser: (user: IUser) => void;
  setAccessToken: (tok: string) => void;
  logout: () => void;
}

export const useAuthStore = create<IStore>()(
  devtools(
    persist(
      (set, get) => ({
        accessToken: null,
        user: null,
        setAccessToken(tok) {
          set({ accessToken: tok });
        },
        setUser(user) {
          set({ user });
        },
        logout() {
          set({ accessToken: null, user: null });
        },
      }),
      { name: "auth-store" }
    ),
    { enabled: process.env.NODE_ENV !== "production" }
  )
);
