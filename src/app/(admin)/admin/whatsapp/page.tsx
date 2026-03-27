"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Users, DollarSign, TrendingUp, Send, Settings, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase/client";

interface WhatsAppStats {
  totalConversations: number;
  activeConversations: number;
  totalRevenue: number;
  avgResponseTime: string;
}

interface Conversation {
  id: string;
  customer_phone: string;
  customer_name?: string;
  status: string;
  started_at: string;
  last_message_at: string;
}

export default function WhatsAppDashboard() {
  const [stats, setStats] = useState<WhatsAppStats>({
    totalConversations: 0,
    activeConversations: 0,
    totalRevenue: 0,
    avgResponseTime: "< 1 min",
  });
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "conversations" | "analytics">("overview");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setIsLoading(true);
    try {
      const { data: convData } = await supabase
        .from('whatsapp_conversations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (convData) {
        const active = convData.filter(c => c.status === 'active').length;
        setStats(prev => ({
          ...prev,
          totalConversations: convData.length,
          activeConversations: active,
        }));
        setConversations(convData);
      }

      const { data: orderData } = await supabase
        .from('orders')
        .select('total_amount')
        .eq('payment_status', 'paid');

      if (orderData) {
        const total = orderData.reduce((sum, o) => sum + (o.total_amount || 0), 0);
        setStats(prev => ({ ...prev, totalRevenue: total }));
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const statCards = [
    {
      label: "Total Conversations",
      value: stats.totalConversations,
      icon: MessageCircle,
      color: "text-[#25D366]",
    },
    {
      label: "Active Now",
      value: stats.activeConversations,
      icon: Users,
      color: "text-[#25D366]",
    },
    {
      label: "Total Revenue",
      value: `R${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-[#25D366]",
    },
    {
      label: "Avg Response",
      value: stats.avgResponseTime,
      icon: TrendingUp,
      color: "text-[#25D366]",
    },
  ];

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
          <h1 className="text-3xl font-black tracking-tighter">
            WhatsApp <span className="text-[#25D366]">AI</span> Storefront
          </h1>
          <p className="text-[var(--spectral-dim)]">Manage your WhatsApp commerce</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-[var(--border)]">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button className="bg-[#25D366] text-black hover:bg-[#25D366]/90">
            <Send className="w-4 h-4 mr-2" />
            Broadcast
          </Button>
        </div>
      </div>

      <div className="flex gap-2 border-b border-[var(--border)] pb-2">
        <Button
          variant={activeTab === "overview" ? "default" : "ghost"}
          onClick={() => setActiveTab("overview")}
          className={activeTab === "overview" ? "bg-[var(--signal-lime)] text-[var(--onyx)]" : ""}
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          Overview
        </Button>
        <Button
          variant={activeTab === "conversations" ? "default" : "ghost"}
          onClick={() => setActiveTab("conversations")}
          className={activeTab === "conversations" ? "bg-[var(--signal-lime)] text-[var(--onyx)]" : ""}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Conversations
        </Button>
        <Button
          variant={activeTab === "analytics" ? "default" : "ghost"}
          onClick={() => setActiveTab("analytics")}
          className={activeTab === "analytics" ? "bg-[var(--signal-lime)] text-[var(--onyx)]" : ""}
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          Analytics
        </Button>
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="border border-[var(--border)] bg-[var(--card)] p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--spectral-muted)]">
                    {stat.label}
                  </span>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-3xl font-black tracking-tighter">
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="border border-[var(--border)] bg-[var(--card)] p-6">
              <h3 className="font-bold mb-4">Recent Conversations</h3>
              <div className="space-y-3">
                {conversations.slice(0, 5).map((conv) => (
                  <div
                    key={conv.id}
                    className="flex items-center justify-between p-3 bg-[var(--onyx)]"
                  >
                    <div>
                      <p className="font-mono text-sm">{conv.customer_phone}</p>
                      <p className="text-xs text-[var(--spectral-muted)]">
                        {new Date(conv.last_message_at).toLocaleString()}
                      </p>
                    </div>
                    <Badge
                      variant={conv.status === "active" ? "default" : "outline"}
                      className={conv.status === "active" ? "bg-[#25D366]/20 text-[#25D366]" : ""}
                    >
                      {conv.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-[var(--border)] bg-[var(--card)] p-6">
              <h3 className="font-bold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-20 flex-col">
                  <Send className="w-5 h-5 mb-2" />
                  <span className="text-xs">Send Message</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <BarChart3 className="w-5 h-5 mb-2" />
                  <span className="text-xs">View Reports</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Settings className="w-5 h-5 mb-2" />
                  <span className="text-xs">AI Settings</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <DollarSign className="w-5 h-5 mb-2" />
                  <span className="text-xs">Payments</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "conversations" && (
        <div className="border border-[var(--border)] bg-[var(--card)]">
          <div className="p-4 border-b border-[var(--border)]">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full max-w-md bg-[var(--onyx)] border border-[var(--border)] px-4 py-2 text-sm"
            />
          </div>
          <div className="divide-y divide-[var(--border)]">
            {conversations.map((conv) => (
              <div key={conv.id} className="p-4 flex items-center justify-between hover:bg-[var(--onyx)]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div>
                    <p className="font-mono">{conv.customer_phone}</p>
                    <p className="text-xs text-[var(--spectral-muted)]">
                      Started {new Date(conv.started_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={conv.status === "active" ? "default" : "outline"}
                    className={conv.status === "active" ? "bg-[#25D366]/20 text-[#25D366]" : ""}
                  >
                    {conv.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="border border-[var(--border)] bg-[var(--card)] p-12 text-center">
          <TrendingUp className="w-12 h-12 text-[var(--spectral-muted)] mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Analytics Coming Soon</h3>
          <p className="text-[var(--spectral-dim)]">
            Detailed analytics and reporting will be available after more data is collected.
          </p>
        </div>
      )}
    </div>
  );
}
