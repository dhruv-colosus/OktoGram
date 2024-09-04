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
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store";
import { useEffect, useState } from "react";
import { searchUser } from "@/actions/other";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
interface SearchResult {
  email: string;
}
function TopBar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const getLinkClass = (href: string) => {
    const baseClass =
      "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2";
    const activeClass = "bg-muted text-primary";
    const inactiveClass = "text-muted-foreground hover:text-foreground";

    return `${baseClass} ${pathname === href ? activeClass : inactiveClass}`;
  };
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const delayDebounceFn = async () => {
      if (searchTerm) {
        setIsLoading(true);
        try {
          const searchResults = await searchUser(searchTerm);
          setResults(searchResults.result);
          console.log("searchResults : ", searchResults.result);
        } catch (error) {
          console.error("Search error:", error);
          setResults([]);
        } finally {
          console.log("results : ", results);
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    };

    delayDebounceFn();
  }, [searchTerm]);
  useEffect(() => {
    if (results.length > 0) {
      console.log("Updated results: ", results);
    }
  }, [results]);
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
              <Link href="/profile" className={getLinkClass("/profile")}>
                <Settings className="h-5 w-5" />
                My Profile
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
            <div className="relative w-full md:w-2/3 lg:w-1/3">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search Users..."
                className="w-full appearance-none bg-background pl-8 shadow-none"
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
              />
              {searchTerm && (
                <div className="absolute top-full left-0 w-full mt-1 bg-black  shadow-md z-50 font-web3 text-sm">
                  <div className="p-2">
                    {isLoading ? (
                      <div className="text-center text-white">Searching...</div>
                    ) : (results || []).length > 0 ? (
                      results.map((result, index) => (
                        <div
                          key={index}
                          className="p-2 cursor-pointer hover:text-primary transition-colors"
                          // onClick={() => console.log("Selected:", result)}
                        >
                          {result}
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-500">
                        No results found.
                      </div>
                    )}
                  </div>
                </div>
              )}
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
            <DropdownMenuLabel>{user?.email} </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/profile">
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                logout();
                router.push("/signin");
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </>
  );
}

export default TopBar;
