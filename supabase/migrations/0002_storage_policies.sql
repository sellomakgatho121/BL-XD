-- Storage bucket setup for Blacklight
-- Run this in Supabase SQL Editor after creating buckets in UI

-- Enable storage policies for authenticated users
-- Project files bucket - clients can upload, admins can manage all

-- Policy: Authenticated users can upload their own project files
CREATE POLICY "Users can upload own project files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'project-files' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] IN (
    SELECT id::text FROM projects WHERE client_id = auth.uid()
  )
);

-- Policy: Users can read their own project files
CREATE POLICY "Users can read own project files"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'project-files' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] IN (
    SELECT id::text FROM projects WHERE client_id = auth.uid()
  )
);

-- Policy: Admins can manage all project files
CREATE POLICY "Admins can manage all project files"
ON storage.objects FOR ALL
USING (
  bucket_id = 'project-files' AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'superadmin')
  )
);

-- Portfolio bucket - public read, admin write
CREATE POLICY "Public can read portfolio"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio');

CREATE POLICY "Admins can manage portfolio"
ON storage.objects FOR ALL
USING (
  bucket_id = 'portfolio' AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'superadmin')
  )
);

-- Assets bucket - public read, admin write  
CREATE POLICY "Public can read assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'assets');

CREATE POLICY "Admins can manage assets"
ON storage.objects FOR ALL
USING (
  bucket_id = 'assets' AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'superadmin')
  )
);
