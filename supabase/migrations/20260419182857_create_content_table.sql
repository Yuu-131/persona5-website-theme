/*
  # Create site content table for editable text

  1. New Tables
    - `site_content`
      - `id` (uuid, primary key)
      - `section` (text) - which page/section (e.g. 'menu', 'about', 'resume', 'socials', 'sideprojects')
      - `key` (text) - unique identifier for this content piece
      - `value` (text) - the actual text content
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS on `site_content` table
    - Public SELECT for reading (portfolio is public)
    - Authenticated users can UPDATE/INSERT (admin access)
  
  3. Notes
    - No auth required to read content (public portfolio)
    - A simple password-protected admin panel will handle writes
    - The `key` field uses dot notation like "menu.items.0.label"
*/

CREATE TABLE IF NOT EXISTS site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL,
  key text NOT NULL UNIQUE,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site content"
  ON site_content FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert content"
  ON site_content FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update content"
  ON site_content FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS site_content_section_idx ON site_content(section);
CREATE INDEX IF NOT EXISTS site_content_key_idx ON site_content(key);
