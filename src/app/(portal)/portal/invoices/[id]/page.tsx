"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Receipt, Download } from "lucide-react";

export default function InvoiceDetail() {
  const params = useParams();
  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/invoices")
      .then((r) => r.json())
      .then((invoices) => {
        const found = invoices.find((i: any) => i.id === params.id);
        setInvoice(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) return <div className="flex justify-center pt-20"><div className="w-8 h-8 border-2 border-bl-gold border-t-transparent rounded-full animate-spin" /></div>;
  if (!invoice) return <div className="text-center pt-20 text-bl-ice/40">Invoice not found</div>;

  return (
    <div>
      <Link href="/portal/invoices" className="inline-flex items-center gap-2 text-sm text-bl-ice/40 hover:text-bl-gold mb-6 transition-colors">
        <ArrowLeft size={14} /> Back to Invoices
      </Link>
      <div className="spatial-panel p-8 rounded-3xl border border-white/10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-bl-ice">{invoice.invoiceNumber}</h1>
            <p className="text-sm text-bl-ice/40 mt-1">Issued: {invoice.issueDate}</p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full border capitalize" style={{
            borderColor: invoice.status === "paid" ? "#00FF8830" : invoice.status === "overdue" ? "#FF006E30" : "#CCFF0030",
            color: invoice.status === "paid" ? "#00FF88" : invoice.status === "overdue" ? "#FF006E" : "#CCFF00",
            backgroundColor: `${invoice.status === "paid" ? "#00FF88" : invoice.status === "overdue" ? "#FF006E" : "#CCFF00"}10`,
          }}>{invoice.status}</span>
        </div>
        <div className="flex justify-between items-center p-4 bg-white/[0.02] rounded-xl">
          <div>
            <div className="text-[10px] text-bl-ice/30 uppercase tracking-wider">Total</div>
            <div className="text-3xl font-bold text-bl-ice">R {(invoice.totalAmount || invoice.subtotal || 0).toLocaleString()}</div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-bl-gold text-bl-deep text-xs font-semibold rounded-xl">
            <Download size={14} /> Download PDF
          </button>
        </div>
        {invoice.notes && (
          <div className="mt-6 p-4 bg-white/[0.02] rounded-xl">
            <div className="text-[10px] text-bl-ice/30 uppercase tracking-wider mb-2">Notes</div>
            <p className="text-sm text-bl-ice/60">{invoice.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
