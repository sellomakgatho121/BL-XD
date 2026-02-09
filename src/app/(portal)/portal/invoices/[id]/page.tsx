"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, CreditCard, Printer, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase/client";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
}

interface InvoiceDetail {
  id: string;
  invoice_number: string;
  created_at: string;
  due_date: string;
  total_amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  client: {
    full_name: string;
    email: string;
    company_name: string;
  };
  project: {
    name: string;
  };
  items: InvoiceItem[];
}

export default function InvoiceDetailPage() {
  const params = useParams();
  const [invoice, setInvoice] = useState<InvoiceDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadInvoice() {
      if (!params.id) return;

      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          client:profiles!client_id(full_name, email, company_name),
          project:projects(name),
          items:invoice_items(*)
        `)
        .eq('id', params.id)
        .single();

      if (data) {
        setInvoice(data);
      }
      setIsLoading(false);
    }

    loadInvoice();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-[var(--signal-lime)] font-mono">LOADING DATA...</div>
      </div>
    );
  }

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link 
        href="/portal/invoices"
        className="inline-flex items-center text-sm text-[var(--spectral-muted)] hover:text-[var(--signal-lime)] transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Invoices
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black tracking-tighter">Invoice {invoice.invoice_number}</h1>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-none border-[var(--border)]">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" className="rounded-none border-[var(--border)]">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          {invoice.status !== 'paid' && (
            <Button className="bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 rounded-none font-bold">
              <CreditCard className="w-4 h-4 mr-2" />
              Pay Now
            </Button>
          )}
        </div>
      </div>

      <div className="border border-[var(--border)] bg-[var(--card)] p-8 md:p-12 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-[var(--border)] pb-8">
          <div>
            <div className="text-2xl font-bold text-[var(--signal-lime)] mb-1">BLACKLIGHT</div>
            <div className="text-sm text-[var(--spectral-muted)]">
              Digital Solutions Pty Ltd<br />
              Cape Town, South Africa<br />
              VAT: 4820193829
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-[var(--spectral-muted)] uppercase mb-1">Amount Due</div>
            <div className="text-4xl font-black text-[var(--spectral-white)]">
              R{invoice.total_amount.toLocaleString()}
            </div>
            <div className="mt-2">
              <Badge className="rounded-none bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]">
                {invoice.status.toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="text-xs text-[var(--spectral-muted)] uppercase mb-2">Billed To</div>
            <div className="font-bold">{invoice.client.company_name}</div>
            <div className="text-[var(--spectral-dim)]">{invoice.client.full_name}</div>
            <div className="text-[var(--spectral-dim)]">{invoice.client.email}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-[var(--spectral-muted)] uppercase mb-1">Invoice Date</div>
              <div>{new Date(invoice.created_at).toLocaleDateString()}</div>
            </div>
            <div>
              <div className="text-xs text-[var(--spectral-muted)] uppercase mb-1">Due Date</div>
              <div>{new Date(invoice.due_date).toLocaleDateString()}</div>
            </div>
            <div>
              <div className="text-xs text-[var(--spectral-muted)] uppercase mb-1">Project Reference</div>
              <div>{invoice.project?.name}</div>
            </div>
          </div>
        </div>

        {/* Line Items */}
        <div className="border border-[var(--border)]">
          <div className="bg-[var(--onyx-lighter)] p-3 grid grid-cols-12 text-xs font-mono uppercase text-[var(--spectral-muted)]">
            <div className="col-span-6">Description</div>
            <div className="col-span-2 text-right">Qty</div>
            <div className="col-span-2 text-right">Rate</div>
            <div className="col-span-2 text-right">Amount</div>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {invoice.items?.map((item) => (
              <div key={item.id} className="p-3 grid grid-cols-12 text-sm">
                <div className="col-span-6">{item.description}</div>
                <div className="col-span-2 text-right">{item.quantity}</div>
                <div className="col-span-2 text-right">R{item.unit_price.toLocaleString()}</div>
                <div className="col-span-2 text-right font-bold">R{item.amount.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="flex justify-end pt-4">
          <div className="w-64 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--spectral-muted)]">Subtotal</span>
              <span>R{invoice.total_amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--spectral-muted)]">VAT (15%)</span>
              <span>R{(invoice.total_amount * 0.15).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t border-[var(--border)] pt-3">
              <span>Total</span>
              <span className="text-[var(--signal-lime)]">
                R{(invoice.total_amount * 1.15).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
