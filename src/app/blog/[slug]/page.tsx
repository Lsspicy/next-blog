import { getAllSlugs, getPostBySlug } from "@/data/posts";
import { notFound } from "next/navigation";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import type { Metadata } from "next";
import { getComments } from "./actions";
import CommentForm from "@/components/comment-form";

const prettyCodeOptions = {
  theme: "github-dark",
  keepBackground: false,
};

async function renderMarkdown(content: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, prettyCodeOptions)
    .use(rehypeStringify)
    .process(content);
  return String(file);
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "未找到" };

  return {
    title: `${post.title} | 我的博客`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export const instant = false;

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const comments = await getComments(slug);
  const html = await renderMarkdown(post.content);

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-8">
        <time className="text-sm text-zinc-400">{post.date}</time>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">{post.title}</h1>
        <p className="mt-3 text-lg text-zinc-500 dark:text-zinc-400">
          {post.excerpt}
        </p>
      </header>

      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <a
        href="/blog"
        className="mt-12 inline-block text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        ← 返回文章列表
      </a>

      <hr className="my-12 border-zinc-200 dark:border-zinc-700" />

      <section>
        <h2 className="text-xl font-semibold mb-6">评论 ({comments.length})</h2>

        <CommentForm slug={slug} />

        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
              <div className="flex items-baseline justify-between">
                <span className="font-medium">{c.author}</span>
                <time className="text-xs text-zinc-400">
                  {new Date(c.created_at).toLocaleDateString("zh-CN")}
                </time>
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">
                {c.content}
              </p>
            </div>
          ))}

          {comments.length === 0 && (
            <p className="text-sm text-zinc-400">暂无评论，来抢沙发吧</p>
          )}
        </div>
      </section>
    </article>
  );
}
