import { NextResponse } from "next/server";
import { store } from "@/lib/db/store";

export async function GET() {
  const notifs = Array.from(store.notifications.values())
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  return NextResponse.json(notifs);
}
