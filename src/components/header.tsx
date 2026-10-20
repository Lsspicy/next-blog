import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";

export default function Header() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-3xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight hover:opacity-80">
          我的博客
        </Link>
        <nav className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100">
            首页
          </Link>
          <Link href="/blog" className="hover:text-zinc-900 dark:hover:text-zinc-100">
            文章
          </Link>
          <ThemeToggle />
        </nav>
      </div>
      <div className="mx-auto max-w-3xl px-6 pb-4">
        <form action="/blog" method="GET" className="flex gap-2">
          <input
            type="text"
            name="q"
            placeholder="搜索文章…"
            className="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-500"
          />
          <button
            type="submit"
            className="rounded-lg bg-zinc-900 dark:bg-zinc-100 px-4 py-2 text-sm text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-300"
          >
            搜索
          </button>
        </form>
      </div>
    </header>
  );
}
