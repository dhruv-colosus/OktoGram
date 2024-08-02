"use client";

import { OktoContextType, useOkto } from "okto-sdk-react";
import Stories from "../Components/Stories";
import RightBar from "../Components/RightBar";
import PostCard from "../Components/PostCard";
import FriendsRec from "../Components/FriendsRec";

import { useEffect, useState } from "react";
import { getPosts } from "@/actions/post";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    const fetchposts = async () => {
      const posts = await getPosts({ skip: 0, take: 50 });
      console.log("posts are :", posts);
      setPosts(posts);
    };

    fetchposts();
  }, []);

  return (
    <>
      <main className="overflow-y-auto">
        <div className=" p-5 ">
          <h2 className="font-web3 font-bold text-2xl mb-4">Latest Stories</h2>
          <Stories />
          <h2 className="font-web3 font-bold text-2xl mb-4 mt-8 ">New Posts</h2>
          <div className="flex flex-col items-center justify-center">
            {posts?.map((post) => {
              return (
                <>
                  <PostCard
                    postId={post?.id}
                    caption={post?.content}
                    image={post?.Image[0]}
                    user={post?.author.email}
                    createdAt={post?.createdAt}
                    likes={post?._count?.Like}
                  />
                </>
              );
            })}
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
