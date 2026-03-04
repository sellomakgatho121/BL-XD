"use client";

import { useState } from "react";
import { Bell, X, Check, CheckCheck, MessageSquare, FolderKanban, Users, Settings } from "lucide-react";
import { useNotifications } from "@/lib/notifications";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const typeIcons = {
  message: MessageSquare,
  project_update: FolderKanban,
  lead: Users,
  system: Settings,
};

const typeColors = {
  message: "text-[var(--signal-lime)]",
  project_update: "text-[var(--electric-purple)]",
  lead: "text-[var(--siren-red)]",
  system: "text-[var(--spectral-muted)]",
};

export function NotificationCenter({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications(userId);

  return (
    <div className="relative">
      {/* Bell Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-[var(--signal-lime)]/10"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--siren-red)] text-[var(--spectral-white)] text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </Button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Content */}
          <div
            className="absolute right-0 top-12 w-96 bg-[var(--card)] border border-[var(--border)] rounded-none shadow-xl z-50 animate-in slide-in-from-top-2 fade-in duration-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
              <h3 className="font-bold">Notifications</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs text-[var(--signal-lime)] hover:text-[var(--signal-lime)]/80"
                  >
                    <CheckCheck className="w-3 h-3 mr-1" />
                    Mark all read
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-[var(--spectral-muted)]/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Notifications List */}
            <ScrollArea className="h-96">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-[var(--spectral-muted)]">
                  <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-[var(--border)]">
                  {notifications.map((notification) => {
                    const Icon = typeIcons[notification.type];
                    const colorClass = typeColors[notification.type];

                    return (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-[var(--spectral-muted)]/5 cursor-pointer transition-colors animate-in slide-in-from-left-2 fade-in duration-300 ${!notification.read ? "bg-[var(--signal-lime)]/5" : ""
                          }`}
                        onClick={() => {
                          if (!notification.read) {
                            markAsRead(notification.id);
                          }
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-full bg-[var(--onyx)] ${colorClass}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold text-sm truncate">{notification.title}</h4>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-[var(--signal-lime)] rounded-full" />
                              )}
                            </div>
                            <p className="text-sm text-[var(--spectral-dim)] mb-2">{notification.message}</p>
                            <p className="text-xs text-[var(--spectral-muted)]">
                              {new Date(notification.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </div>
        </>
      )}
    </div>
  );
}
