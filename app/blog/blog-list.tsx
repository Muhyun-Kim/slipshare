"use client";

import { Blog } from "@prisma/client";

export default function BlogList(blog: Blog) {
  return (
    <div className="w-1/2">
      <h1>{blog.authorId}</h1>
    </div>
  );
}
