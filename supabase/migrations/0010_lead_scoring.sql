-- Lead Scoring System
-- Migration: 0010_lead_scoring.sql

CREATE TABLE IF NOT EXISTS lead_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id UUID REFERENCES contact_submissions(id) ON DELETE CASCADE NOT NULL,
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
    category TEXT NOT NULL CHECK (category IN ('hot', 'warm', 'cold', 'spam')),
    analysis JSONB NOT NULL, -- { "factors": [], "intent": "...", "suggested_action": "..." }
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lead_scores_submission_id ON lead_scores(submission_id);
CREATE INDEX IF NOT EXISTS idx_lead_scores_score ON lead_scores(score DESC);

-- RLS
ALTER TABLE lead_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view lead scores"
    ON lead_scores FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role IN ('admin', 'superadmin')
        )
    );

CREATE POLICY "Service role can insert lead scores"
    ON lead_scores FOR INSERT
    WITH CHECK (true); -- Usually handled by API route with service role key
