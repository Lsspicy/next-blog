---
title: "用 Tailwind CSS 快速搭建样式"
excerpt: "从配置到组件，用 Tailwind 工具类快速构建响应式界面。"
date: "2026-10-10"
---

# 用 Tailwind CSS 快速搭建样式

Tailwind CSS 是一个原子化的 CSS 框架，非常适合和 Next.js 搭配使用。

## 配置

Next.js 项目初始化时选择 Tailwind，会自动配置好一切。你只需要在 className 里写工具类即可。

## 常用工具类

- 布局：`flex`, `grid`, `max-w-3xl`, `mx-auto`
- 间距：`px-6`, `py-12`, `gap-4`, `mt-2`
- 排版：`text-lg`, `font-semibold`, `tracking-tight`
- 颜色：`text-zinc-600`, `bg-white`, `dark:bg-black`
- 响应式：`sm:items-start`, `md:w-[158px]`

## 暗色模式

Tailwind 支持 `prefers-color-scheme` 暗色模式，用 `dark:` 前缀即可。

---

Tailwind 的学习曲线很陡，但一旦习惯，写样式的速度会大幅提升。
