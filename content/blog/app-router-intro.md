---
title: "Next.js App Router 入门"
excerpt: "了解 App Router 的基本概念：文件即路由、Server Component、布局系统。"
date: "2026-10-14"
---

# Next.js App Router 入门

Next.js 13 引入了全新的 App Router，它基于 React Server Components 构建，带来了更直观的文件结构和更强大的能力。

## 文件即路由

在 App Router 中，文件系统的结构直接映射到 URL 路由：

- `app/page.tsx` → `/`
- `app/about/page.tsx` → `/about`
- `app/blog/[slug]/page.tsx` → `/blog/:slug`

## Server Component 默认

App Router 中所有组件默认是 Server Component，它们：

- 直接在服务端渲染
- 可以直接使用 async/await 获取数据
- 不会增加客户端 JavaScript 体积

## 布局系统

`layout.tsx` 定义了一个共享布局，它会在路由切换时保留状态、保持交互不重新渲染。

---

这就是 App Router 的核心概念，接下来我们会在实战中深入使用它们。
