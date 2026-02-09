-- Design review annotation system for Blacklight Web Designs
-- Migration: 0007_annotations.sql

-- Enable required extensions for realtime
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create annotations table for design review
CREATE TABLE IF NOT EXISTS annotations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
    project_file_id UUID REFERENCES project_files(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('point', 'rectangle', 'freehand')),
    coordinates JSONB NOT NULL, -- Stores x, y, width, height, or points array for freehand
    color TEXT DEFAULT '#ffff00', -- Hex color for the annotation
    stroke_width INTEGER DEFAULT 2,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL NOT NULL,
    resolved BOOLEAN DEFAULT FALSE,
    resolved_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create annotation_comments table for threaded discussions
CREATE TABLE IF NOT EXISTS annotation_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    annotation_id UUID REFERENCES annotations(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_annotations_project_id ON annotations(project_id);
CREATE INDEX IF NOT EXISTS idx_annotations_project_file_id ON annotations(project_file_id);
CREATE INDEX IF NOT EXISTS idx_annotations_created_by ON annotations(created_by);
CREATE INDEX IF NOT EXISTS idx_annotations_resolved ON annotations(resolved);
CREATE INDEX IF NOT EXISTS idx_annotations_created_at ON annotations(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_annotation_comments_annotation_id ON annotation_comments(annotation_id);
CREATE INDEX IF NOT EXISTS idx_annotation_comments_user_id ON annotation_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_annotation_comments_created_at ON annotation_comments(created_at DESC);

-- Enable Row Level Security
ALTER TABLE annotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE annotation_comments ENABLE ROW LEVEL SECURITY;

-- Policies for annotations
CREATE POLICY "Users can read annotations for their projects"
ON annotations FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM projects
        WHERE projects.id = annotations.project_id
        AND (
            projects.client_id = auth.uid()
            OR EXISTS (
                SELECT 1 FROM profiles
                WHERE profiles.id = auth.uid()
                AND profiles.role IN ('admin', 'superadmin')
            )
        )
    )
);

CREATE POLICY "Users can create annotations for their projects"
ON annotations FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM projects
        WHERE projects.id = annotations.project_id
        AND (
            projects.client_id = auth.uid()
            OR EXISTS (
                SELECT 1 FROM profiles
                WHERE profiles.id = auth.uid()
                AND profiles.role IN ('admin', 'superadmin')
            )
        )
    )
);

CREATE POLICY "Users can update their own annotations"
ON annotations FOR UPDATE
TO authenticated
USING (created_by = auth.uid());

CREATE POLICY "Admins can resolve any annotation"
ON annotations FOR UPDATE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role IN ('admin', 'superadmin')
    )
);

CREATE POLICY "Users can delete their own annotations"
ON annotations FOR DELETE
TO authenticated
USING (created_by = auth.uid());

CREATE POLICY "Admins can delete any annotation"
ON annotations FOR DELETE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role IN ('admin', 'superadmin')
    )
);

-- Policies for annotation_comments
CREATE POLICY "Users can read comments for accessible annotations"
ON annotation_comments FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM annotations
        WHERE annotations.id = annotation_comments.annotation_id
        AND EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = annotations.project_id
            AND (
                projects.client_id = auth.uid()
                OR EXISTS (
                    SELECT 1 FROM profiles
                    WHERE profiles.id = auth.uid()
                    AND profiles.role IN ('admin', 'superadmin')
                )
            )
        )
    )
);

CREATE POLICY "Users can create comments for accessible annotations"
ON annotation_comments FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM annotations
        WHERE annotations.id = annotation_comments.annotation_id
        AND EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = annotations.project_id
            AND (
                projects.client_id = auth.uid()
                OR EXISTS (
                    SELECT 1 FROM profiles
                    WHERE profiles.id = auth.uid()
                    AND profiles.role IN ('admin', 'superadmin')
                )
            )
        )
    )
);

CREATE POLICY "Users can delete their own comments"
ON annotation_comments FOR DELETE
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins can delete any comment"
ON annotation_comments FOR DELETE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role IN ('admin', 'superadmin')
    )
);

-- Trigger to update updated_at on annotations
CREATE OR REPLACE FUNCTION update_annotations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_annotations_updated_at
    BEFORE UPDATE ON annotations
    FOR EACH ROW
    EXECUTE FUNCTION update_annotations_updated_at();

-- Enable realtime for annotations and comments
ALTER PUBLICATION supabase_realtime ADD TABLE annotations;
ALTER PUBLICATION supabase_realtime ADD TABLE annotation_comments;

-- Function to export annotations as JSON for developer handoff
CREATE OR REPLACE FUNCTION export_annotations_for_project(project_param UUID)
RETURNS JSONB AS $$
DECLARE
    result JSONB;
BEGIN
    SELECT jsonb_agg(
        jsonb_build_object(
            'id', a.id,
            'type', a.type,
            'coordinates', a.coordinates,
            'color', a.color,
            'stroke_width', a.stroke_width,
            'resolved', a.resolved,
            'created_at', a.created_at,
            'created_by', jsonb_build_object(
                'id', p.id,
                'email', p.email,
                'name', p.full_name
            ),
            'comments', (
                SELECT jsonb_agg(
                    jsonb_build_object(
                        'id', ac.id,
                        'content', ac.content,
                        'created_at', ac.created_at,
                        'user', jsonb_build_object(
                            'id', cp.id,
                            'email', cp.email,
                            'name', cp.full_name
                        )
                    )
                )
                FROM annotation_comments ac
                JOIN profiles cp ON ac.user_id = cp.id
                WHERE ac.annotation_id = a.id
            )
        )
    )
    INTO result
    FROM annotations a
    JOIN profiles p ON a.created_by = p.id
    WHERE a.project_id = project_param;

    RETURN coalesce(result, '[]'::jsonb);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
