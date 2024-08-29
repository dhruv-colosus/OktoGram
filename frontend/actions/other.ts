import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const storeTip = async (
  userEmail: string,
  destEmail: string,
  amt: string,
  postId: string
) => {
  try {
    await prisma.tip.create({
      data: { userEmail, destEmail, amount: amt, postId },
    });
    return { error: null };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return { error: "User not found" };
      }
    }
    return { error: "Unknown error" };
  }
};

export const getSentTips = async (userEmail: string) => {
  try {
    const tips = await prisma.tip.findMany({
      where: { userEmail },
    });
    return { tips, error: null };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return { error: "User not found" };
      }
    }
    return { error: "Unknown error" };
  }
};

export const getReceivedTips = async (destEmail: string) => {
  try {
    const tips = await prisma.tip.findMany({
      where: { destEmail },
    });
    return { tips, error: null };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return { error: "User not found" };
      }
    }
    return { error: "Unknown error" };
  }
};
