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
