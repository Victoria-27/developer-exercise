import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

const supabaseUrl = environment.supabase.url;
const supabaseKey = environment.supabase.key;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase