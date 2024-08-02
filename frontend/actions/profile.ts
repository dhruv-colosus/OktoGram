"use server";

import prisma from "@/lib/prisma";

export const getTips = async (userId: string) => {
  const sentTips = await prisma.tip.findMany({
    where: { userId },
    include: { post: { include: { author: true } }, from: true },
  });

  const receivedTips = await prisma.tip.findMany({
    where: { post: { authorId: userId } },
    include: { post: { include: { author: true } }, from: true },
  });

  return { sentTips, receivedTips };
};
