"use client";

import { useEffect, useState } from "react";
import useUserStore from "@/store/useUserStore";
import { updateProfile } from "./actions";

export default function Profile() {
  const user = useUserStore((state) => state.user);
  const [isHydrated, setIsHydrated] = useState(false);
  const [profileUsername, setProfileUsername] = useState(
    user?.username || "ゲストユーザー"
  );
  const [profileDetail, setProfileDetail] = useState(user?.detail || "");
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <div>Loading...</div>;
  }

  const handleUpdateProfile = async () => {
    const result = await updateProfile(
      user!.id,
      profileUsername,
      profileDetail
    );
    if ("error" in result) {
      console.error("Failed to update profile", result.error);
      return;
    }
    setUser(result.result);
  };

  return (
    <div className="flex flex-col items-center">
      <form
        action={handleUpdateProfile}
        className="flex flex-col items-start w-1/3 m-4"
      >
        <div className="flex flex-col">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            ユーザー名
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={profileUsername}
            onChange={(e) => setProfileUsername(e.target.value)}
            className="w-full px-3 py-2 text-white bg-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col w-full">
          <label
            htmlFor="detail"
            className="mt-4 block mb-2 text-sm font-medium text-gray-700"
          >
            ユーザー説明
          </label>
          <textarea
            name="detail"
            placeholder={!user?.detail ? "自己紹介を入力してください" : ""}
            value={profileDetail}
            onChange={(e) => setProfileDetail(e.target.value)}
            className="w-full px-3 py-2 text-white bg-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>
        <div className="w-full pt-4 flex justify-end">
          <button
            type="submit"
            className="border border-gray-300 rounded-lg hover:bg-gray-600 py-2 px-4"
          >
            編集
          </button>
        </div>
      </form>
    </div>
  );
}
