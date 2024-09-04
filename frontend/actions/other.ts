"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { error } from "console";

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

export const getTips = async (userEmail: string) => {
  try {
    const sentTips = await prisma.tip.findMany({
      where: { userEmail },
    });
    const receivedTips = await prisma.tip.findMany({
      where: { destEmail: userEmail },
    });
    console.log(userEmail, sentTips, receivedTips);

    return { sentTips, receivedTips, error: null };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return { sentTips: [], receivedTips: [], error: "User not found" };
      }
    }
    return { sentTips: [], receivedTips: [], error: "Unknown error" };
  }
};

export const getRecommendations = async (forUser: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: forUser },
      include: { following: true },
    });

    if (!user) throw new Error("user not found");

    const followingEmails = user.following.map((f) => f.email);

    const recommendations = await prisma.user.findMany({
      where: {
        NOT: {
          email: {
            in: [...followingEmails, forUser],
          },
        },
      },
    });

    return recommendations;
  } catch (e: any) {
    return { error: e.message };
  }
};

export const changeFriend = async (forUser: string, otherUser: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: forUser },
      include: { following: true },
    });
    if (!user) throw new Error("user not found");

    const isFollowing = user.following.some((u) => u.email === otherUser);
    if (isFollowing) {
      await prisma.user.update({
        where: { email: forUser },
        data: {
          following: {
            disconnect: { email: otherUser },
          },
        },
      });
      return { status: true };
    } else {
      await prisma.user.update({
        where: { email: forUser },
        data: {
          following: {
            connect: { email: otherUser },
          },
        },
      });
      return { status: false };
    }
  } catch (e: any) {
    return { error: e.message };
  }
};

export const getFriends = async (forUser: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: forUser },
      include: { following: true },
    });
    if (!user) throw new Error("user not found");
    return user.following.map((u) => u.email);
  } catch (e: any) {
    return { error: e.message };
  }
};

export const searchUser = async (term: string) => {
  try {
    const matches = await prisma.user.findMany({
      where: { email: { contains: term.toLowerCase(), mode: "insensitive" } },
    });
    const result = matches.map((u) => u.email);
    return { result, error: false };
  } catch (e: any) {
    return { error: true, message: e.message, result: [] };
  }
};
