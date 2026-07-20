import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/db/store";

export async function GET() {
  const projects = Array.from(store.projects.values())
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const project = {
      id: store.generateId(),
      clientId: body.clientId || store.generateId(),
      name: body.name,
      description: body.description || "",
      tier: body.tier || "spark",
      status: "planning" as const,
      progress: 0,
      budget: body.budget,
      startDate: body.startDate,
      dueDate: body.dueDate,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    store.projects.set(project.id, project);
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
