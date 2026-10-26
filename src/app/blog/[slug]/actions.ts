"use server";

import { revalidatePath } from "next/cache";
import { sql, ensureCommentsTable } from "@/lib/db";

export async function submitComment(formData: FormData) {
  "use server";

  await ensureCommentsTable();

  const slug = formData.get("slug") as string;
  const author = formData.get("author") as string;
  const content = formData.get("content") as string;

  if (!slug || !author.trim() || !content.trim()) {
    return { error: "姓名和评论不能为空" };
  }

  await sql`
    INSERT INTO comments (slug, author, content)
    VALUES (${slug}, ${author.trim()}, ${content.trim()})
  `;

  revalidatePath(`/blog/${slug}`);
  return { success: true };
}

export async function getComments(slug: string) {
  await ensureCommentsTable();

  const rows = await sql`
    SELECT id, author, content, created_at
    FROM comments
    WHERE slug = ${slug}
    ORDER BY created_at DESC
  `;

  return rows as Array<{
    id: number;
    author: string;
    content: string;
    created_at: string;
  }>;
}
