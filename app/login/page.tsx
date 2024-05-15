"use client";

import { useState } from "react";
import useUserStore from "@/store/useUserStore";
import { login } from "./actions";

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const setUser = useUserStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const result = await login(null, formData);

    setIsLoading(false);

    if (result.error) {
      setError(result.error as string);
    } else {
      setUser(result.user);
      window.location.href = "/";
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center border rounded-md px-6 py-8 *:text-red-50 *:font-medium gap-4 w-1/3">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full items-center gap-4"
        >
          <input
            type="email"
            name="email"
            placeholder="メールアドレス"
            className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="パスワード"
            className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
            required
          />
          <button
            type="submit"
            className="w-1/2 border rounded-md bg-red-500"
            disabled={isLoading}
          >
            {isLoading ? "ログイン中..." : "ログイン"}
          </button>
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </form>
        <button className="w-1/2 border rounded-md bg-red-500">
          Googleでログイン
        </button>
        <button className="w-1/2 border rounded-md bg-red-500">
          Xでログイン
        </button>
      </div>
    </div>
  );
}
