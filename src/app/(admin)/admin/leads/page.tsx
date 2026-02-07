"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Mail,
  Phone,
  Building2,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowLeft,
  Filter,
  Search,
  MoreHorizontal,
  Trash2,
  UserCheck,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Lead {
  id: string;
  name: string;
  email: string;
  business_name: string | null;
  business_type: string | null;
  budget_range: string | null;
  message: string;
  status: "new" | "contacted" | "qualified" | "converted" | "archived";
  assigned_to: string | null;
  assigned_to_profile: { full_name: string; email: string } | null;
  created_at: string;
  notes: string | null;
}

const statusConfig = {
  new: { label: "New", color: "bg-[var(--signal-lime)]/10 text-[var(--signal-lime)]", icon: Clock },
  contacted: { label: "Contacted", color: "bg-[var(--electric-purple)]/10 text-[var(--electric-purple)]", icon: Mail },
  qualified: { label: "Qualified", color: "bg-[var(--spectral-white)]/10 text-[var(--spectral-white)]", icon: UserCheck },
  converted: { label: "Converted", color: "bg-[var(--success)]/10 text-[var(--success)]", icon: CheckCircle2 },
  archived: { label: "Archived", color: "bg-[var(--spectral-muted)]/10 text-[var(--spectral-muted)]", icon: XCircle },
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<Lead["status"] | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    async function loadLeads() {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select(`
          *,
          assigned_to_profile:profiles!assigned_to(full_name, email)
        `)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setLeads(data);
      }
      setIsLoading(false);
    }

    loadLeads();
  }, []);

  const updateLeadStatus = async (leadId: string, newStatus: Lead["status"]) => {
    const { error } = await supabase
      .from("contact_submissions")
      .update({ status: newStatus })
      .eq("id", leadId);

    if (!error) {
      setLeads(leads.map((lead) =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      ));
    }
  };

  const deleteLead = async (leadId: string) => {
    const { error } = await supabase
      .from("contact_submissions")
      .delete()
      .eq("id", leadId);

    if (!error) {
      setLeads(leads.filter((lead) => lead.id !== leadId));
      if (selectedLead?.id === leadId) {
        setSelectedLead(null);
      }
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesFilter = filter === "all" || lead.status === filter;
    const matchesSearch =
      searchQuery === "" ||
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.business_name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-[var(--signal-lime)] font-mono">LOADING...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 text-sm text-[var(--spectral-muted)] hover:text-[var(--spectral-white)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </div>
          <h1 className="text-3xl font-black tracking-tighter">Lead Management</h1>
          <p className="text-[var(--spectral-dim)]">
            {leads.length} total submissions • {leads.filter((l) => l.status === "new").length} new
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--spectral-muted)]" />
          <Input
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[var(--onyx)] border-[var(--border)] rounded-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[var(--spectral-muted)]" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as Lead["status"] | "all")}
            className="h-10 px-4 bg-[var(--onyx)] border border-[var(--border)] rounded-none text-sm focus:border-[var(--signal-lime)] focus:outline-none"
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

      {/* Leads Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Lead List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredLeads.length === 0 ? (
            <div className="border border-[var(--border)] bg-[var(--card)] p-12 text-center">
              <Users className="w-12 h-12 text-[var(--spectral-muted)] mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">No leads found</h3>
              <p className="text-[var(--spectral-dim)]">
                {searchQuery ? "Try adjusting your search" : "Contact form submissions will appear here"}
              </p>
            </div>
          ) : (
            filteredLeads.map((lead) => {
              const status = statusConfig[lead.status];
              return (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setSelectedLead(lead)}
                  className={`border bg-[var(--card)] p-6 cursor-pointer transition-all hover:border-[var(--signal-lime)]/50 ${
                    selectedLead?.id === lead.id ? "border-[var(--signal-lime)]" : "border-[var(--border)]"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{lead.name}</h3>
                      <p className="text-sm text-[var(--spectral-muted)]">{lead.email}</p>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1 ${status.color}`}>
                      <status.icon className="w-3 h-3" />
                      <span className="text-xs font-mono uppercase">{status.label}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-[var(--spectral-dim)]">
                    {lead.business_name && (
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        {lead.business_name}
                      </div>
                    )}
                    {lead.budget_range && (
                      <div className="flex items-center gap-2">
                        <span className="text-[var(--signal-lime)]">R</span>
                        {lead.budget_range}
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(lead.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Lead Detail */}
        <div className="border border-[var(--border)] bg-[var(--card)] p-6 h-fit">
          {selectedLead ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-1">{selectedLead.name}</h2>
                <a
                  href={`mailto:${selectedLead.email}`}
                  className="text-sm text-[var(--signal-lime)] hover:underline"
                >
                  {selectedLead.email}
                </a>
              </div>

              <div className="space-y-3">
                {selectedLead.business_name && (
                  <div className="flex items-center gap-3 text-sm">
                    <Building2 className="w-4 h-4 text-[var(--spectral-muted)]" />
                    {selectedLead.business_name}
                  </div>
                )}
                {selectedLead.business_type && (
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="w-4 h-4 text-[var(--spectral-muted)]" />
                    {selectedLead.business_type}
                  </div>
                )}
                {selectedLead.budget_range && (
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-[var(--signal-lime)] font-bold">R</span>
                    Budget: {selectedLead.budget_range}
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-[var(--spectral-muted)]" />
                  Submitted: {new Date(selectedLead.created_at).toLocaleString()}
                </div>
              </div>

              <div className="border-t border-[var(--border)] pt-4">
                <h3 className="text-sm font-mono uppercase text-[var(--spectral-muted)] mb-2">Message</h3>
                <p className="text-sm text-[var(--spectral-dim)] whitespace-pre-wrap">{selectedLead.message}</p>
              </div>

              <div className="border-t border-[var(--border)] pt-4 space-y-3">
                <h3 className="text-sm font-mono uppercase text-[var(--spectral-muted)]">Update Status</h3>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(statusConfig) as Lead["status"][]).map((status) => (
                    <Button
                      key={status}
                      variant="outline"
                      size="sm"
                      onClick={() => updateLeadStatus(selectedLead.id, status)}
                      className={`rounded-none text-xs font-mono uppercase ${
                        selectedLead.status === status
                          ? "bg-[var(--signal-lime)]/20 border-[var(--signal-lime)] text-[var(--signal-lime)]"
                          : "border-[var(--border)]"
                      }`}
                    >
                      {statusConfig[status].label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="border-t border-[var(--border)] pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteLead(selectedLead.id)}
                  className="w-full border-[var(--siren-red)]/50 text-[var(--siren-red)] hover:bg-[var(--siren-red)]/10 rounded-none"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Lead
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-[var(--spectral-muted)]">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Select a lead to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
