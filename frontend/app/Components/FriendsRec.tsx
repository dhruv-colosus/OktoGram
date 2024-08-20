import React, { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck, CirclePlus } from "lucide-react";
import { toast } from "sonner";

function FriendsRec() {
  const [isFriend, setIsFriend] = useState(false);
  async function addFriend() {
    setIsFriend(!isFriend);
    console.log("Friend Added");
    if (!isFriend) {
      toast.success("Friend Added");
    } else {
      toast.error("Friend Removed");
    }
  }
  return (
    <>
      <Card x-chunk="dashboard-01-chunk-5">
        <CardHeader className="p-4">
          <h2 className="font-web3 font-bold text-lg ">Friends Recc</h2>
        </CardHeader>
        <hr />
        <CardContent className="grid gap-4 mt-4">
          <div className="flex items-center gap-4">
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage src="/avatars/01.jpg" alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none text-gray-400">
                Ujjwal Dimri
              </p>
            </div>
            <button
              className="ml-auto font-medium cursor-opinter"
              onClick={addFriend}
            >
              {isFriend ? (
                <CircleCheck className="text-green-300 transition delay-200" />
              ) : (
                <CirclePlus className=" transition delay-200" />
              )}
            </button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default FriendsRec;
