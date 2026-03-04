"use client";

import { useEffect, useState } from "react";
import {
  Users,
  UserPlus,
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  Filter,
  Search,
  MoreHorizontal,
  Star,
  MapPin,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TeamMember {
  id: string;
  user_id: string;
  role: string;
  department: string;
  bio: string;
  specialties: string[];
  hourly_rate: number;
  is_active: boolean;
  hire_date: string;
  avatar_url: string;
  social_links: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  user: {
    full_name: string;
    email: string;
  };
  availability: Array<{
    day_of_week: number;
    start_time: string;
    end_time: string;
    is_available: boolean;
  }>;
}

const roleConfig = {
  developer: { label: "Developer", color: "text-[var(--electric-purple)]" },
  designer: { label: "Designer", color: "text-[var(--signal-lime)]" },
  project_manager: { label: "Project Manager", color: "text-[var(--spectral-white)]" },
  sales: { label: "Sales", color: "text-[var(--siren-red)]" },
  support: { label: "Support", color: "text-[var(--spectral-muted)]" },
  admin: { label: "Admin", color: "text-[var(--success)]" },
};

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function TeamManagementPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    async function loadTeamMembers() {
      const { data, error } = await supabase
        .from("team_members")
        .select(`
          *,
          user:profiles!user_id(full_name, email),
          availability:team_availability(*)
        `)
        .order("hire_date", { ascending: false });

      if (!error && data) {
        setTeamMembers(data);
      }
      setIsLoading(false);
    }

    loadTeamMembers();
  }, []);

  const updateMemberStatus = async (memberId: string, isActive: boolean) => {
    const { error } = await supabase
      .from("team_members")
      .update({ is_active: isActive })
      .eq("id", memberId);

    if (!error) {
      setTeamMembers(teamMembers.map((member) =>
        member.id === memberId ? { ...member, is_active: isActive } : member
      ));
    }
  };

  const deleteMember = async (memberId: string) => {
    if (!confirm("Are you sure you want to remove this team member?")) return;

    const { error } = await supabase
      .from("team_members")
      .delete()
      .eq("id", memberId);

    if (!error) {
      setTeamMembers(teamMembers.filter((member) => member.id !== memberId));
      if (selectedMember?.id === memberId) {
        setSelectedMember(null);
      }
    }
  };

  const filteredMembers = teamMembers.filter((member) => {
    const matchesFilter = filter === "all" || member.role === filter;
    const matchesSearch =
      searchQuery === "" ||
      member.user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase());
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
          <h1 className="text-3xl font-black tracking-tighter">Team Management</h1>
          <p className="text-[var(--spectral-dim)]">
            {teamMembers.length} team members • {teamMembers.filter((m) => m.is_active).length} active
          </p>
        </div>
        <Button className="bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 rounded-none">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--spectral-muted)]" />
          <Input
            placeholder="Search team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[var(--onyx)] border-[var(--border)] rounded-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[var(--spectral-muted)]" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="h-10 px-4 bg-[var(--onyx)] border border-[var(--border)] rounded-none text-sm focus:border-[var(--signal-lime)] focus:outline-none"
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
      </div>

      {/* Team Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Team List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredMembers.length === 0 ? (
            <div className="border border-[var(--border)] bg-[var(--card)] p-12 text-center">
              <Users className="w-12 h-12 text-[var(--spectral-muted)] mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">No team members found</h3>
              <p className="text-[var(--spectral-dim)]">
                {searchQuery ? "Try adjusting your search" : "Add your first team member to get started"}
              </p>
            </div>
          ) : (
            filteredMembers.map((member) => {
              const role = roleConfig[member.role as keyof typeof roleConfig];
              
              return (
                <div
                  key={member.id}}}
                  onClick={() => setSelectedMember(member)}
                  className={`border bg-[var(--card)] p-6 cursor-pointer transition-all hover:border-[var(--signal-lime)]/50 ${
                    selectedMember?.id === member.id ? "border-[var(--signal-lime)]" : "border-[var(--border)]"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[var(--onyx)] rounded-full flex items-center justify-center">
                        {member.avatar_url ? (
                          <img
                            src={member.avatar_url}
                            alt={member.user.full_name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-[var(--signal-lime)] font-mono text-sm">
                            {member.user.full_name.split(" ").map(n => n[0]).join("")}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{member.user.full_name}</h3>
                        <p className="text-sm text-[var(--spectral-muted)]">{member.user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`px-3 py-1 text-xs font-mono uppercase ${role.color}`}>
                        {role.label}
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        member.is_active ? "bg-[var(--signal-lime)]" : "bg-[var(--spectral-muted)]"
                      }`} />
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-[var(--spectral-dim)]">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {member.department}
                    </div>
                    {member.hourly_rate && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        {member.hourly_rate}/hr
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(member.hire_date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Member Detail */}
        <div className="border border-[var(--border)] bg-[var(--card)] p-6 h-fit">
          {selectedMember ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[var(--onyx)] rounded-full flex items-center justify-center">
                  {selectedMember.avatar_url ? (
                    <img
                      src={selectedMember.avatar_url}
                      alt={selectedMember.user.full_name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-[var(--signal-lime)] font-mono text-lg">
                      {selectedMember.user.full_name.split(" ").map(n => n[0]).join("")}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{selectedMember.user.full_name}</h2>
                  <a
                    href={`mailto:${selectedMember.user.email}`}
                    className="text-sm text-[var(--signal-lime)] hover:underline"
                  >
                    {selectedMember.user.email}
                  </a>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--spectral-muted)]">Role</span>
                  <span className={`text-sm font-mono uppercase ${
                    roleConfig[selectedMember.role as keyof typeof roleConfig].color
                  }`}>
                    {roleConfig[selectedMember.role as keyof typeof roleConfig].label}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--spectral-muted)]">Department</span>
                  <span className="text-sm">{selectedMember.department}</span>
                </div>
                {selectedMember.hourly_rate && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--spectral-muted)]">Hourly Rate</span>
                    <span className="text-sm">R{selectedMember.hourly_rate}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--spectral-muted)]">Status</span>
                  <span className={`text-sm font-mono uppercase ${
                    selectedMember.is_active ? "text-[var(--signal-lime)]" : "text-[var(--spectral-muted)]"
                  }`}>
                    {selectedMember.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {selectedMember.bio && (
                <div className="border-t border-[var(--border)] pt-4">
                  <h3 className="text-sm font-mono uppercase text-[var(--spectral-muted)] mb-2">Bio</h3>
                  <p className="text-sm text-[var(--spectral-dim)]">{selectedMember.bio}</p>
                </div>
              )}

              {selectedMember.specialties.length > 0 && (
                <div className="border-t border-[var(--border)] pt-4">
                  <h3 className="text-sm font-mono uppercase text-[var(--spectral-muted)] mb-2">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-[var(--signal-lime)]/10 text-[var(--signal-lime)] rounded-none"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedMember.availability.length > 0 && (
                <div className="border-t border-[var(--border)] pt-4">
                  <h3 className="text-sm font-mono uppercase text-[var(--spectral-muted)] mb-2">Availability</h3>
                  <div className="space-y-1">
                    {selectedMember.availability.map((avail, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-[var(--spectral-dim)]">{dayNames[avail.day_of_week]}</span>
                        <span className="text-[var(--spectral-white)]">
                          {avail.start_time} - {avail.end_time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t border-[var(--border)] pt-4 space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-[var(--border)] rounded-none"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Member
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteMember(selectedMember.id)}
                  className="w-full border-[var(--siren-red)]/50 text-[var(--siren-red)] hover:bg-[var(--siren-red)]/10 rounded-none"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove Member
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-[var(--spectral-muted)]">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Select a team member to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
