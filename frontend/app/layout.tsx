import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { OktoProvider, BuildType } from "okto-sdk-react";
import { cn } from "@/lib/utils";
import RootProviders from "./Components/root-providers";
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "OktoGram",
  description:
    "OktoGram : Your Next Gen Social Media Platform powered by Okto Wallet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <RootProviders>
          {children}
          <Toaster richColors />
        </RootProviders>
      </body>
    </html>
  );
}
