"use client";

import { useState } from "react";
import {
  Palette,
  Calendar,
  Clock,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Music,
  Youtube,
  Send,
  CheckCircle2,
  Plus,
} from "lucide-react";

type Platform = "instagram" | "linkedin" | "twitter" | "facebook" | "tiktok" | "youtube";

interface ScheduledPost {
  id: string;
  platform: Platform;
  content: string;
  scheduledDate: Date;
  status: "draft" | "scheduled" | "published";
}

const platformIcons: Record<Platform, any> = {
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  tiktok: Music,
  youtube: Youtube,
};

const platformColors: Record<Platform, string> = {
  instagram: "text-pink-400",
  linkedin: "text-blue-400",
  twitter: "text-sky-400",
  facebook: "text-blue-600",
  tiktok: "text-white",
  youtube: "text-red-500",
};

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function SocialPage() {
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([
    {
      id: "1",
      platform: "instagram",
      content: "Behind the scenes of our latest project 🎬",
      scheduledDate: new Date(currentYear, currentMonth, 15, 10, 0),
      status: "scheduled",
    },
    {
      id: "2",
      platform: "linkedin",
      content: "New case study: How we improved performance by 300%",
      scheduledDate: new Date(currentYear, currentMonth, 18, 14, 0),
      status: "scheduled",
    },
    {
      id: "3",
      platform: "twitter",
      content: "Exciting announcement coming next week! 🚀",
      scheduledDate: new Date(currentYear, currentMonth, 22, 9, 0),
      status: "draft",
    },
  ]);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const postsForDay = (day: number) => {
    return scheduledPosts.filter(
      (p) =>
        p.scheduledDate.getDate() === day &&
        p.scheduledDate.getMonth() === currentMonth &&
        p.scheduledDate.getFullYear() === currentYear
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const monthName = new Date(currentYear, currentMonth).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-bl-ice">Social Dashboard</h1>
        <p className="text-sm text-bl-ice/40 mt-1">
          Schedule and manage your social media content
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="spatial-panel p-4">
          <div className="text-[10px] text-bl-ice/40 uppercase tracking-wider mb-1">Scheduled</div>
          <div className="text-lg font-bold text-bl-cyan">
            {scheduledPosts.filter((p) => p.status === "scheduled").length}
          </div>
        </div>
        <div className="spatial-panel p-4">
          <div className="text-[10px] text-bl-ice/40 uppercase tracking-wider mb-1">Drafts</div>
          <div className="text-lg font-bold text-bl-amber">
            {scheduledPosts.filter((p) => p.status === "draft").length}
          </div>
        </div>
        <div className="spatial-panel p-4">
          <div className="text-[10px] text-bl-ice/40 uppercase tracking-wider mb-1">Published</div>
          <div className="text-lg font-bold text-green-400">
            {scheduledPosts.filter((p) => p.status === "published").length}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 spatial-panel p-6">
          {/* Calendar header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold text-bl-ice">{monthName}</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={prevMonth}
                className="px-3 py-1.5 rounded-lg text-xs text-bl-ice/40 hover:text-bl-ice hover:bg-white/5 transition-all border border-white/5"
              >
                &larr; Prev
              </button>
              <button
                onClick={() => {
                  setCurrentMonth(now.getMonth());
                  setCurrentYear(now.getFullYear());
                }}
                className="px-3 py-1.5 rounded-lg text-xs text-bl-ice/40 hover:text-bl-ice hover:bg-white/5 transition-all border border-white/5"
              >
                Today
              </button>
              <button
                onClick={nextMonth}
                className="px-3 py-1.5 rounded-lg text-xs text-bl-ice/40 hover:text-bl-ice hover:bg-white/5 transition-all border border-white/5"
              >
                Next &rarr;
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {days.map((d) => (
              <div key={d} className="text-[10px] text-bl-ice/30 uppercase tracking-wider text-center font-medium py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells before first day */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Day cells */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayPosts = postsForDay(day);
              return (
                <div
                  key={day}
                  className={`aspect-square rounded-xl border transition-all p-1.5 flex flex-col ${
                    isToday(day)
                      ? "border-bl-gold/40 bg-bl-gold/5"
                      : "border-white/5 hover:border-white/10"
                  }`}
                >
                  <span
                    className={`text-xs font-medium ${
                      isToday(day) ? "text-bl-gold" : "text-bl-ice/60"
                    }`}
                  >
                    {day}
                  </span>
                  <div className="flex-1 flex flex-col gap-0.5 mt-1 overflow-hidden">
                    {dayPosts.slice(0, 3).map((post) => {
                      const Icon = platformIcons[post.platform];
                      return (
                        <div
                          key={post.id}
                          className={`flex items-center gap-1 px-1 py-0.5 rounded text-[8px] leading-tight ${
                            post.status === "draft"
                              ? "bg-bl-amber/10"
                              : post.status === "scheduled"
                              ? "bg-bl-cyan/10"
                              : "bg-green-400/10"
                          }`}
                        >
                          <Icon className="w-2 h-2 shrink-0" />
                          <span className="truncate text-bl-ice/60">{post.content.slice(0, 20)}...</span>
                        </div>
                      );
                    })}
                    {dayPosts.length > 3 && (
                      <span className="text-[8px] text-bl-ice/30 pl-1">+{dayPosts.length - 3} more</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming posts sidebar */}
        <div className="spatial-panel p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-bl-ice">Upcoming Posts</h2>
            <button className="p-1.5 rounded-lg text-bl-gold hover:bg-bl-gold/10 transition-all">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {scheduledPosts.length === 0 ? (
              <div className="text-center py-8 text-bl-ice/40 text-xs">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-bl-gold/30" />
                <p>No posts scheduled yet</p>
              </div>
            ) : (
              scheduledPosts
                .sort((a, b) => a.scheduledDate.getTime() - b.scheduledDate.getTime())
                .map((post) => {
                  const Icon = platformIcons[post.platform];
                  const platformColor = platformColors[post.platform];
                  return (
                    <div
                      key={post.id}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className={`w-3.5 h-3.5 ${platformColor}`} />
                        <span className="text-[10px] font-medium capitalize text-bl-ice/60">
                          {post.platform}
                        </span>
                        <span
                          className={`ml-auto text-[8px] px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
                            post.status === "draft"
                              ? "text-bl-amber bg-bl-amber/10"
                              : post.status === "scheduled"
                              ? "text-bl-cyan bg-bl-cyan/10"
                              : "text-green-400 bg-green-400/10"
                          }`}
                        >
                          {post.status}
                        </span>
                      </div>
                      <p className="text-xs text-bl-ice/80 line-clamp-2 mb-2">{post.content}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-bl-ice/40 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          {post.scheduledDate.toLocaleDateString()} at{" "}
                          {post.scheduledDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        {post.status === "draft" && (
                          <button className="text-[10px] text-bl-gold hover:text-bl-gold/80 transition-colors">
                            <Send className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
