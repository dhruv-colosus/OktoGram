"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { BuildType, OktoProvider } from "okto-sdk-react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { clientId } from "@/lib/oauth";

const oktoBuildType =
  process.env.NODE_ENV === "production" ? BuildType.SANDBOX : BuildType.SANDBOX;

export default function RootProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <OktoProvider
        apiKey={process.env.NEXT_PUBLIC_OKTO_CLIENT_API!}
        buildType={oktoBuildType}
      >
        <GoogleOAuthProvider clientId={clientId}>
          {children}
        </GoogleOAuthProvider>
      </OktoProvider>
    </ThemeProvider>
  );
}
