"use client";

import { OktoContextType, useOkto } from "okto-sdk-react";
import Stories from "../Components/Stories";
import RightBar from "../Components/RightBar";
import PostCard from "../Components/PostCard";
import FriendsRec from "../Components/FriendsRec";

import { useEffect } from "react";

export default function Home() {
  // const { getUserDetails } = useOkto() as OktoContextType;

  // useEffect(() => {
  //   getUserDetails()
  //     .then((result) => {
  //       console.log("USERR");
  //       console.log(result);
  //     })
  //     .catch((error) => {
  //       console.error(`error:`, error);
  //     });

  //   console.log("ok");
  // }, []);

  return (
    <>
      <main className="overflow-y-auto">
        <div className=" p-5 ">
          <h2 className="font-web3 font-bold text-2xl mb-4">Latest Stories</h2>
          <Stories />
          <h2 className="font-web3 font-bold text-2xl mb-4 mt-8 ">New Posts</h2>
          <div className="flex flex-col items-center justify-center">
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
        </div>
      </main>
      <div className="w-[300px] lg:w-[300px] overflow-y-auto p-5 flex-shrink-0">
        <RightBar />
        <FriendsRec />
      </div>
    </>
  );
}
