"use client";

import Link from "next/link";
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  ShoppingCart,
  Users2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store";
import { toast } from "sonner";
import { Prisma, Tip } from "@prisma/client";
import { OktoContextType, useOkto } from "okto-sdk-react";
import { changeFriend, getFriends, getTips } from "@/actions/other";
import { sliceEmailDomain } from "@/app/Components/PostCard";

export default function Profile() {
  const { user, _hasHydrated } = useAuthStore();
  console.log("user", user);
  const [sentTips, setSentTips] = useState<any[]>([]);
  const [tokens, setTokens] = useState<any>([]);
  const [receivedTips, setReceivedTips] = useState<any[]>([]);
  const [friends, setFriends] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalTips, setTotalTips] = useState<{ in: number; out: number }>({
    in: 0,
    out: 0,
  });
  const [totalBal, setTotalBal] = useState(0);
  const { getPortfolio } = useOkto() as OktoContextType;

  useEffect(() => {
    if (!_hasHydrated) return;
    getTips(user?.email || "-")
      .then(({ sentTips: sTips, receivedTips: rTips, error }) => {
        setSentTips(sTips);
        setReceivedTips(rTips);

        const totalIn = rTips
          .map((tip) => Number(tip.amount))
          .reduce((a, b) => a + b, 0);
        const totalOut = sTips
          .map((tip) => Number(tip.amount))
          .reduce((a, b) => a + b, 0);
        setTotalTips({ in: totalIn * 0.49, out: totalOut * 0.49 });
      })
      .catch(() => {
        toast.error("Insufficient Funds in Wallet");
      });

    getPortfolio()
      .then((data) => {
        console.log("tokens", data.tokens);
        setTokens(data.tokens);
        let bal = data.tokens.reduce(
          (prev, curr) => prev + Number(curr.quantity),
          0
        );
        setTotalBal(bal * 0.5338);
      })
      .catch((e) => {
        // toast.error("Failed to get portfolio");
      });
  }, [user, getPortfolio, _hasHydrated]);

  useEffect(() => {
    async function fetchFriends() {
      const friends = await getFriends(user!.email);
      if (Array.isArray(friends)) {
        setFriends(friends);
      }
      console.log("friends", friends);
    }
    if (user) {
      fetchFriends();
    }
  }, [user]);

  const handleFollowChange = async (friend: string) => {
    setLoading(true);
    const status = await changeFriend(user!.email, friend);
    setLoading(false);

    if (status) {
      setFriends((prev) => prev.filter((f) => f !== friend));
      toast.success("Friend Removed");
    }
    console.log(friend);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 overflow-y-scroll">
      <div className="flex flex-col sm:gap-4 sm:py-4 overflow-y-scroll ">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="flex justify-between w-full">
            <h1 className="text-3xl font-web3 font-bold">Your Profile</h1>
            <Button>
              <Link href={`/user/${user?.user_id}`}> Public Profile</Link>
            </Button>
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3">
              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>Your Total Balance</CardDescription>
                  <CardTitle className="text-4xl">
                    ${totalBal.toFixed(4)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Powered by Okto
                  </div>
                </CardContent>
                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Full Portfolio</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>My Tokens</DialogTitle>
                        <DialogDescription>
                          These are your available tokens in your wallet on the
                          specified blockchains
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        {tokens.map((token: any) => (
                          <div
                            key={token.id}
                            className="flex items-center justify-between px-4 py-2"
                          >
                            <div className="flex items-center gap-4">
                              <div>
                                <div className="font-medium">
                                  {token.network_name}
                                </div>
                              </div>
                            </div>
                            <div className="text-right text-primary">
                              {Number(token.quantity).toFixed(4)}
                              {" " + token.token_name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription> Total Amount Tipped</CardDescription>
                  <CardTitle className="text-4xl">${totalTips.out}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Last transaction was 4$
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={30} aria-label="30% increase" />
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>Total Tip Earned</CardDescription>
                  <CardTitle className="text-4xl">${totalTips.in}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Last transaction was 10$
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={70} aria-label="70% increase" />
                </CardFooter>
              </Card>
            </div>
            <Tabs defaultValue="tipped" className="h-[50vh] flex flex-col">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="tipped">Tipped</TabsTrigger>
                  <TabsTrigger value="recieved">Recieved</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="tipped" className="flex-grow overflow-hidden">
                <Card
                  x-chunk="dashboard-05-chunk-3"
                  className="h-full flex flex-col"
                >
                  <CardHeader className="px-7">
                    <CardTitle>Rewards History</CardTitle>
                    <CardDescription>
                      Recent rewards given to your followers !!
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow overflow-auto">
                    <div className="w-full inline-block align-middle">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead className="hidden sm:table-cell">
                                Transaction ID
                              </TableHead>
                              <TableHead className="">Reciever</TableHead>
                              <TableHead className="text-right">
                                Amount
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {sentTips.map((tip) => (
                              <TableRow key={tip.id} className="bg-accent">
                                <TableCell>
                                  {tip.createdAt.toUTCString()}
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                  <div className="font-medium">{tip.id}</div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                  {sliceEmailDomain(tip.destEmail)}
                                </TableCell>
                                <TableCell className="text-right">
                                  ${Number(tip.amount) * 0.49}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent
                value="recieved"
                className="flex-grow overflow-hidden"
              >
                <Card
                  x-chunk="dashboard-05-chunk-3"
                  className="h-full flex flex-col"
                >
                  <CardHeader className="px-7">
                    <CardTitle>Rewards History</CardTitle>
                    <CardDescription>
                      Recent rewards earned by you !!
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow overflow-auto">
                    <div className="w-full inline-block align-middle">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead className="hidden sm:table-cell">
                                Transaction ID
                              </TableHead>
                              <TableHead className="">From</TableHead>
                              <TableHead className="text-right">
                                Amount
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {receivedTips.map((tip) => (
                              <TableRow key={tip.id} className="bg-accent">
                                <TableCell>
                                  {tip.createdAt.toUTCString()}
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                  <div className="font-medium">{tip.id}</div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                  {sliceEmailDomain(tip.userEmail)}
                                </TableCell>
                                <TableCell className="text-right">
                                  ${Number(tip.amount) * 0.49}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <div className="mb-16 p-4 sm:px-6 sm:py-0 h-[50vh]">
          <Card
            x-chunk="dashboard-05-chunk-3"
            className="flex flex-col w-full h-full"
          >
            <CardHeader className="px-7">
              <CardTitle>Friend List</CardTitle>
              <CardDescription>Your Friend List</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow overflow-auto">
              <div className="w-full inline-block align-middle">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>UserName</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="max-h-64 overflow-y-auto">
                      {friends.map((friend, index) => (
                        <TableRow key={index} className="bg-accent">
                          <TableCell>{friend}</TableCell>
                          <TableCell className="text-right">
                            <Button onClick={() => handleFollowChange(friend)}>
                              {loading ? "Loading" : "Unfollow"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
