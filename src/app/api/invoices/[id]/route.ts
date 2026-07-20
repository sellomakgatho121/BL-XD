import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/db/store";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const invoice = store.invoices.get(id);
  if (!invoice) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(invoice);
}

export async function PATCH(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const invoice = store.invoices.get(id);
  if (!invoice) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  Object.assign(invoice, body, { updatedAt: new Date() });
  store.invoices.set(id, invoice);
  return NextResponse.json(invoice);
}
