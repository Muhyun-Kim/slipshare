export default function Login() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center border rounded-md px-6 py-8 *:text-red-50 *:font-medium gap-4 w-1/3">
        <form className="flex flex-col w-full items-center gap-4">
          <input
            type="email"
            placeholder="メールアドレス"
            className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
          />
          <input
            type="password"
            placeholder="パスワード"
            className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
          />
          <button className="w-1/2 border rounded-md bg-red-500">
            ログイン
          </button>
        </form>
        <button className="w-1/2 border rounded-md bg-red-500">
          googleでlogin
        </button>
        <button className="w-1/2 border rounded-md bg-red-500">Xでlogin</button>
      </div>
    </div>
  );
}
