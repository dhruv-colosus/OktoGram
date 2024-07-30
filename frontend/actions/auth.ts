"use server";

import prisma from "@/lib/prisma";

export const registerUser = async (userId: string, email: string) => {
  console.log("Register user with id ", userId, email);

  const user = await prisma.user.upsert({
    where: { id: userId },
    update: {
      email,
    },
    create: { id: userId, email },
  });
  console.log("registered user", user);
};
