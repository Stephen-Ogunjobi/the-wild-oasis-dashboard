import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://bdqswlnumgieaypexiha.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkcXN3bG51bWdpZWF5cGV4aWhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxOTUzOTcsImV4cCI6MjA2NDc3MTM5N30.CJaeXOuKBD6-ncJ53Gk8SWLVD0B_0GR-d2B-2zNQpbs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
