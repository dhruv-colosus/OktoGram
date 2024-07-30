"use client";
import Link from "next/link";
import {
  Cannabis,
  CirclePlus,
  CircleUser,
  Gift,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  Settings,
  ShoppingCart,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
function TopBar() {
  const pathname = usePathname();

  const getLinkClass = (href: string) => {
    const baseClass =
      "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2";
    const activeClass = "bg-muted text-primary";
    const inactiveClass = "text-muted-foreground hover:text-foreground";

    return `${baseClass} ${pathname === href ? activeClass : inactiveClass}`;
  };
  return (
    <>
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Cannabis className="h-6 w-6" />
                <span className="sr-only">OktoGram</span>
              </Link>
              <Link href="/" className={getLinkClass("/")}>
                <Home className="h-5 w-5" />
                Home
              </Link>
              <Link href="/giveaways" className={getLinkClass("/giveaways")}>
                <Gift className="h-5 w-5" />
                Giveaways
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge>
              </Link>
              <Link href="/explore" className={getLinkClass("/explore")}>
                <Package className="h-5 w-5" />
                Explore
              </Link>
              <Link href="/create" className={getLinkClass("/create")}>
                <CirclePlus className="h-5 w-5" />
                Create post
              </Link>
              <Link href="/settings" className={getLinkClass("/settings")}>
                <Settings className="h-5 w-5" />
                Settings
              </Link>
            </nav>
            <div className="mt-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Powered by OktoWallet</CardTitle>
                  <CardDescription>
                    Wallet ID : a2ieurfherifnerinurnirneuf
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button size="sm" className="w-full">
                    Disconnectx
                  </Button>
                </CardContent>
              </Card>
            </div>
          </SheetContent>
        </Sheet>
        <div className="w-full flex-1">
          <form>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search Users..."
                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              />
            </div>
          </form>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/settings">
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </>
  );
}

export default TopBar;
