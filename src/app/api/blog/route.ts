import { NextResponse } from "next/server";
import { store } from "@/lib/db/store";

export async function GET() {
  const posts = Array.from(store.blogPosts.values())
    .filter((p) => p.status === "published")
    .sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime());
  return NextResponse.json(posts);
}
