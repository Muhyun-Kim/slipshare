"use client";

import { DocumentPlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import InputModal from "./InputModal";
import supabase from "@/lib/supabase";
import prisma from "@/lib/prisma";
import BlogList from "./blog-list";

async function fetchBlog() {
  const blogs = await prisma.blog.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return blogs;
}

export default async function Blog() {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const blogs = await fetchBlog();
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl p-4 pb-10">Blog 📖</h1>
      <button
        onClick={() => {
          setShowModal((prev) => !prev);
        }}
      >
        <DocumentPlusIcon className="h-12 w-12" />
      </button>
      <div>
        <InputModal show={showModal} onClose={handleCloseModal} />
      </div>
      {blogs.map((blog) => {
        return <BlogList key={blog.id} {...blog} />;
      })}
    </div>
  );
}
