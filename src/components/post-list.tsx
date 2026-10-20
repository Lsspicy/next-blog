import type { PostMeta } from "@/data/posts";

export function PostList({ posts }: { posts: PostMeta[] }) {
  return (
    <div className="flex flex-col gap-6">
      {posts.map((post) => (
        <a
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 transition-colors hover:border-zinc-400 dark:hover:border-zinc-600"
        >
          <time className="text-sm text-zinc-400">{post.date}</time>
          <h3 className="mt-1 text-lg font-semibold group-hover:underline">
            {post.title}
          </h3>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            {post.excerpt}
          </p>
        </a>
      ))}
    </div>
  );
}
