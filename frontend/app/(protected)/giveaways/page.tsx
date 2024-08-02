"use client";
import GiveawayCard from "@/app/Components/Giveawaycard";
import PostCard from "@/app/Components/PostCard";

import { useEffect, useState } from "react";
import { getGiveaways, getPosts } from "@/actions/post";
function Home() {
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    const fetchposts = async () => {
      const posts = await getGiveaways({ skip: 0, take: 50 });
      console.log("gs are :", posts);
      setPosts(posts);
    };

    fetchposts();
  }, []);
  return (
    <>
      <div className=" p-5  overflow-y-auto flex-grow">
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
                  likesNeeded={post?.likesNeeded}
                  likess={post?.post._count?.Like}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
