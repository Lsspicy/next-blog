---
title: "Server Components 实战"
excerpt: "直接在组件里 async/await 获取数据，告别 getServerSideProps。"
date: "2026-10-12"
---

# Server Components 实战

Server Components 是 Next.js App Router 的基石。

## 直接获取数据

以前你需要用 `getServerSideProps` 或 `getStaticProps`，现在可以直接在组件里写：

```tsx
async function PostPage({ params }: Props) {
  const post = await fetchPost(params.slug);
  return <article>{post.content}</article>;
}
```

## 什么时候用 Client Component

只有当你需要以下功能时才加 `'use client'`：

- `useState` / `useEffect`
- 事件处理器（onClick、onChange 等）
- 浏览器 API（window、localStorage 等）

## 混合使用

最佳实践是尽量让组件保持 Server Component，只在确实需要交互的地方用 Client Component。

---

掌握这个模式，你的 Next.js 代码就会又简单又高效。
