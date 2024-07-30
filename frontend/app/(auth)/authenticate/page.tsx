"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OktoContextType, useOkto } from "okto-sdk-react";
import axios from "axios";
import {
  clientId,
  clientSecret,
  oauthUrl,
  redirectUri,
  scope,
} from "@/lib/oauth";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Callback({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { authenticate } = useOkto() as OktoContextType;
  const router = useRouter();

  console.log(searchParams);

  if (!searchParams.id_token) {
    console.log("no id token auth");
    router.replace("/signin");
  }

  useEffect(() => {
    try {
      authenticate(searchParams.id_token, (result, error) => {
        if (result) {
          console.log("authentication successful", result);
        }
        if (error) {
          console.error("authentication error:", error);
        }
      });
    } catch (error) {
      console.log("Something went wrong. Please try again");
      router.replace("/signin");
    }
    router.replace("/");
  }, []);

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      Logging you in...
    </div>
  );
}
