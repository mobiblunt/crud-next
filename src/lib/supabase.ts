import { createClient } from '@supabase/supabase-js';
//import supabase details from .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
// initialize supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);