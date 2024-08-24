import React, { useEffect, useState } from "react";

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

import { Progress } from "@/components/ui/progress";

interface PostCardProps {
  postId: string;
  caption: string;
  image: string;
  user: string;
  createdAt: string;
  likesNeeded: number;
  likes: number;
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getBlockNumber } from "@/lib/contract";
function GiveawayCard({
  caption,
  image,
  user,
  createdAt,
  likesNeeded,
  likes: originalLikes,
}: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(originalLikes);
  console.log("likes needed :", likesNeeded);
  const [progress, setProgress] = useState(() => {
    const likesNum = Number(likes);
    const likesNeededNum = Number(likesNeeded);
    return (likesNum / likesNeededNum) * 100;
  });
  const handleHeartClick = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);

    const likesNeededNum = Number(likesNeeded);

    setLikes((prevLikes) => {
      const prevLikesNum = Number(prevLikes);
      const newLikes = !isLiked
        ? Math.min(prevLikesNum + 1, likesNeededNum)
        : Math.max(prevLikesNum - 1, 0);

      setProgress((newLikes / likesNeededNum) * 100);
      return newLikes;
    });
  };

  function getMinutesAgo(blockTime: number, createdAt: string): number {
    const now = new Date();
    const differenceInMilliseconds = (blockTime - parseInt(createdAt)) * 2000; // TODO current block global state
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

  const [blockTime, setBlockTime] = useState(Infinity);

  useEffect(() => {
    getBlockNumber().then((num) => {
      setBlockTime(Number(num));
    });
  }, []);
  return (
    <>
      <div className="mb-4  ">
        <Card className=" " x-chunk="dashboard-05-chunk-4">
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
                    Posted {getMinutesAgo(blockTime, createdAt)} mins ago
                  </p>
                </div>
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="text-sm p-0 flex items-center justify-center max-h-[500px]">
            <img
              src={`/api/image?id=${image}`}
              className="w-full h-auto max-h-[500px] object-cover"
              alt="giveaway image"
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
            <Bookmark strokeWidth={1} className="cursor-pointer " />
          </CardFooter>
          <div className="flex bg-muted/50 px-6 pb-3 text-xs font-web3 text-gray-400 justify-between">
            <p>{likes} Likes</p>
          </div>
          <div className="flex bg-muted/50 px-6 pb-3 text-xs font-web3 text-gray-400 justify-between items-center">
            <h3>Likes Counter</h3>
            <Progress value={progress} className="mb-4 mt-2 mr-2" />
            <h3>
              {likes}/{likesNeeded}
            </h3>
          </div>
        </Card>
      </div>
    </>
  );
}

export default GiveawayCard;
