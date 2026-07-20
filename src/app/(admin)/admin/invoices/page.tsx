"use client";

import { useEffect, useState } from "react";
import {
  Receipt,
  Plus,
  X,
  Search,
  CheckCircle2,
  Clock,
  Send,
  AlertTriangle,
  Ban,
} from "lucide-react";
interface Invoice {
  id: string;
  invoiceNumber: string;
  projectId?: string;
  clientId: string;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  issueDate: string;
  dueDate: string;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

const statusConfig = {
  draft: { label: "Draft", color: "text-bl-ice/40", bg: "bg-white/5", border: "border-white/10" },
  sent: { label: "Sent", color: "text-bl-cyan", bg: "bg-bl-cyan/10", border: "border-bl-cyan/20" },
  paid: { label: "Paid", color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20" },
  overdue: { label: "Overdue", color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/20" },
  cancelled: { label: "Cancelled", color: "text-bl-text-muted", bg: "bg-white/5", border: "border-white/10" },
};

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // Create form
  const [newInvoice, setNewInvoice] = useState({
    clientId: "",
    subtotal: "",
    taxRate: "0.15",
    notes: "",
  });
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    async function loadInvoices() {
      try {
        const res = await fetch("/api/invoices");
        const data = await res.json();
        setInvoices(data);
      } catch (e) {
        console.error("Failed to load invoices", e);
      }
      setIsLoading(false);
    }
    loadInvoices();
  }, []);

