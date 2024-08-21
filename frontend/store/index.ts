import { Token } from "okto-sdk-react";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface IWallet {
  address: string;
  network_name: string;
}

interface IUser {
  user_id: string;
  email: string;
  wallets: IWallet[];
  tokens: Token[];
}

interface IStore {
  accessToken: string | null;
  authToken: string | null;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  setAccessToken: (tok: string) => void;
  setAuthToken: (tok: string | null) => void;
  isLoggedIn: () => boolean;
  logout: () => void;

  _hasHydrated: boolean;
}

export const useAuthStore = create<IStore>()(
  devtools(
    persist(
      (set, get) => ({
        accessToken: null,
        authToken: null,
        user: null,
        _hasHydrated: false,
        setAccessToken(tok) {
          set({ accessToken: tok });
        },
        setAuthToken(tok) {
          set({ authToken: tok });
        },
        setUser(user) {
          set({ user });
        },
        isLoggedIn() {
          return get().accessToken !== null;
        },
        logout() {
          set({ accessToken: null, user: null });
        },
      }),
      {
        name: "auth-store",
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(
              ([key]) => !["authToken", "_hasHydrated"].includes(key)
            )
          ),
        onRehydrateStorage: () => (state) => {
          if (state) {
            state._hasHydrated = true;
          }
        },
      }
    ),
    { enabled: process.env.NODE_ENV !== "production" }
  )
);
