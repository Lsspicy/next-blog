import { getAllPosts } from "@/data/posts";
import { PostList } from "@/components/post-list";

export default function Home() {
  const posts = getAllPosts();
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <section className="mb-12">
        <h1 className="text-2xl font-bold tracking-tight">我的博客</h1>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          记录 Next.js 学习过程中的思考与实践
        </p>
      </section>

      <h2 className="text-lg font-semibold mb-6">最新文章</h2>
      <PostList posts={posts} />
    </main>
  );
}