  const handleCreate = async () => {
    setIsCreating(true);
    try {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: newInvoice.clientId || undefined,
          subtotal: newInvoice.subtotal ? Number(newInvoice.subtotal) : 0,
          taxRate: newInvoice.taxRate ? Number(newInvoice.taxRate) : 0.15,
          notes: newInvoice.notes || undefined,
        }),
      });
      const invoice = await res.json();
      setInvoices([invoice, ...invoices]);
      setShowCreateDialog(false);
      setNewInvoice({ clientId: "", subtotal: "", taxRate: "0.15", notes: "" });
    } catch (e) {
      console.error("Failed to create invoice", e);
    }
    setIsCreating(false);
  };

  const updateStatus = (id: string, status: Invoice["status"]) => {
    setInvoices(invoices.map((inv) =>
      inv.id === id ? { ...inv, status } : inv
    ));
  };

  // Calculate totals
  const totalOutstanding = invoices
    .filter((inv) => inv.status === "sent" || inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.totalAmount, 0);

  const totalPaid = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.totalAmount, 0);

  const filteredInvoices = invoices.filter((inv) => {
    const matchesFilter = filter === "all" || inv.status === filter;
    const matchesSearch =
      searchQuery === "" ||
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.notes?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-bl-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-bl-ice">Invoices</h1>
          <p className="text-sm text-bl-ice/40 mt-1">
            {invoices.length} total &bull; {invoices.filter((i) => i.status === "overdue").length} overdue
          </p>
        </div>
        <button
          onClick={() => setShowCreateDialog(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-bl-gold/15 text-bl-gold rounded-xl text-xs font-semibold uppercase tracking-wider border border-bl-gold/20 hover:bg-bl-gold/25 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          Create Invoice
        </button>
      </div>

      {/* Totals */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="spatial-panel p-4">
          <div className="text-[10px] text-bl-ice/40 uppercase tracking-wider mb-1">Outstanding</div>
          <div className="text-lg font-bold text-bl-amber">R{totalOutstanding.toLocaleString()}</div>
        </div>
        <div className="spatial-panel p-4">
          <div className="text-[10px] text-bl-ice/40 uppercase tracking-wider mb-1">Paid</div>
          <div className="text-lg font-bold text-green-400">R{totalPaid.toLocaleString()}</div>
        </div>
        <div className="spatial-panel p-4">
          <div className="text-[10px] text-bl-ice/40 uppercase tracking-wider mb-1">Total</div>
          <div className="text-lg font-bold text-bl-ice">
            R{(totalOutstanding + totalPaid).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bl-ice/30" />
          <input
            placeholder="Search invoices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-bl-glass border border-bl-glass-border rounded-xl text-sm text-bl-ice placeholder:text-bl-ice/30 focus:outline-none focus:border-bl-gold/40 transition-colors"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="h-10 px-4 bg-bl-glass border border-bl-glass-border rounded-xl text-sm text-bl-ice focus:outline-none focus:border-bl-gold/40"
        >
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Invoice List */}
      <div className="space-y-3">
        {filteredInvoices.length === 0 ? (
          <div className="spatial-panel p-12 text-center">
            <Receipt className="w-12 h-12 text-bl-gold/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-bl-ice mb-2">No invoices found</h3>
            <p className="text-sm text-bl-ice/40">
              {searchQuery ? "Try adjusting your search" : "Create your first invoice to get started"}
            </p>
          </div>
        ) : (
          filteredInvoices.map((invoice) => {
            const status = statusConfig[invoice.status];
            return (
              <div key={invoice.id} className="spatial-panel p-5 hover:border-white/10 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-bl-ice tracking-wider">
                        {invoice.invoiceNumber}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider ${status.bg} ${status.color} ${status.border} border`}
                      >
                        {invoice.status === "draft" && <Clock className="w-2.5 h-2.5" />}
                        {invoice.status === "sent" && <Send className="w-2.5 h-2.5" />}
                        {invoice.status === "paid" && <CheckCircle2 className="w-2.5 h-2.5" />}
                        {invoice.status === "overdue" && <AlertTriangle className="w-2.5 h-2.5" />}
                        {status.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-bl-ice/40">
                      <span>Due: {new Date(invoice.dueDate).toLocaleDateString()}</span>
                      <span>Issued: {new Date(invoice.issueDate).toLocaleDateString()}</span>
                      {invoice.notes && <span className="text-bl-ice/30">&bull; {invoice.notes}</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-base font-bold text-bl-gold">
                        {invoice.currency} {invoice.totalAmount.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-bl-ice/30">
                        +{invoice.taxRate * 100}% tax
                      </div>
                    </div>

                    {/* Quick actions */}
                    <div className="flex items-center gap-1.5">
                      {invoice.status === "draft" && (
                        <button
                          onClick={() => updateStatus(invoice.id, "sent")}
                          className="p-2 rounded-lg text-bl-cyan hover:bg-bl-cyan/10 transition-all"
                          title="Mark as Sent"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {invoice.status === "sent" && (
                        <button
                          onClick={() => updateStatus(invoice.id, "paid")}
                          className="p-2 rounded-lg text-green-400 hover:bg-green-400/10 transition-all"
                          title="Mark as Paid"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {(invoice.status === "sent" || invoice.status === "overdue") && (
                        <button
                          onClick={() => updateStatus(invoice.id, "cancelled")}
                          className="p-2 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-all"
                          title="Cancel Invoice"
                        >
                          <Ban className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Create Dialog */}
      {showCreateDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCreateDialog(false)} />
          <div className="relative spatial-panel p-6 w-full max-w-lg mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-semibold text-bl-ice">New Invoice</h2>
              <button
                onClick={() => setShowCreateDialog(false)}
                className="text-bl-ice/40 hover:text-bl-ice transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-bl-ice/50 mb-1.5">Client ID</label>
                <input
                  value={newInvoice.clientId}
                  onChange={(e) => setNewInvoice({ ...newInvoice, clientId: e.target.value })}
                  placeholder="Client identifier (optional)"
                  className="w-full h-10 px-4 bg-bl-glass border border-bl-glass-border rounded-xl text-sm text-bl-ice placeholder:text-bl-ice/30 focus:outline-none focus:border-bl-gold/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-bl-ice/50 mb-1.5">Subtotal (ZAR)</label>
                  <input
                    type="number"
                    value={newInvoice.subtotal}
                    onChange={(e) => setNewInvoice({ ...newInvoice, subtotal: e.target.value })}
                    placeholder="e.g. 25000"
                    className="w-full h-10 px-4 bg-bl-glass border border-bl-glass-border rounded-xl text-sm text-bl-ice placeholder:text-bl-ice/30 focus:outline-none focus:border-bl-gold/40"
                  />
                </div>
                <div>
                  <label className="block text-xs text-bl-ice/50 mb-1.5">Tax Rate</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newInvoice.taxRate}
                    onChange={(e) => setNewInvoice({ ...newInvoice, taxRate: e.target.value })}
                    className="w-full h-10 px-4 bg-bl-glass border border-bl-glass-border rounded-xl text-sm text-bl-ice placeholder:text-bl-ice/30 focus:outline-none focus:border-bl-gold/40"
                  />
                  <p className="text-[10px] text-bl-ice/30 mt-1">Decimal (e.g. 0.15 = 15%)</p>
                </div>
              </div>

              <div>
                <label className="block text-xs text-bl-ice/50 mb-1.5">Notes</label>
                <textarea
                  value={newInvoice.notes}
                  onChange={(e) => setNewInvoice({ ...newInvoice, notes: e.target.value })}
                  placeholder="Optional notes..."
                  rows={3}
                  className="w-full px-4 py-3 bg-bl-glass border border-bl-glass-border rounded-xl text-sm text-bl-ice placeholder:text-bl-ice/30 focus:outline-none focus:border-bl-gold/40 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowCreateDialog(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider border border-white/10 text-bl-ice/60 hover:text-bl-ice hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  disabled={isCreating}
                  className="flex-1 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-bl-gold/15 text-bl-gold border border-bl-gold/20 hover:bg-bl-gold/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isCreating ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-3 h-3 border-2 border-bl-gold border-t-transparent rounded-full animate-spin" />
                      Creating...
                    </span>
                  ) : (
                    "Create Invoice"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
