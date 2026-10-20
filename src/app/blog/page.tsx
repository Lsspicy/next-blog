import { searchPosts } from "@/data/posts";
import { PostList } from "@/components/post-list";
import { Suspense, use } from "react";

export default function BlogIndex(props: {
  searchParams: Promise<{ q?: string }>;
}) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Suspense fallback={<p className="text-zinc-500">加载中…</p>}>
        <BlogContent searchParams={props.searchParams} />
      </Suspense>
    </main>
  );
}

function BlogContent({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = use(searchParams);
  const posts = searchPosts(q ?? "");

  return (
    <>
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
    </>
  );
}
