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
  image: ImageObject | null;
  user: string;
  createdAt: Date;
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
function PostCard({ caption, image, user, createdAt }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const handleHeartClick = () => {
    setIsLiked(!isLiked);
  };

  function getMinutesAgo(createdAt: Date): number {
    const now = new Date();
    const differenceInMilliseconds = now.getTime() - createdAt.getTime();
    const differenceInMinutes = Math.floor(
      differenceInMilliseconds / (1000 * 60)
    );
    return differenceInMinutes;
  }
  const [loading, setLoading] = useState(false);
  const awardfunc = async () => {
    setLoading(true);
    setTimeout(() => {
      console.log("hello");
    }, 1000);
    setLoading(false);
  };
  return (
    <>
      <div className="mb-4 w-1/2 overflow-y-auto ">
        <Card className="overflow-y-scroll " x-chunk="dashboard-05-chunk-4">
          <CardHeader className="flex flex-row items-start bg-muted/50 p-4">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 ">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <span className="font-web3 text-xl">{user}</span>
                  <p className="text-xs text-gray-400">
                    Posted {getMinutesAgo(createdAt)} mins ago
                  </p>
                </div>
              </CardTitle>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <Dialog>
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
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Network" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Solana">Solana</SelectItem>
                          <SelectItem value="Polygon">Polygon</SelectItem>
                          <SelectItem value="Ethereum">Ethereum</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Token
                      </Label>
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Token" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Solana">SOL</SelectItem>
                          <SelectItem value="Polygon">ETH</SelectItem>
                          <SelectItem value="Ethereum">MATIC</SelectItem>
                          <SelectItem value="Ethereum">USDC</SelectItem>
                          <SelectItem value="Ethereum">USDT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Amount in USD
                      </Label>
                      <Input
                        id="username"
                        defaultValue="$0"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={awardfunc}>
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
              src={image?.content}
              className="w-full h-auto max-h-[500px] object-cover"
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
                <MessageCircle strokeWidth={1} className="cursor-pointer" />
                <Share2 strokeWidth={1} className="cursor-pointer" />
              </div>
              <p className="text-xs mt-3 font-web3"> {caption}</p>
            </div>
            <Bookmark strokeWidth={1} className="cursor-pointer " />
          </CardFooter>
          <div className="flex bg-muted/50 px-6 pb-3 text-xs font-web3 text-gray-400 justify-between">
            <p>25 Likes</p>
            <p>2 Comments</p>
          </div>
        </Card>
      </div>
    </>
  );
}

export default PostCard;
