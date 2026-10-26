"use client";

import { useState } from "react";

type Tab = "loading" | "error" | "notfound";

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "loading", label: "loading.tsx", icon: "⏳" },
  { id: "error", label: "error.tsx", icon: "⚠️" },
  { id: "notfound", label: "not-found.tsx", icon: "🔍" },
];

interface TabInfo {
  title: string;
  desc: string;
  trigger: string;
  filename: string;
  isClient?: boolean;
  flow: { step: string; detail: string }[];
  code: string;
}

const info: Record<Tab, TabInfo> = {
  loading: {
    title: "loading.tsx — 加载占位符",
    desc: "页面数据还在 fetch 时自动显示，无需手动控制。它是 Server Component，不需要 Suspense 包裹。",
    trigger: "页面里有 await（数据库查询、fetch），Suspense 内的内容还在等待数据",
    filename: "app/blog/loading.tsx",
    flow: [
      { step: "用户访问 /blog", detail: "Next.js 开始渲染页面" },
      { step: "发现 loading.tsx", detail: "先渲染 loading 骨架屏给用户看" },
      { step: "page.tsx 执行 await", detail: "服务端在查数据库，用户看到的是加载动画" },
      { step: "数据返回", detail: "page.tsx 渲染完成，替换 loading 组件" },
    ],
    code: `// app/blog/loading.tsx
export default function BlogLoading() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 w-32 bg-zinc-200 rounded" />
      {[1,2,3].map(i => (
        <div key={i} className="h-20 bg-zinc-100 rounded-xl" />
      ))}
    </div>
  );
}`,
  },
  error: {
    title: "error.tsx — 错误边界",
    desc: "页面渲染时抛出未捕获错误，Next.js 自动捕获并显示。必须是 Client Component（需要 useState 做重试）。",
    trigger: "page.tsx 或 layout.tsx 里抛出错误（数据库断开、代码 bug、API 超时）",
    filename: "app/blog/error.tsx",
    isClient: true,
    flow: [
      { step: "页面正常渲染", detail: "用户看到正常内容" },
      { step: "发生错误", detail: "某个组件 throw Error，Next.js 捕获" },
      { step: "显示 error.tsx", detail: "出错的部分被替换成错误提示" },
      { step: "用户点重试", detail: "error.reset() 重新渲染页面" },
    ],
    code: `"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="text-center py-12">
      <h2>出错了</h2>
      <button onClick={reset}>重试</button>
    </div>
  );
}`,
  },
  notfound: {
    title: "not-found.tsx — 404 页面",
    desc: "调用 notFound() 或访问不存在的路由时显示。可以放全局（app/）或局部（app/blog/）。",
    trigger: '调用 next/navigation 的 notFound() 函数，或访问没有 page.tsx 的路径',
    filename: "app/not-found.tsx（全局）",
    flow: [
      { step: "用户访问 /blog/xxx", detail: "xxx 在数据库里不存在" },
      { step: "page.tsx 里判断", detail: "if (!post) notFound()" },
      { step: "显示 not-found.tsx", detail: "外层 layout 保留，只替换 page 内容" },
    ],
    code: `// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";

export default function PostPage({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();  // ← 触发 not-found.tsx
  return <article>{post.title}</article>;
}`,
  },
};

export default function NextJSSpecialFilesGuide() {
  const [active, setActive] = useState<Tab>("loading");
  const current = info[active];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <header className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Next.js 特殊文件
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            loading.tsx / error.tsx / not-found.tsx — 不需要 import，Next.js 自动识别
          </p>
        </header>

        <div className="flex gap-2 mb-10">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition text-sm font-medium ${
                active === t.id
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100"
                  : "border-zinc-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900"
              }`}
            >
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3">{current.title}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {current.desc}
            </p>
          </section>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white dark:bg-zinc-900">
              <h3 className="font-semibold mb-2 text-xs uppercase tracking-wider text-zinc-400">
                触发时机
              </h3>
              <p className="text-sm">{current.trigger}</p>
            </div>
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white dark:bg-zinc-900">
              <h3 className="font-semibold mb-2 text-xs uppercase tracking-wider text-zinc-400">
                文件位置
              </h3>
              <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded font-mono">
                {current.filename}
              </code>
              {current.isClient && (
                <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
                  ⚡ 需要 "use client"
                </p>
              )}
            </div>
          </div>

          <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-900">
            <h3 className="font-semibold mb-4 text-xs uppercase tracking-wider text-zinc-400">
              渲染流程
            </h3>
            <div className="space-y-3">
              {current.flow.map((f, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{f.step}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      {f.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 bg-zinc-900 dark:bg-zinc-950 text-zinc-100">
            <h3 className="font-semibold mb-3 text-xs uppercase tracking-wider text-zinc-400">
              代码示例
            </h3>
            <pre className="text-sm leading-relaxed whitespace-pre-wrap font-mono">
              {current.code}
            </pre>
          </section>
        </div>
      </div>
    </div>
  );
}
