import Link from "next/link";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/20/solid";

export default function Navbar() {
  return (
    <nav className="flex justify-between m-4">
      <ul className="flex">
        <li className="pr-4">
          <Link href="/">ホーム</Link>
        </li>
        <li className="pr-4">
          <Link href="/">プロフィール</Link>
        </li>
        <li className="pr-4">
          <Link href="/recipe">レシピ</Link>
        </li>
        <li>
          <Link href="/community">コミュニティ</Link>
        </li>
      </ul>
      <ul className="flex">
        <li>
          <Link href="/login">ログイン</Link>
        </li>
        <li className="pl-4">
          <Link href="/create-account">会員登録</Link>
        </li>
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
