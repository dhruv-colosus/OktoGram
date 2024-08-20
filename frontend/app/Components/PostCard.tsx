import React, { useState } from "react";

import {
  Bookmark,
  Gem,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface ImageObject {
  content: string;
  id: string;
  postId: string;
}

interface PostCardProps {
  caption: string;
  image: string;
  user: string;
  createdAt: string;
  postId: string;
  likes: number;
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getPostTipNetworks, storeTip } from "@/actions/post";
import { useAuthStore } from "@/store";
import { OktoContextType, Token, Wallet, useOkto } from "okto-sdk-react";
import { toast } from "sonner";

const toNetworkName = (capsName: string) => {
  return capsName
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function PostCard({
  postId,
  caption,
  image,
  user,
  createdAt,
  likes,
}: PostCardProps) {
  const router = useRouter();

  const [isLiked, setIsLiked] = useState(false);
  const [isBookMark, setisBookMark] = useState(false);
  const handleHeartClick = () => {
    setIsLiked(!isLiked);
  };

  const handleBookMarkClick = () => {
    setisBookMark(!isBookMark);
  };
  const [tipNetworks, setTipNetworks] = useState<Wallet[] | null>(null);
  const [availTokens, setAvailTokens] = useState<Token[]>([]);
  const { user: authUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const { transferTokens } = useOkto() as OktoContextType;

  const [networkVal, setNetworkVal] = useState("");
  const [tokenVal, setTokenVal] = useState<string>("0x");
  const [amountVal, setAmountVal] = useState<number>(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  function getMinutesAgo(createdAt: string): number {
    const now = new Date();
    const differenceInMilliseconds = (10900000 - parseInt(createdAt)) * 2000; // TODO current block global state
    const differenceInMinutes = Math.floor(
      differenceInMilliseconds / (1000 * 60)
    );
    return differenceInMinutes;
  }

  const awardfunc = async () => {
    console.log(amountVal, networkVal, tokenVal);

    setLoading(true);
    transferTokens({
      network_name: networkVal,
      token_address: tokenVal === "NATIVE" ? "" : tokenVal,
      recipient_address:
        tipNetworks?.find((w) => w.network_name === networkVal)?.address || "",
      quantity: amountVal.toString(),
    })
      .then(async (result) => {
        toast.success("Transfer successful");
        console.log("Transfer success", result);
        setDialogOpen(false);
        await storeTip({
          userId: authUser!.user_id,
          postId,
          network: networkVal,
          token: tokenVal,
          amount: amountVal.toString(),
          orderId: result.orderId,
        });
        console.log("stored tip");
      })
      .catch((error) => {
        toast.error("Transfer error");
        console.log("Transfer error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (open && !tipNetworks) {
      setTipNetworks([]);
      getPostTipNetworks(
        postId,
        authUser?.wallets.map((wallet) => wallet.network_name) || []
      ).then((postNetworks) => {
        setTipNetworks(postNetworks);
        console.log(postNetworks);
      });
    }
  };

  const networkValChange = (newNetwork: string) => {
    setNetworkVal(newNetwork);
    setAvailTokens(
      authUser?.tokens.filter((tok) => tok.network_name === newNetwork) || []
    );
  };

  return (
    <>
      <div className="mb-4 w-1/2 overflow-y-auto ">
        <Card className="overflow-y-scroll " x-chunk="dashboard-05-chunk-4">
          <CardHeader className="flex flex-row items-start bg-muted/50 p-4">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 ">
                <Avatar
                  className=" cursor-pointer"
                  onClick={() => {
                    router.push(`/user/${user}`);
                  }}
                >
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <span
                    className="font-web3 text-xl cursor-pointer"
                    onClick={() => {
                      router.push(`/user/${user}`);
                    }}
                  >
                    {user.slice(0, 20)}
                  </span>
                  <p className="text-xs text-gray-400">
                    Posted {getMinutesAgo(createdAt)} mins ago
                  </p>
                </div>
              </CardTitle>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <Dialog open={dialogOpen} onOpenChange={onOpenChange}>
                <DialogTrigger asChild>
                  <Gem className="cursor-pointer mr-4 hover:text-red-400 transition delay-75" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                  <DialogHeader>
                    <DialogTitle>Award User</DialogTitle>
                    <DialogDescription>
                      Send Tokens as a reward to the user if you super like the
                      content
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Network
                      </Label>
                      <Select
                        value={networkVal}
                        onValueChange={networkValChange}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Network" />
                        </SelectTrigger>
                        <SelectContent>
                          {(tipNetworks ?? []).map((tipNetwork, idx) => (
                            <SelectItem
                              key={idx}
                              value={tipNetwork.network_name}
                            >
                              {toNetworkName(tipNetwork.network_name)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Token
                      </Label>
                      <Select
                        value={tokenVal}
                        onValueChange={(newVal) => setTokenVal(newVal)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Token" />
                        </SelectTrigger>
                        <SelectContent>
                          {availTokens.map((availToken, idx) => (
                            <SelectItem
                              key={idx}
                              value={availToken.token_address || "NATIVE"}
                            >
                              {availToken.token_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Amount
                      </Label>
                      <Input
                        id="username"
                        type="number"
                        defaultValue="$0"
                        value={amountVal}
                        onChange={(e) => setAmountVal(Number(e.target.value))}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      onClick={awardfunc}
                      disabled={loading}
                    >
                      Award
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Share</DropdownMenuItem>
                  <DropdownMenuItem>Report</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Save</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent className="text-sm p-0 flex items-center justify-center max-h-[500px]">
            <img
              src={image}
              className="w-full h-auto max-h-[500px] object-cover"
              alt="post image"
            />
          </CardContent>
          <CardFooter className="flex flex-row items-start border-t bg-muted/50 px-6 py-3 justify-between">
            <div>
              <div className="flex flex-row gap-4">
                <Heart
                  fill={isLiked ? "currentColor" : "none"}
                  strokeWidth={1}
                  className={`${
                    isLiked ? "text-rose-500" : ""
                  } cursor-pointer `}
                  onClick={handleHeartClick}
                />

                <Share2 strokeWidth={1} className="cursor-pointer" />
              </div>
              <p className="text-xs mt-3 font-web3"> {caption}</p>
            </div>
            <Bookmark
              fill={isBookMark ? "currentColor" : "none"}
              strokeWidth={1}
              className={`${isBookMark ? "text-white" : ""} cursor-pointer `}
              onClick={handleBookMarkClick}
            />
          </CardFooter>
          <div className="flex bg-muted/50 px-6 pb-3 text-xs font-web3 text-gray-400 justify-between">
            <p>{likes} Likes</p>
          </div>
        </Card>
      </div>
    </>
  );
}

export default PostCard;
