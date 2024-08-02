"use client";
import GiveawayCard from "@/app/Components/Giveawaycard";
import PostCard from "@/app/Components/PostCard";
import { OktoContextType, useOkto } from "okto-sdk-react";

import { useEffect, useState } from "react";
import { getGiveaways, getPosts } from "@/actions/post";
import { GiveawayPost } from "@prisma/client";
function Home() {
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    const fetchposts = async () => {
      const posts = await getGiveaways({ skip: 0, take: 50 });
      // console.log("posts are :", posts);
      setPosts(posts);
    };

    fetchposts();
  }, []);
  return (
    <>
      <main className="overflow-y-auto">
        <div className=" p-5 ">
          <h2 className="font-web3 font-bold text-4xl mb-8  ">New Giveaways</h2>
          <div className="flex flex-col items-center justify-center">
            {posts?.map((post) => {
              return (
                <>
                  <GiveawayCard
                    caption={post?.post?.content}
                    image={post?.post?.Image[0]}
                    user={post?.post?.author.email}
                    createdAt={post?.post?.createdAt}
                  />
                </>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
