"use client";

// app/(protected)/layout.js
import { useRouter } from "next/navigation";
import SideBar from "../Components/SideBar";
import TopBar from "../Components/TopBar";
import { OktoContextType, useOkto } from "okto-sdk-react";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store";
import { registerUser } from "@/actions/auth";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { authenticate, getUserDetails } = useOkto() as OktoContextType;
  const { accessToken, logout, setUser } = useAuthStore();
  const [authDone, setAuthDone] = useState(false);
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
        setAuthDone(true);
      }
      if (error) {
        console.error("authentication error:", error);
        logout();
        router.push("/signin");
      }
    });
  }, []);

  useEffect(() => {
    if (!authDone) return;

    (async () => {
      try {
        const details = await getUserDetails();
        console.log(details);
        setUser({ user_id: details.user_id, email: details.email });
        registerUser(details.user_id, details.email);
      } catch (e) {
        console.log(e);
        logout();
        router.push("/signin");
      }
    })();
  }, [authDone]);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideBar />
      <div className="flex flex-col">
        <TopBar />
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
    </div>
  );
}
