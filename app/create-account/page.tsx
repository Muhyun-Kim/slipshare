"use client";

import { useFormState } from "react-dom";
import { createAccount } from "./actions";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center border rounded-md px-6 py-8 *:text-red-50 *:font-medium gap-4 w-1/3">
        <form
          action={dispatch}
          className="flex flex-col items-center gap-4 w-full"
        >
          <input
            type="email"
            name="email"
            placeholder="メールアドレス"
            className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
          />
          <input
            type="password"
            name="password"
            placeholder="パスワード"
            className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
          />
          <input
            type="password"
            name="passwordConfirm"
            placeholder="パスワード確認"
            className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
          />
          <button className="w-1/2 border rounded-md bg-red-500">
            会員登録
          </button>
        </form>
        <button className="w-1/2 border rounded-md bg-red-500">
          googleでログイン
        </button>
        <button className="w-1/2 border rounded-md bg-red-500">
          でログイン
        </button>
      </div>
    </div>
  );
}
