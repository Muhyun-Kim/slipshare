"use client";

import { Blog, User } from "@prisma/client";
import {
  ChatBubbleOvalLeftIcon,
  HandThumbUpIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import useUserStore from "@/store/useUserStore";
import { deleteBlog } from "./actions";
import Link from "next/link";
import UpdateModal from "./UpdateModal";
import { useState } from "react";

interface BlogWithAuthor extends Blog {
  author: User;
}

interface BlogListProps {
  blog: BlogWithAuthor;
  onDelete: (deleteBlogId: number) => void;
  onUpdate: (updatedBlog: BlogWithAuthor) => void;
}

export default function BlogList({ blog, onDelete, onUpdate }: BlogListProps) {
  const user = useUserStore((state) => state.user);
  const currentTime = new Date().getTime();
  const timeDiff = currentTime - new Date(blog.createdAt).getTime();
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  let timeDisplay;
  if (timeDiff < 60 * 60 * 1000) {
    timeDisplay = "1時間以内";
  } else if (timeDiff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(timeDiff / (60 * 60 * 1000));
    timeDisplay = `${hours}時間前`;
  } else if (timeDiff < 7 * 24 * 60 * 60 * 1000) {
    const days = Math.floor(timeDiff / (24 * 60 * 60 * 1000));
    timeDisplay = `${days}日前`;
  } else {
    const postedAt = new Date(blog.createdAt).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    timeDisplay = postedAt;
  }

  const handleDeleteBlog = async (blogId: number) => {
    try {
      await deleteBlog(blogId);
      onDelete(blogId);
    } catch (error) {
      console.error("Failed to delete blog post", error);
    }
  };

  return (
    <div className="flex flex-col w-1/2 border py-4 px-8">
      <div className="flex justify-between">
        <h1 className="mb-4">{blog.author.username}</h1>
        <p>{timeDisplay}</p>
      </div>
      <Link href={`/blog/${blog.id}`}>
        <p className="mb-4">{blog.content}</p>
      </Link>
      <div className="flex">
        <ChatBubbleOvalLeftIcon className="w-4 h-4" />
        <HandThumbUpIcon className="w-4 h-4 ml-4" />
        {user && user.userId === blog.authorId && (
          <>
            <button onClick={() => setShowUpdateModal(true)}>
              <PencilSquareIcon className="w-4 h-4 ml-4" />
            </button>
            <button onClick={() => handleDeleteBlog(blog.id)}>
              <TrashIcon className="w-4 h-4 ml-4 text-red-500" />
            </button>
          </>
        )}
      </div>
      <UpdateModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        blog={blog}
        onUpdate={onUpdate}
      />
    </div>
  );
}
