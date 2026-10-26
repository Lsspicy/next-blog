"use client";

import { useActionState } from "react";
import { submitComment } from "@/app/blog/[slug]/actions";

export default function CommentForm({ slug }: { slug: string }) {
  const [state, formAction, pending] = useActionState(
    async (prev: { error?: string } | undefined, formData: FormData) => {
      formData.set("slug", slug);
      return submitComment(formData);
    },
    undefined
  );

  return (
    <form action={formAction} className="mb-8 space-y-4">
      <div className="flex gap-4">
        <input
          name="author"
          placeholder="你的名字"
          required
          disabled={pending}
          className="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-400 disabled:opacity-50"
        />
      </div>
      <textarea
        name="content"
        placeholder="写点什么…"
        required
        rows={3}
        disabled={pending}
        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-2 text-sm outline-none resize-none focus:ring-2 focus:ring-zinc-400 disabled:opacity-50"
      />
      {state?.error && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-zinc-900 dark:bg-zinc-100 px-6 py-2 text-sm text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? "提交中…" : "提交评论"}
      </button>
    </form>
  );
}
