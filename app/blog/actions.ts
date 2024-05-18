"use server";

import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { z } from "zod";
import { BlogWithAuthor } from "./page";

const formSchema = z.object({
  content: z.string().max(400),
});

export async function createBlog(formData: FormData, user: User) {
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
      include: {
        author: true,
      },
    });

    return { success: true, blog: newBlog };
  } catch (error) {
    return { error: "Failed to create blog post" };
  }
}

export async function fetchBlog() {
  const blogs = await prisma.blog.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
  });
  return blogs;
}

export async function updateBlog(blogId: number, content: string) {
  try {
    const result = await prisma.blog.update({
      where: {
        id: blogId,
      },
      data: { content },
      include: { author: true },
    });
    return { result: result as BlogWithAuthor };
  } catch (error) {
    return { error };
  }
}

export async function deleteBlog(blogId: number) {
  try {
    const result = await prisma.blog.delete({
      where: {
        id: blogId,
      },
    });
    return result;
  } catch (error) {
    return { error };
  }
}
