"use client";

import useUserStore from "@/store/useUserStore";
import { BlogWithAuthor } from "./page";
import { useEffect, useState } from "react";
import { updateBlog } from "./actions";

interface UpdateModalProps {
  show: boolean;
  onClose: () => void;
  blog: BlogWithAuthor;
  onUpdate: (updatedBlog: BlogWithAuthor) => void;
}

export default function UpdateModal({
  show,
  onClose,
  blog,
  onUpdate,
}: UpdateModalProps) {
  const user = useUserStore((state) => state.user);
  const [content, setContent] = useState(blog.content);
  useEffect(() => {
    if (show) {
      setContent(blog.content);
    }
  }, [show, blog.content]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await updateBlog(blog.id, content);
    if ("error" in result) {
      console.error("Failed to update blog post", result.error);
      return;
    }
    if (result.result) {
      onUpdate(result.result);
    }
    onClose();
  };
  if (!show) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center *:text-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg w-1/3 h-1/2 flex flex-col"
      >
        <h1 className="text-2xl font-bold">お酒について語ろう🍺</h1>
        <textarea
          className="border-2 border-gray-300 rounded-lg p-2 w-full mt-4 flex-grow"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <span className="text-gray-400 flex justify-end text-sm">
          最大400文字
        </span>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg mt-4"
          >
            アップデート
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
