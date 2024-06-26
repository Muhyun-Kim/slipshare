"use server";

import prisma from "@/lib/prisma";
import supabase from "@/lib/supabase";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function login(formData: FormData) {
  const inputData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const validationResult = formSchema.safeParse(inputData);

  if (!validationResult.success) {
    return { error: validationResult.error.flatten() };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: validationResult.data.email,
    password: validationResult.data.password,
  });

  if (error) {
    console.error("Sign in error:", error.message);
    return { error: error.message };
  }

  if (!data || !data.user) {
    return { error: "存在しないユーザーです" };
  }

  const userId = data.user.id;

  const user = await prisma.user.findUnique({
    where: {
      userId,
    },
  });

  return { user };
}
