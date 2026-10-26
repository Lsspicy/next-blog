import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-zinc-300 dark:text-zinc-700">404</h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        页面不存在
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-zinc-900 dark:bg-zinc-100 px-6 py-2 text-sm text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-300"
      >
        返回首页
      </Link>
    </div>
  );
}
