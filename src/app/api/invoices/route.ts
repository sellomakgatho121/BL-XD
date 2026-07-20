import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/db/store";

export async function GET() {
  const invoices = Array.from(store.invoices.values())
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  return NextResponse.json(invoices);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const subtotal = body.subtotal || 0;
    const taxRate = body.taxRate || 0.15;
    const invoice = {
      id: store.generateId(),
      invoiceNumber: store.generateInvoiceNumber(),
      projectId: body.projectId,
      clientId: body.clientId,
      status: "draft" as const,
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: body.dueDate || new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
      subtotal,
      taxRate,
      taxAmount: subtotal * taxRate,
      totalAmount: subtotal * (1 + taxRate),
      currency: "ZAR",
      notes: body.notes,
      createdAt: new Date(),
      updatedAt: new Date(),
      items: [],
    };
    store.invoices.set(invoice.id, invoice);
    return NextResponse.json(invoice);
  } catch {
    return NextResponse.json({ error: "Failed to create invoice" }, { status: 500 });
  }
}
