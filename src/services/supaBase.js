import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://uxpvguwbawbgyftnmtpg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4cHZndXdiYXdiZ3lmdG5tdHBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4MDI5ODQsImV4cCI6MjA5ODM3ODk4NH0.NX_kIVGPfthJyDUe841FHsLK1cprAuysaIh6FFaRAuE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
