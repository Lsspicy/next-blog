// 导入 Node.js 文件系统模块，用于读取文件和目录
import fs from "fs";
// 导入路径处理模块，用于安全地拼接文件路径
import path from "path";
// 导入 gray-matter 库，用于解析 Markdown 文件中的 frontmatter（元数据）
import matter from "gray-matter";

/**
 * process.cwd()获取当前的工作目录：/Users/zj/document/qoder/next-blog
 * path.join(...)用于拼接路径：/Users/zj/document/qoder/next-blog/content/blog
 * 为什么这样写：
 * 跨平台兼容：path.join()会根据当前操作系统的路径分隔符进行拼接，例如在Windows系统中，路径分隔符为\，而在Unix系统中，路径分隔符为/。
 * 绝对路径：避免相对路径再不同调用上下文失效的问题
 * 可维护性：将路径拼接逻辑封装在常量中，便于统一管理
 */
const CONTENT_DIR = path.join(process.cwd(), "content/blog");

// 定义博客文章的元数据接口（用于列表展示）
export interface PostMeta {
  slug: string;       // 文章的唯一标识符（通常用于 URL）
  title: string;      // 文章标题
  excerpt: string;    // 文章摘要
  date: string;       // 文章发布日期（格式：YYYY-MM-DD）
}

// 定义完整的博客文章接口（继承元数据，包含文章内容）
export interface Post extends PostMeta {
  content: string;    // Markdown 格式的文章正文内容
}

/**
 * 解析单个 Markdown 文件为 Post 对象
 * @param fileName - Markdown 文件名（如 "my-post.md"）
 * @returns 解析后的 Post 对象
 */
function parsePostFile(fileName: string): Post {
  // 从文件名中提取 slug（移除 .md 后缀）
  const slug = fileName.replace(/\.md$/, "");
  
  // 构建文件的完整路径
  const fullPath = path.join(CONTENT_DIR, fileName);
  
  // 同步读取文件内容（UTF-8 编码）
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  
  // 使用 gray-matter 解析 frontmatter 和正文内容
  // data: frontmatter 元数据（title, excerpt, date 等）
  // content: Markdown 正文内容
  const { data, content } = matter(fileContents);

  // 返回结构化的文章对象
  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    content,
  };
}

/**
 * 获取所有博客文章列表
 * @returns 按日期降序排列的文章数组（最新的在前）
 */
export function getAllPosts(): Post[] {
  // 读取 content/blog 目录，过滤出所有 .md 文件
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  
  // 将每个文件解析为 Post 对象，并按日期降序排序
  return files
    .map(parsePostFile)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * 根据 slug 获取单篇博客文章
 * @param slug - 文章的唯一标识符
 * @returns 匹配的文章对象，如果未找到则返回 undefined
 */
export function getPostBySlug(slug: string): Post | undefined {
  // 遍历所有文章，查找 slug 匹配的项
  return getAllPosts().find((p) => p.slug === slug);
}

/**
 * 获取所有文章的 slug 列表
 * @returns 所有文章的 slug 字符串数组
 * @用途 - 用于 Next.js 的 generateStaticParams 生成动态路由
 */
export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

/**
 * 搜索文章（匹配标题、摘要、正文）
 * @param query - 搜索关键词
 * @returns 匹配的文章列表
 */
export function searchPosts(query: string): Post[] {
  const q = query.toLowerCase().trim();
  if (!q) return getAllPosts();
  return getAllPosts().filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q)
  );
}
