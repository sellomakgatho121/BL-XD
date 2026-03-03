"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Download, Eye, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase/client";

interface Invoice {
  id: string;
  invoice_number: string;
  created_at: string;
  due_date: string;
  total_amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  project: {
    name: string;
  };
}

export default function ClientInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadInvoices() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          project:projects(name)
        `)
        .eq('client_id', user.id)
        .order('created_at', { ascending: false });

      if (data) {
        setInvoices(data);
      }
      setIsLoading(false);
    }

    loadInvoices();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'overdue': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'sent': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-[var(--signal-lime)] font-mono">LOADING DATA...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">Invoices</h1>
          <p className="text-[var(--spectral-dim)]">Manage your billing and payments</p>
        </div>
      </div>

      {invoices.length === 0 ? (
        <div className="border border-[var(--border)] bg-[var(--card)] p-12 text-center">
          <FileText className="w-12 h-12 text-[var(--spectral-muted)] mx-auto mb-4" />
          <h3 className="text-lg font-bold mb-2">No invoices found</h3>
          <p className="text-[var(--spectral-dim)]">You're all caught up! No open invoices.</p>
        </div>
      ) : (
        <div className="border border-[var(--border)] bg-[var(--card)]">
          <div className="grid grid-cols-1 divide-y divide-[var(--border)]">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[var(--onyx-lighter)] transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-lg font-bold text-[var(--spectral-white)]">
                      {invoice.invoice_number}
                    </span>
                    <Badge className={`rounded-none border ${getStatusColor(invoice.status)}`}>
                      {invoice.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-[var(--spectral-dim)]">
                    Project: {invoice.project?.name || 'General'}
                  </p>
                  <p className="text-xs text-[var(--spectral-muted)] font-mono">
                    Due: {new Date(invoice.due_date).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[var(--signal-lime)]">
                      R{invoice.total_amount.toLocaleString()}
                    </div>
                    <div className="text-xs text-[var(--spectral-muted)] uppercase">Total Amount</div>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/portal/invoices/${invoice.id}`}>
                      <Button variant="outline" size="sm" className="rounded-none border-[var(--border)]">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="rounded-none border-[var(--border)]">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
