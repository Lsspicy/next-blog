"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 等客户端挂载后再渲染，避免 hydration 不匹配
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const toggle = () => {
    if (theme === "dark") setTheme("light");
    else if (theme === "light") setTheme("system");
    else setTheme("dark");
  };

  const label = theme === "dark" ? "暗黑" : theme === "light" ? "明亮" : "跟随系统";

  return (
    <button
      onClick={toggle}
      className="rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 py-1.5 text-xs text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
      title={`当前：${label}，点击切换`}
    >
      {label}
    </button>
  );
}
