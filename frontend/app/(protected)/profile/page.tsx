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

export default function Profile() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <h1 className="text-3xl font-web3 font-bold">Your Profile</h1>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3">
              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>Your Total Balance</CardDescription>
                  <CardTitle className="text-4xl">$10,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Powered by Okto
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={100} aria-label="100% increase" />
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription> Total Amount Tipped</CardDescription>
                  <CardTitle className="text-4xl">$1,329</CardTitle>
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
                  <CardTitle className="text-4xl">$5,329</CardTitle>
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
            <Tabs defaultValue="week" className="h-[50vh] flex flex-col">
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
                            <TableRow className="bg-accent">
                              <TableCell>10-03-2024</TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <div className="font-medium">
                                  10c3edfnu43df43nf34iofn3
                                </div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                Dhruv Deora
                              </TableCell>
                              <TableCell className="text-right">
                                $250.00
                              </TableCell>
                            </TableRow>
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
                            <TableRow className="bg-accent">
                              <TableCell>10-03-2024</TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <div className="font-medium">
                                  10c3edfnu43df43nf34iofn3
                                </div>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                Dhruv Deora
                              </TableCell>
                              <TableCell className="text-right">
                                $250.00
                              </TableCell>
                            </TableRow>
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
      </div>
    </div>
  );
}
