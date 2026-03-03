"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { RealtimeChannel } from "@supabase/supabase-js";

interface Notification {
  id: string;
  type: "message" | "project_update" | "lead" | "system";
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  data?: any;
}

export function useNotifications(userId: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!userId) return;

    // Load initial notifications
    async function loadNotifications() {
      const { data } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(50);

      if (data) {
        setNotifications(data);
      }
    }

    loadNotifications();

    // Set up real-time subscription
    const notificationsChannel = supabase
      .channel(`notifications:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setNotifications((prev) => [payload.new as Notification, ...prev]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setNotifications((prev) =>
            prev.map((n) =>
              n.id === payload.new.id ? (payload.new as Notification) : n
            )
          );
        }
      )
      .subscribe();

    setChannel(notificationsChannel);

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [userId]);

  const markAsRead = async (notificationId: string) => {
    await supabase
      .from("notifications")
      .update({ read: true })
      .eq("id", notificationId);
  };

  const markAllAsRead = async () => {
    await supabase
      .from("notifications")
      .update({ read: true })
      .eq("user_id", userId);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    notifications,
    markAsRead,
    markAllAsRead,
    unreadCount,
  };
}

export async function createNotification(
  userId: string,
  type: Notification["type"],
  title: string,
  message: string,
  data?: any
) {
  const { data: notification, error } = await supabase
    .from("notifications")
    .insert({
      user_id: userId,
      type,
      title,
      message,
      data,
      read: false,
    })
    .select()
    .single();

  if (error) {
    console.error("Failed to create notification:", error);
    return null;
  }

  return notification;
}
