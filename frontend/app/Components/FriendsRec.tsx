import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
function FriendsRec() {
  return (
    <>
      <Card x-chunk="dashboard-01-chunk-5">
        <CardHeader className="p-4">
          <h2 className="font-web3 font-bold text-lg ">Friends Recc</h2>
        </CardHeader>
        <hr />
        <CardContent className="grid gap-8 mt-4">
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
            <button className="ml-auto font-medium cursor-opinter">+</button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default FriendsRec;
