"use client";

import Link from "next/link";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/20/solid";
import useUserStore from "@/store/useUserStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const user = useUserStore((state) => state.user);
  const [isHydrated, setIsHydrated] = useState(false);
  const clearUser = useUserStore((state) => state.clearUser);
  const router = useRouter();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const logout = () => {
    clearUser();
    router.push("/");
  };
  if (!isHydrated) {
    return <></>;
  }
  return (
    <nav className="flex justify-between m-4">
      <ul className="flex">
        <li className="pr-4">
          <Link href="/">ホーム</Link>
        </li>
        <li className="pr-4">
          <Link href="/recipe">レシピ</Link>
        </li>
        {user ? (
          <>
            <li className="pr-4">
              <Link href="/profile">プロフィール</Link>
            </li>
            <li>
              <Link href="/community">コミュニティ</Link>
            </li>
          </>
        ) : (
          <></>
        )}
      </ul>
      <ul className="flex">
        {user ? (
          <>
            <li>
              <button onClick={logout}>ログアウト</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">ログイン</Link>
            </li>
            <li className="pl-4">
              <Link href="/create-account">会員登録</Link>
            </li>
          </>
        )}
        <li className="pl-4">
          <form action="">
            <input type="text" placeholder="検索" className="border p-1" />
            <button>
              <MagnifyingGlassCircleIcon className="h-6 w-6" />
            </button>
          </form>
        </li>
      </ul>
    </nav>
  );
}
