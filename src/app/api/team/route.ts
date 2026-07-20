import { NextResponse } from "next/server";
import { store } from "@/lib/db/store";

export async function GET() {
  const members = Array.from(store.teamMembers.values())
    .filter((m) => m.isActive);
  return NextResponse.json(members);
}
