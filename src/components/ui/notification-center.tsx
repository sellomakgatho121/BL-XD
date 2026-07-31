"use client";

import { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";

const icons: Record<string, any> = {
  message: Bell,
  project_update: Bell,
  lead: Bell,
  system: Bell,
};

const iconColors: Record<string, string> = {
  message: "#CCFF00",
  project_update: "#00CCFF",
  lead: "#D7FF00",
  system: "#00FF88",
};

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("/api/notifications")
      .then((r) => r.json())
      .then(setNotifications)
      .catch(() => {});
  }, []);

  const unread = notifications.filter((n: any) => !n.read).length;

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative p-2 text-bl-ice/40 hover:text-bl-ice transition-colors">
        <Bell size={16} />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-bl-gold text-bl-deep text-[8px] font-bold rounded-full flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-72 z-50 bg-bl-slate/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            <div className="p-3 border-b border-white/5 flex items-center justify-between">
              <span className="text-xs font-semibold text-bl-ice">Notifications</span>
              <button onClick={() => setOpen(false)} className="text-bl-ice/20"><X size={12} /></button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-xs text-bl-ice/30">No notifications</div>
              ) : (
                notifications.map((n: any) => {
                  const Icon = icons[n.type] || Bell;
                  return (
                    <div key={n.id} className={`p-3 border-b border-white/5 flex gap-3 ${!n.read ? "bg-bl-gold/[0.02]" : ""}`}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${iconColors[n.type] || "#666"}15`, color: iconColors[n.type] || "#666" }}>
                        <Icon size={12} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-bl-ice font-medium">{n.title}</p>
                        <p className="text-[10px] text-bl-ice/40 mt-0.5">{n.message}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
