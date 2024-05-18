"use client";

import useUserStore from "@/store/useUserStore";
import React, { useEffect, useState } from "react";
import { postBlog } from "./actions";

interface InputModalProps {
  show: boolean;
  onClose: () => void;
}

export default function InputModal({ show, onClose }: InputModalProps) {
  const user = useUserStore((state) => state.user);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const result = await postBlog(formData, user!);
    if (result.success) {
      onClose();
    }
  };

  if (!show) {
    return <></>;
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center *:text-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg w-1/3 h-1/2 flex flex-col"
      >
        <h1 className="text-2xl font-bold">お酒について語ろう！</h1>
        <textarea
          className="border-2 border-gray-300 rounded-lg p-2 w-full mt-4 flex-grow"
          name="content"
          placeholder="今何飲んでる？🍺"
        />
        <span className="text-gray-400 flex justify-end text-sm">
          最大400文字
        </span>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg mt-4"
          >
            投稿
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white p-2 rounded-lg mt-4"
          >
            取り消し
          </button>
        </div>
      </form>
    </div>
  );
}
