// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://asmqgvhymresmwtwmvoq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzbXFndmh5bXJlc213dHdtdm9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MjM1NDAsImV4cCI6MjA2NjQ5OTU0MH0.d5mn15WXRNNI8kkcDmEyFgdkfQCCFcWi7oDWKQwTPhU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);