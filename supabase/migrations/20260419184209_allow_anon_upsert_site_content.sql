/*
  # Allow anonymous users to update site content

  The admin panel uses a PIN-based gate in the UI, so we don't need
  Supabase auth. This policy allows anon users to insert/update content.
*/

CREATE POLICY "Anon users can insert content"
  ON site_content FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anon users can update content"
  ON site_content FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);
