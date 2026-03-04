"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { CursorPosition } from "@/lib/annotations";
import { cn } from "@/lib/utils";

interface CursorPresenceProps {
  projectId: string;
  className?: string;
}

export function CursorPresence({ projectId, className }: CursorPresenceProps) {
  const [cursors, setCursors] = useState<CursorPosition[]>([]);

  useEffect(() => {
    const setupChannel = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const channel = supabase.channel(`cursors:${projectId}`, {
        config: {
          presence: {
            key: `user_${projectId}`,
          },
        },
      });

      channel.on("presence", { event: "sync" }, () => {
        const state = channel.presenceState<Record<string, CursorPosition>>();
        const allCursors: CursorPosition[] = [];

        Object.entries(state).forEach(([, presences]) => {
          presences.forEach((presence) => {
            if (presence && typeof presence === 'object' && 'user_id' in presence) {
              allCursors.push(presence as unknown as CursorPosition);
            }
          });
        });

        setCursors(allCursors.filter((c) => c.user_id !== user.id));
      });

      channel.on("presence", { event: "join" }, ({ newPresences }) => {
        setCursors((prev) => {
          const rawCursor = newPresences[0];
          if (!rawCursor || typeof rawCursor !== 'object') return prev;

          const newCursor = rawCursor as unknown as CursorPosition;
          if (newCursor.user_id && newCursor.user_id !== user.id && !prev.find((c) => c.user_id === newCursor.user_id)) {
            return [...prev, newCursor];
          }
          return prev;
        });
      });

      channel.on("presence", { event: "leave" }, ({ leftPresences }) => {
        setCursors((prev) => {
          const leftCursor = leftPresences[0] as unknown as CursorPosition;
          if (leftCursor && leftCursor.user_id) {
            return prev.filter((c) => c.user_id !== leftCursor.user_id);
          }
          return prev;
        });
      });

      await channel.subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            user_id: user.id,
            user_name: user.user_metadata?.full_name || user.email || "Anonymous",
            x: 0,
            y: 0,
            updated_at: new Date().toISOString(),
          });
        }
      });

      const handleMouseMove = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const canvas = target.closest('[data-annotation-canvas="true"]');

        if (canvas) {
          const rect = canvas.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;

          channel.track({
            user_id: user.id,
            user_name: user.user_metadata?.full_name || user.email || "Anonymous",
            x,
            y,
            updated_at: new Date().toISOString(),
          });
        }
      };

      document.addEventListener("mousemove", handleMouseMove);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        channel.unsubscribe();
      };
    };

    setupChannel();
  }, [projectId]);

  const colors = [
    "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899",
  ];

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {cursors.map((cursor) => {
        const colorIndex = cursor.user_id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
        const color = colors[colorIndex];

        return (
          <div
            key={cursor.user_id}
            className="absolute transition-all duration-100"
            style={{
              left: `${cursor.x}%`,
              top: `${cursor.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              style={{
                filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.3))`,
              }}
            >
              <path
                d="M5 2L17 10L10 11L8 18L5 2Z"
                fill={color}
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>
            <div
              className="ml-4 px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap"
              style={{
                backgroundColor: color,
                color: "white",
              }}
            >
              {cursor.user_name}
            </div>
          </div>
        );
      })}
    </div>
  );
}
