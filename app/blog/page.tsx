"use client";

import { DocumentPlusIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import InputModal from "./InputModal";
import BlogList from "./blog-list";
import type { Blog, User } from "@prisma/client";
import { fetchBlog } from "./actions";

export interface BlogWithAuthor extends Blog {
  author: User;
}

export default function Blog() {
  const [showModal, setShowModal] = useState(false);
  const [blogs, setBlogs] = useState<BlogWithAuthor[]>([]);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    async function getBlogs() {
      const fetchedBlogs = await fetchBlog();
      setBlogs(fetchedBlogs);
    }
    getBlogs();
  }, []);

  const handleCreateBlog = async (newBlog: BlogWithAuthor) => {
    setBlogs((prevBlogs) => [newBlog, ...prevBlogs]);
  };

  const handleDeleteBlog = async (blogId: number) => {
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
  };

  const handleUpdateBlog = async (updatedBlog: BlogWithAuthor) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    );
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl p-4 pb-10">POST 📖</h1>
      <button
        className="mb-8"
        onClick={() => {
          setShowModal((prev) => !prev);
        }}
      >
        <DocumentPlusIcon className="h-12 w-12" />
      </button>
      <InputModal
        show={showModal}
        onClose={handleCloseModal}
        onCreate={handleCreateBlog}
      />
      {blogs.map((blog) => {
        return (
          <BlogList
            key={blog.id}
            blog={blog}
            onDelete={handleDeleteBlog}
            onUpdate={handleUpdateBlog}
          />
        );
      })}
    </div>
  );
}
