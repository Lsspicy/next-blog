import { searchPosts } from "@/data/posts";
import { PostList } from "@/components/post-list";

export default function BlogIndex({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  return <BlogIndexContent searchParams={searchParams} />;
}

async function BlogIndexContent({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const posts = searchPosts(q ?? "");

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      {q ? (
        <>
          <h1 className="text-2xl font-bold tracking-tight mb-2">
            搜索结果
          </h1>
          <p className="text-sm text-zinc-500 mb-8">
            &ldquo;{q}&rdquo; 共找到 {posts.length} 篇
          </p>
        </>
      ) : (
        <h1 className="text-2xl font-bold tracking-tight mb-8">所有文章</h1>
      )}

      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <p className="text-zinc-500">没有找到相关文章</p>
      )}
    </main>
  );
}
