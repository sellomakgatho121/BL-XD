-- Add team members table for staff management
CREATE TABLE team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('developer', 'designer', 'project_manager', 'sales', 'support', 'admin')),
  department TEXT NOT NULL,
  bio TEXT,
  specialties TEXT[], -- Array of specialties
  hourly_rate DECIMAL(10,2),
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  hire_date DATE NOT NULL,
  avatar_url TEXT,
  social_links JSONB, -- { linkedin: "", twitter: "", github: "" }
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Team member availability/schedule
CREATE TABLE team_availability (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_member_id UUID REFERENCES team_members(id) ON DELETE CASCADE NOT NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0 = Sunday, 6 = Saturday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Project assignments
CREATE TABLE project_assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  team_member_id UUID REFERENCES team_members(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL, -- Role in this specific project
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  assigned_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  UNIQUE(project_id, team_member_id) -- One assignment per team member per project
);

-- Performance reviews
CREATE TABLE performance_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  team_member_id UUID REFERENCES team_members(id) ON DELETE CASCADE NOT NULL,
  reviewer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  review_period_start DATE NOT NULL,
  review_period_end DATE NOT NULL,
  overall_rating INTEGER CHECK (overall_rating BETWEEN 1 AND 5),
  strengths TEXT,
  areas_for_improvement TEXT,
  goals TEXT,
  reviewer_comments TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'reviewed', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Indexes for performance
CREATE INDEX idx_team_members_user_id ON team_members(user_id);
CREATE INDEX idx_team_members_role ON team_members(role);
CREATE INDEX idx_team_members_department ON team_members(department);
CREATE INDEX idx_team_members_is_active ON team_members(is_active);
CREATE INDEX idx_team_availability_member_id ON team_availability(team_member_id);
CREATE INDEX idx_project_assignments_project_id ON project_assignments(project_id);
CREATE INDEX idx_project_assignments_member_id ON project_assignments(team_member_id);
CREATE INDEX idx_performance_reviews_member_id ON performance_reviews(team_member_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_team_members_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_team_members_updated_at
  BEFORE UPDATE ON team_members
  FOR EACH ROW
  EXECUTE FUNCTION update_team_members_updated_at();

CREATE OR REPLACE FUNCTION update_performance_reviews_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_performance_reviews_updated_at
  BEFORE UPDATE ON performance_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_performance_reviews_updated_at();

-- RLS for team tables
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_reviews ENABLE ROW LEVEL SECURITY;

-- Team members can view their own info
CREATE POLICY "Team members can view own profile"
ON team_members FOR SELECT
USING (user_id = auth.uid());

-- Admins can manage all team members
CREATE POLICY "Admins can manage all team members"
ON team_members FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'superadmin')
  )
);

-- Team members can manage their own availability
CREATE POLICY "Team members can manage own availability"
ON team_availability FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM team_members 
    WHERE team_members.id = team_availability.team_member_id 
    AND team_members.user_id = auth.uid()
  )
);

-- Admins can manage all availability
CREATE POLICY "Admins can manage all availability"
ON team_availability FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'superadmin')
  )
);

-- Project assignments visibility
CREATE POLICY "Project assignments visibility"
ON project_assignments FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM projects 
    WHERE projects.id = project_assignments.project_id
    AND (
      projects.client_id = auth.uid()
      OR EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role IN ('admin', 'superadmin')
      )
    )
  )
);

-- Admins can manage all assignments
CREATE POLICY "Admins can manage all assignments"
ON project_assignments FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'superadmin')
  )
);

-- Performance reviews policies
CREATE POLICY "Team members can view own reviews"
ON performance_reviews FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM team_members 
    WHERE team_members.id = performance_reviews.team_member_id 
    AND team_members.user_id = auth.uid()
  )
);

-- Admins can manage all reviews
CREATE POLICY "Admins can manage all reviews"
ON performance_reviews FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'superadmin')
  )
);
