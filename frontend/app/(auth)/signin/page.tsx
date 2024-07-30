"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
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
import { oauthUrl } from "@/lib/oauth";

export default function SignIn() {
  const { showWidgetModal } = useOkto() as OktoContextType;

  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign In</CardTitle>
          <CardDescription>Connect With Okto Wallet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Button type="submit" className="w-full" onClick={showWidgetModal}>
              Connect Okto Wallet
            </Button>
            <Link href={oauthUrl}>GOOGLE OAUTH</Link>
          </div>

          {/* <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/signin" className="underline">
              Sign in
            </Link>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}
