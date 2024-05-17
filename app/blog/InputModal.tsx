"use client";

import useUserStore from "@/store/useUserStore";
import { useEffect, useState } from "react";

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

  if (!show) {
    return <></>;
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center *:text-black">
      <div className="bg-white p-4 rounded-lg w-1/3 h-1/2 flex flex-col">
        <h1 className="text-2xl font-bold">お酒について語ろう！</h1>
        <textarea
          className="border-2 border-gray-300 rounded-lg p-2 w-full mt-4 flex-grow"
          name="content"
          placeholder="Content"
        />
        <div className="flex justify-between">
          <button className="bg-blue-500 text-white p-2 rounded-lg mt-4">
            投稿
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white p-2 rounded-lg mt-4"
          >
            取り消し
          </button>
        </div>
      </div>
    </div>
  );
}
