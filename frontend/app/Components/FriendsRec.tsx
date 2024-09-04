import React, { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck, CirclePlus } from "lucide-react";
import { toast } from "sonner";
import { changeFriend, getRecommendations } from "@/actions/other";
import { useAuthStore } from "@/store";
import { sliceEmailDomain } from "./PostCard";

function FriendsRec() {
  const [friendStatus, setFriendStatus] = useState<Record<string, boolean>>({});
  const [friendList, setFriendList] = useState<any[]>([]);
  const [friendLoad, setFriendLoad] = useState<Record<string, boolean>>({});
  const authUser = useAuthStore((store) => store.user);

  async function addFriend(email: string) {
    const status = friendStatus[email];
    setFriendStatus((_fs) => ({ ..._fs, [email]: !status }));
    setFriendLoad((_fl) => ({ ..._fl, [email]: true }));

    changeFriend(authUser!.email, email)
      .then(() => {
        toast.success(`Friend ${status ? "removed" : "added"}`);
      })
      .catch((e) => {
        console.log(e);
        toast.error("Error adding friend");
      })
      .finally(() => {
        setFriendLoad((_fl) => ({ ..._fl, [email]: false }));
      });
  }

  useEffect(() => {
    if (!authUser) return;
    (async () => {
      try {
        const recc = await getRecommendations(authUser.email);
        if (!Array.isArray(recc)) throw recc.error;
        console.log(recc);

        setFriendList(recc);
      } catch (e) {
        console.error(e);
        console.error("Error getting friend recommendations");
      }
    })();
  }, [authUser]);

  return (
    <>
      <Card x-chunk="dashboard-01-chunk-5">
        <CardHeader className="p-4">
          <h2 className="font-web3 font-bold text-lg ">Friends Recc</h2>
        </CardHeader>
        <hr />
        <CardContent className="grid gap-4 mt-4">
          {friendList.map((friendRec, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/01.jpg" alt="Avatar" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none text-gray-400">
                  {sliceEmailDomain(friendRec.email)}
                </p>
              </div>
              <button
                className="ml-auto font-medium cursor-opinter"
                onClick={() => addFriend(friendRec.email)}
                disabled={friendLoad[friendRec.email]}
              >
                {friendStatus[friendRec.email] ? (
                  <CircleCheck className="text-green-300 transition delay-200" />
                ) : (
                  <CirclePlus className=" transition delay-200" />
                )}
              </button>
            </div>
          ))}
          {friendList.length === 0 ? (
            <span className="opacity-50 text-center text-sm">
              You have no recommendations
            </span>
          ) : null}
        </CardContent>
      </Card>
    </>
  );
}

export default FriendsRec;
