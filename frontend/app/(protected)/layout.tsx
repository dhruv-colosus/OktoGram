"use client";

// app/(protected)/layout.js
import { useRouter } from "next/navigation";
import SideBar from "../Components/SideBar";
import TopBar from "../Components/TopBar";
import { OktoContextType, useOkto } from "okto-sdk-react";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store";
import { toast } from "sonner";
import { sleep } from "@/lib/contract";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { authenticate, getUserDetails, getSupportedTokens, getWallets } =
    useOkto() as OktoContextType;
  const {
    _hasHydrated,
    accessToken,
    logout,
    setUser,
    authToken,
    setAuthToken,
    user,
  } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!_hasHydrated) return;
    
    if (accessToken === null) {
      router.push("/signin");
    }
  }, [accessToken, router, _hasHydrated]);

  useEffect(() => {
    if (authToken || !accessToken || loading) return;

    console.log("authenticating...", accessToken, authToken, loading);
    setLoading(true);
    authenticate(accessToken, async (result, error) => {
      if (result) {
        console.log("got auth", result);
        setAuthToken(result.auth_token);
        setLoading(false);
      }
      if (error) {
        console.error("authentication error:", error);
        toast.error("Error getting auth token from Okto");
        logout();
        router.push("/signin");
      }
    });
  }, [
    accessToken,
    authenticate,
    logout,
    router,
    loading,
    setAuthToken,
    authToken,
  ]);

  useEffect(() => {
    if (!authToken || loading) return;

    setLoading(true);
    (async () => {
      try {
        console.log("getting details");

        const details = await getUserDetails();
        const wallets = await getWallets();
        const tokens = await getSupportedTokens();

        console.log(wallets);

        setUser({
          user_id: details.user_id,
          email: details.email,
          wallets: wallets.wallets,
          tokens: tokens.tokens,
        });
      } catch (e) {
        console.log(e);
      }
    })();
  }, [
    authToken,
    getSupportedTokens,
    getUserDetails,
    getWallets,
    setUser,
    user,
    loading,
  ]);

  return (
    <div className="flex h-screen w-full">
      <SideBar />
      <div className="flex flex-col flex-grow overflow-hidden">
        <TopBar />
        <div className="flex flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
