"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Paperclip,
  Search,
  Clock,
  CheckCircle2,
  User,
  Shield,
} from "lucide-react";
import { supabase, type Profile } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  sender_name: string;
  sender_role: "client" | "admin" | "superadmin";
  project_id: string | null;
  created_at: string;
  read: boolean;
  attachments?: string[];
}

interface Thread {
  project_id: string | null;
  project_name: string;
  last_message: string;
  last_message_at: string;
  unread_count: number;
}

export default function MessagesPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeThread, setActiveThread] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(profileData);

      // Load message threads
      const { data: threadData } = await supabase
        .from("messages")
        .select("project_id, content, created_at, read")
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order("created_at", { ascending: false });

      if (threadData) {
        const threadMap = new Map<string, Thread>();
        for (const msg of threadData) {
          const key = msg.project_id || "general";
          if (!threadMap.has(key)) {
            threadMap.set(key, {
              project_id: msg.project_id,
              project_name: msg.project_id ? `Project #${msg.project_id.slice(0, 8)}` : "General",
              last_message: msg.content,
              last_message_at: msg.created_at,
              unread_count: !msg.read ? 1 : 0,
            });
          } else if (!msg.read) {
            const thread = threadMap.get(key)!;
            thread.unread_count++;
          }
        }
        setThreads(Array.from(threadMap.values()));
      }

      setIsLoading(false);
    }

    loadData();
  }, []);

  useEffect(() => {
    if (!activeThread || !profile) return;

    async function loadMessages() {
      const query = supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });

      if (activeThread === "general") {
        query.is("project_id", null);
      } else {
        query.eq("project_id", activeThread);
      }

      const { data } = await query;
      if (data) setMessages(data as Message[]);
    }

    loadMessages();

    // Real-time subscription for new messages
    const channel = supabase
      .channel(`messages:${activeThread}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          const newMsg = payload.new as Message;
          const matchesThread = activeThread === "general"
            ? !newMsg.project_id
            : newMsg.project_id === activeThread;

          if (matchesThread) {
            setMessages((prev) => [...prev, newMsg]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeThread, profile]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim() || !profile || isSending) return;

    setIsSending(true);
    try {
      const { error } = await supabase.from("messages").insert({
        content: newMessage.trim(),
        sender_id: profile.id,
        project_id: activeThread === "general" ? null : activeThread,
      });

      if (!error) {
        setNewMessage("");
      }
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const filteredThreads = threads.filter((t) =>
    t.project_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse text-[var(--signal-lime)] font-mono">
          LOADING MESSAGES...
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Thread List */}
      <div className="w-80 border-r border-[var(--border)] flex flex-col">
        <div className="p-4 border-b border-[var(--border)]">
          <h2 className="text-lg font-bold mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--spectral-muted)]" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search threads..."
              className="pl-10 bg-[var(--onyx)] border-[var(--border)] rounded-none text-sm"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          {filteredThreads.length === 0 ? (
            <div className="p-4 text-center text-sm text-[var(--spectral-muted)]">
              No conversations yet
            </div>
          ) : (
            filteredThreads.map((thread) => (
              <button
                key={thread.project_id || "general"}
                onClick={() => setActiveThread(thread.project_id || "general")}
                className={`w-full p-4 text-left border-b border-[var(--border)] hover:bg-[var(--onyx-lighter)] transition-colors ${
                  activeThread === (thread.project_id || "general")
                    ? "bg-[var(--signal-lime)]/5 border-l-2 border-l-[var(--signal-lime)]"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-sm font-bold truncate">
                    {thread.project_name}
                  </span>
                  {thread.unread_count > 0 && (
                    <span className="bg-[var(--signal-lime)] text-[var(--onyx)] text-xs px-2 py-0.5 font-mono">
                      {thread.unread_count}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[var(--spectral-muted)] truncate">
                  {thread.last_message}
                </p>
                <span className="text-xs text-[var(--spectral-dim)] mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatTime(thread.last_message_at)}
                </span>
              </button>
            ))
          )}
        </ScrollArea>
      </div>

      {/* Message Area */}
      <div className="flex-1 flex flex-col">
        {!activeThread ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 border border-[var(--border)] flex items-center justify-center">
                <Send className="w-6 h-6 text-[var(--spectral-muted)]" />
              </div>
              <p className="text-[var(--spectral-muted)] font-mono text-sm">
                Select a conversation to start messaging
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4 max-w-3xl mx-auto">
                {messages.map((msg) => {
                  const isOwn = msg.sender_id === profile?.id;
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] ${
                          isOwn
                            ? "bg-[var(--signal-lime)]/10 border border-[var(--signal-lime)]/30"
                            : "bg-[var(--card)] border border-[var(--border)]"
                        } p-4`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {msg.sender_role === "admin" || msg.sender_role === "superadmin" ? (
                            <Shield className="w-3 h-3 text-[var(--signal-lime)]" />
                          ) : (
                            <User className="w-3 h-3 text-[var(--spectral-muted)]" />
                          )}
                          <span className="text-xs font-mono text-[var(--spectral-muted)]">
                            {isOwn ? "You" : msg.sender_name || "Blacklight Team"}
                          </span>
                          <span className="text-xs text-[var(--spectral-dim)]">
                            {formatTime(msg.created_at)}
                          </span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        {msg.attachments && msg.attachments.length > 0 && (
                          <div className="mt-2 flex gap-2">
                            {msg.attachments.map((a, i) => (
                              <a
                                key={i}
                                href={a}
                                className="text-xs text-[var(--signal-lime)] underline flex items-center gap-1"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Paperclip className="w-3 h-3" />
                                Attachment {i + 1}
                              </a>
                            ))}
                          </div>
                        )}
                        {isOwn && (
                          <div className="flex justify-end mt-1">
                            <CheckCircle2 className={`w-3 h-3 ${msg.read ? "text-[var(--signal-lime)]" : "text-[var(--spectral-muted)]"}`} />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="border-t border-[var(--border)] p-4">
              <div className="max-w-3xl mx-auto flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 rounded-none border-[var(--border)]"
                >
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="bg-[var(--onyx)] border-[var(--border)] rounded-none"
                />
                <Button
                  onClick={handleSend}
                  disabled={!newMessage.trim() || isSending}
                  className="shrink-0 bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 rounded-none"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
