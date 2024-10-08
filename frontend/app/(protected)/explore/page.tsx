"use client";

import Stories from "../../Components/Stories";
import RightBar from "../../Components/RightBar";
import PostCard from "../../Components/PostCard";
import FriendsRec from "../../Components/FriendsRec";

import { useEffect, useState } from "react";
import { getPosts } from "@/lib/contract";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    getPosts().then((posts) => {
      console.log(posts);
      setPosts(
        (posts as any[])
          .toSorted((a, b) => Number(b.createdAt) - Number(a.createdAt))
          .filter((post) => !post.isGiveaway)
      );
    });
  }, []);

  return (
    <>
      <main className="overflow-y-auto flex-1">
        <div className=" p-5 ">
          <h2 className="font-web3 font-bold text-2xl mb-4 ">
            Latest Global Posts
          </h2>
          <div className="flex flex-col items-center justify-center">
            {posts?.map((post) => {
              return (
                <PostCard
                  key={post.id.toString()}
                  postId={post.id.toString()}
                  caption={post.content}
                  image={post.image}
                  user={post.user}
                  createdAt={post.createdAt.toString()}
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
      </main>
      <div className="w-[300px] lg:w-[300px] overflow-y-auto p-5 flex-shrink-0 ">
        <RightBar />
        <FriendsRec />
      </div>
    </>
  );
}
