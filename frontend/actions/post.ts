"use server";

import prisma from "@/lib/prisma";
import { instance } from "./instance";
import { Wallet } from "okto-sdk-react";

export const getPosts = async ({
  skip = 0,
  take = 50,
}: {
  skip?: number;
  take?: number;
}) => {
  const posts = await prisma.post.findMany({
    skip,
    take,
    include: {
      Image: {
        take: 1,
      },
      author: {
        select: {
          id: true,
          email: true,
        },
      },
      GiveawayPost: undefined,
      // _count: {
      //   select: { Like: true },
      // },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return posts;
};

export const getGiveaways = async ({
  skip = 0,
  take = 50,
}: {
  skip?: number;
  take?: number;
}) => {
  const posts = await prisma.giveawayPost.findMany({
    skip,
    take,
    include: {
      post: {
        include: {
          Image: {
            take: 1,
          },
          author: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      },
    },
    orderBy: {
      post: { createdAt: "desc" },
    },
  });

  return posts;
};

export const createPost = async (
  content: string,
  userId: string,
  encodedImages: string[]
) => {
  console.log("new post");
  const post = await prisma.post.create({
    data: {
      content,
      authorId: userId,
      Image: {
        createMany: {
          data: encodedImages.map((encodedImg) => ({ content: encodedImg })),
        },
      },
    },
  });

  return post.id;
};

export const createGiveaway = async (
  content: string,
  userId: string,
  encodedImages: string[],
  likesNeeded: number
) => {
  console.log("new giveaway");

  const seedBytes = new Uint8Array(32);
  crypto.getRandomValues(seedBytes);

  const seedHashBuffer = await crypto.subtle.digest("sha-256", seedBytes);
  const seedHashArray = Array.from(new Uint8Array(seedHashBuffer));
  const seedHash = seedHashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  const post = await prisma.giveawayPost.create({
    data: {
      post: {
        create: {
          content,
          authorId: userId,
          Image: {
            createMany: {
              data: encodedImages.map((encodedImg) => ({
                content: encodedImg,
              })),
            },
          },
        },
      },
      likesNeeded,
      seedHash,
      seed: Buffer.from(seedBytes),
    },
  });

  return post.postId;
};

export const doPostInteraction = async (
  postId: string,
  userId: string,
  like: boolean
) => {
  const likeObj = await prisma.like.findUnique({
    where: { userId_postId: { userId, postId } },
  });

  if (like && !likeObj) {
    await prisma.like.create({ data: { userId, postId } });
  } else if (!like && likeObj) {
    await prisma.like.delete({ where: { userId_postId: { userId, postId } } });
  }
};

export const getPostTipNetworks = async (
  postId: string,
  senderNetworks: string[]
) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) return [];

  const res = await instance.get("/s2s/api/v1/wallet", {
    params: { user_id: post.authorId },
  });

  const receiverWallets = res.data.data.wallets as Wallet[];

  const receiverNetworks = new Set<string>(
    receiverWallets.map((w) => w.network_name)
  );

  const intersection = new Set<string>();
  for (var x of senderNetworks)
    if (receiverNetworks.has(x)) intersection.add(x);

  return receiverWallets.filter((w) => intersection.has(w.network_name));
};

export const storeTip = async ({
  userId,
  postId,
  network,
  token,
  amount,
  orderId,
}: {
  userId: string;
  postId: string;
  network: string;
  token: string;
  amount: string;
  orderId: string;
}) => {
  await prisma.tip.create({
    data: { id: orderId, postId, userId, network, token, amount },
  });
};
