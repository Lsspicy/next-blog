export default function BlogLoading() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 space-y-6">
      <div className="h-8 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-3">
          <div className="h-4 w-20 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-6 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
      ))}
    </main>
  );
}
