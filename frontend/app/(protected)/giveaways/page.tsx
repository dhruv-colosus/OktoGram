"use client";
import GiveawayCard from "@/app/Components/Giveawaycard";
import PostCard from "@/app/Components/PostCard";
import { Skeleton } from "@/components/ui/skeleton";
import { getPosts } from "@/lib/contract";

import { useEffect, useState } from "react";

function Home() {
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    getPosts().then((posts) => {
      console.log(
        (posts as any[])
          .toSorted((a, b) => Number(a.createdAt) - Number(b.createdAt))
          .filter((post) => !post.isGiveaway)
      );
      setPosts(
        (posts as any[])
          .toSorted((a, b) => Number(b.createdAt) - Number(a.createdAt))
          .filter((post) => !post.isGiveaway)
      );
    });
  }, []);

  return (
    <>
      <div className=" p-5  overflow-y-auto flex-grow">
        <h2 className="font-web3 font-bold text-4xl mb-8  ">New Giveaways</h2>
        <div className="flex flex-col items-center justify-center">
          {posts?.map((post) => {
            console.log("user", post.user);
            return (
              <GiveawayCard
                key={post.id.toString()}
                postId={post.id.toString()}
                caption={post.content}
                image={post.image}
                user={post.user.name}
                createdAt={post.createdAt.toString()}
                likesNeeded={post.likesNeeded}
                likes={post.likes}
              />
            );
          })}
          {posts.length === 0 && (
            <>
              <Skeleton className="h-[525px] w-[400px] mb-3 " />
              <Skeleton className="h-[525px] w-[400px] mb-3" />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
