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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store";
import { toast } from "sonner";
import { Prisma, Tip } from "@prisma/client";
import { OktoContextType, useOkto } from "okto-sdk-react";
import { getTips } from "@/actions/other";
import { getPosts } from "@/lib/contract";

// type TipWithUser = Prisma.TipGetPayload<{
//   include: { post: { include: { author: true } }; from: true };
// }>;

export default function Profile({ params }: { params: { userid: string } }) {
  const mockData = {
    posts: [
      { id: 1, url: "https://picsum.photos/300/300?random=1" },
      { id: 2, url: "https://picsum.photos/300/300?random=2" },
      { id: 3, url: "https://picsum.photos/300/300?random=3" },
      { id: 4, url: "https://picsum.photos/300/300?random=4" },
      { id: 5, url: "https://picsum.photos/300/300?random=5" },
      { id: 6, url: "https://picsum.photos/300/300?random=6" },
      { id: 7, url: "https://picsum.photos/300/300?random=7" },
    ],
    giveaways: [
      { id: 1, url: "https://picsum.photos/300/300?random=8" },
      { id: 2, url: "https://picsum.photos/300/300?random=9" },
      { id: 3, url: "https://picsum.photos/300/300?random=10" },
      { id: 4, url: "https://picsum.photos/300/300?random=11" },
      { id: 5, url: "https://picsum.photos/300/300?random=12" },
      { id: 6, url: "https://picsum.photos/300/300?random=13" },
      { id: 7, url: "https://picsum.photos/300/300?random=14" },
    ],
  };
  const { user } = useAuthStore();

  const [totalTips, setTotalTips] = useState<{ in: number; out: number }>({
    in: 0,
    out: 0,
  });

  const [posts, setPosts] = useState<any[]>([])
  const [giveaways, setGiveaways] = useState<any[]>([])

  useEffect(() => {
    getTips(decodeURIComponent(params.userid))
      .then(({ sentTips: sTips, receivedTips: rTips, error }) => {
        console.log(sTips, rTips, error, params);

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

    getPosts().then((posts) => {
      setPosts(
        (posts as any[])
          .toSorted((a, b) => Number(b.createdAt) - Number(a.createdAt))
          .filter((post) => !post.isGiveaway && post.user.name === decodeURIComponent(params.userid))
      );
      setGiveaways(
        (posts as any[])
          .toSorted((a, b) => Number(b.createdAt) - Number(a.createdAt))
          .filter((post) => post.isGiveaway && post.user.name === decodeURIComponent(params.userid))
      );
    });
  }, []);

  console.log(posts, giveaways);


  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 overflow-y-auto">
      <div className="flex flex-col sm:gap-4 sm:py-4 ">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <h1 className="text-3xl font-web3 font-bold">
            {decodeURIComponent(params.userid.slice(0, 20))} Profile
          </h1>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3">
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
          </div>
          <div className="container mx-auto p-4 mb-16">
            <h1 className="text-2xl font-bold mb-4">User Content</h1>
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="giveaways">Giveaways</TabsTrigger>
              </TabsList>
              <TabsContent value="posts">
                <div className="grid grid-cols-3 gap-4">
                  {posts.map((post, idx) =>
                    <div key={idx} className="aspect-square">
                      <img
                        src={`/api/image?id=${post.image}`}
                        alt={`Image`}
                        width={300}
                        height={300}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="giveaways">
                <div className="grid grid-cols-3 gap-4">
                  {giveaways.map((giveaway, idx) => (
                    <div key={idx} className="aspect-square">
                      <img
                        src={`/api/image?id=${giveaway.image}`}
                        alt={`Giveaway`}
                        width={300}
                        height={300}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
