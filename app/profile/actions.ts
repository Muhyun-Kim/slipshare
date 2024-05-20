"use server";

import prisma from "@/lib/prisma";

export async function updateProfile(
  userId: number,
  username: string,
  detail: string
) {
  try {
    const result = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
        detail,
      },
    });
    return { result };
  } catch (error) {
    return { error };
  }
}
