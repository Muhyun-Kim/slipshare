"use server";

import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { z } from "zod";

const formSchema = z.object({
  content: z.string().max(400),
});

export async function postBlog(formData: FormData, user: User) {
  const content = formData.get("content");

  const inputData = {
    content,
  };

  const validationResult = formSchema.safeParse(inputData);
  if (!validationResult.success) {
    console.error("Validation failed:", validationResult.error.flatten());
    return { error: validationResult.error.flatten() };
  }

  try {
    console.log("Validation successful:", validationResult.data);

    const newBlog = await prisma.blog.create({
      data: {
        content: validationResult.data.content,
        authorId: user.userId,
      },
    });

    return { success: true, blog: newBlog };
  } catch (error) {
    return { error: "Failed to create blog post" };
  }
}
