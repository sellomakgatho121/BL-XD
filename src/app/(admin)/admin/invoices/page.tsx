"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Eye, Trash2, Send, CheckCircle } from "lucide-react";
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
  client: {
    full_name: string;
    company_name: string;
  };
}

export default function AdminInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadInvoices() {
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          client:profiles!client_id(full_name, company_name)
        `)
        .order('created_at', { ascending: false });

      if (data) {
        setInvoices(data);
      }
      setIsLoading(false);
    }

    loadInvoices();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('invoices')
      .update({ status })
      .eq('id', id);

    if (!error) {
      setInvoices(invoices.map(inv => inv.id === id ? { ...inv, status: status as Invoice['status'] } : inv));
    }
  };

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
          <p className="text-[var(--spectral-dim)]">Manage client billing</p>
        </div>
        <Button className="bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 rounded-none">
          <Plus className="w-4 h-4 mr-2" />
          Create Invoice
        </Button>
      </div>

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
                <div className="text-sm text-[var(--spectral-dim)]">
                  {invoice.client.company_name} • {invoice.client.full_name}
                </div>
                <div className="text-xs text-[var(--spectral-muted)] font-mono">
                  Due: {new Date(invoice.due_date).toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-2xl font-bold text-[var(--signal-lime)]">
                    R{invoice.total_amount.toLocaleString()}
                  </div>
                </div>

                <div className="flex gap-2">
                  {invoice.status === 'draft' && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => updateStatus(invoice.id, 'sent')}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  )}
                  {invoice.status === 'sent' && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => updateStatus(invoice.id, 'paid')}
                      className="text-green-400 hover:text-green-300"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                  )}
                  <Link href={`/admin/invoices/${invoice.id}`}>
                    <Button variant="outline" size="sm" className="rounded-none border-[var(--border)]">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
