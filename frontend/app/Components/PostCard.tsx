import React, { useState } from "react";

import {
  Bookmark,
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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
function PostCard() {
  const [isLiked, setIsLiked] = useState(false);
  const handleHeartClick = () => {
    setIsLiked(!isLiked);
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
                  <span className="font-web3 text-xl">Dhruv Deora</span>
                  <p className="text-xs text-gray-400">Posted 3 mins ago</p>
                </div>
              </CardTitle>
            </div>
            <div className="ml-auto flex items-center gap-1">
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
              src="images/stories/1.jpg"
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
              <p className="text-xs mt-3 font-web3">
                {" "}
                We are hiring for a new position. Click the link in the bio to
                know more.
              </p>
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
