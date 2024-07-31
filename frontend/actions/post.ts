"use server";

import prisma from "@/lib/prisma";

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
