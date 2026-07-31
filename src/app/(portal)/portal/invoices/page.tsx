"use client";

import { useEffect, useState } from "react";
import { Receipt, Download } from "lucide-react";

const statusColors: Record<string, string> = {
  draft: "#666", sent: "#CCFF00", paid: "#00FF88", overdue: "#FF006E", cancelled: "#333",
};

export default function PortalInvoices() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/invoices")
      .then((r) => r.json())
      .then(setInvoices)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center pt-20"><div className="w-8 h-8 border-2 border-bl-gold border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-bl-ice mb-8">Invoices</h1>
      {invoices.length === 0 ? (
        <div className="spatial-panel p-10 rounded-2xl border border-white/5 text-center">
          <Receipt size={32} className="text-bl-ice/20 mx-auto mb-4" />
          <p className="text-sm text-bl-ice/40">No invoices yet</p>
        </div>
      ) : (
        <div className="spatial-panel rounded-2xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left p-4 text-[10px] tracking-wider uppercase text-bl-ice/30 font-normal">Invoice</th>
                  <th className="text-left p-4 text-[10px] tracking-wider uppercase text-bl-ice/30 font-normal">Amount</th>
                  <th className="text-left p-4 text-[10px] tracking-wider uppercase text-bl-ice/30 font-normal">Status</th>
                  <th className="text-left p-4 text-[10px] tracking-wider uppercase text-bl-ice/30 font-normal">Due</th>
                  <th className="text-right p-4 text-[10px] tracking-wider uppercase text-bl-ice/30 font-normal">Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <div className="text-xs text-bl-ice">{inv.invoiceNumber}</div>
                      {inv.projectId && <div className="text-[10px] text-bl-ice/30">{inv.projectId}</div>}
                    </td>
                    <td className="p-4 text-xs text-bl-ice">R {((inv.totalAmount || inv.subtotal || 0)).toLocaleString()}</td>
                    <td className="p-4">
                      <span className="text-[10px] px-2 py-0.5 rounded-full border capitalize" style={{ borderColor: `${statusColors[inv.status] || "#666"}30`, color: statusColors[inv.status] || "#666", backgroundColor: `${statusColors[inv.status] || "#666"}10` }}>{inv.status}</span>
                    </td>
                    <td className="p-4 text-xs text-bl-ice/40">{inv.dueDate}</td>
                    <td className="p-4 text-right">
                      <button className="text-[10px] text-bl-gold/60 hover:text-bl-gold flex items-center gap-1 ml-auto"><Download size={10} /> PDF</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
