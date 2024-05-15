"use server";

import { z } from "zod";

import supabase from "@/lib/supabase";

const checkConfirmPassword = ({
  password,
  passwordConfirm,
}: {
  password: string;
  passwordConfirm: string;
}) => password === passwordConfirm;

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirm: z.string().min(8),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"],
  })
  .refine(checkConfirmPassword, {
    message: "Passwords must match",
    path: ["passwordConfirm"],
  });

export async function createAccount(params: any, formData: FormData) {
  const inputData = {
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
  };

  const validationResult = formSchema.safeParse(inputData);

  if (!validationResult.success) {
    return validationResult.error.flatten();
  }

  const { data, error } = await supabase.auth.signUp({
    email: validationResult.data.email,
    password: validationResult.data.password,
  });

  if (error) {
    console.error("Sign up error:", error.message);
    return { error: error.message };
  } else {
    console.log(data);
    return { data: data };
  }
}
