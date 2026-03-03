-- Blog posts table for Blacklight Web Designs
-- Migration: 0006_blog_posts.sql

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    category TEXT NOT NULL DEFAULT 'insights',
    tags TEXT[] DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    read_time INTEGER DEFAULT 5,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    meta_title TEXT,
    meta_description TEXT
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts
CREATE POLICY "Public can read published blog posts"
ON blog_posts FOR SELECT
TO public
USING (status = 'published');

-- Authenticated users with admin role can manage posts
CREATE POLICY "Admins can manage blog posts"
ON blog_posts FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role IN ('admin', 'team')
    )
);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_blog_posts_updated_at();

-- Trigger to set published_at when status changes to published
CREATE OR REPLACE FUNCTION set_blog_posts_published_at()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'published' AND OLD.status != 'published' AND NEW.published_at IS NULL THEN
        NEW.published_at = NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_blog_posts_published_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION set_blog_posts_published_at();

-- Insert sample blog posts for demonstration
INSERT INTO blog_posts (slug, title, excerpt, content, category, tags, status, read_time, published_at) VALUES
(
    'future-of-ai-web-development',
    'The Future of AI in Web Development',
    'How artificial intelligence is revolutionizing the way we build and deploy web applications.',
    E'# The Future of AI in Web Development\n\nArtificial intelligence is no longer a distant promise—it''s here, and it''s transforming how we build the web.\n\n## The Current Landscape\n\nAI-powered tools are already making waves in development workflows:\n\n- **Code Generation**: AI assistants can write boilerplate code, suggest completions, and even generate entire functions based on natural language descriptions.\n- **Design Automation**: From layout suggestions to color palette generation, AI is becoming a designer''s best friend.\n- **Testing & QA**: Automated testing powered by machine learning can identify edge cases humans might miss.\n\n## What''s Next?\n\nThe next wave of AI integration will focus on:\n\n1. **Autonomous Development Agents**: AI systems that can implement features from specifications\n2. **Real-time Optimization**: Websites that adapt their performance based on user behavior\n3. **Intelligent Personalization**: Beyond A/B testing to truly individualized experiences\n\n## Conclusion\n\nAt Blacklight Web Designs, we''re not just watching this revolution—we''re building it. Our agentic systems represent the cutting edge of what''s possible when AI meets web development.',
    'technology',
    ARRAY['AI', 'Web Development', 'Future Tech', 'Automation'],
    'published',
    8,
    NOW() - INTERVAL '2 days'
),
(
    'why-performance-matters',
    'Why Website Performance is Your Best Investment',
    'Every second of load time costs you customers. Here''s the data that proves it.',
    E'# Why Website Performance is Your Best Investment\n\nIn the digital economy, speed isn''t just a feature—it''s the foundation of success.\n\n## The Cost of Slow\n\nResearch consistently shows:\n\n- **53% of mobile users** abandon sites that take longer than 3 seconds to load\n- **A 1-second delay** in page response can result in a 7% reduction in conversions\n- **Google''s algorithm** explicitly favors fast-loading sites in search rankings\n\n## The Performance Multiplier\n\nWhen you invest in performance, you''re investing in:\n\n1. **Better SEO Rankings**: Faster sites rank higher\n2. **Higher Conversion Rates**: Users complete more actions\n3. **Improved User Satisfaction**: Happy users become repeat customers\n4. **Lower Bounce Rates**: People stay and explore\n\n## Our Approach\n\nAt Blacklight, performance isn''t an afterthought—it''s baked into every decision we make, from architecture to deployment.',
    'insights',
    ARRAY['Performance', 'ROI', 'Business', 'Optimization'],
    'published',
    6,
    NOW() - INTERVAL '5 days'
),
(
    'design-systems-at-scale',
    'Building Design Systems That Scale',
    'How to create a design system that grows with your product without becoming a maintenance nightmare.',
    E'# Building Design Systems That Scale\n\nA design system is only as good as its ability to evolve. Here''s how to build one that lasts.\n\n## The Foundation\n\nEvery scalable design system starts with:\n\n- **Clear Principles**: Not just rules, but the reasoning behind them\n- **Atomic Components**: Building blocks that combine without conflict\n- **Documentation**: Living documentation that developers actually use\n\n## Common Pitfalls\n\nWe''ve seen design systems fail when:\n\n1. They''re too rigid to accommodate edge cases\n2. Documentation falls out of sync with implementation\n3. No clear governance model exists for updates\n4. Components are too specific or too generic\n\n## The Blacklight Method\n\nOur approach uses algorithmic design principles to generate systems that are both consistent and flexible—design that thinks for itself.',
    'design',
    ARRAY['Design Systems', 'UI/UX', 'Scalability', 'Components'],
    'published',
    7,
    NOW() - INTERVAL '1 week'
)
ON CONFLICT (slug) DO NOTHING;
