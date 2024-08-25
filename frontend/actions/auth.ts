"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const registerUser = async (email: string, username: string) => {
  try {
    const user = await prisma.user.create({
      data: { email, username, wallet: "0x" },
    });
    return { error: null };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return { error: "User already exists" };
      }
    }
    return { error: "Unknown error" };
  }
};

export const getUser = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { registered: false };
  }
  return user;
};

export const updateWallet = async (email: string, wallet: string) => {
  try {
    await prisma.user.update({ where: { email }, data: { wallet } });
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
