import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://qurieowqfullceyiwcbj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1cmllb3dxZnVsbGNleWl3Y2JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYyMDkxMDgsImV4cCI6MjA4MTc4NTEwOH0.g0cZHJZ-tiS_6qg998czrInVkihtflp1bvhcOI4UKfw";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
