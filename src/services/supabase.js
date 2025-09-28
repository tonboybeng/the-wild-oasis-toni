import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://prxghdqbnlbptyqwtnrj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByeGdoZHFibmxicHR5cXd0bnJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwOTYyNTMsImV4cCI6MjA2OTY3MjI1M30.6wUpfbSEenRtnlrNI80MZV84hWwASB0gDIzAMCIlWPE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
