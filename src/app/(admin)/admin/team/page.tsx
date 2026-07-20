"use client";

import { useEffect, useState } from "react";
import {
  UserPlus,
  Search,
  Mail,
  Calendar,
  DollarSign,
  MapPin,
  Star,
  Linkedin,
  Twitter,
  Github,
  ChevronDown,
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "developer" | "designer" | "project_manager" | "sales" | "support" | "admin";
  department: string;
  bio?: string;
  specialties: string[];
  hourlyRate?: number;
  isActive: boolean;
  hireDate: string;
  avatarUrl?: string;
  socialLinks?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

const roleConfig = {
  developer: { label: "Developer", color: "text-bl-cyan", bg: "bg-bl-cyan/10", border: "border-bl-cyan/20" },
  designer: { label: "Designer", color: "text-bl-amber", bg: "bg-bl-amber/10", border: "border-bl-amber/20" },
  project_manager: { label: "Project Manager", color: "text-bl-gold", bg: "bg-bl-gold/10", border: "border-bl-gold/20" },
  sales: { label: "Sales", color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20" },
  support: { label: "Support", color: "text-bl-ice/60", bg: "bg-white/5", border: "border-white/10" },
  admin: { label: "Admin", color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/20" },
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    async function loadTeam() {
      try {
        const res = await fetch("/api/team");
        const data = await res.json();
        setMembers(data);
      } catch (e) {
        console.error("Failed to load team", e);
      }
      setIsLoading(false);
    }
    loadTeam();
  }, []);

  const filteredMembers = members.filter((m) => {
    const matchesFilter = filter === "all" || m.role === filter;
    const matchesSearch =
      searchQuery === "" ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.department.toLowerCase().includes(searchQuery.toLowerCase());
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-bl-ice">Team</h1>
          <p className="text-sm text-bl-ice/40 mt-1">
            {members.length} members &bull; {members.filter((m) => m.isActive).length} active
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-bl-gold/15 text-bl-gold rounded-xl text-xs font-semibold uppercase tracking-wider border border-bl-gold/20 hover:bg-bl-gold/25 transition-all">
          <UserPlus className="w-3.5 h-3.5" />
          Add Member
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bl-ice/30" />
          <input
            placeholder="Search team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-bl-glass border border-bl-glass-border rounded-xl text-sm text-bl-ice placeholder:text-bl-ice/30 focus:outline-none focus:border-bl-gold/40 transition-colors"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="h-10 px-4 bg-bl-glass border border-bl-glass-border rounded-xl text-sm text-bl-ice focus:outline-none focus:border-bl-gold/40"
        >
          <option value="all">All Roles</option>
          <option value="developer">Developers</option>
          <option value="designer">Designers</option>
          <option value="project_manager">Project Managers</option>
          <option value="sales">Sales</option>
          <option value="support">Support</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Team Grid */}
      {filteredMembers.length === 0 ? (
        <div className="spatial-panel p-12 text-center">
          <UserPlus className="w-12 h-12 text-bl-gold/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-bl-ice mb-2">No team members found</h3>
          <p className="text-sm text-bl-ice/40">
            {searchQuery ? "Try adjusting your search" : "Add your first team member to get started"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.map((member) => {
            const role = roleConfig[member.role];
            return (
              <div
                key={member.id}
                className="spatial-panel p-5 hover:border-white/10 transition-all group"
              >
                {/* Avatar & Name */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-bl-glass border border-white/10 flex items-center justify-center shrink-0">
                    {member.avatarUrl ? (
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-bold text-bl-gold">{initials(member.name)}</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-bl-ice truncate">{member.name}</h3>
                    <p className="text-xs text-bl-ice/50 truncate">{member.email}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full shrink-0 mt-2 ${member.isActive ? "bg-green-400" : "bg-bl-ice/20"}`} />
                </div>

                {/* Role badge */}
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider mb-3 border ${role.bg} ${role.color} ${role.border}`}>
                  {role.label}
                </div>

                {/* Department */}
                <div className="flex items-center gap-1.5 text-xs text-bl-ice/50 mb-2">
                  <MapPin className="w-3 h-3" />
                  {member.department}
                </div>

                {/* Specialties */}
                {member.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {member.specialties.slice(0, 3).map((s, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 bg-bl-gold/10 text-bl-gold/80 rounded-full">
                        {s}
                      </span>
                    ))}
                    {member.specialties.length > 3 && (
                      <span className="text-[10px] text-bl-ice/30">+{member.specialties.length - 3}</span>
                    )}
                  </div>
                )}

                {/* Details row */}
                <div className="flex items-center gap-3 text-xs text-bl-ice/40 border-t border-white/5 pt-3 mt-auto">
                  {member.hourlyRate && (
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      {member.hourlyRate}/hr
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(member.hireDate).toLocaleDateString()}
                  </span>
                </div>

                {/* Social links */}
                {member.socialLinks && Object.keys(member.socialLinks).length > 0 && (
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
                    {member.socialLinks.linkedin && (
                      <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-bl-ice/30 hover:text-bl-cyan hover:bg-bl-cyan/10 transition-all">
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.socialLinks.twitter && (
                      <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-bl-ice/30 hover:text-bl-cyan hover:bg-bl-cyan/10 transition-all">
                        <Twitter className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.socialLinks.github && (
                      <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-bl-ice/30 hover:text-bl-ice/60 hover:bg-white/5 transition-all">
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
