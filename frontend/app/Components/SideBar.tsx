"use client";

import Link from "next/link";
import {
  Bell,
  Cannabis,
  CirclePlus,
  Gift,
  Home,
  LineChart,
  Package,
  Settings,
  ShoppingCart,
  UserRound,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { OktoContextType, useOkto } from "okto-sdk-react";

function SideBar() {
  const pathname = usePathname();
  const { showWidgetModal } = useOkto() as OktoContextType;

  const getLinkClass = (href: string) => {
    const baseClass =
      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all";
    const activeClass = "bg-muted text-primary";
    const inactiveClass = "text-muted-foreground hover:text-primary";

    return `${baseClass} ${pathname === href ? activeClass : inactiveClass}`;
  };

  return (
    <>
      <div className="hidden border-r bg-muted/40 md:block h-screen   ">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Cannabis className="h-6 w-6" />
              <span className="font-web3 text-l">OktoGram</span>
            </Link>
            {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button> */}
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link href="/" className={getLinkClass("/")}>
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link href="/explore" className={getLinkClass("/explore")}>
                <Package className="h-4 w-4" />
                Explore
              </Link>
              <Link href="/giveaways" className={getLinkClass("/giveaways")}>
                <Gift className="h-4 w-4" />
                Giveaways
                {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge> */}
              </Link>
              {/* <Link href="/wallet" className={getLinkClass("/wallet")}>
                <Settings className="h-4 w-4" />
                Wallet
              </Link> */}
              <Link href="/profile" className={getLinkClass("/profile")}>
                <UserRound className="h-4 w-4" />
                Profile
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Powered by OktoWallet</CardTitle>
                {/* <CardDescription>
                  Wallet ID : a2ieurfherifnerinurnirneuf
                </CardDescription> */}
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => showWidgetModal()}
                >
                  Show Wallet
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
