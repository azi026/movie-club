import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://uwhmofkftefzmfhuzwfb.supabase.co';
const DEFAULT_SUPABASE_KEY = 'sb_publishable_r30DcHmuKCwwtiU82szvfA_yJJl7nSx';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || DEFAULT_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);
