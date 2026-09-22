/*
# Add section video support and media storage bucket

1. Changes
- Adds `video_url` column to `section_config` table (text, nullable) — stores the public URL of an uploaded video file for each section.
- Creates a Supabase Storage bucket `media` for uploading image and video files from the admin panel.
- Sets storage policies: public read, authenticated write.

2. Security
- Storage bucket `media` is public for reads (anon + authenticated).
- Only authenticated users can upload/update/delete files.
- RLS already enabled on `section_config`; existing policies cover the new column automatically since it's just a new text field.
*/

-- Add video_url column to section_config
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'section_config' AND column_name = 'video_url'
  ) THEN
    ALTER TABLE section_config ADD COLUMN video_url text;
  END IF;
END $$;

-- Create media storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for media bucket
DROP POLICY IF EXISTS "public_read_media" ON storage.objects;
CREATE POLICY "public_read_media" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'media');

DROP POLICY IF EXISTS "auth_insert_media" ON storage.objects;
CREATE POLICY "auth_insert_media" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'media');

DROP POLICY IF EXISTS "auth_update_media" ON storage.objects;
CREATE POLICY "auth_update_media" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'media');

DROP POLICY IF EXISTS "auth_delete_media" ON storage.objects;
CREATE POLICY "auth_delete_media" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'media');