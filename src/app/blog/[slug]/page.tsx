import { getAllSlugs, getPostBySlug } from "@/data/posts";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-8">
        <time className="text-sm text-zinc-400">{post.date}</time>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">{post.title}</h1>
        <p className="mt-3 text-lg text-zinc-500 dark:text-zinc-400">
          {post.excerpt}
        </p>
      </header>

      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>

      <a
        href="/blog"
        className="mt-12 inline-block text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        ← 返回文章列表
      </a>
    </article>
  );
}
