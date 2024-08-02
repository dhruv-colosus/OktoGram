"use client";

// app/(protected)/layout.js
import { useRouter } from "next/navigation";
import SideBar from "../Components/SideBar";
import TopBar from "../Components/TopBar";
import { OktoContextType, useOkto } from "okto-sdk-react";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store";
import { registerUser } from "@/actions/auth";
import axios from "axios";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { authenticate, getUserDetails } = useOkto() as OktoContextType;
  const { accessToken, logout, setUser } = useAuthStore();
  const [authToken, setAuthToken] = useState<string | null>(null);
  const router = useRouter();

  if (accessToken === null) {
    router.push("/signin");
  }

  useEffect(() => {
    if (!accessToken) return;
    console.log("authenticating...");
    authenticate(accessToken, async (result, error) => {
      if (result) {
        console.log("got auth", result);
        setAuthToken(result.auth_token);
      }
      if (error) {
        console.error("authentication error:", error);
        logout();
        router.push("/signin");
      }
    });
  }, []);

  useEffect(() => {
    if (!authToken) return;

    (async () => {
      try {
        const details = await getUserDetails();
        const wallets = await axios.post(
          "https://sandbox-api.okto.tech/api/v1/wallet",
          {},
          {
            headers: {
              "x-api-key": process.env.NEXT_PUBLIC_OKTO_CLIENT_API!,
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setUser({
          user_id: details.user_id,
          email: details.email,
          wallets: wallets.data.filter((w: any) => w.success),
        });
        registerUser(details.user_id, details.email);
      } catch (e) {
        console.log(e);
        logout();
        router.push("/signin");
      }
    })();
  }, [authToken]);

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
