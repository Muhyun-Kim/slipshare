import prisma from "@/lib/prisma";

async function getBlogDetail(id: number) {
  const blogDetail = await prisma.blog.findUnique({
    where: {
      id,
    },
  });
  return blogDetail;
}

export default async function BlogDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const blogId = parseInt(id, 10);
  if (isNaN(blogId)) {
    return <div>Invalid ID</div>;
  }
  const blogDetail = await getBlogDetail(blogId);
  return <div className="flex w-1/2">{blogDetail?.content}</div>;
}
