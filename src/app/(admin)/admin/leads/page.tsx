"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Mail,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Search,
  MessageSquare,
  DollarSign,
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  businessName: string;
  businessType: string;
  budgetRange: string;
  message: string;
  status: "new" | "contacted" | "qualified" | "converted" | "archived";
  createdAt: string;
  updatedAt: string;
}

const statusConfig: Record<Lead["status"], { label: string; color: string; bg: string; border: string }> = {
  new: { label: "New", color: "text-bl-amber", bg: "bg-bl-amber/10", border: "border-bl-amber/20" },
  contacted: { label: "Contacted", color: "text-bl-cyan", bg: "bg-bl-cyan/10", border: "border-bl-cyan/20" },
  qualified: { label: "Qualified", color: "text-bl-gold", bg: "bg-bl-gold/10", border: "border-bl-gold/20" },
  converted: { label: "Converted", color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20" },
  archived: { label: "Archived", color: "text-bl-text-muted", bg: "bg-white/5", border: "border-white/10" },
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    async function loadLeads() {
      try {
        const res = await fetch("/api/contact");
        const data = await res.json();
        setLeads(data);
      } catch (e) {
        console.error("Failed to load leads", e);
      }
      setIsLoading(false);
    }
    loadLeads();
  }, []);

  const updateLeadStatus = async (leadId: string, newStatus: Lead["status"]) => {
    setLeads(leads.map((lead) =>
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    ));
    if (selectedLead?.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesFilter = filter === "all" || lead.status === filter;
    const matchesSearch =
      searchQuery === "" ||
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.businessName?.toLowerCase().includes(searchQuery.toLowerCase());
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
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-bl-ice">Leads</h1>
        <p className="text-sm text-bl-ice/40 mt-1">
          {leads.length} total submissions &bull; {leads.filter((l) => l.status === "new").length} new
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bl-ice/30" />
          <input
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-bl-glass border border-bl-glass-border rounded-xl text-sm text-bl-ice placeholder:text-bl-ice/30 focus:outline-none focus:border-bl-gold/40 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="h-10 px-4 bg-bl-glass border border-bl-glass-border rounded-xl text-sm text-bl-ice focus:outline-none focus:border-bl-gold/40 transition-colors"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Leads List */}
        <div className="lg:col-span-2 space-y-3">
          {filteredLeads.length === 0 ? (
            <div className="spatial-panel p-12 text-center">
              <Users className="w-12 h-12 text-bl-gold/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-bl-ice mb-2">No leads found</h3>
              <p className="text-sm text-bl-ice/40">
                {searchQuery ? "Try adjusting your search or filter" : "Contact form submissions will appear here"}
              </p>
            </div>
          ) : (
            filteredLeads.map((lead) => {
              const status = statusConfig[lead.status];
              return (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`spatial-panel p-5 cursor-pointer transition-all duration-200 ${
                    selectedLead?.id === lead.id
                      ? "border-bl-gold/30 rim-light"
                      : "hover:border-white/10"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-semibold text-bl-ice">{lead.name}</h3>
                      <p className="text-xs text-bl-ice/50 mt-0.5">{lead.email}</p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider ${status.bg} ${status.color} ${status.border} border`}
                    >
                      {lead.status === "new" && <Clock className="w-2.5 h-2.5" />}
                      {lead.status === "contacted" && <Mail className="w-2.5 h-2.5" />}
                      {(lead.status === "qualified" || lead.status === "converted") && <CheckCircle2 className="w-2.5 h-2.5" />}
                      {status.label}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-bl-ice/50">
                    {lead.businessName && (
                      <span className="flex items-center gap-1.5">
                        <Building2 className="w-3 h-3" />
                        {lead.businessName}
                      </span>
                    )}
                    {lead.businessType && (
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3 h-3" />
                        {lead.businessType}
                      </span>
                    )}
                    {lead.budgetRange && (
                      <span className="flex items-center gap-1.5 text-bl-gold">
                        <DollarSign className="w-3 h-3" />
                        {lead.budgetRange}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {lead.message && (
                    <p className="mt-3 text-xs text-bl-ice/40 line-clamp-2 border-t border-white/5 pt-3">
                      <MessageSquare className="w-3 h-3 inline mr-1 opacity-50" />
                      {lead.message}
                    </p>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Lead Detail Panel */}
        <div className="spatial-panel p-6 h-fit lg:sticky lg:top-6">
          {selectedLead ? (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-semibold text-bl-ice mb-1">{selectedLead.name}</h2>
                <a
                  href={`mailto:${selectedLead.email}`}
                  className="text-xs text-bl-gold hover:text-bl-gold/80 transition-colors"
                >
                  {selectedLead.email}
                </a>
              </div>

              <div className="space-y-2.5 text-xs">
                {selectedLead.businessName && (
                  <div className="flex items-center gap-2.5 text-bl-ice/60">
                    <Building2 className="w-3.5 h-3.5 text-bl-ice/30 shrink-0" />
                    <span>{selectedLead.businessName}</span>
                  </div>
                )}
                {selectedLead.businessType && (
                  <div className="flex items-center gap-2.5 text-bl-ice/60">
                    <Users className="w-3.5 h-3.5 text-bl-ice/30 shrink-0" />
                    <span>{selectedLead.businessType}</span>
                  </div>
                )}
                {selectedLead.budgetRange && (
                  <div className="flex items-center gap-2.5 text-bl-gold">
                    <DollarSign className="w-3.5 h-3.5 shrink-0" />
                    <span>Budget: {selectedLead.budgetRange}</span>
                  </div>
                )}
                <div className="flex items-center gap-2.5 text-bl-ice/60">
                  <Calendar className="w-3.5 h-3.5 text-bl-ice/30 shrink-0" />
                  <span>Submitted: {new Date(selectedLead.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4">
                <h3 className="text-[10px] font-semibold uppercase tracking-widest text-bl-ice/30 mb-2">Message</h3>
                <p className="text-xs text-bl-ice/60 whitespace-pre-wrap leading-relaxed">{selectedLead.message}</p>
              </div>

              <div className="border-t border-white/5 pt-4">
                <h3 className="text-[10px] font-semibold uppercase tracking-widest text-bl-ice/30 mb-3">Update Status</h3>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(statusConfig) as Lead["status"][]).map((status) => (
                    <button
                      key={status}
                      onClick={() => updateLeadStatus(selectedLead.id, status)}
                      className={`px-3 py-2 rounded-xl text-[10px] font-medium uppercase tracking-wider transition-all border ${
                        selectedLead.status === status
                          ? `${statusConfig[status].bg} ${statusConfig[status].color} ${statusConfig[status].border}`
                          : "border-white/5 text-bl-ice/40 hover:border-white/10 hover:text-bl-ice/60"
                      }`}
                    >
                      {statusConfig[status].label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-10 h-10 text-bl-gold/30 mx-auto mb-3" />
              <p className="text-xs text-bl-ice/40">Select a lead to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
