-- Content Studio tables for AI Content Studio
-- Migration: 0008_content_studio.sql

-- Content drafts table
CREATE TABLE IF NOT EXISTS content_drafts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('blog', 'social', 'marketing', 'email')),
    title TEXT,
    content JSONB NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'reviewing', 'scheduled', 'published')),
    seo_analysis JSONB,
    template_id TEXT,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

-- Content calendar entries
CREATE TABLE IF NOT EXISTS content_calendar (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    draft_id UUID REFERENCES content_drafts(id) ON DELETE SET NULL,
    blog_post_id UUID REFERENCES blog_posts(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('blog', 'social', 'marketing', 'email')),
    platform TEXT, -- 'twitter', 'linkedin', 'instagram', 'facebook' for social posts
    status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('draft', 'scheduled', 'published', 'cancelled')),
    scheduled_for TIMESTAMPTZ NOT NULL,
    published_at TIMESTAMPTZ,
    content JSONB,
    tags TEXT[] DEFAULT '{}',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content analytics table
CREATE TABLE IF NOT EXISTS content_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    calendar_id UUID REFERENCES content_calendar(id) ON DELETE CASCADE,
    draft_id UUID REFERENCES content_drafts(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('blog', 'social', 'marketing', 'email')),
    platform TEXT,
    views INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    analytics_date DATE NOT NULL DEFAULT CURRENT_DATE,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for content drafts
CREATE INDEX IF NOT EXISTS idx_content_drafts_user_id ON content_drafts(user_id);
CREATE INDEX IF NOT EXISTS idx_content_drafts_type ON content_drafts(type);
CREATE INDEX IF NOT EXISTS idx_content_drafts_status ON content_drafts(status);
CREATE INDEX IF NOT EXISTS idx_content_drafts_created_at ON content_drafts(created_at DESC);

-- Indexes for content calendar
CREATE INDEX IF NOT EXISTS idx_content_calendar_user_id ON content_calendar(user_id);
CREATE INDEX IF NOT EXISTS idx_content_calendar_scheduled_for ON content_calendar(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_content_calendar_status ON content_calendar(status);
CREATE INDEX IF NOT EXISTS idx_content_calendar_type ON content_calendar(type);

-- Indexes for content analytics
CREATE INDEX IF NOT EXISTS idx_content_analytics_calendar_id ON content_analytics(calendar_id);
CREATE INDEX IF NOT EXISTS idx_content_analytics_analytics_date ON content_analytics(analytics_date);
CREATE INDEX IF NOT EXISTS idx_content_analytics_type ON content_analytics(type);

-- Enable RLS for content drafts
ALTER TABLE content_drafts ENABLE ROW LEVEL SECURITY;

-- Users can manage their own drafts
CREATE POLICY "Users can manage own drafts"
ON content_drafts FOR ALL
TO authenticated
USING (user_id = auth.uid());

-- Enable RLS for content calendar
ALTER TABLE content_calendar ENABLE ROW LEVEL SECURITY;

-- Users can manage their own calendar entries
CREATE POLICY "Users can manage own calendar entries"
ON content_calendar FOR ALL
TO authenticated
USING (user_id = auth.uid());

-- Enable RLS for content analytics
ALTER TABLE content_analytics ENABLE ROW LEVEL SECURITY;

-- Users can read analytics for their content
CREATE POLICY "Users can read own analytics"
ON content_analytics FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM content_calendar
        WHERE content_calendar.id = content_analytics.calendar_id
        AND content_calendar.user_id = auth.uid()
    )
    OR EXISTS (
        SELECT 1 FROM content_drafts
        WHERE content_drafts.id = content_analytics.draft_id
        AND content_drafts.user_id = auth.uid()
    )
);

-- Admins can manage all content
CREATE POLICY "Admins can manage all drafts"
ON content_drafts FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role IN ('admin', 'superadmin')
    )
);

CREATE POLICY "Admins can manage all calendar entries"
ON content_calendar FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role IN ('admin', 'superadmin')
    )
);

CREATE POLICY "Admins can manage all analytics"
ON content_analytics FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role IN ('admin', 'superadmin')
    )
);

-- Trigger to update updated_at for content_drafts
CREATE OR REPLACE FUNCTION update_content_drafts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_content_drafts_updated_at
    BEFORE UPDATE ON content_drafts
    FOR EACH ROW
    EXECUTE FUNCTION update_content_drafts_updated_at();

-- Trigger to update updated_at for content_calendar
CREATE OR REPLACE FUNCTION update_content_calendar_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_content_calendar_updated_at
    BEFORE UPDATE ON content_calendar
    FOR EACH ROW
    EXECUTE FUNCTION update_content_calendar_updated_at();

-- Function to auto-publish scheduled content
CREATE OR REPLACE FUNCTION publish_scheduled_content()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'published' AND OLD.status != 'published' AND NEW.published_at IS NULL THEN
        NEW.published_at = NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_publish_scheduled_content
    BEFORE UPDATE ON content_calendar
    FOR EACH ROW
    EXECUTE FUNCTION publish_scheduled_content();

-- Insert sample content drafts
INSERT INTO content_drafts (user_id, type, title, content, status, tags) VALUES
(
    (SELECT id FROM profiles LIMIT 1),
    'blog',
    'Getting Started with AI-Powered Web Development',
    '{
        "title": "Getting Started with AI-Powered Web Development",
        "excerpt": "Learn how to leverage artificial intelligence to build better web applications faster.",
        "content": "# Getting Started with AI-Powered Web Development\n\nAI is transforming web development..."
    }'::jsonb,
    'draft',
    ARRAY['AI', 'Web Development', 'Tutorial']
),
(
    (SELECT id FROM profiles LIMIT 1),
    'social',
    'Twitter Post About New Features',
    '{
        "platform": "twitter",
        "mainText": "Exciting news! We just launched AI-powered content generation",
        "caption": "Exciting news! We just launched AI-powered content generation at Blacklight Web Designs. Create blog posts, social media content, and more in seconds. Try it today!",
        "hashtags": ["AI", "WebDesign", "ContentCreation"]
    }'::jsonb,
    'draft',
    ARRAY['Twitter', 'Social']
)
ON CONFLICT DO NOTHING;

-- Insert sample calendar entries
INSERT INTO content_calendar (user_id, draft_id, title, type, platform, status, scheduled_for, tags) VALUES
(
    (SELECT id FROM profiles LIMIT 1),
    (SELECT id FROM content_drafts WHERE type = 'blog' LIMIT 1),
    'Getting Started with AI-Powered Web Development',
    'blog',
    NULL,
    'scheduled',
    NOW() + INTERVAL '1 week',
    ARRAY['AI', 'Web Development']
),
(
    (SELECT id FROM profiles LIMIT 1),
    (SELECT id FROM content_drafts WHERE type = 'social' LIMIT 1),
    'Twitter Post About New Features',
    'social',
    'twitter',
    'scheduled',
    NOW() + INTERVAL '2 days',
    ARRAY['Twitter', 'Social']
)
ON CONFLICT DO NOTHING;
