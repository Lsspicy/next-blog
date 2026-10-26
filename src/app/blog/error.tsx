"use client";

import { useEffect } from "react";

export default function BlogError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Blog error:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <p className="text-4xl mb-4">😵</p>
      <h2 className="text-xl font-semibold mb-2">页面出错了</h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
        {error.message || "加载文章时发生错误"}
      </p>
      <button
        onClick={reset}
        className="rounded-lg bg-zinc-900 dark:bg-zinc-100 px-6 py-2 text-sm text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-300"
      >
        重试
      </button>
    </div>
  );
}
